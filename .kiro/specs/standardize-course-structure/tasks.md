# Implementation Plan: Standardize Course Structure

## Overview

This implementation standardizes the course data structure in `data/courses.ts` by adding the `mobileImage` property and descriptive inline comments to all 8 courses (5 active, 3 commented). The refactoring follows the reference pattern from course id: 8 ("thu-thach-30-ngay") to ensure consistency, maintainability, and proper responsive image handling.

## Tasks

- [x] 1. Add mobileImage property and comments to active courses (ids 1, 2, 4, 5)
  - Update course id: 1 (suc-manh-vo-han) with mobileImage and inline comments
  - Update course id: 2 (la-chinh-minh) with mobileImage and inline comments
  - Update course id: 4 (thuong-hieu-cua-ban) with mobileImage and inline comments
  - Update course id: 5 (cuoc-song-cua-ban) with mobileImage and inline comments
  - Set mobileImage equal to heroImage for courses without distinct mobile images
  - Add inline comment to heroImage: `// Primary image used in listings`
  - Add inline comment to mobileImage: `// Mobile optimized image for the course page`
  - _Requirements: 1.1, 1.2, 1.4, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 6.2_

- [x] 2. Add mobileImage property and comments to commented courses (ids 3, 6, 7)
  - Update commented course id: 3 (gen-ai-101) with mobileImage and inline comments
  - Update commented course id: 6 (ai-for-business-communication) with mobileImage and inline comments
  - Update commented course id: 7 (ai-in-marketing) with mobileImage and inline comments
  - Maintain the commented state of these courses
  - Apply the same property structure and comment format as active courses
  - _Requirements: 1.1, 1.2, 1.4, 2.1, 2.2, 2.3, 2.4, 4.1, 4.2, 4.3, 4.4, 6.2_

- [x] 3. Verify TypeScript type safety and code consistency
  - Run TypeScript compiler to verify no type errors: `npx tsc --noEmit`
  - Verify all 8 courses have explicit mobileImage property
  - Confirm property order matches reference course (heroImage before mobileImage)
  - Validate inline comments follow the exact format from course id: 8
  - Ensure no unintended formatting or whitespace changes
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 5.1, 5.2, 5.3, 5.4_

- [x] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- This is a data structure refactoring task with no runtime logic changes
- All courses will have explicit mobileImage property (no undefined values)
- Courses without distinct mobile images will use heroImage value for mobileImage
- Helper functions `getCourseBySlug()` and `getCoursesByMode()` remain unchanged
- No breaking changes to existing code consuming course data
