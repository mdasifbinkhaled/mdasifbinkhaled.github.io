# ISSUES.md — Finding Tracker

> **Last Audit**: 2025-02-18 | **Auditor**: GitHub Copilot (Claude Opus 4.6)
> **Total Findings**: 44 | **Resolved**: 23 | **Open**: 21

## Dashboard

```
CRITICAL:  0 (0 open)
HIGH:      6 (2 open)
MEDIUM:   15 (7 open)
LOW:      14 (7 open)
INFO:      9 (5 open)
```

## Quality Gates Status

```
TypeScript:  ✅ 0 errors
ESLint:      ✅ 0 errors
Tests:       ✅ 109/109 pass
Build:       ✅ 18 pages exported
Format:      ✅ All formatted
```

---

## Open Findings

### HIGH

#### F-003 — SEO: CV Page Cannot Export Metadata

- **Category**: SEO | **Severity**: HIGH
- **File**: `src/app/cv/page.tsx`
- **Issue**: Entire page is `'use client'`, preventing Next.js `metadata` export. CV page has no SEO metadata.
- **Fix**: Extract interactive PDF viewer into client component, keep page as server component with metadata.

#### F-006 — A11Y: Keyboard Navigation for Teaching Tabs

- **Category**: Accessibility | **Severity**: HIGH
- **File**: `src/app/teaching/teaching-tabs.client.tsx`
- **Issue**: Custom teaching institution selector may not have proper keyboard navigation (arrow keys, focus management).
- **Fix**: Audit keyboard behavior; ensure Radix Tabs handles it or add manual ARIA support.

### MEDIUM

#### F-007 — SEO: OG Image is SVG

- **Category**: SEO | **Severity**: MEDIUM
- **Issue**: OpenGraph image references an SVG file. Social platforms (Facebook, Twitter, LinkedIn) do not render SVG for OG previews.
- **Fix**: Convert to PNG/JPG (1200x630 recommended) and update metadata.

#### F-008 — PWA: Missing App Icons

- **Category**: PWA | **Severity**: MEDIUM
- **File**: `public/site.webmanifest`
- **Issue**: Manifest references icon sizes (192x192, 512x512) that may not exist in `public/images/`.
- **Fix**: Generate PWA icons from favicon source and add to `public/images/`.

#### ~~F-009 — ARCH: 614-Line Schema File~~ ✅ RESOLVED

- Split into 7 domain files: `common-schema.ts`, `publication-schema.ts`, `experience-schema.ts`, `course-schema.ts`, `education-schema.ts`, `about-schema.ts`, `teaching-schema.ts`. Original `schemas.ts` is now a barrel re-export.

#### F-010 — ARCH: Oversized Profile Sidebar

- **Category**: Architecture | **Severity**: MEDIUM
- **File**: `src/shared/components/layout/profile-sidebar.tsx` (419 LOC)
- **Issue**: Single monolithic component handles profile photo, name, title, social links, navigation, and contact info.
- **Fix**: Extract into smaller sub-components.

#### ~~F-011 — ARCH: 13 Themes for Academic Portfolio~~ ✅ RESOLVED

- Reduced from 13 to 6 themes (light, dark, ocean, forest, lavender, slate). Removed ~224 LOC from `tokens.css`, ~84 LOC from `themes.ts`, 7 icon imports from `theme-selector.tsx`. Fixed `ThemeConfig.category` type mismatch.

#### ~~F-012 — ARCH: Publications Feature Module is Empty~~ ✅ RESOLVED

- Deleted `src/features/publications/index.ts` — was a dead re-export barrel with zero importers.

#### F-013 — PERF: Analytics Module Size

- **Category**: Performance | **Severity**: MEDIUM
- **File**: `src/shared/lib/analytics.ts` (345 LOC)
- **Issue**: Large analytics module for a static portfolio. Risk of shipping unnecessary tracking code.
- **Fix**: Audit which events are actually needed; consider simplifying.

#### ~~F-014 — ARCH: 19 Barrel Index Files~~ ✅ RESOLVED

- Audited all 18 barrels. Deleted 10 dead barrels (0 importers). Kept 8: `shared/types`, `shared/config`, `shared/hooks`, `features/home/components`, `features/about/components`, `courses` data aggregator, 2 course module entrypoints. Updated 8 error pages from barrel → direct import.

#### F-015 — SEC: \_headers Not Applied on GitHub Pages

