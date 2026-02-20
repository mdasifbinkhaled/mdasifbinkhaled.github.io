# ISSUES.md — Finding Tracker

> **Last Audit**: 2026-02-20 | **Auditor**: Deep Module-by-Module Audit (Session 10)
> **Total Findings**: 152 | **Resolved**: 82 | **Open**: 70

## Dashboard

```
CRITICAL:  3 (0 open)
HIGH:      30 (10 open)
MEDIUM:    55 (25 open)
LOW:       40 (20 open)
INFO:      24 (15 open)
```

## Quality Gates Status

```
TypeScript:  ✅ 0 errors
ESLint:      ✅ 0 errors, 0 warnings (eslint-config-next@16, native flat config)
Tests:       ✅ 136/136 pass (21 files)
Build:       ✅ 18 pages exported
Format:      ✅ All formatted
Commit:      ✅ 675e6e4
```

---

## Open Findings

### CRITICAL (New — Session 10 Deep Audit)

### HIGH (New — Session 10 Deep Audit)

### HIGH (Existing — Session 9 Audit)

#### F-082 — SEO: Missing Google Scholar Meta Tags

- **Category**: SEO | **Severity**: HIGH
- **File**: `src/app/publications/page.tsx`
- **Issue**: Publications page lacks `citation_title`, `citation_author`, `citation_date`, `citation_pdf_url` meta tags. Google Scholar uses these to index academic papers.
- **Fix**: Add `citation_*` meta tags in page metadata or layout head.

#### F-083 — SEC: No CSP via `<meta>` Tag

- **Category**: Security | **Severity**: HIGH
- **File**: `src/app/layout.tsx`
- **Issue**: `public/_headers` CSP is not applied on GitHub Pages (F-015). No fallback `<meta http-equiv="Content-Security-Policy">` tag exists.
- **Fix**: Add CSP `<meta>` tag in root layout. Scope: `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com`.

#### F-084 — PWA: No Service Worker / Offline Support

- **Category**: PWA | **Severity**: HIGH
- **Issue**: `site.webmanifest` exists with proper icons but no service worker is registered. Site is not installable as PWA and has no offline capability.
- **Fix**: Add `next-pwa` or manual service worker with cache-first strategy for static assets.

#### F-085 — A11Y: No aria-live Route Announcer

- **Category**: Accessibility | **Severity**: HIGH
- **File**: `src/app/layout.tsx`
- **Issue**: SPA navigation via Next.js App Router does not announce route changes to screen readers. Need an `aria-live="polite"` region that announces the new page title.
- **Fix**: Add a visually hidden route announcer component that updates on pathname change.

#### F-086 — MODERN: View Transitions Enabled but Unused

- **Category**: Modern Web | **Severity**: HIGH
- **File**: `next.config.ts`
- **Issue**: `viewTransition: true` is set in Next.js config but no component uses the `useViewTransition` hook or CSS `view-transition-name` property. The feature flag does nothing.
- **Fix**: Wire up view transitions for page navigation (cross-fade, slide) or remove the flag to avoid misleading config.

#### F-087 — MONITOR: No Web Vitals Reporting

- **Category**: Monitoring | **Severity**: HIGH
- **Issue**: Google Analytics is configured but Web Vitals (LCP, FID, CLS, TTFB, INP) are not reported. No `web-vitals` library installed.
- **Fix**: Install `web-vitals`, add `reportWebVitals()` to send metrics to GA4 as custom events.

#### F-088 — TEST: No E2E Tests

- **Category**: Testing | **Severity**: HIGH
- **Issue**: 136 unit/integration tests exist but no end-to-end tests. Critical flows (navigation, search, theme switching, PDF viewer) are untested in a real browser.
- **Fix**: Add Playwright with 5-10 smoke tests covering navigation, theme persistence, command palette, and publications search.

#### F-089 — SEO: Missing Canonical URLs on Most Pages

- **Category**: SEO | **Severity**: HIGH
- **Issue**: Only a few pages set `alternates.canonical` in metadata. 15 of 18 pages lack canonical URLs, risking duplicate content issues with trailing slashes or www variants.
- **Fix**: Add `alternates: { canonical: 'https://mdasifbinkhaled.github.io/[path]' }` to all page metadata exports.

#### F-090 — DX: No Bundle Analyzer Script

- **Category**: Developer Experience | **Severity**: HIGH
- **Issue**: No `npm run analyze` script or `@next/bundle-analyzer` configured. Cannot identify oversized bundles or unused imports.
- **Fix**: Install `@next/bundle-analyzer`, add `analyze` script to package.json.

#### F-091 — A11Y: Color Contrast Audit Needed Across 6 Themes

- **Category**: Accessibility | **Severity**: HIGH
- **Files**: `src/styles/tokens.css`
- **Issue**: 6 color themes define custom CSS properties but no automated contrast checking exists. Some theme combinations (e.g., lavender muted text) may fail WCAG AA 4.5:1 ratio.
- **Fix**: Add `axe-core` integration test or Lighthouse CI check for each theme.

### MEDIUM (New — Session 10 Deep Audit)

#### F-111 — ARCH: `BaseCourseInfo`/`CourseDetails` Duplicate Zod Types

