# Requirements Document

## Introduction

This document outlines the requirements for migrating the N-Edu payment system from VNPay to SePay payment gateway, with enhanced support for multi-course cart checkout. The system will allow users to add multiple courses with varying quantities to their cart and process payment for the entire cart through SePay. Additionally, the "Sức Mạnh Vô Hạn" course pricing will be converted from USD to VND for consistency.

## Glossary

- **SePay**: The new payment gateway provider that will replace VNPay for processing payments
- **Cart System**: The shopping cart functionality that allows users to add multiple courses before checkout
- **Payment Gateway**: The third-party service that processes online payments
- **Course**: An educational program offered by N-Edu with associated pricing and details
- **Order**: A record of a user's purchase request containing customer information and selected courses
- **Payment Transaction**: A record of the payment processing attempt through SePay
- **Configuration File**: A document containing SePay API credentials and settings
- **VND**: Vietnamese Dong, the currency used for all course pricing
- **Cart Item**: A course added to the cart with a specific quantity
- **Checkout Flow**: The process from cart review to payment completion

## Requirements

### Requirement 1

**User Story:** As a user, I want to add multiple courses to my cart with different quantities, so that I can purchase several courses in a single transaction.

#### Acceptance Criteria

1. WHEN a user adds a course to the cart THEN the Cart System SHALL add the course with quantity 1 if not already present
2. WHEN a user adds a course already in the cart THEN the Cart System SHALL increment the quantity by 1
3. WHEN a user updates the quantity of a cart item THEN the Cart System SHALL update the quantity to the specified value
4. WHEN a user removes a course from the cart THEN the Cart System SHALL remove that course from the cart
5. WHEN the cart is displayed THEN the Cart System SHALL show each course with its individual price, quantity, and subtotal

### Requirement 2

**User Story:** As a user, I want to see the total price for all courses in my cart, so that I know how much I will pay before checkout.

#### Acceptance Criteria

1. WHEN the cart contains items THEN the Cart System SHALL calculate the total by summing all course prices multiplied by their quantities
2. WHEN a cart item quantity changes THEN the Cart System SHALL recalculate the total immediately
3. WHEN a course is removed from the cart THEN the Cart System SHALL recalculate the total immediately
4. WHEN the cart is empty THEN the Cart System SHALL display a total of 0 VND

### Requirement 3

**User Story:** As a user, I want to proceed to checkout with all courses in my cart, so that I can complete my purchase in one payment.

#### Acceptance Criteria

1. WHEN a user clicks checkout with items in the cart THEN the Cart System SHALL navigate to the checkout page
2. WHEN the checkout page loads THEN the Cart System SHALL display all cart items with quantities and prices
3. WHEN a user submits the checkout form THEN the Cart System SHALL validate all required customer information fields
4. WHEN customer information is valid THEN the Cart System SHALL proceed to payment processing

### Requirement 4

**User Story:** As a system administrator, I want to replace VNPay with SePay as the payment gateway, so that we can use the new payment provider.

#### Acceptance Criteria

1. WHEN the system processes a payment THEN the Payment Gateway SHALL use SePay API instead of VNPay API
2. WHEN creating a payment request THEN the Payment Gateway SHALL format the request according to SePay specifications
3. WHEN receiving a payment callback THEN the Payment Gateway SHALL validate the callback using SePay signature verification
4. WHEN the payment is successful THEN the Payment Gateway SHALL update the order status to confirmed
5. WHEN the payment fails THEN the Payment Gateway SHALL update the order status to failed

### Requirement 5

**User Story:** As a developer, I want a configuration guide for SePay credentials, so that I can easily set up the payment gateway when credentials are available.

#### Acceptance Criteria

1. WHEN the Configuration File is created THEN the Configuration File SHALL list all required SePay API credentials
2. WHEN the Configuration File is created THEN the Configuration File SHALL provide instructions for obtaining each credential
3. WHEN the Configuration File is created THEN the Configuration File SHALL specify where to place each credential in the environment configuration
4. WHEN the Configuration File is created THEN the Configuration File SHALL include example values for testing purposes

### Requirement 6

**User Story:** As a system administrator, I want the "Sức Mạnh Vô Hạn" course price converted from USD to VND, so that all courses use consistent currency.

#### Acceptance Criteria

1. WHEN the course data is updated THEN the Course SHALL have its price in VND instead of USD
2. WHEN the course is displayed THEN the Cart System SHALL show the price in VND format
3. WHEN calculating cart totals THEN the Cart System SHALL use the VND price for calculations

### Requirement 7

**User Story:** As a user, I want to receive a payment URL from SePay, so that I can complete my payment securely.

#### Acceptance Criteria

1. WHEN the checkout form is submitted THEN the Payment Gateway SHALL create an order with all cart items
2. WHEN the order is created THEN the Payment Gateway SHALL send a payment request to SePay with the total amount
3. WHEN SePay responds successfully THEN the Payment Gateway SHALL return a payment URL to the user
4. WHEN the payment URL is received THEN the Cart System SHALL redirect the user to the SePay payment page

### Requirement 8

**User Story:** As a system, I want to receive payment notifications from SePay, so that I can update order status automatically.

#### Acceptance Criteria

1. WHEN SePay sends a payment notification THEN the Payment Gateway SHALL receive the notification at the IPN endpoint
2. WHEN a payment notification is received THEN the Payment Gateway SHALL verify the signature using SePay secret key
3. WHEN the signature is valid and payment is successful THEN the Payment Gateway SHALL update the order status to confirmed
4. WHEN the signature is valid and payment fails THEN the Payment Gateway SHALL update the order status to failed
5. WHEN the signature is invalid THEN the Payment Gateway SHALL reject the notification and log the error

### Requirement 9

**User Story:** As a user, I want my cart to be cleared after successful payment, so that I can start fresh for my next purchase.

#### Acceptance Criteria

1. WHEN a payment is confirmed as successful THEN the Cart System SHALL clear all items from the cart
2. WHEN the user returns to the cart page after successful payment THEN the Cart System SHALL display an empty cart
3. WHEN the cart is cleared THEN the Cart System SHALL reset the total to 0 VND

### Requirement 10

**User Story:** As a system, I want to store order details with multiple courses, so that I can track what was purchased in each transaction.

#### Acceptance Criteria

1. WHEN an order is created THEN the Order SHALL store customer information including fullName, email, phone, telegram, birthday, gender, address, and note
2. WHEN an order is created THEN the Order SHALL store all cart items with their course details, quantities, and prices
3. WHEN an order is created THEN the Order SHALL store the total amount
4. WHEN an order is created THEN the Order SHALL store the payment transaction reference
5. WHEN an order is created THEN the Order SHALL have an initial status of pending
