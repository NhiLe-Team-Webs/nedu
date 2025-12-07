import { NextRequest, NextResponse } from 'next/server';
import { SePayWebhookPayload } from '@/types/sepay';
import { verifySePayWebhook, getSePayConfig, logSePayDebug } from '@/lib/sepay-utils';
import { orderStore } from '../payment/route';

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
    const orderCode = body.orderCode || body.description;
    if (!orderCode) {
      console.error('Missing orderCode in webhook payload');
      return NextResponse.json(
        { success: false, error: 'Missing order code' },
        { status: 400 }
      );
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

    // Determine payment status
    const status = body.status || 'pending';
    const paymentStatus =
      status === 'success' || status === 'completed' || body.status === '00'
        ? 'success'
        : status === 'failed' || status === 'canceled'
        ? 'failed'
        : 'pending';

    // Update order status
    order.status = paymentStatus;
    order.updatedAt = new Date();
    order.transactionId = body.transactionId;
    orderStore.set(orderCode, order);

    logSePayDebug('Order status updated', { orderCode, status: paymentStatus });

    // TODO: If you have a backend API, sync the order status here
    // Example:
    // await fetch('https://api.nedu.nhi.sg/api/order/update-status', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ orderCode, status: paymentStatus })
    // });

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

