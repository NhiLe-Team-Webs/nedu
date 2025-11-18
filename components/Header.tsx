"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const isActive = (path: string) => pathname === path;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isUserMenuMobileOpen, setIsUserMenuMobileOpen] = useState(false);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center h-16 md:h-20">
          <a href="#" className="text-xl md:text-2xl font-bold" style={{ color: "var(--dark-gray)" }}>
            <Image
              src="/250317_MsNhi_N-Edu_Logo Nedu.png"
              alt="N-Edu Logo"
              width={120}
              height={30}
              className="w-20 sm:w-32 lg:w-48 h-auto object-contain"
            />
          </a>
          <div className="hidden md:flex items-center space-x-8">
            <a href="https://nhi.sg" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[var(--cta-yellow)] transition">Về Chúng Tôi</a>
            <a href="/program" className="text-gray-600 hover:text-[var(--cta-yellow)] transition">Khóa Học</a>
            <a href="#community" className="text-gray-600 hover:text-[var(--cta-yellow)] transition">Cộng Đồng</a>
            <a href="#blog" className="text-gray-600 hover:text-[var(--cta-yellow)] transition">Góc Tri Thức</a>
            <a href="#faq" className="text-gray-600 hover:text-[var(--cta-yellow)] transition">FAQ</a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/cart" aria-label="Giỏ hàng" className="relative p-2 rounded-full hover:bg-gray-100">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </a>
            <div className="relative hidden md:block">
              <button
                id="user-menu-button"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                T
              </button>
              {isUserMenuOpen && (
                <div id="user-menu" className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2">
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Khóa học của tôi</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Hồ sơ</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Mua hàng của tôi</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Cài đặt</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Cập nhật</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Thành tích</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Trung tâm Trợ giúp</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Đăng xuất</a>
                </div>
              )}
            </div>
            <button
              id="mobile-menu-button"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden px-4 pb-4 space-y-2">
          <a href="/" className="block text-gray-600 hover:text-[var(--cta-yellow)] transition py-2">TRANG CHỦ</a>
          <a href="https://nhi.sg" target="_blank" rel="noopener noreferrer" className="block text-gray-600 hover:text-[var(--cta-yellow)] transition py-2">VỀ CHÚNG TÔI</a>
          <a href="/program" className="block text-gray-600 hover:text-[var(--cta-yellow)] transition py-2">KHÓA HỌC</a>
          <a href="/thu-thach-30-ngay" className="block text-gray-600 hover:text-[var(--cta-yellow)] transition py-2">THỬ THÁCH 30N</a>
          <a href="/contact" className="block text-gray-600 hover:text-[var(--cta-yellow)] transition py-2">LIÊN HỆ</a>
        </div>
      )}
    </header>
  );
};

export default Header;
