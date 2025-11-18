import React from "react";
import Link from "next/link";

type CourseHeaderProps = {
  imageUrl: string;
  altText: string;
  time: string;
  tags: string[];
  title: string;
  cost: string;
  paymentLink: string;
  currency?: string;
  deposit?: string;
  dep_currency?: string;
};

const CourseHeader: React.FC<CourseHeaderProps> = ({
  imageUrl,
  altText,
  time,
  tags,
  title,
  cost,
  paymentLink,
  currency = "VND",
  deposit,
  dep_currency = "VND",
}) => {
  return (
    <section className="py-8 px-10 max-w-[1280px] mx-auto">
      <div
        className="h-80 bg-cover bg-center rounded-lg mb-10"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-label={altText}
      ></div>
      <div className="text-center">
        <p className="text-2xl font-bold uppercase text-gray-800 mb-6">
          {time}
        </p>
        <div className="flex justify-center gap-4 mb-6">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-yellow-100 text-yellow-500 px-4 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-5xl font-extrabold text-yellow-500 capitalize mb-6">
          {title}
        </h1>
        <div className="flex justify-center items-center gap-2">
          <p className="text-lg font-semibold">Chi phí:</p>
          <p className="text-4xl font-bold text-green-600">{cost}</p>
          <p className="text-lg font-semibold">{currency}</p>
        </div>
        {deposit && (
          <div className="flex justify-center items-center gap-2">
            <p className="text-lg font-semibold">Đặt cọc:</p>
            <p className="text-4xl font-bold text-green-600">{deposit}</p>
            <p className="text-lg font-semibold">{dep_currency}</p>
          </div>
        )}
        <Link
          href={paymentLink}
          className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold text-lg transition mt-[24px]"
        >
          Tìm hiểu thêm
          <i className="fas fa-chevron-right ml-2"></i>
        </Link>
      </div>
    </section>
  );
};

export default CourseHeader;
