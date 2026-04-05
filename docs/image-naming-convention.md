# Image Naming Convention

## Quy ước đặt tên ảnh cho khóa học

Để hỗ trợ responsive images (desktop và mobile), tất cả ảnh khóa học nên tuân theo quy ước sau:

### 1. Quy tắc đặt tên file

```
{course_slug}_desktop.{ext}  // Ảnh cho desktop
{course_slug}_mobile.{ext}   // Ảnh cho mobile
```

**Ví dụ:**
- `thuonghieucuaban_desktop.svg`
- `thuonghieucuaban_mobile.svg`
- `30days_desktop.svg`
- `30days_mobile.svg`

### 2. Cấu trúc thư mục

```
public/
├── course/           # Ảnh khóa học online (SVG format)
│   ├── thuonghieucuaban_desktop.svg
│   ├── thuonghieucuaban_mobile.svg
│   ├── cuocsongcuaban_desktop.svg
│   ├── cuocsongcuaban_mobile.svg
│   └── 30days_desktop.svg
│   └── 30days_mobile.svg
└── picture/          # Ảnh khóa học offline (JPG/PNG format)
    ├── suc_manh_vo_han.jpg
    └── la_chinh_minh.jpg
```

### 3. Cấu trúc dữ liệu

#### A. Static Data (data/courses.ts)

```typescript
{
  id: 4,
  slug: 'thuong-hieu-cua-ban',
  heroImage: '/course/thuonghieucuaban_desktop.svg',  // Desktop image
  mobileImage: '/course/thuonghieucuaban_mobile.svg', // Mobile image
  // ... other fields
}
```

#### B. Database (Program interface)

```typescript
interface Program {
  image: string | null;              // Legacy field (fallback)
  image_desktop?: string | null;     // Desktop-optimized image
  image_mobile?: string | null;      // Mobile-optimized image
  // ... other fields
}
```

### 4. Sử dụng trong component

#### Cách 1: Sử dụng helper functions (Recommended)

```typescript
import { getDesktopImage, getMobileImage } from '@/lib/utils/image-helpers'

// Trong component
const desktopImage = getDesktopImage(program, course, '/fallback_desktop.svg')
const mobileImage = getMobileImage(program, course, '/fallback_mobile.svg')
```

#### Cách 2: Sử dụng trực tiếp

```typescript
// Desktop image
const desktopImage = program?.image_desktop || program?.image || course?.heroImage

// Mobile image  
const mobileImage = program?.image_mobile || program?.image_desktop || program?.image || course?.mobileImage || course?.heroImage
```

### 5. Priority Logic

**Desktop Image:**
1. `program.image_desktop` (từ database)
2. `program.image` (legacy field)
3. `course.heroImage` (từ static data)
4. Fallback image

**Mobile Image:**
1. `program.image_mobile` (từ database)
2. `program.image_desktop` (fallback to desktop)
3. `program.image` (legacy field)
4. `course.mobileImage` (từ static data)
5. `course.heroImage` (fallback to desktop)
6. Fallback image

### 6. Migration Guide

Khi thêm khóa học mới:

1. **Tạo 2 file ảnh:**
   - `{slug}_desktop.svg` (hoặc .jpg/.png)
   - `{slug}_mobile.svg` (hoặc .jpg/.png)

2. **Cập nhật data/courses.ts:**
   ```typescript
   {
     heroImage: '/course/{slug}_desktop.svg',
     mobileImage: '/course/{slug}_mobile.svg'
   }
   ```

3. **Cập nhật database (nếu cần):**
   ```sql
   UPDATE programs 
   SET image_desktop = '/course/{slug}_desktop.svg',
       image_mobile = '/course/{slug}_mobile.svg'
   WHERE id = {program_id};
   ```

### 7. Backward Compatibility

Các khóa học cũ không có ảnh riêng biệt vẫn hoạt động bình thường:
- Nếu chỉ có 1 ảnh, sử dụng ảnh đó cho cả desktop và mobile
- Helper functions tự động fallback về ảnh có sẵn

**Ví dụ:**
```typescript
{
  heroImage: '/picture/suc_manh_vo_han.jpg',
  mobileImage: '/picture/suc_manh_vo_han.jpg'  // Same image
}
```
