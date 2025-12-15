/**
 * Transaction Repository
 * CRUD operations for payment transactions with Supabase
 */

import { supabaseAdmin, isSupabaseConfigured } from '../db';
import { Transaction, TransactionInsert, TransactionUpdate, TransactionStatus } from '../db-types';

export interface CreateTransactionData {
    orderId: number;
    orderCode: string;
    amount: number;
    currency?: string;
    gateway?: string;
    qrCodeUrl?: string;
    metadata?: Record<string, any>;
}

export const TransactionRepository = {
    /**
     * Create a new transaction
     */
    async create(data: CreateTransactionData): Promise<Transaction> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const insertData: TransactionInsert = {
            order_id: data.orderId,
            order_code: data.orderCode,
            amount: data.amount,
            currency: data.currency || 'VND',
            status: TransactionStatus.PENDING,
            gateway: data.gateway || 'sepay',
            qr_code_url: data.qrCodeUrl,
            metadata: data.metadata || {},
        };

        const { data: transaction, error } = await supabaseAdmin
            .from('transactions')
            .insert(insertData)
            .select()
            .single();

        if (error) {
            console.error('Error creating transaction:', error);
            throw new Error(`Failed to create transaction: ${error.message}`);
        }

        return transaction;
    },

    /**
     * Get transaction by ID
     */
    async getById(id: number): Promise<Transaction | null> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const { data, error } = await supabaseAdmin
            .from('transactions')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            throw new Error(`Failed to get transaction: ${error.message}`);
        }

        return data;
    },

    /**
     * Get transaction by order ID
     */
    async getByOrderId(orderId: number): Promise<Transaction | null> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const { data, error } = await supabaseAdmin
            .from('transactions')
            .select('*')
            .eq('order_id', orderId)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            throw new Error(`Failed to get transaction: ${error.message}`);
        }

        return data;
    },

    /**
     * Get transaction by order code (DH...)
     */
    async getByOrderCode(orderCode: string): Promise<Transaction | null> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const { data, error } = await supabaseAdmin
            .from('transactions')
            .select('*')
            .eq('order_code', orderCode)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            throw new Error(`Failed to get transaction: ${error.message}`);
        }

        return data;
    },

    /**
     * Get transaction by gateway transaction ID
     */
    async getByGatewayTransactionId(gatewayTransactionId: string): Promise<Transaction | null> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const { data, error } = await supabaseAdmin
            .from('transactions')
            .select('*')
            .eq('gateway_transaction_id', gatewayTransactionId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            throw new Error(`Failed to get transaction: ${error.message}`);
        }

        return data;
    },

    /**
     * Update transaction status
     */
    async updateStatus(
        id: number,
        status: TransactionStatus,
        additionalData?: {
            gatewayTransactionId?: string;
            gatewayReferenceCode?: string;
            paymentDate?: string;
            metadata?: Record<string, any>;
        }
    ): Promise<Transaction> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const updateData: TransactionUpdate = {
            status,
            updated_at: new Date().toISOString(),
        };

        if (additionalData?.gatewayTransactionId) {
            updateData.gateway_transaction_id = additionalData.gatewayTransactionId;
        }
        if (additionalData?.gatewayReferenceCode) {
            updateData.gateway_reference_code = additionalData.gatewayReferenceCode;
        }
        if (additionalData?.paymentDate) {
            updateData.payment_date = additionalData.paymentDate;
        }
        if (additionalData?.metadata) {
            updateData.metadata = additionalData.metadata;
        }

        const { data, error } = await supabaseAdmin
            .from('transactions')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            throw new Error(`Failed to update transaction: ${error.message}`);
        }

        return data;
    },

    /**
     * Update transaction by order code
     */
    async updateByOrderCode(
        orderCode: string,
        status: TransactionStatus,
        additionalData?: {
            gatewayTransactionId?: string;
            gatewayReferenceCode?: string;
            paymentDate?: string;
            metadata?: Record<string, any>;
        }
    ): Promise<Transaction | null> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const transaction = await this.getByOrderCode(orderCode);
        if (!transaction) {
            return null;
        }

        return this.updateStatus(transaction.id, status, additionalData);
    },

    /**
     * List transactions with filters
     */
    async list(options: {
        limit?: number;
        offset?: number;
        status?: TransactionStatus;
        gateway?: string;
    } = {}): Promise<{ transactions: Transaction[]; count: number }> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const { limit = 50, offset = 0, status, gateway } = options;

        let query = supabaseAdmin
            .from('transactions')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (status) {
            query = query.eq('status', status);
        }
        if (gateway) {
            query = query.eq('gateway', gateway);
        }

        const { data, error, count } = await query;

        if (error) {
            throw new Error(`Failed to list transactions: ${error.message}`);
        }

        return { transactions: data || [], count: count || 0 };
    },

    /**
     * Get pending transactions older than specified minutes
     */
    async getPendingOlderThan(minutes: number): Promise<Transaction[]> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const cutoffTime = new Date(Date.now() - minutes * 60 * 1000).toISOString();

        const { data, error } = await supabaseAdmin
            .from('transactions')
            .select('*')
            .eq('status', TransactionStatus.PENDING)
            .lt('created_at', cutoffTime);

        if (error) {
            throw new Error(`Failed to get pending transactions: ${error.message}`);
        }

        return data || [];
    },
};
