'use client'

import { useLanguage } from "@/lib/LanguageContext";

export default function GuidePaymentPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F2F2F7] py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 uppercase tracking-tight">
          {t("payment_guide.title")}
        </h1>

        <p className="text-center text-gray-500 mb-12 font-medium">
          {t("payment_guide.last_updated")}
        </p>

        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {t("payment_guide.steps.step1")}
            </h2>
            <div className="relative group">
              <img
                src="/picture/register.jpg"
                alt={t("payment_guide.steps.step1")}
                className="w-full rounded-ios-xl shadow-ios-card transition-all duration-500 hover:shadow-ios-card-hover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {t("payment_guide.steps.step2")}
            </h2>
            <div className="relative group">
              <img
                src="/picture/b2.jpg"
                alt={t("payment_guide.steps.step2")}
                className="w-full rounded-ios-xl shadow-ios-card transition-all duration-500 hover:shadow-ios-card-hover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {t("payment_guide.steps.step3")}
            </h2>
            <div className="relative group">
              <img
                src="/picture/b3.jpg"
                alt={t("payment_guide.steps.step3")}
                className="w-full rounded-ios-xl shadow-ios-card transition-all duration-500 hover:shadow-ios-card-hover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {t("payment_guide.steps.step4")}
            </h2>
            <div className="relative group">
              <img
                src="/picture/b4.jpg"
                alt={t("payment_guide.steps.step4")}
                className="w-full rounded-ios-xl shadow-ios-card transition-all duration-500 hover:shadow-ios-card-hover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {t("payment_guide.steps.step5")}
            </h2>
            <div className="relative group">
              <img
                src="/picture/b5.png"
                alt={t("payment_guide.steps.step5")}
                className="w-full rounded-ios-xl shadow-ios-card transition-all duration-500 hover:shadow-ios-card-hover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
