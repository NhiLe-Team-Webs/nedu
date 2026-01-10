"use client";

import { useLanguage } from "@/lib/LanguageContext";

interface LanguageToggleProps {
    variant?: "desktop" | "mobile";
}

const LanguageToggle = ({ variant = "desktop" }: LanguageToggleProps) => {
    const { language, setLanguage } = useLanguage();

    if (variant === "mobile") {
        return (
            <div className="flex bg-gray-100 p-1 rounded-lg w-full">
                <button
                    onClick={() => setLanguage("vi")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all duration-200 ${language === "vi"
                        ? "bg-white text-primary shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <span className="font-bold">VN</span>
                    <span>Tiếng Việt</span>
                </button>
                <button
                    onClick={() => setLanguage("en")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all duration-200 ${language === "en"
                        ? "bg-white text-primary shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <span className="font-bold">EN</span>
                    <span>English</span>
                </button>
            </div>
        );
    }

    // Desktop variant
    return (
        <div className="flex items-center gap-1 bg-gray-50 rounded-full p-1 border border-gray-200">
            <button
                onClick={() => setLanguage("vi")}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${language === "vi"
                    ? "bg-white text-primary shadow-sm scale-110"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    }`}
                aria-label="Tiếng Việt"
            >
                <span className="text-[10px] font-bold">VN</span>
            </button>
            <button
                onClick={() => setLanguage("en")}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${language === "en"
                    ? "bg-white text-primary shadow-sm scale-110"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    }`}
                aria-label="English"
            >
                <span className="text-[10px] font-bold">EN</span>
            </button>
        </div>
    );
};

export default LanguageToggle;
