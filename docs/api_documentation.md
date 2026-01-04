# API Documentation

This document outlines the available API endpoints in the N-Edu project.

## Orders API

### Create Order
Create a new order and optionally initialize a payment transaction.

- **Endpoint**: `POST /api/orders`
- **Body**:
  ```json
  {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "telegram": "string",
    "birthday": "string (optional)",
    "gender": "string (optional)",
    "address": "string (optional)",
    "note": "string (optional)",
    "program": "string",
    "programId": "number (optional)",
    "programIds": "number[] (optional)",
    "amount": "number",
    "courseName": "string (optional)",
    "couponCode": "string (optional)"
  }
  ```
- **Response**: Returns the created order, transaction details, and QR code URL.

### List Orders
List orders with pagination and filtering.

- **Endpoint**: `GET /api/orders`
- **Query Parameters**:
  - `limit`: Number of items per page (default: 50).
  - `offset`: Offset for pagination (default: 0).
  - `status`: Filter by order status (numeric).
- **Response**: Returns a list of orders and total count.

### Get Order
Get detailed information about a specific order.

- **Endpoint**: `GET /api/orders/[id]`
- **Parameters**:
  - `id`: Order ID (numeric), Order Code (e.g., DH...), or UUID.
- **Response**: Returns order details and associated transaction information.

### Update Order
Update an order's status.

- **Endpoint**: `PATCH /api/orders/[id]`
- **Parameters**:
  - `id`: Order ID.
- **Body**:
  ```json
  {
    "status": "pending" | "processing" | "success" | "failed" | "cancelled" | "refunded"
  }
  ```
- **Response**: Returns the updated order.

---

## Receipts API

### Get Receipt
Retrieve the receipt for a COMPLETED order. If it doesn't exist, it will be created.

- **Endpoint**: `GET /api/receipts/[orderId]`
- **Parameters**:
  - `orderId`: Order ID, Order Code, or UUID.
- **Response**: Returns receipt details including customer, payment, and order info.

---

## Register Challenge API

### Register for Challenge
Lightweight registration specifically for the "30 Day Challenge". Creates a record in Google Sheets and an in-memory order for immediate payment.

- **Endpoint**: `POST /api/register-challenge`
- **Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "telegram": "string",
    "dob": "string",
    "gender": "string",
    "address": "string",
    "note": "string"
  }
  ```
- **Response**: Returns success status, generated `orderCode`, and `qrUrl` for SePay.

---

## SePay Payment API

### Create Payment
Initialize a SePay payment transaction.

- **Endpoint**: `POST /api/sepay/payment`
- **Body**: `SePayPaymentRequest` (similar to Create Order body but focused on payment init).
- **Response**: Returns payment details, `qrCodeUrl`, and IDs.

### Check Payment Status
Check the status of a payment by its order code.

- **Endpoint**: `GET /api/sepay/payment`
- **Query Parameters**:
  - `orderCode`: The unique code for the order.
  - `simulateSuccess`: Set to `true` to manually force success (for testing).
- **Response**: Returns the current status of the order.

### Update Payment Status (Dev)
Manually update a payment status (primarily for testing).

- **Endpoint**: `PATCH /api/sepay/payment`
- **Body**:
  ```json
  {
    "orderCode": "string",
    "status": "pending" | "processing" | "success" | "failed" | "cancelled"
  }
  ```

### Webhook
Handle incoming payment notifications from SePay.

- **Endpoint**: `POST /api/sepay/webhook`
- **Body**: SePay Webhook Payload.
- **Functionality**:
  - Verifies signature.
  - Updates transaction/order status in database.
  - Updates Google Sheet.
  - Creates receipt on success.
- **Response**: JSON success confirmation.

- **Endpoint**: `GET /api/sepay/webhook`
- **Functionality**: Simple health check for the webhook endpoint.
