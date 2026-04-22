# RELEASES.md — Version History

## Current: v1.5.0 (package.json)

Bumped from 1.4.0 to 1.5.0 — Stabilization push, WCAG contrast fixes, Sentry lazy-load, cockpit sync.

## Git Tags

### `v1.3.0-stable`

- Final cleanup: dead academic feature removed, missing icons generated
- Cockpit consolidated (PUBLICATION.md merged, SKILL.md removed)
- Local garbage purged, all quality gates passing

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

## Unreleased (Current HEAD)

### Seat Planner Workflow Redesign & Remote Verification (2026-04-22)

- **Commits**: `e43d3e8` and `bae5ecb`
- **Workflow redesign**: Seat Planner now uses a fuller desktop workspace with a sticky right rail for stats, workflow guidance, backup, and reset actions.
- **Input improvements**: bulk faculty assignment, section coverage cues, header-optional room paste, flexible room/capacity parsing, and safer defaults all ship in the live tool.
- **Export improvements**: higher-resolution PNG capture, more document-like PDF output, and cleaner print-ready room sheets.
- **State resilience**: changing allocation mode or sort order recomputes results instead of clearing room and allocation state.
- **Accessibility follow-up**: `bae5ecb` raises reset-action contrast after GitHub CI caught a WCAG AA `color-contrast` regression on `/apps/seat-planner`.
- **Verification**: local `validate:full` passed with 461/461 unit tests, 30 static pages, 118 precached files, and 55/55 Chromium Playwright checks; the full Playwright matrix also passed at 161 passed / 4 skipped. GitHub `CI`, `Security Scanning`, `Deploy Next.js site to Pages`, and `Lighthouse CI` all completed successfully for `bae5ecb`.

### Ground-Up Audit & A11y Remediation (2026-04-12)

- **Service worker registration**: Created `sw-register.tsx` component, imported in root layout — Workbox-generated `out/sw.js` now actually registered
- **A11y audit expansion**: Playwright axe-core suite expanded from 10 to 18 routes, uncovering 7 new violations:
  - `/apps/exam-countdown`: Added aria-labels to 3 inputs and delete button
  - `/apps/gpa-calculator`: Added aria-labels to course name and credits inputs
  - `/apps/seat-planner`: Added aria-labels to 2 SelectTrigger elements
  - `/apps/office-hours`: Fixed color contrast on In-Person/Online badges (`bg-primary/10` → `bg-primary/5`, `text-emerald-600` → `text-emerald-700`)
  - `/blog/welcome`: Fixed tag Badge contrast (`bg-primary/10` → `bg-primary/5`)
  - `/teaching/bracu`, `/teaching/iub`: Fixed course-card (`text-primary/80` → `text-primary`) and stat-card (`text-muted-foreground/80` → `text-muted-foreground`) contrast
- **E2E redirect tests fixed**: Switched from immediate URL check to `page.waitForURL()` for `<meta http-equiv="refresh">` redirect pages
- **Error boundaries**: Re-added `error.tsx` to `/experience`, `/service`, `/service-awards` redirect pages
- **Metadata fix**: `siteConfig.lastUpdated` updated to April 2026
- **Prettier updated**: 3.8.1 → 3.8.2
- **Cockpit sync**: All 9 documentation files synchronized with verified reality
- Quality gates: 0 TS errors, 0 lint errors, 368/368 unit tests (41 files), 49/49 E2E tests (4 files), 25 HTML pages / 27 routes exported

### Blog, Talks, Sentry & Cockpit Sync (2026-04-08)

- **Blog system**: MDX-powered blog at `/blog` with frontmatter (gray-matter) support
  - New dependencies: `next-mdx-remote`, `gray-matter`
  - Note: `next-mdx-remote` is archived upstream; no Shiki/rehype-pretty-code/remark-gfm installed
  - Dynamic `[slug]` route with `generateStaticParams`
  - Error boundaries for both `/blog` and `/blog/[slug]`
