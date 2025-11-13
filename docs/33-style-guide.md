# 🎨 Sun AI: UI/UX Style Guide & Design System

**Version:** 1.0  
**Status:** Published  
**Author:** Senior UI/UX Architect  
**Last Updated:** 2024-08-26  

---

## 0. Introduction

This document is the single source of truth for the Sun AI platform's visual and interactive design. Its purpose is to ensure consistency, improve the user experience, and accelerate development by providing a clear set of rules and reusable patterns.

Our design language is guided by three core principles:
-   **Clarity:** The interface must be intuitive, clean, and unambiguous.
-   **Intelligence:** The design should feel modern and sophisticated, reflecting the AI-powered nature of our product.
-   **Focus:** Guide the user efficiently toward their goals with minimal friction.

---

## 1. Color Palette

Our color palette is concise and purposeful. It uses a strong primary action color against a professional, neutral background to create a clear visual hierarchy.

### 1.1. Primary & Accent Colors

| Role | Color | Hex | Tailwind Utility | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Action** | Sunai Orange | `#F97316` | `sunai-orange` | All primary CTAs, active links, focus rings, highlights. |
| **Primary UI / Text** | Sunai Slate | `#0F172A` | `sunai-slate` | Main headings, body text, dark UI elements. |
| **Secondary UI** | Sunai Blue | `#00334F` | `sunai-blue` | Secondary buttons, selected states in wizards, footer background. |

### 1.2. Neutral & Surface Colors

| Role | Color | Hex | Tailwind Utility | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Main Background** | Sunai Cream | `#FFF9F5` | `sunai-cream` | Default background for all public-facing pages. |
| **Dashboard Background**| Slate 50 | `#F8FAFC` | `slate-50` | Default background for the authenticated dashboard area. |
| **Surface** | White | `#FFFFFF` | `white` | Cards, modals, sidebars, headers. |
| **Border** | Gray 200 | `#E5E7EB` | `gray-200` | Standard borders for cards, inputs, and dividers. |
| **Text (Subtle)** | Gray 500 | `#6B7280` | `gray-500` | Placeholder text, disabled text, secondary metadata. |

### 1.3. Semantic Colors

These colors should be used exclusively to communicate status to the user.

| Role | Color | Hex | Tailwind Utility | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Success** | Green 500 | `#22C55E` | `green-500` | Success notifications, validation checkmarks, "Approved" status. |
| **Warning** | Yellow 500 | `#EAB308` | `yellow-500` | "In Review" status, non-critical alerts. |
| **Error** | Red 500 | `#EF4444` | `red-500` | Error messages, validation failures, "Rejected" status. |
| **Info** | Blue 500 | `#3B82F6` | `blue-500` | "Submitted" status, informational tooltips. |

---

## 2. Typography

Our typography system uses two font families to create a clean, modern, and highly readable hierarchy.

-   **Headings Font:** **Poppins** (for brand identity and impact)
-   **Body & UI Font:** **Inter** (for clarity and readability)

### 2.1. Type Scale

| Element | Font Family | Weight | Size (px) | Tailwind Utility |
| :--- | :--- | :--- | :--- | :--- |
| **Display / H1** | Poppins | 700 (Bold) | 60 | `text-6xl font-poppins font-bold` |
| **H2** | Poppins | 700 (Bold) | 48 | `text-5xl font-poppins font-bold` |
| **H3** | Poppins | 700 (Bold) | 36 | `text-4xl font-poppins font-bold` |
| **H4** | Poppins | 600 (SemiBold) | 24 | `text-2xl font-poppins font-semibold`|
| **H5** | Poppins | 600 (SemiBold) | 20 | `text-xl font-poppins font-semibold`|
| **Body (Large)** | Inter | 400 (Regular) | 18 | `text-lg` |
| **Body (Default)** | Inter | 400 (Regular) | 16 | `text-base` |
| **Body (Small)** | Inter | 400 (Regular) | 14 | `text-sm` |
| **Caption** | Inter | 400 (Regular) | 12 | `text-xs` |

### 2.2. Usage Guidelines
-   **Line Height:** Use Tailwind's default relative line heights (e.g., `leading-normal`, `leading-relaxed`) for optimal readability.
-   **Accessibility:** Ensure all body text has a minimum contrast ratio of 4.5:1 against its background.
-   **Consistency:** Do not mix font families within a single text element. Use Poppins for headings and Inter for everything else.

---

## 3. Spacing & Sizing

We use an **8-point grid system** for all spacing, sizing, and layout decisions. This ensures a consistent visual rhythm throughout the application. The base unit is `8px`.

