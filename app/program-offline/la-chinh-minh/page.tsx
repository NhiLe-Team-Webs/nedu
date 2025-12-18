"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Brain, Gamepad2, Minus, Plus, ShieldCheck, Sparkles, Target } from "lucide-react";
import CourseHeader from "@/components/CourseHeader";
import CourseInfo from "@/components/CourseInfo";
import Mission from "@/components/Mission";
import Testimonials from "@/components/Testimonial";
import Instructor from "@/components/Instructor";
import Privilege from "@/app/Privilege";
import Organizers from "@/components/Organizers";
import { getCourseBySlug } from "@/data/courses";
import { getInstructorsByIds } from "@/data/instructors";

export default function LaChinhMinhPage() {
  const course = getCourseBySlug('la-chinh-minh');
  const [activeDay, setActiveDay] = useState<number>(0);

  // Ensure the first day is open by default after hydration
  useEffect(() => {
    setActiveDay(0);
  }, []);

  const daysData = [
    {
      id: 1,
      day: "01",
      title: "AWAKEN",
      sub: "Tỉnh thức",
      hook: "Đánh thức ngọn lửa bên trong.",
      desc: "Ngừng sống mòn. Chúng ta sẽ đi xuyên qua những tầng lớp của sự sợ hãi để chạm vào động lực gốc rễ.",
      bullets: [
        "Khai phá 'Big Why' – Lý do tồn tại.",
        "Gỡ bỏ kỳ vọng vay mượn.",
        "Đối thoại: Bạn là ai?"
      ],
      activities: ["Game: Simulation Life", "Vòng tròn Sự thật"],
      outcome: "Sự sáng rõ. Biết chính xác mình sống vì điều gì."
    },
    {
      id: 2,
      day: "02",
      title: "UNBOX",
      sub: "Khai phóng",
      hook: "Phá vỡ những chiếc hộp vô hình.",
      desc: "Tiền bạc. Định kiến. Môi trường. Những rào cản vô hình đang giam cầm tiềm năng của bạn sẽ bị đập tan.",
      bullets: [
        "Giải mã tư duy tài chính.",
        "Thanh lọc quan hệ độc hại.",
        "Cài đặt tư duy làm chủ."
      ],
      activities: ["Bản đồ Tài chính", "Game: Hệ sinh thái"],
      outcome: "Sự tự do. Nắm lại quyền kiểm soát vận mệnh."
    },
    {
      id: 3,
      day: "03",
      title: "REVEAL",
      sub: "Chữa lành",
      hook: "Đối diện để thấy bình yên.",
      desc: "Gỡ bỏ lớp mặt nạ 'mạnh mẽ' giả tạo để ôm lấy tổn thương. Chỉ khi dám đối diện, bạn mới được chữa lành.",
      bullets: [
        "Đối mặt với 'Bóng tối' (Shadow Work).",
        "Kết nối đứa trẻ bên trong.",
        "Chạm vào cốt lõi linh hồn."
      ],
      activities: ["Mirror: Đối diện", "Lễ lột xác (Signature)"],
      outcome: "Sự nhẹ nhõm. Hạnh phúc vì được là chính mình."
    },
    {
      id: 4,
      day: "04",
      title: "REBORN",
      sub: "Tái sinh",
      hook: "Sống là chính mình.",
      desc: "Bước ra thế giới với một nhân dạng mới. Kiên cường. Bản lĩnh. Và hoàn toàn chân thật.",
      bullets: [
        "Hợp nhất nội tâm.",
        "Lộ trình 5 năm di sản.",
        "Cam kết sống không hối tiếc."
      ],
      activities: ["Mapping Future Self", "Ceremony Trở về"],
      outcome: "Một bản thể rực rỡ. Sẵn sàng dẫn dắt cuộc đời."
    }
  ];

  const youtubeOpts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  // Get instructors from global data
  const instructors = getInstructorsByIds(["nhi-le"]);


  const testimonials = {
    videos: [
      "https://www.youtube.com/embed/PFWDwSf5EGc",
      "https://www.youtube.com/embed/RAaXaJxFXpE",
      "https://www.youtube.com/embed/8qq6WDQFFQk",
    ],
    captions: [
      "Tâm cơ cực kỳ hào hứng để có thể chia sẻ với tất cả các bạn những cái trải nghiệm vừa rồi về 5 bài test thông dụng để xác định một người nào đó có những cái đặc tính nào nổi trội",
      "Nhưng mà trước khi mà các bạn muốn yêu một ai đó một cách đúng ấy thì các bạn phải yêu bản thân mình một cách đúng trước đã",
      "Một cái khá là hay trong cái khóa học lần này là Nhi Lê cho các bạn những cái bài test những cái câu hỏi những cái công cụ để các bạn có thể xác định được cái chỉ số của mình",
    ],
    title: "Testimonials",
    subtitle: "Lời chứng thực",
    buttonText: "Thêm vào giỏ hàng",
    buttonType: "cart" as const,
    course: course,
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-20 override-header-spacing">
      <CourseHeader
        bannerUrl="/lachinhminh.jpg"
        altText="Là chính mình"
        time="Thời gian: THÁNG 03 NĂM 2026"
        tags={["Phát triển bản thân", "Là chính mình"]}
        title="Là Chính Mình 04"
        cost={course?.price.amount || "59.696.000"}
        paymentLink="/payment/57"
        courseSlug="la-chinh-minh"
      />

      <div className="ios-safe-padding-bottom">
        <CourseInfo
          title="THÔNG TIN KHÓA HỌC"
          details={[
            {
              icon: "Star",
              label: "Chủ đề:",
              value: "Phát triển bản thân và khám phá nội tâm",
            },
            { icon: "Clock", label: "Thời gian học:", value: "05–08/03/2026" },
            {
              icon: "MapPin",
              label: "Người dẫn đường:",
              value: "NhiLe x Guest Instructors",
            },
            { icon: "Calendar", label: "Số buổi học:", value: "3,5 ngày" },
            {
              icon: "House",
              label: "Địa điểm học:",
              value: "Đà Nẵng",
            },
            { icon: "Users", label: "Số lượng học viên:", value: "64 học viên" },
          ]}
        />
        <Mission
          title="Mission"
          subtitle="Sứ mệnh"
          description="Khóa học “Là Chính Mình” mang sứ mệnh giúp bạn khám phá và chữa lành mọi khía cạnh của bản thân, xây dựng lối sống cân bằng và phát triển toàn diện về tinh thần, cảm xúc, và thể chất."
          imgUrl="/lachinhminh.jpg"
        />

        <section className="bg-white py-12 md:py-20 rounded-t-ios-2xl border-t border-white/20 -mt-6 z-10 relative shadow-ios-card-hover">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mb-12 max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-3 leading-tight">
                Lộ trình. <span className="text-gray-400 font-normal">Dành riêng cho bạn.</span>
              </h2>
              <p className="text-lg text-gray-500 font-medium">
                3.5 ngày tháo gỡ, chữa lành và tái thiết kế cuộc đời.
              </p>
            </div>

            <div className="hidden lg:flex gap-4 h-[580px] mb-20">
              {daysData.map((day, index) => {
                const isActive = (activeDay ?? 0) === index;
                const isSpecial = day.id === 4;

                return (
                  <div
                    key={day.id}
                    onClick={() => setActiveDay(index)}
                    className={`relative rounded-ios-2xl cursor-pointer transition-all duration-700 ease-out-expo overflow-hidden flex flex-col group border border-transparent
                      ${isActive
                        ? "flex-[3] bg-gray-900 shadow-ios-card-hover"
                        : "flex-[0.6] bg-gray-50 hover:bg-gray-100 hover:border-gray-200"
                      }
                    `}
                  >
                    {isActive && (
                      <div className="h-full flex flex-col relative z-10 p-8">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-primary font-bold tracking-widest text-xs uppercase">Day {day.day}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                              <span className="text-gray-400 text-sm font-medium uppercase tracking-wide">{day.sub}</span>
                            </div>
                            <h3 className="text-5xl font-bold text-white tracking-tight">{day.title}</h3>
                          </div>
                        </div>

                        <div className="flex-1 min-h-0 flex flex-col justify-center">
                          <div className="mb-8">
                            <p
                              className={`text-2xl font-medium mb-4 leading-tight ${isSpecial
                                ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-text-shimmer"
                                : "text-white"
                                }`}
                            >
                              {day.hook}
                            </p>

                            <p className="text-gray-300 text-base leading-relaxed border-l-2 border-primary/50 pl-4 max-w-lg">
                              {day.desc}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 gap-3 mb-8">
                            {day.bullets.map((bullet, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3 group/item"
                              >
                                <ArrowRight size={16} className="text-primary group-hover/item:translate-x-1 transition-transform" />
                                <p className="text-gray-300 text-sm font-medium">{bullet}</p>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-2 mt-auto">
                            {day.activities.map((act, i) => (
                              <span
                                key={i}
                                className="px-3 py-1.5 rounded-ios-full bg-white/10 text-gray-300 text-[11px] font-bold uppercase tracking-wider border border-white/5 backdrop-blur-sm"
                              >
                                {act}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div
                          className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-ios-xl p-4 border border-white/10 flex items-center gap-4 mt-6 group/box hover:bg-white/10 transition-colors"
                        >
                          <div className="p-2.5 bg-primary text-gray-900 rounded-lg shrink-0 shadow-lg group-hover/box:rotate-12 transition-transform duration-300">
                            <Sparkles size={20} />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Giá trị nhận được</p>
                            <p className="text-white font-semibold text-base">{day.outcome}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {!isActive && (
                      <div className="h-full flex flex-col items-center justify-between py-8 w-full transition-opacity duration-300 delay-100">
                        <span className="text-gray-400 font-bold text-lg font-mono">0{day.id}</span>
                        <div className="flex-1 flex items-center justify-center py-8 w-full">
                          <h3 className="text-3xl font-bold text-gray-300 tracking-widest [writing-mode:vertical-rl] rotate-180 uppercase whitespace-nowrap group-hover:text-gray-900 transition-colors duration-500">
                            {day.title}
                          </h3>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:scale-110 group-hover:border-primary transition-all duration-300 shadow-sm">
                          <Plus size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="lg:hidden flex flex-col gap-4 mb-12">
              {daysData.map((day, index) => {
                const isActive = activeDay === index;
                const isSpecial = day.id === 4;

                return (
                  <div
                    key={day.id}
                    className={`rounded-ios-xl transition-all duration-500 overflow-hidden border ${isActive ? "bg-gray-900 border-gray-900 shadow-ios-card scale-[1.02] z-10" : "bg-white border-gray-100 hover:border-gray-200"
                      }`}
                  >
                    <div
                      onClick={() => setActiveDay(isActive ? -1 : index)}
                      className="p-6 flex justify-between items-center cursor-pointer ios-haptic-active"
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-sm font-bold opacity-50 font-mono ${isActive ? "text-white" : "text-gray-900"}`}>0{day.id}</span>
                        <div>
                          <h3 className={`text-xl font-bold uppercase tracking-tight leading-none ${isActive ? "text-white" : "text-gray-900"}`}>
                            {day.title}
                          </h3>
                          <p className={`text-xs font-bold uppercase tracking-wider mt-1.5 ${isActive ? "text-primary" : "text-gray-400"}`}>
                            {day.sub}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? "bg-white/10 text-white rotate-180" : "bg-gray-50 text-gray-400"
                          }`}
                      >
                        {isActive ? <Minus size={18} /> : <Plus size={18} />}
                      </div>
                    </div>

                    <div className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden">
                        <div className={`px-6 pb-8 pt-0 transition-opacity duration-500 ${isActive ? "opacity-100 delay-100" : "opacity-0"}`}>
                          <div className="h-px w-full bg-white/10 mb-6"></div>

                          <p
                            className={`text-lg font-medium mb-3 ${isSpecial
                              ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-text-shimmer"
                              : "text-white"
                              }`}
                          >
                            {day.hook}
                          </p>

                          <p className="text-gray-300 text-sm mb-6 leading-relaxed opacity-90">
                            {day.desc}
                          </p>

                          <div className="mb-6 space-y-3 bg-black/20 p-5 rounded-ios-lg">
                            {day.bullets.map((bullet, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                                <p className="text-gray-300 text-sm">{bullet}</p>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-ios-lg border border-white/5">
                            <Sparkles className="text-primary w-5 h-5 shrink-0" />
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">OUTCOME</p>
                              <p className="text-white text-sm font-medium">{day.outcome}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#F2F2F7] md:pb-20">
          <div className="container mx-auto px-4 md:px-8 pt-16 md:pt-24">
            <div className="mb-12 md:mb-16 max-w-5xl mx-auto px-2 text-center md:text-left">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-none">
                Tại sao N-Education? <br className="hidden md:block" />
                <span className="text-gray-400 font-light">Nơi duy nhất để bạn</span>{" "}
                <br className="hidden md:block" />
                <span className="text-primary font-bold uppercase tracking-wide">LÀ CHÍNH MÌNH</span>.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  icon: <Brain size={28} />,
                  title: "Khoa học Tâm thức",
                  desc: "Kết hợp Tâm lý học Hành vi & Khoa học não bộ. Tháo gỡ nỗi sợ từ gốc rễ cơ chế vận hành."
                },
                {
                  icon: <Gamepad2 size={28} />,
                  title: "Game Mô phỏng",
                  desc: "Không lý thuyết suông. Bạn học qua trải nghiệm, va vấp và vỡ òa ngay trong các Game giả lập cuộc đời."
                },
                {
                  icon: <ShieldCheck size={28} />,
                  title: "Không phán xét",
                  desc: "Một không gian an toàn tuyệt đối để trút bỏ mặt nạ, nơi sự yếu đuối của bạn được trân trọng và chữa lành."
                },
                {
                  icon: <Target size={28} />,
                  title: "Kết quả Hữu hình",
                  desc: "Ra về với 'Bản thiết kế cuộc đời' 5 năm chi tiết. Biến nội lực thành hành động thực tế."
                }
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-ios-xl p-8 transition-all duration-300 hover:shadow-ios-card-hover border border-white/50 group"
                >
                  <div className="w-14 h-14 bg-[#F2F2F7] text-gray-900 rounded-ios-full flex items-center justify-center mb-6 group-hover:text-primary group-hover:scale-110 transition-all duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm font-medium">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials {...testimonials} />
        <Instructor instructors={instructors} />
        <Privilege />
        <Organizers />
      </div>
    </div>
  );
}