- **Talks page**: Conference talks & presentations at `/talks` with error boundary
- **Sentry**: Client-side error tracking via `@sentry/browser` in root layout
  - CSP `connect-src` updated to include `https://*.ingest.sentry.io`
- **Google Analytics**: Migrated to `@next/third-parties/google` (`GoogleAnalytics` component)
- **3 new student apps**: Exam Countdown, GPA Calculator, Office Hours — with error boundaries
- **Apps page fix**: Moved Exam Countdown and Office Hours from "Coming Soon" to "Available Tools"
- **6 error boundaries added**: blog/, blog/[slug]/, talks/, apps/exam-countdown/, apps/gpa-calculator/, apps/office-hours/
- **Dependency updates**: react 19.2.3→19.2.4, lucide-react 0.544.0→0.563.0, @radix-ui/react-slot→1.2.4, @radix-ui/react-visually-hidden→1.2.4
- **README fixes**: Removed stale Zod 4 claim, updated test count (149→162), workflow count (3→4), added LHCI badge, Sentry env var, Blog/Talks features
- **CI fix**: Removed stale `develop` and `feature/**` branch triggers from ci.yml
- **.env.example**: Removed dead `NEXT_PUBLIC_STATIC_EXPORT`, added `NEXT_PUBLIC_SENTRY_DSN`
- **Cockpit sync**: All documentation files updated to match 219-file / 17,186-LOC / 27-page reality
- Codebase: 219 files, 17,186 LOC, 28 runtime deps, 27 dev deps
- Quality gates: 0 TS errors, 0 lint errors, 162/162 tests (24 files), 27 pages exported

### Seat Planner & Phase 8 Modern Web (2026-04-04)

- **Seat Plan Generator**: Full feature at `/apps/seat-planner/` — upload student CSV, configure rooms, generate seat allocations with CSV/PDF export
  - 13 files, 1,989 LOC — decomposed god component into clean architecture
  - New dependencies: `html2canvas` ^1.4.1, `jspdf` ^4.2.0, `jspdf-autotable` ^5.0.7
  - Error boundary via factory pattern
  - State management via custom `useSeatPlanner` hook
- **Phase 8 Modern Web**: Container queries extended to news-feed and course-card, dynamic OpenGraph metadata for courses/apps/publications, semantic HTML upgrades (`<article>`, `<time>`, `<section>`)
- **Cockpit sync**: All 9 documentation files updated — 28 drift items resolved
- **Version bump**: 1.3.0 → 1.4.0
- Codebase: 201 files, 15,909 LOC (up from 13,951)
- Quality gates: 0 TS errors, 0 lint errors, 149/149 tests (21 files), 20 pages exported

### Final Cleanup — Phase 12 (2025-02-24)

- **Dead code**: Removed `features/academic/` (9 files, 544 LOC) — zero external imports
- **Missing icons**: Generated `favicon-16x16.png` (16×16) and `apple-touch-icon.png` (180×180)
- **Cockpit**: Merged PUBLICATION.md into PACKAGING.md, removed SKILL.md (533 lines)
- **Local cleanup**: Purged coverage/, playwright-report/, test-results/, .husky/\_/, 18× tsbuildinfo
- Quality gates: 0 TS errors, 0 lint errors, all tests pass, 20 pages exported

### Structural Cleanup — Phase 11 (2025-02-24)

- **F-218 (MEDIUM)**: Reorganized 14 flat test files into structured directories mirroring src/
- **F-219 (MEDIUM)**: Fixed 12 broken relative `../src/` imports → `@/` path alias
- **F-220 (MEDIUM)**: Consolidated dual icon registries (nav-icon-map.ts re-exports from icons.tsx)
- **F-221 (LOW)**: Added barrel exports for home/, about/, apps/ feature modules
- **F-222 (LOW)**: Re-added error.tsx to 3 redirect pages for consistency
- **F-223 (LOW)**: Cleaned .playwright-mcp/ stale log directory
- **F-224 (LOW)**: Synced all 7 .cockpit/ documentation files to match reality
- Quality gates: 0 TS errors, 0 lint errors, 153/153 tests (23 files), 20 pages exported

