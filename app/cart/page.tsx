"use client";

import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from "@/lib/LanguageContext";

export default function CartPage() {
  const { t } = useLanguage();
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();

  const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background-secondary py-8 sm:py-12">
        <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
          <div className="text-center py-12 sm:py-16">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-text-primary">{t("cart.empty_title")}</h1>
            <p className="text-text-secondary mb-6 sm:mb-8 text-sm sm:text-base">{t("cart.empty_desc")}</p>
            <Link
              href="/program"
              className="btn-primary text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              {t("cart.continue_browsing")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7] py-8 sm:py-12 ios-safe-padding-bottom">
      <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-text-primary pl-2">{t("cart.title")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-ios-xl shadow-ios-card p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-300 hover:shadow-ios-float border border-white/40">
                <img
                  src={item.heroImage}
                  alt={t(item.title)}
                  className="w-full sm:w-28 md:w-32 h-28 sm:h-32 object-cover rounded-ios-lg shadow-sm"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-text-primary line-clamp-2">{t(item.title)}</h3>
                    <p className="text-text-secondary mb-2 text-sm sm:text-base bg-gray-100 inline-block px-2 py-1 rounded-md">{item.category.map(c => t(c)).join(', ')}</p>
                    <div className="price text-base sm:text-lg text-primary font-bold">
                      {item.price.currency === 'VNĐ'
                        ? currencyFormatter.format(parseInt(item.price.amount.replace(/\./g, '')))
                        : `${item.price.currency} ${item.price.amount}`
                      }
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 sm:mt-4">
                    <div className="flex items-center gap-3 sm:gap-4 bg-gray-50 rounded-full p-1 border border-gray-100">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition active:scale-90 border border-gray-100"
                      >
                        <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                      </button>
                      <span className="w-6 sm:w-8 text-center font-semibold text-base">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition active:scale-90 border border-gray-100"
                      >
                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition p-2 rounded-full hover:bg-red-50 active:scale-90"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-ios-xl shadow-ios-card p-6 sm:p-8 sticky top-24 sm:top-28 border border-white/40">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-text-primary border-b pb-4">{t("cart.summary_title")}</h2>

              <div className="space-y-3 mb-6 sm:mb-8">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-text-secondary">{t("cart.total_items")}</span>
                  <span className="font-semibold">{getTotalItems()}</span>
                </div>
                <div className="flex justify-between text-base sm:text-lg items-center pt-2">
                  <span className="text-text-primary font-bold">{t("cart.total_price")}</span>
                  <span className="font-bold text-xl sm:text-2xl text-primary price">
                    {currencyFormatter.format(getTotalPrice())}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center bg-primary text-white font-bold py-3.5 rounded-full shadow-ios-md hover:shadow-ios-lg active:scale-[0.98] transition-all duration-300 min-h-[48px] text-base ios-haptic-active"
              >
                {t("cart.checkout_btn")}
              </Link>

              <Link
                href="/program"
                className="w-full mt-4 text-center text-gray-500 hover:text-primary font-semibold transition py-2 block text-sm sm:text-base rounded-lg hover:bg-gray-50"
              >
                {t("cart.continue_shopping")}
              </Link>
            </div>
          </div>
        </div>

        {/* Other Courses Section */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-text-primary text-center">{t("cart.other_courses")}</h2>
          <div className="text-center">
            <Link
              href="/program"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 rounded-full text-text-primary hover:bg-gray-50 hover:shadow-ios-md transition-all duration-300 text-sm sm:text-base min-h-[44px] font-semibold ios-haptic-active"
            >
              {t("cart.view_all")}
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}