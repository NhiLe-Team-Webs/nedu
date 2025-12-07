"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";

const TopBanner = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("EARLY BIRD");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#F8B516] text-white py-2.5 px-4 text-center relative z-[60] shadow-md">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-2 text-[13px] sm:text-sm font-medium leading-tight">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                    <span className="uppercase font-bold tracking-wide">Deal Là Chính Mình #04:</span>
                </div>

                <div className="flex flex-wrap justify-center gap-x-1 items-center">
                    <span>Nhập mã</span>
                    <button
                        onClick={handleCopy}
                        className="bg-white text-[#F8B516] px-2 py-0.5 rounded font-extrabold border border-white/50 shadow-sm flex items-center gap-1.5 hover:bg-gray-50 transition-all cursor-pointer active:scale-95 group"
                        title="Sao chép mã"
                    >
                        EARLY BIRD
                        {copied ? (
                            <Check className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                            <Copy className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                        )}
                    </button>
                    <span>giảm còn</span>
                    <span className="font-bold text-white">49.960.000đ</span>
                    <span className="opacity-90 text-xs flex items-center">(08/12/2025 – 08/01/2026)</span>
                </div>

                <Link
                    href="/program-offline/la-chinh-minh"
                    className="inline-flex items-center gap-1 bg-white text-[#F8B516] hover:bg-gray-50 px-3 py-0.5 rounded-full transition-all duration-200 ml-0 md:ml-2 group whitespace-nowrap font-bold shadow-sm"
                >
                    <span>Đăng ký ngay</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default TopBanner;
