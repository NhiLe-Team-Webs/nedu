"use client";

import Link from "next/link";
import YouTube from "react-youtube";
import CourseHeader from "@/components/CourseHeader";
import Instructor from "@/components/Instructor";
import Whom from "@/components/Whom";
import Testimonials from "@/app/Testimonials";
import CourseInfo from "@/components/CourseInfo";
import Organizers from "@/components/Organizers";

export default function CuocSongCuaBanPage() {
  const { addToCart } = useCart();
  const youtubeOpts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const instructors = [
    {
      name: "NhiLe",
      profession: ["Doanh nhân"],
      bio: "Nhi Lê là một doanh nhân, nhà giáo dục và nhà sáng tạo nội dung người Việt Nam. Cô được biết đến là người đầu tiên đưa chủ đề tâm lý học bằng tiếng Việt lên nền tảng YouTube và là người sáng lập nhiều dự án văn hóa - giáo dục có ảnh hưởng tại Việt Nam. Hiện cô đang sinh sống và làm việc tại Singapore.",
      image: "https://nedu.nhi.sg/images/nhile_1.jpg",
      education:
        'Nhi Lê tốt nghiệp chuyên ngành Tâm lý học (Diploma in Psychology) tại Kaplan Singapore. Ngoài ra, cô còn sở hữu nhiều chứng chỉ chuyên sâu khác như "Lãnh đạo Kiên cường & Kinh doanh Bền vững" (Resilient Leadership & Business Sustainability) và Chứng chỉ Điều hành về Khoa học Hành vi Ứng dụng (Executive Certificate in Applied Behavioural Science) tại Đại học Quản lý Singapore (SMU).',
      career:
        "Nhi Lê hoạt động trong nhiều lĩnh vực, từ kinh doanh, giáo dục đến sáng tạo nội dung. Cô là người có tầm ảnh hưởng trong việc chia sẻ kiến thức về tâm lý học và kỹ năng sống cho thế hệ trẻ.",
      achievements: [
        {
          date: "2025-04",
          description: "Vinh danh với giải thưởng HER Courage Awards 2025.",
        },
        {
          date: "2025-08",
          description:
            "Người phụ nữ Việt Nam đầu tiên xuất hiện trên blog chính thức của YouTube toàn cầu.",
        },
      ],
      projects: [
        {
          title: "Kênh YouTube Nhi Le",
          description:
            "Kênh tiên phong chia sẻ kiến thức tâm lý học bằng tiếng Việt.",
        },
        {
          title: "Cộng đồng NhiLe Team",
          description: "Đào tạo nghề và kỹ năng cần thiết cho giới trẻ.",
        },
        {
          title: "Quỹ NhiLe Foundation",
          description: "Tổ chức phi lợi nhuận hỗ trợ trẻ em Việt Nam.",
        },
        {
          title: "Podcast Ms Nhi và This is Home",
          description: "Kết nối thế hệ trẻ với doanh nhân, nghệ nhân Việt Nam.",
        },
      ],
    },
  ];
  const whomItems = [
    {
      icon: "Sprout",
      heading: "Sinh viên & người mới đi làm",
      description:
        "Trang bị nền tảng thực tế để hiểu rõ AI dùng trong công việc viết – trình bày – giao tiếp, mở ra cơ hội phát triển sớm trong môi trường chuyên nghiệp.",
    },
    {
      icon: "Recycle",
      heading: "Người muốn chuyển ngành",
      description:
        "Khóa học phù hợp cho những ai muốn khám phá tiềm năng AI để ứng dụng trong công việc mới như marketing, truyền thông, quản lý, nhân sự...",
    },
    {
      icon: "Split",
      heading: "Người mới bắt đầu học AI",
      description:
        "Không cần nền tảng kỹ thuật – chỉ cần bạn tò mò, ham học hỏi và muốn dùng AI một cách thực tế để nâng cấp kỹ năng và tăng năng suất cá nhân.",
    },
  ];
  const testimonials = {
    videos: [
      "https://www.youtube.com/embed/PFWDwSf5EGc",
      "https://www.youtube.com/embed/RAaXaJxFXpE",
      "https://www.youtube.com/embed/8qq6WDQFFQk",
    ],
    captions: [
      "Tâm cơ cực kỳ hào hứng để có thể chia sẻ với tất cả các bạn những cái trải nghiệm vừa rồi về 5 bài test thông dụng để xác định một người nào đó có những cái đặc tính nào nổi trội",
      "Nhưng mà trước khi mà các bạn muốn yêu một ai đó một cách đúng ấy thì các bạn phải yêu bản thân mình một cách đúng trước đã",
      "Một cái khá là hay trong cái khóa học lần này là Nhi Lê cho các bạn những cái bài test những cái câu hỏi những cái công cụ để các bạn có thể xác định được cái chỉ số của mình",
    ],
    title: "Testimonials",
    subtitle: "Lời chứng thực",
    buttonText: "Đăng ký ngay",
    buttonLink: "/testimonials",
  };

  return (
    <div className="min-h-screen bg-white">
      <CourseHeader
        imageUrl_bot="https://nedu.nhi.sg/images/thuonghieucuaban-bot.png"
        altText="Thương hiệu của bạn"
        time="KHÓA HỌC ONLINE"
        tags={["Thương hiệu"]}
        title="Thương hiệu của bạn"
        cost="18.960.000"
        paymentLink="/payment/53"
        description="Kiến thức cơ bản nhất cho người muốn bắt đầu mở doanh nghiệp hay cải tổ doanh nghiệp gia đình. Định hình rõ hơn kinh doanh của bạn trong chỉ 4 ngày với khóa học Thương Hiệu Của Bạn - một chương trình được thiết kế đặc biệt cho chủ doanh nghiệp trong kỷ nguyên AI."
      />
      <Instructor instructors={instructors} />
      <Whom title="Ai nên tham gia khóa học này?" items={whomItems} />
      <Testimonials testimonials={testimonials} />
      <CourseInfo
        title="THÔNG TIN KHÓA HỌC"
        buttonText="ĐĂNG KÝ NGAY"
        buttonLink="/payment/57"
        details={[
          {
            icon: "Star",
            label: "Chủ đề:",
            value: "Phát triển bản thân và khám phá nội tâm",
          },
          { icon: "Clock", label: "Thời gian học:", value: "10-13/09/2025" },
          {
            icon: "MapPin",
            label: "Người dẫn đường:",
            value: "NhiLe x Guest Instructors",
          },
          { icon: "Calendar", label: "Số buổi học:", value: "3,5 ngày" },
          {
            icon: "House",
            label: "Địa điểm học:",
            value: "Offline tại địa điểm sẽ thông báo",
          },
          { icon: "Users", label: "Số lượng học viên:", value: "Giới hạn" },
        ]}
      />
      <Organizers />
    </div>
  );
}
