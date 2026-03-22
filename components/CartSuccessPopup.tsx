"use client";

import { CheckCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function CartSuccessPopup() {
  const { showSuccessPopup, setShowSuccessPopup } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    if (showSuccessPopup) {
      // Auto dismiss after 3 seconds
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup, setShowSuccessPopup]);

  if (!showSuccessPopup) return null;

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[102] animate-in slide-in-from-top-2 duration-300">
      <div className="bg-white/90 backdrop-blur-xl rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20 px-4 py-3 flex items-center gap-3 min-w-[320px] max-w-[90vw]">
        {/* Success Icon */}
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
          <CheckCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-semibold text-gray-900 leading-tight">
            {t("cart_popup.added")}
          </p>
          <p className="text-[13px] text-gray-600 leading-snug">
            {t("cart_popup.success")}
          </p>
        </div>

        {/* Cart Icon Badge */}
        <div className="w-8 h-8 rounded-full bg-[#F8B516]/10 flex items-center justify-center shrink-0">
          <ShoppingCart className="w-4 h-4 text-[#F8B516]" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}