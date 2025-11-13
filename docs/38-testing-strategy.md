# 🧪 Testing Strategy: Sun AI

**Version:** 1.0  
**Status:** Published  
**Author:** Senior QA Architect  
**Goal:** To define a comprehensive testing strategy that ensures the Sun AI platform is reliable, bug-free, and maintainable. This strategy aims to catch issues early, prevent regressions, and build confidence in our release process.

---

## 1. Guiding Principles

-   **Automate Everything Possible:** Manual testing is slow and error-prone. We will automate as much of our testing as we can.
-   **The Testing Pyramid:** We will focus our efforts on a healthy testing pyramid, with a large base of fast unit tests, a smaller layer of integration tests, and a very selective set of end-to-end tests.
-   **Shift Left:** Testing is not an afterthought. It is an integral part of the development process, starting from the moment a feature branch is created.
-   **Confidence, Not Coverage:** Our primary goal is not to achieve 100% code coverage, but to write tests that give us high confidence that our application works as expected.

## 2. The Testing Pyramid

This diagram illustrates our testing methodology, from the lowest to the highest level.

```mermaid
graph TD
    subgraph Testing Pyramid
        direction TB
        E2E[End-to-End Tests (Playwright)];
        Integration[Integration Tests (Vitest & RTL)];
        Unit[Unit Tests (Vitest)];
    end
```

### 2.1. Unit Tests (The Foundation)
-   **Purpose:** To test the smallest possible units of our code (e.g., a single function or React component) in isolation.
-   **Tool:** **Vitest**.
-   **Location:** In a `__tests__` folder alongside the file being tested (e.g., `src/hooks/__tests__/useDebounce.test.ts`).
-   **What to Test:**
    -   Pure functions and logic (e.g., utils, service helpers).
    -   Individual React components with mocked props.
    -   Custom hooks.
-   **Example:**
    -   Testing a `Button` component: Does it render the correct text? Does it call the `onClick` handler when clicked? Is it disabled when the `disabled` prop is true?
-   **Goal:** Fast, reliable, and numerous. These are our first line of defense.

### 2.2. Integration Tests (The Middle Layer)
-   **Purpose:** To test how multiple units work together. This is where we will focus most of our frontend testing efforts.
-   **Tools:** **Vitest** + **React Testing Library (RTL)**.
-   **Location:** In a `__tests__` folder alongside the primary component of the feature.
-   **What to Test:**
    -   A complete form with inputs and a submission button.
    -   A page that fetches and displays data from a mocked service.
    -   The interaction between a list and a filter component.
-   **Example:**
    -   Testing the `ProfileManager` component: We will render the component, simulate a user typing into the name field, simulate a click on the "Save" button, and assert that our mocked `updateProfile` service function was called with the correct data.
-   **Goal:** To test user-facing behavior without worrying about implementation details.

### 2.3. End-to-End (E2E) Tests (The Peak)
-   **Purpose:** To test a complete user journey through the live application in a real browser. These are the most powerful but also the slowest and most brittle tests.
-   **Tool:** **Playwright**.
-   **Location:** In a dedicated `e2e/` directory at the project root.
-   **What to Test:** Only the most critical "golden path" user flows.
    -   **Auth Flow:** Can a user sign up, log out, and log back in?
    -   **Core Feature Flow:** Can a user log in, complete the AI Brief Wizard, and see the new brief on their dashboard?
    -   **Admin Flow:** Can an admin log in, navigate to the admin dashboard, and change a brief's status?
-   **Goal:** To provide ultimate confidence that our most critical journeys are working in a production-like environment.

## 3. Tooling & Infrastructure

| Category | Tool | Purpose |
| :--- | :--- | :--- |
| **Test Runner** | **Vitest** | A fast and modern test runner, compatible with our Vite setup. |
| **Component Testing** | **React Testing Library (RTL)** | For testing React components from the user's perspective. |
| **E2E Testing** | **Playwright** | For cross-browser, end-to-end testing of critical user flows. |
| **Mocking** | **MSW (Mock Service Worker)** | To intercept network requests in tests and provide mock API responses, isolating the frontend from the backend. |
| **CI/CD** | **GitHub Actions** | All tests will be automatically run on every Pull Request. A PR cannot be merged if tests are failing. |

## 4. Testing Workflow

1.  **On a Feature Branch:** When developing a new feature, the developer is responsible for writing the necessary unit and integration tests for that feature.
2.  **During a Pull Request:** When a PR is opened, GitHub Actions automatically runs the entire test suite (lint, unit, integration). E2E tests may be run on a schedule or triggered manually for larger features.
3.  **Code Review:** The PR reviewer is responsible for ensuring that the new code is adequately tested.
4.  **Before Release:** Before deploying to production, the full E2E test suite must be run against the **Staging** environment to catch any environment-specific issues.

## 5. Key Metrics

-   **Test Coverage:** We will aim for a minimum of **80% line coverage** for new code. This is a guideline, not a strict rule; the focus is on meaningful tests.
-   **CI/CD Time:** The entire CI pipeline (excluding E2E tests) should complete in **under 5 minutes**.
-   **Production Bugs:** Our goal is to reduce the number of critical bugs reported by users by over 90%.

---

By adopting this structured testing strategy, we will build a more robust, reliable, and high-quality product, enabling us to innovate and release new features with speed and confidence.