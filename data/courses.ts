export interface Instructor {
  name: string
  title: string
  avatar: string
  bio: string[]
  education?: string[]
  social: {
    linkedin?: string
    facebook?: string
    instagram?: string
  }
}

export interface CourseInfo {
  topic: string
  schedule: string
  instructor: string
  sessions: string
  location: string
  capacity: string
}

export interface Audience {
  title: string
  description: string
}

export interface Privilege {
  title: string
  description: string
}

export interface Course {
  id: number
  slug: string
  mode: 'offline' | 'online'
  title: string
  category: string[]
  heroImage: string
  price: {
    amount: string
    currency: 'VNĐ' | 'USD'
    deposit?: string
  }
  paymentId: number
  info: CourseInfo
  mission: string
  testimonials: string[]
  curriculum?: string
  instructors: Instructor[]
  audience: Audience[]
  privileges: Privilege[]
}

export const courses: Course[] = [
  {
    id: 1,
    slug: 'suc-manh-vo-han',
    mode: 'offline',
    title: 'program_detail.courses.suc_manh_vo_han.title',
    category: ['categories.entrepreneur', 'categories.business'],
    heroImage: '/picture/suc_manh_vo_han.jpg',
    price: {
      amount: '180.000.000',
      currency: 'VNĐ',
      deposit: '180.000.000'
    },
    paymentId: 58,
    info: {
      topic: 'program_detail.courses.suc_manh_vo_han.topic',
      schedule: 'program_detail.courses.suc_manh_vo_han.schedule',
      instructor: 'program_detail.courses.suc_manh_vo_han.instructor',
      sessions: 'program_detail.courses.suc_manh_vo_han.sessions',
      location: 'program_detail.courses.suc_manh_vo_han.location',
      capacity: 'program_detail.courses.suc_manh_vo_han.capacity'
    },
    mission: 'program_detail.courses.suc_manh_vo_han.mission_desc',
    testimonials: ['Dm6gg-LHGqs', 'qEBZwBE449o', 'RDKjAQLf5w0'],
    curriculum: '/picture/lachinhminh.jpg',
    instructors: [
      {
        name: 'NhiLe',
        title: 'Doanh nhân',
        avatar: '/picture/nhile.jpg',
        bio: [
          '15 năm kinh nghiệm trên thương trường tại Singapore và Việt Nam',
          'Là một Doanh nhân | Nhà Tâm lý học | Người lãnh đạo cộng đồng',
          'Thay đổi và tạo cảm hứng cho hơn 2000 người Việt ở khắp nơi trên thế giới',
          'Làm việc và là nhà lãnh đạo trong nhiều lĩnh vực tại cả Việt Nam và Singapore'
        ],
        education: [
          'Professional Certificate in Business Coaching (SMU) | Chứng chỉ Chuyên nghiệp về Đào tạo Doanh nghiệp (Đại học SMU)',
          'Resilient Leadership and Business Sustainability Series (SMU) | Chuỗi chương trình Lãnh đạo Kiên cường và Phát triển Bền vững trong Kinh doanh (Đại học SMU)',
          'Certification in Artificial Intelligence (AI) in Marketing (SMU) | Chứng chỉ về Ứng dụng Trí tuệ Nhân tạo (AI) trong Marketing (Đại học SMU)',
          'Diploma in Psychology – Kaplan Singapore | Văn bằng Tâm lý học - Đại học Kaplan, Singapore'
        ],
        social: {
          linkedin: 'https://www.linkedin.com/in/nhisg/',
          facebook: 'https://www.facebook.com/nhile.sg',
          instagram: 'https://www.instagram.com/nhile.sg/'
        }
      },
      {
        name: 'Mel',
        title: 'Chuyên gia Marketing',
        avatar: '/picture/mel.jpg',
        bio: [
          'Melvin Soh, chuyên gia marketing hàng đầu châu Á, nổi tiếng với hơn 15 năm kinh nghiệm thực chiến trong xây dựng thương hiệu và thu hút khách hàng. Anh đã giúp hàng trăm doanh nghiệp tạo dựng lòng trung thành và tăng trưởng bền vững.'
        ],
        social: {
          facebook: 'https://www.facebook.com/@melvinsohonline',
          instagram: 'https://www.instagram.com/thegreatmelvinsoh'
        }
      }
    ],
    audience: [],
    privileges: []
  },
  {
    id: 2,
    slug: 'la-chinh-minh',
    mode: 'offline',
    title: 'program_detail.courses.la_chinh_minh.title',
    category: ['categories.personal_development', 'categories.be_yourself'],
    heroImage: '/picture/la_chinh_minh.jpg',
    price: {
      amount: '59.696.000',
      currency: 'VNĐ'
    },
    paymentId: 57,
    info: {
      topic: 'program_detail.courses.la_chinh_minh.topic',
      schedule: 'program_detail.courses.la_chinh_minh.schedule',
      instructor: 'program_detail.courses.la_chinh_minh.instructor',
      sessions: 'program_detail.courses.la_chinh_minh.sessions',
      location: 'program_detail.courses.la_chinh_minh.location',
      capacity: 'program_detail.courses.la_chinh_minh.capacity'
    },
    mission: 'Khóa học "Là Chính Mình" mang sứ mệnh giúp bạn khám phá và chữa lành mọi khía cạnh của bản thân, xây dựng lối sống cân bằng và phát triển toàn diện về tinh thần, cảm xúc, và thể chất.',
    testimonials: ['PFWDwSf5EGc', 'RAaXaJxFXpE', '8qq6WDQFFQk'],
    curriculum: '/picture/lachinhminh.jpg',
    instructors: [
      {
        name: 'NhiLe',
        title: 'Doanh nhân',
        avatar: '/picture/nhile.jpg',
        bio: [
          '15 năm kinh nghiệm trên thương trường tại Singapore và Việt Nam',
          'Là một Doanh nhân | Nhà Tâm lý học | Người lãnh đạo cộng đồng',
          'Thay đổi và tạo cảm hứng cho hơn 2000 người Việt ở khắp nơi trên thế giới.',
          'Làm việc và là nhà lãnh đạo trong nhiều lĩnh vực tại cả Việt Nam và Singapore.'
        ],
        education: [
          'Professional Certificate in Business Coaching (SMU) | Chứng chỉ Chuyên nghiệp về Đào tạo Doanh nghiệp (Đại học SMU)',
          'Resilient Leadership and Business Sustainability Series (SMU) | Chuỗi chương trình Lãnh đạo Kiên cường và Phát triển Bền vững trong Kinh doanh (Đại học SMU)',
          'Certification in Artificial Intelligence (AI) in Marketing (SMU) | Chứng chỉ về Ứng dụng Trí tuệ Nhân tạo (AI) trong Marketing (Đại học SMU)',
          'Diploma in Psychology – Kaplan Singapore | Văn bằng Tâm lý học - Đại học Kaplan, Singapore'
        ],
        social: {
          linkedin: 'https://www.linkedin.com/in/nhisg/',
          facebook: 'https://www.facebook.com/nhile.sg',
          instagram: 'https://www.instagram.com/nhile.sg/'
        }
      }
    ],
    audience: [],
    privileges: []
  },
  {
    id: 3,
    slug: 'gen-ai-101',
    mode: 'online',
    title: 'program_detail.courses.gen_ai_101.title',
    category: ['categories.ai'],
    heroImage: '/picture/thum_yt_1.png',
    price: {
      amount: '13.069.000',
      currency: 'VNĐ'
    },
    paymentId: 78,
    info: {
      topic: 'program_detail.courses.gen_ai_101.topic',
      schedule: 'program_detail.courses.gen_ai_101.schedule',
      instructor: 'program_detail.courses.gen_ai_101.instructor',
      sessions: 'program_detail.courses.gen_ai_101.sessions',
      location: 'program_detail.courses.gen_ai_101.location',
      capacity: 'program_detail.courses.gen_ai_101.capacity'
    },
    mission: 'Giúp người Việt Nam hiểu rõ công nghệ Gen AI và ứng dụng thực tế vào công việc một cách có trách nhiệm và hiệu quả. Đồng thời, tạo nền tảng để tối ưu hoá các thao tác công việc lặp đi lặp lại hàng ngày trong công việc, đặc biệt trong lĩnh vực công và giáo dục.',
    testimonials: ['Dm6gg-LHGqs'],
    instructors: [
      {
        name: 'Linda Hui-Isaac',
        title: 'Doanh nhân',
        avatar: '/picture/linda.jpg',
        bio: [
          'Với hơn 20 năm kinh nghiệm quốc tế trong chiến lược thương hiệu và tiếp thị số, Linda Hui-Isaac là chuyên gia hàng đầu về AI Marketing và Digital Transformation. Bà từng đảm nhiệm vai trò cố vấn cho các doanh nghiệp lớn, SMEs, tổ chức chính phủ, cũng như tập đoàn đa quốc gia – bao gồm các công ty niêm yết SGX và thương hiệu xa xỉ châu Âu.'
        ],
        social: {
          linkedin: 'https://www.linkedin.com/in/nhisg/',
          facebook: 'https://www.facebook.com/nhile.sg',
          instagram: 'https://www.instagram.com/nhile.sg/'
        }
      }
    ],
    audience: [],
    privileges: []
  },
  {
    id: 4,
    slug: 'thuong-hieu-cua-ban',
    mode: 'online',
    title: 'program_detail.courses.thuong_hieu_cua_ban.title',
    category: ['categories.branding'],
    heroImage: '/picture/thuong_hieu_cua_ban.png',
    price: {
      amount: '18.960.000',
      currency: 'VNĐ'
    },
    paymentId: 53,
    info: {
      topic: 'program_detail.courses.thuong_hieu_cua_ban.topic',
      schedule: 'program_detail.courses.thuong_hieu_cua_ban.schedule',
      instructor: 'program_detail.courses.thuong_hieu_cua_ban.instructor',
      sessions: 'program_detail.courses.thuong_hieu_cua_ban.sessions',
      location: 'program_detail.courses.thuong_hieu_cua_ban.location',
      capacity: 'program_detail.courses.thuong_hieu_cua_ban.capacity'
    },
    mission: 'Kiến thức cơ bản nhất cho người muốn bắt đầu mở doanh nghiệp hay cải tổ doanh nghiệp gia đình. Định hình rõ hơn kinh doanh của bạn trong chỉ 4 ngày với khóa học "Thương Hiệu Của Bạn" - một chương trình được thiết kế đặc biệt cho chủ doanh nghiệp trong kỷ nguyên AI.',
    testimonials: ['Dm6gg-LHGqs'],
    instructors: [
      {
        name: 'NhiLe',
        title: 'Doanh nhân',
        avatar: '/picture/nhile.jpg',
        bio: [
          'Tốt nghiệp chuyên ngành Tâm lý học tại Kaplan Professional, Singapore. Nhi Le có nhiều năm kinh nghiệm hỗ trợ khách hàng tại Singapore và Việt Nam, giúp họ vượt qua thách thức cuộc sống và làm chủ cuộc đời họ.'
        ],
        social: {
          linkedin: 'https://www.linkedin.com/in/nhisg/',
          facebook: 'https://www.facebook.com/nhile.sg',
          instagram: 'https://www.instagram.com/nhile.sg/'
        }
      }
    ],
    audience: [],
    privileges: []
  },
  {
    id: 5,
    slug: 'cuoc-song-cua-ban',
    mode: 'online',
    title: 'program_detail.courses.cuoc_song_cua_ban.title',
    category: ['categories.personal_development'],
    heroImage: '/picture/cuoc_song_cua_ban.png',
    price: {
      amount: '18.960.000',
      currency: 'VNĐ'
    },
    paymentId: 54,
    info: {
      topic: 'program_detail.courses.cuoc_song_cua_ban.topic',
      schedule: 'program_detail.courses.cuoc_song_cua_ban.schedule',
      instructor: 'program_detail.courses.cuoc_song_cua_ban.instructor',
      sessions: 'program_detail.courses.cuoc_song_cua_ban.sessions',
      location: 'program_detail.courses.cuoc_song_cua_ban.location',
      capacity: 'program_detail.courses.cuoc_song_cua_ban.capacity'
    },
    mission: 'Chương trình là cơ hội giúp bạn hiểu sâu hơn về cảm xúc, khai phá những góc khuất cảm xúc và sự khởi đầu cho con đường phát triển bản thân. Đôi lúc bạn quên đi bạn là tài sản quý giá nhất trong cuộc sống này, ước mơ của bạn là gì và đâu là cuộc đời mà bạn muốn sống. Chúng tôi tin rằng "Cuộc sống của bạn" giúp bạn tìm được câu trả lời và cân bằng hơn trong cuộc sống.',
    testimonials: ['Dm6gg-LHGqs'],
    instructors: [
      {
        name: 'NhiLe',
        title: 'Doanh nhân',
        avatar: '/picture/nhile.jpg',
        bio: [
          'Tốt nghiệp chuyên ngành Tâm lý học tại Kaplan Professional, Singapore. Nhi Le có nhiều năm kinh nghiệm hỗ trợ khách hàng tại Singapore và Việt Nam, giúp họ vượt qua thách thức cuộc sống và làm chủ cuộc đời họ.'
        ],
        social: {
          linkedin: 'https://www.linkedin.com/in/nhisg/',
          facebook: 'https://www.facebook.com/nhile.sg',
          instagram: 'https://www.instagram.com/nhile.sg/'
        }
      }
    ],
    audience: [],
    privileges: []
  },
  {
    id: 6,
    slug: 'ai-for-business-communication',
    mode: 'online',
    title: 'program_detail.courses.ai_for_business_communication.title',
    category: ['categories.applied_ai'],
    heroImage: '/picture/thum_yt_2.png',
    price: {
      amount: '23.609.000',
      currency: 'VNĐ'
    },
    paymentId: 79,
    info: {
      topic: 'program_detail.courses.ai_for_business_communication.topic',
      schedule: 'program_detail.courses.ai_for_business_communication.schedule',
      instructor: 'program_detail.courses.ai_for_business_communication.instructor',
      sessions: 'program_detail.courses.ai_for_business_communication.sessions',
      location: 'program_detail.courses.ai_for_business_communication.location',
      capacity: 'program_detail.courses.ai_for_business_communication.capacity'
    },
    mission: 'Giúp các chuyên gia doanh nghiệp nâng cao hiệu suất giao tiếp bằng công cụ AI, rút ngắn thời gian viết, đồng thời cải thiện chất lượng nội dung trong mọi ngữ cảnh công việc – từ email đến báo cáo hay thuyết trình.',
    testimonials: ['Dm6gg-LHGqs'],
    instructors: [
      {
        name: 'Linda Hui-Isaac',
        title: 'Chuyên gia chiến lược AI & Cố vấn Marketing',
        avatar: '/picture/linda.jpg',
        bio: [
          'Với hơn 20 năm kinh nghiệm quốc tế trong chiến lược thương hiệu và tiếp thị số, Linda Hui-Isaac là chuyên gia hàng đầu về AI Marketing và Digital Transformation. Bà từng đảm nhiệm vai trò cố vấn cho các doanh nghiệp lớn, SMEs, tổ chức chính phủ, cũng như tập đoàn đa quốc gia – bao gồm các công ty niêm yết SGX và thương hiệu xa xỉ châu Âu.'
        ],
        social: {
          linkedin: 'https://www.linkedin.com/in/nhisg/',
          facebook: 'https://www.facebook.com/nhile.sg',
          instagram: 'https://www.instagram.com/nhile.sg/'
        }
      }
    ],
    audience: [],
    privileges: []
  },
  {
    id: 7,
    slug: 'ai-in-marketing',
    mode: 'online',
    title: 'program_detail.courses.ai_in_marketing.title',
    category: ['categories.digital_marketing'],
    heroImage: '/picture/thum_yt_3.png',
    price: {
      amount: '28.985.000',
      currency: 'VNĐ'
    },
    paymentId: 80,
    info: {
      topic: 'program_detail.courses.ai_in_marketing.topic',
      schedule: 'program_detail.courses.ai_in_marketing.schedule',
      instructor: 'program_detail.courses.ai_in_marketing.instructor',
      sessions: 'program_detail.courses.ai_in_marketing.sessions',
      location: 'program_detail.courses.ai_in_marketing.location',
      capacity: 'program_detail.courses.ai_in_marketing.capacity'
    },
    mission: 'Trang bị cho học viên kiến thức nền tảng và kỹ năng thực chiến trong việc ứng dụng AI tạo sinh vào lĩnh vực marketing và chiến lược kinh doanh. Từ đó giúp nâng cao năng lực sáng tạo, lập kế hoạch, nghiên cứu thị trường và triển khai chiến dịch nhanh – chính xác – hiệu quả hơn.',
    testimonials: ['Dm6gg-LHGqs'],
    instructors: [
      {
        name: 'Linda Hui-Isaac',
        title: 'Chuyên gia chiến lược AI & Cố vấn Marketing',
        avatar: '/picture/linda.jpg',
        bio: [
          'Với hơn 20 năm kinh nghiệm quốc tế trong chiến lược thương hiệu và tiếp thị số, Linda Hui-Isaac là chuyên gia hàng đầu về AI Marketing và Digital Transformation. Bà từng đảm nhiệm vai trò cố vấn cho các doanh nghiệp lớn, SMEs, tổ chức chính phủ, cũng như tập đoàn đa quốc gia – bao gồm các công ty niêm yết SGX và thương hiệu xa xỉ châu Âu.'
        ],
        social: {
          linkedin: 'https://www.linkedin.com/in/nhisg/',
          facebook: 'https://www.facebook.com/nhile.sg',
          instagram: 'https://www.instagram.com/nhile.sg/'
        }
      }
    ],
    audience: [],
    privileges: []
  }
]

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find(course => course.slug === slug)
}

export function getCoursesByMode(mode: 'offline' | 'online'): Course[] {
  return courses.filter(course => course.mode === mode)
}
