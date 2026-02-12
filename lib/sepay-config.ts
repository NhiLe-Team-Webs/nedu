/**
 * SePay Payment Gateway Configuration
 * All courses now route to BUSINESS account (ACB - CONG TY TNHH TMDV NHLE)
 */

/** Account type identifier */
export type AccountType = 'BUSINESS' | 'PERSONAL';

/** Individual bank account configuration */
export interface BankAccountConfig {
  ACCOUNT_NUMBER: string;
  BANK_CODE: string;
  ACCOUNT_NAME: string;
}

/**
 * SePay bank account configuration
 * ALL courses now use BUSINESS account: ACB - CONG TY TNHH TMDV NHLE
 */
export const SEPAY_ACCOUNTS: Record<AccountType, BankAccountConfig> = {
  BUSINESS: {
    ACCOUNT_NUMBER: process.env.SEPAY_BUSINESS_ACCOUNT_NUMBER || '929899468',
    BANK_CODE: process.env.SEPAY_BUSINESS_BANK_CODE || 'ACB',
    ACCOUNT_NAME: 'CONG TY TNHH TMDV NHLE',
  },
  // PERSONAL account kept for backward compatibility but no longer used
  PERSONAL: {
    ACCOUNT_NUMBER: process.env.SEPAY_BUSINESS_ACCOUNT_NUMBER || '929899468',
    BANK_CODE: process.env.SEPAY_BUSINESS_BANK_CODE || 'ACB',
    ACCOUNT_NAME: 'CONG TY TNHH TMDV NHLE',
  },
} as const;

/**
 * Determine which bank account to use based on program identifiers.
 * ALL programs now route to BUSINESS account (ACB).
 */
export function getAccountForProgram(_programIdentifiers: string[]): AccountType {
  return 'BUSINESS';
}

/**
 * Check if a cart with mixed programs (different account types) is valid.
 * Since all programs now use the same BUSINESS account, this always returns valid.
 */
export function validateCartAccountConsistency(programIdentifiers: string[]): {
  isValid: boolean;
  accountType: AccountType;
  conflictingItems?: { business: string[]; personal: string[] };
} {
  return {
    isValid: true,
    accountType: 'BUSINESS',
  };
}

/** Global SePay config (shared across accounts) */
export const SEPAY_CONFIG = {
  // SePay API Key (shared for the same SePay account)
  API_KEY: process.env.SEPAY_API_KEY || '',

  // Application URL
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'http://localhost:3000',

  // SePay API Host
  API_HOST: 'https://my.sepay.vn/userapi',

  // Debug mode
  DEBUG: process.env.SEPAY_DEBUG === 'true',
} as const;
