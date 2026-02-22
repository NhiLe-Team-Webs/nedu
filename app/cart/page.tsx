"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from "@/lib/LanguageContext";

export default function CartPage() {
  const { t } = useLanguage();
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-8 sm:py-12">
        <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
          <div className="text-center py-12 sm:py-16">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900">{t("cart.empty_title")}</h1>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">{t("cart.empty_desc")}</p>
            <Link
              href="/program"
              className="inline-block px-8 py-3 bg-primary hover:bg-primary-dark !text-white rounded-xl text-base font-bold transition-all"
            >
              {t("cart.continue_browsing")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-grow">
      <section className="bg-white py-12 lg:py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header with Total and Checkout */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
                {t("cart.order_total_text")} <span className="text-primary font-bold">{currencyFormatter.format(getTotalPrice())}</span>
              </h1>
              <Link
                href="/checkout"
                className="items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 w-full md:w-[300px] h-12 bg-primary hover:bg-primary-dark !text-white transition-all rounded-xl text-base font-bold py-3 mx-auto block"
              >
                {t("cart.checkout_button")}
              </Link>
            </div>

            {/* Cart Items List */}
            <div className="border-t border-gray-200 mt-12 pt-12">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-start gap-6 py-6 border-b border-gray-200"
                >
                  {/* Product Image */}
                  <div className="relative w-full md:w-48 h-auto md:h-32 rounded-lg overflow-hidden flex-shrink-0 aspect-video md:aspect-auto">
                    <Image
                      alt={t(item.title)}
                      src={item.heroImage}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 192px"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-grow">
                    <h2 className="text-2xl font-semibold text-gray-900">{t(item.title)}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.category.map(c => t(c)).join(', ')}
                    </p>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex-shrink-0 w-full md:w-auto text-left md:text-right">
                    <p className="text-xl font-semibold text-gray-900 mb-2">
                      {item.price.currency === 'VNĐ'
                        ? currencyFormatter.format(parseInt(item.price.amount.replace(/\./g, '')))
                        : `${item.price.currency} ${item.price.amount}`
                      }
                    </p>
                    <div className="flex items-center gap-4 justify-start md:justify-end">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 sm:gap-4 bg-gray-50 rounded-full p-1 border border-gray-100">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition active:scale-90 border border-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                        </button>
                        <span className="w-6 sm:w-8 text-center font-semibold text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))}
                          disabled={item.quantity >= 10}
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition active:scale-90 border border-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                        </button>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:underline text-sm font-medium"
                      >
                        {t("cart.delete_button")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}