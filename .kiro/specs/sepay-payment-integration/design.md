# Design Document

## Overview

This design document outlines the technical approach for migrating the N-Edu payment system from VNPay to SePay, with enhanced multi-course cart functionality. The solution will maintain the existing cart context structure while replacing the payment gateway integration and updating the order creation logic to support multiple courses per transaction.

The key changes include:
- Replacing VNPay API calls with SePay API integration
- Updating order data model to support multiple courses
- Converting "Sức Mạnh Vô Hạn" course pricing from USD to VND
- Creating configuration documentation for SePay credentials
- Maintaining backward compatibility with existing cart UI components

## Architecture

### High-Level Architecture

```
┌─────────────┐
│   Browser   │
│   (Client)  │
└──────┬──────┘
       │
       │ 1. Add to Cart
       │ 2. View Cart
       │ 3. Checkout
       │
┌──────▼──────────────────────────────────────┐
│         Next.js Application                  │
│  ┌────────────────────────────────────────┐ │
│  │      Cart Context (React Context)      │ │
│  │  - items: CartItem[]                   │ │
│  │  - addToCart()                         │ │
│  │  - updateQuantity()                    │ │
│  │  - getTotalPrice()                     │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │      Payment Utilities                 │ │
│  │  - preparePaymentData()                │ │
│  │  - sendPaymentRequest()                │ │
│  │  - handlePaymentResponse()             │ │
│  └────────────────────────────────────────┘ │
└──────────────┬───────────────────────────────┘
               │
               │ 4. POST /api/order/payment
               │    (with cart items)
               │
┌──────────────▼───────────────────────────────┐
│         Backend API (NestJS)                 │
│  ┌────────────────────────────────────────┐ │
│  │      Order Service                     │ │
│  │  - createOrder()                       │ │
│  │  - updateOrderStatus()                 │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │      SePay Service                     │ │
│  │  - createPaymentUrl()                  │ │
│  │  - verifyCallback()                    │ │
│  │  - handleIPN()                         │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │      Database (TypeORM)                │ │
│  │  - OrderEntity                         │ │
│  │  - PaymentEntity                       │ │
│  │  - PaymentHistoryEntity                │ │
│  └────────────────────────────────────────┘ │
└──────────────┬───────────────────────────────┘
               │
               │ 5. Create Payment Request
               │
┌──────────────▼───────────────────────────────┐
│         SePay Payment Gateway                │
│  - Process Payment                           │
│  - Return Payment URL                        │
│  - Send IPN Callback                         │
└──────────────────────────────────────────────┘
```

### Payment Flow Sequence

```
User          Cart Page      Checkout Page    Backend API      SePay
 │                │                │               │              │
 │  Add Course    │                │               │              │
 │───────────────>│                │               │              │
 │                │                │               │              │
 │  View Cart     │                │               │              │
 │───────────────>│                │               │              │
 │                │                │               │              │
 │  Checkout      │                │               │              │
 │────────────────┼───────────────>│               │              │
 │                │                │               │              │
 │                │  Fill Form &   │               │              │
 │                │  Submit        │               │              │
 │                │───────────────>│               │              │
 │                │                │               │              │
 │                │                │ Create Order  │              │
 │                │                │──────────────>│              │
 │                │                │               │              │
 │                │                │               │ Create       │
 │                │                │               │ Payment      │
 │                │                │               │─────────────>│
 │                │                │               │              │
 │                │                │               │ Payment URL  │
 │                │                │               │<─────────────│
 │                │                │               │              │
 │                │                │ Payment URL   │              │
 │                │                │<──────────────│              │
 │                │                │               │              │
 │                │  Redirect to   │               │              │
 │                │  SePay         │               │              │
 │<───────────────┼────────────────│               │              │
 │                │                │               │              │
 │  Complete Payment on SePay                     │              │
 │───────────────────────────────────────────────────────────────>│
 │                │                │               │              │
 │                │                │               │  IPN         │
 │                │                │               │  Callback    │
 │                │                │               │<─────────────│
 │                │                │               │              │
 │                │                │  Update Order │              │
 │                │                │  Status       │              │
 │                │                │<──────────────│              │
 │                │                │               │              │
 │  Return to Success Page        │               │              │
 │<───────────────────────────────────────────────│              │
```

## Components and Interfaces

### Frontend Components

#### 1. Cart Context (`lib/cart-context.tsx`)

**Current Implementation:** Already exists and functional
**Changes Required:** None - the existing cart context already supports multiple items with quantities

