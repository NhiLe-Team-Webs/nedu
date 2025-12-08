import { NextRequest, NextResponse } from 'next/server';
import { SEPAY_CONFIG } from '@/lib/sepay-config';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderCode = searchParams.get('orderCode');
    const status = searchParams.get('status');
    const transactionId = searchParams.get('transactionId');
    const amount = searchParams.get('amount');

    // Build redirect URL with parameters
    const appUrl = SEPAY_CONFIG.APP_URL;
    const redirectUrl = new URL('/payment-success', appUrl);

    // Add SePay callback parameters
    if (orderCode) redirectUrl.searchParams.set('orderCode', orderCode);
    if (status) redirectUrl.searchParams.set('status', status);
    if (transactionId) redirectUrl.searchParams.set('transactionId', transactionId);
    if (amount) redirectUrl.searchParams.set('amount', amount);

    // Determine success status
    const isSuccess =
      status === 'success' ||
      status === 'completed' ||
      status === '00' ||
      status === 'SUCCESS';

    redirectUrl.searchParams.set('paymentMethod', 'sepay');

    // Redirect to payment success page
    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error('Error processing callback:', error);
    const appUrl = SEPAY_CONFIG.APP_URL;
    return NextResponse.redirect(`${appUrl}/payment-success?status=failed&paymentMethod=sepay`);
  }
}

