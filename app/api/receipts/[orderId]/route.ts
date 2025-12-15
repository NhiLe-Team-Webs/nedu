/**
 * Receipts API
 * Get receipt for completed orders
 */

import { NextRequest, NextResponse } from 'next/server';
import { OrderRepository, TransactionRepository, ReceiptRepository } from '@/lib/repositories';
import { isSupabaseConfigured } from '@/lib/db';
import { OrderStatus, TransactionStatus } from '@/lib/db-types';

interface RouteParams {
    params: Promise<{ orderId: string }>;
}

/**
 * GET /api/receipts/:orderId
 * Get receipt for a completed order
 * Creates receipt if it doesn't exist and order is completed
 */
export async function GET(request: NextRequest, context: RouteParams) {
    try {
        const { orderId: orderIdParam } = await context.params;

        if (!isSupabaseConfigured()) {
            return NextResponse.json(
                { success: false, error: 'Database not configured' },
                { status: 500 }
            );
        }

        let orderId: number;
        let order;

        // Check if it's a numeric ID or order code
        if (/^\d+$/.test(orderIdParam)) {
            orderId = parseInt(orderIdParam);
            order = await OrderRepository.getById(orderId);
        } else if (orderIdParam.startsWith('DH') || orderIdParam.startsWith('TT30N')) {
            // Find by order code in transaction
            const transaction = await TransactionRepository.getByOrderCode(orderIdParam);
            if (transaction) {
                orderId = transaction.order_id;
                order = await OrderRepository.getById(orderId);
            }
        } else {
            // Try as UUID
            order = await OrderRepository.getByCode(orderIdParam);
            if (order) {
                orderId = order.id;
            }
        }

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        // Check if order is completed
        if (order.status !== OrderStatus.COMPLETED) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Receipt only available for completed orders',
                    orderStatus: order.status,
                },
                { status: 400 }
            );
        }

        // Try to get existing receipt
        let receipt = await ReceiptRepository.getByOrderId(order.id);

        // If no receipt exists, create one
        if (!receipt) {
            // Get transaction details
            const transaction = order.transaction_id
                ? await TransactionRepository.getById(order.transaction_id)
                : null;

            if (!transaction) {
                return NextResponse.json(
                    { success: false, error: 'Transaction not found for this order' },
                    { status: 400 }
                );
            }

            // Create receipt
            receipt = await ReceiptRepository.create({
                orderId: order.id,
                transactionId: transaction.id,
                customerName: order.full_name || 'Unknown',
                customerEmail: order.email || '',
                customerPhone: order.phone || undefined,
                amount: order.price || transaction.amount,
                currency: 'VND',
                paymentMethod: 'bank_transfer',
                programData: {
                    program: order.program,
                    courseName: order.course_name,
                    couponCode: order.coupon_code,
                    transactionDate: transaction.payment_date,
                    gatewayTransactionId: transaction.gateway_transaction_id,
                },
            });

            // Update order with receipt ID
            await OrderRepository.setReceiptId(order.id, receipt.id);
        }

        // Get transaction for additional details
        const transaction = order.transaction_id
            ? await TransactionRepository.getById(order.transaction_id)
            : null;

        // Format receipt response
        return NextResponse.json({
            success: true,
            receipt: {
                id: receipt.id,
                receiptNumber: receipt.receipt_number,
                issuedAt: receipt.issued_at,
                customer: {
                    name: receipt.customer_name,
                    email: receipt.customer_email,
                    phone: receipt.customer_phone,
                },
                payment: {
                    amount: receipt.amount,
                    currency: receipt.currency,
                    method: receipt.payment_method,
                },
                order: {
                    id: order.id,
                    code: order.code,
                    orderCode: transaction?.order_code || (order.program_data as any)?.orderCode,
                    program: order.program,
                    courseName: order.course_name,
                    createdAt: order.created_at,
                },
                transaction: transaction ? {
                    id: transaction.id,
                    gatewayTransactionId: transaction.gateway_transaction_id,
                    gateway: transaction.gateway,
                    paymentDate: transaction.payment_date,
                } : null,
                programData: receipt.program_data,
            },
        });
    } catch (error) {
        console.error('Error getting receipt:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