**Interface:**
```typescript
interface CartItem extends Course {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: number) => void;
  updateQuantity: (courseId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  showSuccessPopup: boolean;
  setShowSuccessPopup: (show: boolean) => void;
}
```

#### 2. Payment Utilities (`lib/payment-utils.ts`)

**Changes Required:** Update to support SePay and multiple courses

**New Interface:**
```typescript
interface SepayPaymentFormData {
  fullName: string;
  email: string;
  phone: string;
  telegram: string;
  birthday?: string;
  gender: string;
  address?: string;
  note?: string;
  cartItems: Array<{
    courseId: number;
    courseName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  returnUrl?: string;
}

interface SepayPaymentResponse {
  paymentUrl?: string;
  orderId?: string;
  error?: string;
}
```

#### 3. Checkout Page (`app/checkout/page.tsx`)

**Changes Required:** Update payment submission logic to send cart items instead of single programId

**Key Changes:**
- Collect all cart items with quantities
- Calculate total amount on frontend
- Send complete cart data to backend
- Handle SePay payment URL response

### Backend Components

#### 1. Order Entity

**Changes Required:** Update to store multiple courses

**New Structure:**
```typescript
interface OrderEntity {
  id: string;
  code: string; // UUID
  fullName: string;
  email: string;
  phone: string;
  telegram: string;
  birthday: Date;
  gender: string;
  address: string;
  note: string;
  totalAmount: number;
  status: OrderStatusEnum; // 0: pending, 1: confirmed, 2: canceled
  orderItems: OrderItemEntity[]; // NEW: Array of courses
  payment: PaymentEntity;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderItemEntity {
  id: string;
  orderId: string;
  courseId: number;
  courseName: string;
  courseSlug: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  courseData: any; // JSON field storing full course details
}
```

#### 2. SePay Service

**New Service:** Replace VNPay service with SePay integration

**Key Methods:**
```typescript
class SepayService {
  // Create payment URL for SePay
  async createPaymentUrl(orderData: OrderEntity): Promise<string>;
  
  // Verify SePay callback signature
  verifySignature(params: any, signature: string): boolean;
  
  // Handle IPN callback from SePay
  async handleIPN(params: SepayIPNParams): Promise<IPNResponse>;
  
  // Generate signature for request
  generateSignature(params: any): string;
}
```

#### 3. Order Service

**Changes Required:** Update to handle multiple courses

**Key Methods:**
```typescript
class OrderService {
  // Create order with multiple courses
  async createOrder(orderData: SepayPaymentFormData): Promise<OrderEntity>;
  
  // Update order status based on payment result
  async updateOrderStatus(orderId: string, status: OrderStatusEnum): Promise<void>;
  
  // Get order by code
  async getOrderByCode(code: string): Promise<OrderEntity>;
}
```

## Data Models

### Course Data Update

**File:** `data/courses.ts`

**Change Required:** Update "Sức Mạnh Vô Hạn" course

```typescript
// Current
{
  id: 1,
  slug: 'suc-manh-vo-han',
  price: {
    amount: '631,873,000',
    currency: 'VNĐ',
    deposit: '180.000.000'
  },
  // ... other fields
}

// No change needed - already in VND
// Note: The requirement mentioned USD to VND conversion, but the data shows it's already in VND
```

### Database Schema Changes

#### New Table: order_items

```sql
CREATE TABLE order_items (
  id VARCHAR(36) PRIMARY KEY,
  order_id VARCHAR(36) NOT NULL,
  course_id INT NOT NULL,
  course_name VARCHAR(255) NOT NULL,
  course_slug VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(15, 2) NOT NULL,
  subtotal DECIMAL(15, 2) NOT NULL,
  course_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

#### Updated Table: orders

```sql
ALTER TABLE orders 
  DROP COLUMN program,
  DROP COLUMN price,
  DROP COLUMN program_id,
  DROP COLUMN program_data,
  ADD COLUMN total_amount DECIMAL(15, 2) NOT NULL;
```

## SePay Integration Specifications

### API Endpoints

#### 1. Create Payment Request

**Endpoint:** `POST https://my.sepay.vn/userapi/transactions/create`

**Request Headers:**
```
Authorization: Bearer {API_KEY}
Content-Type: application/json
```

**Request Body:**
```json
{
  "account_number": "{ACCOUNT_NUMBER}",
  "amount": 1000000,
  "content": "ORDER_{ORDER_CODE}",
  "bank_code": "MB"
}
```

