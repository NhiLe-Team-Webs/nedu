# iOS 26.1 Design System - "Nedu" Project

This document serves as the single source of truth for the iOS 26.1-inspired design system applied to the Nedu project. It defines the visual language, behavior, and technical implementation details to ensure a consistent, premium, and responsive user experience across all devices.

---

## 1. Core Philosophy & Principles

The iOS 26.1 design language prioritizes **Fluidity**, **Depth**, and **Focus**.

*   **Fluidity**: Interfaces should feel alive. Transitions are continuous, not abrupt. Use spring animations over linear ones.
*   **Depth & Layering**: Use blur (Glassmorphism), shadows, and scaling to establish hierarchy. The user interface is a stack of translucent layers.
*   **Tactility**: Every interaction provides feedback. Buttons scale down when pressed (`scale-95`), conveying a physical feel.
*   **Content-First**: Remove heavy borders and unnecessary ornaments. Use whitespace and typography to group content.

---

## 2. Design Tokens

### 2.1. Colors
Our color palette blends vibrant primary brand colors with clean, modern iOS backgrounds.

| Role | Token Name | Tailwind Class | Hex Value | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | `primary` | `bg-primary`, `text-primary` | `#FDB913` | Main actions, highlights, active states. |
| **Dark Primary** | `primary-dark` | `bg-primary-dark` | `#E5A800` | Hover states, deep accents. |
| **Background** | `background-tertiary` | `bg-gray-100` / `bg-[#F2F2F7]` | `#F2F2F7` | **Main App Background** (iOS System Gray 6). |
| **Surface** | `background-primary` | `bg-white` | `#FFFFFF` | Cards, Modals, Bottom Sheets. |
| **Text Primary** | `text-primary` | `text-gray-900` | `#111827` | Headings, main body text. |
| **Text Secondary**| `text-secondary` | `text-gray-500` | `#6B7280` | Subtitles, captions, hints. |
| **Success** | `success` | `text-green-500` | `#10B981` | Success states, completions. |

### 2.2. Typography (San Francisco Style)
We use **Inter** as a proxy for San Francisco.

| Style | Size (Mobile) | Weight | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Large Title**| `34px` | Bold (700) | `text-3xl font-bold` | Page headers (e.g., "Courses"). |
| **Title 1** | `28px` | Bold (700) | `text-2xl font-bold` | Section headers. |
| **Title 2** | `22px` | Semibold (600)| `text-xl font-semibold`| Card titles. |
| **Headline** | `17px` | Semibold (600)| `text-[17px] font-semibold`| Content headings, buttons. |
| **Body** | `17px` | Regular (400) | `text-[17px]` | Standard paragraph text. |
| **Subhead** | `15px` | Regular (400) | `text-[15px]` | Secondary descriptions. |
| **Caption 1** | `12px` | Medium (500) | `text-xs font-medium` | Badges, timestamps, footnotes. |

### 2.3. Corner Radius
Rounded corners are a signature trait. We use "Squircle-like" sizing.

| Token | Size | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- |
| **Button** | `999px` | `rounded-ios-btn` / `rounded-full`| CTAs, Pills. |
| **Card** | `20px` | `rounded-ios-card` / `rounded-[20px]`| Content cards, Modal sheets. |
| **Inner** | `12px` | `rounded-ios-md` | Inner elements, icons within cards. |
| **Small** | `8px` | `rounded-ios-sm` | Tags, smaller inputs. |

### 2.4. Shadows & Depth
Shadows are subtle and diffuse.

*   **Float**: `0 8px 32px rgba(0,0,0,0.12)` (Modals, Sticky elements).
*   **Card**: `0 2px 10px rgba(0,0,0,0.04)` (Standard content cards).
*   **Icon**: `0 4px 12px rgba(0,0,0,0.06)` (Floating icons).

---

## 3. UI Components & Patterns

### 3.1. Buttons
*   **Shape**: Always fully rounded (Pill shape).
*   **Interaction**: **Must** include active state scaling.
    ```tsx
    <button className="bg-primary text-white rounded-full py-3 px-6 active:scale-95 transition-transform duration-200 ios-haptic-active">
      Action
    </button>
    ```
*   **Icons**: Icons should be sized 20px-24px depending on button size.

### 3.2. Cards (The "Island" Concept)
Content should be grouped into isolated "islands" with white background on top of the gray system background.
*   **Padding**: `p-4` or `p-5`.
*   **Effect**: `bg-white rounded-[20px] shadow-sm`.
*   **Responsive**:
    *   **Mobile**: Cards stack vertically with 16px vertical gap.
    *   **Desktop**: Cards arrange in Grid (2 or 3 columns).

### 3.3. Navigation (Tab Bar)
*   **Position**: Fixed bottom.
*   **Style**: Glassmorphism.
    ```css
    .ios-glass {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-top: 0.5px solid rgba(0,0,0,0.1);
    }
    ```
*   **Safe Area**: Must respect `pb-[env(safe-area-inset-bottom)]`.

### 3.4. Modals & Sheets
*   **Behavior**: Slide up from bottom on Mobile, Fade in/Scale up on Desktop.
*   **Backdrop**: `bg-black/40 backdrop-blur-sm`.
*   **Close**: Swipe down gesture (simulated) or distinct visual "X" / "Close" button.

### 3.5. Notifications / Toasts
*   **Style**: Capsule/Pill shape.
*   **Location**: Top (Dynamic Island style) or Top-Center float.
*   **Background**: Glassmorphism (`bg-white/90 backdrop-blur-xl`).

---

## 4. Responsive Rules (Mobile-First)

1.  **Base (Mobile)**:
    *   Design for **375px** width.
    *   Use `flex-col`.
    *   Touch targets min **44px**.
    *   Font size min **16px** (to prevent iOS zoom).

2.  **Tablet (MD - 768px)**:
    *   Transition to Grid layouts.
    *   Modals can center instead of bottom-sheet.

3.  **Desktop (LG - 1024px+)**:
    *   Max content width `1280px` (`max-w-[1280px] mx-auto`).
    *   Hover effects enabled (hover states are ignored on touch).

---

## 5. Animation Guidelines

Animations should follow spring physics, providing a "bounce" or "settle" effect rather than linear movement.

*   **Presets (Tailwind Config)**:
    *   `animate-ios-slide-up`: For Modals/Sheets.
    *   `animate-ios-scale-in`: For Success Toasts/Popups.
    *   `animate-ios-fade-in`: For Backdrops.

---

## 6. Implementation Snippets

**Glassmorphism Class:**
```css
.ios-glass {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
```

**Active Haptic Class:**
```css
.ios-haptic-active:active {
  transform: scale(0.96);
  transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Safe Area Spacing:**
```css
.ios-safe-padding-bottom {
  padding-bottom: env(safe-area-inset-bottom, 20px);
}
```

---

**Usage:**
Include this file in your project knowledge base or reference it when creating new components to ensure consistency with the established iOS 26.1 design system.
