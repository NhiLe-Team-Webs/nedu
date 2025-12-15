/**
 * Database Types for Supabase
 * Types for database operations
 */

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

// Simplified Database interface that works with Supabase client
export interface Database {
    public: {
        Tables: {
            order: {
                Row: OrderRow;
                Insert: OrderInsert;
                Update: OrderUpdate;
            };
            transactions: {
                Row: TransactionRow;
                Insert: TransactionInsert;
                Update: TransactionUpdate;
            };
            receipts: {
                Row: ReceiptRow;
                Insert: ReceiptInsert;
                Update: ReceiptUpdate;
            };
            webhook_logs: {
                Row: WebhookLogRow;
                Insert: WebhookLogInsert;
                Update: WebhookLogUpdate;
            };
            payment: {
                Row: PaymentRow;
                Insert: PaymentInsert;
                Update: PaymentUpdate;
            };
            payment_history: {
                Row: PaymentHistoryRow;
                Insert: PaymentHistoryInsert;
                Update: PaymentHistoryUpdate;
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
    };
}

// =====================================================
// ORDER TABLE
// =====================================================
export interface OrderRow {
    id: number;
    created_at: string;
    update_at: string | null;
    full_name: string | null;
    email: string | null;
    phone: string | null;
    telegram: string;
    birthday: string | null;
    gender: string | null;
    address: string | null;
    note: string | null;
    program: string;
    price: number | null;
    program_id: number | null;
    status: number | null;
    code: string;
    program_data: Json | null;
    transaction_id: number | null;
    receipt_id: number | null;
    coupon_code: string | null;
    course_name: string | null;
}

export interface OrderInsert {
    created_at?: string;
    update_at?: string | null;
    full_name?: string | null;
    email?: string | null;
    phone?: string | null;
    telegram: string;
    birthday?: string | null;
    gender?: string | null;
    address?: string | null;
    note?: string | null;
    program: string;
    price?: number | null;
    program_id?: number | null;
    status?: number | null;
    code?: string;
    program_data?: Json | null;
    transaction_id?: number | null;
    receipt_id?: number | null;
    coupon_code?: string | null;
    course_name?: string | null;
}

export interface OrderUpdate {
    update_at?: string | null;
    full_name?: string | null;
    email?: string | null;
    phone?: string | null;
    telegram?: string;
    birthday?: string | null;
    gender?: string | null;
    address?: string | null;
    note?: string | null;
    program?: string;
    price?: number | null;
    program_id?: number | null;
    status?: number | null;
    program_data?: Json | null;
    transaction_id?: number | null;
    receipt_id?: number | null;
    coupon_code?: string | null;
    course_name?: string | null;
}

// =====================================================
// TRANSACTIONS TABLE
// =====================================================
export interface TransactionRow {
    id: number;
    created_at: string;
    updated_at: string | null;
    order_id: number;
    order_code: string;
    amount: number;
    currency: string | null;
    status: string;
    gateway: string | null;
    gateway_transaction_id: string | null;
    gateway_reference_code: string | null;
    qr_code_url: string | null;
    payment_date: string | null;
    metadata: Json | null;
}

export interface TransactionInsert {
    created_at?: string;
    updated_at?: string | null;
    order_id: number;
    order_code: string;
    amount: number;
    currency?: string | null;
    status?: string;
    gateway?: string | null;
    gateway_transaction_id?: string | null;
    gateway_reference_code?: string | null;
    qr_code_url?: string | null;
    payment_date?: string | null;
    metadata?: Json | null;
}

export interface TransactionUpdate {
    updated_at?: string | null;
    amount?: number;
    currency?: string | null;
    status?: string;
    gateway?: string | null;
    gateway_transaction_id?: string | null;
    gateway_reference_code?: string | null;
    qr_code_url?: string | null;
    payment_date?: string | null;
    metadata?: Json | null;
}

// =====================================================
// RECEIPTS TABLE
// =====================================================
export interface ReceiptRow {
    id: number;
    created_at: string;
    order_id: number;
    transaction_id: number;
    receipt_number: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string | null;
    amount: number;
    currency: string | null;
    payment_method: string | null;
    program_data: Json | null;
    issued_at: string;
}

export interface ReceiptInsert {
    created_at?: string;
    order_id: number;
    transaction_id: number;
    receipt_number: string;
    customer_name: string;
    customer_email: string;
    customer_phone?: string | null;
    amount: number;
    currency?: string | null;
    payment_method?: string | null;
    program_data?: Json | null;
    issued_at?: string;
}

export interface ReceiptUpdate {
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string | null;
    amount?: number;
    currency?: string | null;
    payment_method?: string | null;
    program_data?: Json | null;
}

// =====================================================
// WEBHOOK_LOGS TABLE
// =====================================================
export interface WebhookLogRow {
    id: number;
    created_at: string;
    gateway: string;
    event_type: string | null;
    raw_payload: Json;
    headers: Json | null;
    processed: boolean | null;
    processing_result: string | null;
    error_message: string | null;
    order_code: string | null;
    order_id: number | null;
    source_ip: string | null;
}

export interface WebhookLogInsert {
    created_at?: string;
    gateway: string;
    event_type?: string | null;
    raw_payload: Json;
    headers?: Json | null;
    processed?: boolean | null;
    processing_result?: string | null;
    error_message?: string | null;
    order_code?: string | null;
    order_id?: number | null;
    source_ip?: string | null;
}

export interface WebhookLogUpdate {
    event_type?: string | null;
    raw_payload?: Json;
    headers?: Json | null;
    processed?: boolean | null;
    processing_result?: string | null;
    error_message?: string | null;
    order_code?: string | null;
    order_id?: number | null;
}

// =====================================================
// PAYMENT TABLE (Legacy)
// =====================================================
export interface PaymentRow {
    id: number;
    deleted: boolean;
    created_at: string | null;
    updated_at: string | null;
    source_id: string;
    vnpTxnRef: string;
    amount: number;
    status: string;
}

export interface PaymentInsert {
    id?: number;
    deleted?: boolean;
    created_at?: string | null;
    updated_at?: string | null;
    source_id: string;
    vnpTxnRef: string;
    amount: number;
    status?: string;
}

export interface PaymentUpdate {
    deleted?: boolean;
    updated_at?: string | null;
    source_id?: string;
    vnpTxnRef?: string;
    amount?: number;
    status?: string;
}

// =====================================================
// PAYMENT_HISTORY TABLE (Legacy)
// =====================================================
export interface PaymentHistoryRow {
    id: number;
    deleted: boolean;
    created_at: string | null;
    updated_at: string | null;
    payment_id: number | null;
    status: string;
    message: string | null;
    rsp_code: string | null;
    params: string | null;
}

export interface PaymentHistoryInsert {
    id?: number;
    deleted?: boolean;
    created_at?: string | null;
    updated_at?: string | null;
    payment_id?: number | null;
    status?: string;
    message?: string | null;
    rsp_code?: string | null;
    params?: string | null;
}

export interface PaymentHistoryUpdate {
    deleted?: boolean;
    updated_at?: string | null;
    payment_id?: number | null;
    status?: string;
    message?: string | null;
    rsp_code?: string | null;
    params?: string | null;
}

// =====================================================
// TYPE ALIASES FOR CONVENIENCE
// =====================================================
export type Order = OrderRow;
export type Transaction = TransactionRow;
export type Receipt = ReceiptRow;
export type WebhookLog = WebhookLogRow;

// =====================================================
// ENUMS
// =====================================================
export enum OrderStatus {
    PENDING = 0,
    PROCESSING = 1,
    COMPLETED = 2,
    FAILED = 3,
    CANCELLED = 4,
    REFUNDED = 5,
}

export enum TransactionStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SUCCESS = 'success',
    FAILED = 'failed',
    CANCELLED = 'cancelled',
    REFUNDED = 'refunded',
}