**Response:**
```json
{
  "status": 200,
  "messages": "Thành công",
  "data": {
    "transaction_id": "TXN123456",
    "qr_code": "https://...",
    "payment_url": "https://..."
  }
}
```

#### 2. IPN Callback

**Endpoint:** `POST {YOUR_WEBHOOK_URL}`

**Request Body from SePay:**
```json
{
  "id": 123456,
  "transaction_date": "2024-01-15 10:30:00",
  "account_number": "0123456789",
  "amount_in": 1000000,
  "amount_out": 0,
  "accumulated": 5000000,
  "code": "MB",
  "transaction_content": "ORDER_ABC123",
  "reference_number": "REF123",
  "body": "Full transaction description",
  "bank_brand_name": "MB Bank",
  "gateway": "SEPAY"
}
```

**Signature Verification:**
SePay uses HMAC-SHA256 for signature verification. The signature is sent in the `X-Sepay-Signature` header.

```typescript
function verifySignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const calculatedSignature = hmac.digest('hex');
  return calculatedSignature === signature;
}
```

### Configuration Requirements

**Environment Variables:**
```
SEPAY_API_KEY=your_api_key_here
SEPAY_ACCOUNT_NUMBER=your_account_number
SEPAY_SECRET_KEY=your_secret_key_for_webhook
SEPAY_API_URL=https://my.sepay.vn/userapi
SEPAY_WEBHOOK_URL=https://yourdomain.com/api/sepay/webhook
```

## Error Handling

### Frontend Error Handling

1. **Cart Operations:**
   - Empty cart validation before checkout
   - Network errors during cart operations
   - Invalid quantity inputs

2. **Payment Submission:**
   - Form validation errors
   - API connection failures
   - Invalid payment URL responses

### Backend Error Handling

1. **Order Creation:**
   - Invalid course data
   - Database transaction failures
   - Missing required fields

2. **SePay Integration:**
   - API authentication failures
   - Invalid signature verification
   - Network timeouts
   - Invalid callback data

3. **IPN Processing:**
   - Duplicate transaction handling
   - Invalid order references
   - Signature verification failures

### Error Response Format

```typescript
interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  details?: any;
}
```

## Testing Strategy

### Unit Testing

**Framework:** Jest for both frontend and backend

**Frontend Unit Tests:**
- Cart context operations (add, remove, update quantity)
- Total price calculations
- Payment data preparation
- Currency formatting

**Backend Unit Tests:**
- Order creation with multiple items
- SePay signature generation and verification
- Order status updates
- Database operations

### Property-Based Testing

**Framework:** fast-check (JavaScript/TypeScript property-based testing library)

**Why fast-check:**
- Native TypeScript support
- Excellent integration with Jest
- Rich set of built-in generators
- Active maintenance and community support

**Configuration:**
- Each property-based test will run a minimum of 100 iterations
- Tests will use random data generation to verify properties hold across all valid inputs
- Each test will be tagged with a comment referencing the design document property

