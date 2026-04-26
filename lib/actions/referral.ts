'use server';

import { supabaseAdmin, isSupabaseConfigured } from '@/lib/db';
import { appendReferralToSheet } from '@/lib/google-sheet-referral-service';

export async function createReferralAction(formData: any) {
    if (!isSupabaseConfigured()) {
        return { success: false, error: 'Supabase is not configured' };
    }

    try {
        // Insert to Supabase and Google Sheets in parallel
        const [supabaseResult, _sheetResult] = await Promise.allSettled([
            supabaseAdmin
                .from('referral_codes')
                .insert({
                    alumni_name: formData.alumniName,
                    alumni_email: formData.alumniEmail,
                    alumni_phone: formData.alumniPhone,
                    alumni_user_tele: formData.alumniUserTele,
                    alumni_birth_date: formData.alumniBirthDate,
                    alumni_gender: formData.alumniGender,
                    previous_course: formData.previousCourse,
                    referral_code: formData.referralCode,
                    status: 'pending'
                })
                .select()
                .single(),
            appendReferralToSheet({
                alumniName: formData.alumniName,
                alumniEmail: formData.alumniEmail,
                alumniPhone: formData.alumniPhone,
                alumniUserTele: formData.alumniUserTele,
                alumniBirthDate: formData.alumniBirthDate,
                alumniGender: formData.alumniGender,
                previousCourse: formData.previousCourse,
                referralCode: formData.referralCode,
                status: 'pending',
            }),
        ]);

        // Log sheet result (non-blocking — sheet failure should not block the user)
        if (_sheetResult.status === 'rejected') {
            console.error('[Referral] Google Sheet sync failed:', _sheetResult.reason);
        }

        // Supabase is the source of truth — only fail if Supabase fails
        if (supabaseResult.status === 'rejected') {
            throw supabaseResult.reason;
        }

        const { data, error } = supabaseResult.value;
        if (error) {
            console.error('Supabase Insert Error:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error: any) {
        console.error('Server Action Referral Error:', error);
        return { success: false, error: error.message || 'Internal Server Error' };
    }
}
