/**
 * SePay Payment Gateway Configuration
 * Multi-account configuration for routing payments to different bank accounts
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
 * Multi-account SePay configuration
 * BUSINESS: ACB - CONG TY TNHH TMDV NHLE (for "Là Chính Mình", "Sức Mạnh Vô Hạn")
 * PERSONAL: MB  - PHAM THI THANH THUY (for "30 Days", "Cuộc sống của bạn", "Thương hiệu của bạn")
 */
export const SEPAY_ACCOUNTS: Record<AccountType, BankAccountConfig> = {
  BUSINESS: {
    ACCOUNT_NUMBER: process.env.SEPAY_BUSINESS_ACCOUNT_NUMBER || '929899468',
    BANK_CODE: process.env.SEPAY_BUSINESS_BANK_CODE || 'ACB',
    ACCOUNT_NAME: 'CONG TY TNHH TMDV NHLE',
  },
  PERSONAL: {
    ACCOUNT_NUMBER: process.env.SEPAY_PERSONAL_ACCOUNT_NUMBER || '8789785904',
    BANK_CODE: process.env.SEPAY_PERSONAL_BANK_CODE || 'MB',
    ACCOUNT_NAME: 'PHAM THI THANH THUY',
  },
} as const;

/**
 * Program IDs/slugs that route to BUSINESS account (ACB)
 * All other programs default to PERSONAL account (MB)
 */
const BUSINESS_PROGRAM_IDENTIFIERS = new Set([
  // Course IDs
  '1',   // Sức Mạnh Vô Hạn
  '2',   // Là Chính Mình
  // Payment IDs
  '57',  // Là Chính Mình paymentId
  '58',  // Sức Mạnh Vô Hạn paymentId
  // Slugs
  'la-chinh-minh',
  'suc-manh-vo-han',
]);

/**
 * Determine which bank account to use based on program identifiers.
 * Returns 'BUSINESS' for "Là Chính Mình" and "Sức Mạnh Vô Hạn",
 * 'PERSONAL' for everything else.
 */
export function getAccountForProgram(programIdentifiers: string[]): AccountType {
  const isBusiness = programIdentifiers.some(id =>
    BUSINESS_PROGRAM_IDENTIFIERS.has(id)
  );
  return isBusiness ? 'BUSINESS' : 'PERSONAL';
}

/**
 * Check if a cart with mixed programs (different account types) is valid.
 * Returns true if all programs route to the same account.
 */
export function validateCartAccountConsistency(programIdentifiers: string[]): {
  isValid: boolean;
  accountType: AccountType;
  conflictingItems?: { business: string[]; personal: string[] };
} {
  const businessItems = programIdentifiers.filter(id =>
    BUSINESS_PROGRAM_IDENTIFIERS.has(id)
  );
  const personalItems = programIdentifiers.filter(id =>
    !BUSINESS_PROGRAM_IDENTIFIERS.has(id)
  );

  if (businessItems.length > 0 && personalItems.length > 0) {
    return {
      isValid: false,
      accountType: 'BUSINESS',
      conflictingItems: {
        business: businessItems,
        personal: personalItems,
      },
    };
  }

  return {
    isValid: true,
    accountType: businessItems.length > 0 ? 'BUSINESS' : 'PERSONAL',
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
