/**
 * Single Order API
 * Get and update individual orders
 */

import { NextRequest, NextResponse } from 'next/server';
import { OrderRepository, TransactionRepository } from '@/lib/repositories';
import { isSupabaseConfigured } from '@/lib/db';
import { OrderStatus, TransactionStatus } from '@/lib/db-types';

interface RouteParams {
    params: Promise<{ id: string }>;
}

/**
 * GET /api/orders/:id
 * Get order details by ID or order code
 */
export async function GET(request: NextRequest, context: RouteParams) {
    try {
        const { id } = await context.params;

        if (!isSupabaseConfigured()) {
            return NextResponse.json(
                { success: false, error: 'Database not configured' },
                { status: 500 }
            );
        }

        let order;

        // Check if id is numeric (database ID) or string (order code)
        if (/^\d+$/.test(id)) {
            order = await OrderRepository.getWithTransaction(parseInt(id));
        } else if (id.startsWith('DH') || id.startsWith('TT30N')) {
            // It's an order code like DH... or TT30N...
            // First check transaction by order code
            const transaction = await TransactionRepository.getByOrderCode(id);
            if (transaction) {
                order = await OrderRepository.getWithTransaction(transaction.order_id);
            }
        } else {
            // Try as UUID code
            order = await OrderRepository.getByCode(id);
        }

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        // Get transaction details if not already included
        let transaction = null;
        if (order.transaction_id) {
            transaction = await TransactionRepository.getById(order.transaction_id);
        }

        // Map status number to string
        const statusMap: Record<number, string> = {
            [OrderStatus.PENDING]: 'pending',
            [OrderStatus.PROCESSING]: 'processing',
            [OrderStatus.COMPLETED]: 'success',
            [OrderStatus.FAILED]: 'failed',
            [OrderStatus.CANCELLED]: 'cancelled',
            [OrderStatus.REFUNDED]: 'refunded',
        };

        return NextResponse.json({
            success: true,
            order: {
                id: order.id,
                code: order.code,
                orderCode: (order.program_data as any)?.orderCode || transaction?.order_code,
                status: statusMap[order.status ?? 0] || 'pending',
                amount: order.price,
                customerInfo: {
                    fullName: order.full_name,
                    email: order.email,
                    phone: order.phone,
                    telegram: order.telegram,
                },
                program: order.program,
                courseName: order.course_name,
                couponCode: order.coupon_code,
                createdAt: order.created_at,
                updatedAt: order.update_at,
            },
            transaction: transaction ? {
                id: transaction.id,
                orderCode: transaction.order_code,
                status: transaction.status,
                amount: transaction.amount,
                gateway: transaction.gateway,
                gatewayTransactionId: transaction.gateway_transaction_id,
                paymentDate: transaction.payment_date,
                qrCodeUrl: transaction.qr_code_url,
            } : null,
        });
    } catch (error) {
        console.error('Error getting order:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/orders/:id
 * Update order status
 */
export async function PATCH(request: NextRequest, context: RouteParams) {
    try {
        const { id } = await context.params;
        const body = await request.json();

        if (!isSupabaseConfigured()) {
            return NextResponse.json(
                { success: false, error: 'Database not configured' },
                { status: 500 }
            );
        }

        const orderId = parseInt(id);
        if (isNaN(orderId)) {
            return NextResponse.json(
                { success: false, error: 'Invalid order ID' },
                { status: 400 }
            );
        }

        const order = await OrderRepository.getById(orderId);
        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        // Update status if provided
        if (body.status !== undefined) {
            const statusMap: Record<string, OrderStatus> = {
                'pending': OrderStatus.PENDING,
                'processing': OrderStatus.PROCESSING,
                'success': OrderStatus.COMPLETED,
                'completed': OrderStatus.COMPLETED,
                'failed': OrderStatus.FAILED,
                'cancelled': OrderStatus.CANCELLED,
                'refunded': OrderStatus.REFUNDED,
            };

            const newStatus = statusMap[body.status];
            if (newStatus === undefined) {
                return NextResponse.json(
                    { success: false, error: 'Invalid status' },
                    { status: 400 }
                );
            }

            await OrderRepository.updateStatus(orderId, newStatus);

            // Also update transaction status if exists
            if (order.transaction_id) {
                const txStatusMap: Record<string, TransactionStatus> = {
                    'pending': TransactionStatus.PENDING,
                    'processing': TransactionStatus.PROCESSING,
                    'success': TransactionStatus.SUCCESS,
                    'completed': TransactionStatus.SUCCESS,
                    'failed': TransactionStatus.FAILED,
                    'cancelled': TransactionStatus.CANCELLED,
                    'refunded': TransactionStatus.REFUNDED,
                };
                await TransactionRepository.updateStatus(order.transaction_id, txStatusMap[body.status]);
            }
        }

        const updatedOrder = await OrderRepository.getById(orderId);

        return NextResponse.json({
            success: true,
            order: updatedOrder,
        });
    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
