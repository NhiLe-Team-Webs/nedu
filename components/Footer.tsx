import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link href="/" className="inline-block mb-6">
              <img src="https://nedu.nhi.sg/images/nedu-white.svg" alt="N-Edu" className="h-12" />
            </Link>
            <div className="space-y-2 text-sm">
              <p className="font-semibold">CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ NHILE</p>
              <p>Mã số thuế: 0317268736</p>
              <p>25 Lê Bá Trinh, Phường Hoà Cường Bắc, Quận Hải Châu, Đà Nẵng</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">LIÊN KẾT</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:underline">Trang chủ</Link></li>
              <li><a href="https://www.nhi.sg/" className="hover:underline" target="_blank" rel="noopener noreferrer">Về chúng tôi</a></li>
              <li><Link href="/program" className="hover:underline">Khóa học</Link></li>
              <li><Link href="/contact" className="hover:underline">Liên hệ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">THEO DÕI CHÚNG TÔI</h3>
            <div className="flex space-x-4 mb-6">
              <a href="https://www.facebook.com/MsNhiSG" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <img src="https://nedu.nhi.sg/images/facebook-footer.svg" alt="Facebook" className="w-8 h-8" />
              </a>
              <a href="https://www.linkedin.com/company/n-edu/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <img src="https://nedu.nhi.sg/images/linkedin-footer.svg" alt="LinkedIn" className="w-8 h-8" />
              </a>
              <a href="https://www.instagram.com/msnhi_podcast" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <img src="https://nedu.nhi.sg/images/instagram-footer.svg" alt="Instagram" className="w-8 h-8" />
              </a>
              <a href="https://www.youtube.com/@Msnhi" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <img src="https://nedu.nhi.sg/images/youtube-footer.svg" alt="YouTube" className="w-8 h-8" />
              </a>
              <a href="https://www.tiktok.com/@nedu.sg" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <img src="https://nedu.nhi.sg/images/tiktok-footer.svg" alt="TikTok" className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">© 2024 N-EDU. All rights reserved</p>
            <div className="flex space-x-6 text-sm">
              <Link href="/guide-payment" className="hover:underline">Hướng dẫn thanh toán</Link>
              <Link href="/policy" className="hover:underline">Chính sách bảo mật</Link>
              <Link href="/terms" className="hover:underline">Điều khoản sử dụng</Link>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center md:justify-start space-x-3">
            <span className="text-sm">Đối tác thanh toán</span>
            <img src="https://nedu.nhi.sg/images/vnpay.svg" alt="VNPay" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  )
}
