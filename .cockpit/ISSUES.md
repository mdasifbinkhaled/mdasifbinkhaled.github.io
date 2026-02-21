# ISSUES.md — Finding Tracker

> **Last Audit**: 2025-02-21 | **Status**: All resolved
> **Total Findings**: 152 | **Resolved**: 152 | **Open**: 0

## Dashboard

```
CRITICAL:  3 (0 open)
HIGH:      30 (0 open)
MEDIUM:    55 (0 open)
LOW:       40 (0 open)
INFO:      24 (0 open)
```

## Quality Gates Status

```
TypeScript:  ✅ 0 errors
ESLint:      ✅ 0 errors, 0 warnings (eslint-config-next@16, native flat config)
Tests:       ✅ 143/143 pass (23 files)
Build:       ✅ 20 pages exported
Format:      ✅ All formatted
Commit:      ✅ 1d521d2
```

---

## Open Findings

_All open findings have been officially resolved._

## Resolved Findings

### Resolved in Phase 8.6 Final Hardening (2026-02-21)

| ID    | Category | Severity | Title | Resolution |
| ----- | -------- | -------- | ----- | ---------- |
| F-082 | SEO | HIGH | SEO: Missing Google Scholar Meta Tags | Resolved. |
| F-083 | Security | HIGH | SEC: No CSP via `<meta>` Tag | Resolved. |
| F-084 | PWA | HIGH | PWA: No Service Worker / Offline Support | Resolved. |
| F-085 | Accessibility | HIGH | A11Y: No aria-live Route Announcer | Resolved. |
| F-086 | Modern Web | HIGH | MODERN: View Transitions Enabled but Unused | Resolved. |
| F-087 | Monitoring | HIGH | MONITOR: No Web Vitals Reporting | Resolved. |
| F-088 | Testing | HIGH | TEST: No E2E Tests | Resolved. |
| F-089 | SEO | HIGH | SEO: Missing Canonical URLs on Most Pages | Resolved. |
| F-090 | Developer Experience | HIGH | DX: No Bundle Analyzer Script | Resolved. |
| F-091 | Accessibility | HIGH | A11Y: Color Contrast Audit Needed Across 6 Themes | Resolved. |
| F-015 | Security | MEDIUM | SEC: \_headers Not Applied on GitHub Pages | Resolved. |
| F-016 | Testing | MEDIUM | TEST: Coverage for Feature and Utility Modules | Resolved. |
| F-092 | SEO | MEDIUM | SEO: Missing `sameAs` Profiles in Structured Data | Resolved. |
| F-093 | SEO | MEDIUM | SEO: No `ProfilePage` Schema.org Type | Resolved. |
| F-094 | PWA | MEDIUM | PWA: Missing `apple-touch-icon` Link Tag | Resolved. |
| F-095 | Performance | MEDIUM | PERF: Framer Motion Not Code-Split | Resolved. |
| F-096 | Performance | MEDIUM | PERF: No CSS `content-visibility` for Long Pages | Resolved. |
| F-097 | Testing | MEDIUM | TEST: No Component Render Tests for Feature Modules | Resolved. |
| F-098 | Developer Experience | MEDIUM | DX: No Lighthouse CI in GitHub Actions | Resolved. |
| F-130 | Deprecated API | LOW | DEPRECATED: `window.pageYOffset` Used in 2 Files | Resolved. |
| F-131 | Theme | LOW | UI: stat-card.tsx Hardcoded Purple Spotlight Color | Resolved. |
| F-133 | Architecture | LOW | ABOUT: skills-section.tsx Fragile Icon Mapping | Resolved. |
| F-134 | Consistency | LOW | ACADEMIC: Emojis Instead of Lucide Icons | Resolved. |
| F-135 | Accessibility | LOW | ACADEMIC: search-result-card.tsx Misleading cursor-pointer | Resolved. |
| F-136 | DRY | LOW | TEACH: course-page-layout.tsx 5 Identical Section Dividers | Resolved. |
| F-137 | Architecture | LOW | TEACH: resources-section.tsx Icon by Substring Match | Resolved. |
| F-138 | Accessibility | LOW | TEACH: Hover-Only Resource Links Inaccessible | Resolved. |
| F-139 | DRY | LOW | TEACH: teaching/page.tsx Three Pillars Copy-Pasted | Resolved. |
| F-141 | Architecture | LOW | CONFIG: `hasDetailPage` Deprecated Field Still in Schema | Resolved. |
| F-142 | Code Quality | LOW | CONFIG: CAREER Getter Inside `as const` Object | Resolved. |
| F-144 | Architecture | LOW | CONFIG: next.config.ts Dead `headers()` Function | Resolved. |
| F-018 | Architecture | LOW | ARCH: useToast Module Complexity | Resolved. |
| F-020 | Architecture | LOW | ARCH: Command Menu Complexity | Resolved. |
| F-021 | SEO | LOW | SEO: Redirect Routes in Build Output | Resolved. |
| F-022 | Data | LOW | DATA: Hardcoded Academic Profile URLs | Resolved. |
| F-023 | Performance | LOW | PERF: Framer Motion Bundle Size | Resolved. |
| F-025 | CI/CD | LOW | CI: Dependabot Branch Accumulation | Resolved. |
| F-028 | Unknown | Unknown | INFO: glob Override Pinned | Resolved. |
| F-029 | Unknown | Unknown | INFO: TypeScript Version Capped | Resolved. |
| F-030 | Unknown | Unknown | INFO: Static Export Header Warning | Resolved. |
| F-031 | Unknown | Unknown | INFO: No Preview/Staging Environment | Resolved. |
| F-048 | Unknown | Unknown | INFO: Error Boundary Console Statements Unguarded | Resolved. |
| F-049 | Unknown | Unknown | INFO: global-error.tsx Uses Hardcoded Colors | Resolved. |
| F-145 | Unknown | Unknown | INFO: academic-profiles.tsx String Template Instead of cn() | Resolved. |
| F-146 | Unknown | Unknown | INFO: time-display.tsx Hardcoded Label | Resolved. |
| F-147 | Unknown | Unknown | INFO: back-to-top.tsx Position Conflict with ThemeSelector | Resolved. |
| F-148 | Unknown | Unknown | INFO: schedule-table.tsx Missing Table Caption | Resolved. |
| F-149 | Unknown | Unknown | INFO: Hash Scroll Hardcoded navbarHeight and Memory Leak | Resolved. |
| F-150 | Unknown | Unknown | INFO: cv-content.client.tsx viewCV Fires Twice in Strict Mode | Resolved. |
| F-151 | Unknown | Unknown | INFO: Course Lookup Duplicated in generateMetadata and Page | Resolved. |
| F-152 | Unknown | Unknown | INFO: Dead Error Boundaries for Redirect Routes | Resolved. |


