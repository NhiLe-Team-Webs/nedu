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
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/cart-context";
import { courses } from "@/data/courses";
import { getInstructorsByIds } from "@/data/instructors";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Instructor from "@/components/Instructor";

const challengePosterDesktop = "/picture/thuthach30day_desktop.png";
const challengePosterMobile = "/picture/thuthach30day_mobile.png";

// Find the 30 day challenge course
const thirtyDayCourse = courses.find((c) => c.slug === "thu-thach-30-ngay");

// Format currency helper
const formatCurrency = (value: number | undefined) => {
  if (value === undefined || value === null) return "N/A";
  return new Intl.NumberFormat("vi-VN").format(value);
};


// Privileges data
const privileges = [
  {
    icon: <UserPlus className="h-8 w-8 text-primary" />,
    title: "Tham gia cộng đồng N-Edu",
    description:
      "Kết nối với những người cùng chí hướng, sẵn lòng đồng hành và hỗ trợ lẫn nhau.",
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "Hợp tác quốc tế",
    description:
      "Cơ hội kết nối và học hỏi từ các chuyên gia và đối tác trên toàn cầu.",
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "Cá nhân hóa lộ trình",
    description:
      "Được tư vấn và xây dựng lộ trình phát triển phù hợp với mục tiêu cá nhân của bạn.",
  },
  {
    icon: <Headphones className="h-8 w-8 text-primary" />,
    title: "Hỗ trợ liên tục",
    description:
      "Nhận được sự đồng hành và hỗ trợ 24/7 từ đội ngũ chuyên nghiệp của N-Education.",
  },
];

// Pricing plan features
const monthlyPlanFeatures = [
  {
    text: "Tham gia 01 chủ đề 30 Days trong tháng đăng ký",
    included: true,
  },
  { text: "30 hoạt động mỗi ngày (micro-habits)", included: true },
  { text: "1 buổi Zoom cùng Host (Nếu có)", included: true },
  { text: "Tham gia nhóm Telegram của tháng đó", included: true },
  { text: "Hỗ trợ trong 30 ngày", included: true },
  { text: "Không truy cập kho nội dung cũ", included: false },
  { text: "Không bao gồm bonus hoặc workshop thêm", included: false },
];

const membershipPlanFeatures = [
  { text: "Truy cập toàn bộ 12 chủ đề 30 Days trong 1 năm", included: true },
  {
    text: "Tham gia tất cả các thử thách mà không cần mua thêm",
    included: true,
  },
  { text: "Truy cập kho tài liệu & thử thách cũ", included: true },
  { text: "Mini workshop bonus dành riêng cho thành viên", included: true },
  {
    text: "Gia nhập Group Member (duy trì suốt năm, không reset mỗi tháng)",
    included: true,
  },
  { text: "Hỗ trợ xuyên suốt 12 tháng từ đội ngũ", included: true },
  { text: "Quyền bảo lưu tối đa 1–2 tháng nếu bận", included: true },
  {
    text: "Ưu đãi khi tham gia các chương trình nâng cao của Nhi Lê",
    included: true,
  },
];

