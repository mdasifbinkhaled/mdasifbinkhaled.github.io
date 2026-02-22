# HISTORY.md — Development Timeline

> 417 commits | 3 tags | Single branch (main) | Deployed to GitHub Pages

## Timeline

### Phase 1 — Initial Scaffold (Early Development)

- **`ccc9819`** — Initial scaffold
- Rapid iteration through NextJS errors and multi-page restructuring
- Navigation moved from sidebar to top bar
- Basic page structure established

### Phase 2 — Content & Feature Build-out

- Course pages built (IUB + BRACU institutions)
- Teaching feature module developed (assignments, schedules, resources, syllabus)
- Publications listing with search
- Research page with interests, libraries, goals
- About page with modular sections (awards, certifications, skills, etc.)
- Contact page with social links

### Phase 3 — UI Modernization & Polish

- collapsible sections with shared `CollapsibleSection` component
- Schedule and Syllabus sections separated
- Notice Board standardized
- Overview section redesigned with nested accordion
- Quick Access box styling
- Course page modularized (`bf57124`)

### Phase 4 — Stack Modernization

- **`166b4a3`** `chore(release): stable state push` — Next.js 16, React 19
- Modern stack: Next 16, React 19, TypeScript 5.6, Zod 4
- Conventional commits adopted
- `checkpoint-pre-sota` tag set

### Phase 5 — Quality & Governance

- `v1.1.0-stable` tag
- `v1.1.1-stable` tag
- CI/CD: GitHub Actions (ci.yml, nextjs.yml, security.yml)
- Husky + lint-staged + commitlint
- Vitest test suite (109 tests)
- CODE_OF_CONDUCT.md, CONTRIBUTING.md, SECURITY.md, LICENSE

### Phase 6 — Content & Polish (Recent)

- CSE211 page: consultation hours, feedback, resources reorganization
- Lab faculty updates, Discord link updates
- Python cheat sheet resource added
- Algorithm resources added
- Spacing and alignment optimizations

### Phase 7 — Cockpit Audit & Architecture Cleanup (Current)

- Full codebase analysis (167 files, 15,135 LOC)
- 44 findings documented (0 critical, 6 high, 15 medium, 14 low, 9 info)
- Fixes applied: XSS (JSON-LD), sitemap, accessibility, security headers, theme consistency
- Architecture improvements:
  - Themes reduced from 13 → 6 (light, dark, ocean, forest, lavender, slate)
  - Validation schemas split from 1 monolithic file → 7 domain modules + barrel
  - Dead barrels removed (18 → 8), dead code deleted (FooterYear, publications)
  - Empty publications directory removed
- `.cockpit/` intelligence hub created and synchronized
- All quality gates passing: 0 lint errors, 0 type errors, 109/109 tests, build OK

### Phase 8 — Forensic Code Audit: State & Performance (2026-02-22)

- **`93be3a3`** `refactor: fix code smells, anti-patterns, and technical debt`
- Systematic 3-phase forensic audit (Architecture, State Management, Performance & Bundle)
- 5 new findings (F-153 through F-157), all resolved in-session
- State management fixes:
  - `time-display.tsx`: Interval reduced from 1s to 60s (display only shows hours:minutes)
  - `navbar.tsx`: Duplicated hover-delay logic (~30 LOC × 2) extracted to `useHoverDelay` shared hook
  - `publication-card.tsx`: Added `useRef`-based setTimeout cleanup to prevent memory leaks
- Performance & bundle fixes:
  - `framer-motion` dependency removed entirely (5.3 MB saved) — replaced with vanilla JS (15 LOC)
  - `'use client'` removed from 5 pure-render components (client: 54 → 49, server: 77 → 82)
- Cockpit skill added: `.cockpit/SKILL.md` — forensic code audit methodology (240+ checks, 7 phases)
- All quality gates green: 0 TS errors, 143/143 tests, 20 pages exported

### Phase 9 — Stabilization & Regression Fix (2026-02-22)

- Server→client boundary regression from F-156 fixed:
  - Removing `'use client'` from `course-page-layout.tsx` made it a server component, but it passed Lucide icon functions (non-serializable) to `CollapsibleSection` (a `'use client'` component)
  - Fix: Changed `CollapsibleSection` `icon` prop from `React.ElementType` to `React.ReactNode`
  - Updated all 7 icon prop usages across 6 consumer files to pass pre-rendered JSX instead of function references
- Added missing `'use client'` directive to `time-display.tsx` (uses `useState`/`useEffect` directly)
- Fixed Turbopack workspace root warning by adding `turbopack: { root: '.' }` to `next.config.ts`
- Full stability audit: 0 remaining boundary violations, 0 `any` types, 0 memory leaks, 0 lint errors
- All quality gates green: 0 TS errors, 0 warnings, 143/143 tests, 20 pages exported

## Tags

| Tag                   | Description                            |
| --------------------- | -------------------------------------- |
| `checkpoint-pre-sota` | Pre-modernization checkpoint           |
| `v1.1.0-stable`       | First stable release with modern stack |
| `v1.1.1-stable`       | Patch release                          |

## Branch Strategy

- **`main`** — Single production branch, deploys to GitHub Pages on push
- **`dependabot/*`** — Automated dependency update PRs (24 branches)
- No feature branch strategy currently in use
