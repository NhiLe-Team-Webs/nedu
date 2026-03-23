"use client";

import { CheckCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

import { useRouter } from "next/navigation";

export default function CartSuccessPopup() {
  const { showSuccessPopup, setShowSuccessPopup } = useCart();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (showSuccessPopup) {
      // Auto dismiss after 3.5 seconds
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup, setShowSuccessPopup]);

  if (!showSuccessPopup) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      <div className="bg-[rgba(51,51,51,0.85)] flex flex-col items-center justify-center w-[380px] min-h-[210px] py-5 rounded-md shadow-xl pointer-events-auto animate-fade-in">
        <div className="flex items-center justify-center mb-4">
          <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="40" fill="#00bfa5" />
            <polyline points="56 28 36 50 24 40" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-white text-lg text-center px-4 leading-snug block w-full font-semibold">
          Khóa học đã được thêm vào Giỏ hàng
        </span>
        <button
          onClick={() => { setShowSuccessPopup(false); router.push('/checkout'); }}
          className="mt-3 text-[#ff4d4f] hover:text-[#ff7875] text-[15px] font-semibold transition-colors cursor-pointer outline-none border-none bg-transparent block mx-auto underline"
          style={{ pointerEvents: 'auto' }}
        >
          Thanh toán ngay
        </button>
      </div>
    </div>
  );
}