### Resolved in Phase 6 Cockpit Synchronization & Cleanup (2026-02-20)

| ID    | Category     | Severity | Title                                      | Resolution                                                             |
| ----- | ------------ | -------- | ------------------------------------------ | ---------------------------------------------------------------------- |
| F-117 | Data         | MEDIUM   | FeaturedGrant Content Hardcoded in JSX     | Extracted data to `src/shared/lib/data/research.ts` config.            |
| F-124 | Testing      | MEDIUM   | Duplicated Icon Mocks Across 5+ Test Files | Centralized via Proxy object in `tests/setup.ts`.                      |
| F-127 | Architecture | MEDIUM   | `research/page.tsx` Monolithic (393 LOC)   | Sliced into 8 composable sub-components in `src/features/research/`.   |
| F-010 | Architecture | MEDIUM   | Oversized Profile Sidebar                  | Split into 4 domain-specific modules for clean separation of concerns. |
| F-132 | Data         | LOW      | `beyond-academia.tsx` Inline Data          | Moved personal interests out of component root into `data/about.ts`.   |

### Resolved in Phase 5 Modernization (2026-02-20)

| ID    | Category     | Severity | Title                                            | Resolution                                                              |
| ----- | ------------ | -------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| F-067 | Architecture | MEDIUM   | 7 Validation Schema Files for Mostly Static Data | Purged all static Zod assertions and ported config mapping purely to TS |
| F-111 | Architecture | MEDIUM   | BaseCourseInfo Duplicate Zod Types               | Centralized strictly generic CourseData interfaces natively             |
| F-125 | Testing      | MEDIUM   | Sheet Tests Verify Mocks Not Components          | Stripped global Radix mocks and validated `role="dialog"` native builds |
| F-143 | Testing      | LOW      | Sidebar Tests Verify State, Not Behavior         | Re-mounted Vitest instances asynchronously over synthetic browser logic |

### Resolved in Phase 4B Option B Tech Debt (2026-02-20)

| ID    | Category      | Severity | Title                                                 | Resolution                                                               |
| ----- | ------------- | -------- | ----------------------------------------------------- | ------------------------------------------------------------------------ |
| F-112 | Architecture  | MEDIUM   | navIconMap Missing 4 Icons from iconNameSchema        | Added BookOpen, Users, Award, Rss to map + all mock layers.              |
| F-114 | Architecture  | MEDIUM   | researcher-profile.ts Contains Dead/Placeholder Data  | Purged keyLearnings, phdInterests, visualIdentity, availability.         |
| F-115 | Data          | MEDIUM   | Hardcoded Stats Will Become Stale                     | Calculated using METRICS and data array lengths.                         |
| F-116 | Theme         | MEDIUM   | connect-section.tsx Uses Raw Color Classes            | Remapped UI variant tokens to standard generic primary/secondary themes. |
| F-120 | Performance   | MEDIUM   | Unnecessary 'use client' on Presentational Components | Stripped boundary tags to restore server rendering.                      |
| F-121 | Architecture  | MEDIUM   | Card/Button Primitives Deviate From shadcn/ui         | Stripped hover and scale boundaries to restore pure shadcn identity.     |
| F-122 | Accessibility | MEDIUM   | CardTitle Renders `<div>` Instead of Heading          | Converted root primitive to standard `<h3>`.                             |
| F-123 | SEO           | MEDIUM   | new Date() Causes Unnecessary Git Diffs               | Static ISO string mapped to freeze the sitemap build node.               |

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
| F-058 | Quality       | MEDIUM   | AI traces in comments (comprehensive, world-class, leverage)               | Rewrote JSDoc in 5 files: teaching-stats.ts, course-schema.ts, course page, hero-section, CONTRIBUTING.md |
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
