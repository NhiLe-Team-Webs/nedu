# Sepay Integration Guide

## 1. Environment Setup

### Local Development
1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
2. Fill in your SePay credentials in `.env.local`.

### Production (Vercel/Netlify/etc.)
Set the following Environment Variables in your project settings:

| Variable | Description |
|----------|-------------|
| `SEPAY_API_KEY` | "Mã API" from SePay Dashboard > Integration |
| `SEPAY_ACCOUNT_NUMBER` | Your bank account number |
| `SEPAY_BANK_CODE` | Your bank code (e.g., MB, VCB) |
| `SEPAY_WEBHOOK_SECRET` | "Scret Key" from SePay Dashboard > Webhook |
| `NEXT_PUBLIC_APP_URL` | Your production URL (e.g., https://n-edu.com) |
| `SEPAY_DEBUG` | `false` |

## 2. Webhook Configuration

1. Go to **SePay Dashboard** > **Webhook**.
2. Set the **Webhook URL** to:
   `https://<your-domain>/api/sepay/webhook`
3. Enable events: "Incoming transaction" (Giao dịch đến).
4. **Important**: Copy the "Secret Key" and set it as `SEPAY_WEBHOOK_SECRET` in your environment variables.

## 3. How to Test (Localhost)

Since SePay cannot call `localhost`, you need a tunnel.
1. Install ngrok or similar.
2. Run: `ngrok http 3000`
3. Update `NEXT_PUBLIC_APP_URL` in `.env.local` to your ngrok URL (e.g., `https://xyz.ngrok.io`).
4. Update SePay Webhook URL temporarily to `https://xyz.ngrok.io/api/sepay/webhook`.

## 4. Troubleshooting

- **Payment success but no update?**
  - Check Server Logs.
  - Verify `SEPAY_WEBHOOK_SECRET` matches.
  - Ensure your site is publicly accessible (for Webhooks).
- **"Invalid signature"?**
  - Your Webhook Secret might be wrong. Check `.env.local`.