- **Category**: Architecture | **Severity**: MEDIUM
- **File**: `src/shared/types/index.ts`
- **Issue**: `BaseCourseInfo`, `CourseDetails`, `CourseMetrics`, `CoursePresentation` are manually defined interfaces that largely duplicate fields already in `CourseData` (Zod-inferred from `courseDataSchema`). Violates SSOT principle.
- **Fix**: Derive these as `Pick<CourseData, ...>` types or remove in favor of direct `CourseData` usage.

#### F-112 — ARCH: navIconMap Missing 4 Icons from iconNameSchema

- **Category**: Architecture | **Severity**: MEDIUM
- **File**: `src/shared/lib/nav-icon-map.ts` vs `common-schema.ts`
- **Issue**: `iconNameSchema` defines 18 valid icon names, but `navIconMap` only has 14 entries. Missing: `BookOpen`, `Users`, `Award`, `Rss`. Any component using these 4 icon names via the map will fall back to Globe silently.
- **Fix**: Add missing icons to `navIconMap`, or restrict schema to match map.

#### F-114 — ARCH: researcher-profile.ts Contains Dead/Placeholder Data

- **Category**: Architecture | **Severity**: MEDIUM
- **File**: `src/shared/config/researcher-profile.ts`
- **Issue**: `visualIdentity.colorTheme` references non-existent CSS variables (`--healthcare-primary`, `--explainability-primary`, `--technology-primary`). `supervision.undergraduate: false`, `speaking.available: false`. `keyLearnings` is aspirational text. None of these are rendered anywhere in the app.
- **Fix**: Delete unused fields or wire them up to actual UI if needed.

#### F-115 — HOME: Hardcoded Stats Will Become Stale

- **Category**: Data | **Severity**: MEDIUM
- **File**: `src/features/home/components/hero-section.tsx`
- **Issue**: Hero displays `'7+'` years, `'4'` research grants, `'5+'` research areas as hardcoded strings. These will become incorrect over time without manual updates.
- **Fix**: Derive from `CAREER.YEARS_TEACHING`, `researchData.projects.length`, `researchIdentity.primaryAreas.length`.

#### F-116 — HOME: connect-section.tsx Uses Raw Color Classes

- **Category**: Theme | **Severity**: MEDIUM
- **File**: `src/features/home/components/connect-section.tsx`
- **Issue**: Uses `text-blue-500`, `bg-teal-500/10`, `text-green-600`, `text-purple-500`, `text-indigo-500`, `text-rose-500` instead of CSS custom properties. These won't adapt to theme changes.
- **Fix**: Replace with semantic tokens (`--primary`, `--secondary`, `--accent`).

#### F-117 — HOME: FeaturedGrant Content Hardcoded in JSX

- **Category**: Data | **Severity**: MEDIUM
- **File**: `src/features/home/components/content-previews.tsx`
- **Issue**: Entire grant title, description, PI info, and grant number hardcoded in JSX (L86-121). Should come from a data file (research data exists elsewhere).
- **Fix**: Add featured grant to research data and import.

#### F-120 — TEACH: Unnecessary `'use client'` on 3 Presentational Components

- **Category**: Performance | **Severity**: MEDIUM
- **Files**: `course-card-compact.tsx`, `course-page-layout.tsx`, `schedule-table.tsx`
- **Issue**: These components use no hooks, event handlers, or browser APIs. The `'use client'` directive forces them into the client bundle, increasing JS payload. Server components can import client components.
- **Fix**: Remove `'use client'` from all three.

#### F-121 — UI: Card/Button Primitives Deviate From shadcn/ui

- **Category**: Architecture | **Severity**: MEDIUM
- **Files**: `card.tsx` (hover transform), `button.tsx` (active:scale-95)
- **Issue**: Base primitives have opinionated interactive behaviors (`hover:-translate-y-1`, `active:scale-95`) baked in. Consumers expecting standard shadcn/ui primitives get unexpected animations. Card used inside links creates double hover effect.
- **Fix**: Remove hover/active transforms from primitives; apply at usage site via `className` prop.

#### F-122 — UI: CardTitle Renders `<div>` Instead of Heading

- **Category**: Accessibility | **Severity**: MEDIUM
- **File**: `src/shared/components/ui/card.tsx`
- **Issue**: `CardTitle` renders a `<div>` — standard shadcn/ui uses `<h3>` for proper heading semantics. Degrades screen-reader experience.
- **Fix**: Change to `<h3>` or use `as` prop pattern.

#### F-123 — SITEMAP: `new Date()` Causes Unnecessary Git Diffs

- **Category**: SEO | **Severity**: MEDIUM
- **File**: `src/app/sitemap.ts`
- **Issue**: Uses `new Date().toISOString()` for `lastModified` — every build generates a new date, causing unnecessary sitemap changes in git history.
- **Fix**: Use a fixed date or read from git history.

#### F-124 — TEST: Duplicated Icon Mocks Across 5+ Test Files

- **Category**: Testing | **Severity**: MEDIUM
- **Files**: `setup.ts`, `navbar.test.tsx`, `navbar.active.test.tsx`, `sidebar.a11y.test.tsx`, `sidebar.test.tsx`
- **Issue**: lucide-react icons mocked independently in 5+ files with different subsets. Maintenance burden — adding a new icon requires updating multiple mock files.
- **Fix**: Centralize all icon mocks in `setup.ts` using Proxy-based auto-mock.

#### F-125 — TEST: Sheet Tests Verify Mocks Not Components

