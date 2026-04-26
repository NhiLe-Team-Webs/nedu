import { NextResponse } from 'next/server';
import { ReferralRepository } from '@/lib/repositories/referral';
import { supabaseAdmin } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { 
            alumniName, 
            alumniEmail, 
            alumniPhone, 
            alumniUserTele, 
            alumniBirthDate, 
            alumniGender, 
            previousCourse, 
            referralCode 
        } = body;

        // Sử dụng supabaseAdmin để bypass RLS một cách an toàn ở phía Server
        const { data, error } = await supabaseAdmin
            .from('referral_codes')
            .insert({
                alumni_name: alumniName,
                alumni_email: alumniEmail,
                alumni_phone: alumniPhone,
                alumni_user_tele: alumniUserTele,
                alumni_birth_date: alumniBirthDate,
                alumni_gender: alumniGender,
                previous_course: previousCourse,
                referral_code: referralCode,
                status: 'pending'
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase Insert Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('API Referral Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