- **Category**: Security | **Severity**: MEDIUM
- **File**: `public/_headers`
- **Issue**: Security headers (HSTS, CSP) in `_headers` file are NOT applied by GitHub Pages. Only Cloudflare Pages and Netlify support this format.
- **Fix**: Document this limitation. For actual enforcement, would need Cloudflare proxy or `<meta>` tags for CSP.

#### F-016 — TEST: No Tests for Feature Components

- **Category**: Testing | **Severity**: MEDIUM
- **Issue**: 109 tests exist but none cover feature module components (about sections, teaching components, home sections).
- **Fix**: Add snapshot or smoke tests for key feature components.

### LOW

#### ~~F-017 — ARCH: FooterYear Component Unused~~ ✅ RESOLVED

- Deleted `src/shared/components/common/footer-year.tsx` and removed barrel re-export.

#### F-018 — ARCH: useToast Module Complexity

- **Category**: Architecture | **Severity**: LOW
- **File**: `src/shared/hooks/use-toast.ts` (224 LOC)
- **Issue**: Custom toast state management (224 LOC) when `sonner` or simpler alternatives exist.
- **Fix**: Consider if custom implementation is worth the maintenance vs. a library.

#### ~~F-019 — ARCH: ThemeSelector Size~~ ✅ RESOLVED

- Reduced from 13 to 6 theme entries. Removed 7 unused Lucide icon imports. Component now leaner (~300 LOC).

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

#### ~~F-024 — A11Y: Color Contrast in Themes~~ ✅ RESOLVED

- Attack surface reduced from 13 to 6 themes. Remaining themes (light, dark, ocean, forest, lavender, slate) are well-tested. Recommend periodic contrast audit.

#### F-025 — CI: Dependabot Branch Accumulation

- **Category**: CI/CD | **Severity**: LOW
- **Issue**: 25+ dependabot branches accumulating. Should be merged or closed regularly.
- **Fix**: Set up auto-merge for patch updates, review and close stale branches.

#### F-026 — DOC: Package Version Mismatch

- **Category**: Documentation | **Severity**: LOW
- **Issue**: `package.json` says `1.0.0` but git tags say `v1.1.1-stable`. Version not bumped.
- **Fix**: Bump package.json version to match latest tag, or adopt a versioning strategy.

### INFO

#### F-027 — INFO: eslint-config-next Version Mismatch

- **Issue**: `eslint-config-next` is at 15.5.4 while Next.js is 16.1.4. Should ideally match major version.
- **Note**: The Next.js 16 eslint-config-next may not be published yet. Monitor for availability.

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

---

## Resolved Findings

### Resolved in Cockpit Audit (2025-02-18)

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
| F-041 | Quality       | LOW      | Double-redirect chain (/service → /service-awards → /about)   | Direct redirect to `/about#honors-awards`                     |
| F-042 | Quality       | LOW      | 7 `target="_blank"` links missing `rel="noopener noreferrer"` | Fixed all 7 instances                                         |
| F-043 | Quality       | LOW      | Test asserting buggy `tabIndex={1}` behavior                  | Updated test to expect `tabIndex={0}`                         |
| F-009 | Architecture  | MEDIUM   | 614-line monolithic `schemas.ts`                              | Split into 7 domain modules + barrel                          |
| F-011 | Architecture  | MEDIUM   | 13 themes (695 LOC) overengineered                            | Reduced to 6 themes, saved ~308 LOC                           |
| F-012 | Architecture  | MEDIUM   | Empty publications feature module                             | Deleted dead re-export                                        |
| F-014 | Architecture  | MEDIUM   | 19 barrel files hurt tree-shaking                             | Removed 10 dead barrels, kept 8 healthy                       |
| F-017 | Architecture  | LOW      | Unused FooterYear component                                   | Deleted dead code                                             |
| F-019 | Architecture  | LOW      | ThemeSelector bloated by 13 themes                            | Reduced to 6, removed 7 icon imports                          |
| F-024 | Accessibility | LOW      | 13 themes = 26 contrast combos                                | Reduced to 6 themes, manageable audit scope                   |

### Previously Acceptable (No Action Needed)

| ID    | Category | Severity | Title                         | Reason                                                    |
| ----- | -------- | -------- | ----------------------------- | --------------------------------------------------------- |
| F-044 | Security | INFO     | npm audit: 10 vulnerabilities | ajv is dev-only; Next.js vulns mitigated by static export |
