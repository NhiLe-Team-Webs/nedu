"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    try {
      const res = await fetch("/api/contact-to-sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hoVaTen: formData.name,
          soDienThoai: formData.phone,
          email: formData.email,
          noiDung: formData.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        console.error("API error:", data.error, data.details);
      }
    } catch (err) {
      setStatus("error");
      console.error("Network/API error:", err);
    }
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div className="bg-[#F2F2F7] py-8 sm:py-12 min-h-screen">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-ios-xl sm:rounded-ios-2xl bg-white shadow-ios-card md:flex">
            <div className="bg-[#F7B50C] text-white px-6 sm:px-8 py-8 sm:py-10 md:w-1/3 flex flex-col justify-center items-stretch rounded-ios-xl sm:rounded-l-ios-2xl relative">
              <img
                src="/nedu-white.svg"
                alt="N-Edu Contact"
                className="mx-auto mb-4 sm:mb-6 w-full max-w-[140px] sm:max-w-[180px] md:max-w-[220px] object-contain"
              />
              <div className="mt-4 sm:mt-6 mx-auto w-full sm:w-[320px] text-sm sm:text-base">
                <div className="border-t border-white/20 -mx-6 sm:-mx-8"></div>
                <div className="flex items-center justify-between px-6 sm:px-10 py-2 sm:py-3 cursor-default hover:bg-white/10 transition-colors">
                  <p className="text-sm sm:text-base font-semibold text-white/95 leading-tight flex items-center translate-y-2">
                    {t("contact.sidebar.contact")}
                  </p>
                  <a
                    href="tel:+84789785904"
                    className="text-sm sm:text-base font-bold text-white/95 leading-tight flex items-center hover:text-white transition-colors"
                  >
                    (+84) 789785904
                  </a>
                </div>
                <div className="border-t border-white/20 -mx-6 sm:-mx-8"></div>
                <div className="flex items-center justify-between px-6 sm:px-10 py-2 sm:py-3 cursor-default hover:bg-white/10 transition-colors">
                  <p className="text-sm sm:text-base font-semibold text-white/95 leading-tight flex items-center translate-y-2">
                    {t("contact.sidebar.email")}
                  </p>
                  <a
                    href="mailto:nedu@nhi.sg"
                    className="text-sm sm:text-base font-bold text-white/95 leading-tight flex items-center hover:text-white transition-colors"
                  >
                    nedu@nhi.sg
                  </a>
                </div>
                <div className="border-t border-white/20 -mx-6 sm:-mx-8"></div>
                <div className="flex items-center justify-between px-6 sm:px-10 py-2 sm:py-3 cursor-default hover:bg-white/10 transition-colors">
                  <p className="text-sm sm:text-base font-semibold text-white/95 leading-tight flex items-center translate-y-2">
                    {t("contact.sidebar.telegram")}
                  </p>
                  <a
                    href="https://t.me/neducationvn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base font-bold text-white/95 leading-tight flex items-center hover:text-white transition-colors"
                  >
                    @neducationvn
                  </a>
                </div>
                <div className="border-t border-white/20 -mx-6 sm:-mx-8"></div>
              </div>
            </div>

            <div className="flex-1 bg-white px-6 sm:px-8 md:px-12 py-8 sm:py-12">
              <h2 className="mb-2 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                {t("contact.title")}
              </h2>
              <p className="mb-4 sm:mb-6 text-base sm:text-lg font-medium text-gray-500">
                {t("contact.subtitle")}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="mb-1 sm:mb-1.5 block text-sm sm:text-base font-semibold text-gray-900">
                    {t("contact.form.name")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t("contact.form.placeholders.name")}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-ios-md border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 text-sm sm:text-base"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="mb-1 sm:mb-1.5 block text-sm sm:text-base font-semibold text-gray-900">
                      {t("contact.form.phone")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={t("contact.form.placeholders.phone")}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-ios-md border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="mb-1 sm:mb-1.5 block text-sm sm:text-base font-semibold text-gray-900">
                      {t("contact.form.email")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t("contact.form.placeholders.email")}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-ios-md border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 sm:mb-1.5 block text-sm sm:text-base font-semibold text-gray-900">
                    {t("contact.form.content")} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    {...({ rows: 5 } as any)}
                    placeholder={t("contact.form.placeholders.content")}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-ios-md border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 text-sm sm:text-base"
                  />
                </div>

                <div className="w-full flex justify-start">
                  <button
                    type="submit"
                    className="flex w-24 sm:w-32 items-center justify-center rounded-full bg-primary py-2 sm:py-3 text-sm sm:text-base font-bold uppercase tracking-wider text-white transition-all transform hover:brightness-105 active:scale-95 shadow-ios-sm hover:shadow-ios-md ios-haptic-active"
                  >
                    {t("contact.form.submit")}
                  </button>
                </div>

                {status === "success" && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded-ios-md text-sm sm:text-base animate-in fade-in duration-300">
                    {t("contact.form.success")}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
