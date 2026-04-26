import { NextResponse } from 'next/server';
import { appendToSheet } from '@/lib/google-sheets';
import { SEPAY_ACCOUNTS } from '@/lib/sepay-config';
import { OrderStore } from '@/lib/order-store';
import { isSupabaseConfigured } from '@/lib/db';
import { OrderRepository, TransactionRepository } from '@/lib/repositories';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, telegram, dob, gender, address, note } = body;

        if (!name || !email || !phone || !telegram || !dob || !gender) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Generate specific Order Code
        const orderCode = `TT30N${Math.floor(Date.now() % 1000000)}`;
        let amount = 396000;

        // ⚠️ TEST MODE: Override amount for payment testing
        if (process.env.SEPAY_TEST_MODE === 'true') {
            const testAmount = parseInt(process.env.SEPAY_TEST_AMOUNT || '2000');
            console.warn(`⚠️ SEPAY TEST MODE (Challenge): Amount overridden from ${amount} → ${testAmount} VND`);
            amount = testAmount;
        }

        // 1. Save to Supabase (Database)
        let dbOrderId: number | null = null;
        let dbTransactionId: number | null = null;

        if (isSupabaseConfigured()) {
            try {
                console.log('[RegisterChallenge] Saving to Supabase...');
                const order = await OrderRepository.create({
                    fullName: name,
                    email,
                    phone,
                    telegram,
                    birthday: dob,
                    gender,
                    address,
                    note,
                    program: 'Thử Thách 30 Ngày Thay Đổi Bản Thân',
                    price: amount,
                    courseName: 'Thử Thách 30 Ngày Thay Đổi Bản Thân',
                    orderCode: orderCode, // Pass the generated code
                    programData: {
                        programId: 'challenge-30-days'
                    }
                });
                dbOrderId = order.id;

                const transaction = await TransactionRepository.create({
                    orderId: order.id,
                    orderCode: orderCode,
                    amount,
                    gateway: 'sepay'
                });
                dbTransactionId = transaction.id;

                // Link transaction to order
                await OrderRepository.setTransactionId(order.id, transaction.id);
                console.log(`[RegisterChallenge] Supabase save success: orderId=${dbOrderId}, transactionId=${dbTransactionId}`);
            } catch (dbError) {
                console.error('[RegisterChallenge] Supabase error:', dbError);
                // Continue with Sheet backup if DB fails
            }
        }

        // 2. Save to Google Sheet (Backup)
        try {
            console.log('[RegisterChallenge] Calling appendToSheet with payload:', {
                orderCode,
                status: 'Chờ thanh toán',
                name,
                email,
                phone,
                amount,
            });

            await appendToSheet({
                name,
                email,
                phone,
                telegram,
                dob,
                gender,
                address,
                note,
                courseName: 'Thử Thách 30 Ngày Thay Đổi Bản Thân',
                couponCode: '',
                amount,
                orderCode,
                status: 'Chờ thanh toán',
            });

            console.log(`[RegisterChallenge] appendToSheet success for orderCode=${orderCode}`);
        } catch (sheetError) {
            console.error(`[RegisterChallenge] appendToSheet failed for orderCode=${orderCode}:`, sheetError);
            // If both DB and Sheet fail, return error
            if (!dbOrderId) {
                return NextResponse.json({ error: 'System error: Could not save registration. Please try again later.' }, { status: 500 });
            }
        }

        // 3. Save to OrderStore (for ephemeral status checking)
        OrderStore.set(orderCode, {
            orderCode,
            amount,
            status: 'pending',
            createdAt: new Date(),
            customerInfo: {
                fullName: name,
                email,
                phone,
                telegram: telegram || ''
            },
            programId: 'challenge-30-days',
            dbOrderId,
            dbTransactionId
        });

        // 4. Generate QR Url - All courses now use BUSINESS account (ACB)
        const account = SEPAY_ACCOUNTS.BUSINESS;
        const qrUrl = `https://qr.sepay.vn/img?acc=${account.ACCOUNT_NUMBER}&bank=${account.BANK_CODE}&amount=${amount}&des=${orderCode}`;

        return NextResponse.json({
            success: true,
            qrUrl,
            orderCode,
            amount,
            accountNumber: account.ACCOUNT_NUMBER,
            bankCode: account.BANK_CODE,
            accountName: account.ACCOUNT_NAME,
            orderId: dbOrderId,
            transactionId: dbTransactionId
        });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
