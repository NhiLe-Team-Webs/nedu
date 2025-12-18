
import { Course } from './courses';

export const testingCourses: Course[] = [
    {
        id: 1001,
        slug: 'testing-course-1',
        mode: 'offline',
        title: 'Khóa học Test 1 (2k)',
        category: ['Testing', 'Offline'],
        heroImage: '/picture/suc_manh_vo_han.jpg',
        price: {
            amount: '2.000',
            currency: 'VNĐ'
        },
        paymentId: 9901,
        info: {
            topic: 'Testing Topic 1',
            schedule: 'Testing Schedule',
            instructor: 'Test Instructor',
            sessions: '1 Session',
            location: 'Test Location',
            capacity: 'Unlimited'
        },
        mission: 'Testing Mission 1',
        testimonials: [],
        instructors: [],
        audience: [],
        privileges: []
    },
    {
        id: 1002,
        slug: 'testing-course-2',
        mode: 'online',
        title: 'Khóa học Test 2 (3k)',
        category: ['Testing', 'Online'],
        heroImage: '/picture/la_chinh_minh.jpg',
        price: {
            amount: '3.000',
            currency: 'VNĐ'
        },
        paymentId: 9902,
        info: {
            topic: 'Testing Topic 2',
            schedule: 'Testing Schedule',
            instructor: 'Test Instructor',
            sessions: '1 Session',
            location: 'Online',
            capacity: 'Unlimited'
        },
        mission: 'Testing Mission 2',
        testimonials: [],
        instructors: [],
        audience: [],
        privileges: []
    },
    {
        id: 1003,
        slug: 'testing-course-3',
        mode: 'offline',
        title: 'Khóa học Test 3 (4k)',
        category: ['Testing', 'Offline'],
        heroImage: '/picture/thuong_hieu_cua_ban.png',
        price: {
            amount: '4.000',
            currency: 'VNĐ'
        },
        paymentId: 9903,
        info: {
            topic: 'Testing Topic 3',
            schedule: 'Testing Schedule',
            instructor: 'Test Instructor',
            sessions: '1 Session',
            location: 'Test Location',
            capacity: 'Unlimited'
        },
        mission: 'Testing Mission 3',
        testimonials: [],
        instructors: [],
        audience: [],
        privileges: []
    },
    {
        id: 1004,
        slug: 'testing-course-4',
        mode: 'online',
        title: 'Khóa học Test 4 (5k)',
        category: ['Testing', 'Online'],
        heroImage: '/picture/cuoc_song_cua_ban.png',
        price: {
            amount: '5.000',
            currency: 'VNĐ'
        },
        paymentId: 9904,
        info: {
            topic: 'Testing Topic 4',
            schedule: 'Testing Schedule',
            instructor: 'Test Instructor',
            sessions: '1 Session',
            location: 'Online',
            capacity: 'Unlimited'
        },
        mission: 'Testing Mission 4',
        testimonials: [],
        instructors: [],
        audience: [],
        privileges: []
    }
];
