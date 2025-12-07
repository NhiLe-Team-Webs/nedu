/**
 * SePay Payment Gateway Configuration
 * Configuration values for SePay integration
 */

export const SEPAY_CONFIG = {
  // SePay API Key
  API_KEY: 'BATCWZ5XCUG3M0WNSKGQVGXXHONJLSIAJOWIIDR1VXYUKZN9Q0KIQTOALCMSW8F7',
  
  // SePay Account Number
  ACCOUNT_NUMBER: 'VQRQAFTUG5434',
  
  // Bank Code (MB = MB Bank)
  BANK_CODE: 'MB',
  
  // Webhook Secret (update this with your actual webhook secret from SePay dashboard)
  WEBHOOK_SECRET: 'your_webhook_secret_here',
  
  // Application URL (for webhooks and callbacks)
  APP_URL: 'http://localhost:5000',
  
  // Debug mode
  DEBUG: false,
} as const;