- **Category**: Testing | **Severity**: MEDIUM
- **File**: `tests/sheet.test.tsx`
- **Issue**: Tests acknowledge "With mocked components, escape behavior won't work" — tests verify mocks render, not real component behavior. "Close sheet with escape key" test asserts content is STILL present after escape (opposite of intended).
- **Fix**: Use real Radix components for integration tests or mark as smoke tests.

#### F-127 — APP: research/page.tsx Monolithic (393 LOC)

- **Category**: Architecture | **Severity**: MEDIUM
- **File**: `src/app/research/page.tsx`
- **Issue**: The largest page at 393 LOC. Contains hero, vision, research areas, projects, open source, goals, and CTA sections inline. Unlike about/page.tsx (57 LOC) which delegates to feature components.
- **Fix**: Extract sections into `features/research/components/`.

### MEDIUM (Existing — Session 9 Audit)

#### F-010 — ARCH: Oversized Profile Sidebar

- **Category**: Architecture | **Severity**: MEDIUM
- **File**: `src/shared/components/layout/profile-sidebar.tsx` (419 LOC)
- **Issue**: Single monolithic component handles profile photo, name, title, social links, navigation, and contact info.
- **Fix**: Extract into smaller sub-components.

#### F-015 — SEC: \_headers Not Applied on GitHub Pages

- **Category**: Security | **Severity**: MEDIUM
- **File**: `public/_headers`
- **Issue**: Security headers (HSTS, CSP) in `_headers` file are NOT applied by GitHub Pages. Only Cloudflare Pages and Netlify support this format.
- **Fix**: Document this limitation. For actual enforcement, would need Cloudflare proxy or `<meta>` tags for CSP.

#### F-016 — TEST: Coverage for Feature and Utility Modules

- **Category**: Testing | **Severity**: MEDIUM
- **Issue**: Feature modules had 0% coverage. Added 4 new test files (20 tests) covering `course-utils`, `get-type-icon`, `teaching/styles`, `useDebounce`. Coverage improved from 34.82% → 35.78% stmts, 65.31% → 68.26% branches, 20.1% → 22.63% functions.
- **Remaining**: React component render/snapshot tests for teaching, about, and home sections.

#### F-067 — ARCH: 7 Validation Schema Files for Mostly Static Data

- **Category**: Architecture | **Severity**: MEDIUM
- **Files**: `src/shared/lib/validation/` (7 schema files)
- **Issue**: Zod validation schemas for data that is hardcoded TypeScript objects — not user input, not API responses. Validation only runs at import time, adding startup cost for no runtime safety benefit.
- **Fix**: Evaluate whether TypeScript types alone would suffice, keeping Zod only for user-facing inputs (contact form, search queries).

#### F-092 — SEO: Missing `sameAs` Profiles in Structured Data

- **Category**: SEO | **Severity**: MEDIUM
- **File**: `src/shared/lib/structured-data.ts`
- **Issue**: Person structured data `sameAs` array may be missing some academic profiles (ResearchGate, Semantic Scholar).
- **Fix**: Audit `sameAs` against `researcher-profile.ts` and ensure all academic profiles are included.

#### F-093 — SEO: No `ProfilePage` Schema.org Type

- **Category**: SEO | **Severity**: MEDIUM
- **File**: `src/app/about/page.tsx`
- **Issue**: About page uses generic `Person` schema but not the 2024 `ProfilePage` structured data type that Google now supports for profile pages.
- **Fix**: Add `ProfilePage` structured data alongside existing `Person` schema.

#### F-094 — PWA: Missing `apple-touch-icon` Link Tag

- **Category**: PWA | **Severity**: MEDIUM
- **File**: `src/app/layout.tsx`
- **Issue**: No `<link rel="apple-touch-icon">` for iOS home screen icon. Safari ignores `site.webmanifest` icons.
- **Fix**: Add `apple-touch-icon` link tag pointing to 180×180 PNG.

#### F-095 — PERF: Framer Motion Not Code-Split

- **Category**: Performance | **Severity**: MEDIUM
- **File**: `src/shared/components/common/motion-page.tsx`
- **Issue**: `framer-motion` (~50KB gzipped) is imported but only used in one component. Should be dynamically imported.
- **Fix**: Use `next/dynamic` with `ssr: false` for motion-page, or replace with CSS transitions + View Transitions API.

#### F-096 — PERF: No CSS `content-visibility` for Long Pages

- **Category**: Performance | **Severity**: MEDIUM
- **Issue**: Research and Publications pages have many items. No `content-visibility: auto` applied to off-screen sections.
- **Fix**: Add `content-visibility: auto; contain-intrinsic-size: auto 500px` to repeating card containers.

#### F-097 — TEST: No Component Render Tests for Feature Modules

- **Category**: Testing | **Severity**: MEDIUM
- **Issue**: Feature modules (about, home, teaching, academic) have 0 component render tests. Only utility functions are tested.
- **Fix**: Add render tests for key components: hero-section, course-card, publication-card, search-input.

#### F-098 — DX: No Lighthouse CI in GitHub Actions

- **Category**: Developer Experience | **Severity**: MEDIUM
- **Issue**: No automated performance budget or accessibility audit in CI. Regressions can slip through.
- **Fix**: Add `@lhci/cli` to CI pipeline with performance budget assertions.

### LOW (New — Session 10 Deep Audit)

#### F-130 — DEPRECATED: `window.pageYOffset` Used in 2 Files

