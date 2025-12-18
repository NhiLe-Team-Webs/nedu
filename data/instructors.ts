export interface InstructorProps {
  id: string;
  name: string;
  profession: string[];
  bio: string;
  education: string | string[];
  career: string;
  achievements: { date: string; description: string }[];
  projects: { title: string; description: string }[];
  image: string;
}

export const instructors: InstructorProps[] = [
  {
    id: "nhi-le",
    name: "NhiLe",
    profession: ["Doanh nhân"],
    bio: "Nhi Lê là một doanh nhân, nhà giáo dục và nhà sáng tạo nội dung người Việt Nam. Cô được biết đến là người đầu tiên đưa chủ đề tâm lý học bằng tiếng Việt lên nền tảng YouTube và là người sáng lập nhiều dự án văn hóa - giáo dục có ảnh hưởng tại Việt Nam. Hiện cô đang sinh sống và làm việc tại Singapore.",
    education: 'Nhi Lê tốt nghiệp chuyên ngành Tâm lý học (Diploma in Psychology) tại Kaplan Singapore. Ngoài ra, cô còn sở hữu nhiều chứng chỉ chuyên sâu khác như "Lãnh đạo Kiên cường & Kinh doanh Bền vững" (Resilient Leadership & Business Sustainability) và Chứng chỉ Điều hành về Khoa học Hành vi Ứng dụng (Executive Certificate in Applied Behavioural Science) tại Đại học Quản lý Singapore (SMU).',
    career: "Nhi Lê hoạt động trong nhiều lĩnh vực, từ kinh doanh, giáo dục đến sáng tạo nội dung. Cô là người có tầm ảnh hưởng trong việc chia sẻ kiến thức về tâm lý học và kỹ năng sống cho thế hệ trẻ.",
    achievements: [
      {
        date: "2025-04",
        description: "Vinh danh với giải thưởng HER Courage Awards 2025.",
      },
      {
        date: "2025-08",
        description: "Người phụ nữ Việt Nam đầu tiên xuất hiện trên blog chính thức của YouTube toàn cầu.",
      },
    ],
    projects: [
      {
        title: "Kênh YouTube Nhi Le",
        description: "Kênh tiên phong chia sẻ kiến thức tâm lý học bằng tiếng Việt.",
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
    image: "/picture/nhile.jpg",
  },
  {
    id: "mel",
    name: "Mel",
    profession: ["Chuyên gia Marketing"],
    bio: "Melvin Soh, chuyên gia marketing hàng đầu châu Á, nổi tiếng với hơn 15 năm kinh nghiệm thực chiến trong xây dựng thương hiệu và thu hút khách hàng. Anh đã giúp hàng trăm doanh nghiệp tạo dựng lòng trung thành và tăng trưởng bền vững.",
    image: "/picture/mel.jpg",
    achievements: [],
    projects: [],
    education: "MBA in Marketing",
    career: "CEO of Marketing Solutions Asia",
  },
  {
    id: "linda-hui-isaac",
    name: "Linda Hui-Isaac",
    profession: ["Doanh nhân"],
    bio: "Linda Hui-Isaac là một Chiến lược gia Lãnh đạo về Xây dựng Thương hiệu & AI-Marketing (Branding & AI-Marketing Consultant Lead Trainer). Bà có hơn hai thập kỷ kinh nghiệm toàn cầu, chuyên tư vấn và đào tạo về các chiến lược tiếp thị kỹ thuật số hiệu quả.",
    image: "/picture/linda.jpg",
    education: [
      "- Thạc sĩ Quản trị Kinh doanh Toàn cầu (MBA in Global Business) tại Coventry University (Anh).",
      "- Chứng chỉ Nâng cao về Học tập & Hiệu suất (Advanced Certificate in Learning & Performance) tại Institute of Adult Learning (IAL).",
    ],
    career:
      "Linda Hui-Isaac có hơn 20 năm kinh nghiệm trong lĩnh vực xây dựng thương hiệu và AI-Marketing, đã tư vấn cho nhiều công ty niêm yết trên SGX và các MNC thương hiệu xa xỉ Châu Âu.",
    achievements: [
      {
        date: "2025",
        description:
          "Hơn 20 năm kinh nghiệm trong lĩnh vực Xây dựng Thương hiệu và AI-Marketing.",
      },
      {
        date: "2025",
        description:
          "Tích lũy kinh nghiệm từ các công ty niêm yết trên SGX và các MNC thương hiệu xa xỉ Châu Âu.",
      },
      {
        date: "2025",
        description: "Đào tạo các công ty lớn: AIA, DBS, UOB, SAXO.",
      },
      {
        date: "2025",
        description: "Đào tạo công nghệ: AWS, SONY, NBCUniversal, Ricoh.",
      },
      {
        date: "2025",
        description: "Đào tạo chính phủ: GOVTech, ICA Singapore, Ministry of Health (MOH).",
      },
      {
        date: "2025",
        description: "Đào tạo giáo dục: NUS, NTU, SMU Academy, Kaplan.",
      },
      {
        date: "2025",
        description: "Đào tạo tư vấn: BCG.",
      },
    ],
    projects: [
      {
        title: "Founder tại Crown Mercado Alliance Pte Ltd",
        description:
          "Bà đã tư vấn thành công cho nhiều Doanh nghiệp vừa và nhỏ (SME), Công ty đa quốc gia (MNC), và Cơ quan Chính phủ trong việc triển khai chiến lược tiếp thị kỹ thuật số.",
      },
      {
        title: "Huấn luyện viên Trưởng (Lead Trainer)",
        description:
          "Đã đào tạo hơn 5.000 học viên thuộc hơn 10 ngành nghề khác nhau. Các buổi đào tạo tập trung vào học tập thực hành và các chiến lược đổi mới.",
      },
      {
        title:
          "Chuyên môn: Chiến lược Kinh doanh & Tiếp thị Tăng cường bởi AI",
        description:
          "Tập trung vào ứng dụng AI trong chiến lược kinh doanh và marketing.",
      },
      {
        title: "Chuyên môn: Inbound Omni-Channel",
        description:
          "Xây dựng chiến lược tiếp thị đa kênh theo hướng inbound.",
      },
      {
        title: "Chuyên môn: Nội dung, SEO, SEM & Social Media",
        description:
          "Bao gồm xây dựng nội dung, tối ưu hóa tìm kiếm, quảng cáo và mạng xã hội.",
      },
      {
        title: "Chủ đề đào tạo",
        description: "AI trong Marketing, Quảng cáo TikTok.",
      },
    ],
  },
];

// Helper function to get instructor by id
export const getInstructorById = (id: string): InstructorProps | undefined => {
  return instructors.find(instructor => instructor.id === id);
};

// Helper function to get instructors by ids
export const getInstructorsByIds = (ids: string[]): InstructorProps[] => {
  return instructors.filter(instructor => ids.includes(instructor.id));
};

// Helper function to get all instructors
export const getAllInstructors = (): InstructorProps[] => {
  return instructors;
};