**Test Tagging Format:**
```typescript
// Feature: sepay-payment-integration, Property 1: Cart total calculation consistency
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Adding new course creates cart item with quantity 1

*For any* course not currently in the cart, adding it to the cart should result in a cart item with quantity 1.
**Validates: Requirements 1.1**

### Property 2: Adding existing course increments quantity

*For any* course already in the cart, adding it again should increment its quantity by exactly 1.
**Validates: Requirements 1.2**

### Property 3: Quantity update reflects specified value

*For any* cart item and any valid positive quantity, updating the quantity should set it to exactly the specified value.
**Validates: Requirements 1.3**

### Property 4: Course removal eliminates cart item

*For any* course in the cart, removing it should result in that course no longer appearing in the cart items.
**Validates: Requirements 1.4**

### Property 5: Cart total equals sum of item subtotals

*For any* cart with items, the total should equal the sum of (price × quantity) for all items.
**Validates: Requirements 2.1**

### Property 6: Quantity change triggers total recalculation

*For any* cart item, when its quantity changes, the cart total should immediately reflect the new calculation.
**Validates: Requirements 2.2**

### Property 7: Item removal triggers total recalculation

*For any* cart item, when it is removed, the cart total should immediately reflect the recalculation without that item.
**Validates: Requirements 2.3**

### Property 8: Checkout displays all cart items

*For any* cart with items, the checkout page should display all cart items with their quantities and prices.
**Validates: Requirements 3.2**

### Property 9: Form validation catches missing required fields

*For any* checkout form submission with missing required fields, the validation should reject the submission and identify the missing fields.
**Validates: Requirements 3.3**

### Property 10: SePay request format matches specification

*For any* payment request, the request body should conform to SePay API specifications including all required fields.
**Validates: Requirements 4.2**

### Property 11: Signature verification accepts valid signatures

*For any* valid SePay callback with correct signature, the signature verification should return true.
**Validates: Requirements 4.3**

### Property 12: Signature verification rejects invalid signatures

*For any* SePay callback with incorrect or tampered signature, the signature verification should return false.
**Validates: Requirements 4.3, 8.5**

### Property 13: Successful payment updates order to confirmed

*For any* order with pending status, when a valid successful payment callback is received, the order status should be updated to confirmed.
**Validates: Requirements 4.4, 8.3**

### Property 14: Failed payment updates order to failed

*For any* order with pending status, when a valid failed payment callback is received, the order status should be updated to failed.
**Validates: Requirements 4.5, 8.4**

### Property 15: VND price formatting is consistent

*For any* price value in VND, the displayed format should follow Vietnamese currency conventions (e.g., "1.000.000 ₫").
**Validates: Requirements 6.2**

### Property 16: Order contains all cart items

*For any* cart with items, when an order is created, the order should contain all cart items with their correct quantities and prices.
**Validates: Requirements 7.1, 10.2**

### Property 17: Payment request amount matches cart total

*For any* order created from a cart, the payment request amount should exactly match the cart total.
**Validates: Requirements 7.2**

### Property 18: Successful payment clears cart

*For any* cart with items, when payment is confirmed as successful, the cart should be empty.
**Validates: Requirements 9.1, 9.2**

### Property 19: Empty cart has zero total

*For any* empty cart, the total should be exactly 0 VND.
**Validates: Requirements 9.3**

### Property 20: Order stores all customer information

*For any* order created, all customer information fields (fullName, email, phone, telegram, birthday, gender, address, note) should be stored.
**Validates: Requirements 10.1**

### Property 21: New order has pending status

*For any* newly created order, the initial status should be pending.
**Validates: Requirements 10.5**

### Property 22: Order stores payment transaction reference

*For any* order with payment, the order should store the payment transaction reference for tracking.
**Validates: Requirements 10.4**

## Implementation Notes

### Migration Strategy

1. **Phase 1: Data Preparation**
   - Update course data if needed (USD to VND conversion)
   - Create database migration for order_items table
   - Update order table schema

2. **Phase 2: Backend Implementation**
   - Implement SePay service
   - Update order service for multiple courses
   - Create new API endpoints
   - Implement IPN webhook handler

3. **Phase 3: Frontend Updates**
   - Update payment utilities for SePay
   - Modify checkout page to send cart items
   - Update payment response handling

4. **Phase 4: Testing**
   - Unit tests for all components
   - Property-based tests for correctness properties
   - Integration tests for payment flow
   - Manual testing with SePay sandbox

5. **Phase 5: Configuration & Deployment**
   - Create configuration documentation
   - Set up environment variables
   - Deploy to staging for testing
   - Deploy to production

### Backward Compatibility

- Keep existing VNPay code temporarily with feature flag
- Allow gradual migration of existing orders
- Maintain existing order data structure for historical orders

### Security Considerations

1. **API Key Protection:**
   - Store SePay credentials in environment variables
   - Never commit credentials to version control
   - Use different keys for staging and production

2. **Signature Verification:**
   - Always verify SePay signatures on callbacks
   - Reject requests with invalid signatures
   - Log all verification failures for security monitoring

3. **Data Validation:**
   - Validate all input data before processing
   - Sanitize user inputs to prevent injection attacks
   - Validate payment amounts match order totals

4. **HTTPS Only:**
   - Ensure all payment-related endpoints use HTTPS
   - Configure SePay webhook URL with HTTPS

### Performance Considerations

1. **Database Optimization:**
   - Index order_code for fast lookups
   - Index payment transaction references
   - Use database transactions for order creation

2. **Caching:**
   - Cache course data to reduce database queries
   - Cache SePay configuration

3. **Async Processing:**
   - Process IPN callbacks asynchronously
   - Use queue for webhook notifications

### Monitoring and Logging

1. **Payment Events:**
   - Log all payment requests
   - Log all IPN callbacks
   - Log signature verification results

2. **Error Tracking:**
   - Track payment failures
   - Monitor signature verification failures
   - Alert on unusual patterns

3. **Metrics:**
   - Track payment success rate
   - Monitor average payment processing time
   - Track cart abandonment rate
