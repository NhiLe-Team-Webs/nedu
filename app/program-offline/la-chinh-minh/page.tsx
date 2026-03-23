'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Brain, Gamepad2, Minus, Plus, ShieldCheck, Sparkles, Target, HelpCircle, ChevronDown } from "lucide-react";
import CourseHeader from "@/components/CourseHeader";
import CourseInfo from "@/components/CourseInfo";
import Mission from "@/components/Mission";
import Testimonials from "@/components/Testimonial";
import Instructor from "@/components/Instructor";
import Privilege from "@/app/Privilege";
import Organizers from "@/components/Organizers";
import { getCourseBySlug } from "@/data/courses";
import { getInstructorsByIds } from "@/data/instructors";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function LaChinhMinhPage() {
  const course = getCourseBySlug('la-chinh-minh');
  const { t } = useLanguage();
  const router = useRouter();
  const { addToCart, setShowSuccessPopup } = useCart();
  const [activeDay, setActiveDay] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);


  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Ensure the first day is open by default after hydration
  useEffect(() => {
    setActiveDay(0);
  }, []);

  const daysData = [
    {
      id: 1,
      day: "01",
      title: t("program_detail.courses.la_chinh_minh.days.0.title"),
      sub: t("program_detail.courses.la_chinh_minh.days.0.sub"),
      hook: t("program_detail.courses.la_chinh_minh.days.0.hook"),
      desc: t("program_detail.courses.la_chinh_minh.days.0.desc"),
      bullets: (t("program_detail.courses.la_chinh_minh.days.0.bullets") as unknown as string[]) || [], // Type casting hack if t() returns any
      activities: (t("program_detail.courses.la_chinh_minh.days.0.activities") as unknown as string[]) || [],
      outcome: t("program_detail.courses.la_chinh_minh.days.0.outcome")
    },
    {
      id: 2,
      day: "02",
      title: t("program_detail.courses.la_chinh_minh.days.1.title"),
      sub: t("program_detail.courses.la_chinh_minh.days.1.sub"),
      hook: t("program_detail.courses.la_chinh_minh.days.1.hook"),
      desc: t("program_detail.courses.la_chinh_minh.days.1.desc"),
      bullets: (t("program_detail.courses.la_chinh_minh.days.1.bullets") as unknown as string[]) || [],
      activities: (t("program_detail.courses.la_chinh_minh.days.1.activities") as unknown as string[]) || [],
      outcome: t("program_detail.courses.la_chinh_minh.days.1.outcome")
    },
    {
      id: 3,
      day: "03",
      title: t("program_detail.courses.la_chinh_minh.days.2.title"),
      sub: t("program_detail.courses.la_chinh_minh.days.2.sub"),
      hook: t("program_detail.courses.la_chinh_minh.days.2.hook"),
      desc: t("program_detail.courses.la_chinh_minh.days.2.desc"),
      bullets: (t("program_detail.courses.la_chinh_minh.days.2.bullets") as unknown as string[]) || [],
      activities: (t("program_detail.courses.la_chinh_minh.days.2.activities") as unknown as string[]) || [],
      outcome: t("program_detail.courses.la_chinh_minh.days.2.outcome")
    },
    {
      id: 4,
      day: "04",
      title: t("program_detail.courses.la_chinh_minh.days.3.title"),
      sub: t("program_detail.courses.la_chinh_minh.days.3.sub"),
      hook: t("program_detail.courses.la_chinh_minh.days.3.hook"),
      desc: t("program_detail.courses.la_chinh_minh.days.3.desc"),
      bullets: (t("program_detail.courses.la_chinh_minh.days.3.bullets") as unknown as string[]) || [],
      activities: (t("program_detail.courses.la_chinh_minh.days.3.activities") as unknown as string[]) || [],
      outcome: t("program_detail.courses.la_chinh_minh.days.3.outcome")
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
      t("program_detail.courses.cuoc_song_cua_ban.testimonials.0"), // Using existing testimonials
      t("program_detail.courses.cuoc_song_cua_ban.testimonials.1"),
      t("program_detail.courses.cuoc_song_cua_ban.testimonials.2"),
    ],
    title: t("program_detail.common.testimonials_title"),
    subtitle: t("program_detail.common.testimonials_subtitle"),
    buttonText: t("program_detail.common.add_to_cart"),
    buttonType: "cart" as const,
    course: course,
  };

  const whyCards = [
    {
      icon: <Brain size={28} />,
      title: t("program_detail.courses.la_chinh_minh.why_cards.0.title"),
      desc: t("program_detail.courses.la_chinh_minh.why_cards.0.desc")
    },
    {
      icon: <Gamepad2 size={28} />,
      title: t("program_detail.courses.la_chinh_minh.why_cards.1.title"),
      desc: t("program_detail.courses.la_chinh_minh.why_cards.1.desc")
    },
    {
      icon: <ShieldCheck size={28} />,
      title: t("program_detail.courses.la_chinh_minh.why_cards.2.title"),
      desc: t("program_detail.courses.la_chinh_minh.why_cards.2.desc")
    },
    {
      icon: <Target size={28} />,
      title: t("program_detail.courses.la_chinh_minh.why_cards.3.title"),
      desc: t("program_detail.courses.la_chinh_minh.why_cards.3.desc")
    }
  ];

  // Hàm xử lý thêm vào giỏ hàng và hiện popup
  const handleAddToCart = () => {
    addToCart(course);
    setShowSuccessPopup(true);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-20 override-header-spacing">
      <CourseHeader
        bannerUrl="/lachinhminh.jpg"
        altText={t("program_detail.courses.la_chinh_minh.title")}
        time={t("program_detail.common.offline_course")}
        tags={[t("categories.personal_development"), t("categories.be_yourself")]}
        title={t("program_detail.courses.la_chinh_minh.title")}
        cost={course?.price.amount || "68.690.000"}
        paymentLink="/payment/57"
        courseSlug="la-chinh-minh"
      />

      <div className="ios-safe-padding-bottom">
        {/* Nút thêm vào giỏ hàng giữ nguyên UI, chỉ thêm hiệu ứng popup */}
        <button
          onClick={handleAddToCart}
          className="h-10 px-4 bg-orange-500 text-white rounded-lg mt-4"
        >
          {t("program_detail.common.add_to_cart")}
        </button>
        <CourseInfo
          title={t("program_detail.info.title")}
          details={[
            {
              icon: "Star",
              label: t("program_detail.info.topic"),
              value: t("program_detail.courses.la_chinh_minh.topic"),
            },
            { icon: "Clock", label: t("program_detail.info.schedule"), value: t("program_detail.courses.la_chinh_minh.schedule") },
            {
              icon: "MapPin",
              label: t("program_detail.info.instructor"),
              value: t("program_detail.courses.la_chinh_minh.instructor"),
            },
            { icon: "Calendar", label: t("program_detail.info.sessions"), value: t("program_detail.courses.la_chinh_minh.sessions") },
            {
              icon: "House",
              label: t("program_detail.info.location"),
              value: t("program_detail.courses.la_chinh_minh.location"),
            },
            { icon: "Users", label: t("program_detail.info.capacity"), value: t("program_detail.courses.la_chinh_minh.capacity") },
          ]}
        />
        <Mission
          title={t("mission.title")}
          subtitle={t("mission.subtitle")}
          description={t("program_detail.courses.la_chinh_minh.mission_desc")}
          imgUrl="/lachinhminh.jpg"
        />

        <section className="bg-white py-12 md:py-20 rounded-t-ios-2xl border-t border-white/20 -mt-6 z-10 relative shadow-ios-card-hover">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mb-12 max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-3 leading-tight">
                {t("program_detail.common.roadmap_title")} <span className="text-gray-400 font-normal">{t("program_detail.common.roadmap_subtitle")}</span>
              </h2>
              <p className="text-lg text-gray-500 font-medium">
                {t("program_detail.common.roadmap_desc")}
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
                              <span className="text-primary font-bold tracking-widest text-xs uppercase">{t("program_detail.common.day")} {day.day}</span>
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
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">{t("program_detail.common.outcome")}</p>
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
                              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">{t("program_detail.common.outcome_label")}</p>
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
                {t("program_detail.common.why_title")} <br className="hidden md:block" />
                <span className="text-gray-400 font-light">{t("program_detail.common.why_subtitle_1")}</span>{" "}
                <br className="hidden md:block" />
                <span className="text-primary font-bold uppercase tracking-wide">{t("program_detail.common.why_subtitle_2")}</span>.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {whyCards.map((card, idx) => (
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

        {/* FAQ Section */}
        <section className="bg-white py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column: Info */}
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mb-6">
                    <HelpCircle className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                    {t("program_detail.courses.la_chinh_minh.faq.heading")}
                  </h2>
                  <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                    {t("program_detail.courses.la_chinh_minh.faq.description")}
                  </p>
                  <Button
                    onClick={() => router.push('/contact')}
                    className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {t("program_detail.courses.la_chinh_minh.faq.contact_button")}
                  </Button>
                </div>
              </div>

              {/* Right Column: Accordion */}
              <div className="lg:col-span-8">
                <div className="space-y-4">
                  {(() => {
                    const items = t("program_detail.courses.la_chinh_minh.faq.items");
                    if (!Array.isArray(items)) return null;

                    const listItems = items as any[];
                    const displayedItems = listItems;

                    return displayedItems.map((item: any, index: number) => (
                      <div
                        key={index}
                        className={cn(
                          "border rounded-2xl overflow-hidden transition-all duration-300",
                          openFaqIndex === index
                            ? "border-gray-200 bg-white shadow-lg"
                            : "border-transparent bg-gray-50 hover:bg-gray-100"
                        )}
                      >
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full flex items-center justify-between p-5 md:p-6 text-left transition-colors"
                        >
                          <div className="flex gap-4 items-start pr-4">
                            <span className="text-sm md:text-base font-bold text-gray-400 mt-0.5">
                              {index + 1}/
                            </span>
                            <span className={cn(
                              "text-base md:text-lg font-bold transition-colors",
                              openFaqIndex === index ? "text-primary" : "text-gray-900"
                            )}>
                              {item.question}
                            </span>
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 text-gray-400 transition-transform duration-300 flex-shrink-0 mt-1",
                              openFaqIndex === index ? "transform rotate-180 text-primary" : ""
                            )}
                          />
                        </button>
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-300 ease-in-out",
                            openFaqIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                          )}
                        >
                          <div className="p-6 pt-0 pl-12 md:pl-14 text-gray-600 leading-relaxed whitespace-pre-line text-base md:text-lg">
                            {item.answer ? item.answer.split('\\n').map((line: string, i: number) => (
                              <span key={i} className="block mb-2 last:mb-0">{line}</span>
                            )) : ''}
                          </div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>


              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
