/**
 * Referral Repository
 * CRUD operations for referral codes with Supabase
 */

import { supabase, supabaseAdmin, isSupabaseConfigured } from '../db';
import { ReferralRow, ReferralInsert } from '../db-types';

export interface CreateReferralData {
    alumniName: string;
    alumniEmail: string;
    alumniPhone: string;
    alumniUserTele: string;
    alumniBirthDate: string;
    alumniGender: string;
    previousCourse: string;
    referralCode: string;
}

export const ReferralRepository = {
    /**
     * Create a new referral code entry
     */
    async create(data: CreateReferralData): Promise<ReferralRow> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const insertData: ReferralInsert = {
            alumni_name: data.alumniName,
            alumni_email: data.alumniEmail,
            alumni_phone: data.alumniPhone,
            alumni_user_tele: data.alumniUserTele,
            alumni_birth_date: data.alumniBirthDate,
            alumni_gender: data.alumniGender,
            previous_course: data.previousCourse,
            referral_code: data.referralCode,
            status: 'active',
        };

        const { data: referral, error } = await supabase
            .from('referral_codes')
            .insert(insertData)
            .select()
            .single();

        if (error) {
            console.error('Error creating referral code:', error);
            throw new Error(`Failed to create referral code: ${error.message}`);
        }

        return referral;
    },

    /**
     * Get referral by code
     */
    async getByCode(code: string): Promise<ReferralRow | null> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const { data, error } = await supabase
            .from('referral_codes')
            .select('*')
            .eq('referral_code', code)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            throw new Error(`Failed to get referral code: ${error.message}`);
        }

        return data;
    },

    /**
     * Check if a referral code exists
     */
    async exists(code: string): Promise<boolean> {
        const referral = await this.getByCode(code);
        return !!referral;
    },

    /**
     * Update referral status
     */
    async updateStatus(code: string, status: string, newStudentOrderId?: number, newStudentName?: string): Promise<ReferralRow> {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured');
        }

        const updateData: any = { status };
        if (newStudentOrderId !== undefined) {
            updateData.new_student_order_id = newStudentOrderId;
        }
        if (newStudentName !== undefined) {
            updateData.new_student_name = newStudentName;
        }

        const { data, error } = await supabaseAdmin
            .from('referral_codes')
            .update(updateData)
            .eq('referral_code', code)
            .select()
            .single();

        if (error) {
            // PGRST116 means 0 rows matched (referral code not found)
            if (error.code === 'PGRST116') {
                return null as any; // Or handle it as needed
            }
            throw new Error(`Failed to update referral code: ${error.message}`);
        }

        return data;
    }
};
