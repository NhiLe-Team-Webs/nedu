# N-Edu Clone - Educational Platform

## Overview

N-Edu is an educational technology platform designed to bring high-quality education to Vietnamese people. The platform's mission is "Mang kiến thức, giáo dục chất lượng trên toàn thế giới về Việt Nam và hòa hợp với văn hóa người Việt" (Bringing world-class knowledge and education to Vietnam, harmonized with Vietnamese culture).

The application serves as a course marketplace featuring both online and offline educational programs across multiple categories including personal development, business, AI/technology, branding, and marketing. The platform enables course discovery, registration, and payment processing for Vietnamese learners.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** Next.js 16 with React 19
- **Rendering Strategy:** Client-side rendering with 'use client' directives for interactive components
- **Routing:** Next.js App Router (app directory structure)
- **Styling:** Tailwind CSS 3.4 with custom color scheme (primary yellow: #FDB913)
- **TypeScript:** Strict mode enabled for type safety

**UI Components:**
- Modular component structure (Header, Footer, Sidebar)
- Embedded YouTube videos via react-youtube library
- Interactive Swiper carousel on homepage with responsive breakpoints (1 slide mobile, 2 tablet, 3 desktop)
- Course data dynamically rendered from centralized data/courses.ts
- Responsive design with mobile-first approach

**Rationale:** Next.js provides excellent SEO capabilities and performance optimization for an educational content site. The App Router enables modern React features and improved developer experience. Tailwind CSS allows rapid UI development with consistent design patterns.

### Content Management

**Static Content Approach:**
- Course data centralized in `data/courses.ts` with TypeScript interfaces
- 7 courses total: 2 offline (Sức Mạnh Vô Hạn, Là Chính Mình), 5 online (Gen AI 101, Thương Hiệu Của Bạn, Cuộc Sống Của Bạn, AI for Business Communication, AI in Marketing)
- Static page generation for course detail pages
- Course data consumed by homepage carousel and detail pages

**Data Structure:**
- TypeScript interfaces: Course, Instructor, CourseInfo, Audience, Privilege
- Course categories: offline/online with category tags
- Instructor profiles with bio, education, social links
- Pricing in both VND and USD currencies
- Course metadata: topic, schedule, sessions, location, capacity
- Testimonials (YouTube video IDs), curriculum images, audience targeting
- 6 standard privileges per course (community, lifetime re-learning, post-course support, international collaboration, personalized path, continuous team support)

**Rationale:** For a relatively small number of courses with infrequent updates, TypeScript-based content management provides type safety without the overhead of a CMS. This approach simplifies deployment and reduces dependencies.

### Page Architecture

**Route Structure:**
- `/` - Homepage with hero video and Swiper carousel showcasing all courses
- `/program` - Course catalog with filtering
- `/program-online/[slug]` - Online course detail pages (5 courses: Gen AI 101, Thương Hiệu, Cuộc Sống, AI Business, AI Marketing)
- `/program-offline/[slug]` - Offline course detail pages (2 courses: Sức Mạnh Vô Hạn, Là Chính Mình)
- `/thu-thach-30-ngay` - 30-day challenge program
- `/contact` - Contact form
- `/payment/[id]` - Payment flow pages
- `/guide-payment` - Step-by-step payment guide with screenshots (5 steps)
- `/policy`, `/terms` - Legal pages

**Rationale:** Clear URL structure aids SEO and user navigation. Separation of online/offline courses allows for different presentation and registration flows. Homepage carousel provides dynamic course discovery.

### Form Handling

**Current Implementation:**
- Client-side form state management with React hooks
- Basic validation through HTML5 form attributes
- Demo submission handlers (no backend integration yet)

**Design Decision:** Forms are prepared for future backend integration. The current implementation focuses on UI/UX while maintaining flexibility for API endpoint connections.

### Media Strategy

**External Assets:**
- Images hosted on nedu.nhi.sg domain
- YouTube video embeds for course previews
- Remote image patterns configured in next.config.js

**Rationale:** Using external CDN for images reduces repository size and leverages existing infrastructure. YouTube embeds provide reliable video hosting without bandwidth costs.

### Internationalization

**Language:** Vietnamese (vi)
- All content in Vietnamese language
- Currency display in VND
- Date formats following Vietnamese conventions

**Rationale:** Single-language approach simplifies initial development while serving the target Vietnamese market effectively.

## External Dependencies

### Third-Party Libraries

**Core Framework:**
- `next` (16.0.3) - React framework for production
- `react` & `react-dom` (19.2.0) - UI library

**Styling:**
- `tailwindcss` (3.4.18) - Utility-first CSS framework
- `@tailwindcss/postcss` (4.1.17) - Tailwind PostCSS plugin
- `autoprefixer` (10.4.22) - CSS vendor prefixing

**UI Components:**
- `react-youtube` (10.1.0) - YouTube player component
- `swiper` (12.0.3) - Mobile-friendly carousel/slider

**Development:**
- `typescript` (5.9.3) - Type checking and developer experience
- `@types/node`, `@types/react`, `@types/react-dom` - TypeScript definitions

### External Services

**Video Platform:**
- YouTube - Video hosting and streaming (embedded via react-youtube)
- Video IDs referenced: HJ1x2IRMoqM (primary hero video)

**Image Hosting:**
- nedu.nhi.sg - Primary image CDN
- i.ytimg.com - YouTube thumbnail images

**Social Media Integration:**
- Facebook: MsNhiSG
- LinkedIn: company/n-edu
- Instagram: @msnhi_podcast
- YouTube: @Msnhi
- TikTok: @nedu.sg
- Telegram: @neducationvn

**Payment Gateway:**
- VNPAY - Vietnamese payment processor (referenced in terms/policy, integration pending)

**External Links:**
- nhi.sg - Company website
- Google Forms - 30-day challenge registration

### Future Integration Points

**Database Requirements:**
- User registration and authentication system
- Course enrollment tracking
- Payment transaction records
- User profile management
- Progress tracking for courses

**Email Services:**
- Registration confirmations
- Payment receipts
- Course updates and notifications
- Support communication (nedu@nhi.sg)

**Analytics:**
- User behavior tracking
- Course popularity metrics
- Conversion funnel analysis

**Rationale:** The architecture is designed to accommodate these integrations without major refactoring. The current static approach provides a foundation that can be enhanced with dynamic features as the platform scales.