/**
 * Event Configuration: Tet Promo 22/2/2026
 * Buy "Là Chính Mình" → Get "Thương Hiệu Của Bạn" for FREE
 *
 * Duration: 00:00 22/02/2026 → 00:00 23/02/2026 (GMT+7, 24 hours)
 *
 * After the event ends, isEventActive() returns false automatically.
 * To fully remove: revert checkout UI changes + delete this file.
 */

import { courses, Course } from '@/data/courses';

// ─── Event Time Window (GMT+7) ───────────────────────────────────────────────
// TODO: Restore to production dates after testing:
//   EVENT_START = new Date('2026-02-22T00:00:00+07:00');
//   EVENT_END   = new Date('2026-02-23T00:00:00+07:00');
export const EVENT_START = new Date('2026-02-13T00:00:00+07:00');
export const EVENT_END = new Date('2026-02-23T00:00:00+07:00');

// ─── Course Identifiers ──────────────────────────────────────────────────────
export const LCM_SLUG = 'la-chinh-minh';           // id=2, paymentId=57
export const THCB_SLUG = 'thuong-hieu-cua-ban';     // id=4, paymentId=53

export const LCM_PAYMENT_ID = '57';
export const THCB_PAYMENT_ID = '53';

// ─── Helper Functions ────────────────────────────────────────────────────────

/**
 * Check if the promo event is currently active
 */
export function isEventActive(): boolean {
    const now = new Date();
    return now >= EVENT_START && now < EVENT_END;
}

/**
 * Get the bonus course (THCB) data from the courses array
 */
export function getBonusCourse(): Course | undefined {
    return courses.find(c => c.slug === THCB_SLUG);
}

/**
 * Check if "Là Chính Mình" is in the cart items
 */
export function isLCMInCart(items: { slug?: string; id?: number; paymentId?: number }[]): boolean {
    return items.some(
        item => item.slug === LCM_SLUG || item.id === 2 || item.paymentId === 57
    );
}

/**
 * Check if the event promo should apply to the current checkout
 * Combines time check + cart content check
 */
export function shouldApplyEventPromo(items: { slug?: string; id?: number; paymentId?: number }[]): boolean {
    return isEventActive() && isLCMInCart(items);
}
