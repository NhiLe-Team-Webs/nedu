import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { useCart } from "@/lib/cart-context";
import { getCourseBySlug } from "@/data/courses";
import { useLanguage } from "@/lib/LanguageContext";
import * as Icons from "lucide-react";

type CourseHeaderProps = {
  bannerUrl?: string;
  imageUrl?: string;
  altText: string;
  time: string;
  tags: string[];
  title: string;
  cost: string;
  paymentLink: string;
  currency?: string;
  deposit?: string;
  dep_currency?: string;
  description?: string; // Added the missing description property
  courseSlug?: string; // Added courseSlug for cart functionality
};

const CourseHeader: React.FC<CourseHeaderProps> = ({
  bannerUrl,
  imageUrl,
  description,
  altText,
  time,
  tags,
  title,
  cost,
  paymentLink,
  currency = "VND",
  deposit,
  dep_currency = "VND",
  courseSlug,
}) => {
  const { addToCart, items } = useCart();
  const { t } = useLanguage();
  const [justAdded, setJustAdded] = useState(false);

  // Check if this course is already in cart
  const isInCart = courseSlug && items.some(item => String(item.id) === courseSlug);

  const handleAddToCart = () => {
    if (courseSlug) {
      const course = getCourseBySlug(courseSlug);
      if (course) {
        addToCart(course);
        setJustAdded(true);

        // Reset after 3 seconds
        setTimeout(() => {
          setJustAdded(false);
        }, 3000);
      }
    }
  };
  const isYouTubeLink = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  return (
    <section className="py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-10 max-w-[1280px] mx-auto">
      <div
        className="h-64 sm:h-80 lg:h-96 bg-cover bg-center rounded-ios-xl mb-6 sm:mb-8 lg:mb-10 shadow-ios-card"
        style={{ backgroundImage: `url(${bannerUrl})` }}
        aria-label={altText}
        hidden={!bannerUrl}
      ></div>
      <div className="text-center px-2 sm:px-0">
        <p className="text-lg sm:text-xl lg:text-2xl font-bold uppercase text-gray-800 mb-4 sm:mb-6">
          {time}
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-yellow-100 text-yellow-500 px-3 sm:px-4 py-1 rounded-full font-medium text-xs sm:text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-yellow-500 capitalize mb-4 sm:mb-6">
          {title}
        </h1>
        <div className="flex justify-center items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
          <p className="text-sm sm:text-base lg:text-lg font-semibold">{t("program_detail.common.cost_label")}</p>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600">{cost}</p>
          <p className="text-sm sm:text-base lg:text-lg font-semibold">{currency}</p>
        </div>
        {deposit && (
          <div className="flex justify-center items-center gap-1 sm:gap-2 mb-4 sm:mb-6">
            <p className="text-sm sm:text-base lg:text-lg font-semibold">Đặt cọc:</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600">{deposit}</p>
            <p className="text-sm sm:text-base lg:text-lg font-semibold">{dep_currency}</p>
          </div>
        )}
        <button
          onClick={handleAddToCart}
          disabled={justAdded}
          className={`inline-flex items-center justify-center px-6 py-3 rounded-ios-btn font-semibold text-sm sm:text-base lg:text-lg mt-4 sm:mt-[24px] min-h-[44px] transition-all duration-300 ease-out ${justAdded
            ? 'bg-transparent border-2 border-green-500 text-green-500 cursor-default'
            : 'bg-primary hover:bg-yellow-600 text-white shadow-ios-sm hover:shadow-ios-md ios-haptic-active'
            }`}
        >
          {justAdded ? (
            <>
              <Icons.CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
              <span className="ml-2">{t("cart_popup.added")}</span>
            </>
          ) : (
            <>
              {t("program_detail.common.add_to_cart")}
              <Icons.ShoppingBagIcon className="ml-1 sm:ml-2 w-5 h-5" />
            </>
          )}
        </button>
      </div>
      {imageUrl && (
        <div className="relative flex flex-col w-full max-w-[900px] bg-none mt-8 sm:mt-12 lg:mt-20 mx-auto">
          {isYouTubeLink(imageUrl) ? (
            <YouTube
              videoId={new URL(imageUrl).searchParams.get("v") || ""}
              opts={{
                height: "100%",
                width: "100%",
                playerVars: { autoplay: 0 },
              }}
            />
          ) : (
            <img
              src={imageUrl}
              alt={altText}
              loading="lazy"
              className="w-auto h-full rounded-ios-lg shadow-ios-md"
            />
          )}
          <div className="absolute inset-0"></div>
          <p className="text-center text-gray-600 font-medium text-sm sm:text-base max-w-[90%] mx-auto px-4">
            {description}
          </p>
        </div>
      )}
    </section>
  );
};

export default CourseHeader;
