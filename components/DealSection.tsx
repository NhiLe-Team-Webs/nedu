import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { courses } from '@/data/courses';

interface DealSectionProps {
    onRegister?: () => void;
}

export const DealSection: React.FC<DealSectionProps> = ({ onRegister }) => {
    const router = useRouter();
    const { buyNow } = useCart();

    // Tet themed text
    const text = "🧧 Mã đáo deal ngon, nhận lộc vẹn tròn khi Đăng Ký lớp Là Chính Mình 04 💰";

    const handleClick = () => {
        if (onRegister) {
            onRegister();
        } else {
            const lcmCourse = courses.find(c => c.slug === 'la-chinh-minh');
            if (lcmCourse) {
                buyNow(lcmCourse);
                router.push('/checkout');
            } else {
                router.push('/program-offline/la-chinh-minh');
            }
        }
    };

    return (
        <div className="w-full h-12 bg-[#990000] flex items-center relative overflow-hidden shadow-md z-40 border-b border-[#cc0000]">
            {/* Marquee Container */}
            <div className="flex items-center w-full overflow-hidden absolute inset-0">
                <div className="flex animate-marquee whitespace-nowrap">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center mx-8">
                            <span className="text-yellow-400 mr-3 animate-pulse">
                                <Sparkles size={16} />
                            </span>
                            <span className="text-[#FFD700] font-bold text-sm sm:text-base uppercase tracking-wide font-sans">
                                {text}
                            </span>
                            <span className="text-yellow-400 ml-3 animate-pulse">
                                <Sparkles size={16} />
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fixed Button on Right */}
            <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center bg-[#990000] pl-8 pr-2 sm:pr-4 shadow-[-20px_0_30px_#990000]">
                <button
                    onClick={handleClick}
                    className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 hover:brightness-110 text-red-900 text-[10px] sm:text-xs font-black py-1.5 px-3 sm:px-5 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.4)] flex items-center gap-1.5 transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap uppercase border border-yellow-200/50"
                >
                    Nhận Lì Xì Ngay
                    <ArrowRight size={14} strokeWidth={3} className="animate-bounce-x" />
                </button>
            </div>
        </div>
    );
};

export default DealSection;