- **Category**: Deprecated API | **Severity**: LOW
- **Files**: `back-to-top.tsx`, `hash-scroll.tsx`
- **Issue**: `window.pageYOffset` is deprecated. Use `window.scrollY`.
- **Fix**: Replace with `window.scrollY`.

#### F-131 — UI: stat-card.tsx Hardcoded Purple Spotlight Color

- **Category**: Theme | **Severity**: LOW
- **File**: `src/shared/components/common/stat-card.tsx`
- **Issue**: `spotlightColor="rgba(124, 58, 237, 0.15)"` hardcodes purple. Should derive from CSS variable to match user's theme.
- **Fix**: Use `hsl(var(--primary) / 0.15)` or accept via prop.

#### F-132 — ABOUT: beyond-academia.tsx Inline Data

- **Category**: Data | **Severity**: LOW
- **File**: `src/features/about/components/beyond-academia.tsx`
- **Issue**: "Amateur Radio Operator" and "Community Engagement" items are hardcoded inline. Inconsistent with other about sections that source from data files.
- **Fix**: Add to about data file.

#### F-133 — ABOUT: skills-section.tsx Fragile Icon Mapping

- **Category**: Architecture | **Severity**: LOW
- **File**: `src/features/about/components/skills-section.tsx`
- **Issue**: Maps category names (strings) to icons — if a category name in data changes, icon silently falls back. Icon should be part of the data model.
- **Fix**: Add icon to `technicalSkills` data.

#### F-134 — ACADEMIC: Emojis Instead of Lucide Icons

- **Category**: Consistency | **Severity**: LOW
- **File**: `src/features/academic/utils/get-type-icon.ts`
- **Issue**: Returns emoji strings (📄, 📚, 💼, 📰) while rest of codebase uses Lucide icon components. Emojis render differently across platforms.
- **Fix**: Return Lucide icon components or icon names from `iconNameSchema`.

#### F-135 — ACADEMIC: search-result-card.tsx Misleading cursor-pointer

- **Category**: Accessibility | **Severity**: LOW
- **File**: `src/features/academic/components/search-result-card.tsx`
- **Issue**: Card has `cursor-pointer` class but is not clickable — only the "View" button is interactive. Misleading affordance.
- **Fix**: Remove `cursor-pointer` from Card or make entire card clickable.

#### F-136 — TEACH: course-page-layout.tsx 5 Identical Section Dividers

- **Category**: DRY | **Severity**: LOW
- **File**: `src/features/teaching/course-page-layout.tsx`
- **Issue**: Section divider markup (colored line) is copy-pasted 5 times with identical JSX.
- **Fix**: Extract `<SectionDivider />` component.

#### F-137 — TEACH: resources-section.tsx Icon by Substring Match

- **Category**: Architecture | **Severity**: LOW
- **File**: `src/features/teaching/components/resources-section.tsx`
- **Issue**: `getSectionIcon()` maps section titles by `title.includes('Tool')` — fragile substring matching. "Toolkit" or "Toolbox" would also match.
- **Fix**: Add icon to resource data model.

#### F-138 — TEACH: Hover-Only Resource Links Inaccessible

- **Category**: Accessibility | **Severity**: LOW
- **File**: `src/features/teaching/components/resources-section.tsx`
- **Issue**: Resource card links appear only on hover (`opacity-0 group-hover:opacity-100`). Invisible to keyboard users and screen readers.
- **Fix**: Always show links, or add `focus-within:opacity-100`.

#### F-139 — TEACH: teaching/page.tsx Three Pillars Copy-Pasted

- **Category**: DRY | **Severity**: LOW
- **File**: `src/app/teaching/page.tsx`
- **Issue**: Three pillar cards (Hands-On Learning, Outcome-Based, Student Success) are copy-pasted with only icon/title/description differing. Should be a data array + map.
- **Fix**: Extract to data array and `.map()`.

#### F-141 — CONFIG: `hasDetailPage` Deprecated Field Still in Schema

- **Category**: Architecture | **Severity**: LOW
- **File**: `src/shared/lib/validation/course-schema.ts`
- **Issue**: `hasDetailPage: z.boolean().optional()` with comment "Deprecated: kept for backward compatibility." The `tier` field has fully replaced this. Dead schema field.
- **Fix**: Remove `hasDetailPage` from schema and all course data.

#### F-142 — CONFIG: CAREER Getter Inside `as const` Object

- **Category**: Code Quality | **Severity**: LOW
- **File**: `src/shared/config/constants.ts`
- **Issue**: `get YEARS_TEACHING()` inside `as const` assertion is an unusual pattern. The getter works at runtime but `as const` types narrow incorrectly (infers literal type for a dynamic value).
- **Fix**: Use a function `getYearsTeaching()` instead of a getter.

#### F-143 — TEST: Sidebar Tests Verify State, Not Behavior

- **Category**: Testing | **Severity**: LOW
- **File**: `tests/sidebar.test.tsx`
- **Issue**: Multiple tests mock child components so heavily that they only verify state management, not actual UI behavior. Comments acknowledge "the state doesn't actually change."
- **Fix**: Use partial mocking or integration tests with real components.

#### F-144 — CONFIG: next.config.ts Dead `headers()` Function

- **Category**: Architecture | **Severity**: LOW
- **File**: `next.config.ts`
- **Issue**: `headers()` function is defined but with `output: 'export'` it's completely ignored by Next.js. Dead code.
- **Fix**: Remove or move to documentation comment.

### LOW (Existing — Session 9 Audit)

