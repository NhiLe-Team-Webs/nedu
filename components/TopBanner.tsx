"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const TopBanner = () => {
    const [copied, setCopied] = useState(false);
    const { t } = useLanguage();

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText("EARLY BIRD");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="hidden md:block w-full bg-[#faad14] text-white shadow-sm relative z-40 animate-in slide-in-from-top-2 duration-500 font-medium">
            {/* Desktop View: Full Layout */}
            <div className="hidden md:flex container mx-auto flex-row items-center justify-center gap-4 py-2.5 px-4 text-sm font-bold tracking-wide">
                <div className="flex items-center gap-2 justify-center">
                    <Sparkles className="w-4 h-4 animate-pulse shrink-0" />
                    <span>{t("top_banner.desktop.offer")}</span>
                </div>

                <div className="flex items-center gap-2 justify-center">
                    <button
                        onClick={handleCopy}
                        className="bg-white text-[#F8B516] hover:bg-gray-50 px-2 py-0.5 rounded-md flex items-center gap-1.5 transition-all ios-haptic-active border-2 border-transparent active:scale-95"
                    >
                        <span>EARLY BIRD</span>
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <span>-</span>
                    <span>{t("top_banner.desktop.discount")}</span>
                </div>

                <Link
                    href="/program-offline/la-chinh-minh"
                    className="bg-white text-[#F8B516] hover:bg-gray-50 px-4 py-1 rounded-full flex items-center gap-1 transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95 ml-2"
                >
                    {t("top_banner.desktop.button")}
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            {/* Mobile View: Compact Marquee */}
            <div className="md:hidden w-full h-10 flex items-center overflow-hidden relative">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-8 px-4 text-xs font-bold text-white uppercase tracking-wider">
                    <span className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3" />
                        {t("top_banner.mobile.offer")}
                    </span>
                    <span className="flex items-center gap-2">
                        {t("top_banner.mobile.code_label")} <span className="bg-white text-[#F8B516] px-1.5 rounded text-[10px]">EARLY BIRD</span>
                    </span>
                    <span className="flex items-center gap-1 text-white/90">
                        {t("top_banner.mobile.slots_left")} <ArrowRight className="w-3 h-3" />
                    </span>
                    {/* Duplicate for smooth loop */}
                    <span className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3" />
                        {t("top_banner.mobile.offer")}
                    </span>
                    <span className="flex items-center gap-2">
                        {t("top_banner.mobile.code_label")} <span className="bg-white text-[#F8B516] px-1.5 rounded text-[10px]">EARLY BIRD</span>
                    </span>
                    <span className="flex items-center gap-1 text-white/90">
                        {t("top_banner.mobile.slots_left")} <ArrowRight className="w-3 h-3" />
                    </span>
                </div>

                {/* Overlay gradients for fade effect on sides */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#faad14] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-[#faad14] to-transparent z-10" />

                <Link href="/program-offline/la-chinh-minh" className="absolute inset-0 z-20" aria-label={t("top_banner.mobile.aria_label")} />
            </div>
        </div>
    );
};

export default TopBanner;
