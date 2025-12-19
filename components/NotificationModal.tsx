"use client";

import { X, Sparkles, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const NotificationModal = ({ isOpen, onClose }: NotificationModalProps) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [copied, setCopied] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText("EARLY BIRD");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    if (!isOpen && !isAnimating) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-md z-[100] transition-opacity duration-300 ${isAnimating && isOpen ? "opacity-100" : "opacity-0"
                    }`}
                onClick={handleClose}
            />

            {/* Full Notification */}
            <div
                className={`fixed top-4 left-4 right-4 z-[101] transition-all duration-300 ease-out ${isAnimating && isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                    }`}
            >
                <div className="bg-white/90 backdrop-blur-xl rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden border border-white/20">
                    {/* Header */}
                    <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-200/50">
                        {/* App Icon */}
                        <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#F8B516] to-[#faad14] flex items-center justify-center shrink-0 shadow-sm">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>

                        {/* Title */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2">
                                <h3 className="font-semibold text-[15px] text-gray-900 leading-tight">{t("notification_modal.title")}</h3>
                                <span className="text-[13px] text-gray-500 shrink-0">{t("notification_modal.now")}</span>
                            </div>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="w-6 h-6 rounded-full bg-gray-200/80 hover:bg-gray-300/80 active:bg-gray-400/80 flex items-center justify-center transition-colors shrink-0"
                            aria-label={t("notification_modal.close")}
                        >
                            <X className="w-3.5 h-3.5 text-gray-600" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="px-4 py-4 space-y-3">
                        {/* Description */}
                        <p className="text-[15px] text-gray-600 leading-snug">
                            {t("notification_modal.discount_prefix")} <span className="font-semibold text-gray-900">10.000.000Đ</span> {t("notification_modal.discount_suffix")}
                        </p>

                        {/* Code Display */}
                        <div className="bg-gray-100/80 backdrop-blur-sm rounded-[12px] px-3 py-2.5">
                            <p className="text-[11px] text-gray-500 font-medium mb-1.5 uppercase tracking-wide">{t("notification_modal.code_label")}</p>
                            <div className="flex items-center justify-between gap-2">
                                <p className="text-[15px] font-mono font-semibold text-gray-900 tracking-wide">EARLY BIRD</p>
                                <button
                                    onClick={handleCopy}
                                    className="text-[13px] font-semibold text-[#F8B516] active:opacity-60 transition-opacity px-2 py-1"
                                >
                                    {copied ? (
                                        <span className="flex items-center gap-1">
                                            <Check className="w-3.5 h-3.5" />
                                            {t("notification_modal.copied")}
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1">
                                            <Copy className="w-3.5 h-3.5" />
                                            {t("notification_modal.copy")}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <Link
                            href="/program-offline/la-chinh-minh"
                            onClick={handleClose}
                            className="block w-full"
                        >
                            <div className="bg-[#1C1C1E] hover:bg-[#2C2C2E] active:bg-[#3C3C3E] text-white text-center py-3 rounded-[12px] font-semibold text-[15px] transition-colors">
                                {t("notification_modal.button")}
                            </div>
                        </Link>

                        {/* Fine Print */}
                        <p className="text-[12px] text-gray-500 leading-relaxed text-center">
                            {t("notification_modal.footer")}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationModal;
