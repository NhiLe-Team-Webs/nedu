import { NextResponse } from 'next/server';
import { appendToSheet } from '@/lib/google-sheets';
import { SEPAY_ACCOUNTS } from '@/lib/sepay-config';
import { OrderStore } from '@/lib/order-store';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, telegram, dob, gender, address, note } = body;

        if (!name || !email || !phone || !telegram || !dob || !gender) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Generate specific Order Code
        // Format: TT30N + Random 4 digits to keep it short for transfer content
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        // Using phone last 4 digits is also good for admin to search, but let's use a random suffix to avoid duplicates if they register twice.
        // Or maybe TT + Phone number.
        // User wants admin to track easily. 
        // Let's use: TT30N + Phone number (last 6 digits?) or just full phone if it fits.
        // Bank transfer content usually limited. 
        // Let's stick to a generated code: T30 + Random(6 chars).

        // Better: "TT30N" + phone number is easy to link. 
        // But if they have multiple payments?
        // Let's use a unique string ID. 
        const orderCode = `TT30N${Math.floor(Date.now() % 1000000)}`;

        let amount = 396000;

        // ⚠️ TEST MODE: Override amount for payment testing
        if (process.env.SEPAY_TEST_MODE === 'true') {
            const testAmount = parseInt(process.env.SEPAY_TEST_AMOUNT || '2000');
            console.warn(`⚠️ SEPAY TEST MODE (Challenge): Amount overridden from ${amount} → ${testAmount} VND`);
            amount = testAmount;
        }

        const description = `${orderCode} ${phone}`;
        // Description length limited, keep it short. Sepay matches regex usually.

        // 1. Save to Google Sheet
        try {
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
                couponCode: '', // No coupon for this form yet
                amount,
                orderCode,
                status: 'Chờ thanh toán', // Pending Payment
            });
        } catch (sheetError) {
            console.error("Failed to save to sheet", sheetError);
            // We might still want to return success so they can pay, but admin won't see it on sheet.
            // Better error out or alert admin? 
            // For now, allow flow to continue but log payload? 
            // No, user requirement is "save to sheet". If that fails, we should tell them.
            return NextResponse.json({ error: 'System error: Could not save registration. Please try again later.' }, { status: 500 });
        }

        // 2. Save to OrderStore (for ephemeral status checking)
        OrderStore.set(orderCode, {
            orderCode,
            amount,
            status: 'pending',
            createdAt: new Date(),
            customerInfo: {
                fullName: name,
                email,
                phone,
                telegram: telegram || '' // Now collected
            },
            programId: 'challenge-30-days'
        });

        // 3. Generate QR Url - All courses now use BUSINESS account (ACB)
        const account = SEPAY_ACCOUNTS.BUSINESS;
        const qrUrl = `https://qr.sepay.vn/img?acc=${account.ACCOUNT_NUMBER}&bank=${account.BANK_CODE}&amount=${amount}&des=${orderCode}`;

        return NextResponse.json({
            success: true,
            qrUrl,
            orderCode,
            amount,
            accountNumber: account.ACCOUNT_NUMBER,
            bankCode: account.BANK_CODE,
            accountName: account.ACCOUNT_NAME
        });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
