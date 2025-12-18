"use client";

import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Zap,
} from "lucide-react";
import Organizers from "@/components/Organizers";

const neduLogo = "/picture/nedu.svg";
const challengePoster = "/picture/thuthach30day.png";
const tuyetMaiPhoto = "/picture/denise.jpg";

const ThirtyDayPage = () => {
  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-20 override-header-spacing font-sans text-gray-900">
      <main className="ios-safe-padding-bottom">
        {/* HERO */}
        <section id="hero" className="pt-8 sm:pt-12 md:pt-16 pb-10 sm:pb-14 text-center px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 text-primary tracking-tight">
              THỬ THÁCH 30 NGÀY
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-600 mb-2">
              Chủ đề Tháng 12: <span className="text-gray-900">Tỏa sáng cùng Denise</span>
            </p>
            <div className="mt-2 text-sm sm:text-base bg-white/60 inline-block px-4 py-2 rounded-ios-lg backdrop-blur-sm border border-white/40">
              Chi phí mỗi tháng:{" "}
              <span className="text-green-600 font-extrabold text-lg sm:text-xl">
                396.000 VND
              </span>
            </div>

            <div className="mt-8 sm:mt-10 mb-8 sm:mb-10">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdFUBpOdZTswjw0mraKvyBW0bU5AGK9hrZYatNC2K3gnpQJdQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 bg-primary text-white font-bold rounded-ios-btn shadow-ios-md hover:shadow-ios-lg hover:brightness-105 active:scale-95 transition-all duration-300 ios-haptic-active text-sm sm:text-base animate-pulse-subtle"
              >
                ĐĂNG KÝ NGAY
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>

            <div className="flex justify-center mb-8">
              <Image
                src={neduLogo}
                alt="N-Education"
                width={600}
                height={150}
                className="w-48 sm:w-64 md:w-80 h-auto object-contain opacity-80"
              />
            </div>

            <div className="flex items-center justify-center">
              <div className="relative rounded-ios-xl shadow-ios-float overflow-hidden border-[6px] border-white max-w-[1000px] w-full">
                <Image
                  src={challengePoster}
                  alt="Thử Thách 30 Ngày"
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-10 sm:py-14 max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-ios-xl shadow-ios-card p-6 sm:p-10 border border-white/50 text-center">
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4">
              <span className="font-bold text-gray-900">Nhi đây!</span> Có ai học kiến thức của Nhi xong bỏ vô góc trì hoãn không làm không? Thử Thách 30 Ngày ra đời để kéo bạn vào hành trình hành động cùng nhau, từng bước xoá thói quen xấu.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Năm 2025, Nhi muốn gần hơn với khán giả của mình, cùng các bạn tạo ra nhiều điều tốt đẹp hơn cho cuộc sống!
            </p>
          </div>
        </section>

        {/* 30 NGÀY CÓ GÌ */}
        <section className="py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-4xl font-black text-center text-gray-900 mb-8 sm:mb-12 tracking-tight">
              30 NGÀY CÓ GÌ?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-ios-xl shadow-ios-card p-6 sm:p-8 hover:shadow-ios-float transition-all duration-300 border border-white/50 group">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary">
                  <Zap size={24} fill="currentColor" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  Thử nghiệm 30 ngày là gì?
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Hành trình 30 ngày hành động liên tục dưới sự quan sát và đồng hành của đội ngũ. Mỗi ngày nhận nhiệm vụ rõ ràng, hoàn thành và báo cáo trong nhóm riêng trước 23h.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-ios-xl shadow-ios-card p-6 sm:p-8 hover:shadow-ios-float transition-all duration-300 border border-white/50 group">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  Bạn nhận được gì?
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> Rèn luyện tính kỷ luật, hành động liên tục.</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> Tự giác & chủ động: thói quen "làm ngay".</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> Được tiếp lửa & truyền cảm hứng mỗi ngày.</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> Cộng đồng cùng chí hướng bền vững.</li>
                </ul>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-ios-xl shadow-ios-card p-6 sm:p-8 hover:shadow-ios-float transition-all duration-300 border border-white/50 group">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary">
                  <Users size={24} fill="currentColor" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  Ai nên tham gia?
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> Người đang trì hoãn, thiếu động lực.</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> Người muốn tìm môi trường tích cực.</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> Người muốn nâng cấp kỹ năng & xây dựng thói quen tốt.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MENTOR */}
        <section id="mentor" className="py-12 sm:py-20 bg-[#F7F8FC] text-gray-900 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 font-extrabold text-[15vw] sm:text-[10rem] whitespace-nowrap text-[#F8B516]/10 select-none">
              NGƯỜI HƯỚNG DẪN
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-10 text-primary uppercase tracking-widest">
              Người Dẫn Đường
            </h2>

            <div className="bg-white rounded-ios-xl shadow-ios-float overflow-hidden text-gray-900">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={tuyetMaiPhoto}
                    alt="Denise"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-3xl font-black text-gray-900 mb-1">DENISE</h3>
                    <p className="text-primary font-bold tracking-wide uppercase text-sm">Host & Content Creator</p>
                  </div>

                  <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                    <p>
                      Host & Content Creator, tập trung vào Phát triển cá nhân cho những người không nghiêm túc.
                    </p>
                    <p>
                      Truyền cảm hứng cho hơn 23.000 người trên toàn thế giới qua podcast, YouTube và những cuộc trò chuyện chân thật.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-ios-lg border border-gray-100 mt-4">
                      <p className="font-bold text-gray-900 mb-2">Đam mê với việc thay đổi nhận thức:</p>
                      <p className="text-sm">Giúp bạn nhận ra không cần thay đổi tính cách để đạt được điều tuyệt vời — hãy phát triển bằng cách là chính mình.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COURSE INFO */}
        <section id="course-info" className="py-12 sm:py-20 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-4xl font-black text-center text-gray-900 mb-8 sm:mb-12 tracking-tight">THÔNG TIN KHÓA HỌC</h2>

            <div className="bg-white rounded-ios-xl shadow-ios-card p-6 sm:p-10 border border-white/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Item */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">Chủ đề</p>
                    <p className="text-lg font-bold text-gray-900">Tỏa sáng cùng Denise</p>
                  </div>
                </div>
                {/* Item */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">Thời gian</p>
                    <p className="text-lg font-bold text-gray-900">28/12/2025 – 28/01/2026</p>
                  </div>
                </div>
                {/* Item */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Users size={20} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">Người dẫn đường</p>
                    <p className="text-lg font-bold text-gray-900">Denise</p>
                  </div>
                </div>
                {/* Item */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">Hình thức</p>
                    <p className="text-lg font-bold text-gray-900">Thực hiện thử nghiệm & báo cáo nhóm</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 sm:mt-12 text-center border-t border-gray-100 pt-8">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdFUBpOdZTswjw0mraKvyBW0bU5AGK9hrZYatNC2K3gnpQJdQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white font-bold rounded-ios-btn shadow-ios-md hover:shadow-ios-lg hover:brightness-105 active:scale-95 transition-all duration-300 ios-haptic-active text-lg"
                >
                  ĐĂNG KÝ THAM GIA NGAY
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ORGANIZERS - Reuse transparent component or build similar structure */}
        <Organizers />
      </main>
    </div>
  );
};

export default ThirtyDayPage;