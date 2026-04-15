---
description: Giải thích kiến thức, code, lỗi một cách chuyên nghiệp và dễ hiểu.
---

# /explain - Giải thích & Phân tích chuyên sâu

Dùng để giải thích code, khái niệm mới hoặc phân tích bug.

---

## 🛠 Cách thực hiện

Khi được yêu cầu giải thích, hãy thực hiện theo các bước sau:

1. **Thu thập thông tin**:
   - Xác định đoạn code, file hoặc thông báo lỗi cần giải thích.
   - Đọc kỹ ngữ cảnh xung quanh.

2. **Sử dụng Skill `dev-explainer`**:
   - Sử dụng các nguyên tắc từ skill `dev-explainer` (global skill) để trình bày.
   - Tập trung vào: Mục đích, Luồng thực thi, Khái niệm then chốt.

3. **Phân loại nội dung giải thích**:

   ### A. Giải thích Code/Kiến thức mới
   - **Mục đích**: Tại sao đoạn code này tồn tại?
   - **Luồng hoạt động**: Chạy từ đâu đến đâu? logic chính là gì?
   - **Khái niệm mới**: Giải thích ngắn gọn các thuật ngữ chuyên môn nếu có.

   ### B. Giải thích Bug/Lỗi
   - **Hiện tượng**: Lỗi gì đang xảy ra?
   - **Nguyên nhân**: Tại sao lại lỗi? (Phân tích sâu vào cơ chế).
   - **Vị trí**: Lỗi ở dòng nào, file nào?
   - **Giải pháp**: Đưa ra cách sửa cụ thể và tối ưu.

4. **Phong cách trình bày**:
   - Ngắn gọn, đầy đủ, chuyên nghiệp.
   - Tránh dùng các từ ngữ quá trừu tượng mà không có ví dụ.
   - Trình bày dưới dạng Markdown dễ đọc (sử dụng Header, List, Code Block).

---

## 📝 Định dạng đầu ra gợi ý

### 💡 Giải thích: [Tên khái niệm/Đoạn code]
- **Mục đích**: ...
- **Cách thức hoạt động**: ...
- **Lưu ý quan trọng**: ...

### ⚙️ Phối hợp sửa lỗi: [Tên lỗi]
- **Lỗi**: `[Thông báo lỗi]`
- **Tại sao**: [Lý do gây lỗi]
- **Ở đâu**: `[đường dẫn file]:[dòng]`
- **Giải pháp**: 
```[ngôn ngữ]
// Sửa đổi như sau...
```

---

## 💡 Ví dụ lệnh
- `/explain đoạn code này làm gì?`
- `/explain tại sao lỗi 404 ở API này?`
- `/explain kiến thức về React Server Components`
