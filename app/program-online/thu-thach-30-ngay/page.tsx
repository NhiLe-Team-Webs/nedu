"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Clock,
  Users,
  MapPin,
  Globe,
  FileText,
  Headphones,
  UserPlus,
  Check,
  X,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/cart-context";
import { courses } from "@/data/courses";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getCourseDetailBySlug } from "@/lib/services/courseService";
import { CourseDetail } from "@/lib/types/course";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse bg-gray-200 rounded", className)} />
);


const challengePosterDesktop = "/picture/thuthach30day_desktop.png";
const challengePosterMobile = "/picture/thuthach30day_mobile.png";

// Find the 30 day challenge course
const thirtyDayCourse = courses.find((c) => c.slug === "thu-thach-30-ngay");

// Format currency helper
const formatCurrency = (value: number | undefined) => {
  if (value === undefined || value === null) return "N/A";
  return new Intl.NumberFormat("vi-VN").format(value);
};


const ThirtyDayPage = () => {
  const { t } = useLanguage();
  const { addToCart, buyNow } = useCart();
  const router = useRouter();

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showAllFaq, setShowAllFaq] = useState(false);
  const [courseData, setCourseData] = useState<CourseDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeBlock, setActiveBlock] = useState("1");
  const [addedToCart, setAddedToCart] = useState<{
    monthly: boolean;
    membership: boolean;
  }>({ monthly: false, membership: false });

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getCourseDetailBySlug("thu-thach-30-ngay");
      if (data) {
        setCourseData(data);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  // Sync some data from DB to local variables if available
  const dbInfo = courseData?.description?.information || {};
  const dbPrivileges = Array.isArray(courseData?.description?.privilege) ? courseData?.description?.privilege : null;
  const dbMentor = courseData?.mentors?.[0];

  // Logic mapping fields FROM YOUR DATABASE LOG
  const displaySchedule = courseData?.program?.total_sessions || t("thirty_day_challenge.timeline.time_value");

  const displayStudentCount = (courseData?.program as any)?.course
    ? `${(courseData?.program as any).course} người`
    : (dbInfo.student_count || t("thirty_day_challenge.timeline.students_count"));

  const displayLocation = courseData?.program?.link_payment || t("thirty_day_challenge.timeline.location_value");

  const displayCourseName = courseData?.program?.program_name || courseData?.description?.program_name || t("thirty_day_challenge.title");
  const displayTopic = courseData?.program?.hashtag || courseData?.description?.topic || t("thirty_day_challenge.topic_name");
  const displayShortDesc = t("thirty_day_challenge.what_is_section.col_1.content");

  // Map 'privilege' from DB to the "Sau 30 ngày..." blocks as requested
  const highlightFeatures = courseData?.challengeDetail ? [
    {
      title: courseData.challengeDetail.benefit_1_title,
      quote: courseData.challengeDetail.benefit_1_quote,
      description: courseData.challengeDetail.benefit_1_description
    },
    {
      title: courseData.challengeDetail.benefit_2_title,
      quote: courseData.challengeDetail.benefit_2_quote,
      description: courseData.challengeDetail.benefit_2_description
    },
    {
      title: courseData.challengeDetail.benefit_3_title,
      quote: courseData.challengeDetail.benefit_3_quote,
      description: courseData.challengeDetail.benefit_3_description
    },
  ] : dbPrivileges;

  // Privileges data - Reverted to static translations as requested
  const privileges = [
    {
      icon: <UserPlus className="h-8 w-8 text-primary" />,
      title: t("thirty_day_challenge.benefits.items.community.title"),
      description: t("thirty_day_challenge.benefits.items.community.description"),
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: t("thirty_day_challenge.benefits.items.global.title"),
      description: t("thirty_day_challenge.benefits.items.global.description"),
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: t("thirty_day_challenge.benefits.items.personalized.title"),
      description: t("thirty_day_challenge.benefits.items.personalized.description"),
    },
    {
      icon: <Headphones className="h-8 w-8 text-primary" />,
      title: t("thirty_day_challenge.benefits.items.support.title"),
      description: t("thirty_day_challenge.benefits.items.support.description"),
    },
  ];

  // Pricing plan features
  const monthlyPlanFeatures = [
    {
      text: t("thirty_day_challenge.pricing.monthly.features.topic"),
      included: true,
    },
    { text: t("thirty_day_challenge.pricing.monthly.features.daily_activities"), included: true },
    { text: t("thirty_day_challenge.pricing.monthly.features.zoom"), included: true },
    { text: t("thirty_day_challenge.pricing.monthly.features.telegram"), included: true },
    { text: t("thirty_day_challenge.pricing.monthly.features.support"), included: true },
    { text: t("thirty_day_challenge.pricing.monthly.features.no_archive"), included: false },
    { text: t("thirty_day_challenge.pricing.monthly.features.no_bonus"), included: false },
  ];

  const membershipPlanFeatures = [
    { text: t("thirty_day_challenge.pricing.membership.features.all_topics"), included: true },
    {
      text: t("thirty_day_challenge.pricing.membership.features.all_challenges"),
      included: true,
    },

    {
      text: t("thirty_day_challenge.pricing.membership.features.member_group"),
      included: true,
    },
    { text: t("thirty_day_challenge.pricing.membership.features.year_support"), included: true },
    { text: t("thirty_day_challenge.pricing.membership.features.pause_right"), included: true },
    {
      text: t("thirty_day_challenge.pricing.membership.features.advanced_discount"),
      included: true,
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Auto scroll to pricing section if hash is present
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#pricing') {
      setTimeout(() => {
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500); // Delay to ensure page is fully loaded
    }
  }, []);

  const handleAddToCart = (planType: "monthly" | "membership") => {
    if (!thirtyDayCourse) return;

    const formattedMonthlyPrice = new Intl.NumberFormat("vi-VN").format(monthlyPrice);
    const formattedMembershipPrice = new Intl.NumberFormat("vi-VN").format(membershipPrice);

    // Create a modified course with the appropriate price based on plan type
    const courseToAdd =
      planType === "membership"
        ? {
          ...thirtyDayCourse,
          id: thirtyDayCourse.id + 1000, // Different ID for membership
          price: { ...thirtyDayCourse.price, amount: formattedMembershipPrice },
          title: "thirty_day_challenge.title_membership",
        }
        : {
          ...thirtyDayCourse,
          price: { ...thirtyDayCourse.price, amount: formattedMonthlyPrice }
        };

    addToCart(courseToAdd);
    setAddedToCart((prev) => ({ ...prev, [planType]: true }));

    // Reset after 2 seconds
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [planType]: false }));
    }, 2000);
  };

  const handleDirectCheckout = (planType: "monthly" | "membership") => {
    if (!thirtyDayCourse) return;

    const formattedMonthlyPrice = new Intl.NumberFormat("vi-VN").format(monthlyPrice);
    const formattedMembershipPrice = new Intl.NumberFormat("vi-VN").format(membershipPrice);

    const courseToAdd =
      planType === "membership"
        ? {
          ...thirtyDayCourse,
          id: thirtyDayCourse.id + 1000,
          price: { ...thirtyDayCourse.price, amount: formattedMembershipPrice },
          title: "thirty_day_challenge.title_membership",
        }
        : {
          ...thirtyDayCourse,
          price: { ...thirtyDayCourse.price, amount: formattedMonthlyPrice }
        };

    buyNow(courseToAdd);
    router.push("/checkout");
  };

  // Parse the price from the course - Prioritize data from program_30day_challenge table
  const monthlyPrice = courseData?.challengeDetail?.monthly_price ?? (thirtyDayCourse
    ? parseInt(thirtyDayCourse.price.amount.replace(/\./g, ""))
    : 396000);

  const membershipPrice = courseData?.challengeDetail?.membership_price ?? 3960000; // Fallback to 3.960.000

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-20 override-header-spacing font-sans text-gray-900">
      <main className="ios-safe-padding-bottom">
        {/* HERO SECTION - Responsive images for desktop/mobile */}
        <section className="relative w-full -mt-14 sm:-mt-16 md:-mt-20 pt-14 sm:pt-16 md:pt-20">
          {/* Desktop Image */}
          {isLoading ? (
            <Skeleton className="hidden md:block w-full aspect-[16/9]" />
          ) : (
            <Image
              src={challengePosterDesktop}
              alt={displayCourseName}
              width={1920}
              height={1080}
              className="hidden md:block w-full h-auto object-contain hover:transform-none"
              priority
            />
          )}
          {/* Mobile Image */}
          {isLoading ? (
            <Skeleton className="block md:hidden w-full aspect-[750/1334]" />
          ) : (
            <Image
              src={challengePosterMobile}
              alt={displayCourseName}
              width={750}
              height={1334}
              className="block md:hidden w-full h-auto object-contain hover:transform-none"
              priority
            />
          )}
        </section>


        {/* VÌ SAO NHI LÀM 30 DAYS? */}
        <section className="bg-[#F2F2F7] py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-primary uppercase">
                Vì sao Nhi làm 30 Days?
              </h2>
            </div>
            <div className="max-w-4xl mx-auto text-center text-gray-600 text-base md:text-lg leading-relaxed">
              <p className="mb-4">
                Nhi đây, có ai học kiến thức của Nhi xong bỏ vô góc trì hoãn không làm không?
              </p>
              <p className="mb-4">
                Nhi tin rằng nhiều người không thiếu kiến thức, chỉ thiếu một không gian để bắt đầu làm từng việc nhỏ mỗi ngày và trở thành một phiên bản tốt hơn của chính mình...
              </p>
              <p className="mb-4">
                Nhi quyết định tạo ra Thử Thách 30 Ngày để đồng hành cùng các bạn bắt đầu tạo thói quen tốt.
              </p>
              <p>
                Năm 2026, Nhi muốn gần hơn với khán giả của Nhi, cùng các bạn và các em tạo ra nhiều thứ tốt đẹp hơn cho cuộc sống!
              </p>
            </div>
          </div>
        </section>


        {/* 30 NGÀY CÓ GÌ? - What is Section */}
        <section className="bg-white pt-16 pb-8 md:pt-24 md:pb-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-primary uppercase">
                {t("thirty_day_challenge.what_is_section.heading")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
              <div className="border border-gray-200 rounded-3xl p-8 md:p-10 flex flex-col items-start h-full hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-6">
                  {t("thirty_day_challenge.what_is_section.col_1.title")}
                </h3>
                <p
                  className="text-gray-600 text-base md:text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: displayShortDesc.replace(/\n\n/g, '<br /><br />').replace(/\n/g, '<br />')
                  }}
                />
              </div>

              <div className="border border-gray-200 rounded-3xl p-8 md:p-10 flex flex-col items-start h-full hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-6">
                  {t("thirty_day_challenge.what_is_section.col_2.title")}
                </h3>
                <ul className="space-y-4 w-full">
                  {(() => {
                    const items = t("thirty_day_challenge.what_is_section.col_2.items");
                    return Array.isArray(items) ? items.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-primary font-bold text-xl leading-none">→</span>
                        <span className="text-gray-600 text-base md:text-lg leading-relaxed">{item}</span>
                      </li>
                    )) : null;
                  })()}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SAU 30 NGÀY BẠN ĐƯỢC GÌ? - Timeline Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-primary uppercase">
                {t("thirty_day_challenge.timeline.heading")}
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {/* Main Content Row - 3 expandable columns */}
              <div className="flex flex-col md:flex-row w-full gap-4 md:h-[280px]">
                {/* Dynamic highlight features or fallback blocks */}
                {[0, 1, 2].map((idx) => {
                  const feature = highlightFeatures?.[idx];
                  const blockId = (idx + 1).toString();
                  const isActive = activeBlock === blockId;

                  return (
                    <div
                      key={blockId}
                      onClick={() => setActiveBlock(blockId)}
                      className={cn(
                        "relative flex flex-col p-6 md:p-8 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out",
                        isActive
                          ? "flex-[3] bg-gray-800 text-white"
                          : "flex-[1] bg-gray-100 text-gray-700 hover:bg-gray-200 justify-center min-h-[120px] md:min-h-auto"
                      )}
                    >
                      {isActive ? (
                        <div className="flex-1">
                          {isLoading ? (
                            <div className="space-y-4">
                              <Skeleton className="h-8 w-3/4 bg-gray-700" />
                              <Skeleton className="h-12 w-full bg-gray-700" />
                              <Skeleton className="h-16 w-full bg-gray-700" />
                            </div>
                          ) : (
                            <>
                              <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
                                {feature?.title || t(`thirty_day_challenge.timeline.block_${blockId}.title`)}
                              </h3>
                              <div className="border-l-4 border-primary pl-4 my-5 italic text-gray-300 font-medium text-sm md:text-base">
                                {feature?.quote || (feature?.description?.split('\n')[0]) || t(`thirty_day_challenge.timeline.block_${blockId}.quote`)}
                              </div>
                              <div className="flex items-start gap-3 text-gray-300 text-sm md:text-base">
                                <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span>
                                  {feature?.content || feature?.description || t(`thirty_day_challenge.timeline.block_${blockId}.content`)}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          {isLoading ? (
                            <Skeleton className="h-12 w-full" />
                          ) : (
                            <p
                              className="text-base md:text-lg font-bold text-gray-700 uppercase text-center leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: (feature?.collapsed_title || feature?.title || t(`thirty_day_challenge.timeline.block_${blockId}.collapsed`)).replace(/\\n/g, '<br />')
                              }}
                            ></p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-100 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <Clock className="h-7 w-7 text-gray-500" />
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-4">
                    {t("thirty_day_challenge.timeline.time_label")}
                  </p>
                  {isLoading ? <Skeleton className="h-8 w-full mt-1" /> : (
                    <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                      {displaySchedule}
                    </p>
                  )}
                </div>

                <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl p-6 text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <Users className="h-7 w-7 text-yellow-400" />
                  <p className="text-xs text-white uppercase tracking-wider mt-4">
                    {t("thirty_day_challenge.timeline.students_label")}
                  </p>
                  {isLoading ? <Skeleton className="h-8 w-24 mt-1 bg-gray-600" /> : (
                    <p className="text-xl md:text-2xl font-bold text-white mt-1">{displayStudentCount}</p>
                  )}
                </div>

                <div className="bg-gray-100 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <MapPin className="h-7 w-7 text-gray-500" />
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-4">
                    {t("thirty_day_challenge.timeline.location_label")}
                  </p>
                  {isLoading ? <Skeleton className="h-8 w-full mt-1" /> : (
                    <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                      {displayLocation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ĐẶC QUYỀN HỌC VIÊN */}
        <section className="bg-[#F2F2F7] py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-primary uppercase">
                {t("thirty_day_challenge.benefits.heading")}
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                {t("privilege.subheading")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {privileges.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 md:p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-primary/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 inline-block p-3 bg-gray-100 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold mb-2 text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NGƯỜI DẪN ĐƯỜNG - Custom Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[68px] font-black text-center text-primary uppercase mb-8 sm:mb-10 lg:mb-12">
              {t("thirty_day_challenge.instructor_section.heading")}
            </h2>

            <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-ios-xl p-6 sm:p-8 lg:p-10 shadow-ios-card">
              <div className="grid gap-8 lg:gap-12 lg:grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)] items-start">
                {/* Content */}
                <div className="space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed">
                  {isLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-4/6" />
                    </div>
                  ) : dbMentor ? (
                    <div className="whitespace-pre-line">
                      {dbMentor.bio}
                    </div>
                  ) : (
                    <>
                      <p>
                        {t("thirty_day_challenge.instructor_section.bio_1")}
                      </p>
                      <p>
                        {t("thirty_day_challenge.instructor_section.bio_2")}
                      </p>
                      <p>
                        {t("thirty_day_challenge.instructor_section.bio_3")}
                      </p>
                    </>
                  )}
                </div>

                {/* Sidebar with image */}
                <aside className="bg-white border border-gray-200 rounded-ios-lg p-6 sm:p-8 shadow-ios-card">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                      {isLoading ? <Skeleton className="h-8 w-24 mx-auto" /> : (dbMentor?.name || "NhiLe")}
                    </h3>
                    <div className="bg-primary rounded-ios-lg aspect-square max-w-[220px] mx-auto flex items-center justify-center mb-6 overflow-hidden">
                      {isLoading ? <Skeleton className="w-full h-full" /> : (
                        <img
                          src={dbMentor?.avatar_url || "/picture/nhile_new.jpg"}
                          alt={dbMentor?.name || "NhiLe avatar"}
                          loading="lazy"
                          className="object-cover w-full h-full rounded-ios-lg shadow-sm"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      {t("thirty_day_challenge.instructor_section.profession_label")}
                    </h4>
                    {isLoading ? <Skeleton className="h-6 w-32" /> : (
                      <p className="text-base text-gray-800">{dbMentor?.role || t("thirty_day_challenge.instructor_section.profession")}</p>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* LỰA CHỌN GÓI HỌC - Pricing Section */}
        <section id="pricing" className="bg-[#F2F2F7] py-16 lg:py-20">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-primary uppercase">
                {t("thirty_day_challenge.pricing.heading")}
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                {t("thirty_day_challenge.pricing.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Monthly Plan Card */}
              <div className="bg-white rounded-2xl p-8 h-full flex flex-col shadow-lg">
                <p className="text-sm font-semibold text-gray-500">
                  {t("thirty_day_challenge.pricing.monthly.label")}
                </p>
                <p className="text-4xl font-bold text-primary my-6">
                  {formatCurrency(monthlyPrice)}
                  <span className="text-lg font-medium text-gray-500">
                    {" "}
                    {t("thirty_day_challenge.pricing.monthly.per_month")}
                  </span>
                </p>
                <ul className="space-y-3 text-sm mb-6">
                  {monthlyPlanFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={cn(!feature.included && "text-gray-400")}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex-grow" />
                <div className="w-full mt-8">
                  <Button
                    onClick={() => handleDirectCheckout("monthly")}
                    className="w-full"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {t("thirty_day_challenge.pricing.monthly.button")}
                    </span>
                  </Button>
                </div>
              </div>

              {/* Membership Plan Card */}
              <div className="bg-white rounded-2xl p-8 border-2 border-primary h-full flex flex-col relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                  {t("thirty_day_challenge.pricing.membership.badge")}
                </div>
                <p className="text-sm font-semibold text-primary mt-4">
                  {t("thirty_day_challenge.pricing.membership.label")}
                </p>
                <p className="text-4xl font-bold text-primary my-6">
                  {formatCurrency(membershipPrice)}
                  <span className="text-lg font-medium text-gray-500">
                    {" "}
                    {t("thirty_day_challenge.pricing.membership.per_year")}
                  </span>
                </p>
                <ul className="space-y-3 text-sm mb-6">
                  {membershipPlanFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex-grow" />
                <div className="w-full mt-8">
                  <Button
                    onClick={() => handleDirectCheckout("membership")}
                    className="w-full"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {t("thirty_day_challenge.pricing.membership.button")}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                    {t("thirty_day_challenge.faq.heading")}
                  </h2>
                  <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                    {t("thirty_day_challenge.faq.description")}
                  </p>
                  <Button
                    onClick={() => router.push('/contact')}
                    className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {t("thirty_day_challenge.faq.contact_button")}
                  </Button>
                </div>
              </div>

              {/* Right Column: Accordion */}
              <div className="lg:col-span-8">
                <div className="space-y-4">
                  {(() => {
                    const items = t("thirty_day_challenge.faq.items");
                    if (!Array.isArray(items)) return null;

                    const listItems = items as any[];
                    const displayedItems = showAllFaq ? listItems : listItems.slice(0, 5);

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

                <div className="mt-8 text-center lg:text-right">
                  <button
                    onClick={() => setShowAllFaq(!showAllFaq)}
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:text-primary hover:border-primary hover:shadow-md transition-all duration-300"
                  >
                    {showAllFaq ? t("thirty_day_challenge.faq.collapse") : t("thirty_day_challenge.faq.see_all")}
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-300 group-hover:text-primary",
                      showAllFaq ? "rotate-180" : ""
                    )} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ThirtyDayPage;