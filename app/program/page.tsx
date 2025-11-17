'use client'

import { useMemo, useState, MouseEvent, KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { courses } from '@/data/courses'

// Course data based on actual course pages in folders
const coursesData = [
  // Offline courses
  {
    id: 1,
    slug: 'la-chinh-minh',
    mode: 'offline',
    title: 'Là Chính Mình 03',
    category: ['Phát triển bản thân', 'Là chính mình'],
    heroImage: 'https://nedu.nhi.sg/images/lachinhminh.png',
    info: {
      sessions: '3,5 ngày',
      instructor: 'NhiLe x Guest Instructors'
    }
  },
  {
    id: 2,
    slug: 'suc-manh-vo-han',
    mode: 'offline',
    title: 'Sức Mạnh Vô Hạn',
    category: ['Doanh nhân', 'Doanh nghiệp'],
    heroImage: 'https://nedu.nhi.sg/images/2_3.jpg',
    info: {
      sessions: '6 tháng online và 4,5 ngày offline',
      instructor: 'Mel x NhiLe'
    }
  },
  // Online courses
  {
    id: 3,
    slug: 'gen-ai-101',
    mode: 'online',
    title: 'GEN AI 101',
    category: ['AI'],
    heroImage: 'https://nedu.nhi.sg/images/thum_yt_1.png',
    info: {
      sessions: '2 buổi',
      instructor: 'Linda Hui-Isaac'
    }
  },
  {
    id: 4,
    slug: 'thuong-hieu-cua-ban',
    mode: 'online',
    title: 'Thương Hiệu Của Bạn',
    category: ['Thương hiệu'],
    heroImage: 'https://nedu.nhi.sg/images/thuonghieucuaban.png',
    info: {
      sessions: '4 buổi',
      instructor: 'NhiLe'
    }
  },
  {
    id: 5,
    slug: 'cuoc-song-cua-ban',
    mode: 'online',
    title: 'CUỘC SỐNG CỦA BẠN',
    category: ['Phát triển bản thân'],
    heroImage: 'https://nedu.nhi.sg/images/cuocsongcuaban.png',
    info: {
      sessions: '3 buổi',
      instructor: 'NhiLe'
    }
  },
  {
    id: 6,
    slug: 'ai-for-business-communication',
    mode: 'online',
    title: 'AI FOR BUSINESS COMMUNICATION',
    category: ['Trí tuệ nhân tạo ứng dụng'],
    heroImage: 'https://nedu.nhi.sg/images/thum_yt_2.png',
    info: {
      sessions: '3 buổi',
      instructor: 'Linda Hui-Isaac'
    }
  },
  {
    id: 7,
    slug: 'ai-in-marketing',
    mode: 'online',
    title: 'CERTIFIED GEN AI FOUNDATION IN MARKETING & BUSINESS STRATEGY',
    category: ['Marketing số'],
    heroImage: 'https://nedu.nhi.sg/images/thum_yt_3.png',
    info: {
      sessions: '2 buổi',
      instructor: 'Linda Hui-Isaac'
    }
  }
]

const filters = [
  { id: 'all', label: 'Tất cả' },
  { id: 'offline', label: 'Offline' },
  { id: 'online', label: 'Online' },
  { id: 'business', label: 'Doanh nghiệp' },
]

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export default function ProgramPage() {
  const [filter, setFilter] = useState('all')
  const { addToCart } = useCart()
  const router = useRouter()

  const handleCardMouseMove = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2
    const rotateX = clamp((-offsetY / (rect.height / 2)) * 4, -6, 6)
    const rotateY = clamp((offsetX / (rect.width / 2)) * 4, -6, 6)

    card.style.willChange = 'transform'
    card.style.transition = 'transform 80ms ease-out'
    card.style.transform = `perspective(900px) scale(1.01) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleCardMouseLeave = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget
    card.style.transition = 'transform 160ms ease'
    card.style.transform = ''
  }

  const navigateToCourse = (mode: string, slug: string) => {
    router.push(`/program-${mode}/${slug}`)
  }

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>, mode: string, slug: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      navigateToCourse(mode, slug)
    }
  }

  const filteredCourses = useMemo(() => {
    if (filter === 'offline') return coursesData.filter((course) => course.mode === 'offline')
    if (filter === 'online') return coursesData.filter((course) => course.mode === 'online')
    if (filter === 'business')
      return coursesData.filter((course) => course.category.includes('Doanh nghiệp') || course.category.includes('Doanh nhân'))
    return coursesData
  }, [filter])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary uppercase">
          Các khóa học chất lượng
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
          Lựa chọn chương trình phù hợp với hành trình phát triển bản thân và doanh nghiệp của
          bạn. Mỗi khóa học đều đi kèm công cụ thực hành và có thể tham gia ngay.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                filter === item.id ? 'bg-primary text-white' : 'bg-white text-gray-700 shadow-sm'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredCourses.map((course) => (
            <article
              key={course.id}
              role="button"
              tabIndex={0}
              aria-label={`Xem chi tiết ${course.title}`}
              onClick={() => navigateToCourse(course.mode, course.slug)}
              onKeyDown={(event) => handleCardKeyDown(event, course.mode, course.slug)}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="bg-white rounded-[24px] shadow-md hover:shadow-lg transition flex flex-col overflow-hidden border border-gray-100 min-h-[360px] w-full cursor-pointer"
            >
              <img
                src={course.heroImage}
                alt={course.title}
                className="w-full h-42 object-cover"
              />
              <div className="p-5 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {course.category.map((category) => (
                    <span
                      key={category}
                      className="text-xs bg-amber-100 text-amber-600 px-3 py-1 rounded-full font-semibold"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 hover:text-primary transition">
                  {course.title}
                </h3>
                <div className="space-y-2 text-sm text-gray-700 mb-4">
                  <div className="flex items-center gap-2">
                    <span role="img" aria-label="duration">
                      📚
                    </span>
                    <p>
                      Số buổi:{' '}
                      <span className="font-semibold text-gray-900">{course.info.sessions}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span role="img" aria-label="mentor">
                      👩‍🏫
                    </span>
                    <p>
                      Giảng viên:{' '}
                      <span className="font-semibold text-gray-900">{course.info.instructor}</span>
                    </p>
                  </div>
                </div>
                <div className="mt-auto flex gap-3">
                  <button
                    onClick={(event) => {
                      event.stopPropagation()
                      addToCart(courses.find(c => c.id === course.id)!)
                    }}
                    className="btn-secondary flex-1"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
