# Implementation Plan

- [x] 1. Create SePay configuration documentation





  - Create a comprehensive guide for setting up SePay credentials
  - Document all required environment variables
  - Provide instructions for obtaining SePay API credentials
  - Include example values for testing
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 2. Update course data for currency consistency





  - Review all course prices in data/courses.ts
  - Verify "Sức Mạnh Vô Hạn" course is in VND (already appears to be)
  - Ensure all courses use VND currency format consistently
  - _Requirements: 6.1_

- [ ] 3. Create database migration for multi-course orders





  - Create migration to add order_items table
  - Create migration to update orders table (remove single program fields, add total_amount)
  - Add foreign key relationships
  - Test migration rollback
  - _Requirements: 10.2_

- [ ] 4. Implement SePay service (backend)
- [ ] 4.1 Create SePay service class with configuration
  - Create sepay.service.ts with configuration loading
  - Implement environment variable validation
  - Add error handling for missing configuration
  - _Requirements: 4.1_

- [ ] 4.2 Implement payment URL generation
  - Create method to generate SePay payment request
  - Format request according to SePay API specifications
  - Generate proper request signature
  - Return payment URL
  - _Requirements: 4.2, 7.2_

- [ ] 4.3 Write property test for payment request format
  - **Property 10: SePay request format matches specification**
  - **Validates: Requirements 4.2**

- [ ] 4.4 Implement signature verification
  - Create method to verify SePay callback signatures
  - Use HMAC-SHA256 for signature calculation
  - Compare calculated signature with received signature
  - _Requirements: 4.3, 8.2_

- [ ] 4.5 Write property test for signature verification
  - **Property 11: Signature verification accepts valid signatures**
  - **Property 12: Signature verification rejects invalid signatures**
  - **Validates: Requirements 4.3, 8.5**

- [ ] 4.6 Implement IPN callback handler
  - Create endpoint to receive SePay callbacks
  - Verify callback signature
  - Parse callback data
  - Update order and payment status
  - Handle success and failure cases
  - _Requirements: 8.1, 8.3, 8.4, 8.5_

- [ ] 4.7 Write property tests for payment status updates
  - **Property 13: Successful payment updates order to confirmed**
  - **Property 14: Failed payment updates order to failed**
  - **Validates: Requirements 4.4, 4.5, 8.3, 8.4**

- [ ] 5. Update order service for multi-course support (backend)
- [ ] 5.1 Create OrderItem entity
  - Define OrderItemEntity with all required fields
  - Add relationship to OrderEntity
  - Add TypeORM decorators
  - _Requirements: 10.2_

- [ ] 5.2 Update Order entity
  - Add orderItems relationship
  - Add totalAmount field
  - Remove old single-program fields
  - Update TypeORM decorators
  - _Requirements: 10.1, 10.2, 10.3_

- [ ] 5.3 Implement multi-course order creation
  - Update createOrder method to accept cart items array
  - Create order with all cart items
  - Calculate and store total amount
  - Create order items records
  - Use database transaction for atomicity
  - _Requirements: 7.1, 10.1, 10.2, 10.3, 10.5_

- [ ] 5.4 Write property test for order creation
  - **Property 16: Order contains all cart items**
  - **Property 20: Order stores all customer information**
  - **Property 21: New order has pending status**
  - **Validates: Requirements 7.1, 10.1, 10.2, 10.5**

- [ ] 5.5 Write property test for payment amount matching
  - **Property 17: Payment request amount matches cart total**
  - **Validates: Requirements 7.2**

- [ ] 5.6 Update order status management
  - Implement method to update order status
  - Handle status transitions (pending → confirmed/failed)
  - Add validation for status changes
  - _Requirements: 4.4, 4.5_

- [ ] 6. Update payment API endpoint (backend)
- [ ] 6.1 Update payment endpoint to accept cart items
  - Modify POST /api/order/payment to accept cartItems array
  - Validate cart items data
  - Calculate total amount
  - Create order with multiple courses
  - Generate SePay payment URL
  - Return payment URL to client
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 6.2 Write unit tests for payment endpoint
  - Test with single course
  - Test with multiple courses
  - Test with invalid data
  - Test error handling
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 7. Update frontend payment utilities
- [ ] 7.1 Update payment data interfaces
  - Create SepayPaymentFormData interface
  - Create SepayPaymentResponse interface
  - Update type definitions
  - _Requirements: 7.1_

- [ ] 7.2 Update sendPaymentRequest function
  - Modify to send cart items instead of single programId
  - Update API endpoint URL if needed
  - Handle SePay response format
  - Update error handling
  - _Requirements: 7.1, 7.2_

- [ ] 7.3 Update preparePaymentData function
  - Accept cart items as parameter
  - Format cart items for API request
  - Calculate total amount
  - Include all customer information
  - _Requirements: 7.1_

