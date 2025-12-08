/**
 * SePay Payment Gateway TypeScript Interfaces
 */

export interface SePayPaymentRequest {
  fullName: string;
  email: string;
  phone: string;
  telegram: string;
  birthday?: string;
  gender: string;
  address?: string;
  note?: string;
  programId?: string;
  programIds?: string[]; // For multiple courses
  amount: number; // Amount in VND
  returnUrl?: string;
}

export interface SePayPaymentResponse {
  success: boolean;
  qrCodeUrl?: string;
  orderCode?: string;
  accountNumber?: string;
  bankCode?: string;
  amount?: number;
  description?: string;
  error?: string;
}

export interface SePayWebhookPayload {
  orderCode?: string;
  transactionId?: string;
  amount?: number | string;
  status?: string; // success, failed, pending
  description?: string;
  timestamp?: string;
  signature?: string;
  // Additional fields from SePay bank notification
  gateway?: string;
  transactionDate?: string;
  accountNumber?: string;
  subAccount?: string;
  code?: string | null;
  content?: string;
  transferType?: string; // "in" or "out"
  transferAmount?: number;
  referenceCode?: string;
  accumulated?: number;
  id?: number;
  [key: string]: any; // Allow additional fields from SePay
}

export interface SePayCallbackParams {
  orderCode?: string;
  status?: string;
  amount?: string;
  transactionId?: string;
  message?: string;
  [key: string]: string | undefined;
}

export interface SePayOrderInfo {
  orderCode: string;
  amount: number;
  status: 'pending' | 'success' | 'failed';
  createdAt: Date;
  updatedAt?: Date;
  customerInfo?: {
    fullName: string;
    email: string;
    phone: string;
  };
  programIds?: string[];
}

