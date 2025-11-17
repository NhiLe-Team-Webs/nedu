import {
  Laptop,
  Users,
  Award,
  HeadphonesIcon,
  Calendar,
  TrendingUp,
  RotateCcw,
  UserPlus,
  Pencil,
  User,
  Phone,
} from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Tham gia cộng đồng N-Edu",
    description:
      "Chúng tôi có sẵn một cộng đồng tích cực và đầy tiềm năng, nơi có những người cùng chí hướng sẵn lòng đồng hành và hỗ trợ lẫn nhau trong sự nghiệp và cuộc sống.",
  },
  {
    icon: RotateCcw,
    title: "Học lại trọn đời",
    description:
      "Sau khi học viên tốt nghiệp, bạn được quyền quay lại học khi có lớp và hoàn toàn miễn phí. Các chương trình của N-Edu luôn được cập nhật và nâng cấp theo những chuyển biến của thế giới.",
    notation: "*Đọc thêm trong phần Điều khoản sử dụng ở Mục 7.6 để hiểu rõ.",
  },
  {
    icon: UserPlus,
    title: "Hỗ trợ sau khi học",
    description:
      "Sau khi hoàn thành khóa học, học viên vẫn được hỗ trợ bởi đội ngũ giảng và chuyên gia để giải đáp thắc mắc hoặc giúp giải quyết các vấn đề thực tế.",
  },
  {
    icon: Pencil,
    title: "hợp tác quốc tế",
    description:
      "Mỗi năm chúng tôi có nhiều sự kiện và chương trình học trực tiếp, mở ra cơ hội gặp gỡ chuyên gia và học viên quốc tế.",
  },
  {
    icon: User,
    title: "Cá nhân hóa lộ trình",
    description:
      "Lựa chọn khóa học phù hợp với nhu cầu cá nhân đưa bạn nhanh đến điều bạn ước muốn.",
  },
  {
    icon: Phone,
    title: "đội ngũ hỗ trợ liên tục",
    description:
      "Đội ngũ hỗ trợ của N-Edu luôn sẵn sàng giải đáp thắc mắc của bạn và đảm bảo những quyền lợi của bạn.",
  },
];

const Benefits = () => {
  return (
    <section className="flex justify-center">
      <div className="relative overflow-hidden max-w-[1280px]">
        <div className="absolute inset-0 inset-y-auto z-0 h-full">
          <img
            src='/privillage.jpg'
            alt="Modern classroom with students learning in bright environment"
            className="w-full h-full object-fit brightness-[0.9]"
          />
        </div>

        <div className="container mx-auto px-[32px] py-[100px] z-10 relative box-border overflow-hidden">
          <p className="pointer-events-none absolute inset-x-0 top-0 text-center text-[110px] font-semibold text-[#ffffff33] h-auto uppercase select-none">
            PRIVILEGE
          </p>
          <h2 className="relative z-10 text-5xl md:text-[68px] font-extrabold text-center mb-16 text-background">
            ĐẶC QUYỀN
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 bg-background/10 backdrop-blur-md p-[16px] rounded-2xl border border-background/20 hover:bg-background/20 transition-all"
              >
                <div className="flex items-center gap-4">
                  <benefit.icon className="text-primary w-7 h-7" />
                  <h3 className="text-[16px] uppercase font-bold text-background">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-background/80">{benefit.description}</p>
                <p className="text-[12px] text-background/80">
                  <strong>
                    <em>{benefit.notation}</em>
                  </strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
