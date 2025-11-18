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
const challengePoster = "/picture/thuthach30day.png";
const tuyetMaiPhoto = "/picture/tuyetmai.jpg";

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
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
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

       
        }
        
        .floating-btn:hover {
          transform: translateX(-4px);
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.22);
          background-color: #ffc94a;
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
          .floating-buttons {
            right: 10px;
          }
          .floating-btn {
            width: 60px;
            height: 60px;
            border-radius: 16px 0 0 16px;
          }
        }
      `}</style>

      <div
        className="antialiased"
        style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          color: TEXT_GRAY,
          backgroundColor: "#ffffff",
        }}
      >

        <div className="floating-buttons">
          <a href="#hero" className="floating-btn" title="Lên đầu trang">
            <ChevronsRight className="w-7 h-7" />
          </a>
          <a href="tel:0123456789" className="floating-btn" title="Gọi tư vấn">
            <PhoneCall className="w-7 h-7" />
          </a>
          <a
            href="mailto:info@n-education.vn"
            className="floating-btn"
            title="Gửi email"
          >
            <Mail className="w-7 h-7" />
          </a>
          <a href="#contact" className="floating-btn" title="Nhắn tin">
            <MessageCircle className="w-7 h-7" />
          </a>
        </div>


      
        <main>

          <section id="hero" className="pt-10 md:pt-14 pb-10 text-center">
            <div className="max-w-5xl mx-auto px-6">
              <h1
                className="text-4xl md:text-5xl font-extrabold mb-3"
                style={{ color: CTA_YELLOW }}
              >
                THỬ THÁCH 30 NGÀY
              </h1>
              <p
                className="text-base md:text-lg font-semibold"
                style={{ color: DARK_GRAY }}
              >
                Chủ đề Tháng 11: Sáng tạo nội dung
              </p>
              <p className="mt-1 text-sm md:text-base">
                Giá hạn mỗi tháng:
                <span className="text-green-600 font-extrabold text-xl md:text-2xl">
                  {" "}
                  396.000
                </span>
                <span className="font-semibold"> VND</span>
              </p>
              <div className="mt-4 mb-6">
                <a
                  href="#register"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full btn-primary text-xs md:text-sm"
                >
                  ĐĂNG KÝ NGAY
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>


              <div className="mt-4 flex justify-center">
                <Image
                  src={neduLogo}
                  alt="N-Education"
                  width={800}
                  height={200}
                  className="w-full max-w-4xl h-auto object-contain"
                />
              </div>


              <div className="mt-10 hero-banner-gradient rounded-[40px] shadow-[0_22px_60px_rgba(0,0,0,0.08)] px-8 py-10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <Image
                    src={challengePoster}
                    alt="Thử Thách 30 Ngày"
                    width={288}
                    height={288}
                    className="w-56 md:w-72 object-contain"
                  />
                  <p
                    className="text-sm md:text-base font-medium"
                    style={{ color: DARK_GRAY }}
                  >

                  </p>
                </div>
              </div>
            </div>
          </section>


          <section id="about" className="pb-14">
            <div
              className="max-w-4xl mx-auto px-6 text-[13px] md:text-[14px] leading-relaxed"
              style={{ color: DARK_GRAY }}
            >
              <p className="mb-3">
                Nhi đây, có ai học thức thức của Nhi xong bỏ vô góc trì hoãn
                không làm không? Thử Thách 30 Ngày ra đời để kéo bạn vào hành
                trình hành động cùng nhau, từng bước xoá thói quen xấu.
              </p>
              <p>
                Năm 2025, Nhi muốn gần hơn với khán giả của mình, cùng các bạn
                tạo ra nhiều điều tốt đẹp hơn cho cuộc sống!
              </p>
            </div>
          </section>


          <section className="pb-18 pb-16">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="section-title mb-10">30 NGÀY CÓ GÌ?</h2>

              <div className="grid md:grid-cols-2 gap-6 text-[13px] md:text-[14px]">
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
                    <li>Tự giác &amp; chủ động: thói quen “làm ngay”.</li>
                    <li>Được tiếp lửa &amp; truyền cảm hứng tích cực mỗi ngày.</li>
                    <li>Cộng đồng cùng chí hướng làm “bàn đạp” bền vững.</li>
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
                      Người muốn nâng cấp kỹ năng &amp; xây dựng thói quen tốt.
                    </li>
                  </ul>
                </div>

                <div className="card opacity-0 pointer-events-none hidden md:block" />
              </div>
            </div>
          </section>


          <section
            id="mentor"
            className="relative py-20"
            style={{ backgroundColor: LIGHT_GRAY_BG }}
          >
            <div className="mentor-bg-text">NGƯỜI HƯỚNG DẪN</div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
              <h2
                className="text-3xl md:text-4xl font-extrabold text-center mb-10"
                style={{ color: CTA_YELLOW }}
              >
                NGƯỜI DẪN ĐƯỜNG
              </h2>

              <div className="bg-white rounded-[32px] shadow-[0_18px_45px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="w-full">
                  <Image
                    src={tuyetMaiPhoto}
                    alt="Tuyết Mai"
                    width={800}
                    height={420}
                    className="w-full h-[340px] md:h-[420px] object-cover"
                  />
                </div>

                <div
                  className="px-8 md:px-10 pt-8 pb-10 text-[13px] md:text-[14px] leading-relaxed"
                  style={{ color: DARK_GRAY }}
                >
                  <p className="mb-3">
                    Hơn 3 năm kinh nghiệm trong lĩnh vực Sáng tạo nội dung và
                    xây dựng kênh cá nhân.
                  </p>

                  <p className="mb-2">
                    Là Content Creator &amp; người đồng hành chính trong Thử
                    Thách 30 Ngày.
                  </p>

                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>
                      Đồng hành giúp học viên xây kênh cá nhân từ con số 0.
                    </li>
                    <li>
                      Truyền cảm hứng để học viên tự tin xuất hiện trước ống
                      kính.
                    </li>
                    <li>Phong cách dẫn dắt: gần gũi, vui vẻ, thực tế.</li>
                  </ul>

                  <p className="font-semibold mb-2">Giá trị sau chương trình:</p>
                  <ul className="list-disc pl-5 space-y-1 mb-6">
                    <li>
                      Có nền tảng nội dung bền vững cho TikTok, Reels, Shorts...
                    </li>
                    <li>
                      Hình thành thói quen &amp; quy trình tự vận hành kênh sau
                      30 ngày.
                    </li>
                  </ul>

                  <div className="text-center mt-4">
                    <p
                      className="font-extrabold text-base md:text-lg"
                      style={{ color: DARK_GRAY }}
                    >
                      TUYẾT MAI
                    </p>
                    <p
                      className="text-xs md:text-sm font-semibold"
                      style={{ color: CTA_YELLOW }}
                    >
                      Nhà sáng tạo nội dung
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <section id="course-info" className="py-18 pb-16 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="section-title mb-10">THÔNG TIN THỬ THÁCH</h2>

              <div className="max-w-5xl mx-auto card">
                <h3
                  className="font-extrabold text-xl mb-6"
                  style={{ color: CTA_YELLOW }}
                >
                  THÔNG TIN KHÓA HỌC
                </h3>
                <div className="grid md:grid-cols-3 gap-y-6 gap-x-10 text-[13px] md:text-[14px]">
                  <div>
                    <p className="font-semibold mb-1">Chủ đề:</p>
                    <p>Sáng tạo nội dung</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Thời gian:</p>
                    <p>28/10/2025 - 28/11/2025</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Người dẫn đường:</p>
                    <p>Tuyết Mai</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Hình thức:</p>
                    <p>Mỗi ngày thực hiện thử nghiệm &amp; báo cáo trong nhóm.</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Địa điểm học:</p>
                    <p>Trò chuyện nhóm trực tuyến.</p>
                  </div>
                </div>
              </div>

              <div id="register" className="text-center mt-10">
                <a
                  href="#contact"
                  className="px-10 py-3 rounded-full btn-primary text-xs md:text-sm inline-flex items-center gap-2"
                >
                  ĐĂNG KÝ NGAY
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>
 
 
          <section className="py-14 bg-white">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <h2 className="section-title mb-10">
                ĐƠN VỊ TỔ CHỨC VÀ VẬN HÀNH
              </h2>

              <div className="flex flex-wrap justify-center gap-8 mb-10">
                <div className="bg-white border rounded-2xl px-10 py-6 shadow-sm flex items-center justify-center w-[260px] h-[140px]">
                  <Image
                    src={neduLogo}
                    alt="N-Education"
                    width={200}
                    height={64}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
                <div className="bg-white border rounded-2xl px-10 py-6 shadow-sm flex items-center justify-center w-[260px] h-[140px]">
                  <Image
                    src={challengePoster}
                    alt="Thử Thách 30 Ngày"
                    width={200}
                    height={64}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              </div>

              <div className="flex justify-center gap-4 text-xs">
                <a
                  href="#"
                  className="px-6 py-2 rounded-full border font-medium"
                  style={{
                    borderColor: CTA_YELLOW,
                    color: CTA_YELLOW,
                  }}
                >
                  MsNhiSG
                </a>
                <a
                  href="#"
                  className="px-6 py-2 rounded-full border font-medium"
                  style={{
                    borderColor: CTA_YELLOW,
                    color: CTA_YELLOW,
                  }}
                >
                  msnhi_podcast
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer
          id="contact"
          className="text-white"
          style={{ backgroundColor: FOOTER_GRAY }}
        >
          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-white font-extrabold flex items-center justify-center rounded">
                    <span style={{ color: CTA_YELLOW }}>N</span>
                  </div>
                  <span className="font-bold text-lg">Education</span>
                </div>
                <p className="mt-3 leading-relaxed">
                  CÔNG TY ĐỊNH CƯ THƯƠNG MẠI DỊCH VỤ NHILE
                  <br />
                  Mã số thuế: 0317285736
                  <br />
                  25 Lê Bá Trinh, Phường Hòa Cường Bắc, Quận Hải Châu, Đà Nẵng
                </p>
              </div>

              <div className="flex flex-col gap-1 font-medium">
                <a href="#hero" className="hover:underline">
                  TRANG CHỦ
                </a>
                <a href="#about" className="hover:underline">
                  30 NGÀY CÓ GÌ
                </a>
                <a href="#mentor" className="hover:underline">
                  NGƯỜI DẪN ĐƯỜNG
                </a>
                <a href="#course-info" className="hover:underline">
                  THÔNG TIN THỬ THÁCH
                </a>
              </div>

              <div className="flex flex-col items-start gap-3">
                <div className="flex flex-wrap gap-2">
                  <span>Facebook</span>
                  <span>Instagram</span>
                  <span>Youtube</span>
                  <span>TikTok</span>
                </div>
                <div className="mt-1">
                  Đối tác thanh toán
                  <div className="mt-1 bg-white px-3 py-1 rounded inline-block">
                    <span style={{ color: CTA_YELLOW }}>VNPay</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#f9d56b] text-[10px] flex flex-col md:flex-row items-center justify-between gap-2">
              <span>© 2025 N-Education. Bảo lưu mọi quyền.</span>
              <div className="flex gap-3">
                <span>Hướng dẫn thanh toán</span>
                <span>Chính sách bảo mật</span>
                <span>Điều khoản sử dụng</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ThirtyDayPage;
