import { NextRequest, NextResponse } from 'next/server';
import { SePayWebhookPayload } from '@/types/sepay';
import { verifySePayWebhook, getSePayConfig, logSePayDebug } from '@/lib/sepay-utils';
import { OrderStore } from '@/lib/order-store';
import { updateSheetStatus } from '@/lib/google-sheets';

const orderStore = OrderStore;

export async function POST(request: NextRequest) {
  try {
    const body: SePayWebhookPayload = await request.json();
    logSePayDebug('Webhook received', body);

    // Get SePay configuration
    let config;
    try {
      config = getSePayConfig();
    } catch (error) {
      console.error('SePay configuration error:', error);
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
        return NextResponse.json(
          { success: false, error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }

    // Extract order information from webhook payload
    // SePay sends orderCode in different fields depending on the bank
    let orderCode = body.orderCode || body.code;

    // If no explicit code, start hunting in the content/description
    if (!orderCode) {
      const textToSearch = body.content || body.description || '';
      // Regex to find "DH" followed by alphanumeric characters (the format we generate)
      // Also match TT30N for Challenge 30 Days
      const match = textToSearch.match(/(DH|TT30N)[A-Z0-9]+/);
      if (match) {
        orderCode = match[0];
      }
    }

    if (!orderCode) {
      console.error('Missing orderCode in webhook payload', body);
      return NextResponse.json(
        { success: false, error: 'Missing order code' },
        { status: 400 }
      );
    }

    // Determine payment status
    // SePay webhook indicates success when transferAmount > 0 and transferType = "in"
    let paymentStatus = 'pending';

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

    // Special handling for Challenge 30 Days (TT30N) or Regular Orders (DH...)
    if (orderCode.startsWith('TT30N') || orderCode.startsWith('DH')) {
      if (paymentStatus === 'success') {
        // Update Google Sheet
        await updateSheetStatus(orderCode, 'Đã thanh toán', body.transferAmount);
      } else if (paymentStatus === 'failed') {
        await updateSheetStatus(orderCode, 'Thanh toán thất bại');
      }

      // Ensure order exists in OrderStore (in case of server restart) so valid order check passes
      // This allows the polling from the frontend to succeed even if the order was lost from memory
      if (!orderStore.get(orderCode) && orderCode.startsWith('TT30N')) {
        // Only recreate TT30N orders because we don't have full info for DH orders here to recreate them perfectly
        // But actually, for status checking, we just need the status.
        orderStore.set(orderCode, {
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
        });
      }
    }

    // Find order in store
    const order = orderStore.get(orderCode);
    if (!order) {
      console.error('Order not found:', orderCode);
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update order status
    order.status = paymentStatus;
    order.updatedAt = new Date();
    order.transactionId = body.transactionId || body.referenceCode || body.id?.toString();
    order.transferAmount = body.transferAmount;
    order.transactionDate = body.transactionDate;
    order.gateway = body.gateway;
    orderStore.set(orderCode, order);

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
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint for webhook verification (if SePay requires it)
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'SePay webhook endpoint' });
}
