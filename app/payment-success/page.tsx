'use client'

import { useEffect, useState, Suspense, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import ErrorHandler from '@/components/ErrorHandler'
// import Receipt from '@/components/Receipt'

interface ReceiptData {
  receiptNumber: string
  issuedAt: string
  customer: {
    name: string
    email: string
    phone?: string
  }
  payment: {
    amount: number
    currency: string
    method: string
  }
  order: {
    orderCode: string
    courseName?: string
    program?: string
  }
  transaction?: {
    gatewayTransactionId?: string
    gateway?: string
    paymentDate?: string
  }
}

function PaymentSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [message, setMessage] = useState('Đang kiểm tra trạng thái thanh toán...')
  // Receipt feature temporarily disabled
  // const [receiptData, setReceiptData] = useState<ReceiptData | null>(null)
  // const [showReceipt, setShowReceipt] = useState(false)

  useEffect(() => {
    // Define timer globally if it's not already defined
    if (typeof window !== 'undefined' && typeof window.timer === 'undefined') {
      window.timer = null;
    }

    // Define updateTime function globally if it's not already defined
    if (typeof window !== 'undefined' && typeof window.updateTime === 'undefined') {
      window.updateTime = function () {
        console.log('updateTime called - timer is now defined');
      };
    }

    // Global error handler to catch and fix undefined variables
    const handleError = (event: ErrorEvent) => {
      if (event.message && event.message.includes('timer is not defined')) {
        // Define timer globally if it's not defined
        if (typeof window !== 'undefined') {
          window.timer = window.timer || null;
          console.log('Fixed undefined timer variable in payment success page');
          event.preventDefault();
        }
      }
    };

    window.addEventListener('error', handleError);

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  const processedRef = useRef(false)

  useEffect(() => {
    if (processedRef.current) return;

    const checkPaymentStatus = async () => {
      try {
        // Get payment method (SePay or VNPay)
        const paymentMethod = searchParams.get('paymentMethod')
        const programId = searchParams.get('programId')

        // Handle SePay payment callback
        if (paymentMethod === 'sepay') {
          const orderCode = searchParams.get('orderCode')
          const status = searchParams.get('status')
          const transactionId = searchParams.get('transactionId')
          const amount = searchParams.get('amount')

          console.log('SePay Response:', {
            orderCode,
            status,
            transactionId,
            amount,
            programId
          })

          // Verify transaction with backend API if transactionId is available
          if (transactionId) {
            try {
              const response = await fetch(`/api/sepay/verify-transaction?transactionId=${transactionId}`)
              const result = await response.json()

              console.log('Transaction Verification Result:', result)

              if (result.success && result.data && result.data.transaction) {
                // Check payment details from the official Sepay API response
                const transaction = result.data.transaction;
                const amountIn = parseFloat(transaction.amount_in || '0');

                // If we received money (amount_in > 0), consider it a success
                // We can also verify if amountIn matches the expected amount if needed
                if (amountIn > 0) {
                  processedRef.current = true
                  setStatus('success')
                  setMessage('Cảm ơn bạn đã đăng ký khóa học.')
                  // Optional: Verify amount matches if 'amount' param is present
                  if (amount) {
                    const expectedAmount = parseFloat(amount.toString());
                    if (Math.abs(amountIn - expectedAmount) > 1000) {
                      console.warn('Warning: Transaction amount mismatch.', { expected: expectedAmount, received: amountIn });
                      // We still treat it as success but log warning, or handle partial payment logic here
                    }
                  }

                  // Receipt feature temporarily disabled
                  // if (orderCode) {
                  //   try {
                  //     const receiptRes = await fetch(`/api/receipts/${orderCode}`)
                  //     if (receiptRes.ok) {
                  //       const receiptResult = await receiptRes.json()
                  //       if (receiptResult.success && receiptResult.receipt) {
                  //         setReceiptData(receiptResult.receipt)
                  //       }
                  //     }
                  //   } catch (err) {
                  //     console.error('Error fetching receipt:', err)
                  //   }
                  // }

                  clearCart() // Clear cart
                  return // Exit function
                }
              }
            } catch (error) {
              console.error('Error verifying transaction:', error)
            }
          }

          // Fallback to URL params check if API check fails or returns pending
          // Check payment status from SePay URL params
          if (status === 'success' || status === 'completed' || status === '00' || status === 'SUCCESS') {
            processedRef.current = true
            setStatus('success')
            setMessage('Cảm ơn bạn đã đăng ký khóa học.')

            // Clear the cart after successful payment
            clearCart()

            // Fetch receipt data and verify order status with API
            if (orderCode) {
              try {
                const response = await fetch(`/api/sepay/payment?orderCode=${orderCode}`)
                if (response.ok) {
                  const result = await response.json()
                  console.log('SePay Order status:', result)
                  if (result.order && result.order.status === 'success') {
                    setStatus('success')
                  }
                }

                // Receipt feature temporarily disabled
                // const receiptRes = await fetch(`/api/receipts/${orderCode}`)
                // if (receiptRes.ok) {
                //   const receiptResult = await receiptRes.json()
                //   if (receiptResult.success && receiptResult.receipt) {
                //     setReceiptData(receiptResult.receipt)
                //   }
                // }
              } catch (error) {
                console.error('Error checking SePay order status:', error)
              }
            }
          } else {
            // Payment failed or pending
            processedRef.current = true
            setStatus('failed')
            setMessage('Thanh toán thất bại hoặc chưa hoàn tất. Vui lòng thử lại hoặc liên hệ hỗ trợ.')
            console.error('SePay Payment failed or pending with status:', status)
          }
        }
        // Handle VNPay payment callback (legacy support)
        else {
          const vnp_ResponseCode = searchParams.get('vnp_ResponseCode')
          const vnp_TxnRef = searchParams.get('vnp_TxnRef')
          const vnp_Amount = searchParams.get('vnp_Amount')

          console.log('VNPAY Response:', {
            vnp_ResponseCode,
            vnp_TxnRef,
            vnp_Amount,
            programId
          })

          if (vnp_ResponseCode === '00') {
            // Payment successful
            processedRef.current = true
            setStatus('success')
            setMessage('Cảm ơn bạn đã đăng ký khóa học.')

            // Clear the cart after successful payment
            clearCart()

            // Optionally check order status with API
            if (vnp_TxnRef) {
              try {
                const response = await fetch(`https://api.nedu.nhi.sg/api/order/payment-status/${vnp_TxnRef}`)
                if (response.ok) {
                  const result = await response.json()
                  console.log('Order status:', result)
                }
              } catch (error) {
                console.error('Error checking order status:', error)
              }
            }
          } else {
            // Payment failed
            processedRef.current = true
            setStatus('failed')
            setMessage('Thanh toán thất bại. Vui lòng thử lại hoặc liên hệ hỗ trợ.')
            console.error('Payment failed with code:', vnp_ResponseCode)
          }
        }
      } catch (error) {
        console.error('Error processing payment callback:', error)
        setStatus('failed')
        setMessage('Có lỗi xảy ra khi xử lý thanh toán. Vui lòng liên hệ hỗ trợ.')
      }
    }

    checkPaymentStatus()
  }, [searchParams, clearCart])

  return (
    <>
      <ErrorHandler />
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            {status === 'loading' && (
              <div className="py-12 sm:py-16">
                <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-base sm:text-lg text-gray-600">{message}</p>
              </div>
            )}

            {status === 'success' && (
              <div className="py-8 sm:py-12">
                {/* Receipt feature temporarily disabled */}
                <div className="mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-3 sm:mb-4">
                  Thanh toán thành công!
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-2 max-w-2xl mx-auto px-4">
                  {message}
                </p>
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  Bạn vui lòng kiểm tra{' '}
                  <a href="https://gmail.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                    Gmail
                  </a>{' '}
                  ngay để nhận thông tin nhé.
                </p>
                <div className="mt-8 space-y-3 sm:space-y-4">
                  <Link
                    href="/"
                    className="inline-block bg-primary hover:bg-primary-dark text-white hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition text-sm sm:text-base sm:text-lg"
                  >
                    Về trang chủ
                  </Link>
                  <div className="block">
                    <Link
                      href="/program"
                      className="text-primary hover:text-primary-dark font-semibold transition text-sm sm:text-base"
                    >
                      ← Xem các khóa học khác
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {status === 'failed' && (
              <div className="py-12 sm:py-16">
                <div className="mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-3 sm:mb-4">
                  Thanh toán thất bại
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  {message}
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <Link
                    href="/cart"
                    className="inline-block bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition text-sm sm:text-base sm:text-lg"
                  >
                    Thử lại
                  </Link>
                  <div className="block">
                    <Link
                      href="/contact"
                      className="text-primary hover:text-primary-dark font-semibold transition text-sm sm:text-base"
                    >
                      ← Liên hệ hỗ trợ
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div >
    </>
  )
}

export default function PaymentSuccessPage() {
  return (
    <>
      <ErrorHandler />
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 py-8 sm:py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-base sm:text-lg text-gray-600">Đang tải...</p>
          </div>
        </div>
      }>
        <PaymentSuccessContent />
      </Suspense>
    </>
  )
}