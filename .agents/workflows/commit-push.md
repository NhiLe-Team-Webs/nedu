---
description: Commit các thay đổi theo chuẩn Conventional Commits và push lên repository.
---

# /commit-push - Tự động Commit & Push

Dùng để nhanh chóng lưu lại các thay đổi và đẩy lên remote branch.

---

## 🛠 Quy trình thực hiện

1. **Kiểm tra thay đổi**:
   - Kiểm tra các file đã thay đổi bằng lệnh `git status`.
   - Xem nội dung thay đổi bằng lệnh `git diff --cached` (nếu đã stage) hoặc `git diff`.

2. **Viết Commit Message**:
   - Sử dụng skill `commit-writer` (global skill) để tạo message.
   - Phân loại theo: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`.
   - Message phải ngắn gọn, súc tích và đúng trọng tâm.

3. **Thực thi lệnh Git**:
| Bước | Lệnh thực thi | Ghi chú |
| :--- | :--- | :--- |
| **1.** | `git add .` | Thêm tất cả thay đổi vào staging area |
| **2.** | `git commit -m "[message]"` | Thực hiện commit với message từ `commit-writer` |
| **3.** | `git push` | Đẩy thay đổi lên remote branch hiện tại |

4. **Xác nhận kết quả**:
   - Thông báo cho người dùng sau khi commit và push thành công.
   - Nếu có lỗi (conflict, permission...), hãy báo cáo lại ngay lập tức và hướng dẫn cách xử lý.

---

## ⚠️ Lưu ý
- Luôn sử dụng tiếng Anh cho commit message theo chuẩn Conventional Commits.
- Không lạm dụng `git push --force` trừ khi được yêu cầu cụ thể.
- Nếu có quá nhiều thay đổi không liên quan, hãy gợi ý người dùng tách commit để lịch sử git được sạch sẽ.

---

## 💡 Ví dụ lệnh
- `/commit-push`
- `/commit-push hoàn thành tính năng authentication`
- `/commit-push fix lỗi hiển thị trên mobile`
