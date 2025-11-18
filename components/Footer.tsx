import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Youtube, Send } from 'lucide-react'

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--footer-gray, #4F4F4F)' }} className="text-white">
      <div className="container mx-auto px-3 sm:px-4 lg:px-16 pt-6 sm:pt-8 lg:pt-12 pb-4 sm:pb-6 lg:pb-8">
        {/* Upper Footer */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-12">
          {/* Left Side: Logo & Company Info */}
          <div className="space-y-3 lg:space-y-4 w-full lg:w-auto">
            <div className="flex items-center space-x-2 lg:space-x-3">
               <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex-shrink-0">
      <Image
        src="/picture/logo-footer.png"
        alt="N Education"
        width={48}
        height={48}
        className="w-full h-full object-contain"
        priority
      />
    </div>
    </div>
            <div className="pt-1 lg:pt-2">
              <p className="font-semibold text-xs sm:text-sm lg:text-base text-white">CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ NHILE</p>
              <ul className="text-xs sm:text-xs lg:text-sm space-y-1 text-white/90 mt-1 lg:mt-2">
                <li className="text-white">Mã số thuế: 0317268736</li>
                <li className="text-white break-words">25 Lê Bá Trinh, Phường Hoà Cường Bắc, Quận Hải Châu, Đà Nẵng</li>
              </ul>
            </div>
          </div>

          {/* Right Side: Nav & Socials */}
          <div className="flex flex-col items-start lg:items-end gap-4 lg:gap-6 w-full lg:w-auto">
            <nav className="flex flex-wrap gap-x-3 sm:gap-x-4 lg:gap-x-8 gap-y-2 lg:gap-y-4 font-semibold text-xs sm:text-sm lg:text-base">
              <a href="/" className="hover:underline text-white py-1">TRANG CHỦ</a>
              <a href="https://www.nhi.sg/" target="_blank" rel="noreferrer" className="hover:underline text-white py-1">VỀ CHÚNG TÔI</a>
              <a href="/program/" className="hover:underline text-white py-1">KHÓA HỌC</a>
              <a href="/contact/" className="hover:underline text-white py-1">LIÊN HỆ</a>
            </nav>
            <div className="flex space-x-2 sm:space-x-2 lg:space-x-3 pt-1 lg:pt-2">
              <a href="https://www.facebook.com/MsNhiSG" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-8 h-8 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center border-2 border-white rounded-full hover:bg-white hover:text-[var(--cta-yellow,#F8B516)] transition-colors">
                <Facebook className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
              </a>
              <a href="https://www.youtube.com/@Msnhi" target="_blank" rel="noreferrer" aria-label="Youtube" className="w-8 h-8 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center border-2 border-white rounded-full hover:bg-white hover:text-[var(--cta-yellow,#F8B516)] transition-colors">
                <Youtube className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
              </a>
              <a href="https://www.tiktok.com/@nedu.sg" target="_blank" rel="noreferrer" aria-label="TikTok" className="w-8 h-8 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center border-2 border-white rounded-full hover:bg-white hover:text-[var(--cta-yellow,#F8B516)] transition-colors">
                <Send className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Lower Footer */}
        <div className="mt-4 sm:mt-6 lg:mt-10 pt-3 sm:pt-4 lg:pt-6 border-t border-white/30 flex flex-col lg:flex-row justify-between items-center gap-3 sm:gap-4 lg:gap-6 text-xs lg:text-sm">
          <p className="order-last lg:order-first text-center lg:text-left text-white">© 2024 N-EDU. All rights reserved</p>
          <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3 lg:gap-x-6 gap-y-1 sm:gap-y-2 lg:gap-y-3">
            <a href="/guide-payment" className="hover:underline text-white text-xs sm:text-xs lg:text-sm py-1">Hướng dẫn thanh toán</a>
            <a href="/policy" className="hover:underline text-white text-xs sm:text-xs lg:text-sm py-1">Chính sách bảo mật</a>
            <a href="/terms" className="hover:underline text-white text-xs sm:text-xs lg:text-sm py-1">Điều khoản sử dụng</a>
            <a href="#" className="hover:underline text-white text-xs sm:text-xs lg:text-sm py-1">Đối tác thanh toán</a>
          </div>
          <div className="flex flex-col items-center gap-2 border border-white/80 rounded-lg px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 text-xs bg-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Image
                src="/picture/vnpay.svg"
                alt="VNPAY"
                width={32}
                height={32}
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
              />
              <span className="font-bold tracking-wider text-xs sm:text-sm lg:text-base text-white">VNPAY</span>
            </div>
            <p className="text-white/90 text-xs lg:text-sm">Đối tác thanh toán</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
