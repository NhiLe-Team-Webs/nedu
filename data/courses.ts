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
    title: 'Sức Mạnh Vô Hạn',
    category: ['Doanh nhân', 'Doanh nghiệp'],
    heroImage: '/picture/2_3.jpg',
    price: {
      amount: '23.960',
      currency: 'USD',
      deposit: '180.000.000'
    },
    paymentId: 58,
    info: {
      topic: 'Vận hành doanh nghiệp',
      schedule: 'Tháng 4 năm 2026',
      instructor: 'Mel x NhiLe',
      sessions: '6 tháng online và 4,5 ngày offline',
      location: 'Online qua Zoom và Offline tại khách sạn Mikazuki Đà Nẵng',
      capacity: '40 học viên'
    },
    mission: 'Sức Mạnh Vô Hạn được thiết kế để giúp doanh nhân Việt vươn tầm thế giới. Bằng cách kết nối với các Chuyên gia quốc tế, bạn sẽ học những chiến lược đột phá và xây dựng những nền tảng căn bản nhất cho doanh nghiệp, nâng cấp khả năng kinh doanh và mở rộng thị trường.',
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
    privileges: [
      {
        title: 'Tham gia cộng đồng N-Edu',
        description: 'Chúng tôi có sẵn một cộng đồng tích cực và đầy tiềm năng, nơi có những người cùng chí hướng sẵn lòng đồng hành và hỗ trợ lẫn nhau trong sự nghiệp và cuộc sống.'
      },
      {
        title: 'Học lại trọn đời',
        description: 'Sau khi học viên tốt nghiệp, bạn được quyền quay lại học khi có lớp và hoàn toàn miễn phí. Các chương trình của N-Edu luôn được cập nhật và nâng cấp theo những chuyển biến của thế giới.'
      },
      {
        title: 'Hỗ trợ sau khi học',
        description: 'Sau khi hoàn thành khóa học, học viên vẫn được hỗ trợ bởi đội ngũ giảng và chuyên gia để giải đáp thắc mắc hoặc giúp giải quyết các vấn đề thực tế.'
      },
      {
        title: 'hợp tác quốc tế',
        description: 'Mỗi năm chúng tôi có nhiều sự kiện và chương trình học trực tiếp, mở ra cơ hội gặp gỡ chuyên gia và học viên quốc tế.'
      },
      {
        title: 'Cá nhân hóa lộ trình',
        description: 'Lựa chọn khóa học phù hợp với nhu cầu cá nhân đưa bạn nhanh đến điều bạn ước muốn.'
      },
      {
        title: 'đội ngũ hỗ trợ liên tục',
        description: 'Đội ngũ hỗ trợ của N-Edu luôn sẵn sàng giải đáp thắc mắc của bạn và đảm bảo những quyền lợi của bạn.'
      }
    ]
  },
  {
    id: 2,
    slug: 'la-chinh-minh',
    mode: 'offline',
    title: 'Là Chính Mình 03',
    category: ['Phát triển bản thân', 'Là chính mình'],
    heroImage: '/picture/b2.jpg',
    price: {
      amount: '59.696.000',
      currency: 'VNĐ'
    },
    paymentId: 57,
    info: {
      topic: 'Phát triển bản thân',
      schedule: '18 - 21/03/ 2026',
      instructor: 'NhiLe x Guest Instructors',
      sessions: '3,5 ngày',
      location: 'Khách sạn Mikazuki Đà Nẵng',
      capacity: '64 học viên'
    },
    mission: 'Khóa học "Là Chính Mình" mang sứ mệnh giúp bạn khám phá và chữa lành mọi khía cạnh của bản thân, xây dựng lối sống cân bằng và phát triển toàn diện về tinh thần, cảm xúc, và thể chất.',
    testimonials: ['PFWDwSf5EGc', 'RAaXaJxFXpE', '8qq6WDQFFQk'],
    curriculum: '/picture/la_chinh_minh.jpg',
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
    privileges: [
      {
        title: 'Tham gia cộng đồng N-Edu',
        description: 'Chúng tôi có sẵn một cộng đồng tích cực và đầy tiềm năng, nơi có những người cùng chí hướng sẵn lòng đồng hành và hỗ trợ lẫn nhau trong sự nghiệp và cuộc sống.'
      },
      {
        title: 'Học lại trọn đời',
        description: 'Sau khi học viên tốt nghiệp, bạn được quyền quay lại học khi có lớp và hoàn toàn miễn phí. Các chương trình của N-Edu luôn được cập nhật và nâng cấp theo những chuyển biến của thế giới.'
      },
      {
        title: 'Hỗ trợ sau khi học',
        description: 'Sau khi hoàn thành khóa học, học viên vẫn được hỗ trợ bởi đội ngũ giảng và chuyên gia để giải đáp thắc mắc hoặc giúp giải quyết các vấn đề thực tế.'
      },
      {
        title: 'hợp tác quốc tế',
        description: 'Mỗi năm chúng tôi có nhiều sự kiện và chương trình học trực tiếp, mở ra cơ hội gặp gỡ chuyên gia và học viên quốc tế.'
      },
      {
        title: 'Cá nhân hóa lộ trình',
        description: 'Lựa chọn khóa học phù hợp với nhu cầu cá nhân đưa bạn nhanh đến điều bạn ước muốn.'
      },
      {
        title: 'đội ngũ hỗ trợ liên tục',
        description: 'Đội ngũ hỗ trợ của N-Edu luôn sẵn sàng giải đáp thắc mắc của bạn và đảm bảo những quyền lợi của bạn.'
      }
    ]
  },
  {
    id: 3,
    slug: 'gen-ai-101',
    mode: 'online',
    title: 'GEN AI 101',
    category: ['AI'],
    heroImage: '/picture/thum_yt_1.png',
    price: {
      amount: '13.069.000',
      currency: 'VNĐ'
    },
    paymentId: 78,
    info: {
      topic: 'AI',
      schedule: '28-29 tháng 7 năm 2025',
      instructor: 'Linda Hui-Isaac',
      sessions: '2 buổi',
      location: 'Online qua Zoom',
      capacity: '40 học viên / lớp'
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
    audience: [
      {
        title: 'Sinh viên & người mới đi làm',
        description: 'Trang bị nền tảng thực tế để hiểu rõ AI dùng trong công việc viết – trình bày – giao tiếp, mở ra cơ hội phát triển sớm trong môi trường chuyên nghiệp.'
      },
      {
        title: 'Người muốn chuyển ngành',
        description: 'Khóa học phù hợp cho những ai muốn khám phá tiềm năng AI để ứng dụng trong công việc mới như marketing, truyền thông, quản lý, nhân sự...'
      },
      {
        title: 'Người mới bắt đầu học AI',
        description: 'Không cần nền tảng kỹ thuật – chỉ cần bạn tò mò, ham học hỏi và muốn dùng AI một cách thực tế để nâng cấp kỹ năng và tăng năng suất cá nhân.'
      }
    ],
    privileges: [
      {
        title: 'Tham gia cộng đồng N-Edu',
        description: 'Chúng tôi có sẵn một cộng đồng tích cực và đầy tiềm năng, nơi có những người cùng chí hướng sẵn lòng đồng hành và hỗ trợ lẫn nhau trong sự nghiệp và cuộc sống.'
      },
      {
        title: 'Học lại trọn đời',
        description: 'Sau khi học viên tốt nghiệp, bạn được quyền quay lại học khi có lớp và hoàn toàn miễn phí. Các chương trình của N-Edu luôn được cập nhật và nâng cấp theo những chuyển biến của thế giới.'
      },
      {
        title: 'Hỗ trợ sau khi học',
        description: 'Sau khi hoàn thành khóa học, học viên vẫn được hỗ trợ bởi đội ngũ giảng và chuyên gia để giải đáp thắc mắc hoặc giúp giải quyết các vấn đề thực tế.'
      },
      {
        title: 'hợp tác quốc tế',
        description: 'Mỗi năm chúng tôi có nhiều sự kiện và chương trình học trực tiếp, mở ra cơ hội gặp gỡ chuyên gia và học viên quốc tế.'
      },
      {
        title: 'Cá nhân hóa lộ trình',
        description: 'Lựa chọn khóa học phù hợp với nhu cầu cá nhân đưa bạn nhanh đến điều bạn ước muốn.'
      },
      {
        title: 'đội ngũ hỗ trợ liên tục',
        description: 'Đội ngũ hỗ trợ của N-Edu luôn sẵn sàng giải đáp thắc mắc của bạn và đảm bảo những quyền lợi của bạn.'
      }
    ]
  },
  {
    id: 4,
    slug: 'thuong-hieu-cua-ban',
    mode: 'online',
    title: 'Thương Hiệu Của Bạn',
    category: ['Thương hiệu'],
    heroImage: '/picture/thuong_hieu_cua_ban.png',
    price: {
      amount: '18.960.000',
      currency: 'VNĐ'
    },
    paymentId: 53,
    info: {
      topic: 'Thương hiệu',
      schedule: 'Tháng 11 năm 2025',
      instructor: 'NhiLe',
      sessions: '4 buổi',
      location: 'Online qua Zoom',
      capacity: '80 học viên / lớp'
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
    audience: [
      {
        title: 'Muốn khởi nghiệp',
        description: 'Mang về kiến thức thực tế để mở doanh nghiệp và phát triển từ đầu, tư duy lãnh đạo.'
      },
      {
        title: 'Cải tổ doanh nghiệp',
        description: 'Chương trình đặc biệt phù hợp với những doanh nghiệp gia đình muốn cải tổ và xây dựng thương hiệu lên mạng xã hội'
      },
      {
        title: 'Giải pháp doanh nghiệp',
        description: 'Trao đổi trực tiếp với người hướng dẫn về các vấn đề trong doanh nghiệp và nhận ngay giải pháp trong phòng học.'
      }
    ],
    privileges: [
      {
        title: 'Tham gia cộng đồng N-Edu',
        description: 'Chúng tôi có sẵn một cộng đồng tích cực và đầy tiềm năng, nơi có những người cùng chí hướng sẵn lòng đồng hành và hỗ trợ lẫn nhau trong sự nghiệp và cuộc sống.'
      },
      {
        title: 'Học lại trọn đời',
        description: 'Sau khi học viên tốt nghiệp, bạn được quyền quay lại học khi có lớp và hoàn toàn miễn phí. Các chương trình của N-Edu luôn được cập nhật và nâng cấp theo những chuyển biến của thế giới.'
      },
      {
        title: 'Hỗ trợ sau khi học',
        description: 'Sau khi hoàn thành khóa học, học viên vẫn được hỗ trợ bởi đội ngũ giảng và chuyên gia để giải đáp thắc mắc hoặc giúp giải quyết các vấn đề thực tế.'
      },
      {
        title: 'hợp tác quốc tế',
        description: 'Mỗi năm chúng tôi có nhiều sự kiện và chương trình học trực tiếp, mở ra cơ hội gặp gỡ chuyên gia và học viên quốc tế.'
      },
      {
        title: 'Cá nhân hóa lộ trình',
        description: 'Lựa chọn khóa học phù hợp với nhu cầu cá nhân đưa bạn nhanh đến điều bạn ước muốn.'
      },
      {
        title: 'đội ngũ hỗ trợ liên tục',
        description: 'Đội ngũ hỗ trợ của N-Edu luôn sẵn sàng giải đáp thắc mắc của bạn và đảm bảo những quyền lợi của bạn.'
      }
    ]
  },
  {
    id: 5,
    slug: 'cuoc-song-cua-ban',
    mode: 'online',
    title: 'CUỘC SỐNG CỦA BẠN',
    category: ['Phát triển bản thân'],
    heroImage: '/picture/cuoc_song_cua_ban.png',
    price: {
      amount: '18.960.000',
      currency: 'VNĐ'
    },
    paymentId: 54,
    info: {
      topic: 'Cảm xúc',
      schedule: 'Tháng 11 năm 2025',
      instructor: 'NhiLe',
      sessions: '3 buổi',
      location: 'Online qua Zoom',
      capacity: '80 học viên / lớp'
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
    audience: [
      {
        title: 'Mất cân bằng',
        description: 'Khủng hoảng về các mối quan hệ trong gia đình, người thân hay trong công việc.'
      },
      {
        title: 'Kiến thức nền tảng',
        description: 'Trang bị kỹ năng và tư duy giúp bạn duy trì sự cân bằng và phát triển trong suốt cuộc đời.'
      },
      {
        title: 'Khám phá bản thân',
        description: 'Hiểu về bản thân sâu sắc hơn, khám phá những góc khuất mà bạn chưa từng nhận ra về chính mình.'
      }
    ],
    privileges: [
      {
        title: 'Tham gia cộng đồng N-Edu',
        description: 'Chúng tôi có sẵn một cộng đồng tích cực và đầy tiềm năng, nơi có những người cùng chí hướng sẵn lòng đồng hành và hỗ trợ lẫn nhau trong sự nghiệp và cuộc sống.'
      },
      {
        title: 'Học lại trọn đời',
        description: 'Sau khi học viên tốt nghiệp, bạn được quyền quay lại học khi có lớp và hoàn toàn miễn phí. Các chương trình của N-Edu luôn được cập nhật và nâng cấp theo những chuyển biến của thế giới.'
      },
      {
        title: 'Hỗ trợ sau khi học',
        description: 'Sau khi hoàn thành khóa học, học viên vẫn được hỗ trợ bởi đội ngũ giảng và chuyên gia để giải đáp thắc mắc hoặc giúp giải quyết các vấn đề thực tế.'
      },
      {
        title: 'hợp tác quốc tế',
        description: 'Mỗi năm chúng tôi có nhiều sự kiện và chương trình học trực tiếp, mở ra cơ hội gặp gỡ chuyên gia và học viên quốc tế.'
      },
      {
        title: 'Cá nhân hóa lộ trình',
        description: 'Lựa chọn khóa học phù hợp với nhu cầu cá nhân đưa bạn nhanh đến điều bạn ước muốn.'
      },
      {
        title: 'đội ngũ hỗ trợ liên tục',
        description: 'Đội ngũ hỗ trợ của N-Edu luôn sẵn sàng giải đáp thắc mắc của bạn và đảm bảo những quyền lợi của bạn.'
      }
    ]
  },
  {
    id: 6,
    slug: 'ai-for-business-communication',
    mode: 'online',
    title: 'AI FOR BUSINESS COMMUNICATION',
    category: ['Trí tuệ nhân tạo ứng dụng'],
    heroImage: '/picture/thum_yt_2.png',
    price: {
      amount: '23.609.000',
      currency: 'VNĐ'
    },
    paymentId: 79,
    info: {
      topic: 'AI',
      schedule: '30/07 và 02-03/08/2025',
      instructor: 'Linda Hui-Isaac',
      sessions: '3 buổi',
      location: 'Online qua Zoom',
      capacity: '40 học viên / lớp'
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
    audience: [
      {
        title: 'Ứng dụng AI để phát triển sự nghiệp',
        description: 'Dành cho người đã có nền tảng cơ bản về AI, muốn nâng cao kỹ năng viết – giao tiếp – quản lý bằng công cụ AI để tăng hiệu suất công việc.'
      },
      {
        title: 'Quản lý & truyền thông nội bộ',
        description: 'Phù hợp với HR, quản lý, chuyên viên truyền thông, CSKH... muốn chuẩn hóa cách giao tiếp, viết báo cáo, proposal, SOP nhờ AI.'
      },
      {
        title: 'Người đi làm muốn thực chiến với AI',
        description: 'Bạn đang đi làm, đã biết AI là gì – giờ là lúc dùng nó để làm việc nhanh hơn, đúng hơn, chuyên nghiệp hơn qua thư viện prompt & ứng dụng thực tế.'
      }
    ],
    privileges: [
      {
        title: 'Tham gia cộng đồng N-Edu',
        description: 'Chúng tôi có sẵn một cộng đồng tích cực và đầy tiềm năng, nơi có những người cùng chí hướng sẵn lòng đồng hành và hỗ trợ lẫn nhau trong sự nghiệp và cuộc sống.'
      },
      {
        title: 'Học lại trọn đời',
        description: 'Sau khi học viên tốt nghiệp, bạn được quyền quay lại học khi có lớp và hoàn toàn miễn phí. Các chương trình của N-Edu luôn được cập nhật và nâng cấp theo những chuyển biến của thế giới.'
      },
      {
        title: 'Hỗ trợ sau khi học',
        description: 'Sau khi hoàn thành khóa học, học viên vẫn được hỗ trợ bởi đội ngũ giảng và chuyên gia để giải đáp thắc mắc hoặc giúp giải quyết các vấn đề thực tế.'
      },
      {
        title: 'hợp tác quốc tế',
        description: 'Mỗi năm chúng tôi có nhiều sự kiện và chương trình học trực tiếp, mở ra cơ hội gặp gỡ chuyên gia và học viên quốc tế.'
      },
      {
        title: 'Cá nhân hóa lộ trình',
        description: 'Lựa chọn khóa học phù hợp với nhu cầu cá nhân đưa bạn nhanh đến điều bạn ước muốn.'
      },
      {
        title: 'đội ngũ hỗ trợ liên tục',
        description: 'Đội ngũ hỗ trợ của N-Edu luôn sẵn sàng giải đáp thắc mắc của bạn và đảm bảo những quyền lợi của bạn.'
      }
    ]
  },
  {
    id: 7,
    slug: 'ai-in-marketing',
    mode: 'online',
    title: 'CERTIFIED GEN AI FOUNDATION IN MARKETING & BUSINESS STRATEGY',
    category: ['Marketing số'],
    heroImage: '/picture/thum_yt_3.png',
    price: {
      amount: '28.985.000',
      currency: 'VNĐ'
    },
    paymentId: 80,
    info: {
      topic: 'AI',
      schedule: '05-06 tháng 08 năm 2025',
      instructor: 'Linda Hui-Isaac',
      sessions: '2 buổi',
      location: 'Online qua Zoom',
      capacity: '40 học viên / lớp'
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
    audience: [
      {
        title: 'Chủ doanh nghiệp & startup',
        description: 'Muốn ứng dụng AI để tối ưu hoá quy trình viết, giao tiếp và marketing — từ email, báo giá, đến proposal và thông điệp thương hiệu.'
      },
      {
        title: 'Marketer & Content Team',
        description: 'Phù hợp với team content, truyền thông, digital marketing đang tìm cách rút ngắn thời gian sản xuất nội dung nhưng vẫn giữ chất lượng & đúng chiến lược.'
      },
      {
        title: 'Người làm chiến lược & vận hành',
        description: 'Dành cho strategist, quản lý dự án, quản lý team muốn xây hệ thống thư viện prompt, mẫu báo cáo, đề xuất & giao tiếp nội bộ mạch lạc, hiệu quả hơn.'
      }
    ],
    privileges: [
      {
        title: 'Tham gia cộng đồng N-Edu',
        description: 'Chúng tôi có sẵn một cộng đồng tích cực và đầy tiềm năng, nơi có những người cùng chí hướng sẵn lòng đồng hành và hỗ trợ lẫn nhau trong sự nghiệp và cuộc sống.'
      },
      {
        title: 'Học lại trọn đời',
        description: 'Sau khi học viên tốt nghiệp, bạn được quyền quay lại học khi có lớp và hoàn toàn miễn phí. Các chương trình của N-Edu luôn được cập nhật và nâng cấp theo những chuyển biến của thế giới.'
      },
      {
        title: 'Hỗ trợ sau khi học',
        description: 'Sau khi hoàn thành khóa học, học viên vẫn được hỗ trợ bởi đội ngũ giảng và chuyên gia để giải đáp thắc mắc hoặc giúp giải quyết các vấn đề thực tế.'
      },
      {
        title: 'hợp tác quốc tế',
        description: 'Mỗi năm chúng tôi có nhiều sự kiện và chương trình học trực tiếp, mở ra cơ hội gặp gỡ chuyên gia và học viên quốc tế.'
      },
      {
        title: 'Cá nhân hóa lộ trình',
        description: 'Lựa chọn khóa học phù hợp với nhu cầu cá nhân đưa bạn nhanh đến điều bạn ước muốn.'
      },
      {
        title: 'đội ngũ hỗ trợ liên tục',
        description: 'Đội ngũ hỗ trợ của N-Edu luôn sẵn sàng giải đáp thắc mắc của bạn và đảm bảo những quyền lợi của bạn.'
      }
    ]
  }
]

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find(course => course.slug === slug)
}

export function getCoursesByMode(mode: 'offline' | 'online'): Course[] {
  return courses.filter(course => course.mode === mode)
}
