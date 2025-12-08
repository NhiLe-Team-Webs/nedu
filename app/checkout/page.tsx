"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Tag } from 'lucide-react';
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

      // Prepare SePay payment data
      const sepayData = prepareSePayPaymentData(
        formData,
        finalAmount,
        undefined, // No single programId for checkout
        programIds // Use programIds for multiple courses
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
    <div className="min-h-screen bg-background-secondary py-8 sm:py-12">
      <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
        <div className="mb-6 sm:mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Quay lại giỏ hàng
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-4 text-text-primary">Thanh toán</h1>
        
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
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-xl ${
              currentStep >= 1
                ? 'bg-primary text-white'
                : 'bg-gray-300 text-gray-600'
            }`}>
              1
            </div>
            <div className={`w-20 sm:w-32 h-1 ${
              currentStep >= 2 ? 'bg-primary' : 'bg-gray-300'
            }`}></div>
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-xl ${
              currentStep >= 2
                ? 'bg-primary text-white'
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
                  <h2 className="text-xl font-bold mb-4 text-text-primary">1. THÔNG TIN THANH TOÁN</h2>
                  
                  <form id="checkout-form" onSubmit={handleNextStep} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-text-primary font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                          Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Nhập họ và tên của bạn"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="input-field text-sm sm:text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-text-primary font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="Nhập email của bạn"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="input-field text-sm sm:text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-text-primary font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                          Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Nhập số điện thoại"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="input-field text-sm sm:text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-text-primary font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                          Username Telegram <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="@username"
                          value={formData.telegram}
                          onChange={(e) => handleInputChange('telegram', e.target.value)}
                          className="input-field text-sm sm:text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-text-primary font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                          Ngày sinh <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.birthdate}
                          onChange={(e) => handleInputChange('birthdate', e.target.value)}
                          className="input-field text-sm sm:text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-text-primary font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                          Giới tính <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={formData.gender}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="input-field text-sm sm:text-base"
                        >
                          <option value="">Chọn giới tính</option>
                          <option value="female">Nữ</option>
                          <option value="male">Nam</option>
                          <option value="other">Khác</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-text-primary font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                        Địa chỉ
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập địa chỉ của bạn"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="input-field text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <label className="block text-text-primary font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                        Ghi chú
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Nhập ghi chú (nếu có)"
                        value={formData.note}
                        onChange={(e) => handleInputChange('note', e.target.value)}
                        className="input-field text-sm sm:text-base"
                      />
                    </div>

                    {/* Error Display */}
                    {errors.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <h4 className="text-red-800 font-semibold mb-2">Lỗi:</h4>
                        <ul className="list-disc list-inside text-red-700">
                          {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="btn-primary"
                      >
                        Tiếp tục đến bước xác nhận
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              /* Step 2: Confirmation */
              <div className="card">
                <h2 className="text-xl font-bold mb-6 text-text-primary">2. XÁC NHẬN THÔNG TIN</h2>
                
                <div className="space-y-6">
                  {/* Course Summary */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4 text-text-primary">Khóa học đã chọn</h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-text-primary">{item.title}</h4>
                            <p className="text-sm text-text-secondary">{item.category.join(', ')}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold price">
                              {item.price.currency === 'VNĐ'
                                ? currencyFormatter.format(parseInt(item.price.amount.replace(/\./g, '')) * item.quantity)
                                : `${item.price.currency} ${item.price.amount}`
                              }
                            </div>
                            <div className="text-sm text-text-secondary">Số lượng: {item.quantity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4 text-text-primary">Thông tin cá nhân</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-text-secondary">Họ và tên:</span>
                        <p className="font-semibold">{formData.name}</p>
                      </div>
                      <div>
                        <span className="text-text-secondary">Email:</span>
                        <p className="font-semibold">{formData.email}</p>
                      </div>
                      <div>
                        <span className="text-text-secondary">Số điện thoại:</span>
                        <p className="font-semibold">{formData.phone}</p>
                      </div>
                      <div>
                        <span className="text-text-secondary">Telegram:</span>
                        <p className="font-semibold">{formData.telegram}</p>
                      </div>
                      <div>
                        <span className="text-text-secondary">Ngày sinh:</span>
                        <p className="font-semibold">{formData.birthdate}</p>
                      </div>
                      <div>
                        <span className="text-text-secondary">Giới tính:</span>
                        <p className="font-semibold">{formData.gender === 'male' ? 'Nam' : formData.gender === 'female' ? 'Nữ' : 'Khác'}</p>
                      </div>
                      {formData.address && (
                        <div className="md:col-span-2">
                          <span className="text-text-secondary">Địa chỉ:</span>
                          <p className="font-semibold">{formData.address}</p>
                        </div>
                      )}
                      {formData.note && (
                        <div className="md:col-span-2">
                          <span className="text-text-secondary">Ghi chú:</span>
                          <p className="font-semibold">{formData.note}</p>
                        </div>
                      )}
                    </div>
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

                  {/* Error Display */}
                  {errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                      <h4 className="text-red-800 font-semibold mb-2">Lỗi:</h4>
                      <ul className="list-disc list-inside text-red-700">
                        {errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="btn-secondary"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Quay lại
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading || !agreed}
                      className="btn-primary disabled:bg-gray-400"
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
            <div className="card sticky top-20 sm:top-24">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-text-primary">
                {currentStep === 1 ? 'Tóm tắt đơn hàng' : 'Tóm tắt thanh toán'}
              </h2>
              
              {/* Discount Code - Only show in Step 1 */}
              {currentStep === 1 && (
                <div className="mb-4 sm:mb-6">
                  <label className="block text-text-primary font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                    Mã giảm giá
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        className="input-field pl-10 text-sm sm:text-base"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyDiscount}
                      className="btn-secondary text-sm sm:text-base"
                    >
                      Áp dụng
                    </button>
                  </div>
                  {discount > 0 && (
                    <div className="mt-2 text-success text-xs sm:text-sm font-semibold">
                      Đã áp dụng mã giảm giá: {discountType === 'percentage' ? `${discount}%` : `-${currencyFormatter.format(discount)}`}
                    </div>
                  )}
                </div>
              )}
              
              <div className="space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-text-secondary">Tạm tính:</span>
                  <span className="font-semibold">{currencyFormatter.format(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-success">Giảm giá:</span>
                    <span className="font-semibold text-success">-{currencyFormatter.format(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base sm:text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="price">{currencyFormatter.format(total)}</span>
                </div>
              </div>

              {currentStep === 1 ? (
                /* Step 1: Continue button */
                <button
                  form="checkout-form"
                  type="submit"
                  className="btn-primary w-full text-center block text-sm sm:text-base"
                >
                  Tiếp tục đến bước xác nhận
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                /* Step 2: Payment button */
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !agreed}
                  className="btn-primary w-full text-center block disabled:bg-gray-400 text-sm sm:text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                className="w-full mt-3 text-center text-primary hover:text-primary-dark font-semibold transition block text-sm sm:text-base"
              >
                ← Quay lại giỏ hàng
              </Link>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
}