#### F-018 — ARCH: useToast Module Complexity

- **Category**: Architecture | **Severity**: LOW
- **File**: `src/shared/hooks/use-toast.ts` (224 LOC)
- **Issue**: Custom toast state management (224 LOC) when `sonner` or simpler alternatives exist.
- **Fix**: Consider if custom implementation is worth the maintenance vs. a library.

#### F-020 — ARCH: Command Menu Complexity

- **Category**: Architecture | **Severity**: LOW
- **File**: `src/shared/components/ui/command-menu.tsx` (189 LOC)
- **Issue**: Full command palette for a static portfolio site. Nice feature but adds complexity.
- **Fix**: Evaluate if users actually use it. Consider analytics data before removing.

#### F-021 — SEO: Redirect Routes in Build Output

- **Category**: SEO | **Severity**: LOW
- **Files**: `src/app/experience/page.tsx`, `src/app/service-awards/page.tsx`
- **Issue**: These routes exist only to redirect. They generate HTML pages that immediately redirect client-side.
- **Fix**: Document as intentional (preserving old URLs) or implement actual 301 redirects if using a CDN.

#### F-022 — DATA: Hardcoded Academic Profile URLs

- **Category**: Data | **Severity**: LOW
- **File**: `src/shared/config/researcher-profile.ts`
- **Issue**: Academic profile URLs (Google Scholar, ORCID, etc.) are hardcoded in config. Not validated by Zod schemas.
- **Fix**: Consider adding URL validation schema for profile links.

#### F-023 — PERF: Framer Motion Bundle Size

- **Category**: Performance | **Severity**: LOW
- **Issue**: `framer-motion` (12.29.0) is a large dependency for page transitions and animations.
- **Fix**: Monitor bundle size. Consider CSS transitions for simple animations.

#### F-025 — CI: Dependabot Branch Accumulation

- **Category**: CI/CD | **Severity**: LOW
- **Issue**: 24 dependabot branches accumulating. Should be merged or closed regularly.
- **Fix**: Set up auto-merge for patch updates, review and close stale branches.

### INFO

#### F-028 — INFO: glob Override Pinned

- **Issue**: `glob` is overridden to 10.1.0 in package.json. This was done to resolve breaking changes.
- **Note**: Revisit periodically to see if the override can be removed.

#### F-029 — INFO: TypeScript Version Capped

- **Issue**: TypeScript pinned to `^5.6.x` while latest is 5.9.x.
- **Note**: Intentional — Next.js 16 may not support newer TS versions.

#### F-030 — INFO: Static Export Header Warning

- **Issue**: Build warns that `_headers` is not applied during static export.
- **Note**: Expected behavior. Headers file is for CDN platforms, not Next.js.

#### F-031 — INFO: No Preview/Staging Environment

- **Issue**: Only main branch deploys. No staging URL for review.
- **Note**: GitHub Pages only supports one branch. Consider Vercel for preview deployments.

#### F-048 — INFO: Error Boundary Console Statements Unguarded

- **Files**: `src/shared/components/common/error-fallback.tsx`, `src/shared/components/ui/error-boundary.tsx`
- **Issue**: Error boundaries use `console.error()` without `process.env.NODE_ENV` guard.
- **Note**: Acceptable — error boundaries are the correct place to log errors. Replace with Sentry/similar when available.

#### F-049 — INFO: global-error.tsx Uses Hardcoded Colors

- **File**: `src/app/global-error.tsx`
- **Issue**: Uses hardcoded `bg-white`, `bg-gray-*`, `text-gray-*`, `bg-blue-600` instead of theme tokens.
- **Note**: Intentional — `global-error.tsx` catches errors in the root layout, theme provider may be unavailable.

### INFO (New — Session 10 Deep Audit)

#### F-145 — INFO: academic-profiles.tsx String Template Instead of cn()

- **File**: `src/shared/components/common/academic-profiles.tsx`
- **Issue**: Uses string template `\`${baseClasses} ${colorClasses}\``for className instead of`cn()` used everywhere else. Also casts icon type unsafely.
- **Note**: Minor inconsistency. Fix when touching the file.

#### F-146 — INFO: time-display.tsx Hardcoded Label

- **File**: `src/shared/components/common/time-display.tsx`
- **Issue**: Displays "My Time (Dhaka)" — label and timezone (`Asia/Dhaka`) are hardcoded. Should source from `personalIdentity` or config.
- **Note**: Low impact — single location, easy to update.

#### F-147 — INFO: back-to-top.tsx Position Conflict with ThemeSelector

- **File**: `src/shared/components/common/back-to-top.tsx`
- **Issue**: Positioned `bottom-8 right-8` which overlaps with ThemeSelector's floating variant at `bottom-6 right-6`. One button may obscure the other.
- **Note**: Rarely both visible at once, but consider stacking offset.

#### F-148 — INFO: schedule-table.tsx Missing Table Caption

- **File**: `src/features/teaching/components/schedule-table.tsx`
- **Issue**: `<table>` has no `<caption>` element. Screen readers benefit from a table caption describing the table's purpose.
- **Note**: Add `<caption className="sr-only">Course schedule for {semesterLabel}</caption>`.

#### F-149 — INFO: Hash Scroll Hardcoded navbarHeight and Memory Leak