const ThirtyDayPage = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const router = useRouter();

  const [activeBlock, setActiveBlock] = useState("1");
  const [addedToCart, setAddedToCart] = useState<{
    monthly: boolean;
    membership: boolean;
  }>({ monthly: false, membership: false });

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

    // Create a modified course with the appropriate price based on plan type
    const courseToAdd =
      planType === "membership"
        ? {
          ...thirtyDayCourse,
          id: thirtyDayCourse.id + 1000, // Different ID for membership
          price: { ...thirtyDayCourse.price, amount: "3.960.000" },
          title: "thirty_day_challenge.title_membership",
        }
        : thirtyDayCourse;

    addToCart(courseToAdd);
    setAddedToCart((prev) => ({ ...prev, [planType]: true }));

    // Reset after 2 seconds
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [planType]: false }));
    }, 2000);
  };

  const handleDirectCheckout = (planType: "monthly" | "membership") => {
    if (!thirtyDayCourse) return;

    const courseToAdd =
      planType === "membership"
        ? {
          ...thirtyDayCourse,
          id: thirtyDayCourse.id + 1000,
          price: { ...thirtyDayCourse.price, amount: "3.960.000" },
          title: "thirty_day_challenge.title_membership",
        }
        : thirtyDayCourse;

    addToCart(courseToAdd);
    router.push("/cart?checkout=true");
  };

  // Parse the price from the course
  const monthlyPrice = thirtyDayCourse
    ? parseInt(thirtyDayCourse.price.amount.replace(/\./g, ""))
    : 396000;
  const membershipPrice = 3960000; // 12 months membership

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-20 override-header-spacing font-sans text-gray-900">
      <main className="ios-safe-padding-bottom">
        {/* HERO SECTION - Responsive images for desktop/mobile */}
        <section className="relative w-full -mt-14 sm:-mt-16 md:-mt-32 pt-14 sm:pt-16 md:pt-32">
          {/* Desktop Image */}
          <Image
            src={challengePosterDesktop}
            alt={t("thirty_day_challenge.title")}
            width={1920}
            height={1080}
            className="hidden md:block w-full h-auto object-contain hover:transform-none"
            priority
          />
          {/* Mobile Image */}
          <Image
            src={challengePosterMobile}
            alt={t("thirty_day_challenge.title")}
            width={750}
            height={1334}
            className="block md:hidden w-full h-auto object-contain hover:transform-none"
            priority
          />
        </section>

        {/* SAU 30 NGÀY BẠN ĐƯỢC GÌ? - Timeline Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-primary uppercase">
                SAU 30 NGÀY BẠN ĐƯỢC...?
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {/* Main Content Row - 3 expandable columns */}
              <div className="flex flex-col md:flex-row w-full gap-4 md:h-[280px]">
                {/* Block 1 - Nắm rõ thu và chi */}
                <div
                  onClick={() => setActiveBlock("1")}
                  className={cn(
                    "relative flex flex-col p-6 md:p-8 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out",
                    activeBlock === "1"
                      ? "flex-[3] bg-gray-800 text-white"
                      : "flex-[1] bg-gray-100 text-gray-700 hover:bg-gray-200 justify-center min-h-[120px] md:min-h-auto"
                  )}
                >
                  {activeBlock === "1" ? (
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
                        Nắm rõ thu và chi mỗi tháng
                      </h3>
                      <div className="flex items-start gap-3 text-gray-300 text-sm md:text-base">
                        <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>
                          Bạn theo dõi được tiền vào và tiền ra một cách rõ ràng, biết chính xác tiền của mình đang được dùng cho những khoản nào, thay vì chỉ đoán mò cuối tháng và nhận ra là đã xài quá tay.
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-base md:text-lg font-bold text-gray-700 uppercase text-center leading-relaxed">
                        NẮM RÕ THU<br />VÀ CHI<br />MỖI THÁNG
                      </p>
                    </div>
                  )}
                </div>

                {/* Block 2 - Chi tiêu có ý thức */}
                <div
                  onClick={() => setActiveBlock("2")}
                  className={cn(
                    "relative flex flex-col p-6 md:p-8 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out",
                    activeBlock === "2"
                      ? "flex-[3] bg-gray-800 text-white"
                      : "flex-[1] bg-gray-100 text-gray-700 hover:bg-gray-200 justify-center min-h-[120px] md:min-h-auto"
                  )}
                >
                  {activeBlock === "2" ? (
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
                        Chi tiêu có ý thức hơn
                      </h3>
                      <div className="flex items-start gap-3 text-gray-300 text-sm md:text-base">
                        <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>
                          Chương trình không yêu cầu bạn cắt bỏ nhu cầu cá nhân hay sống kham khổ. Bạn vẫn chi tiêu bình thường, nhưng bắt đầu nhận ra đâu là khoản cần thiết, đâu là khoản chi theo cảm xúc, từ đó giảm bớt việc tiêu tiền không kiểm soát.
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-base md:text-lg font-bold text-gray-700 uppercase text-center leading-relaxed">
                        CHI TIÊU CÓ<br />Ý THỨC HƠN
                      </p>
                    </div>
                  )}
                </div>

                {/* Block 3 - Xây dựng thói quen */}
                <div
                  onClick={() => setActiveBlock("3")}
                  className={cn(
                    "relative flex flex-col p-6 md:p-8 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out",
                    activeBlock === "3"
                      ? "flex-[3] bg-gray-800 text-white"
                      : "flex-[1] bg-gray-100 text-gray-700 hover:bg-gray-200 justify-center min-h-[120px] md:min-h-auto"
                  )}
                >
                  {activeBlock === "3" ? (
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
                        Xây dựng thói quen chi tiêu lành mạnh
                      </h3>
                      <div className="flex items-start gap-3 text-gray-300 text-sm md:text-base">
                        <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>
                          Sau 30 ngày, bạn hình thành được thói quen quản lý tiền rõ ràng và thực tế, đủ để duy trì lâu dài. Tiền bạc trở nên gọn gàng hơn, áp lực tài chính giảm đi, và bạn chủ động hơn trong các quyết định chi tiêu hàng ngày.
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-base md:text-lg font-bold text-gray-700 uppercase text-center leading-relaxed">
                        XÂY DỰNG<br />THÓI QUEN<br />CHI TIÊU<br />LÀNH MẠNH
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-100 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <Clock className="h-7 w-7 text-gray-500" />
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-4">
                    THỜI GIAN DIỄN RA
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                    28/01/2026 - 28/02/2026
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl p-6 text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <Users className="h-7 w-7 text-yellow-400" />
                  <p className="text-xs text-gray-300 uppercase tracking-wider mt-4">
                    SỐ LƯỢNG HỌC VIÊN
                  </p>
                  <p className="text-xl md:text-2xl font-bold mt-1">99 người</p>
                </div>

                <div className="bg-gray-100 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <MapPin className="h-7 w-7 text-gray-500" />
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-4">
                    ĐỊA ĐIỂM
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                    Online qua Zoom
                  </p>
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
                Đặc Quyền Học Viên
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Nhận được sự hỗ trợ toàn diện và những quyền lợi độc quyền khi
                tham gia hành trình cùng N-Education.
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

        {/* NGƯỜI DẪN ĐƯỜNG - Instructor Section */}
        <Instructor instructors={getInstructorsByIds(["nhi-le"])} />

        {/* LỰA CHỌN GÓI HỌC - Pricing Section */}
        <section id="pricing" className="bg-[#F2F2F7] py-16 lg:py-20">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-primary uppercase">
                LỰA CHỌN GÓI HỌC
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                Chọn gói học phù hợp nhất với nhu cầu và mục tiêu của bạn để bắt
                đầu hành trình chuyển hóa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Monthly Plan Card */}
              <div className="bg-white rounded-2xl p-8 h-full flex flex-col shadow-lg">
                <p className="text-sm font-semibold text-gray-500">
                  Gói Theo Tháng
                </p>
                <p className="text-4xl font-bold text-primary my-6">
                  {formatCurrency(monthlyPrice)}
                  <span className="text-lg font-medium text-gray-500">
                    {" "}
                    / tháng
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
                <Button
                  className={cn(
                    "w-full mt-8 transition-all duration-500 ease-out transform",
                    addedToCart.monthly
                      ? "bg-green-500 hover:bg-green-600 scale-[1.02] shadow-lg shadow-green-500/25"
                      : "hover:scale-[1.02] active:scale-[0.98]"
                  )}
                  onClick={() => handleAddToCart("monthly")}
                >
                  <span className={cn(
                    "flex items-center justify-center gap-2 transition-all duration-300",
                    addedToCart.monthly && "animate-pulse"
                  )}>
                    {addedToCart.monthly && (
                      <Check className="h-5 w-5 animate-in zoom-in-50 duration-300" />
                    )}
                    {addedToCart.monthly ? "Đã thêm vào giỏ hàng" : "Đăng ký ngay"}
                  </span>
                </Button>
              </div>

              {/* Membership Plan Card */}
              <div className="bg-white rounded-2xl p-8 border-2 border-primary h-full flex flex-col relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                  KHUYÊN DÙNG
                </div>
                <p className="text-sm font-semibold text-primary mt-4">
                  Gói Membership
                </p>
                <p className="text-4xl font-bold text-primary my-6">
                  {formatCurrency(membershipPrice)}
                  <span className="text-lg font-medium text-gray-500">
                    {" "}
                    / 12 tháng
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
                <Button
                  className={cn(
                    "w-full mt-8 transition-all duration-500 ease-out transform",
                    addedToCart.membership
                      ? "bg-green-500 hover:bg-green-600 scale-[1.02] shadow-lg shadow-green-500/25"
                      : "hover:scale-[1.02] active:scale-[0.98]"
                  )}
                  onClick={() => handleAddToCart("membership")}
                >
                  <span className={cn(
                    "flex items-center justify-center gap-2 transition-all duration-300",
                    addedToCart.membership && "animate-pulse"
                  )}>
                    {addedToCart.membership && (
                      <Check className="h-5 w-5 animate-in zoom-in-50 duration-300" />
                    )}
                    {addedToCart.membership ? "Đã thêm vào giỏ hàng" : "Chọn Gói Membership"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ThirtyDayPage;