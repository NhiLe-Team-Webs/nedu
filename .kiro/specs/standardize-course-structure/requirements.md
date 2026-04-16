# Requirements Document

## Introduction

Dự án này nhằm thống nhất cấu trúc dữ liệu của tất cả các khóa học trong file `data/courses.ts` để đảm bảo tính nhất quán, dễ bảo trì và mở rộng. Hiện tại có 8 khóa học với cấu trúc không đồng nhất, trong đó khóa học "thu-thach-30-ngay" (id: 8) có cấu trúc tốt nhất với thuộc tính `mobileImage` và comment rõ ràng về mục đích của từng image.

## Glossary

- **Course_Data_Structure**: Cấu trúc dữ liệu TypeScript định nghĩa thông tin của một khóa học trong file `data/courses.ts`
- **Hero_Image**: Hình ảnh chính được sử dụng trong danh sách khóa học và trang chi tiết
- **Mobile_Image**: Hình ảnh được tối ưu hóa cho thiết bị di động
- **Image_Comment**: Comment mô tả mục đích sử dụng của hình ảnh
- **Course_Record**: Một object trong mảng `courses` đại diện cho một khóa học cụ thể
- **Reference_Course**: Khóa học "thu-thach-30-ngay" (id: 8) được sử dụng làm mẫu chuẩn

## Requirements

### Requirement 1: Thống nhất thuộc tính mobileImage

**User Story:** Là một developer, tôi muốn tất cả các khóa học đều có thuộc tính `mobileImage`, để có thể xử lý responsive images một cách nhất quán.

#### Acceptance Criteria

1. THE Course_Data_Structure SHALL include a `mobileImage` property for all Course_Records
2. WHEN a Course_Record does not have a `mobileImage` value, THE Course_Data_Structure SHALL set it to the same value as `heroImage`
3. THE Course_Data_Structure SHALL maintain the optional type definition `mobileImage?: string` in the TypeScript interface
4. FOR ALL Course_Records, the `mobileImage` property SHALL be explicitly defined (not undefined)

### Requirement 2: Thêm Image Comments

**User Story:** Là một developer, tôi muốn có comment rõ ràng về mục đích của từng image property, để hiểu cách sử dụng chúng trong các context khác nhau.

#### Acceptance Criteria

1. WHEN a Course_Record has a `heroImage` property, THE Course_Data_Structure SHALL include an Image_Comment describing its purpose as "Primary image used in listings"
2. WHEN a Course_Record has a `mobileImage` property, THE Course_Data_Structure SHALL include an Image_Comment describing its purpose as "Mobile optimized image for the course page"
3. THE Image_Comments SHALL be placed inline on the same line as the property definition
4. THE Image_Comments SHALL follow the format: `// <description>`

### Requirement 3: Đảm bảo tính nhất quán của cấu trúc dữ liệu

**User Story:** Là một developer, tôi muốn tất cả các khóa học có cùng format và thứ tự thuộc tính, để code dễ đọc và bảo trì.

#### Acceptance Criteria

1. THE Course_Data_Structure SHALL maintain consistent property order across all Course_Records
2. THE Course_Data_Structure SHALL place `heroImage` property before `mobileImage` property
3. THE Course_Data_Structure SHALL place image properties after `category` and before `price`
4. FOR ALL Course_Records, the property order SHALL match the Reference_Course structure

### Requirement 4: Xử lý các khóa học đã bị comment

**User Story:** Là một developer, tôi muốn các khóa học đã bị comment (id: 3, 6, 7) cũng được cập nhật cấu trúc, để khi uncomment chúng sẽ có cấu trúc đúng chuẩn.

#### Acceptance Criteria

1. WHEN a Course_Record is commented out, THE Course_Data_Structure SHALL still apply the standardization rules
2. THE Course_Data_Structure SHALL add `mobileImage` property to commented Course_Records
3. THE Course_Data_Structure SHALL add Image_Comments to commented Course_Records
4. THE Course_Data_Structure SHALL maintain the commented state of these Course_Records

### Requirement 5: Validation và Type Safety

**User Story:** Là một developer, tôi muốn đảm bảo tất cả các thay đổi không phá vỡ type safety của TypeScript, để tránh lỗi compile time.

#### Acceptance Criteria

1. THE Course_Data_Structure SHALL pass TypeScript type checking without errors
2. THE Course_Data_Structure SHALL maintain all existing type definitions in the `Course` interface
3. WHEN changes are applied, THE Course_Data_Structure SHALL not introduce any breaking changes to existing code
4. THE Course_Data_Structure SHALL preserve all existing functionality of helper functions `getCourseBySlug` and `getCoursesByMode`

### Requirement 6: Xử lý giá trị mặc định cho mobileImage

**User Story:** Là một developer, tôi muốn có quy tắc rõ ràng về giá trị mặc định của `mobileImage`, để biết khi nào nên sử dụng giá trị riêng biệt.

#### Acceptance Criteria

1. WHEN a Course_Record has distinct mobile and desktop images, THE Course_Data_Structure SHALL use different values for `heroImage` and `mobileImage`
2. WHEN a Course_Record uses the same image for both mobile and desktop, THE Course_Data_Structure SHALL set `mobileImage` equal to `heroImage`
3. THE Course_Data_Structure SHALL document this pattern in comments for the first Course_Record as an example
4. FOR ALL Course_Records with `.svg` images, THE Course_Data_Structure SHALL evaluate if separate mobile images are needed

