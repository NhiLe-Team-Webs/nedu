/**
 * Supabase Client Configuration
 * Database connection utilities for the payment backend
 * 
 * Note: Using untyped client to avoid strict type checking issues
 * until the database schema is fully synced with Supabase.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Check if Supabase is properly configured
const isConfigured = !!(supabaseUrl && supabaseUrl.startsWith('https://') && supabaseAnonKey);

if (!isConfigured) {
    console.warn('SUPABASE_URL is not set. Database operations will fail.');
}

// Create a placeholder URL and key for when Supabase is not configured
// This prevents the createClient from throwing during build time
const safeUrl = supabaseUrl || 'https://placeholder.supabase.co';
const safeAnonKey = supabaseAnonKey || 'placeholder-key';
const safeServiceKey = supabaseServiceRoleKey || safeAnonKey;

// Debug log for environment variables (safely)
if (typeof window !== 'undefined') {
    console.log('--- SUPABASE CLIENT INIT ---');
    console.log('URL:', safeUrl);
    console.log('Key length:', safeAnonKey?.length);
    if (safeAnonKey === 'placeholder-key' || safeAnonKey.length < 50) {
        console.error('CRITICAL: Supabase Anon Key is INVALID (too short or placeholder). Please check .env.local');
    }
}

/**
 * Supabase client for anonymous/public access
 * Use this for client-side operations with RLS
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase: SupabaseClient<any> = createClient(
    safeUrl,
    safeAnonKey,
    {
        auth: {
            persistSession: false,
        },
    }
);

/**
 * Supabase admin client with service role key
 * Use this for server-side operations that bypass RLS
 * ONLY use on the server, never expose to client
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabaseAdmin: SupabaseClient<any> = createClient(
    safeUrl,
    safeServiceKey,
    {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    }
);

/**
 * Check if Supabase is properly configured
 */
export function isSupabaseConfigured(): boolean {
    return isConfigured;
}

/**
 * Get the appropriate Supabase client based on context
 * @param useAdmin - Use admin client (server-side only)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSupabaseClient(useAdmin = false): SupabaseClient<any> {
    if (!isConfigured) {
        throw new Error('Supabase is not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
    }
    if (useAdmin && supabaseServiceRoleKey) {
        return supabaseAdmin;
    }
    return supabase;
}

/**
 * Handle Supabase errors consistently
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleSupabaseError(error: any): never {
    console.error('Supabase error:', error);
    throw new Error(error.message || 'Database operation failed');
}

/**
 * Execute a database operation with error handling
 */
export async function withErrorHandling<T>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    operation: () => Promise<{ data: T | null; error: any }>
): Promise<T> {
    const { data, error } = await operation();

    if (error) {
        handleSupabaseError(error);
    }

    if (data === null) {
        throw new Error('No data returned from database');
    }

    return data;
}
