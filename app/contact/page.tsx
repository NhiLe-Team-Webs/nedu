'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('')

    try {
      // URL của Google Apps Script - CẦN CẬP NHẬT URL NÀY SAU KHI DEPLOY APPS SCRIPT MỚI
      const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxKIMyc18J9EiRmJJLyrAUM80mKeA64CFmWoehLR-SjBylwufnae0xrFyTK2Q4crn2F/exec';
      
      // Chuẩn bị dữ liệu để gửi
      const dataToSend = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim()
      };
      
      const response = await fetch(googleScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(dataToSend).toString(),
        // Thêm mode: 'no-cors' để tránh CORS issues với Google Apps Script
        mode: 'no-cors'
      });

      // Với mode: 'no-cors', chúng ta không thể đọc response
      // nên sẽ giả định thành công nếu không có error
      setStatus('success')
      setFormData({ name: '', phone: '', email: '', message: '' })
      setTimeout(() => setStatus(''), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
      setTimeout(() => setStatus(''), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-primary text-white rounded-2xl p-8 md:p-12">
              <img src="https://nedu.nhi.sg/images/nedu-contact.png" alt="N-Edu Contact" className="w-full mb-8 rounded-lg" />
              
              <h2 className="text-3xl font-bold mb-8">Liên hệ</h2>
              
              <div className="space-y-6">
                <div>
                  <p className="text-white/80 mb-2">Liên hệ</p>
                  <a href="tel:+84789785904" className="text-xl font-semibold hover:underline">
                    (+84) 789785904
                  </a>
                </div>

                <div>
                  <p className="text-white/80 mb-2">Email</p>
                  <a href="mailto:nedu@nhi.sg" className="text-xl font-semibold hover:underline">
                    nedu@nhi.sg
                  </a>
                </div>

                <div>
                  <p className="text-white/80 mb-2">Telegram</p>
                  <a href="https://t.me/neducationvn" target="_blank" rel="noopener noreferrer" className="text-xl font-semibold hover:underline">
                    @neducationvn
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-2 text-gray-800">Kết nối với chúng tôi</h2>
              <p className="text-gray-600 mb-8">Điền đầy đủ thông tin để nhận tư vấn từ N-EDU</p>

              <form onSubmit={handleSubmit} className="space-y-6">
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

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Bạn cần hỗ trợ hay điều gì?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Đang gửi...' : 'Gửi'}
                </button>

                {status === 'success' && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                    Đã gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.
                  </div>
                )}

                {status === 'error' && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    Đã có lỗi xảy ra. Vui lòng thử lại sau.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
