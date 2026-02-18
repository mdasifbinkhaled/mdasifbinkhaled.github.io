# RELEASES.md — Version History

## Current: v1.0.0 (package.json)

Package version has not been bumped since initial setup. Git tags track actual milestones.

## Git Tags

### `v1.1.1-stable`

- Post-modernization stable release
- All quality gates passing

### `v1.1.0-stable`

- First stable release on modern stack
- Next.js 16, React 19, TypeScript 5.6, Zod 4
- Conventional commits adopted
- CI/CD pipelines established

### `checkpoint-pre-sota`

- Pre-modernization checkpoint
- Marked before major stack upgrade

## Unreleased (Current HEAD: `78a43f8`)

### Fixes Applied (Cockpit Audit)

- **SEC-01**: XSS vulnerability in JSON-LD — added `sanitizeJsonLd()` with HTML entity escaping
- **SEC-04**: Added HSTS and CSP security headers to `public/_headers`
- **SEO-01**: Sitemap rewritten — removed redirect stubs, added teaching sub-routes and dynamic course pages
- **SEO-04**: Expanded OpenGraph metadata + added Twitter card tags
- **SEO-05**: Removed bogus SearchAction from structured data (no /search page)
- **A11Y-04**: Fixed skip-link `tabIndex` from 1 to 0 (WCAG compliance)
- **A11Y-05**: PDF viewer hardcoded colors replaced with theme tokens
- **DI-03**: Fixed structured data image path to use `assetPaths.profile`
- **PERF-02**: Removed unnecessary `'use client'` from `teaching-cta.tsx`
- **PERF-03**: Removed unnecessary `'use client'` from `footer-year.tsx`
- **CQ-01/CQ-02**: Console statements guarded behind `process.env.NODE_ENV` check
- **CQ-07**: Fixed double-redirect chain (/service → /about#honors-awards)
- **LINK-01**: All 7 `target="_blank"` links fixed with `rel="noopener noreferrer"`

### Architecture Improvements

- **ARCH-01**: Themes reduced from 13 → 6 (light, dark, ocean, forest, lavender, slate) — removed warm, midnight, sunset, crimson, emerald, indigo, vintage. Cleaned tokens.css, themes.ts, types/index.ts, theme-selector.tsx.
- **ARCH-02**: Validation schemas split from 1 monolithic 614-LOC file into 7 domain files (common, publication, experience, course, education, about, teaching) with barrel re-export. Zero import path changes required.
- **ARCH-03**: Dead barrel cleanup — removed 10 unused barrel index.ts files, updated 8 error page imports. Reduced from 18 → 8 barrels.
- **ARCH-04**: Dead code removed — deleted unused `FooterYear` component and empty `features/publications/index.ts` barrel.

### Quality Status

- TypeScript: 0 errors
- ESLint: 0 errors
- Tests: 109/109 passing
- Build: 18 pages exported successfully

## Recommended Next Release

Tag as `v1.2.0-stable` after committing cockpit audit fixes and `.cockpit/` structure.