- **File**: `src/shared/components/common/hash-scroll.tsx`
- **Issue**: `navbarHeight = 80` is hardcoded instead of reading from CSS/DOM. Also, `setTimeout` in effect lacks cleanup, potential memory leak on rapid navigation.
- **Note**: Works in practice, fix when refactoring.

#### F-150 — INFO: cv-content.client.tsx viewCV Fires Twice in Strict Mode

- **File**: `src/app/cv/cv-content.client.tsx`
- **Issue**: `useEffect` calls `trackEvent(analyticsEvents.viewCV)` on mount. In React Strict Mode (dev), this fires twice. No dedup or flag.
- **Note**: Only affects dev mode. Production is fine.

#### F-151 — INFO: Course Lookup Duplicated in generateMetadata and Page

- **File**: `src/app/teaching/[institution]/[courseCode]/page.tsx`
- **Issue**: Course data lookup logic appears in both `generateMetadata()` and the page component. Could extract a shared `getCourseByParams()` helper.
- **Note**: Next.js caches `fetch` but not in-memory lookups during static export. Still worth extracting for clarity.

#### F-152 — INFO: Dead Error Boundaries for Redirect Routes

- **Files**: `experience/error.tsx`, `service-awards/error.tsx`
- **Issue**: These routes use `redirect()` in their page components, so the error boundary is unreachable — redirect happens before any rendering error could occur.
- **Note**: No runtime impact. Can remove for cleanliness.

---

## Resolved Findings

### Resolved in Phase 4 System Audit Remediation (2026-02-20)

| ID    | Category      | Severity | Title                                                       | Resolution                                                     |
| ----- | ------------- | -------- | ----------------------------------------------------------- | -------------------------------------------------------------- |
| F-099 | Bug           | CRITICAL | Division-by-Zero in IUB Page Average Rating                 | Added defensive guard against length 0.                        |
| F-100 | Security/Data | CRITICAL | PII Hardcoded in Source Code (Phone Number)                 | Replaced with siteConfig references.                           |
| F-101 | Data          | CRITICAL | CV Content Hardcoded (Data Drift Risk)                      | Sourced from dynamic CV data arrays.                           |
| F-102 | Bug           | HIGH     | Contest Countdown Never Ticks                               | Converted to dynamic ticker state with derived calculations.   |
| F-103 | Bug           | HIGH     | Missing 'use client' in collapsible-section.tsx             | Added 'use client' directive.                                  |
| F-104 | Bug           | HIGH     | Missing 'use client' in publication-card.tsx                | Added 'use client' directive.                                  |
| F-105 | SEO/Data      | HIGH     | Structured Data timeRequired: 'P1S' (1 second)              | Changed to 'P16W'.                                             |
| F-106 | Theme         | HIGH     | spotlight-card.tsx Hardcoded Dark Colors                    | Replaced with theme-aware semantic tokens.                     |
| F-107 | Accessibility | HIGH     | collapsible-section.tsx Not Keyboard Accessible             | Replaced div with native semantic button element.              |
| F-108 | Architecture  | HIGH     | Duplicate Metadata in Publications Page and Layout          | Removed duplicated metadata from layout.tsx.                   |
| F-109 | Type Safety   | MEDIUM   | z.any() Bypasses Type Safety in 3 Schema Files              | Replaced with z.custom<LucideIcon>().                          |
| F-110 | Data          | MEDIUM   | TOTAL_STUDENTS: 1000 Contradicts Dynamic Calculation        | Calculated dynamically using getTotalStudentsFromCourses().    |
| F-113 | Theme         | MEDIUM   | darkMode: 'class' vs attribute="data-theme" Mismatch        | Synchronized with next-themes specific selector.               |
| F-118 | Type Safety   | MEDIUM   | Notice Board Type Drifts from Schema                        | Derived directly from CourseData['notices'].                   |
| F-119 | DRY           | MEDIUM   | Course URL Construction Duplicated                          | Extracted to getCoursePath() utility in course-utils.ts.       |
| F-126 | DRY           | MEDIUM   | 11 Identical Error Boundary Files                           | Consolidated using a HOC factory function createErrorBoundary. |
| F-128 | DRY           | LOW      | theme-selector.tsx 335 LOC with 3 Duplicated Variant Blocks | Extracted ThemeCategoryList subcomponent.                      |
| F-129 | Architecture  | LOW      | pdf-viewer.tsx Domain Components in ui/ Primitives          | Moved to shared/components/common/.                            |
| F-140 | DRY           | LOW      | bracu/page.tsx and iub/page.tsx Near-Identical              | Extracted into shared InstitutionCoursesPage.                  |

### Resolved in Session 8 Deep Re-Audit (2026-02-19)

