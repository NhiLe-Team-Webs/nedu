"use client";

import { CheckCircle } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartSuccessPopup() {
  const { showSuccessPopup, setShowSuccessPopup } = useCart();

  if (!showSuccessPopup) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-pulse">
      <div className="success-message shadow-xl">
        <CheckCircle className="w-6 h-6" />
        <span className="font-semibold">Khóa học đã được thêm vào giỏ hàng thành công!</span>
        <button
          onClick={() => setShowSuccessPopup(false)}
          className="ml-4 text-white hover:text-gray-200 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
}