'use client';

import { useState, useEffect, useRef } from 'react';
import { SePayPaymentResponse } from '@/types/sepay';
import { currencyFormatter } from '@/lib/payment-utils';

interface SePayPaymentQRProps {
  paymentData: SePayPaymentResponse;
  onPaymentComplete?: () => void;
  onPaymentFailed?: () => void;
}

export default function SePayPaymentQR({
  paymentData,
  onPaymentComplete,
  onPaymentFailed,
}: SePayPaymentQRProps) {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  // Use refs for callbacks to avoid dependency cycles affecting the effect
  const onPaymentCompleteRef = useRef(onPaymentComplete);
  const onPaymentFailedRef = useRef(onPaymentFailed);

  useEffect(() => {
    onPaymentCompleteRef.current = onPaymentComplete;
    onPaymentFailedRef.current = onPaymentFailed;
  }, [onPaymentComplete, onPaymentFailed]);

  // Polling to check payment status
  useEffect(() => {
    if (!paymentData.orderCode || paymentStatus !== 'pending') {
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        setIsChecking(true);
        const response = await fetch(
          `/api/sepay/payment?orderCode=${paymentData.orderCode}&t=${Date.now()}`
        );
        const data = await response.json();

        if (data.success && data.order) {
          const status = data.order.status;
          if (status === 'success') {
            setPaymentStatus('success');
            if (onPaymentCompleteRef.current) {
              onPaymentCompleteRef.current();
            }
          } else if (status === 'failed') {
            setPaymentStatus('failed');
            if (onPaymentFailedRef.current) {
              onPaymentFailedRef.current();
            }
          }
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      } finally {
        setIsChecking(false);
      }
    };

    // Check immediately
    checkPaymentStatus();

    // Poll every 5 seconds
    const interval = setInterval(() => {
      // Check current status ref or rely on effect cleanup? 
      // We rely on effect cleanup when paymentStatus changes.
      checkPaymentStatus();
    }, 5000);

    // Timer to track elapsed time
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [paymentData.orderCode, paymentStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (paymentStatus === 'success') {
    // Auto redirect after 3 seconds
    useEffect(() => {
      const timer = setTimeout(() => {
        if (onPaymentComplete) {
          onPaymentComplete();
        }
      }, 3000);

      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="card text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-green-600 mb-2">
            Thanh toán thành công!
          </h3>
          <p className="text-gray-600 mb-6">
            Đơn hàng của bạn đã được xác nhận thanh toán thành công.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => {
                if (onPaymentComplete) {
                  onPaymentComplete();
                }
              }}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Tiếp tục ngay
            </button>

            <p className="text-sm text-gray-500">
              Tự động chuyển trang sau 3 giây...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="card text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-red-600 mb-2">
            Thanh toán thất bại
          </h3>
          <p className="text-gray-600">
            Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 text-text-primary">
          Quét mã QR để thanh toán
        </h2>
        <p className="text-text-secondary">
          Sử dụng ứng dụng ngân hàng của bạn để quét mã QR và hoàn tất thanh toán
        </p>
      </div>

      {/* QR Code */}
      <div className="flex justify-center mb-6">
        {paymentData.qrCodeUrl ? (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={paymentData.qrCodeUrl}
              alt="QR Code thanh toán"
              className="w-64 h-64"
            />
          </div>
        ) : (
          <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Đang tải QR code...</p>
          </div>
        )}
      </div>

      {/* Payment Information */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-text-secondary font-semibold">Mã đơn hàng:</span>
            <span className="font-bold text-text-primary">{paymentData.orderCode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary font-semibold">Số tiền:</span>
            <span className="font-bold text-primary text-lg">
              {paymentData.amount ? currencyFormatter.format(paymentData.amount) : 'N/A'}
            </span>
          </div>
          {paymentData.accountNumber && (
            <div className="flex justify-between">
              <span className="text-text-secondary font-semibold">Số tài khoản:</span>
              <span className="font-bold text-text-primary">{paymentData.accountNumber}</span>
            </div>
          )}
          {paymentData.bankCode && (
            <div className="flex justify-between">
              <span className="text-text-secondary font-semibold">Ngân hàng:</span>
              <span className="font-bold text-text-primary">{paymentData.bankCode}</span>
            </div>
          )}
        </div>
      </div>

      {/* Status and Timer */}
      <div className="text-center">
        <div className="mb-4">
          {isChecking ? (
            <div className="flex items-center justify-center gap-2 text-primary">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Đang kiểm tra thanh toán...</span>
            </div>
          ) : (
            <p className="text-text-secondary">
              Đang chờ thanh toán... ({formatTime(timeElapsed)})
            </p>
          )}
        </div>
        <p className="text-sm text-text-tertiary">
          Hệ thống sẽ tự động kiểm tra thanh toán sau khi bạn hoàn tất chuyển khoản
        </p>
      </div>
    </div>
  );
}

