# Danh Sách Module - Dự Án N-Edu

## Bảng Tổng Quan Module

| Module | Mô tả |
|--------|-------|
| **Home Page** | Trang chủ với video giới thiệu, hiển thị các section: Courses, Mission, Support, Testimonials, Privilege, Partners và Connection. Giao diện responsive cho cả desktop và mobile. |
| **Header & Navigation** | Thanh điều hướng cố định (sticky header) với logo, menu chính (Trang chủ, Về chúng tôi, Khóa học, Thử thách 30N, Liên hệ), icon giỏ hàng với badge hiển thị số lượng sản phẩm, và menu hamburger cho mobile. |
| **Courses (Khóa học)** | Carousel hiển thị các khóa học với hình ảnh, tiêu đề, ngày bắt đầu và phân loại (Online/Offline). Hỗ trợ điều hướng bằng chuột, touch và click. Tự động điều chỉnh số lượng hiển thị theo kích thước màn hình. |
| **Mission (Sứ mệnh)** | Giới thiệu sứ mệnh của N-Edu với quote, thông tin về founder Nhi Le, ảnh đại diện và các liên kết mạng xã hội (LinkedIn, Facebook, Instagram). Giao diện responsive với typography động. |
| **Support (Hỗ trợ)** | Form đăng ký nhận tư vấn với input email và nút gửi. Thiết kế nổi bật với màu vàng cam (#F7B50C), animation hover và hiệu ứng chuyển đổi mượt mà. |
| **Testimonials (Cảm nhận)** | Hiển thị video testimonial từ học viên (YouTube và Facebook embeds) với caption mô tả. Layout grid responsive và nút CTA tùy chỉnh (link hoặc add to cart). |
| **Privilege (Đặc quyền)** | Grid 3 cột hiển thị các quyền lợi học viên: tham gia cộng đồng, học lại trọn đời, hỗ trợ sau khóa học, hợp tác quốc tế, cá nhân hóa lộ trình và hỗ trợ 24/7. Mỗi item có icon, tiêu đề và mô tả với hiệu ứng hover. |
| **Partners (Đối tác)** | Hiển thị logo 30+ đối tác (NLF, Family Cloud, S&W, Nhi's House, Factor Method, Meta...) trong 2 hàng với grid responsive. Mỗi logo có glassmorphism effect, hover animation và fallback text nếu ảnh lỗi. |
| **Connection (Kết nối)** | Bộ sưu tập hình ảnh masonry grid 4 cột với các bức ảnh từ cộng đồng N-Edu. Có nút kết nối Facebook với icon và link trực tiếp đến fanpage. |
| **Shopping Cart** | Giỏ hàng với quản lý số lượng khóa học, tính tổng tiền tự động, cập nhật/xóa sản phẩm. Context API để chia sẻ state giữa các component. Hiển thị badge số lượng trên header. |
| **Checkout & Payment** | Trang thanh toán với form đa bước: nhập thông tin → xác nhận → thanh toán. Tích hợp VNPay payment gateway, hỗ trợ mã giảm giá, hiển thị summary đơn hàng và xử lý response từ cổng thanh toán. |
| **Program Pages** | Các trang chi tiết khóa học (Là Chính Mình, Sức Mạnh Vô Hạn, AI for Business, AI in Marketing, Gen AI 101...) với thông tin đầy đủ: mô tả, giá, instructor, curriculum và testimonial. |
| **Footer & Contact** | Footer với thông tin liên hệ, social media links và các trang policy/terms. Trang contact với form nhập thông tin và thông tin chi tiết về N-Education. |
| **Responsive Layout** | Hệ thống layout responsive toàn diện với breakpoints: mobile (< 640px), tablet (640-1024px), desktop (> 1024px). Sử dụng Tailwind CSS utility classes với container max-width 1280px. |
| **Google Analytics** | Tích hợp Google Analytics (GA4) với ID: G-BK6LMDZEH4 để theo dõi hành vi người dùng, conversion và performance của website. |
| **Error Handling** | Component ErrorHandler với global error catching cho payment pages, xử lý undefined variables và console error filtering. Cung cấp fallback UI khi có lỗi xảy ra. |

---

## Format Plain Text (Dễ copy)

```
Module                      | Mô tả
---------------------------|----------------------------------------------------------
Home Page                  | Trang chủ với video giới thiệu, hiển thị các section: Courses, Mission, Support, 
                           | Testimonials, Privilege, Partners và Connection. Giao diện responsive cho cả 
                           | desktop và mobile.
                           |
Header & Navigation        | Thanh điều hướng cố định (sticky header) với logo, menu chính (Trang chủ, 
                           | Về chúng tôi, Khóa học, Thử thách 30N, Liên hệ), icon giỏ hàng với badge 
                           | hiển thị số lượng sản phẩm, và menu hamburger cho mobile.
                           |
Courses (Khóa học)         | Carousel hiển thị các khóa học với hình ảnh, tiêu đề, ngày bắt đầu và phân 
                           | loại (Online/Offline). Hỗ trợ điều hướng bằng chuột, touch và click. Tự động 
                           | điều chỉnh số lượng hiển thị theo kích thước màn hình.
                           |
Mission (Sứ mệnh)          | Giới thiệu sứ mệnh của N-Edu với quote, thông tin về founder Nhi Le, ảnh 
                           | đại diện và các liên kết mạng xã hội (LinkedIn, Facebook, Instagram). Giao 
                           | diện responsive với typography động.
                           |
Support (Hỗ trợ)           | Form đăng ký nhận tư vấn với input email và nút gửi. Thiết kế nổi bật với 
                           | màu vàng cam (#F7B50C), animation hover và hiệu ứng chuyển đổi mượt mà.
                           |
Testimonials (Cảm nhận)    | Hiển thị video testimonial từ học viên (YouTube và Facebook embeds) với 
                           | caption mô tả. Layout grid responsive và nút CTA tùy chỉnh (link hoặc add 
                           | to cart).
                           |
Privilege (Đặc quyền)      | Grid 3 cột hiển thị các quyền lợi học viên: tham gia cộng đồng, học lại 
                           | trọn đời, hỗ trợ sau khóa học, hợp tác quốc tế, cá nhân hóa lộ trình và 
                           | hỗ trợ 24/7. Mỗi item có icon, tiêu đề và mô tả với hiệu ứng hover.
                           |
Partners (Đối tác)         | Hiển thị logo 30+ đối tác (NLF, Family Cloud, S&W, Nhi's House, Factor 
                           | Method, Meta...) trong 2 hàng với grid responsive. Mỗi logo có glassmorphism 
                           | effect, hover animation và fallback text nếu ảnh lỗi.
                           |
Connection (Kết nối)       | Bộ sưu tập hình ảnh masonry grid 4 cột với các bức ảnh từ cộng đồng N-Edu. 
                           | Có nút kết nối Facebook với icon và link trực tiếp đến fanpage.
                           |
Shopping Cart              | Giỏ hàng với quản lý số lượng khóa học, tính tổng tiền tự động, cập nhật/xóa 
                           | sản phẩm. Context API để chia sẻ state giữa các component. Hiển thị badge số 
                           | lượng trên header.
                           |
Checkout & Payment         | Trang thanh toán với form đa bước: nhập thông tin → xác nhận → thanh toán. 
                           | Tích hợp VNPay payment gateway, hỗ trợ mã giảm giá, hiển thị summary đơn 
                           | hàng và xử lý response từ cổng thanh toán.
                           |
Program Pages              | Các trang chi tiết khóa học (Là Chính Mình, Sức Mạnh Vô Hạn, AI for Business, 
                           | AI in Marketing, Gen AI 101...) với thông tin đầy đủ: mô tả, giá, instructor, 
                           | curriculum và testimonial.
                           |
Footer & Contact           | Footer với thông tin liên hệ, social media links và các trang policy/terms. 
                           | Trang contact với form nhập thông tin và thông tin chi tiết về N-Education.
                           |
Responsive Layout          | Hệ thống layout responsive toàn diện với breakpoints: mobile (< 640px), 
                           | tablet (640-1024px), desktop (> 1024px). Sử dụng Tailwind CSS utility classes 
                           | với container max-width 1280px.
                           |
Google Analytics           | Tích hợp Google Analytics (GA4) với ID: G-BK6LMDZEH4 để theo dõi hành vi 
                           | người dùng, conversion và performance của website.
                           |
Error Handling             | Component ErrorHandler với global error catching cho payment pages, xử lý 
                           | undefined variables và console error filtering. Cung cấp fallback UI khi có 
                           | lỗi xảy ra.
```

---

## Danh Sách Ngắn Gọn

1. **Home Page** - Trang chủ tổng hợp tất cả sections
2. **Header & Navigation** - Thanh điều hướng với cart badge
3. **Courses** - Carousel khóa học với touch/mouse support
4. **Mission** - Giới thiệu sứ mệnh và founder
5. **Support** - Form đăng ký nhận tư vấn
6. **Testimonials** - Video cảm nhận học viên
7. **Privilege** - 6 đặc quyền học viên
8. **Partners** - Grid 30+ đối tác
9. **Connection** - Masonry gallery cộng đồng
10. **Shopping Cart** - Giỏ hàng với Context API
11. **Checkout & Payment** - Multi-step checkout + VNPay
12. **Program Pages** - 7 trang chi tiết khóa học
13. **Footer & Contact** - Thông tin liên hệ
14. **Responsive Layout** - Mobile-first Tailwind CSS
15. **Google Analytics** - GA4 tracking
16. **Error Handling** - Global error boundary

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI:** Radix UI, Lucide React
- **State:** React Context API
- **Payment:** VNPay
- **Analytics:** Google Analytics GA4
- **Carousel:** Swiper, Embla Carousel
- **Video:** React YouTube
