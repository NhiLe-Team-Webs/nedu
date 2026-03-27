"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Tag, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useRouter } from 'next/navigation';
import { preparePaymentData, sendPaymentRequest, handlePaymentResponse, currencyFormatter, sendSePayPaymentRequest, prepareSePayPaymentData } from '@/lib/payment-utils';
import SePayPaymentQR from '@/components/SePayPaymentQR';
import { SePayPaymentResponse } from '@/types/sepay';
import { useLanguage } from '@/lib/LanguageContext';
import { validateCartAccountConsistency } from '@/lib/sepay-config';
import { getCourseDetailBySlug } from '@/lib/services/courseService';

export default function CheckoutPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { items, getTotalPrice, clearCart, removeFromCart, updateQuantity } = useCart();
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
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [sepayPaymentData, setSepayPaymentData] = useState<SePayPaymentResponse | null>(null);
  const [showPaymentQR, setShowPaymentQR] = useState(false);
  const [thirtyDayCheckoutImage, setThirtyDayCheckoutImage] = useState<string | null>(null);

  useEffect(() => {
    const hasThirtyDayCourse = items.some((item) => item.slug === 'thu-thach-30-ngay');
    if (!hasThirtyDayCourse) return;

    let isMounted = true;

    const loadThirtyDayImage = async () => {
      const courseDetail = await getCourseDetailBySlug('thu-thach-30-ngay');
      const image = courseDetail?.program?.image?.trim();
      if (isMounted && image) {
        setThirtyDayCheckoutImage(image);
      }
    };

    loadThirtyDayImage();

    return () => {
      isMounted = false;
    };
  }, [items]);

  const subtotal = getTotalPrice();
  const discountAmount = discountType === 'percentage'
    ? subtotal * (discount / 100)
    : discount;
  const total = subtotal - discountAmount;

  const handleApplyDiscount = () => {
    const code = discountCode.trim().toUpperCase();

    // Check if cart contains "Là Chính Mình 04" course
    const hasLaChinhMinh4 = items.some(item =>
      item.id === 2
    );

    // ... handleApplyDiscount logic ...
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    if (!agreed) {
      setErrors(['Vui lòng đồng ý với điều khoản sử dụng']);
      return;
    }

    // 1. Process Telegram username to ensure @ prefix
    let telegram = formData.telegram.trim();
    if (telegram && !telegram.startsWith('@')) {
      telegram = `@${telegram}`;
    }

    // 2. Validate required fields with specific error messages
    const validationErrors: string[] = [];
    if (!formData.name.trim()) validationErrors.push('Vui lòng nhập họ tên');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      validationErrors.push('Vui lòng nhập địa chỉ email');
    } else if (!emailRegex.test(formData.email)) {
      validationErrors.push('Địa chỉ email không hợp lệ');
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      validationErrors.push('Vui lòng nhập số điện thoại');
    } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      validationErrors.push('Số điện thoại phải có 10 hoặc 11 chữ số');
    }

    if (!telegram) validationErrors.push('Vui lòng nhập Telegram username');
    if (!formData.birthdate) validationErrors.push('Vui lòng chọn ngày sinh');
    if (!formData.gender) validationErrors.push('Vui lòng chọn giới tính');

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      // Scroll to error display
      setTimeout(() => {
        const errorDiv = document.querySelector('.bg-red-50');
        if (errorDiv) {
          errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return;
    }

    setIsLoading(true);
    setShowPaymentQR(false);
    setSepayPaymentData(null);

    try {
      // Calculate total amount for all items in cart (after discount)
      const totalAmount = getTotalPrice();
      const discountAmount = discountType === 'percentage'
        ? totalAmount * (discount / 100)
        : discount;
      const finalAmount = totalAmount - discountAmount;

      // Get all program IDs from cart items
      const programIds = items.map(item => (item.paymentId || item.id).toString());

      // Validate cart has no mixed bank accounts
      const cartValidation = validateCartAccountConsistency(programIds);
      if (!cartValidation.isValid) {
        setErrors([
          'Giỏ hàng chứa các khoá học thuộc tài khoản thanh toán khác nhau. Vui lòng tách thành các đơn hàng riêng biệt để thanh toán.'
        ]);
        setIsLoading(false);
        return;
      }

      // Construct course names string (e.g. "Course A, Course B")
      // Nếu có khoá "thu-thach-30-ngay" thì courseName là "THỬ THÁCH 30 NGÀY"
      let courseName = items.map(item => t(item.title)).join(', ');
      if (items.some(item => item.slug === 'thu-thach-30-ngay')) {
        courseName = 'THỬ THÁCH 30 NGÀY';
      }

      // Determine coupon code used (if any discount applied)
      const appliedCouponCode = discount > 0 ? discountCode : '';

      // Prepare SePay payment data with processed telegram
      const sepayData = prepareSePayPaymentData(
        { ...formData, telegram },
        finalAmount,
        undefined, // No single programId for checkout
        programIds, // Use programIds for multiple courses
        courseName,
        appliedCouponCode
      );

      console.log('Sending SePay payment request:', sepayData);

      // Send SePay payment request
      const paymentResponse = await sendSePayPaymentRequest(sepayData);

      if (paymentResponse.error || !paymentResponse.success) {
        throw new Error(paymentResponse.error || 'Không thể tạo thanh toán');
      }

      if (paymentResponse.qrCodeUrl) {
        // Show QR code payment UI
        setSepayPaymentData(paymentResponse);
        setShowPaymentQR(true);
        // Scroll to QR code
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      } else {
        throw new Error('Không nhận được QR code từ hệ thống thanh toán');
      }

    } catch (error) {
      console.error('Payment submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định';
      setErrors([`Lỗi khi gửi thông tin: ${errorMessage}`]);
      alert(`Lỗi khi gửi thông tin: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentComplete = () => {
    // Clear cart and redirect to success page
    clearCart();

    const params = new URLSearchParams({
      status: 'success',
      paymentMethod: 'sepay',
    });

    if (sepayPaymentData?.orderCode) {
      params.set('orderCode', sepayPaymentData.orderCode);
    }

    if (typeof sepayPaymentData?.amount === 'number') {
      params.set('amount', String(sepayPaymentData.amount));
    }

    router.push(`/payment-success?${params.toString()}`);
  };

  const handlePaymentFailed = () => {
    setErrors(['Thanh toán thất bại. Vui lòng thử lại.']);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'telegram') {
      // Strip leading @ if user types it, because we have a fixed @ span in UI
      const cleanValue = value.replace(/^@+/, '');
      setFormData(prev => ({ ...prev, [field]: cleanValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  if (items.length === 0) {
    return (
      <div className="override-header-spacing">
        <div className="min-h-screen bg-background-secondary py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold mb-4 text-text-primary">{t("cart.empty_title")}</h1>
              <Link
                href="/program"
                className="btn-primary"
              >
                <ArrowLeft className="w-5 h-5" />
                {t("cart.continue_browsing")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="override-header-spacing">
      <div className="min-h-screen bg-[#F2F2F7] pt-8 sm:pt-12 pb-8 sm:pb-12">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
        <div className="mb-6 sm:mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition text-sm sm:text-base group"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" />
            {t("cart.back_to_cart")}
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-text-primary text-center sm:text-left">{t("checkout.title")}</h1>

        {/* SePay QR Code Payment - Show full screen when QR is ready */}
        {showPaymentQR && sepayPaymentData ? (
          <div className="mb-8 max-w-2xl mx-auto">
            <SePayPaymentQR
              paymentData={sepayPaymentData}
              onPaymentComplete={handlePaymentComplete}
              onPaymentFailed={handlePaymentFailed}
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-2">
                {/* Cart Items Summary - Integrated from Step 2 style but simplified */}
                <div className="bg-white rounded-ios-xl shadow-ios-card p-5 sm:p-8 mb-6 border border-white/40">
                  <h2 className="text-xl font-bold mb-6 text-text-primary flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                      <ShoppingCart size={16} />
                    </span>
                    {t("checkout.selected_courses")}
                  </h2>
                  <div className="space-y-6">
                    {items.map((item) => {
                      const itemImage = item.slug === 'thu-thach-30-ngay'
                        ? (thirtyDayCheckoutImage && thirtyDayCheckoutImage !== '' ? thirtyDayCheckoutImage : '/picture/thuthach30day_desktop.png')
                        : (item.heroImage || '/picture/thuthach30day_desktop.png');

                      return (
                      <div key={item.id} className="flex flex-col md:flex-row gap-4 pb-6 border-b last:border-b-0 border-gray-100">
                        <img
                          src={itemImage}
                          alt={t(item.title)}
                          className="w-full md:w-[150px] h-[100px] object-cover rounded-ios-lg shadow-sm"
                          onError={e => { e.currentTarget.src = '/picture/thuthach30day_desktop.png'; }}
                        />

                        <div className="flex-1 flex flex-col justify-center">
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <h3 className="text-lg font-bold text-text-primary">{t(item.title)}</h3>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="h-8 w-8 rounded-full flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                              aria-label={`Xóa ${t(item.title)} khỏi giỏ hàng`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-text-secondary mb-2 text-sm">{item.category.map(c => t(c)).join(', ')}</p>
                          <div className="flex items-center justify-between mt-auto">
                            <div className="inline-flex items-center rounded-lg border border-gray-200 bg-white overflow-hidden h-9">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-full w-9 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-colors"
                                aria-label={`Giảm số lượng ${t(item.title)}`}
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="h-full min-w-[2.25rem] px-2 flex items-center justify-center text-sm font-semibold text-text-primary border-x border-gray-200">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-full w-9 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-colors"
                                aria-label={`Tăng số lượng ${t(item.title)}`}
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="price text-lg font-bold text-primary">
                              {item.price.currency === 'VNĐ'
                                ? currencyFormatter.format(parseInt(item.price.amount.replace(/\./g, '')) * item.quantity)
                                : `${item.price.currency} ${item.price.amount}`
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Form */}
                <div className="bg-white rounded-ios-xl shadow-ios-card p-5 sm:p-8 border border-white/40">
                  <h2 className="text-xl font-bold mb-6 text-text-primary">
                    {t("checkout.customer_info_title")}
                  </h2>

                  <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base ml-1">
                          {t("checkout.form.name")} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={t("checkout.form.placeholders.name")}
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-3 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm sm:text-base appearance-none ios-haptic-active"
                        />
                      </div>

                      <div>
                        <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base ml-1">
                          {t("checkout.form.email")} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder={t("checkout.form.placeholders.email")}
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-3 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm sm:text-base appearance-none ios-haptic-active"
                        />
                      </div>

                      <div>
                        <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base ml-1">
                          {t("checkout.form.phone")} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder={t("checkout.form.placeholders.phone")}
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-3 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm sm:text-base appearance-none ios-haptic-active"
                        />
                      </div>

                      <div>
                        <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base ml-1">
                          {t("checkout.form.telegram")} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder={t("checkout.form.placeholders.telegram")}
                            value={formData.telegram}
                            onChange={(e) => handleInputChange('telegram', e.target.value)}
                            className="peer w-full bg-gray-50 border border-gray-200 rounded-ios-md pl-9 pr-4 py-3 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm sm:text-base appearance-none ios-haptic-active"
                          />
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10 peer-focus:text-primary transition-colors">@</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base ml-1">
                          {t("checkout.form.birthdate")} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.birthdate}
                          onChange={(e) => handleInputChange('birthdate', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-3 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm sm:text-base appearance-none ios-haptic-active"
                        />
                      </div>

                      <div>
                        <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base ml-1">
                          {t("checkout.form.gender")} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={formData.gender}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-3 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm sm:text-base appearance-none ios-haptic-active"
                          >
                            <option value="">{t("checkout.form.gender_options.select")}</option>
                            <option value="female">{t("checkout.form.gender_options.female")}</option>
                            <option value="male">{t("checkout.form.gender_options.male")}</option>
                            <option value="other">{t("checkout.form.gender_options.other")}</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base ml-1">
                        {t("checkout.form.address")}
                      </label>
                      <input
                        type="text"
                        placeholder={t("checkout.form.placeholders.address")}
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-3 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm sm:text-base appearance-none ios-haptic-active"
                      />
                    </div>

                    <div>
                      <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base ml-1">
                        {t("checkout.form.note")}
                      </label>
                      <textarea
                        rows={3}
                        placeholder={t("checkout.form.placeholders.note")}
                        value={formData.note}
                        onChange={(e) => handleInputChange('note', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-3 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm sm:text-base appearance-none ios-haptic-active resize-y min-h-[100px]"
                      />
                    </div>

                    <div className="flex items-start bg-blue-50/50 p-4 rounded-ios-lg border border-blue-100 mt-6">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 mr-3 w-5 h-5 text-primary rounded focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="terms" className="text-sm text-text-primary leading-relaxed">
                        {t("checkout.terms_agreement")}{' '}
                        <Link href="/policy" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">
                          {t("policy.title")}
                        </Link>{' '}
                        &{' '}
                        <Link href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">
                          {t("terms.title")}
                        </Link>
                      </label>
                    </div>

                    {/* Error Display */}
                    {errors.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-ios-lg p-4 mb-6 animate-shake">
                        <h4 className="text-red-800 font-semibold mb-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Lỗi:
                        </h4>
                        <ul className="list-disc list-inside text-red-700 ml-2">
                          {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </form>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-ios-xl shadow-ios-card p-5 sm:p-8 sticky top-24 sm:top-28 border border-white/40">
                  <h2 className="text-lg sm:text-xl font-bold mb-6 text-text-primary border-b pb-4">
                    {t("cart.summary_title")}
                  </h2>

                  <div className="mb-6">
                    <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base">
                      {t("checkout.discount_code")}
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          placeholder={t("checkout.discount_code")}
                          className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-2 h-[44px] focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-medium uppercase placeholder:normal-case ios-haptic-active"
                        />
                        <Tag className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                      <button
                        type="button"
                        onClick={handleApplyDiscount}
                        className="px-4 bg-gray-800 text-white rounded-ios-md hover:bg-black transition-all duration-300 h-[44px] font-bold text-sm shadow-sm ios-haptic-active"
                      >
                        {t("checkout.apply_btn")}
                      </button>
                    </div>
                    {discount > 0 && (
                      <div className="mt-2 text-success text-xs sm:text-sm font-bold flex items-center animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-success mr-2"></span>
                        {t("checkout.applied_discount")} {discountType === 'percentage' ? `${discount}%` : `-${currencyFormatter.format(discount)}`}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 mb-8 bg-gray-50 p-4 rounded-ios-lg">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-text-secondary">{t("checkout.subtotal")}</span>
                      <span className="font-semibold">{currencyFormatter.format(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="text-success font-medium">{t("checkout.discount")}</span>
                        <span className="font-bold text-success">-{currencyFormatter.format(discountAmount)}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-3 flex justify-between text-base sm:text-lg font-bold items-center">
                      <span>{t("checkout.total")}</span>
                      <span className="price text-primary text-xl">{currencyFormatter.format(total)}</span>
                    </div>
                  </div>

                  <button
                    form="checkout-form"
                    type="submit"
                    disabled={isLoading || !agreed}
                    className="w-full flex items-center justify-center bg-primary text-white font-bold py-3.5 rounded-full shadow-ios-md hover:shadow-ios-lg hover:brightness-105 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-300 text-base ios-haptic-active"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t("checkout.processing")}
                      </div>
                    ) : (
                      t("checkout.confirm_pay_btn")
                    )}
                  </button>

                  <Link
                    href="/cart"
                    className="w-full mt-4 text-center text-gray-500 hover:text-primary font-semibold transition block text-sm sm:text-base py-2 rounded-lg hover:bg-gray-50"
                  >
                    Quay lại giỏ hàng
                  </Link>
                </div>
              </div>
            </div>
          </>
        )
        }
        </div>
      </div>
    </div>
  );
}