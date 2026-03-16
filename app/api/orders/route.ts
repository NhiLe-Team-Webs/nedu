/**
 * Orders API
 * Create and list orders with database persistence
 */

import { NextRequest, NextResponse } from 'next/server';
import { OrderRepository, TransactionRepository } from '@/lib/repositories';
import { isSupabaseConfigured } from '@/lib/db';
import { OrderStatus, TransactionStatus } from '@/lib/db-types';
import { generateOrderCode, createSePayPaymentResponse, getSePayConfig, logSePayDebug } from '@/lib/sepay-utils';
import { appendToSheet } from '@/lib/google-sheets';

export interface CreateOrderRequest {
    fullName: string;
    email: string;
    phone: string;
    telegram: string;
    birthday?: string;
    gender?: string;
    address?: string;
    note?: string;
    program: string;
    programId?: number;
    programIds?: number[];
    amount: number;
    courseName?: string;
    couponCode?: string;
}

/**
 * POST /api/orders
 * Create a new order and optionally initialize payment
 */
export async function POST(request: NextRequest) {
    try {
        const body: CreateOrderRequest = await request.json();

        // Validate required fields
        if (!body.fullName || !body.email || !body.phone || !body.telegram) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields: fullName, email, phone, telegram' },
                { status: 400 }
            );
        }

        if (!body.amount || body.amount <= 0) {
            return NextResponse.json(
                { success: false, error: 'Invalid amount' },
                { status: 400 }
            );
        }

        // Check if Supabase is configured
        if (!isSupabaseConfigured()) {
            console.warn('Supabase not configured, falling back to legacy flow');
            return NextResponse.json(
                { success: false, error: 'Database not configured' },
                { status: 500 }
            );
        }

        // Create order in database
        const order = await OrderRepository.create({
            fullName: body.fullName,
            email: body.email,
            phone: body.phone,
            telegram: body.telegram,
            birthday: body.birthday,
            gender: body.gender,
            address: body.address,
            note: body.note,
            program: body.program || body.courseName || 'Unknown',
            programId: body.programId,
            price: body.amount,
            courseName: body.courseName,
            couponCode: body.couponCode,
            programData: {
                programIds: body.programIds,
                orderCode: '', // Will be updated after transaction creation
            },
        });

        // Generate payment order code
        const orderCode = generateOrderCode();

        // Create transaction record
        const transaction = await TransactionRepository.create({
            orderId: order.id,
            orderCode: orderCode,
            amount: body.amount,
            gateway: 'sepay',
        });

        // Link transaction to order
        await OrderRepository.setTransactionId(order.id, transaction.id);

        // Update order with orderCode in program_data
        await OrderRepository.update(order.id, {
            program_data: {
                ...order.program_data as object,
                orderCode: orderCode,
                transactionId: transaction.id,
            },
        });

        // Get SePay configuration and generate QR code
        let qrCodeUrl: string | undefined;
        try {
            const config = getSePayConfig();
            const paymentResponse = createSePayPaymentResponse(
                {
                    fullName: body.fullName,
                    email: body.email,
                    phone: body.phone,
                    telegram: body.telegram,
                    gender: body.gender || '',
                    amount: body.amount
                },
                orderCode,
                config.accountNumber,
                config.bankCode
            );
            qrCodeUrl = paymentResponse.qrCodeUrl;

            // Update transaction with QR code URL
            await TransactionRepository.updateStatus(transaction.id, TransactionStatus.PENDING, {
                metadata: { qrCodeUrl },
            });
        } catch (configError) {
            console.error('SePay configuration error:', configError);
        }

        // Save to Google Sheet as backup
        try {
            console.log('[Orders] Calling appendToSheet with payload:', {
                orderCode,
                status: 'Chờ thanh toán',
                fullName: body.fullName,
                email: body.email,
                phone: body.phone,
                amount: body.amount,
            });

            await appendToSheet({
                name: body.fullName,
                email: body.email,
                phone: body.phone,
                telegram: body.telegram,
                dob: body.birthday || '',
                gender: body.gender || '',
                address: body.address,
                note: body.note,
                courseName: body.courseName,
                couponCode: body.couponCode,
                amount: body.amount,
                orderCode: orderCode,
                status: 'Chờ thanh toán',
            });

            console.log(`[Orders] appendToSheet success for orderCode=${orderCode}`);
        } catch (sheetError) {
            console.error(`[Orders] appendToSheet failed for orderCode=${orderCode}:`, sheetError);
            // Continue - sheet is just backup
        }

        logSePayDebug('Order created', {
            orderId: order.id,
            orderCode,
            transactionId: transaction.id
        });

        return NextResponse.json({
            success: true,
            order: {
                id: order.id,
                code: order.code,
                orderCode: orderCode,
                status: 'pending',
                amount: body.amount,
                createdAt: order.created_at,
            },
            transaction: {
                id: transaction.id,
                orderCode: orderCode,
                status: transaction.status,
            },
            qrCodeUrl,
            accountNumber: getSePayConfig().accountNumber,
            bankCode: getSePayConfig().bankCode,
            description: orderCode,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * GET /api/orders
 * List orders (admin only - should add authentication)
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = parseInt(searchParams.get('offset') || '0');
        const status = searchParams.get('status');

        if (!isSupabaseConfigured()) {
            return NextResponse.json(
                { success: false, error: 'Database not configured' },
                { status: 500 }
            );
        }

        const result = await OrderRepository.list({
            limit,
            offset,
            status: status ? parseInt(status) as OrderStatus : undefined,
        });

        return NextResponse.json({
            success: true,
            orders: result.orders,
            total: result.count,
            limit,
            offset,
        });
    } catch (error) {
        console.error('Error listing orders:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