### Production Polish (2026-02-23)

- 4 raw `<a>` internal links converted to Next.js `<Link>` (cv-content: 3, search-result-card: 1)
- 4 non-null assertions (`!`) replaced with nullish coalescing (`?? ''`) in course-utils.ts
- Type assertion removed in skills-section.tsx — `iconName` added to Skill interface + `satisfies Skill[]`
- 12 smoke render tests added for About, Home, Research, Publications feature modules
- **Commit**: `bdb61cb`

### Stabilization & Regression Fix (2026-02-22)

- **F-158 (CRITICAL)**: BUILD BREAK — `CollapsibleSection` icon prop changed from `React.ElementType` to `React.ReactNode`, updated 7 usages across 6 files. Regression from F-156.
- **F-159 (LOW)**: Added missing `'use client'` to `time-display.tsx`
- **F-160 (INFO)**: Added `turbopack: { root: '.' }` to `next.config.ts`

### Full Project Tree Audit (2026-02-22)

- **Discovered 5 new findings**: F-161 (sw.js pre-cache), F-162 (.mypy_cache), F-163 (grade-calculator error boundary), F-164 (humans.txt date), F-165 (.nvmrc mismatch)
- **COCKPIT**: Fixed 14 "Unknown" category/severity entries to proper categories
- **COCKPIT**: Synchronized INDEX.md, PMD.md, STRUCTURE.md metrics with actual project state

### Forensic Code Audit — State & Performance (2026-02-22)

- **F-153 (PERF)**: `time-display.tsx` interval reduced from 1s to 60s — only displays hours:minutes
- **F-154 (DRY)**: Duplicated hover-delay logic in `navbar.tsx` extracted to `useHoverDelay` shared hook
- **F-155 (BUG)**: `publication-card.tsx` uncleaned `setTimeout` — added `useRef`-based cleanup
- **F-156 (PERF)**: Removed unnecessary `'use client'` from 5 components (`experience-compact`, `skip-link`, `icons`, `course-page-layout`, `table`) — client: 54 → 49
- **F-157 (PERF)**: `framer-motion` dependency removed entirely (5.3 MB) — replaced with vanilla JS in `spotlight-card.tsx`
- **COCKPIT**: Added `SKILL.md` — forensic code audit skill definition (240+ checks, 7 phases)
- **COCKPIT**: All cockpit files synchronized with current truth

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

### Phase 3 — Hardening

- **SEO**: CV page refactored — extracted `cv-content.client.tsx`, page is now a server component with `export const metadata`
- **SEO**: OG image converted from SVG to 1200x630 PNG
- **PWA**: Generated 192x192 and 512x512 icons, updated `site.webmanifest`
- **A11Y**: Migrated all hardcoded Tailwind colors to semantic tokens (7 files, 12 replacements)
- **A11Y**: Confirmed teaching tabs keyboard support via Radix Tabs (closed F-006)
- **ARCH**: Added 3 missing error boundaries (`teaching/iub`, `teaching/bracu`, `teaching/[institution]/[courseCode]`)
- **TEST**: Added 4 test files (20 tests): `course-utils`, `get-type-icon`, `teaching/styles`, `useDebounce`
- **QUALITY**: Removed AI fingerprints (emoji in console, stale eslint-disable, AI-language in docs)
- **DOC**: Updated `humans.txt` (Next.js 15→16, date), `package.json` version 1.0.0→1.2.0

### Quality Status

- TypeScript: 0 errors
- ESLint: 0 errors, 0 warnings
- Tests: 149/149 passing (21 files)
- Build: 20 pages exported successfully

## Recommended Next Release

Tag as `v1.5.0-stable` if you want a release marker for the fully validated Seat Planner redesign, cockpit sync, and green Pages/Lighthouse deployment state.
