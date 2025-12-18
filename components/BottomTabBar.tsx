"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Calendar, ShoppingCart, Menu } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import Sidebar from "./Sidebar";

const BottomTabBar = () => {
    const pathname = usePathname() || "/";
    const { getTotalItems } = useCart();
    const totalItems = getTotalItems();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname.startsWith(path)) return true;
        return false;
    };

    const tabs = [
        {
            label: "Trang chủ",
            icon: Home,
            href: "/",
        },
        {
            label: "Khóa học",
            icon: BookOpen,
            href: "/program",
        },
        {
            label: "30 Ngày",
            icon: Calendar,
            href: "/thu-thach-30-ngay",
        },
        {
            label: "Giỏ hàng",
            icon: ShoppingCart,
            href: "/cart",
            badge: totalItems > 0 ? totalItems : null,
        },
    ];

    return (
        <>
            <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-t border-gray-200 pb-[env(safe-area-inset-bottom,20px)] md:hidden ios-glass">
                <div className="flex justify-between items-center px-2 pt-2">
                    {tabs.map((tab) => {
                        const active = isActive(tab.href);
                        return (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className={`flex flex-col items-center justify-center w-full py-1 space-y-1 ios-haptic-active ${active ? "text-primary" : "text-gray-500"
                                    }`}
                            >
                                <div className="relative">
                                    <tab.icon
                                        size={24}
                                        strokeWidth={active ? 2.5 : 2}
                                        className="transition-all duration-200"
                                    />
                                    {tab.badge && (
                                        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold px-1 min-w-[16px] h-[16px] rounded-full flex items-center justify-center">
                                            {tab.badge}
                                        </span>
                                    )}
                                </div>
                                <span className="text-[10px] font-medium tracking-wide">
                                    {tab.label}
                                </span>
                            </Link>
                        );
                    })}

                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className={`flex flex-col items-center justify-center w-full py-1 space-y-1 ios-haptic-active ${isMenuOpen ? "text-primary" : "text-gray-500"
                            }`}
                    >
                        <Menu size={24} strokeWidth={2} />
                        <span className="text-[10px] font-medium tracking-wide">Menu</span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Sheet (iOS Style) */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[101] md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 animate-ios-fade-in"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Sheet */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[20px] p-6 pb-[calc(80px+env(safe-area-inset-bottom))] animate-ios-slide-up shadow-2xl">
                        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />

                        <h3 className="text-lg font-bold text-gray-900 mb-4 px-2">Menu mở rộng</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <Link
                                href="/contact"
                                className="bg-gray-50 p-4 rounded-xl flex flex-col items-center gap-3 active:scale-95 transition-transform"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <Menu size={20} />
                                </div>
                                <span className="font-medium text-sm text-gray-700">Liên hệ</span>
                            </Link>

                            <Link
                                href="https://nhi.sg"
                                target="_blank"
                                className="bg-gray-50 p-4 rounded-xl flex flex-col items-center gap-3 active:scale-95 transition-transform"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                                    <BookOpen size={20} />
                                </div>
                                <span className="font-medium text-sm text-gray-700">Về chúng tôi</span>
                            </Link>

                            <Link
                                href="/policy"
                                className="bg-gray-50 p-4 rounded-xl flex flex-col items-center gap-3 active:scale-95 transition-transform"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                                    <ShieldCheckIcon />
                                </div>
                                <span className="font-medium text-sm text-gray-700">Chính sách</span>
                            </Link>

                            <Link
                                href="/guide-payment"
                                className="bg-gray-50 p-4 rounded-xl flex flex-col items-center gap-3 active:scale-95 transition-transform"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                    <CreditCardIcon />
                                </div>
                                <span className="font-medium text-sm text-gray-700">Thanh toán</span>
                            </Link>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full py-3 bg-gray-100 text-gray-900 font-semibold rounded-xl active:scale-95 transition-transform"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const ShieldCheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
)

const CreditCardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
)

export default BottomTabBar;
