"use client";

import React from "react";
import {
  Users,
  Repeat,
  LifeBuoy,
  GlobeIcon,
  NotepadText,
  Headphones,
} from "lucide-react";

const privileges = [
  {
    icon: <Users />,
    title: "Tham gia cộng đồng N-Edu",
    description:
      "Kết nối với những người cùng chí hướng, sẵn lòng đồng hành và hỗ trợ lẫn nhau.",
  },
  {
    icon: <Repeat />,
    title: "Học lại trọn đời",
    description:
      "Miễn phí tham gia lại các khóa học đã tốt nghiệp, luôn được cập nhật kiến thức mới nhất.",
  },
  {
    icon: <LifeBuoy />,
    title: "Hỗ trợ sau khi học",
    description:
      "Đội ngũ giảng viên và chuyên gia luôn sẵn sàng giải đáp thắc mắc và hỗ trợ bạn.",
  },
  {
    icon: <GlobeIcon />,
    title: "Hợp tác quốc tế",
    description:
      "Cơ hội kết nối và học hỏi từ các chuyên gia và đối tác trên toàn cầu.",
  },
  {
    icon: <Users />,
    title: "Cá nhân hóa lộ trình",
    description:
      "Được tư vấn và xây dựng lộ trình phát triển phù hợp với mục tiêu cá nhân của bạn.",
  },
  {
    icon: <Headphones />,
    title: "Đội ngũ hỗ trợ liên tục",
    description:
      "Nhận được sự đồng hành và hỗ trợ 24/7 từ đội ngũ chuyên nghiệp của N-Education.",
  },
];

const Privilege = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          Đặc Quyền Học Viên
        </h2>
        <p className="text-lg text-center text-gray-500 max-w-2xl mx-auto mb-12">
          Nhận được sự hỗ trợ toàn diện và những quyền lợi độc quyền khi tham
          gia hành trình cùng N-Education.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {privileges.map((privilege, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 hover:shadow-lg transition-transform transform hover:-translate-y-1 flex items-start gap-5"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                {privilege.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg text-[oklch(55.3% 0.013 58.071)]">
                  {privilege.title}
                </h3>
                <p className="text-gray-600">{privilege.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Privilege;
