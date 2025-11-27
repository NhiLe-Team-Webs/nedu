import React from "react";
import YouTube from "react-youtube";
import { useCart } from "@/lib/cart-context";
import { getCourseBySlug } from "@/data/courses";
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
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (courseSlug) {
      const course = getCourseBySlug(courseSlug);
      if (course) {
        addToCart(course);
      }
    }
  };
  const isYouTubeLink = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  return (
    <section className="py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-10 max-w-[1280px] mx-auto">
      <div
        className="h-64 sm:h-80 lg:h-96 bg-cover bg-center rounded-lg mb-6 sm:mb-8 lg:mb-10"
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
          <p className="text-sm sm:text-base lg:text-lg font-semibold">Chi phí:</p>
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
          className="inline-flex items-center bg-primary hover:bg-yellow-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base lg:text-lg transition mt-4 sm:mt-[24px]"
        >
          Thêm vào giỏ hàng
          <Icons.ShoppingBagIcon className="ml-1 sm:ml-2" />
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
              className="w-auto h-full rounded-xl"
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
