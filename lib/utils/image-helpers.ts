import { Program } from '@/lib/types/course'
import { Course } from '@/data/courses'

/**
 * Get desktop image from Program or Course
 * Priority: image_desktop > image > heroImage
 */
export function getDesktopImage(
  program?: Program | null,
  course?: Course | null,
  fallback?: string
): string {
  if (program) {
    return program.image_desktop || program.image || fallback || ''
  }
  if (course) {
    return course.heroImage || fallback || ''
  }
  return fallback || ''
}

/**
 * Get mobile image from Program or Course
 * Priority: image_mobile > image_desktop > image > mobileImage > heroImage
 */
export function getMobileImage(
  program?: Program | null,
  course?: Course | null,
  fallback?: string
): string {
  if (program) {
    return (
      program.image_mobile ||
      program.image_desktop ||
      program.image ||
      fallback ||
      ''
    )
  }
  if (course) {
    return course.mobileImage || course.heroImage || fallback || ''
  }
  return fallback || ''
}

/**
 * Get both desktop and mobile images
 */
export function getResponsiveImages(
  program?: Program | null,
  course?: Course | null,
  fallbackDesktop?: string,
  fallbackMobile?: string
): { desktop: string; mobile: string } {
  return {
    desktop: getDesktopImage(program, course, fallbackDesktop),
    mobile: getMobileImage(program, course, fallbackMobile)
  }
}
