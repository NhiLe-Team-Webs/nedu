"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const Supports = () => {
  const { t } = useLanguage();

  return (
    <section className="flex justify-center py-20 bg-white">
      <form
        className="w-full max-w-3xl bg-amber-400 rounded-ios-xl p-6 sm:p-10 text-white relative shadow-ios-lg transition-all duration-300 hover:shadow-ios-xl transform hover:scale-[1.01]"
        aria-label="Support form"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="md:flex-1 md:pr-4">
            <p className="text-sm font-semibold text-white/90 transition-all duration-200">{t("support.heading")}</p>
            <p className="text-xl md:text-xl font-bold uppercase mt-1 text-white transition-all duration-200 tracking-tight">{t("support.subheading")}</p>
          </div>

          <div className="md:flex-1 relative w-full">
            <input
              type="email"
              name="email"
              placeholder={t("support.placeholder")}
              className="w-full bg-white/10 border border-white/30 rounded-full text-white px-6 py-3 h-[50px] placeholder-white/70 transition-all duration-200 focus:bg-white/20 focus:border-white focus:outline-none ios-haptic-active pr-[50px]"
              required
            />

            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-[42px] w-[42px] flex items-center justify-center bg-white text-amber-500 rounded-full shadow-md transition-all duration-200 hover:bg-gray-50 active:scale-95 shrink-0"
              aria-label="Send"
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Supports;