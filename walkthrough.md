# Walkthrough - Internationalization (i18n) Implementation

This guide documents the complete internationalization (i18n) implementation for the N-Edu website. We have transitioned from hardcoded Vietnamese text to a dynamic, bilingual system (Vietnamese/English) using a React Context-based solution.

## 1. Core Architecture

The i18n system is built around these core files:

*   **`lib/LanguageContext.tsx`**:
    *   `LanguageContext`: Holds the current language state (`'vi'` or `'en'`).
    *   `LanguageProvider`: Wraps the application to provide language state globally. It persists the user's choice in `localStorage`.
    *   `useLanguage`: A custom hook that components usage to access the `t(key)` translation function and `language` state.

*   **`lib/translations/vi.ts`**: Contains the Vietnamese translation object.
*   **`lib/translations/en.ts`**: Contains the English translation object.

## 2. Integrated Components

The following components have been fully translated. All hardcoded text has been replaced with dynamic keys.

### Global Components
*   **`LanguageToggle.tsx`**: Switcher accessible in Header (desktop) and Bottom Tab Bar (mobile). Displays "VN" / "EN".
*   **`Header.tsx`**: Navigation links (Home, About Us, Courses, etc.).
*   **`Footer.tsx`**: Links, company info, and addresses.
*   **`Sidebar.tsx`**: Floating action buttons (Call, Email, Chat, Support).
*   **`Banner.tsx`**: Bottom fixed banner with countdown and marquee text.
*   **`TopBanner.tsx`**: Top notification bar (Early Bird offers).
*   **`CartSuccessPopup.tsx`**: "Added to cart" success notifications.
*   **`SePayPaymentQR.tsx`**: Payment status, QR code instructions, and transaction details.
*   **`NotificationModal.tsx`**: Pop-up promotions (Early Bird).

### Page Sections (Home & Others)
*   **`page.tsx` (Home Hero)**: Main "Be Yourself" headings and intro text.
*   **`Courses.tsx`**: "Start Journey" heading.
*   **`Mission.tsx`**: Mission statement, quote, and role.
*   **`Support.tsx`**: Contact form headings and placeholders.
*   **`Testimonials.tsx`**: Student success stories and headings.
*   **`Connection.tsx`**: Community connection section.
*   **`Privilege.tsx`**: Member privileges list (personal roadmap, global support, etc.).
*   **`Partners.tsx`**: Partner logos section heading.
*   **`ChallengeRegistrationForm.tsx`**: Registration form for challenges (labels, placeholders, buttons).
*   **`program/page.tsx`**: Course listing page (titles, filters, card labels).
*   **`program-offline/[slug]/page.tsx`**: Complete translation of offline course detail pages (`la-chinh-minh`, `suc-manh-vo-han`).
*   **`program-online/[slug]/page.tsx`**: Complete translation of online course detail pages (`thuong-hieu-cua-ban`, `gen-ai-101`, `ai-for-business-communication`, etc.).
*   **`cart/page.tsx`**: Shopping cart page.
*   **`checkout/page.tsx`**: Checkout flow.
*   **`components/Instructor.tsx`**: Instructor carousel with bio and details.

### Data Layer
*   **`data/courses.ts`**: Refactored to use translation keys for course metadata (title, category, mission, info).
*   **`data/instructors.ts`**: Refactored to use translation keys for instructor profiles (bio, education, career, projects).

## 3. How to Add New Translations

1.  **Identify the Text**: Find the hardcoded string in your component.
2.  **Add to `vi.ts`**:
    Open `lib/translations/vi.ts` and add a new key-value pair. Nest it logically (e.g., under a component name).
    ```typescript
    export const vi = {
      // ...
      new_component: {
        title: "Tiêu đề mới",
        description: "Mô tả chi tiết"
      }
    }
    ```
3.  **Add to `en.ts`**:
    Open `lib/translations/en.ts` and add the *exact same key structure* with English text.
    ```typescript
    export const en = {
      // ...
      new_component: {
        title: "New Title",
        description: "Detailed description"
      }
    }
    ```
4.  **Use in Component**:
    Import the hook and use the key.
    ```tsx
    import { useLanguage } from "@/lib/LanguageContext";

    export default function NewComponent() {
      const { t } = useLanguage();
      
      return (
        <div>
          <h1>{t("new_component.title")}</h1>
          <p>{t("new_component.description")}</p>
        </div>
      );
    }
    ```

## 4. Verification Checklist

*   [x] **Language Toggle**: Switches text between VN/EN.
*   [x] **Persistence**: Language choice stays after refresh (saved in localStorage).
*   [x] **Responsiveness**: Toggle and translated text look good on Mobile and Desktop.
*   [x] **Coverage**: All major visible text on the landing page and key flows (payment/registration) is translated.

## 5. Next Steps

*   **Content Expansion**: As new courses or blog posts are added, ensure their static UI elements (buttons, labels) use the translation system. Dynamic content might need a CMS integration or separate handling.
*   **Route-Specific SEO**: Currently `layout.tsx` has a static `lang` tag. For advanced SEO, you might consider handling metadata translation or using Next.js i18n routing, though the current client-side solution is sufficient for UI text.
