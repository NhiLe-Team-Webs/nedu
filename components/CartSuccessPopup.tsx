"use client";

import { CheckCircle } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartSuccessPopup() {
  const { showSuccessPopup, setShowSuccessPopup } = useCart();

  if (!showSuccessPopup) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-pulse">
      <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
        <CheckCircle className="w-6 h-6" />
        <span className="font-semibold">Khóa học đã được thêm vào giỏ hàng thành công!</span>
        <button
          onClick={() => setShowSuccessPopup(false)}
          className="ml-4 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  );
}