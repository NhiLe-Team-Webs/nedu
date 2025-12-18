"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Tag, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useRouter } from 'next/navigation';
import { preparePaymentData, sendPaymentRequest, handlePaymentResponse, currencyFormatter, sendSePayPaymentRequest, prepareSePayPaymentData } from '@/lib/payment-utils';
import SePayPaymentQR from '@/components/SePayPaymentQR';
import { SePayPaymentResponse } from '@/types/sepay';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1); // 1: Information, 2: Confirmation
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


  const subtotal = getTotalPrice();
  const discountAmount = discountType === 'percentage'
    ? subtotal * (discount / 100)
    : discount;
  const total = subtotal - discountAmount;

  const handleApplyDiscount = () => {
    const code = discountCode.trim().toUpperCase();

    // Check if cart contains "Là Chính Mình 04" course
    const hasLaChinhMinh4 = items.some(item =>
      item.id === 2 || item.title.includes('Là Chính Mình 04')
    );

    if (code === 'EARLY BIRD' || code === 'EARLYBIRD') {
      if (hasLaChinhMinh4) {
        setDiscount(10000000); // 10 triệu VNĐ
        setDiscountType('fixed');
        alert('Đã áp dụng mã giảm giá EARLY BIRD: -10.000.000 VNĐ');
      } else {
        setDiscount(0);
        setDiscountType('percentage');
        alert('Mã giảm giá EARLY BIRD chỉ áp dụng cho khóa "Là Chính Mình 04"');
      }
    } else if (code === 'SAVE10') {
      setDiscount(10);
      setDiscountType('percentage');
      alert('Đã áp dụng mã giảm giá: 10%');
    } else if (code === 'SAVE20') {
      setDiscount(20);
      setDiscountType('percentage');
      alert('Đã áp dụng mã giảm giá: 20%');
    } else {
      setDiscount(0);
      setDiscountType('percentage');
      alert('Mã giảm giá không hợp lệ');
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'telegram', 'birthdate', 'gender'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      setErrors(['Vui lòng điền đầy đủ các trường bắt buộc']);
      return;
    }

    // Move to confirmation step
    setCurrentStep(2);
  };

  const handleBackStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    if (!agreed) {
      setErrors(['Vui lòng đồng ý với điều khoản sử dụng']);
      return;
    }

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'telegram', 'birthdate', 'gender'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      setErrors(['Vui lòng điền đầy đủ các trường bắt buộc']);
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

      // Construct course names string (e.g. "Course A, Course B")
      const courseName = items.map(item => item.title).join(', ');

      // Determine coupon code used (if any discount applied)
      const appliedCouponCode = discount > 0 ? discountCode : '';

      // Prepare SePay payment data
      const sepayData = prepareSePayPaymentData(
        formData,
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
    router.push('/payment-success?status=success&paymentMethod=sepay');
  };

  const handlePaymentFailed = () => {
    setErrors(['Thanh toán thất bại. Vui lòng thử lại.']);
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
    <div className="min-h-screen bg-[#F2F2F7] py-8 sm:py-12 ios-safe-padding-bottom">
      <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
        <div className="mb-6 sm:mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition text-sm sm:text-base group"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" />
            Quay lại giỏ hàng
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-text-primary text-center sm:text-left">Thanh toán</h1>

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
            {/* Step Indicators */}
            <div className="flex justify-center items-center mb-8 sm:mb-12">
              <div className="flex items-center">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-xl transition-all duration-300 ${currentStep >= 1
                  ? 'bg-primary text-white shadow-ios-md scale-110'
                  : 'bg-gray-300 text-gray-600'
                  }`}>
                  1
                </div>
                <div className={`w-20 sm:w-32 h-1.5 rounded-full transition-all duration-500 mx-2 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'
                  }`}></div>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-xl transition-all duration-300 ${currentStep >= 2
                  ? 'bg-primary text-white shadow-ios-md scale-110'
                  : 'bg-gray-300 text-gray-600'
                  }`}>
                  2
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-2">
                {currentStep === 1 ? (
                  /* Step 1: Information Form */
                  <>
                    <div className="bg-white rounded-ios-xl shadow-ios-card p-5 sm:p-8 mb-6 border border-white/40">
                      <h2 className="text-xl font-bold mb-6 text-text-primary flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                          <ShoppingCart size={16} />
                        </span>
                        Các khóa học trong giỏ hàng
                      </h2>
                      <div className="space-y-6">
                        {items.map((item) => (
                          <div key={item.id} className="flex flex-col md:flex-row gap-4 pb-6 border-b last:border-b-0 border-gray-100">
                            <img
                              src={item.heroImage}
                              alt={item.title}
                              className="w-full md:w-28 h-28 object-cover rounded-ios-lg shadow-sm"
                            />

                            <div className="flex-1 flex flex-col justify-center">
                              <h3 className="text-lg font-bold mb-1 text-text-primary">{item.title}</h3>
                              <p className="text-text-secondary mb-2 text-sm">{item.category.join(', ')}</p>
                              <div className="flex items-center justify-between mt-auto">
                                <div>
                                  <span className="text-text-secondary text-sm font-medium bg-gray-100 px-2 py-1 rounded-md">x{item.quantity}</span>
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
                        ))}
                      </div>
                    </div>

                    {/* Payment Form */}
                    <div className="bg-white rounded-ios-xl shadow-ios-card p-5 sm:p-8 border border-white/40">
                      <h2 className="text-xl font-bold mb-6 text-text-primary flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">1</span>
                        THÔNG TIN KHÁCH HÀNG
                      </h2>

                      <form id="checkout-form" onSubmit={handleNextStep} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base ml-1">
                              Họ và tên <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Nguyễn Văn A"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-3 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm sm:text-base appearance-none ios-haptic-active"
                            />
                          </div>

                          <div>
                            <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base ml-1">
                              Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="example@email.com"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-3 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm sm:text-base appearance-none ios-haptic-active"
                            />
                          </div>

                          <div>
                            <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base ml-1">
                              Số điện thoại <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="0912 345 678"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-3 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm sm:text-base appearance-none ios-haptic-active"
                            />
                          </div>

                          <div>
                            <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base ml-1">
                              Username Telegram <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">@</span>
                              <input
                                type="text"
                                required
                                placeholder="username"
                                value={formData.telegram}
                                onChange={(e) => handleInputChange('telegram', e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-ios-md pl-9 pr-4 py-3 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm sm:text-base appearance-none ios-haptic-active"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base ml-1">
                              Ngày sinh <span className="text-red-500">*</span>
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
                              Giới tính <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <select
                                required
                                value={formData.gender}
                                onChange={(e) => handleInputChange('gender', e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-3 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm sm:text-base appearance-none ios-haptic-active"
                              >
                                <option value="">Chọn giới tính</option>
                                <option value="female">Nữ</option>
                                <option value="male">Nam</option>
                                <option value="other">Khác</option>
                              </select>
                              <ArrowLeft className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 rotate-[-90deg] pointer-events-none text-gray-400" />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base ml-1">
                            Địa chỉ
                          </label>
                          <input
                            type="text"
                            placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-3 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm sm:text-base appearance-none ios-haptic-active"
                          />
                        </div>

                        <div>
                          <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base ml-1">
                            Ghi chú
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Bạn có yêu cầu đặc biệt nào không?"
                            value={formData.note}
                            onChange={(e) => handleInputChange('note', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-3 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm sm:text-base appearance-none ios-haptic-active resize-y min-h-[100px]"
                          />
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

                        <div className="flex justify-end pt-4">
                          <button
                            type="submit"
                            className="flex items-center justify-center px-8 py-3.5 bg-primary text-white text-base font-bold rounded-full shadow-ios-md hover:shadow-ios-lg hover:brightness-105 active:scale-95 transition-all duration-300 ios-haptic-active w-full sm:w-auto"
                          >
                            Tiếp tục
                            <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                          </button>
                        </div>
                      </form>
                    </div>
                  </>
                ) : (
                  /* Step 2: Confirmation */
                  <div className="bg-white rounded-ios-xl shadow-ios-card p-5 sm:p-8 border border-white/40">
                    <h2 className="text-xl font-bold mb-8 text-text-primary flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">2</span>
                      XÁC NHẬN THÔNG TIN
                    </h2>

                    <div className="space-y-8">
                      {/* Course Summary */}
                      <div>
                        <h3 className="font-bold text-lg mb-4 text-text-primary border-b pb-2">Khóa học đã chọn</h3>
                        <div className="space-y-4">
                          {items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-ios-lg border border-gray-100">
                              <div>
                                <h4 className="font-bold text-text-primary text-base sm:text-lg">{item.title}</h4>
                                <p className="text-sm text-text-secondary mt-1">{item.category.join(', ')}</p>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-primary price text-base sm:text-lg">
                                  {item.price.currency === 'VNĐ'
                                    ? currencyFormatter.format(parseInt(item.price.amount.replace(/\./g, '')) * item.quantity)
                                    : `${item.price.currency} ${item.price.amount}`
                                  }
                                </div>
                                <div className="text-sm text-text-secondary mt-1 font-medium bg-white px-2 py-0.5 rounded border border-gray-200 inline-block">x{item.quantity}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Personal Information */}
                      <div>
                        <h3 className="font-bold text-lg mb-4 text-text-primary border-b pb-2">Thông tin cá nhân</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { label: "Họ và tên", value: formData.name },
                            { label: "Email", value: formData.email },
                            { label: "Số điện thoại", value: formData.phone },
                            { label: "Telegram", value: formData.telegram },
                            { label: "Ngày sinh", value: formData.birthdate },
                            { label: "Giới tính", value: formData.gender === 'male' ? 'Nam' : formData.gender === 'female' ? 'Nữ' : 'Khác' }
                          ].map((field, idx) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                              <span className="block text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">{field.label}</span>
                              <p className="font-medium text-gray-900">{field.value}</p>
                            </div>
                          ))}
                          {formData.address && (
                            <div className="md:col-span-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                              <span className="block text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">Địa chỉ</span>
                              <p className="font-medium text-gray-900">{formData.address}</p>
                            </div>
                          )}
                          {formData.note && (
                            <div className="md:col-span-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                              <span className="block text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">Ghi chú</span>
                              <p className="font-medium text-gray-900">{formData.note}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start bg-blue-50/50 p-4 rounded-ios-lg border border-blue-100">
                        <input
                          type="checkbox"
                          id="terms"
                          required
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="mt-1 mr-3 w-5 h-5 text-primary rounded focus:ring-primary border-gray-300"
                        />
                        <label htmlFor="terms" className="text-sm text-text-primary leading-relaxed">
                          Bằng cách tích vào ô này, bạn xác nhận đã đọc, hiểu và đồng ý với{' '}
                          <Link href="/policy" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">
                            Chính sách bảo mật
                          </Link>{' '}
                          và{' '}
                          <Link href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">
                            Điều khoản sử dụng
                          </Link>{' '}
                          của chúng tôi.
                        </label>
                      </div>

                      {/* Error Display */}
                      {errors.length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-ios-lg p-4 mb-6">
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

                      <div className="flex justify-between pt-4 gap-4">
                        <button
                          type="button"
                          onClick={handleBackStep}
                          className="px-6 py-3.5 border border-gray-300 rounded-full text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 ios-haptic-active"
                        >
                          Quay lại
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={isLoading || !agreed}
                          className="flex-1 flex items-center justify-center px-6 py-3.5 bg-primary text-white font-bold rounded-full shadow-ios-md hover:shadow-ios-lg hover:brightness-105 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-300 ios-haptic-active text-base"
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Đang xử lý...
                            </div>
                          ) : (
                            'Xác nhận và thanh toán'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-ios-xl shadow-ios-card p-5 sm:p-8 sticky top-24 sm:top-28 border border-white/40">
                  <h2 className="text-lg sm:text-xl font-bold mb-6 text-text-primary border-b pb-4">
                    {currentStep === 1 ? 'Tóm tắt đơn hàng' : 'Thanh toán'}
                  </h2>

                  {/* Discount Code - Only show in Step 1 */}
                  {currentStep === 1 && (
                    <div className="mb-6">
                      <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base">
                        Mã giảm giá
                      </label>
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            placeholder="Nhập mã"
                            className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-2 h-[44px] focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-medium uppercase placeholder:normal-case ios-haptic-active"
                          />
                          <Tag className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                        <button
                          type="button"
                          onClick={handleApplyDiscount}
                          className="px-4 bg-gray-800 text-white rounded-ios-md hover:bg-black transition-all duration-300 h-[44px] font-bold text-sm shadow-sm ios-haptic-active"
                        >
                          Áp dụng
                        </button>
                      </div>
                      {discount > 0 && (
                        <div className="mt-2 text-success text-xs sm:text-sm font-bold flex items-center animate-pulse">
                          <span className="w-2 h-2 rounded-full bg-success mr-2"></span>
                          Đã áp dụng mã giảm giá: {discountType === 'percentage' ? `${discount}%` : `-${currencyFormatter.format(discount)}`}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-4 mb-8 bg-gray-50 p-4 rounded-ios-lg">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-text-secondary">Tạm tính:</span>
                      <span className="font-semibold">{currencyFormatter.format(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="text-success font-medium">Giảm giá:</span>
                        <span className="font-bold text-success">-{currencyFormatter.format(discountAmount)}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-3 flex justify-between text-base sm:text-lg font-bold items-center">
                      <span>Tổng cộng:</span>
                      <span className="price text-primary text-xl">{currencyFormatter.format(total)}</span>
                    </div>
                  </div>

                  {currentStep === 1 ? (
                    /* Step 1: Continue button */
                    <button
                      form="checkout-form"
                      type="submit"
                      className="w-full flex items-center justify-center bg-primary text-white font-bold py-3.5 rounded-full shadow-ios-md hover:shadow-ios-lg hover:brightness-105 active:scale-[0.98] transition-all duration-300 text-base ios-haptic-active"
                    >
                      Tiếp tục
                      <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                    </button>
                  ) : (
                    /* Step 2: Payment button */
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading || !agreed}
                      className="w-full flex items-center justify-center bg-primary text-white font-bold py-3.5 rounded-full shadow-ios-md hover:shadow-ios-lg hover:brightness-105 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-300 text-base ios-haptic-active"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Đang xử lý...
                        </div>
                      ) : (
                        'Xác nhận và thanh toán'
                      )}
                    </button>
                  )}

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
      </div >
    </div >
  );
}