'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BedDouble, Utensils, Info, CheckCircle, ShoppingBagIcon, Gift } from "lucide-react";
import CourseHeader from "@/components/CourseHeader";
import CourseInfo from "@/components/CourseInfo";
import Organizers from "@/components/Organizers";
import OfferPopup from "@/components/OfferPopup";
import GiftButton from "@/components/GiftButton";
import ReferralModal from "@/components/ReferralModal";
import { getCourseBySlug } from "@/data/courses";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

export default function LaChinhMinhReviewPage() {
    const course = getCourseBySlug('la-chinh-minh-review');
    const { t } = useLanguage();
    const router = useRouter();
    const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
    const { addToCart, setShowSuccessPopup } = useCart();
    const [justAdded, setJustAdded] = useState(false);
    const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);

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




    // Danh sách các mục được bao gồm trong chi phí
    const includedItems = [
        {
            id: 1,
            icon: <BedDouble className="w-6 h-6" />,
            title: "Khách sạn lưu trú",
            description: "Phòng khách sạn lưu trú cùng không gian học tập (để tiện di chuyển và tham gia các hoạt động trong lớp ) trong vòng 4 ngày 3 đêm."
        },
        {
            id: 2,
            icon: <Utensils className="w-6 h-6" />,
            title: "Ăn uống trọn gói",
            description: "Bao gồm Buffet sáng, ăn trưa/tối tại nhà hàng và Teabreak (trà, bánh, trái cây) mỗi ngày học."
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
                secondaryAction={
                    <button
                        onClick={() => setIsReferralModalOpen(true)}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-ios-btn font-bold text-sm sm:text-base lg:text-lg border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-50 transition-all duration-300 shadow-ios-sm"
                    >
                        <Gift className="mr-2 w-5 h-5" />
                        Mã Giới Thiệu
                    </button>
                }
            />

            <div className="ios-safe-padding-bottom">
                <CourseInfo
                    title={t("program_detail.info.title")}
                    details={[
                        {
                            icon: "Star",
                            label: t("program_detail.info.topic"),
                            value: (
                                <>
                                    Phát triển bản thân và<br /> khám phá nội tâm
                                </>
                            ),
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
            <ReferralModal 
                isOpen={isReferralModalOpen}
                onClose={() => setIsReferralModalOpen(false)}
            />
        </div>
    );
}