| ID    | Category     | Severity | Title                                                                 | Resolution                                                                                        |
| ----- | ------------ | -------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| F-071 | Quality      | HIGH     | CSS variable mismatch: `--max-content-width` vs `--content-max-width` | Fixed tailwind.config.ts to use `var(--content-max-width)` matching tokens.css                    |
| F-072 | Architecture | HIGH     | Duplicate `sanitizeJsonLd` in structured-data.ts and .tsx             | Removed local copy in .tsx, imports from shared lib                                               |
| F-073 | Architecture | HIGH     | 8 dead `academicEvents` methods in analytics.ts                       | Pruned to 4 wired methods (viewCV, downloadCV, viewPublication, downloadPublication). 138→54 LOC  |
| F-074 | Testing      | HIGH     | Coverage thresholds at 15% — no quality gate                          | Raised to 30% lines/branches/statements, 20% functions                                            |
| F-075 | Architecture | MEDIUM   | Dead `motionPreferences` export in themes.ts (never imported)         | Deleted ~14 LOC                                                                                   |
| F-076 | Quality      | MEDIUM   | Custom `.sr-only` CSS duplicates Tailwind's built-in                  | Removed from tokens.css (~12 LOC)                                                                 |
| F-077 | Testing      | MEDIUM   | `basic.test.ts` placeholder (`1+1=2`) provides zero value             | Replaced with 8 meaningful smoke tests (site config, navigation, themes, analytics exports)       |
| F-078 | Data         | HIGH     | Hardcoded "Spring 2026 Semester" in schedule-table.tsx                | Made `semesterLabel` prop, derived from course `semester` + `year` fields in schedule-section.tsx |
| F-079 | Architecture | MEDIUM   | Hardcoded `baseUrl` in assets.ts (not centralized)                    | Created `SITE_URL` constant in assets.ts, used by both `getAssetUrl()` and `siteConfig.url`       |
| F-080 | Architecture | MEDIUM   | 2 duplicate nav icon maps (profile-sidebar, command-menu)             | Created shared `navIconMap` in `src/shared/lib/nav-icon-map.ts`, both components import it        |
| F-081 | Architecture | LOW      | Garbage `--version/` directory (17 husky scripts) at root             | Deleted                                                                                           |

### Resolved in Phase 4 Deep Audit (2026-02-18)

| ID    | Category      | Severity | Title                                                                      | Resolution                                                                                                              |
| ----- | ------------- | -------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| F-053 | Security      | HIGH     | cv/error.tsx leaks `error.message` to production                           | Replaced hand-rolled Card UI with standard `ErrorFallback` component                                                    |
| F-054 | Quality       | HIGH     | eslint-config-next@15 mismatched with Next.js 16                           | Updated to `^16.1.4`, rewrote eslint.config.mjs to native flat config, removed `@eslint/eslintrc` and `@eslint/js` deps |
| F-055 | Architecture  | HIGH     | Legacy `.husky/_/` directory (17 scripts from Husky v4/v8)                 | Deleted entire directory — modern Husky 9+ does not use it                                                              |
| F-056 | Architecture  | MEDIUM   | analytics.ts: ~200 LOC dead code (performanceTracker, userBehaviorTracker) | Deleted trackers, 5 helper functions, 2 interfaces. 346 to 138 LOC                                                      |
| F-057 | Architecture  | MEDIUM   | courses.ts: 7 unused utility functions never imported                      | Deleted 7 unused exports. 114 to 48 LOC                                                                                 |
| F-058 | Quality       | MEDIUM   | AI traces in comments (comprehensive, world-class, leverage)               | Rewrote JSDoc in 5 files: teaching-stats.ts, course-schema.ts, course page, hero-section, CONTRIBUTING.md               |
| F-059 | Quality       | MEDIUM   | tailwind.config.ts: decorative ASCII, emoji, planned themes banner         | Complete rewrite. Removed all decorative separators, emoji, author/version tags. 251 to 165 LOC                         |
| F-060 | Architecture  | MEDIUM   | next.config.ts: dead `outputFileTracingRoot` and `remotePatterns`          | Removed both — no effect with `output: 'export'` and `unoptimized: true`                                                |
| F-061 | Architecture  | MEDIUM   | Missing error boundary for `/service` route                                | Created `src/app/service/error.tsx` with standard ErrorFallback                                                         |
| F-062 | Quality       | LOW      | TOAST_REMOVE_DELAY = 1000000 (~17 minutes instead of ~10 seconds)          | Changed to 10_000                                                                                                       |
| F-063 | CI/CD         | LOW      | ci.yml runs tests twice (test:run then test:coverage)                      | Removed redundant `test:run` step                                                                                       |
| F-064 | CI/CD         | LOW      | nextjs.yml uses `npm install` instead of `npm ci`                          | Changed to `npm ci --no-audit` for deterministic builds                                                                 |
| F-065 | Documentation | LOW      | README.md stale values (ESLint 8, 13 themes, 109 tests, Zod 4.3)           | Updated: ESLint 9, 6 themes, 129+ tests, Zod 4. Removed stale `npm run start` row                                       |
| F-066 | Architecture  | MEDIUM   | Stale build artifacts (6 tsbuildinfo, coverage/, out/, og-image.svg)       | Deleted all orphan files                                                                                                |
| F-068 | Quality       | MEDIUM   | schedule-table.tsx: 5 inner component definitions (unstable identity)      | Extracted all 5 components to module level                                                                              |
| F-069 | Quality       | MEDIUM   | 3 files use useState+useEffect for mounted detection (anti-pattern)        | Created `useIsClient` hook via `useSyncExternalStore`. Refactored cv-content, time-display, back-to-top                 |
| F-070 | Quality       | LOW      | eslint.config.mjs FlatCompat bridge legacy (unneeded with next@16)         | Rewrote to native flat config imports from `eslint-config-next/*`                                                       |
| F-013 | Performance   | MEDIUM   | Analytics module size (345 LOC)                                            | Resolved by F-056 — pruned to 138 LOC                                                                                   |
| F-027 | Quality       | INFO     | eslint-config-next version mismatch (15 vs 16)                             | Resolved by F-054 — upgraded to ^16.1.4 with native flat config                                                         |

