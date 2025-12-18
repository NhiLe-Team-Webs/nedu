import { NextRequest, NextResponse } from 'next/server';
import { getSePayTransactionDetails } from '@/lib/sepay-utils';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const transactionId = searchParams.get('transactionId');

        if (!transactionId) {
            return NextResponse.json(
                { success: false, error: 'Transaction ID is required' },
                { status: 400 }
            );
        }

        // Call SePay API via backend to avoid CORS
        const transactionData = await getSePayTransactionDetails(transactionId);

        if (!transactionData) {
            return NextResponse.json(
                { success: false, error: 'Transaction not found or API error' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: transactionData
        });
    } catch (error) {
        console.error('Error in proxy transaction check:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
