# ISSUES.md — Finding Tracker

> **Last Audit**: 2026-02-19 | **Auditor**: Forensic Re-Audit (Session 8)
> **Total Findings**: 79 | **Resolved**: 63 | **Open**: 16

## Dashboard

```
CRITICAL:  0 (0 open)
HIGH:      12 (0 open)
MEDIUM:   30 (4 open)
LOW:      27 (6 open)
INFO:      10 (6 open)
```

## Quality Gates Status

```
TypeScript:  ✅ 0 errors
ESLint:      ✅ 0 errors, 0 warnings (eslint-config-next@16, native flat config)
Tests:       ✅ 136/136 pass (22 files)
Build:       ✅ 18 pages exported
Format:      ✅ All formatted
```

---

## Open Findings

### HIGH

_None — all HIGH findings resolved._

### MEDIUM

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

### LOW

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

---

## Resolved Findings

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
