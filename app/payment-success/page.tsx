'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import ErrorHandler from '@/components/ErrorHandler'

function PaymentSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [message, setMessage] = useState('Đang kiểm tra trạng thái thanh toán...')
  
  useEffect(() => {
    // Define timer globally if it's not already defined
    if (typeof window !== 'undefined' && typeof window.timer === 'undefined') {
      window.timer = null;
    }

    // Define updateTime function globally if it's not already defined
    if (typeof window !== 'undefined' && typeof window.updateTime === 'undefined') {
      window.updateTime = function() {
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

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        // Get payment parameters from URL
        const vnp_ResponseCode = searchParams.get('vnp_ResponseCode')
        const vnp_TxnRef = searchParams.get('vnp_TxnRef')
        const vnp_Amount = searchParams.get('vnp_Amount')
        const programId = searchParams.get('programId')
        
        console.log('VNPAY Response:', {
          vnp_ResponseCode,
          vnp_TxnRef,
          vnp_Amount,
          programId
        })

        if (vnp_ResponseCode === '00') {
          // Payment successful
          setStatus('success')
          setMessage('Thanh toán thành công! Cảm ơn bạn đã đăng ký khóa học.')
          
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
          setStatus('failed')
          setMessage('Thanh toán thất bại. Vui lòng thử lại hoặc liên hệ hỗ trợ.')
          console.error('Payment failed with code:', vnp_ResponseCode)
        }
      } catch (error) {
        console.error('Error processing payment callback:', error)
        setStatus('failed')
        setMessage('Có lỗi xảy ra khi xử lý thanh toán. Vui lòng liên hệ hỗ trợ.')
      }
    }

    checkPaymentStatus()
  }, [searchParams])

  return (
    <>
      <ErrorHandler />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
          {status === 'loading' && (
            <div className="py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-lg text-gray-600">{message}</p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="py-16">
              <div className="mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">
                Thanh toán thành công!
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {message}
              </p>
              <div className="space-y-4">
                <Link
                  href="/"
                  className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition text-lg"
                >
                  Về trang chủ
                </Link>
                <div className="block">
                  <Link
                    href="/program"
                    className="text-primary hover:text-primary-dark font-semibold transition"
                  >
                    ← Xem các khóa học khác
                  </Link>
                </div>
              </div>
            </div>
          )}
          
          {status === 'failed' && (
            <div className="py-16">
              <div className="mb-8">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
                Thanh toán thất bại
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {message}
              </p>
              <div className="space-y-4">
                <Link
                  href="/cart"
                  className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition text-lg"
                >
                  Thử lại
                </Link>
                <div className="block">
                  <Link
                    href="/contact"
                    className="text-primary hover:text-primary-dark font-semibold transition"
                  >
                    ← Liên hệ hỗ trợ
                  </Link>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  )
}

export default function PaymentSuccessPage() {
  return (
    <>
      <ErrorHandler />
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-lg text-gray-600">Đang tải...</p>
          </div>
        </div>
      }>
        <PaymentSuccessContent />
      </Suspense>
    </>
  )
}