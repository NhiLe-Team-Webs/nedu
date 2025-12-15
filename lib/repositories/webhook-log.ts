/**
 * Webhook Log Repository
 * Audit trail for all webhook events
 */

import { supabaseAdmin, isSupabaseConfigured } from '../db';
import { WebhookLog, WebhookLogInsert } from '../db-types';

export interface CreateWebhookLogData {
    gateway: string;
    eventType?: string;
    rawPayload: Record<string, any>;
    headers?: Record<string, any>;
    orderCode?: string;
    orderId?: number;
    sourceIp?: string;
}

export const WebhookLogRepository = {
    /**
     * Create a new webhook log entry
     */
    async create(data: CreateWebhookLogData): Promise<WebhookLog> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const insertData: WebhookLogInsert = {
            gateway: data.gateway,
            event_type: data.eventType,
            raw_payload: data.rawPayload,
            headers: data.headers,
            order_code: data.orderCode,
            order_id: data.orderId,
            source_ip: data.sourceIp,
            processed: false,
        };

        const { data: log, error } = await supabaseAdmin
            .from('webhook_logs')
            .insert(insertData)
            .select()
            .single();

        if (error) {
            console.error('Error creating webhook log:', error);
            throw new Error(`Failed to create webhook log: ${error.message}`);
        }

        return log;
    },

    /**
     * Update webhook log processing result
     */
    async updateProcessingResult(
        id: number,
        result: {
            processed: boolean;
            processingResult: string;
            errorMessage?: string;
            orderCode?: string;
            orderId?: number;
        }
    ): Promise<void> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const { error } = await supabaseAdmin
            .from('webhook_logs')
            .update({
                processed: result.processed,
                processing_result: result.processingResult,
                error_message: result.errorMessage,
                order_code: result.orderCode,
                order_id: result.orderId,
            })
            .eq('id', id);

        if (error) {
            throw new Error(`Failed to update webhook log: ${error.message}`);
        }
    },

    /**
     * Get webhook log by ID
     */
    async getById(id: number): Promise<WebhookLog | null> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const { data, error } = await supabaseAdmin
            .from('webhook_logs')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            throw new Error(`Failed to get webhook log: ${error.message}`);
        }

        return data;
    },

    /**
     * Get webhook logs by order code
     */
    async getByOrderCode(orderCode: string): Promise<WebhookLog[]> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const { data, error } = await supabaseAdmin
            .from('webhook_logs')
            .select('*')
            .eq('order_code', orderCode)
            .order('created_at', { ascending: false });

        if (error) {
            throw new Error(`Failed to get webhook logs: ${error.message}`);
        }

        return data || [];
    },

    /**
     * Get unprocessed webhook logs
     */
    async getUnprocessed(limit = 100): Promise<WebhookLog[]> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const { data, error } = await supabaseAdmin
            .from('webhook_logs')
            .select('*')
            .eq('processed', false)
            .order('created_at', { ascending: true })
            .limit(limit);

        if (error) {
            throw new Error(`Failed to get unprocessed webhook logs: ${error.message}`);
        }

        return data || [];
    },

    /**
     * List webhook logs with pagination
     */
    async list(options: {
        limit?: number;
        offset?: number;
        gateway?: string;
        processed?: boolean;
    } = {}): Promise<{ logs: WebhookLog[]; count: number }> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const { limit = 50, offset = 0, gateway, processed } = options;

        let query = supabaseAdmin
            .from('webhook_logs')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (gateway) {
            query = query.eq('gateway', gateway);
        }
        if (processed !== undefined) {
            query = query.eq('processed', processed);
        }

        const { data, error, count } = await query;

        if (error) {
            throw new Error(`Failed to list webhook logs: ${error.message}`);
        }

        return { logs: data || [], count: count || 0 };
    },

    /**
     * Delete old webhook logs (cleanup)
     */
    async deleteOlderThan(days: number): Promise<number> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

        const { data, error } = await supabaseAdmin
            .from('webhook_logs')
            .delete()
            .lt('created_at', cutoffDate)
            .select('id');

        if (error) {
            throw new Error(`Failed to delete old webhook logs: ${error.message}`);
        }

        return data?.length || 0;
    },
};
