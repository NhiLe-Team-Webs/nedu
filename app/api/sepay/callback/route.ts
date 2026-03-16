import { NextRequest, NextResponse } from 'next/server';
import { SEPAY_CONFIG } from '@/lib/sepay-config';
import { updateSheetStatus } from '@/lib/google-sheets';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderCode = searchParams.get('orderCode');
    const status = searchParams.get('status');
    const transactionId = searchParams.get('transactionId');
    const amount = searchParams.get('amount');

    console.log('[Callback] request params:', {
      orderCode,
      status,
      transactionId,
      amount,
    });

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

    console.log('[Callback] mapped success status:', { isSuccess, rawStatus: status });

    // Fallback: when webhook is delayed/unreachable, still update sheet from callback data.
    if (isSuccess && orderCode) {
      const parsedAmount = amount ? Number(amount) : undefined;
      const safeAmount = typeof parsedAmount === 'number' && Number.isFinite(parsedAmount) && parsedAmount > 0
        ? parsedAmount
        : undefined;

      try {
        const sheetUpdated = await updateSheetStatus(orderCode, 'Đã thanh toán', true, safeAmount);
        console.log('[Callback] updateSheetStatus result:', { orderCode, sheetUpdated });
      } catch (sheetError) {
        console.error('[Callback] Failed to update sheet status:', sheetError);
      }
    }

    redirectUrl.searchParams.set('paymentMethod', 'sepay');

    // Redirect to payment success page
    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error('Error processing callback:', error);
    const appUrl = SEPAY_CONFIG.APP_URL;
    return NextResponse.redirect(`${appUrl}/payment-success?status=failed&paymentMethod=sepay`);
  }
}

