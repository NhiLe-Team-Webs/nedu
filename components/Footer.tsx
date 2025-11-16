"use client";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#F7B50C] text-white">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1200px] px-4 py-9">
          <div className="flex items-start justify-between gap-6">
            {/* Left: logo + company info */}
            <div className="flex-1 max-w-sm">
              <a href="/" className="block mb-3">
                <img src="/nedu-white.svg" alt="N-EDU" className="h-10 w-auto" />
              </a>
              <p className="font-medium">CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ NHILE</p>
              <p className="text-sm mt-2">Mã số thuế: 0317268736</p>
              <p className="text-sm">25 Lê Bá Trinh, Phường Hoà Cường Bắc, Quận Hải Châu, Đà Nẵng</p>
            </div>

            {/* Middle: main nav links */}
            <div className="flex-1 flex flex-col items-end">
              <div className="flex gap-8 mb-4 text-white font-semibold uppercase tracking-wide">
                <a href="/" className="hover:text-white/90">Trang chủ</a>
                <a href="#about" className="hover:text-white/90">Về chúng tôi</a>
                <a href="/khoa-hoc" className="hover:text-white/90">Khóa học</a>
                <a href="#contact" className="hover:text-white/90">Liên hệ</a>
              </div>

              <div className="flex items-center gap-3">
                <a href="https://www.facebook.com/MsNhiSG" target="_blank" rel="noreferrer">
                  <img src="/facebook-footer.svg" alt="Facebook" className="h-6 w-6" />
                </a>
                <a href="https://www.linkedin.com/company/n-edu/" target="_blank" rel="noreferrer">
                  <img src="/linkedin-footer.svg" alt="LinkedIn" className="h-6 w-6" />
                </a>
                <a href="https://www.instagram.com/msnhi_podcast" target="_blank" rel="noreferrer">
                  <img src="/instagram-footer.svg" alt="Instagram" className="h-6 w-6" />
                </a>
                <a href="https://www.youtube.com/@Msnhi" target="_blank" rel="noreferrer">
                  <img src="/youtube-footer.svg" alt="YouTube" className="h-6 w-6" />
                </a>
                <a href="https://www.tiktok.com/@nedu.sg" target="_blank" rel="noreferrer">
                  <img src="/tiktok-footer.svg" alt="TikTok" className="h-6 w-6" />
                </a>
              </div>

              <div className="mt-4 text-sm text-white/90">Đối tác thanh toán</div>
              <div className="mt-2">
                <img src="/vnpay.svg" alt="VNPAY" className="h-8" />
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-4 mt-6 flex items-center justify-between">
            <p className="text-white/80">© 2024 N-EDU. All rights reserved</p>

            <div className="flex items-center gap-6">
              <a href="/guide-payment" className="text-white/80 hover:underline">Hướng dẫn thanh toán</a>
              <a href="/policy" className="text-white/80 hover:underline">Chính sách bảo mật</a>
              <a href="/terms" className="text-white/80 hover:underline">Điều khoản sử dụng</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
