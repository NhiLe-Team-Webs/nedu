'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

const filters = [
  { id: 'all', label: 'Tat ca' },
  { id: 'offline', label: 'Offline' },
  { id: 'online', label: 'Online' },
  { id: 'business', label: 'Doanh nghiep' },
]

const courseCatalog = [
  {
    id: 'la-chinh-minh',
    slug: 'la-chinh-minh',
    title: 'Là chính mình 3',
    price: null,
    originalPrice: null,
    image: 'https://nedu.nhi.sg/images/lachinhminh.png',
    tags: ['Phat trien ban than', 'Offline'],
    mode: 'offline',
    duration: '3,5 ngày',
    instructor: 'NhiLe x Guest Instructors',
    link: '/program-offline/la-chinh-minh',
  },
  {
    id: 'suc-manh-vo-han',
    slug: 'suc-manh-vo-han',
    title: 'Sức mạnh vô hạn',
    price: 180000000,
    originalPrice: 575000000,
    image: 'https://nedu.nhi.sg/images/lachinhminh.png',
    tags: ['Doanh nghiep', 'Offline'],
    mode: 'offline',
    duration: '6 tháng online + 4,5 ngày offline',
    instructor: 'Mel x NhiLe',
    link: '/program-offline/suc-manh-vo-han',
  },
  {
    id: 'ai-for-business-communication',
    slug: 'ai-for-business-communication',
    title: 'AI for Business Communication',
    price: null,
    originalPrice: null,
    image: 'https://nedu.nhi.sg/images/thum_yt_2.png',
    tags: ['Online', 'AI', 'Giao tiep kinh doanh'],
    mode: 'online',
    duration: '3 buổi',
    instructor: 'Linda Hui',
    link: '/program-online/ai-for-business-communication',
  },
  {
    id: 'ai-in-marketing',
    slug: 'ai-in-marketing',
    title: 'AI In Marketing',
    price: null,
    originalPrice: null,
    image: 'https://nedu.nhi.sg/images/thum_yt_3.png',
    tags: ['Online', 'AI', 'Marketing'],
    mode: 'online',
    duration: '2 ngày',
    instructor: 'Linda Hui',
    link: '/program-online/ai-in-marketing',
  },
  {
    id: 'cuoc-song-cua-ban',
    slug: 'cuoc-song-cua-ban',
    title: 'Cuộc sống của bạn',
    price: null,
    originalPrice: null,
    image: 'https://nedu.nhi.sg/images/cuocsongcuaban.png',
    tags: ['Online', 'Phat trien ban than'],
    mode: 'online',
    duration: '3 ngày',
    instructor: 'NhiLe',
    link: '/program-online/cuoc-song-cua-ban',
  },
  {
    id: 'gen-ai-101',
    slug: 'gen-ai-101',
    title: 'Gen AI 101',
    price: null,
    originalPrice: null,
    image: 'https://nedu.nhi.sg/images/thum_yt_1.png',
    tags: ['Online', 'AI', 'Ky nang so'],
    mode: 'online',
    duration: '2 buổi',
    instructor: 'Linda Hui',
    link: '/program-online/gen-ai-101',
  },
  {
    id: 'thuong-hieu-cua-ban',
    slug: 'thuong-hieu-cua-ban',
    title: 'Thương hiệu của bạn',
    price: null,
    originalPrice: null,
    image: 'https://nedu.nhi.sg/images/thuonghieucuaban.png',
    tags: ['Online', 'Doanh nghiep'],
    mode: 'online',
    duration: '4 ngày',
    instructor: 'NhiLe',
    link: '/program-online/thuong-hieu-cua-ban',
  },
]

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
})

export default function ProgramPage() {
  const [filter, setFilter] = useState('all')

  const filteredCourses = useMemo(() => {
    if (filter === 'offline') return courseCatalog.filter((course) => course.mode === 'offline')
    if (filter === 'online') return courseCatalog.filter((course) => course.mode === 'online')
    if (filter === 'business')
      return courseCatalog.filter((course) => course.tags.includes('Doanh nghiep'))
    return courseCatalog
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
              <Link href={course.link}>
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
              </Link>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {course.tags.map((tag, tagIndex) => (
                    <span
                      key={`${course.id}-${tag}-${tagIndex}`}
                      className="text-xs bg-amber-100 text-amber-600 px-3 py-1 rounded-full font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={course.link}>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 hover:text-primary transition">
                    {course.title}
                  </h3>
                </Link>
                <div className="flex items-baseline gap-3 mb-4">
                  <div className="text-xl font-extrabold text-primary">
                    {course.price !== null ? currencyFormatter.format(course.price) : 'Liên hệ'}
                  </div>
                  {course.originalPrice && (
                    <div className="text-sm text-gray-400 line-through">
                      {currencyFormatter.format(course.originalPrice)}
                    </div>
                  )}
                </div>
                <div className="space-y-2 text-sm text-gray-700 mb-4">
                  <div className="flex items-center gap-2">
                    <span role="img" aria-label="duration">
                      📚
                    </span>
                    <p>
                      So buoi hoc:{' '}
                      <span className="font-semibold text-gray-900">{course.duration}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span role="img" aria-label="mentor">
                      👩‍🏫
                    </span>
                    <p>
                      Nguoi dan duong:{' '}
                      <span className="font-semibold text-gray-900">{course.instructor}</span>
                    </p>
                  </div>
                </div>
                <p className="mt-auto text-sm text-gray-500 italic">
                  Dang mo dang ky. Vui long lien he de biet them chi tiet.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
