/**
 * SePay Webhook API
 * Handle payment confirmations from SePay gateway
 * 
 * This endpoint now uses Supabase database for persistence
 * with full audit logging
 */

import { NextRequest, NextResponse } from 'next/server';
import { SePayWebhookPayload } from '@/types/sepay';
import { verifySePayWebhook, getSePayConfig, logSePayDebug } from '@/lib/sepay-utils';
import { OrderStore } from '@/lib/order-store';
import { updateSheetStatus } from '@/lib/google-sheets';
import { isSupabaseConfigured } from '@/lib/db';
import {
  OrderRepository,
  TransactionRepository,
  ReceiptRepository,
  WebhookLogRepository
} from '@/lib/repositories';
import { OrderStatus, TransactionStatus } from '@/lib/db-types';

const orderStore = OrderStore;

export async function POST(request: NextRequest) {
  let webhookLogId: number | null = null;
  let orderCode: string | null = null;

  try {
    const body: SePayWebhookPayload = await request.json();
    logSePayDebug('Webhook received', body);

    // Get source IP for audit
    const sourceIp = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Log webhook to database for audit trail
    if (isSupabaseConfigured()) {
      try {
        const webhookLog = await WebhookLogRepository.create({
          gateway: 'sepay',
          eventType: body.transferType === 'in' ? 'payment_received' : 'transfer_out',
          rawPayload: body,
          headers: Object.fromEntries(request.headers.entries()),
          sourceIp,
        });
        webhookLogId = webhookLog.id;
      } catch (logError) {
        console.error('Failed to log webhook:', logError);
        // Continue processing even if logging fails
      }
    }

    // Get SePay configuration
    let config;
    try {
      config = getSePayConfig();
    } catch (error) {
      console.error('SePay configuration error:', error);
      await updateWebhookLog(webhookLogId, false, 'config_error', 'SePay configuration error');
      return NextResponse.json(
        { success: false, error: 'Configuration error' },
        { status: 500 }
      );
    }

    // Verify webhook signature
    if (config.webhookSecret) {
      const isValid = verifySePayWebhook(body, config.webhookSecret);
      if (!isValid) {
        console.error('Invalid webhook signature');
        await updateWebhookLog(webhookLogId, false, 'invalid_signature', 'Invalid webhook signature');
        return NextResponse.json(
          { success: false, error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }

    // Extract order information from webhook payload
    orderCode = body.orderCode || body.code || null;

    // If no explicit code, search in the content/description
    if (!orderCode) {
      const textToSearch = body.content || body.description || '';
      // Regex to find "DH" or "TT30N" followed by alphanumeric characters
      const match = textToSearch.match(/(DH|TT30N)[A-Z0-9]+/);
      if (match) {
        orderCode = match[0];
      }
    }

    if (!orderCode) {
      console.error('Missing orderCode in webhook payload', body);
      await updateWebhookLog(webhookLogId, false, 'missing_order_code', 'Missing order code');
      return NextResponse.json(
        { success: false, error: 'Missing order code' },
        { status: 400 }
      );
    }

    // Determine payment status
    let paymentStatus: 'pending' | 'success' | 'failed' = 'pending';

    if (body.transferAmount && body.transferAmount > 0 && body.transferType === 'in') {
      paymentStatus = 'success';
    } else if (body.status) {
      const status = body.status;
      paymentStatus =
        status === 'success' || status === 'completed' || status === '00'
          ? 'success'
          : status === 'failed' || status === 'canceled'
            ? 'failed'
            : 'pending';
    }

    logSePayDebug('Payment status determined', { orderCode, paymentStatus, transferAmount: body.transferAmount });

    // Update database if configured
    let dbOrderId: number | null = null;
    let dbTransactionId: number | null = null;

    if (isSupabaseConfigured()) {
      try {
        // Find transaction by order code
        const transaction = await TransactionRepository.getByOrderCode(orderCode);

        if (transaction) {
          dbTransactionId = transaction.id;
          dbOrderId = transaction.order_id;

          // Map status to TransactionStatus
          const txStatusMap: Record<string, TransactionStatus> = {
            'pending': TransactionStatus.PENDING,
            'success': TransactionStatus.SUCCESS,
            'failed': TransactionStatus.FAILED,
          };

          const orderStatusMap: Record<string, OrderStatus> = {
            'pending': OrderStatus.PENDING,
            'success': OrderStatus.COMPLETED,
            'failed': OrderStatus.FAILED,
          };

          // Update transaction status
          await TransactionRepository.updateStatus(transaction.id, txStatusMap[paymentStatus], {
            gatewayTransactionId: body.transactionId || body.referenceCode || body.id?.toString(),
            gatewayReferenceCode: body.referenceCode,
            paymentDate: body.transactionDate || new Date().toISOString(),
            metadata: {
              gateway: body.gateway,
              transferAmount: body.transferAmount,
              content: body.content,
              accountNumber: body.accountNumber,
            },
          });

          // Update order status
          await OrderRepository.updateStatus(transaction.order_id, orderStatusMap[paymentStatus]);

          // Create receipt if payment successful
          if (paymentStatus === 'success') {
            try {
              const order = await OrderRepository.getById(transaction.order_id);
              if (order) {
                // Check if receipt already exists
                const existingReceipt = await ReceiptRepository.getByOrderId(order.id);
                if (!existingReceipt) {
                  const receipt = await ReceiptRepository.create({
                    orderId: order.id,
                    transactionId: transaction.id,
                    customerName: order.full_name || 'Unknown',
                    customerEmail: order.email || '',
                    customerPhone: order.phone || undefined,
                    amount: body.transferAmount || transaction.amount,
                    paymentMethod: 'bank_transfer',
                    programData: {
                      program: order.program,
                      courseName: order.course_name,
                      gateway: body.gateway,
                      transactionDate: body.transactionDate,
                    },
                  });

                  // Update order with receipt ID
                  await OrderRepository.setReceiptId(order.id, receipt.id);
                  logSePayDebug('Receipt created', { receiptId: receipt.id, receiptNumber: receipt.receipt_number });
                }
              }
            } catch (receiptError) {
              console.error('Error creating receipt:', receiptError);
              // Continue - receipt creation failure shouldn't fail the webhook
            }
          }

          logSePayDebug('Database updated', {
            transactionId: transaction.id,
            orderId: transaction.order_id,
            status: paymentStatus
          });
        } else {
          logSePayDebug('Transaction not found in database, will update memory/sheet', { orderCode });
        }
      } catch (dbError) {
        console.error('Database update error:', dbError);
        // Continue with memory/sheet update
      }
    }

    // Update Google Sheet
    if (paymentStatus === 'success') {
      await updateSheetStatus(orderCode, 'Đã thanh toán', body.transferAmount);
    } else if (paymentStatus === 'failed') {
      await updateSheetStatus(orderCode, 'Thanh toán thất bại');
    }

    // Update in-memory store
    let order = orderStore.get(orderCode);

    // If not found in memory, create a minimal entry
    if (!order && (orderCode.startsWith('TT30N') || orderCode.startsWith('DH'))) {
      order = {
        orderCode,
        amount: body.transferAmount || 0,
        status: paymentStatus,
        createdAt: new Date(),
        customerInfo: {
          fullName: 'Unknown (Webhook)',
          email: '',
          phone: '',
          telegram: ''
        },
        programId: 'unknown'
      };
    }

    if (order) {
      order.status = paymentStatus;
      order.updatedAt = new Date();
      order.transactionId = body.transactionId || body.referenceCode || body.id?.toString();
      order.transferAmount = body.transferAmount;
      order.transactionDate = body.transactionDate;
      order.gateway = body.gateway;
      orderStore.set(orderCode, order);
    }

    // Update webhook log with success
    await updateWebhookLog(webhookLogId, true, 'success', undefined, orderCode, dbOrderId || undefined);

    logSePayDebug('Order status updated', {
      orderCode,
      status: paymentStatus,
      transferAmount: body.transferAmount,
      gateway: body.gateway
    });

    // Return success response to SePay
    return NextResponse.json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    await updateWebhookLog(
      webhookLogId,
      false,
      'error',
      error instanceof Error ? error.message : 'Unknown error',
      orderCode || undefined
    );
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to update webhook log
async function updateWebhookLog(
  logId: number | null,
  processed: boolean,
  result: string,
  errorMessage?: string,
  orderCode?: string,
  orderId?: number
): Promise<void> {
  if (!logId || !isSupabaseConfigured()) return;

  try {
    await WebhookLogRepository.updateProcessingResult(logId, {
      processed,
      processingResult: result,
      errorMessage,
      orderCode,
      orderId,
    });
  } catch (error) {
    console.error('Failed to update webhook log:', error);
  }
}

// GET endpoint for webhook verification (if SePay requires it)
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'SePay webhook endpoint', status: 'active' });
}
