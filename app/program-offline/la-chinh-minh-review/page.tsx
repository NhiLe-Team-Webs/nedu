'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HelpCircle, ChevronDown, BedDouble, Utensils, Info, CheckCircle, ShoppingBagIcon } from "lucide-react";
import CourseHeader from "@/components/CourseHeader";
import CourseInfo from "@/components/CourseInfo";
import Organizers from "@/components/Organizers";
import OfferPopup from "@/components/OfferPopup";
import GiftButton from "@/components/GiftButton";
import { getCourseBySlug } from "@/data/courses";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

export default function LaChinhMinhReviewPage() {
    const course = getCourseBySlug('la-chinh-minh-review');
    const { t } = useLanguage();
    const router = useRouter();
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
    const { addToCart, setShowSuccessPopup } = useCart();
    const [justAdded, setJustAdded] = useState(false);

    const handleAddToCart = () => {
        if (course) {
            addToCart(course);
            setShowSuccessPopup(true);
            setJustAdded(true);
            setTimeout(() => {
                setJustAdded(false);
            }, 3000);
        }
    };


    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    // Danh sách các mục được bao gồm trong chi phí
    const includedItems = [
        {
            id: 1,
            icon: <BedDouble className="w-6 h-6" />,
            title: "Khách sạn lưu trú",
            description: "Phòng tiêu chuẩn 4 sao (2 người/phòng) trong suốt 3 ngày 2 đêm diễn ra khóa học. Đã bao gồm các tiện ích gym, hồ bơi."
        },
        {
            id: 2,
            icon: <Utensils className="w-6 h-6" />,
            title: "Ăn uống trọn gói",
            description: "Bao gồm Buffet sáng, ăn trưa/tối set menu tại nhà hàng và 2 bữa Teabreak (trà, bánh, trái cây) mỗi ngày học."
        }
    ];




    return (
        <div className="min-h-screen bg-white pb-20 override-header-spacing">
            <CourseHeader
                imageUrl="/course/lachinhminh_desktop.svg"
                altText={t("program_detail.courses.la_chinh_minh.title")}
                time={t("program_detail.common.offline_course")}
                tags={[t("categories.personal_development"), t("categories.be_yourself")]}
                title={
                    <>
                        {t("program_detail.courses.la_chinh_minh.title")}
                        <br />
                        <span className="text-2xl sm:text-3xl lg:text-4xl mt-0 block font-extrabold text-yellow-500">(Review)</span>
                    </>
                }
                cost={course?.price.amount || "68.690.000"}
                paymentLink="/payment/57"
                courseSlug="la-chinh-minh-review"
            />

            <div className="ios-safe-padding-bottom">
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
                <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
                    <div className="max-w-5xl mx-auto">

                        {/* Lời chào & Tiêu đề theo phong cách mới */}
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-500 uppercase mb-4 tracking-tight">
                                Chi Phí Bao Gồm
                            </h2>
                            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                                Đội ngũ N-Education đã chuẩn bị sẵn sàng mọi tiện nghi tốt nhất. Việc duy nhất của bạn là dành trọn 100% tâm trí và năng lượng để bứt phá giới hạn, nâng tầm bản thân trong khóa học lần này!
                            </p>
                        </div>

                        {/* Khung nội dung dạng Grid (Lưới) giống mẫu */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

                            {includedItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white border border-yellow-400 rounded-xl p-6 md:p-8 flex items-start gap-5 hover:shadow-lg transition-shadow duration-300"
                                >
                                    {/* Vòng tròn viền vàng bọc Icon */}
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full border border-yellow-400 flex items-center justify-center text-yellow-500 bg-yellow-50/30">
                                        {item.icon}
                                    </div>

                                    {/* Nội dung text */}
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-2">
                                            {item.title}
                                        </h4>
                                        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}

                        </div>

                        {/* Ghi chú nhỏ bên dưới (Căn giữa để hợp bố cục mới) */}
                        <div className="mt-12 flex items-center justify-center text-sm text-slate-500 w-fit mx-auto bg-slate-50 p-4 rounded-xl border border-slate-100 mb-10">
                            <div className="flex items-center gap-2">
                                <Info className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                <p className="leading-none translate-y-[8px]">
                                    <strong>Lưu ý:</strong> Chi phí trên chưa bao gồm vé máy bay / phương tiện di chuyển cá nhân đến địa điểm tổ chức.
                                </p>
                            </div>
                        </div>

                        {/* Nút Thêm vào giỏ hàng */}
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={handleAddToCart}
                                disabled={justAdded}
                                className={`inline-flex items-center justify-center px-8 py-4 rounded-ios-btn font-extrabold text-lg transition-all duration-300 ease-out shadow-ios-md hover:shadow-ios-lg ${justAdded
                                    ? 'bg-transparent border-2 border-green-500 text-green-500 cursor-default'
                                    : 'bg-yellow-500 hover:bg-yellow-600 text-white ios-haptic-active'
                                    }`}
                            >
                                {justAdded ? (
                                    <>
                                        <CheckCircle className="w-6 h-6 mr-2" strokeWidth={2.5} />
                                        <span>{t("cart_popup.added")}</span>
                                    </>
                                ) : (
                                    <>
                                        {t("program_detail.common.add_to_cart")}
                                        <ShoppingBagIcon className="ml-2 w-6 h-6" />
                                    </>
                                )}
                            </button>
                        </div>

                    </div>
                </section>
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

            {/* Gift Floating Button */}
            <GiftButton
                isVisible={!isOfferPopupOpen}
                onClick={() => setIsOfferPopupOpen(true)}
            />

            {/* Auto Triggering Offer Popup Mockup */}
            <OfferPopup
                isOpen={isOfferPopupOpen}
                onClose={() => setIsOfferPopupOpen(false)}
                onAccept={() => {
                    // Additional logic when user clicks "Nhận Ưu Đãi Ngay"
                    // They might want to scroll to payment section or open cart
                    const paymentSection = document.getElementById('payment-section');
                    if (paymentSection) {
                        paymentSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        // Fallback
                        router.push('/checkout');
                    }
                }}
            />
        </div>
    );
}
