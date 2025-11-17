'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

// Course data based on actual course pages in the folders
const coursesData = [
  // Offline courses
  {
    id: 1,
    slug: 'la-chinh-minh',
    mode: 'offline',
    title: 'Là Chính Mình 03',
    category: ['Phát triển bản thân', 'Là chính mình'],
    heroImage: 'https://nedu.nhi.sg/images/1_3.jpg',
    price: {
      amount: '59.696.000',
      currency: 'VNĐ'
    },
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
    price: {
      amount: '23.960',
      currency: 'USD'
    },
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
    price: {
      amount: '13.069.000',
      currency: 'VNĐ'
    },
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
    price: {
      amount: '18.960.000',
      currency: 'VNĐ'
    },
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
    price: {
      amount: '18.960.000',
      currency: 'VNĐ'
    },
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
    price: {
      amount: '23.609.000',
      currency: 'VNĐ'
    },
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
    price: {
      amount: '28.985.000',
      currency: 'VNĐ'
    },
    info: {
      sessions: '2 buổi',
      instructor: 'Linda Hui-Isaac'
    }
  }
]

const filters = [
  { id: 'all', label: 'Tat ca' },
  { id: 'offline', label: 'Offline' },
  { id: 'online', label: 'Online' },
  { id: 'business', label: 'Doanh nghiep' },
]

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
})

export default function ProgramPage() {
  const [filter, setFilter] = useState('all')

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
          Cac khoa hoc chat luong
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
          Lua chon chuong trinh phu hop voi hanh trinh phat trien ban than va doanh nghiep cua
          ban. Moi khoa hoc deu di kem cong cu thuc hanh va co the tham gia ngay.
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
              className="bg-white rounded-[24px] shadow-md hover:shadow-lg transition flex flex-col overflow-hidden border border-gray-100 min-h-[360px] w-full"
            >
              <Link href={`/program-${course.mode}/${course.slug}`}>
                <img
                  src={course.heroImage}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
              </Link>
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
                <Link href={`/program-${course.mode}/${course.slug}`}>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 hover:text-primary transition">
                    {course.title}
                  </h3>
                </Link>
                <div className="flex items-baseline gap-3 mb-4">
                  <div className="text-xl font-extrabold text-primary">
                    {course.price.currency === 'VNĐ'
                      ? currencyFormatter.format(parseInt(course.price.amount.replace(/\./g, '')))
                      : `${course.price.currency} ${course.price.amount}`
                    }
                  </div>
                </div>
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
                      Người dẫn đường:{' '}
                      <span className="font-semibold text-gray-900">{course.info.instructor}</span>
                    </p>
                  </div>
                </div>
                <Link
                  href={`/program-${course.mode}/${course.slug}`}
                  className="mt-auto w-full bg-primary text-white font-semibold uppercase tracking-wide py-3 rounded-full shadow hover:bg-primary/90 transition text-center"
                >
                  Xem chi tiết
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
