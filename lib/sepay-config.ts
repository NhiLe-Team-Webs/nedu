/**
 * SePay Payment Gateway Configuration
 * Configuration values for SePay integration
 */

export const SEPAY_CONFIG = {
  // SePay API Key
  API_KEY: process.env.SEPAY_API_KEY || '',

  // SePay Account Number
  ACCOUNT_NUMBER: process.env.SEPAY_ACCOUNT_NUMBER || '',

  // Bank Code (MB = MB Bank)
  BANK_CODE: process.env.SEPAY_BANK_CODE || 'MB',

  // Webhook Secret (update this with your actual webhook secret from SePay dashboard)
  WEBHOOK_SECRET: process.env.SEPAY_WEBHOOK_SECRET || '',

  // Application URL (for webhooks and callbacks)
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'http://localhost:3000',

  // SePay API Host
  API_HOST: 'https://my.sepay.vn/userapi',

  // Debug mode
  DEBUG: process.env.SEPAY_DEBUG === 'true',
} as const;

