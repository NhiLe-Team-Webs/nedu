"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Header = () => {
  const pathname = usePathname() || "/";
  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 left-0 right-0 z-50 backdrop-blur-sm flex justify-center">
      <div className="w-full max-w-[1280px] flex justify-between gap-4 px-12 items-center h-20 bg-white/95 shadow-lg">
        {/* center column: nav centered by grid */}
        <nav className="hidden md:flex justify-between items-center gap-12 w-full font-semibold">
          <Link
            href="/"
            className={
              isActive("/")
                ? "text-amber-400 font-semibold uppercase tracking-wide"
                : "text-gray-600 hover:text-amber-400 uppercase tracking-wide"
            }
          >
            TRANG CHỦ
          </Link>

          <a href="#about" className="text-gray-600 hover:text-amber-400 uppercase tracking-wide">
            VỀ CHÚNG TÔI
          </a>

          <Link
            href="/khoa-hoc"
            className={
              isActive("/khoa-hoc")
                ? "text-amber-400 font-semibold uppercase tracking-wide"
                : "text-gray-600 hover:text-amber-400 uppercase tracking-wide"
            }
          >
            KHÓA HỌC
          </Link>

          <a href="#challenge" className="text-gray-600 hover:text-amber-400 uppercase tracking-wide">
            THỬ THÁCH 30N
          </a>

          <a href="#contact" className="text-gray-600 hover:text-amber-400 uppercase tracking-wide">
            LIÊN HỆ
          </a>
        </nav>

        {/* right column: actions aligned to the end */}
        <div className="flex items-center justify-end gap-4">
          <Button className="hidden md:inline-flex bg-amber-400 hover:bg-amber-500 text-white rounded-full px-6 py-2" size="lg">
            ĐĂNG KÝ NGAY
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
