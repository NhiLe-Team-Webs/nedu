# Design Document: Standardize Course Structure

## Overview

This design addresses the standardization of course data structures in `data/courses.ts` to ensure consistency, maintainability, and scalability. The current implementation has 8 courses (5 active, 3 commented) with inconsistent structure. The reference course "thu-thach-30-ngay" (id: 8) demonstrates the target structure with explicit `mobileImage` property and clear inline comments.

The solution involves a systematic refactoring approach that:
- Adds `mobileImage` property to all courses
- Adds descriptive inline comments for image properties
- Maintains consistent property ordering
- Preserves TypeScript type safety
- Handles both active and commented courses

## Architecture

### Current State Analysis

The `data/courses.ts` file contains:
- TypeScript interfaces: `Instructor`, `CourseInfo`, `Audience`, `Privilege`, `Course`
- Course array with 8 entries (5 active: ids 1,2,4,5,8; 3 commented: ids 3,6,7)
- Helper functions: `getCourseBySlug()`, `getCoursesByMode()`
- Inconsistent image property structure across courses

### Target State

All courses will follow the reference pattern from course id: 8:
```typescript
heroImage: '/path/to/image.ext', // Primary image used in listings
mobileImage: '/path/to/mobile.ext'  // Mobile optimized image for the course page
```

### Refactoring Strategy

The refactoring will be performed as a single atomic change to `data/courses.ts`:
1. Process each course sequentially (ids 1-8)
2. Add `mobileImage` property after `heroImage`
3. Add inline comments to both image properties
4. Maintain existing commented state for courses 3, 6, 7
5. Verify TypeScript compilation after changes

## Components and Interfaces

### Affected TypeScript Interface

The `Course` interface already includes the optional `mobileImage` property:
```typescript
export interface Course {
  // ... other properties
  heroImage: string
  mobileImage?: string  // Optional mobile-optimized image
  // ... other properties
}
```

No interface changes are required. The refactoring only affects the data instances.

### Data Structure Pattern

Each course object will follow this property order:
```
id → slug → mode → title → category → heroImage → mobileImage → price → paymentId → info → mission → testimonials → curriculum? → instructors → audience → privileges
```

### Image Property Patterns

**Pattern 1: Same image for desktop and mobile**
```typescript
heroImage: '/picture/image.jpg', // Primary image used in listings
mobileImage: '/picture/image.jpg'  // Mobile optimized image for the course page
```

**Pattern 2: Separate mobile-optimized image**
```typescript
heroImage: '/course/desktop.svg', // Primary image used in listings
mobileImage: '/course/mobile.svg'  // Mobile optimized image for the course page
```

## Data Models

### Course Image Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `heroImage` | `string` | Yes | Primary image displayed in course listings and detail pages |
| `mobileImage` | `string?` | No (but will be explicitly set) | Mobile-optimized image for responsive display |

### Default Value Strategy

For courses without distinct mobile images:
- Set `mobileImage` equal to `heroImage`
- This ensures explicit definition while maintaining flexibility
- Future updates can easily identify courses needing mobile optimization

### Course-Specific Decisions

| Course ID | Slug | Image Type | Mobile Strategy |
|-----------|------|------------|-----------------|
| 1 | suc-manh-vo-han | .jpg | Same as heroImage |
| 2 | la-chinh-minh | .jpg | Same as heroImage |
| 3 | gen-ai-101 (commented) | .png | Same as heroImage |
| 4 | thuong-hieu-cua-ban | .svg | Same as heroImage |
| 5 | cuoc-song-cua-ban | .svg | Same as heroImage |
| 6 | ai-for-business-communication (commented) | .png | Same as heroImage |
| 7 | ai-in-marketing (commented) | .png | Same as heroImage |
| 8 | thu-thach-30-ngay | .svg | Separate mobile image (already implemented) |

## Error Handling

### TypeScript Compilation Errors

**Risk**: Property additions might cause type mismatches
**Mitigation**: 
- The `mobileImage` property is already defined as optional in the `Course` interface
- All changes maintain existing type contracts
- Run `tsc --noEmit` to verify type safety before committing

### Runtime Errors

**Risk**: Code consuming course data might not handle `mobileImage`
**Mitigation**:
- The property is optional, so existing code continues to work
- Components already handle optional properties via optional chaining
- No breaking changes to helper functions `getCourseBySlug()` or `getCoursesByMode()`

### Data Consistency Errors

**Risk**: Inconsistent comment formatting or property ordering
**Mitigation**:
- Use course id: 8 as the single source of truth for formatting
- Apply changes systematically in course id order
- Visual review of the final file structure

## Testing Strategy

### Property-Based Testing Assessment

Property-based testing is **NOT applicable** to this feature because:
- This is a one-time data structure refactoring, not runtime logic
- There are no functions with varying input/output behavior to test
- The validation is structural (TypeScript types) and visual (code formatting)
- No algorithms, transformations, or business logic to verify across input ranges

### Testing Approach

**1. TypeScript Type Checking**
```bash
npx tsc --noEmit
```
Verifies that all changes maintain type safety and no compilation errors are introduced.

**2. Manual Code Review**
- Verify all 8 courses have `mobileImage` property
- Confirm inline comments match the reference format
- Check property ordering consistency
- Validate commented courses (3, 6, 7) maintain their commented state

**3. Visual Inspection**
- Compare each course structure against course id: 8
- Ensure comment formatting is consistent
- Verify no unintended whitespace or formatting changes

**4. Runtime Verification**
If the application has a development server:
```bash
npm run dev
```
- Navigate to course listing pages
- Verify images display correctly
- Check responsive behavior on mobile viewport
- Confirm no console errors related to course data

**5. Integration Points**
Test that helper functions continue to work:
```typescript
// Should return course object with mobileImage property
const course = getCourseBySlug('thu-thach-30-ngay')
console.log(course?.mobileImage) // Should output: '/course/30days_mobile.svg'

// Should return filtered courses with mobileImage
const onlineCourses = getCoursesByMode('online')
console.log(onlineCourses.every(c => 'mobileImage' in c)) // Should be true
```

### Acceptance Validation

Each requirement will be validated as follows:

| Requirement | Validation Method |
|-------------|-------------------|
| Req 1: mobileImage property added | Manual inspection of all 8 courses |
| Req 2: Image comments added | Visual verification of inline comments |
| Req 3: Consistent structure | Compare property order against reference |
| Req 4: Commented courses updated | Verify courses 3, 6, 7 remain commented |
| Req 5: Type safety maintained | TypeScript compilation success |
| Req 6: Default value strategy | Review mobileImage values match heroImage where appropriate |

### Test Execution Order

1. Make changes to `data/courses.ts`
2. Run TypeScript compiler: `npx tsc --noEmit`
3. Perform manual code review
4. Start dev server and test runtime behavior
5. Verify helper functions return expected data
6. Confirm no breaking changes in consuming components

