import { NextRequest, NextResponse } from 'next/server';
import { SePayPaymentRequest, SePayPaymentResponse } from '@/types/sepay';
import {
  generateOrderCode,
  createSePayPaymentResponse,
  getSePayConfig,
  logSePayDebug,
} from '@/lib/sepay-utils';

// In-memory order storage (for development)
// In production, use a database
const orderStore = new Map<string, any>();

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

    // Get SePay configuration
    let config;
    try {
      config = getSePayConfig();
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
      config.bankCode
    );

    // Store order information (in production, save to database)
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
    };
    orderStore.set(orderCode, orderInfo);

    logSePayDebug('Payment created', { orderCode, qrCodeUrl: paymentResponse.qrCodeUrl });

    return NextResponse.json(paymentResponse);
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

    const order = orderStore.get(orderCode);
    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
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

// Export orderStore for webhook use
export { orderStore };

