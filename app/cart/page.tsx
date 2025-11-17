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
      <div className="min-h-screen bg-background-secondary py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4 text-text-primary">Giỏ hàng của bạn đang trống</h1>
            <p className="text-text-secondary mb-8">Hãy thêm các khóa học bạn quan tâm vào giỏ hàng</p>
            <Link
              href="/program"
              className="btn-primary"
            >
              <ArrowLeft className="w-5 h-5" />
              Tiếp tục xem khóa học
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-secondary py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-text-primary">Giỏ hàng của bạn</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card flex flex-col md:flex-row gap-4">
                <img
                  src={item.heroImage}
                  alt={item.title}
                  className="w-full md:w-32 h-32 object-cover rounded-xl"
                />
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-text-primary">{item.title}</h3>
                    <p className="text-text-secondary mb-2">{item.category.join(', ')}</p>
                    <div className="price">
                      {item.price.currency === 'VNĐ'
                        ? currencyFormatter.format(parseInt(item.price.amount.replace(/\./g, '')))
                        : `${item.price.currency} ${item.price.amount}`
                      }
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-border-color flex items-center justify-center hover:bg-secondary-light transition"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-border-color flex items-center justify-center hover:bg-secondary-light transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-error hover:text-error-dark transition"
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
            <div className="card sticky top-24">
              <h2 className="text-xl font-bold mb-4 text-text-primary">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Tổng số khóa học:</span>
                  <span className="font-semibold">{getTotalItems()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Tổng tiền:</span>
                  <span className="font-bold text-lg price">
                    {currencyFormatter.format(getTotalPrice())}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="btn-primary w-full text-center block"
              >
                Tiến hành thanh toán
              </Link>
              
              <Link
                href="/program"
                className="w-full mt-3 text-center text-primary hover:text-primary-dark font-semibold transition block"
              >
                ← Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>

        {/* Other Courses Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-text-primary text-center">Các khóa học khác</h2>
          <div className="text-center">
            <Link
              href="/program"
              className="btn-secondary"
            >
              Xem tất cả khóa học
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}