### Resolved in Phase 3 Hardening (2026-02-18)

| ID    | Category      | Severity | Title                                                 | Resolution                                                                                       |
| ----- | ------------- | -------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| F-003 | SEO           | HIGH     | CV page cannot export metadata (`'use client'`)       | Extracted `cv-content.client.tsx`, page is now server with `export const metadata`               |
| F-006 | Accessibility | HIGH     | Keyboard navigation for teaching tabs                 | Confirmed Radix `@radix-ui/react-tabs` provides full keyboard support                            |
| F-007 | SEO           | MEDIUM   | OG image is SVG (social platforms cannot render)      | Converted to 1200x630 PNG, updated `assets.ts`                                                   |
| F-008 | PWA           | MEDIUM   | Missing 192x192 and 512x512 app icons                 | Generated from new `icon.svg`, updated `site.webmanifest`                                        |
| F-026 | Documentation | LOW      | Package version `1.0.0` vs git tag `v1.1.1-stable`    | Bumped to `1.2.0`                                                                                |
| F-047 | Accessibility | LOW      | Hardcoded colors bypass theme in teaching components  | Migrated 12 replacements across 7 files to semantic tokens                                       |
| F-050 | Quality       | LOW      | AI fingerprints and stale docs                        | Removed emoji, AI auditor attribution, AI language, updated humans.txt                           |
| F-051 | Architecture  | MEDIUM   | Non-semantic colors across teaching/shared components | Full migration to semantic tokens                                                                |
| F-052 | Architecture  | MEDIUM   | Missing error boundaries for teaching sub-routes      | Added `error.tsx` for `/teaching/iub`, `/teaching/bracu`, `/teaching/[institution]/[courseCode]` |

### Resolved in Cockpit Audit (2026-02-18)

| ID    | Category      | Severity | Title                                                         | Resolution                                                    |
| ----- | ------------- | -------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| F-001 | Security      | HIGH     | XSS in JSON-LD via raw `JSON.stringify`                       | Added `sanitizeJsonLd()` with HTML entity escaping            |
| F-002 | Security      | HIGH     | Missing HSTS and CSP headers                                  | Added to `public/_headers`                                    |
| F-032 | SEO           | HIGH     | Sitemap includes redirect stubs, missing teaching routes      | Rewrote sitemap with dynamic course generation                |
| F-033 | SEO           | MEDIUM   | Bogus SearchAction in structured data                         | Removed (no /search page exists)                              |
| F-034 | SEO           | MEDIUM   | Incomplete OpenGraph metadata                                 | Added type, locale, siteName, description, url, Twitter cards |
| F-035 | Data          | MEDIUM   | Structured data image path wrong                              | Fixed to use `assetPaths.profile`                             |
| F-036 | A11Y          | MEDIUM   | Skip-link `tabIndex={1}` (WCAG anti-pattern)                  | Changed to `tabIndex={0}`                                     |
| F-037 | A11Y          | MEDIUM   | PDF viewer hardcoded colors bypass theme                      | Replaced with theme tokens                                    |
| F-038 | Perf          | LOW      | `teaching-cta.tsx` unnecessary `'use client'`                 | Removed directive                                             |
| F-039 | Perf          | LOW      | `footer-year.tsx` unnecessary `'use client'`                  | Removed directive                                             |
| F-040 | Quality       | LOW      | Console statements in production code                         | Guarded behind `process.env.NODE_ENV !== 'production'`        |
| F-041 | Quality       | LOW      | Double-redirect chain (/service to /service-awards to /about) | Direct redirect to `/about#honors-awards`                     |
| F-042 | Quality       | LOW      | 7 `target="_blank"` links missing `rel="noopener noreferrer"` | Fixed all 7 instances                                         |
| F-043 | Quality       | LOW      | Test asserting buggy `tabIndex={1}` behavior                  | Updated test to expect `tabIndex={0}`                         |
| F-009 | Architecture  | MEDIUM   | 614-line monolithic `schemas.ts`                              | Split into 7 domain modules + barrel                          |
| F-011 | Architecture  | MEDIUM   | 13 themes (695 LOC) overengineered                            | Reduced to 6 themes, saved ~308 LOC                           |
| F-012 | Architecture  | MEDIUM   | Empty publications feature module                             | Deleted dead re-export                                        |
| F-014 | Architecture  | MEDIUM   | 19 barrel files hurt tree-shaking                             | Removed 10 dead barrels, kept 8 healthy                       |
| F-017 | Architecture  | LOW      | Unused FooterYear component                                   | Deleted dead code                                             |
| F-019 | Architecture  | LOW      | ThemeSelector bloated by 13 themes                            | Reduced to 6, removed 7 icon imports                          |
| F-024 | Accessibility | LOW      | 13 themes = 26 contrast combos                                | Reduced to 6 themes, manageable audit scope                   |
| F-045 | Documentation | INFO     | Cockpit docs had 30+ stale data points                        | Full cross-validation and sync of all cockpit documents       |
| F-046 | Architecture  | LOW      | Empty `src/features/publications/` directory                  | Deleted empty directory                                       |

### Previously Acceptable (No Action Needed)

| ID    | Category | Severity | Title                         | Reason                                                    |
| ----- | -------- | -------- | ----------------------------- | --------------------------------------------------------- |
| F-044 | Security | INFO     | npm audit: 10 vulnerabilities | ajv is dev-only; Next.js vulns mitigated by static export |
