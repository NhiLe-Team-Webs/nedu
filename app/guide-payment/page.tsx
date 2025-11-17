'use client'

export default function GuidePaymentPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800 uppercase">
          Hướng dẫn thanh toán
        </h1>
        
        <p className="text-center text-gray-600 mb-12">
          Cập nhật lần cuối ngày 18 tháng 11 năm 2024
        </p>

        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Bước 1. Chọn khóa học và lựa chọn đăng ký
            </h2>
            <img 
              src="https://nedu.nhi.sg/images/register.jpg" 
              alt="Chọn khóa học và đăng ký" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Bước 2. Điền thông tin và nhấn tiếp theo
            </h2>
            <img 
              src="https://nedu.nhi.sg/images/b2.jpg" 
              alt="Điền thông tin" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Bước 3. Kiểm tra lại thông tin và nhấn thanh toán
            </h2>
            <img 
              src="https://nedu.nhi.sg/images/b3.jpg" 
              alt="Kiểm tra thông tin" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Bước 4. Chọn phương thức thanh toán của VNPay và tiến hành thanh toán
            </h2>
            <img 
              src="https://nedu.nhi.sg/images/b4.jpg" 
              alt="Chọn phương thức thanh toán" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Bước 5. Sau khi thanh toán thành công, bạn vào email để kiểm tra thông tin
            </h2>
            <img 
              src="https://nedu.nhi.sg/images/b5.png" 
              alt="Email xác nhận" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