- [ ] 7.4 Write property test for cart total calculation
  - **Property 5: Cart total equals sum of item subtotals**
  - **Validates: Requirements 2.1**

- [ ] 8. Update checkout page
- [ ] 8.1 Modify checkout form submission
  - Collect all cart items with quantities
  - Prepare payment data with cart items
  - Send request to updated API endpoint
  - Handle SePay payment URL response
  - Redirect to SePay payment page
  - _Requirements: 7.1, 7.4_

- [ ] 8.2 Write property test for checkout data preparation
  - **Property 8: Checkout displays all cart items**
  - **Validates: Requirements 3.2**

- [ ] 8.3 Write property test for form validation
  - **Property 9: Form validation catches missing required fields**
  - **Validates: Requirements 3.3**

- [ ] 9. Implement cart operations testing
- [ ] 9.1 Write property test for adding new course
  - **Property 1: Adding new course creates cart item with quantity 1**
  - **Validates: Requirements 1.1**

- [ ] 9.2 Write property test for adding existing course
  - **Property 2: Adding existing course increments quantity**
  - **Validates: Requirements 1.2**

- [ ] 9.3 Write property test for quantity updates
  - **Property 3: Quantity update reflects specified value**
  - **Validates: Requirements 1.3**

- [ ] 9.4 Write property test for course removal
  - **Property 4: Course removal eliminates cart item**
  - **Validates: Requirements 1.4**

- [ ] 9.5 Write property test for total recalculation on quantity change
  - **Property 6: Quantity change triggers total recalculation**
  - **Validates: Requirements 2.2**

- [ ] 9.6 Write property test for total recalculation on item removal
  - **Property 7: Item removal triggers total recalculation**
  - **Validates: Requirements 2.3**

- [ ] 9.7 Write property test for empty cart total
  - **Property 19: Empty cart has zero total**
  - **Validates: Requirements 9.3**

- [ ] 10. Implement cart clearing after payment
- [ ] 10.1 Update payment success handler
  - Clear cart after successful payment confirmation
  - Reset cart state
  - Update UI to show empty cart
  - _Requirements: 9.1, 9.2_

- [ ] 10.2 Write property test for cart clearing
  - **Property 18: Successful payment clears cart**
  - **Validates: Requirements 9.1, 9.2**

- [ ] 11. Update currency formatting
- [ ] 11.1 Verify VND formatting consistency
  - Check all price display components
  - Ensure consistent VND format (e.g., "1.000.000 ₫")
  - Update currency formatter if needed
  - _Requirements: 6.2_

- [ ] 11.2 Write property test for VND formatting
  - **Property 15: VND price formatting is consistent**
  - **Validates: Requirements 6.2**

- [ ] 12. Implement payment transaction tracking
- [ ] 12.1 Update order to store payment reference
  - Add payment transaction reference to order
  - Link order to payment entity
  - Store SePay transaction ID
  - _Requirements: 10.4_

- [ ] 12.2 Write property test for payment reference storage
  - **Property 22: Order stores payment transaction reference**
  - **Validates: Requirements 10.4**

- [ ] 13. Create SePay webhook endpoint
- [ ] 13.1 Implement webhook route
  - Create POST endpoint for SePay callbacks
  - Parse incoming webhook data
  - Verify signature
  - Process payment status update
  - Return appropriate response to SePay
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 13.2 Write unit tests for webhook handler
  - Test with valid signature
  - Test with invalid signature
  - Test with successful payment
  - Test with failed payment
  - Test error handling
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 14. Add logging and monitoring
- [ ] 14.1 Implement payment event logging
  - Log all payment requests
  - Log all IPN callbacks
  - Log signature verification results
  - Log order status changes
  - _Requirements: 4.3, 8.2_

- [ ] 14.2 Add error tracking
  - Track payment failures
  - Monitor signature verification failures
  - Alert on unusual patterns
  - _Requirements: 8.5_

- [ ] 15. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 16. Create environment configuration template
- [ ] 16.1 Create .env.example file
  - Add all SePay environment variables
  - Add comments explaining each variable
  - Include example values
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 16.2 Update deployment documentation
  - Document environment setup steps
  - Add SePay configuration instructions
  - Include troubleshooting guide
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 17. Integration testing
- [ ] 17.1 Test complete payment flow
  - Add courses to cart
  - Proceed to checkout
  - Submit payment
  - Verify order creation
  - Verify payment URL generation
  - Simulate SePay callback
  - Verify order status update
  - Verify cart clearing
  - _Requirements: All_

- [ ] 17.2 Test error scenarios
  - Test with invalid cart data
  - Test with network failures
  - Test with invalid signatures
  - Test with payment failures
  - _Requirements: 4.3, 8.5_

- [ ] 18. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
