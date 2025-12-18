/**
 * Receipt Repository
 * CRUD operations for payment receipts with Supabase
 */

import { supabaseAdmin, isSupabaseConfigured } from '../db';
import { Receipt, ReceiptInsert } from '../db-types';

export interface CreateReceiptData {
    orderId: number;
    transactionId: number;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    amount: number;
    currency?: string;
    paymentMethod?: string;
    programData?: Record<string, any>;
}

/**
 * Generate a unique receipt number
 * Format: RCP-YYYYMMDD-XXXX
 */
function generateReceiptNumber(): string {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `RCP-${dateStr}-${random}`;
}

export const ReceiptRepository = {
    /**
     * Create a new receipt
     */
    async create(data: CreateReceiptData): Promise<Receipt> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const receiptNumber = generateReceiptNumber();

        const insertData: ReceiptInsert = {
            order_id: data.orderId,
            transaction_id: data.transactionId,
            receipt_number: receiptNumber,
            customer_name: data.customerName,
            customer_email: data.customerEmail,
            customer_phone: data.customerPhone,
            amount: data.amount,
            currency: data.currency || 'VND',
            payment_method: data.paymentMethod || 'bank_transfer',
            program_data: data.programData || {},
            issued_at: new Date().toISOString(),
        };

        const { data: receipt, error } = await supabaseAdmin
            .from('receipts')
            .insert(insertData)
            .select()
            .single();

        if (error) {
            console.error('Error creating receipt:', error);
            throw new Error(`Failed to create receipt: ${error.message}`);
        }

        return receipt;
    },

    /**
     * Get receipt by ID
     */
    async getById(id: number): Promise<Receipt | null> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const { data, error } = await supabaseAdmin
            .from('receipts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            throw new Error(`Failed to get receipt: ${error.message}`);
        }

        return data;
    },

    /**
     * Get receipt by receipt number
     */
    async getByReceiptNumber(receiptNumber: string): Promise<Receipt | null> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const { data, error } = await supabaseAdmin
            .from('receipts')
            .select('*')
            .eq('receipt_number', receiptNumber)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            throw new Error(`Failed to get receipt: ${error.message}`);
        }

        return data;
    },

    /**
     * Get receipt by order ID
     */
    async getByOrderId(orderId: number): Promise<Receipt | null> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const { data, error } = await supabaseAdmin
            .from('receipts')
            .select('*')
            .eq('order_id', orderId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            throw new Error(`Failed to get receipt: ${error.message}`);
        }

        return data;
    },

    /**
     * Get receipt by transaction ID
     */
    async getByTransactionId(transactionId: number): Promise<Receipt | null> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const { data, error } = await supabaseAdmin
            .from('receipts')
            .select('*')
            .eq('transaction_id', transactionId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            throw new Error(`Failed to get receipt: ${error.message}`);
        }

        return data;
    },

    /**
     * List receipts by customer email
     */
    async getByEmail(email: string): Promise<Receipt[]> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const { data, error } = await supabaseAdmin
            .from('receipts')
            .select('*')
            .eq('customer_email', email)
            .order('issued_at', { ascending: false });

        if (error) {
            throw new Error(`Failed to get receipts: ${error.message}`);
        }

        return data || [];
    },

    /**
     * List all receipts with pagination
     */
    async list(options: {
        limit?: number;
        offset?: number;
    } = {}): Promise<{ receipts: Receipt[]; count: number }> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const { limit = 50, offset = 0 } = options;

        const { data, error, count } = await supabaseAdmin
            .from('receipts')
            .select('*', { count: 'exact' })
            .order('issued_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            throw new Error(`Failed to list receipts: ${error.message}`);
        }

        return { receipts: data || [], count: count || 0 };
    },
};
