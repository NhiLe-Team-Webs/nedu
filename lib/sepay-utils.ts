/**
 * SePay Payment Gateway Utility Functions
 */

import { SePayPaymentRequest, SePayPaymentResponse, SePayWebhookPayload } from '@/types/sepay';
import crypto from 'crypto';
import { SEPAY_CONFIG } from './sepay-config';

/**
 * Generate a unique order code
 * Format: DH + timestamp + random string
 */
export function generateOrderCode(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DH${timestamp}${randomStr}`;
}

/**
 * Format amount for SePay (must be in VND, no decimals)
 */
export function formatAmount(amount: number): number {
  // SePay requires amount in VND, no decimal places
  return Math.round(amount);
}

/**
 * Generate SePay QR Code URL
 * Format: https://qr.sepay.vn/img?acc={account}&bank={bank}&amount={amount}&des={description}
 */
export function generateSePayQRUrl(
  accountNumber: string,
  bankCode: string,
  amount: number,
  description: string
): string {
  const baseUrl = 'https://qr.sepay.vn/img';
  const params = new URLSearchParams({
    acc: accountNumber,
    bank: bankCode,
    amount: formatAmount(amount).toString(),
    des: description,
  });
  
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Verify webhook signature from SePay
 * Note: This is a placeholder - actual implementation depends on SePay's signature method
 */
export function verifySePayWebhook(
  payload: SePayWebhookPayload,
  secretKey: string
): boolean {
  // TODO: Implement actual signature verification based on SePay documentation
  // For now, we'll do basic validation
  if (!payload.signature) {
    return false;
  }

  // Basic validation - in production, implement HMAC-SHA256 or similar
  // as per SePay documentation
  try {
    // Example verification (adjust based on actual SePay implementation)
    const expectedSignature = crypto
      .createHmac('sha256', secretKey)
      .update(JSON.stringify(payload))
      .digest('hex');
    
    return payload.signature === expectedSignature;
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}

/**
 * Create SePay payment response
 */
export function createSePayPaymentResponse(
  request: SePayPaymentRequest,
  orderCode: string,
  accountNumber: string,
  bankCode: string
): SePayPaymentResponse {
  const amount = formatAmount(request.amount);
  const description = orderCode; // Use order code as description
  
  const qrCodeUrl = generateSePayQRUrl(
    accountNumber,
    bankCode,
    amount,
    description
  );

  return {
    success: true,
    qrCodeUrl,
    orderCode,
    accountNumber,
    bankCode,
    amount,
    description,
  };
}

/**
 * Get SePay configuration
 */
export function getSePayConfig() {
  return {
    apiKey: SEPAY_CONFIG.API_KEY,
    accountNumber: SEPAY_CONFIG.ACCOUNT_NUMBER,
    bankCode: SEPAY_CONFIG.BANK_CODE,
    webhookSecret: SEPAY_CONFIG.WEBHOOK_SECRET,
    appUrl: SEPAY_CONFIG.APP_URL,
    debug: SEPAY_CONFIG.DEBUG,
  };
}

/**
 * Log SePay debug information
 */
export function logSePayDebug(message: string, data?: any) {
  const config = getSePayConfig();
  if (config.debug) {
    console.log(`[SEPAY DEBUG] ${message}`, data || '');
  }
}