| Unit | Pixels | Tailwind (Example) |
| :--- | :--- | :--- |
| 1 | 8px | `p-2`, `gap-2` |
| 2 | 16px | `p-4`, `gap-4` |
| 3 | 24px | `p-6` |
| 4 | 32px | `p-8`, `gap-8` |
| 5 | 40px | `p-10` |
| 6 | 48px | `p-12` |
| 8 | 64px | `p-16` |
| 10 | 80px | `p-20` |

-   **Container Width:** The main content container should be `max-w-7xl` (`1280px`).
-   **Section Padding:** Standard vertical padding for a page section is `py-20` or `py-28`.
-   **Component Spacing:** Use `space-y-{n}` for vertical rhythm between elements in a stack. Use `gap-{n}` for grid and flex layouts.

---

## 4. Layout System

### 4.1. Page Structure
-   **Public Pages:** Use `PublicLayout.tsx`, which provides a consistent `Header` and `Footer`. Content is placed within a centered, max-width container.
-   **Dashboard Pages:** Use `DashboardLayout.tsx`, which provides a fixed `Sidebar` and `DashboardHeader`. The main content area scrolls independently.

### 4.2. Responsive Patterns
-   **Mobile-First:** Design for mobile first, then use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`) to scale up the layout.
-   **Grids:** Use responsive grids (e.g., `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`) for card layouts.
-   **Dashboard:** On mobile, the `Sidebar` should be hidden by default and accessible via a menu button in the `DashboardHeader`.

---

## 5. Components Style Rules

### 5.1. Buttons

| Type | Style | Tailwind Classes |
| :--- | :--- | :--- |
| **Primary** | Solid orange background, white text. | `bg-sunai-orange text-white font-semibold` |
| **Secondary** | White background, dark text, gray border. | `bg-white text-sunai-slate border border-gray-200` |
| **Ghost** | Transparent background, dark text. | `bg-transparent text-sunai-slate hover:bg-gray-100` |
| **Destructive** | Red background or text for delete actions. | `bg-red-500 text-white` or `text-red-600` |

### 5.2. Forms (Wizard)
-   **Inputs:** White background, `gray-300` border, `rounded-lg`.
-   **Focus State:** On focus, all interactive form elements **MUST** show a `sunai-orange` ring (`focus:ring-sunai-orange`).
-   **Selected State (Chips):** Use `sunai-blue` as the background for selected options in wizards to differentiate from the primary action color.
-   **Labels:** `text-sm font-medium text-gray-700`.

### 5.3. Cards
-   **Default:** `bg-white`, `p-6`, `rounded-xl`, `border border-gray-200`, `shadow-sm`.
-   **Hover:** `hover:shadow-lg`, `hover:-translate-y-1`.

---

## 6. Iconography

-   **Style:** Use a single, consistent icon set. The current set is a clean, line-art style.
-   **Implementation:** All icons are SVG components located in `src/assets/icons.tsx`.
-   **Sizing:** Default size is `w-5 h-5` or `w-6 h-6`. Use Tailwind's size utilities.
-   **Color:** Icons should use `currentColor` for their stroke, allowing them to inherit color via text color utilities (e.g., `text-sunai-orange`).

---

## 7. Visual Behavior & Interactions

### 7.1. States
-   **Hover:** Interactive elements should provide clear visual feedback on hover (e.g., background color change, subtle transform). Cards lift (`-translate-y-1`).
-   **Focus:** All clickable and focusable elements **MUST** have a visible focus state for accessibility. Use `focus:ring-2 focus:ring-offset-2 focus:ring-sunai-orange`.
-   **Loading:**
    -   **Page/Section Load:** Use **Skeleton Loaders** that mimic the shape of the content being loaded.
    -   **Button Action:** Show a spinner inside the button and apply the `disabled` state.
-   **Empty:** Empty states should be engaging. They must include an icon, a clear heading, a helpful description, and a primary call-to-action.

### 7.2. Motion & Animation
-   **Principle:** Animation should be **subtle, fast, and purposeful**. Its goal is to guide the user's attention and provide feedback, not to distract.
-   **Page Transitions:** Use gentle fade-ins (`animate-fade-in`) or slide-ins (`animate-slide-up`) for new page content.
-   **Wizard Steps:** Use horizontal slide animations (`animate-slide-in-right`/`left`) to indicate forward or backward progress.
-   **Duration:** Keep transition durations fast (e.g., `duration-300`).

---

## 8. Branding Voice & Feel

The visual design directly supports the Sun AI brand:
-   **Intelligent:** The clean layout, structured typography, and purposeful use of color convey a sense of order and intelligence.
-   **Minimal:** We avoid visual clutter. Ample white space (`sunai-cream`) is used to create focus and a feeling of calm.
-   **Premium:** High-quality typography, a refined color palette, and subtle motion create a polished, high-end feel.
-   **Forward-Thinking:** The use of a vibrant accent color (Sunai Orange) against a professional, dark blue/slate palette feels modern and energetic.
