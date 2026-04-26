/**
 * TEMPORARY DEBUG ENDPOINT - Delete after testing!
 * Check if orders are being saved to Supabase
 */
import { NextResponse } from 'next/server';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/db';

export async function GET() {
    const debugInfo: any = {
        supabaseConfigured: isSupabaseConfigured(),
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
        serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? `SET (length: ${process.env.SUPABASE_SERVICE_ROLE_KEY.length})` : 'NOT SET',
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? `SET (length: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length})` : 'NOT SET',
        keysMatch: process.env.SUPABASE_SERVICE_ROLE_KEY === process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '⚠️ WARNING: Service Role Key = Anon Key (WRONG!)' : '✅ Keys are different',
    };

    if (!isSupabaseConfigured()) {
        return NextResponse.json({ ...debugInfo, error: 'Supabase not configured' });
    }

    try {
        // Get latest 5 orders
        const { data: orders, error: orderError } = await supabaseAdmin
            .from('order')
            .select('id, full_name, email, course_name, referral_code, status, created_at')
            .order('created_at', { ascending: false })
            .limit(5);

        debugInfo.orderError = orderError?.message || null;
        debugInfo.latestOrders = orders || [];
        debugInfo.orderCount = orders?.length || 0;

        // Get latest referral codes
        const { data: referrals, error: refError } = await supabaseAdmin
            .from('referral_codes')
            .select('id, alumni_name, referral_code, status, new_student_order_id, created_at')
            .order('created_at', { ascending: false })
            .limit(5);

        debugInfo.referralError = refError?.message || null;
        debugInfo.latestReferrals = referrals || [];

    } catch (err: any) {
        debugInfo.error = err.message;
    }

    return NextResponse.json(debugInfo, { status: 200 });
}
