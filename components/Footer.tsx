import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-[#F7B50C] text-white">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1200px] px-4 py-9">
          <div className="flex justify-between" style={{ padding: '36px 0px' }}>
            {/* Left: logo + company info */}
            <div className="flex flex-col items-start" style={{ rowGap: '8px' }}>
              <a href="/" className="block">
                <img src="/picture/nedu-white.svg" alt="N-EDU" className="h-24 w-auto" />
              </a>
              <p style={{ fontSize: '16px', fontWeight: '500', color: 'rgb(255, 255, 255)' }}>CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ NHILE</p>
              <p style={{ fontSize: '14px', fontWeight: '300', color: 'rgb(255, 255, 255)' }}>Mã số thuế: 0317268736</p>
              <p style={{ fontSize: '14px', fontWeight: '300', color: 'rgb(255, 255, 255)' }}>25 Lê Bá Trinh, Phường Hoà Cường Bắc, Quận Hải Châu, Đà Nẵng</p>
            </div>

            {/* Right: navigation and social */}
            <div className="flex flex-col items-end justify-between">
              {/* Navigation links */}
              <div className="flex" style={{ columnGap: '60px' }}>
                <a href="/" className="hover:text-white/90" style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(255, 255, 255)', textTransform: 'uppercase', transition: '0.5s ease-in-out' }}>Trang chủ</a>
                <a href="https://www.nhi.sg/" target="_blank" rel="noreferrer" className="hover:text-white/90" style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(255, 255, 255)', textTransform: 'uppercase', transition: '0.5s ease-in-out' }}>Về chúng tôi</a>
                <a href="/program/" className="hover:text-white/90" style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(255, 255, 255)', textTransform: 'uppercase', transition: '0.5s ease-in-out' }}>Khóa học</a>
                <a href="/contact/" className="hover:text-white/90" style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(255, 255, 255)', textTransform: 'uppercase', transition: '0.5s ease-in-out' }}>Liên hệ</a>
              </div>

              {/* Social media icons */}
              <div className="flex" style={{ columnGap: '16px' }}>
                <a href="https://www.facebook.com/MsNhiSG" target="_blank" rel="noreferrer">
                  <img src="/picture/facebook-footer.svg" alt="Facebook" className="h-6 w-6" />
                </a>
                <a href="https://www.linkedin.com/company/n-edu/" target="_blank" rel="noreferrer">
                  <img src="/picture/linkedin-footer.svg" alt="LinkedIn" className="h-6 w-6" />
                </a>
                <a href="https://www.instagram.com/msnhi_podcast" target="_blank" rel="noreferrer">
                  <img src="/picture/instagram-footer.svg" alt="Instagram" className="h-6 w-6" />
                </a>
                <a href="https://www.youtube.com/@Msnhi" target="_blank" rel="noreferrer">
                  <img src="/picture/youtube-footer.svg" alt="YouTube" className="h-6 w-6" />
                </a>
                <a href="https://www.tiktok.com/@nedu.sg" target="_blank" rel="noreferrer">
                  <img src="/picture/tiktok-footer.svg" alt="TikTok" className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider line */}
          <div className="w-full" style={{ height: '1px', background: 'rgb(255, 255, 255)', margin: '0px', padding: '0px' }}></div>

          {/* Bottom section */}
          <div className="flex items-center justify-between" style={{ padding: '16px 0px' }}>
            <p style={{ fontSize: '16px', fontWeight: '500', color: 'rgb(255, 255, 255)', marginTop: '4px' }}>© 2024 N-EDU. All rights reserved</p>
            
            <div className="flex items-center">
              <div className="flex">
                <a href="/guide-payment" className="hover:underline" style={{ fontSize: '16px', fontWeight: '500', color: 'rgb(255, 255, 255)', marginRight: '24px' }}>Hướng dẫn thanh toán</a>
                <a href="/policy" className="hover:underline" style={{ fontSize: '16px', fontWeight: '500', color: 'rgb(255, 255, 255)', marginRight: '24px' }}>Chính sách bảo mật</a>
                <a href="/terms" className="hover:underline" style={{ fontSize: '16px', fontWeight: '500', color: 'rgb(255, 255, 255)', marginRight: '24px' }}>Điều khoản sử dụng</a>
              </div>
              <div className="flex items-center">
                <p style={{ fontSize: '16px', fontWeight: '500', color: 'rgb(255, 255, 255)', marginRight: '8px', marginTop: '4px' }}>Đối tác thanh toán</p>
                <img src="/picture/vnpay.svg" alt="VNPAY" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
