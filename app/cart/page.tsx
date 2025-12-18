"use client";

import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
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
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-text-primary">Giỏ hàng của bạn đang trống</h1>
            <p className="text-text-secondary mb-6 sm:mb-8 text-sm sm:text-base">Hãy thêm các khóa học bạn quan tâm vào giỏ hàng</p>
            <Link
              href="/program"
              className="btn-primary text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Tiếp tục xem khóa học
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-secondary py-8 sm:py-12">
      <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-text-primary">Giỏ hàng của bạn</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card flex flex-col sm:flex-row gap-3 sm:gap-4">
                <img
                  src={item.heroImage}
                  alt={item.title}
                  className="w-full sm:w-28 md:w-32 h-28 sm:h-32 object-cover rounded-xl"
                />
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-text-primary line-clamp-2">{item.title}</h3>
                    <p className="text-text-secondary mb-2 text-sm sm:text-base">{item.category.join(', ')}</p>
                    <div className="price text-base sm:text-lg">
                      {item.price.currency === 'VNĐ'
                        ? currencyFormatter.format(parseInt(item.price.amount.replace(/\./g, '')))
                        : `${item.price.currency} ${item.price.amount}`
                      }
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 sm:mt-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 sm:w-8 sm:h-8 rounded-full border border-border-color flex items-center justify-center hover:bg-secondary-light transition"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 sm:w-12 text-center font-semibold text-sm sm:text-base">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 sm:w-8 sm:h-8 rounded-full border border-border-color flex items-center justify-center hover:bg-secondary-light transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-error hover:text-error-dark transition p-1"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-20 sm:top-24">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-text-primary">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-text-secondary">Tổng số khóa học:</span>
                  <span className="font-semibold">{getTotalItems()}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-text-secondary">Tổng tiền:</span>
                  <span className="font-bold text-base sm:text-lg price">
                    {currencyFormatter.format(getTotalPrice())}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="btn-primary w-full text-center block text-sm sm:text-base"
              >
                Tiến hành thanh toán
              </Link>
              
              <Link
                href="/program"
                className="w-full mt-3 text-center text-primary hover:text-primary-dark font-semibold transition block text-sm sm:text-base"
              >
                ← Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>

        {/* Other Courses Section */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-text-primary text-center">Các khóa học khác</h2>
          <div className="text-center">
            <Link
              href="/program"
              className="btn-secondary text-sm sm:text-base"
            >
              Xem tất cả khóa học
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}