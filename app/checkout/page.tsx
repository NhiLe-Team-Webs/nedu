"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Tag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    telegram: '',
    birthdate: '',
    gender: '',
    address: '',
    note: ''
  });
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [agreed, setAgreed] = useState(false);

  const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  });

  const subtotal = getTotalPrice();
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal - discountAmount;

  const handleApplyDiscount = () => {
    // Simple discount logic for demo
    if (discountCode === 'SAVE10') {
      setDiscount(10);
    } else if (discountCode === 'SAVE20') {
      setDiscount(20);
    } else {
      setDiscount(0);
      alert('Mã giảm giá không hợp lệ');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('Vui lòng đồng ý với điều khoản sử dụng');
      return;
    }
    alert('Đặt hàng thành công! (This is a demo)');
    clearCart();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background-secondary py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4 text-text-primary">Giỏ hàng của bạn đang trống</h1>
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
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại giỏ hàng
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-text-primary">Thanh toán</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <h2 className="text-xl font-bold mb-4 text-text-primary">Các khóa học trong giỏ hàng</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-4 pb-4 border-b last:border-b-0 border-border-color">
                    <img
                      src={item.heroImage}
                      alt={item.title}
                      className="w-full md:w-24 h-24 object-cover rounded-xl"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1 text-text-primary">{item.title}</h3>
                      <p className="text-text-secondary mb-2">{item.category.join(', ')}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-text-secondary">Số lượng: {item.quantity}</span>
                        </div>
                        <div className="price">
                          {item.price.currency === 'VNĐ'
                            ? currencyFormatter.format(parseInt(item.price.amount.replace(/\./g, '')) * item.quantity)
                            : `${item.price.currency} ${item.price.amount}`
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4 text-text-primary">Thông tin thanh toán</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-primary font-semibold mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nhập họ và tên của bạn"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-text-primary font-semibold mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Nhập email của bạn"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-text-primary font-semibold mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Nhập số điện thoại"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-text-primary font-semibold mb-2">
                      Username Telegram <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="@username"
                      value={formData.telegram}
                      onChange={(e) => handleInputChange('telegram', e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-text-primary font-semibold mb-2">
                      Ngày sinh <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.birthdate}
                      onChange={(e) => handleInputChange('birthdate', e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-text-primary font-semibold mb-2">
                      Giới tính <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="female">Nữ</option>
                      <option value="male">Nam</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-text-primary font-semibold mb-2">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập địa chỉ của bạn"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-text-primary font-semibold mb-2">
                    Ghi chú
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Nhập ghi chú (nếu có)"
                    value={formData.note}
                    onChange={(e) => handleInputChange('note', e.target.value)}
                    className="input-field"
                  />
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="terms" className="text-sm text-text-primary">
                    Bằng cách tích vào ô này, bạn xác nhận đã đọc, hiểu và đồng ý với{' '}
                    <Link href="/policy" className="text-primary font-semibold hover:underline">
                      Chính sách bảo mật
                    </Link>{' '}
                    và{' '}
                    <Link href="/terms" className="text-primary font-semibold hover:underline">
                      Điều khoản sử dụng
                    </Link>{' '}
                    của chúng tôi.
                  </label>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-xl font-bold mb-4 text-text-primary">Tóm tắt đơn hàng</h2>
              
              {/* Discount Code */}
              <div className="mb-6">
                <label className="block text-text-primary font-semibold mb-2">
                  Mã giảm giá
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                    <input
                      type="text"
                      placeholder="Nhập mã giảm giá"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyDiscount}
                    className="btn-secondary"
                  >
                    Áp dụng
                  </button>
                </div>
                {discount > 0 && (
                  <div className="mt-2 text-success text-sm font-semibold">
                    Đã áp dụng mã giảm giá: {discount}%
                  </div>
                )}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Tạm tính:</span>
                  <span className="font-semibold">{currencyFormatter.format(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-success">Giảm giá:</span>
                    <span className="font-semibold text-success">-{currencyFormatter.format(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="price">{currencyFormatter.format(total)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="btn-primary w-full text-center block"
              >
                Hoàn tất thanh toán
              </button>
              
              <Link
                href="/cart"
                className="w-full mt-3 text-center text-primary hover:text-primary-dark font-semibold transition block"
              >
                ← Quay lại giỏ hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}