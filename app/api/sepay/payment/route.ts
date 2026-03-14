/**
 * SePay Payment API
 * Create payment with QR code and store in database
 * 
 * This endpoint now uses Supabase database for persistence
 * with fallback to in-memory store for backward compatibility
 */

import { NextRequest, NextResponse } from 'next/server';
import { SePayPaymentRequest, SePayPaymentResponse } from '@/types/sepay';
import {
  generateOrderCode,
  createSePayPaymentResponse,
  getSePayConfig,
  logSePayDebug,
} from '@/lib/sepay-utils';
import { getAccountForProgram } from '@/lib/sepay-config';
import { OrderStore } from '@/lib/order-store';
import { appendToSheet, findOrderInSheet, updateSheetStatus } from '@/lib/google-sheets';
import { isSupabaseConfigured } from '@/lib/db';
import { OrderRepository, TransactionRepository } from '@/lib/repositories';
import { OrderStatus, TransactionStatus } from '@/lib/db-types';

// Fallback to in-memory store if database not configured
const orderStore = OrderStore;

export async function POST(request: NextRequest) {
  try {
    const body: SePayPaymentRequest = await request.json();
    logSePayDebug('Payment request received', { body: { ...body, amount: body.amount } });

    // Validate required fields
    if (!body.fullName || !body.email || !body.phone || !body.amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate amount
    if (body.amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // ⚠️ TEST MODE: Override amount for payment testing
    if (process.env.SEPAY_TEST_MODE === 'true') {
      const testAmount = parseInt(process.env.SEPAY_TEST_AMOUNT || '2000');
      console.warn(`⚠️ SEPAY TEST MODE: Amount overridden from ${body.amount} → ${testAmount} VND`);
      body.amount = testAmount;
    }

    // Determine which bank account to use based on programs
    const programIdentifiers: string[] = [];
    if (body.programIds && body.programIds.length > 0) {
      programIdentifiers.push(...body.programIds);
    } else if (body.programId) {
      programIdentifiers.push(body.programId);
    }
    const accountType = getAccountForProgram(programIdentifiers);
    logSePayDebug('Account routing', { programIdentifiers, accountType });

    // Get SePay configuration for the determined account
    let config;
    try {
      config = getSePayConfig(accountType);
    } catch (error) {
      console.error('SePay configuration error:', error);
      return NextResponse.json(
        { success: false, error: 'Payment gateway configuration error' },
        { status: 500 }
      );
    }

    // Generate unique order code
    const orderCode = generateOrderCode();

    // Create payment response with QR code URL
    const paymentResponse = createSePayPaymentResponse(
      body,
      orderCode,
      config.accountNumber,
      config.bankCode,
      config.accountName
    );

    // Variables to track database records
    let dbOrderId: number | null = null;
    let dbTransactionId: number | null = null;

    // Try to save to database first
    console.log('[Payment] isSupabaseConfigured:', isSupabaseConfigured());
    if (isSupabaseConfigured()) {
      try {
        console.log('[Payment] Saving order to Supabase DB...');
        // Create order in database
        const order = await OrderRepository.create({
          fullName: body.fullName,
          email: body.email,
          phone: body.phone,
          telegram: body.telegram,
          birthday: body.birthday,
          gender: body.gender,
          address: body.address,
          note: body.note,
          program: body.courseName || 'Unknown',
          programId: body.programId ? parseInt(body.programId) : undefined,
          price: body.amount,
          courseName: body.courseName,
          couponCode: body.couponCode,
          programData: {
            programIds: body.programIds,
            orderCode: orderCode,
          },
        });

        dbOrderId = order.id;
        console.log('[Payment] ✅ Order saved to DB, orderId:', order.id);

        // Create transaction record
        const transaction = await TransactionRepository.create({
          orderId: order.id,
          orderCode: orderCode,
          amount: body.amount,
          gateway: 'sepay',
          qrCodeUrl: paymentResponse.qrCodeUrl,
        });

        dbTransactionId = transaction.id;
        console.log('[Payment] ✅ Transaction saved to DB, transactionId:', transaction.id);

        // Link transaction to order
        await OrderRepository.setTransactionId(order.id, transaction.id);

        logSePayDebug('Order saved to database', {
          orderId: order.id,
          transactionId: transaction.id,
          orderCode
        });
      } catch (dbError) {
        console.error('[Payment] ❌ Database error:', dbError);
        // Continue with in-memory store as fallback
      }
    } else {
      console.warn('[Payment] ⚠️ Supabase NOT configured, skipping DB save');
    }

    // Always save to in-memory store for backward compatibility
    const orderInfo = {
      orderCode,
      amount: body.amount,
      status: 'pending',
      createdAt: new Date(),
      customerInfo: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        telegram: body.telegram,
      },
      programId: body.programId,
      programIds: body.programIds,
      // Store database IDs for reference
      dbOrderId,
      dbTransactionId,
    };
    orderStore.set(orderCode, orderInfo);

    // Save to Google Sheet as backup
    try {
      console.log('[Payment] Calling appendToSheet with payload:', {
        orderCode,
        status: 'Chờ thanh toán',
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        amount: body.amount,
      });

      await appendToSheet({
        name: body.fullName,
        email: body.email,
        phone: body.phone,
        telegram: body.telegram,
        dob: body.birthday || '',
        gender: body.gender,
        address: body.address,
        note: body.note,
        courseName: body.courseName,
        couponCode: body.couponCode,
        amount: body.amount,
        orderCode,
        status: 'Chờ thanh toán',
      });
      console.log(`[Payment] appendToSheet success for orderCode=${orderCode}`);
    } catch (sheetError) {
      console.error(`[Payment] appendToSheet failed for orderCode=${orderCode}:`, sheetError);
      // Continue flow, don't fail payment creation just because sheet failed
    }


    logSePayDebug('Payment created', { orderCode, qrCodeUrl: paymentResponse.qrCodeUrl });

    return NextResponse.json({
      ...paymentResponse,
      orderId: dbOrderId,
      transactionId: dbTransactionId,
    });
  } catch (error) {
    console.error('Error creating SePay payment:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to check order status
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderCode = searchParams.get('orderCode');

    if (!orderCode) {
      return NextResponse.json(
        { success: false, error: 'Missing orderCode parameter' },
        { status: 400 }
      );
    }

    let order = orderStore.get(orderCode);

    // Try database first if configured
    if (isSupabaseConfigured()) {
      try {
        const transaction = await TransactionRepository.getByOrderCode(orderCode);
        if (transaction) {
          const dbOrder = await OrderRepository.getById(transaction.order_id);
          if (dbOrder) {
            // Map database order to expected format
            const statusMap: Record<number, string> = {
              [OrderStatus.PENDING]: 'pending',
              [OrderStatus.PROCESSING]: 'processing',
              [OrderStatus.COMPLETED]: 'success',
              [OrderStatus.FAILED]: 'failed',
              [OrderStatus.CANCELLED]: 'cancelled',
              [OrderStatus.REFUNDED]: 'refunded',
            };

            order = {
              orderCode: transaction.order_code,
              amount: transaction.amount,
              status: statusMap[dbOrder.status ?? 0] || 'pending',
              createdAt: dbOrder.created_at,
              updatedAt: dbOrder.update_at ?? undefined,
              customerInfo: {
                fullName: dbOrder.full_name || '',
                email: dbOrder.email || '',
                phone: dbOrder.phone || '',
                telegram: dbOrder.telegram,
              },
              programId: dbOrder.program_id?.toString(),
              transactionId: transaction.gateway_transaction_id ?? undefined,
              transferAmount: transaction.amount,
              transactionDate: transaction.payment_date ?? undefined,
              gateway: transaction.gateway ?? undefined,
            };

            // Update in-memory store
            if (order) {
              orderStore.set(orderCode, order);
            }
          }
        }
      } catch (dbError) {
        console.error('Database error, using memory/sheet fallback:', dbError);
      }
    }

    // Fallback to Google Sheets if order not found in memory
    if (!order) {
      console.log(`Order ${orderCode} not found in memory cache, checking Google Sheets...`);
      try {
        const sheetOrder = await findOrderInSheet(orderCode);
        if (sheetOrder) {
          order = sheetOrder;
          // Hydrate cache
          orderStore.set(orderCode, order);
          console.log(`Order ${orderCode} retrieved from Google Sheets`);
        }
      } catch (err) {
        console.error('Error fetching order from Google Sheets:', err);
      }
    }

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    const simulateSuccess = searchParams.get('simulateSuccess');
    if (simulateSuccess === 'true') {
      order.status = 'success';
      order.updatedAt = new Date();
      orderStore.set(orderCode, order);

      // Also update database if configured
      if (isSupabaseConfigured()) {
        try {
          await TransactionRepository.updateByOrderCode(orderCode, TransactionStatus.SUCCESS);
          const transaction = await TransactionRepository.getByOrderCode(orderCode);
          if (transaction) {
            await OrderRepository.updateStatus(transaction.order_id, OrderStatus.COMPLETED);
          }
        } catch (dbError) {
          console.error('Database update error:', dbError);
        }
      }

      // Also update Google Sheets
      try {
        await updateSheetStatus(orderCode, 'Đã thanh toán', true);
        console.log('[Payment] Order status updated in Google Sheets (Simulate Success):', orderCode);
      } catch (sheetError) {
        console.error('Error updating Google Sheets (Simulate Success):', sheetError);
      }

      console.log('Order status manually simulated to success:', orderCode);
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error getting order status:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH endpoint to manually update order status (for testing)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderCode, status } = body;

    if (!orderCode || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing orderCode or status' },
        { status: 400 }
      );
    }

    // Update in database if configured
    if (isSupabaseConfigured()) {
      try {
        const statusMap: Record<string, TransactionStatus> = {
          'pending': TransactionStatus.PENDING,
          'processing': TransactionStatus.PROCESSING,
          'success': TransactionStatus.SUCCESS,
          'failed': TransactionStatus.FAILED,
          'cancelled': TransactionStatus.CANCELLED,
        };

        const orderStatusMap: Record<string, OrderStatus> = {
          'pending': OrderStatus.PENDING,
          'processing': OrderStatus.PROCESSING,
          'success': OrderStatus.COMPLETED,
          'failed': OrderStatus.FAILED,
          'cancelled': OrderStatus.CANCELLED,
        };

        await TransactionRepository.updateByOrderCode(orderCode, statusMap[status] || TransactionStatus.PENDING);

        const transaction = await TransactionRepository.getByOrderCode(orderCode);
        if (transaction) {
          await OrderRepository.updateStatus(transaction.order_id, orderStatusMap[status] || OrderStatus.PENDING);
        }
      } catch (dbError) {
        console.error('Database update error:', dbError);
      }
    }

    // Update in-memory store
    const order = orderStore.get(orderCode);
    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    order.status = status;
    order.updatedAt = new Date();
    orderStore.set(orderCode, order);

    // Update Google Sheets
    try {
      const sheetStatus = status === 'success' ? 'Đã thanh toán' : status;
      const includeTime = status === 'success';
      await updateSheetStatus(orderCode, sheetStatus, includeTime);
      console.log(`[Payment] Order status manually updated in Google Sheets: ${orderCode} -> ${sheetStatus} (includeTime: ${includeTime})`);
    } catch (sheetError) {
      console.error('Error updating Google Sheets (PATCH):', sheetError);
    }

    console.log('Order status manually updated:', { orderCode, status });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Export orderStore for webhook use
export { orderStore };
