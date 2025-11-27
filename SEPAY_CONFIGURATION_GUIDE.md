# SePay Payment Gateway Configuration Guide

## Overview

This guide provides comprehensive instructions for configuring the SePay payment gateway integration for the N-Edu platform. Follow these steps to set up your SePay credentials and configure the payment system.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Obtaining SePay API Credentials](#obtaining-sepay-api-credentials)
3. [Environment Variables Configuration](#environment-variables-configuration)
4. [Testing Configuration](#testing-configuration)
5. [Production Setup](#production-setup)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before configuring SePay, ensure you have:

- A registered SePay merchant account
- Access to your SePay dashboard at [https://my.sepay.vn](https://my.sepay.vn)
- Administrative access to your application's environment configuration
- A valid bank account linked to your SePay account

---

## Obtaining SePay API Credentials

### Step 1: Access SePay Dashboard

1. Log in to your SePay account at [https://my.sepay.vn](https://my.sepay.vn)
2. Navigate to the **API Settings** or **Developer** section in the dashboard

### Step 2: Generate API Key

1. In the API Settings section, click **"Generate New API Key"** or **"Create API Key"**
2. Provide a name for your API key (e.g., "N-Edu Production" or "N-Edu Staging")
3. Copy and securely store the generated API key
4. **Important:** The API key will only be shown once. Store it in a secure password manager

### Step 3: Retrieve Account Number

1. Navigate to **Account Settings** or **Bank Account** section
2. Locate your SePay account number (the account that will receive payments)
3. This is typically a bank account number linked to your SePay merchant account
4. Copy this account number for configuration

### Step 4: Generate Webhook Secret Key

1. In the **Webhook Settings** or **IPN Settings** section
2. Click **"Generate Secret Key"** or **"Create Webhook Secret"**
3. This key is used to verify the authenticity of payment notifications from SePay
4. Copy and securely store this secret key

### Step 5: Configure Webhook URL

1. In the Webhook Settings, add your webhook endpoint URL
2. Format: `https://yourdomain.com/api/sepay/webhook`
3. Select the events you want to receive notifications for:
   - Payment Success
   - Payment Failed
   - Payment Pending
4. Save the webhook configuration


---

## Environment Variables Configuration

### Required Environment Variables

Add the following environment variables to your application's configuration file (`.env`, `.env.local`, or your deployment platform's environment settings):

```bash
# SePay API Configuration
SEPAY_API_KEY=your_api_key_here
SEPAY_ACCOUNT_NUMBER=your_account_number_here
SEPAY_SECRET_KEY=your_webhook_secret_key_here
SEPAY_API_URL=https://my.sepay.vn/userapi
SEPAY_WEBHOOK_URL=https://yourdomain.com/api/sepay/webhook

# Optional: Bank Code (default: MB - MB Bank)
SEPAY_BANK_CODE=MB
```

### Environment Variable Descriptions

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `SEPAY_API_KEY` | Your SePay API authentication key | Yes | `sk_live_abc123xyz456...` |
| `SEPAY_ACCOUNT_NUMBER` | Bank account number linked to SePay | Yes | `0123456789` |
| `SEPAY_SECRET_KEY` | Secret key for webhook signature verification | Yes | `whsec_abc123xyz456...` |
| `SEPAY_API_URL` | SePay API base URL | Yes | `https://my.sepay.vn/userapi` |
| `SEPAY_WEBHOOK_URL` | Your application's webhook endpoint | Yes | `https://yourdomain.com/api/sepay/webhook` |
| `SEPAY_BANK_CODE` | Bank code for transactions | No | `MB` (MB Bank) |

### Where to Place Environment Variables

#### Local Development

Create or update `.env.local` file in your project root:

```bash
# .env.local
SEPAY_API_KEY=sk_test_abc123xyz456
SEPAY_ACCOUNT_NUMBER=0123456789
SEPAY_SECRET_KEY=whsec_test_abc123xyz456
SEPAY_API_URL=https://my.sepay.vn/userapi
SEPAY_WEBHOOK_URL=https://localhost:3000/api/sepay/webhook
SEPAY_BANK_CODE=MB
```

#### Production Deployment

**For Vercel:**
1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add each variable with its production value
4. Select **Production** environment

**For Other Platforms:**
- Follow your hosting provider's documentation for setting environment variables
- Ensure variables are set for the production environment
- Never commit production credentials to version control

---

## Testing Configuration

### Test/Sandbox Credentials

For development and testing, use SePay's sandbox environment:

```bash
# Test Environment Variables
SEPAY_API_KEY=sk_test_example_key_for_testing_only
SEPAY_ACCOUNT_NUMBER=9876543210
SEPAY_SECRET_KEY=whsec_test_example_secret_for_testing
SEPAY_API_URL=https://my.sepay.vn/userapi
SEPAY_WEBHOOK_URL=https://your-staging-domain.com/api/sepay/webhook
SEPAY_BANK_CODE=MB
```

### Testing Payment Flow

1. **Create Test Order:**
   - Add courses to cart
   - Proceed to checkout
   - Fill in customer information
   - Submit payment

2. **Verify Payment Request:**
   - Check that payment URL is generated
   - Verify order is created with "pending" status
   - Confirm redirect to SePay payment page

3. **Simulate Payment Callback:**
   - Use SePay's test tools to simulate successful payment
   - Verify webhook receives callback
   - Confirm order status updates to "confirmed"
   - Check that cart is cleared

4. **Test Failure Scenarios:**
   - Simulate failed payment
   - Verify order status updates to "failed"
   - Test invalid signature rejection

### Local Webhook Testing

For local development, use a tunneling service to expose your local webhook:

**Using ngrok:**
```bash
ngrok http 3000
```

Then update your webhook URL in SePay dashboard:
```
https://your-ngrok-url.ngrok.io/api/sepay/webhook
```

---

## Production Setup

### Pre-Deployment Checklist

- [ ] Obtain production SePay API credentials
- [ ] Configure production webhook URL with HTTPS
- [ ] Set all environment variables in production environment
- [ ] Verify webhook URL is accessible from SePay servers
- [ ] Test signature verification with production secret key
- [ ] Enable error logging and monitoring
- [ ] Set up alerts for payment failures

### Security Best Practices

1. **Credential Management:**
   - Never commit credentials to version control
   - Use environment variables for all sensitive data
   - Rotate API keys periodically
   - Use different keys for staging and production

2. **Webhook Security:**
   - Always verify SePay signatures on callbacks
   - Use HTTPS for all webhook endpoints
   - Implement rate limiting on webhook endpoint
   - Log all verification failures

3. **Data Validation:**
   - Validate all payment amounts
   - Verify order totals match payment amounts
   - Sanitize all user inputs
   - Implement CSRF protection

### Monitoring and Logging

Configure logging for:
- All payment requests
- All webhook callbacks
- Signature verification results
- Order status changes
- Payment failures

Example log format:
```
[SEPAY] Payment request created: order_id=ABC123, amount=1000000 VND
[SEPAY] Webhook received: transaction_id=TXN456, status=success
[SEPAY] Signature verified: order_id=ABC123, valid=true
[SEPAY] Order status updated: order_id=ABC123, status=confirmed
```

---

## Troubleshooting

### Common Issues

#### 1. "Invalid API Key" Error

**Cause:** API key is incorrect or expired

**Solution:**
- Verify API key is correctly copied from SePay dashboard
- Check for extra spaces or line breaks
- Regenerate API key if necessary
- Ensure you're using the correct environment (test vs production)

#### 2. "Signature Verification Failed"

**Cause:** Webhook secret key mismatch or payload tampering

**Solution:**
- Verify `SEPAY_SECRET_KEY` matches the key in SePay dashboard
- Check that payload is not modified before verification
- Ensure you're using the correct HMAC-SHA256 algorithm
- Log the received signature and calculated signature for comparison

#### 3. "Webhook Not Receiving Callbacks"

**Cause:** Webhook URL not accessible or incorrectly configured

**Solution:**
- Verify webhook URL is publicly accessible
- Ensure URL uses HTTPS (required for production)
- Check firewall settings allow SePay IP addresses
- Test webhook endpoint manually with curl or Postman
- Verify webhook URL is correctly configured in SePay dashboard

#### 4. "Payment Amount Mismatch"

**Cause:** Cart total doesn't match payment request amount

**Solution:**
- Verify cart total calculation logic
- Check for currency conversion issues
- Ensure all prices are in VND
- Validate quantity calculations

#### 5. "Order Status Not Updating"

**Cause:** Webhook processing error or database issue

**Solution:**
- Check webhook logs for errors
- Verify database connection
- Ensure order exists before status update
- Check for transaction rollback issues

### Debug Mode

Enable debug logging by adding:

```bash
# Enable detailed SePay logging
SEPAY_DEBUG=true
```

This will log:
- Full request/response payloads
- Signature calculation details
- Webhook processing steps

**Warning:** Disable debug mode in production to avoid logging sensitive data.

### Support Contacts

- **SePay Technical Support:** support@sepay.vn
- **SePay Documentation:** https://docs.sepay.vn
- **SePay Dashboard:** https://my.sepay.vn

---

## Example Configuration Files

### .env.example

Create this file in your project root as a template:

```bash
# SePay Payment Gateway Configuration
# Copy this file to .env.local and fill in your actual credentials

# SePay API Key (obtain from SePay dashboard)
SEPAY_API_KEY=sk_test_your_api_key_here

# SePay Account Number (your bank account linked to SePay)
SEPAY_ACCOUNT_NUMBER=your_account_number_here

# SePay Webhook Secret Key (for signature verification)
SEPAY_SECRET_KEY=whsec_your_secret_key_here

# SePay API Base URL (usually no need to change)
SEPAY_API_URL=https://my.sepay.vn/userapi

# Your webhook endpoint URL (must be publicly accessible with HTTPS)
SEPAY_WEBHOOK_URL=https://yourdomain.com/api/sepay/webhook

# Bank code (optional, default: MB)
SEPAY_BANK_CODE=MB

# Debug mode (set to true for detailed logging, false for production)
SEPAY_DEBUG=false
```

### Verification Script

Use this script to verify your configuration:

```bash
#!/bin/bash

echo "Checking SePay Configuration..."

if [ -z "$SEPAY_API_KEY" ]; then
    echo "❌ SEPAY_API_KEY is not set"
else
    echo "✅ SEPAY_API_KEY is set"
fi

if [ -z "$SEPAY_ACCOUNT_NUMBER" ]; then
    echo "❌ SEPAY_ACCOUNT_NUMBER is not set"
else
    echo "✅ SEPAY_ACCOUNT_NUMBER is set"
fi

if [ -z "$SEPAY_SECRET_KEY" ]; then
    echo "❌ SEPAY_SECRET_KEY is not set"
else
    echo "✅ SEPAY_SECRET_KEY is set"
fi

if [ -z "$SEPAY_API_URL" ]; then
    echo "❌ SEPAY_API_URL is not set"
else
    echo "✅ SEPAY_API_URL is set"
fi

if [ -z "$SEPAY_WEBHOOK_URL" ]; then
    echo "❌ SEPAY_WEBHOOK_URL is not set"
else
    echo "✅ SEPAY_WEBHOOK_URL is set"
fi

echo "Configuration check complete!"
```

---

## Next Steps

After completing the configuration:

1. ✅ Verify all environment variables are set correctly
2. ✅ Test payment flow in development environment
3. ✅ Configure webhook URL in SePay dashboard
4. ✅ Test webhook callbacks with test transactions
5. ✅ Deploy to staging and perform end-to-end testing
6. ✅ Deploy to production with production credentials
7. ✅ Monitor first production transactions closely

---

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| 2024-01-15 | 1.0 | Initial configuration guide |

---

**Note:** This guide is specific to the N-Edu platform's SePay integration. For general SePay documentation, refer to the official SePay developer documentation at https://docs.sepay.vn
