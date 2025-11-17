'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ProgramPage() {
  const [filter, setFilter] = useState('all')

  const courses = [
    {
      id: 1,
      title: 'Sức Mạnh Vô Hạn 2',
      tags: ['Doanh nhân', 'Doanh nghiệp'],
      duration: '6 tháng online và 4,5 ngày offline',
      instructor: 'NhiLe x Melvin',
      image: 'https://nedu.nhi.sg/images/2_3.jpg',
      link: '/program-offline/suc-manh-vo-han',
      type: 'offline'
    },
    {
      id: 2,
      title: 'Là chính mình 3',
      tags: ['Phát triển bản thân', 'Là chính mình'],
      duration: '3,5 ngày',
      instructor: 'NhiLe x Guest Instructors',
      image: 'https://nedu.nhi.sg/images/1_3.jpg',
      link: '/program-offline/la-chinh-minh',
      type: 'offline'
    },
    {
      id: 3,
      title: 'Gen AI 101',
      tags: ['AI', 'Phát triển kỹ năng số'],
      duration: '2 buổi',
      instructor: 'Linda Hui',
      image: 'https://nedu.nhi.sg/images/thum_yt_1.png',
      link: '/program-online/gen-ai-101',
      type: 'online'
    },
    {
      id: 4,
      title: 'Thương hiệu của bạn',
      tags: ['Thương hiệu', 'Doanh nghiệp'],
      duration: '4 ngày',
      instructor: 'NhiLe',
      image: 'https://nedu.nhi.sg/images/thuonghieucuaban.png',
      link: '/program-online/thuong-hieu-cua-ban',
      type: 'online'
    },
    {
      id: 5,
      title: 'Cuộc sống của bạn',
      tags: ['Phát triển bản thân', 'Cảm xúc'],
      duration: '3 ngày',
      instructor: 'NhiLe',
      image: 'https://nedu.nhi.sg/images/cuocsongcuaban.png',
      link: '/program-online/cuoc-song-cua-ban',
      type: 'online'
    },
    {
      id: 6,
      title: 'AI for Business Communication',
      tags: ['AI'],
      duration: '3 buổi',
      instructor: 'Linda Hui',
      image: 'https://nedu.nhi.sg/images/thum_yt_2.png',
      link: '/program-online/ai-for-business-communication',
      type: 'online'
    },
    {
      id: 7,
      title: 'AI In Marketing',
      tags: ['Marketing số'],
      duration: '2 ngày',
      instructor: 'Linda Hui',
      image: 'https://nedu.nhi.sg/images/thum_yt_3.png',
      link: '/program-online/ai-in-marketing',
      type: 'online'
    },
  ]

  const filteredCourses = filter === 'all' 
    ? courses 
    : filter === 'offline'
    ? courses.filter(c => c.type === 'offline')
    : filter === 'online'
    ? courses.filter(c => c.type === 'online')
    : courses.filter(c => c.tags.includes('Doanh nghiệp'))

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
          CÁC KHÓA HỌC CHẤT LƯỢNG
        </h1>

        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filter === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter('offline')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filter === 'offline' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Offline
          </button>
          <button
            onClick={() => setFilter('online')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filter === 'online' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Online
          </button>
          <button
            onClick={() => setFilter('business')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filter === 'business' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Doanh nghiệp
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredCourses.map((course) => (
            <Link key={course.id} href={course.link} className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <img src={course.image} alt={course.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {course.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">📚 Số buổi học: <span className="font-semibold">{course.duration}</span></p>
                  <p className="text-sm text-gray-600">👨‍🏫 Người dẫn đường: <span className="font-semibold">{course.instructor}</span></p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
