"use client";

import Image from "next/image";
import {
  ArrowRight,
  ChevronsRight,
  Mail,
  MessageCircle,
  PhoneCall,
} from "lucide-react";

const neduLogo = "/picture/nedu.svg";
const nltLogo = "/picture/nlt.png";
const challengePoster = "/picture/thuthach30day.png";
const tuyetMaiPhoto = "/picture/denise.jpg";

const CTA_YELLOW = "#F8B516";
const DARK_GRAY = "#333333";
const TEXT_GRAY = "#5A5A5C";
const FOOTER_GRAY = "#F8B516";
const LIGHT_GRAY_BG = "#F7F8FC";
const BORDER_SOFT = "#E5E7EB";

const ThirtyDayPage = () => {
  return (
    <>
      <style jsx global>{`
        .btn-primary {
          background-color: ${CTA_YELLOW};
          color: #ffffff;
          font-weight: 700;
          padding: 0.85rem 1.6rem;
          border-radius: 0.75rem;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          cursor: pointer;
        }
        .btn-primary:hover {
          background-color: #ffc94a;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
        }

        .section-title {
          font-size: 2.8rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          color: ${CTA_YELLOW};
          text-align: center;
        }

        .card {
          background-color: #ffffff;
          border-radius: 1.5rem;
          padding: 1.75rem 2rem;
          border: 1px solid ${BORDER_SOFT};
          box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.12);
          transition: all 0.25s ease;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 28px -12px rgba(0, 0, 0, 0.16);
        }

        .mentor-bg-text {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          font-size: 5.5rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: rgba(248, 181, 22, 0.08);
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }

        .hero-banner-gradient {
          background: linear-gradient(135deg, #ffd1a4, #ffe8c4);
        }

        @media (max-width: 1024px) {
          .mentor-bg-text {
            font-size: 3.4rem;
          }
        }
      `}</style>

      <div
        className="antialiased"
        style={{
          color: TEXT_GRAY,
          backgroundColor: "#ffffff",
        }}
      >
        <main>
          {/* HERO */}
          <section id="hero" className="pt-8 sm:pt-10 md:pt-14 pb-8 sm:pb-10 text-center">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 sm:mb-3"
                style={{ color: CTA_YELLOW }}
              >
                THỬ THÁCH 30 NGÀY
              </h1>
              <p
                className="text-sm sm:text-base md:text-lg font-semibold"
                style={{ color: DARK_GRAY }}
              >
                Chủ đề Tháng 12: Tỏa sáng cùng Denise
              </p>
              <p className="mt-1 text-sm sm:text-sm md:text-base">
                Giá hạn mỗi tháng:
                <span className="text-green-600 font-extrabold text-lg sm:text-xl md:text-2xl">
                  {" "}
                  396.000
                </span>
                <span className="font-semibold"> VND</span>
              </p>
              <div id="register" className="text-center mt-8 sm:mt-10">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdFUBpOdZTswjw0mraKvyBW0bU5AGK9hrZYatNC2K3gnpQJdQ/viewform"
                  className="px-8 sm:px-10 py-2 sm:py-3 rounded-full btn-primary text-xs sm:text-sm inline-flex items-center gap-2"
                >
                  ĐĂNG KÝ NGAY
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </div>
              <div className="mt-3 sm:mt-4 flex justify-center">
                <Image
                  src={neduLogo}
                  alt="N-Education"
                  width={800}
                  height={200}
                  className="w-full max-w-3xl sm:max-w-4xl h-auto object-contain"
                />
              </div>

              <div className="mt-6 sm:mt-10 flex items-center justify-center">
                <Image
                  src={challengePoster}
                  alt="Thử Thách 30 Ngày"
                  width={800}
                  height={400}
                  className="w-full max-w-[600px] sm:max-w-[800px] md:max-w-[900px] lg:max-w-[1100px] h-auto object-cover rounded-[16px] sm:rounded-[24px] md:rounded-[32px]"
                />
                <p
                  className="text-sm md:text-base font-medium"
                  style={{ color: DARK_GRAY }}
                ></p>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section id="about" className="pb-10 sm:pb-14">
            <div
              className="max-w-4xl mx-auto px-4 sm:px-6 text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed"
              style={{ color: DARK_GRAY }}
            >
              <p className="mb-3">
                Nhi đây, có ai học kiến thức của Nhi xong bỏ vô góc trì hoãn
                không làm không? Thử Thách 30 Ngày ra đời để kéo bạn vào hành
                trình hành động cùng nhau, từng bước xoá thói quen xấu.
              </p>
              <p>
                Năm 2025, Nhi muốn gần hơn với khán giả của mình, cùng các bạn
                tạo ra nhiều điều tốt đẹp hơn cho cuộc sống!
              </p>
            </div>
          </section>

          {/* 30 NGÀY CÓ GÌ */}
          <section className="pb-12 sm:pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <h2 className="section-title mb-6 sm:mb-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">30 NGÀY CÓ GÌ?</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-[12px] sm:text-[13px] md:text-[14px]">
                <div className="card">
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ color: CTA_YELLOW }}
                  >
                    Thử nghiệm 30 ngày là gì?
                  </h3>
                  <p>
                    Hành trình 30 ngày hành động liên tục dưới sự quan sát và
                    đồng hành của đội ngũ. Mỗi ngày nhận nhiệm vụ rõ ràng,
                    hoàn thành và báo cáo trong nhóm riêng trước 23h.
                  </p>
                </div>

                <div className="card">
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ color: CTA_YELLOW }}
                  >
                    Bạn sẽ nhận được gì sau 30 ngày
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Rèn luyện tính kỷ luật, hành động liên tục.</li>
                    <li>Tự giác & chủ động: thói quen "làm ngay".</li>
                    <li>Được tiếp lửa & truyền cảm hứng tích cực mỗi ngày.</li>
                    <li>Cộng đồng cùng chí hướng làm "bàn đạp" bền vững.</li>
                  </ul>
                </div>

                <div className="card">
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ color: CTA_YELLOW }}
                  >
                    Ai nên tham gia?
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Người đang trì hoãn, thiếu động lực.</li>
                    <li>
                      Người muốn tìm môi trường tích cực để phát triển bản thân.
                    </li>
                    <li>
                      Người muốn nâng cấp kỹ năng & xây dựng thói quen tốt.
                    </li>
                  </ul>
                </div>

                <div className="card opacity-0 pointer-events-none hidden md:block" />
              </div>
            </div>
          </section>

          {/* MENTOR */}
          <section
            id="mentor"
            className="relative py-12 sm:py-16 md:py-20"
            style={{ backgroundColor: LIGHT_GRAY_BG }}
          >
            <div className="mentor-bg-text text-3xl sm:text-4xl md:text-5xl">NGƯỜI HƯỚNG DẪN</div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 sm:mb-10"
                style={{ color: CTA_YELLOW }}
              >
                NGƯỜI DẪN ĐƯỜNG
              </h2>

              {/* CARD + ẢNH SỬA LẠI TỶ LỆ */}
              <div className="bg-white rounded-[16px] sm:rounded-[24px] md:rounded-[32px] shadow-[0_18px_45px_rgba(0,0,0,0.08)] px-4 sm:px-6 md:px-10 pt-6 sm:pt-8 pb-8 sm:pb-10">
                {/* ẢNH: giống ảnh 1 – có khoảng trắng 2 bên, giữ tỷ lệ gốc */}
                <div className="flex justify-center mb-6 sm:mb-8">
                  <Image
                    src={tuyetMaiPhoto}
                    alt="Denise"
                    width={800}
                    height={420}
                    className="w-full max-w-2xl sm:max-w-3xl h-auto rounded-[16px] sm:rounded-[24px] md:rounded-[32px] object-cover"
                    priority
                  />
                </div>

                <div
                  className="text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed"
                  style={{ color: DARK_GRAY }}
                >
                  <p className="mb-3">
                    Host & Content Creator, tập trung vào Phát triển cá nhân cho những người không nghiêm túc.
                  </p>

                  <p className="mb-2">
                    Truyền cảm hứng cho hơn 23.000 người trên toàn thế giới qua podcast, YouTube và những cuộc trò chuyện chân thật, gần gũi về tự nhận thức và phát triển cá nhân.
                  </p>

                  <p className="mb-3 font-semibold">Đam mê với việc thay đổi nhận thức:</p>
                  <p className="mb-3">
                    Tôi giúp những người cảm thấy mình "quá vui vẻ" hoặc "không nghiêm túc" để thành công nhận ra rằng họ không cần thay đổi tính cách để đạt được những điều tuyệt vời — họ có thể phát triển bằng cách là chính mình một cách trọn vẹn.
                  </p>

                  <p className="mb-2 font-semibold">Kinh nghiệm thực tế:</p>
                  <ul className="list-disc pl-4 sm:pl-5 space-y-1 mb-4">
                    <li>Host của Sip and Share | Spice & Nice</li>
                    <li>Người tạo ra Growth is a Bit of a Bitch</li>
                    <li>Nổi tiếng với việc biến những thử nghiệm bản thân lộn xộn của mình thành những bài học táo bạo, thực tế.</li>
                  </ul>

                  <div className="text-center mt-4">
                    <p
                      className="font-extrabold text-sm sm:text-base md:text-lg"
                      style={{ color: DARK_GRAY }}
                    >
                      DENISE
                    </p>
                    <p
                      className="text-xs sm:text-xs md:text-sm font-semibold"
                      style={{ color: CTA_YELLOW }}
                    >
                      Host & Content Creator
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <a
                        href="https://www.linkedin.com/in/denisewym"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full border font-medium text-xs"
                        style={{
                          borderColor: CTA_YELLOW,
                          color: CTA_YELLOW,
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#0077B5"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* COURSE INFO */}
          <section id="course-info" className="py-12 sm:py-16 md:py-18 pb-12 sm:pb-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <h2 className="section-title mb-6 sm:mb-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">THÔNG TIN KHÓA HỌC</h2>

              <div className="max-w-5xl mx-auto card">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 sm:gap-y-8 md:gap-y-10 gap-x-6 sm:gap-x-8 md:gap-x-10 text-[12px] sm:text-[13px] md:text-[14px]">
                  {/* CHỦ ĐỀ */}
                  <div className="flex items-start gap-3">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill={CTA_YELLOW}>
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828
                      1.48 8.279L12 18.896l-7.416 4.517 1.48-8.279L0 9.306l8.332-1.151z"/>
                    </svg>
                    <div>
                      <p className="font-semibold mb-1">Chủ đề:</p>
                      <p className="font-extrabold text-[14px]" style={{ color: DARK_GRAY }}>
                        Sáng tạo nội dung
                      </p>
                    </div>
                  </div>

                  {/* THỜI GIAN */}
                  <div className="flex items-start gap-3">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill={CTA_YELLOW}>
                      <path d="M12 1a11 11 0 110 22 11 11 0 010-22zm1 11h5v2h-7V6h2v6z" />
                    </svg>

                    <div>
                      <p className="font-semibold mb-1">Thời gian:</p>
                      <p className="font-extrabold text-[14px]" style={{ color: DARK_GRAY }}>
                        28/12/2025 – 28/01/2026
                      </p>
                    </div>
                  </div>

                  {/* NGƯỜI DẪN ĐƯỜNG */}
                  <div className="flex items-start gap-3">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill={CTA_YELLOW}>
                      <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75
                      7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38
                      0-2.5-1.12-2.5-2.5s1.12-2.5
                      2.5-2.5 2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
                    </svg>

                    <div>
                      <p className="font-semibold mb-1">Người dẫn đường:</p>
                      <p className="font-extrabold text-[14px]" style={{ color: DARK_GRAY }}>
                        Denise
                      </p>
                    </div>
                  </div>

                  {/* HÌNH THỨC */}
                  <div className="flex items-start gap-3">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill={CTA_YELLOW}>
                      <path d="M19 3H5c-1.1 0-2 .9-2
                      2v14c0 1.1.9 2 2 2h14c1.1
                      0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0
                      16H5V5h14v14zM7 7h5v5H7V7z"/>
                    </svg>

                    <div>
                      <p className="font-semibold mb-1">Hình thức:</p>
                      <p className="font-extrabold text-[14px]" style={{ color: DARK_GRAY }}>
                        Mỗi ngày thực hiện thử nghiệm & báo cáo trong nhóm.
                      </p>
                    </div>
                  </div>

                  {/* ĐỊA ĐIỂM */}
                  <div className="flex items-start gap-3">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill={CTA_YELLOW}>
                      <path d="M12 3l10 9h-3v9H5v-9H2l10-9z" />
                    </svg>

                    <div>
                      <p className="font-semibold mb-1">Địa điểm học:</p>
                      <p className="font-extrabold text-[14px]" style={{ color: DARK_GRAY }}>
                        Trò chuyện nhóm trực tuyến.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="register" className="text-center mt-8 sm:mt-10">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdFUBpOdZTswjw0mraKvyBW0bU5AGK9hrZYatNC2K3gnpQJdQ/viewform"
                  className="px-8 sm:px-10 py-2 sm:py-3 rounded-full btn-primary text-xs sm:text-sm inline-flex items-center gap-2"
                >
                  ĐĂNG KÝ NGAY
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* TỔ CHỨC */}
          <section className="py-14 bg-white">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <h2 className="section-title mb-10">
                ĐƠN VỊ TỔ CHỨC VÀ VẬN HÀNH
              </h2>

              <div className="flex flex-wrap justify-center gap-8 mb-10">
                {/* Logo N-Education */}
                <div className="bg-white border rounded-2xl px-10 py-6 shadow-sm flex items-center justify-center w-[260px] h-[140px]">
                  <Image
                    src={neduLogo}
                    alt="N-Education"
                    width={200}
                    height={64}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>

                {/* Logo NhiLeTEAM (NLT) – giống hệt style ô 1 */}
                <div className="bg-white border rounded-2xl px-10 py-6 shadow-sm flex items-center justify-center w-[260px] h-[140px]">
                  <Image
                    src={nltLogo}
                    alt="NhiLeTEAM"
                    width={200}
                    height={64}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-6">
                <a
                  href="https://www.facebook.com/neducation.sg"
                  target="_blank"
                  className="flex items-center gap-2 px-6 py-3 rounded-full border font-medium"
                  style={{
                    borderColor: CTA_YELLOW,
                    color: CTA_YELLOW,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#1877F2"
                  >
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.676V1.325C24 .597 23.403 0 22.675 0z" />
                  </svg>
                  N-education
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default ThirtyDayPage;