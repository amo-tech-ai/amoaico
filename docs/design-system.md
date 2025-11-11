
# 🎨 Design System & UI Kit: Sunai

**Document Status:** Version 1.0 - Published
**Author:** Senior UI/UX Engineer
**Goal:** To establish a single source of truth for the visual and interactive elements of the Sunai website. This document ensures consistency, accelerates development, and maintains a high-quality user experience.

---

## 1. Core Principles

Our design is guided by three core principles:

-   **Clarity:** The interface should be clean, intuitive, and easy to navigate. Information is presented in a structured and digestible manner.
-   **Professionalism:** The visual language conveys trust, expertise, and innovation, reflecting the high-quality services Sunai provides.
-   **Efficiency:** Components and layouts are designed to guide users toward their goals quickly and with minimal friction, especially within the AI Brief Wizard.

---

## 2. Foundations

These are the fundamental building blocks of our visual language.

### 2.1. Color Palette

Our palette is designed to be modern, professional, and accessible. Colors are used purposefully to guide attention and indicate status.

| Role | Color Name | Hex Code | Tailwind Utility | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Action** | Orange | `#F97316` | `bg-orange-500` | CTAs, active states, highlights, key icons. |
| **Primary Text** | Slate Dark | `#0F172A` | `text-slate-900` | Body copy, standard text. |
| **Primary Blue** | Deep Ocean | `#00334F` | `bg-[#00334F]` | Headings, dark backgrounds, wizard active elements. |
| **Background** | Cream | `#FFF9F5` | `bg-[#FFF9F5]` | Default page background color. |
| **Neutral** | White | `#FFFFFF` | `bg-white` | Cards, backgrounds for contrast. |
| **Neutral** | Gray 200 | `#E5E7EB` | `border-gray-200` | Borders, dividers. |
| **Neutral** | Gray 500 | `#6B7280` | `text-gray-500` | Secondary text, placeholders, disabled text. |
| **Success** | Green | `#10B981` | `text-green-500` | Success messages, checkmarks. |
| **Error** | Red | `#EF4444` | `text-red-600` | Error messages, validation failures. |

### 2.2. Typography

We use two primary font families to create a clear and elegant typographic hierarchy.

-   **Headings Font:** `Poppins` (Imported from Google Fonts)
-   **Body Font:** `Inter` (Imported from Google Fonts)

| Element | Font Family | Weight | Size (Desktop) | Tailwind Utility |
| :--- | :--- | :--- | :--- | :--- |
| **Display (h1)** | Poppins | Bold (700) | 3.75rem (60px) | `font-poppins font-bold text-6xl` |
| **Heading (h2)** | Poppins | Bold (700) | 2.25rem (36px) | `font-poppins font-bold text-4xl` |
| **Subheading (h3)**| Poppins | Semibold (600)| 1.25rem (20px) | `font-poppins font-semibold text-xl` |
| **Body Large** | Inter | Regular (400)| 1.125rem (18px)| `text-lg` |
| **Body** | Inter | Regular (400)| 1rem (16px) | `text-base` |
| **Body Small** | Inter | Regular (400)| 0.875rem (14px)| `text-sm` |

### 2.3. Spacing & Layout

We use a consistent 4-point grid system for spacing. Multiples of 4px are used for padding, margins, and gaps to ensure visual harmony.

-   **Base Unit:** 1 unit = 4px (`p-1`, `m-1`)
-   **Standard Gaps:** `gap-4` (16px), `gap-8` (32px)
-   **Section Padding:** `py-20 md:py-28` (80px / 112px)
-   **Page Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### 2.4. Iconography

All icons are sourced from `lucide-react` or are custom-made SVGs, implemented as React components in `/assets/icons.tsx`.

-   **Style:** Line icons, clean and modern.
-   **Default Size:** 24x24px
-   **Stroke Width:** 2px (unless specified otherwise)
-   **Color:** `currentColor`, allowing color to be inherited via Tailwind's `text-{color}` utilities.

---

## 3. Components

This section defines the appearance and behavior of our most common UI components.

### 3.1. Buttons

| Type | State | Style | Tailwind Classes |
| :--- | :--- | :--- | :--- |
| **Primary (CTA)** | Default | Solid orange background, white text. | `bg-[#F97316] text-white rounded-lg font-semibold px-5 py-2.5` |
| | Hover | Reduced opacity or darker orange. | `hover:opacity-90` or `hover:bg-orange-600` |
| | Focus | Orange ring outline. | `focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F97316]` |
| | Disabled | Muted gray background. | `disabled:bg-gray-300 disabled:cursor-not-allowed` |
| **Secondary** | Default | Transparent background, dark text, gray border. | `border border-gray-300 text-[#0F172A] rounded-lg font-semibold px-5 py-2.5` |
| | Hover | Light gray background. | `hover:bg-gray-100` |

### 3.2. Forms (AI Brief Wizard)

Form elements are designed for clarity and ease of use.

| Element | State | Style | Tailwind Classes |
| :--- | :--- | :--- | :--- |
| **Text Input** | Default | Gray border, rounded corners. | `w-full px-4 py-2.5 border border-gray-300 rounded-lg` |
| | Focus | Orange ring and border. | `focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]` |
| | Error | Red border and ring. | `border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500` |
| **Label** | Default | Small, medium-weight text above the input. | `block text-sm font-medium text-gray-700 mb-1` |
| **Chip/Toggle** | Default | White background, gray border. | `p-3 text-sm font-medium border rounded-lg bg-white hover:bg-gray-50` |
| | Selected | Solid blue background, white text. | `bg-[#00334F] text-white border-[#00334F] ring-2 ring-offset-1 ring-[#00334F]` |
| | Disabled | Muted opacity. | `disabled:opacity-50` |

### 3.3. Cards

Cards are used to contain and elevate content for services, metrics, and other modules.

-   **Default Card:**
    -   `bg-white`
    -   `p-6`
    -   `rounded-xl`
    -   `border border-gray-100`
    -   `shadow-lg`
-   **Hover State:**
    -   `hover:shadow-xl`
    -   `hover:-translate-y-1`
    -   `transition-all duration-300`

### 3.4. Navigation

-   **Header:**
    -   **Default:** `bg-white`
    -   **Scrolled:** `bg-white/80 backdrop-blur-lg border-b border-gray-200/80`
    -   **Active Link:** `text-[#0F172A]` (dark slate)
    -   **Inactive Link:** `text-gray-500 hover:text-[#0F172A]`
-   **Footer:**
    -   **Background:** `bg-[#00334F]` (Deep Ocean)
    -   **Text:** `text-white`
    -   **Link Text:** `text-gray-300 hover:text-white`

---

## 4. Usage Guidelines

To ensure consistency, always use the defined Tailwind CSS utilities when implementing new components or pages.

-   **Favor Utility Classes:** Build components by composing the utilities defined in this system. Avoid writing custom CSS unless absolutely necessary.
-   **Component Abstraction:** For complex, repeated patterns (like a primary button), create a dedicated React component that encapsulates the required classes. This is already done for `Header`, `Footer`, etc.
-   **Responsive Design:** Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`) to adapt layouts for different screen sizes, following the examples in the existing page components.