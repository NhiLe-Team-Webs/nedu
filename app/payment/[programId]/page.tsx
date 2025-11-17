'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Tag } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'

export default function PaymentPage() {
  const router = useRouter()
  const params = useParams()
  const programId = params.programId as string
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    telegram: '',
    birthdate: '',
    gender: '',
    address: '',
    note: ''
  })
  const [agreed, setAgreed] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const handleApplyDiscount = () => {
    // Simple discount logic for demo
    if (discountCode === 'SAVE10') {
      setDiscount(10)
    } else if (discountCode === 'SAVE20') {
      setDiscount(20)
    } else {
      setDiscount(0)
      alert('Mã giảm giá không hợp lệ')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])
    
    if (!agreed) {
      setErrors(['Vui lòng đồng ý với điều khoản sử dụng'])
      return
    }

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'telegram', 'birthdate', 'gender']
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])
    
    if (missingFields.length > 0) {
      setErrors(['Vui lòng điền đầy đủ các trường bắt buộc'])
      return
    }

    setIsLoading(true)

    try {
      // Prepare data for API according to payment-api-template.md
      const apiData = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        telegram: formData.telegram,
        birthday: formData.birthdate ? new Date(formData.birthdate).toISOString() : '',
        gender: formData.gender,
        address: formData.address || '',
        note: formData.note || '',
        programId: programId
      }

      // Note: Do NOT include returnUrl as it causes API error
      // VNPAY will handle the callback automatically

      console.log('Sending payment data:', apiData)

      const response = await fetch('https://api.nedu.nhi.sg/api/order/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error Response:', errorText)
        throw new Error(`API Error: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      console.log('API Success Response:', result)
      
      // Check if response contains paymentUrl (VNPAY redirect)
      if (result.paymentUrl) {
        // Redirect to VNPAY payment page
        window.location.href = result.paymentUrl
      } else {
        // Show success message for non-VNPAY payments
        alert('Đăng ký thành công!')
        router.push('/')
      }
      
    } catch (error) {
      console.error('Payment submission error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định'
      setErrors([`Lỗi khi gửi thông tin: ${errorMessage}`])
      alert(`Lỗi khi gửi thông tin: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          TIẾN HÀNH THANH TOÁN
        </h1>

        <div className="flex justify-center items-center mb-12">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
              1
            </div>
            <div className="w-32 h-1 bg-gray-300"></div>
            <div className="w-12 h-12 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-xl">
              2
            </div>
          </div>
        </div>

        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-2 text-text-primary">1. ĐIỀN THÔNG TIN</h2>
          <p className="text-text-secondary mb-8">Điền đầy đủ thông tin người mua khóa học</p>

          {/* Discount Code Section */}
          <div className="warning-message mb-6">
            <h3 className="font-bold text-lg mb-4 text-text-primary">Mã giảm giá</h3>
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-6 text-gray-800">Thông tin người mua</h3>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nhập họ và tên của bạn"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Nhập số điện thoại"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Nhập email của bạn"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Username Telegram <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="@username"
                      value={formData.telegram}
                      onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Ngày sinh <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.birthdate}
                      onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-3">
                    Giới tính <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        required
                        checked={formData.gender === 'female'}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="mr-2"
                      />
                      <span>Nữ</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        required
                        checked={formData.gender === 'male'}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="mr-2"
                      />
                      <span>Nam</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        required
                        checked={formData.gender === 'other'}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="mr-2"
                      />
                      <span>Khác</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập địa chỉ của bạn"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Ghi chú
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Nhập ghi chú (nếu có)"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  />
                </div>

                {/* Error Display */}
                {errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="text-red-800 font-semibold mb-2">Lỗi:</h4>
                    <ul className="list-disc list-inside text-red-700">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    Bằng cách tích vào ô này, bạn xác nhận đã đọc, hiểu và đồng ý với{' '}
                    <Link href="/policy" className="text-primary font-semibold hover:underline">
                      Chính sách bảo mật
                    </Link>{' '}
                    và{' '}
                    <Link href="/terms" className="text-primary font-semibold hover:underline">
                      Điều khoản sử dụng
                    </Link>{' '}
                    của chúng tôi.
                    {discount > 0 && (
                      <span className="block mt-2 text-green-600 font-semibold">
                        Bạn được giảm giá {discount}% trên tổng hóa đơn
                      </span>
                    )}
                  </label>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white px-12 py-3 rounded-full font-semibold transition text-lg inline-flex items-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    Bước tiếp theo
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}