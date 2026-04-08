# PMD.md — Project Master Document

> **Project**: mdasifbinkhaled.github.io — Academic Portfolio Website
> **Owner**: Md Asif Bin Khaled (Senior Lecturer, IUB, Bangladesh)
> **URL**: <https://mdasifbinkhaled.github.io>
> **Last Updated**: 2026-04-04
> **Commit**: 38b2586

## Mission

An academic portfolio showcasing research, publications, teaching activities, and professional experience for Md Asif Bin Khaled, deployed as a static site on GitHub Pages.

## Tech Stack

| Layer         | Technology                            | Version |
| ------------- | ------------------------------------- | ------- |
| Framework     | Next.js (App Router)                  | 16.1.4  |
| UI Library    | React                                 | 19.2.4  |
| Language      | TypeScript (strict)                   | 5.6     |
| Styling       | Tailwind CSS + CSS custom properties  | 3.4.13  |
| Animation     | Vanilla JS (no library)               | ---     |
| Icons         | Lucide React                          | 0.563.0 |
| Themes        | next-themes + 6 color themes          | 0.4.6   |
| UI Primitives | Radix UI (9 packages)                 | various |
| PDF Export    | jsPDF + jspdf-autotable + html2canvas | various |
| Blog          | next-mdx-remote + Shiki + gray-matter | various |
| Analytics     | @next/third-parties (Google GA4)      | latest  |
| Error Track   | @sentry/browser (client-side)         | latest  |
| Testing       | Vitest + Testing Library + jsdom      | 3.2.4   |
| E2E Testing   | Playwright + axe-core                 | 1.58.0  |
| Linting       | ESLint 9 (flat config)                | 9.39.2  |
| Formatting    | Prettier                              | 3.6.2   |
| Git Hooks     | Husky + lint-staged + commitlint      | 9.1.7   |
| Deployment    | GitHub Pages (static export)          | ---     |
| CI/CD         | GitHub Actions (4 workflows)          | ---     |

## Architecture

### 4-Layer Design

```text
+---------------------------------------------+
|  App Layer (1,987 LOC / 12%)                |  Page routes, layouts, error boundaries

|  src/app/                                    |  22 routes, 27 pages
+---------------------------------------------+
|  Features Layer (7,091 LOC / 41%)           |  Domain modules
|  src/features/{about,apps,home,              |  Self-contained feature code
|                 research,teaching}            |
+---------------------------------------------+
|  Shared Layer (8,108 LOC / 47%)             |  Cross-cutting infrastructure
|  src/shared/{components,config,hooks,        |  UI primitives, config, data,
|              lib,providers,types}            |  analytics, types
+---------------------------------------------+
|  Data Layer (bottom of shared/)             |  32 data files (TypeScript objects)
|  src/shared/lib/data/                        |  Type-checked via satisfies assertions
+---------------------------------------------+
```

### Key Patterns

1. **Static Export**: `output: 'export'` --- all pages pre-rendered at build time. No server.
2. **Plain TypeScript Types**: All domain types as interfaces in `src/shared/types/`. No runtime schema validation.
3. **Tiered Courses**: Summary (inline data) -> Standard (separate file) -> Detailed (multi-file directory).
4. **3-Tier Error Boundaries**: Global (`global-error.tsx`) -> Root (`error.tsx`) -> Route-level (factory via `createErrorBoundary()`).
5. **6-Theme System**: CSS custom properties in `tokens.css`, managed by `next-themes` with `darkMode: ['selector', '[data-theme="dark"]']`.
6. **Content Security Policy**: Inline CSP `<meta>` tag in root layout with strict directives (no `unsafe-eval`).

## Metrics

| Metric            | Value                   |
| ----------------- | ----------------------- |
| Source files      | 219                     |
| Lines of code     | 17,186                  |
| Components (.tsx) | 150                     |
| Client components | 62 (41%)                |
| Server components | 88 (59%)                |
| Custom hooks      | 3 (+1 feature-specific) |
| Data files        | 32                      |
| Config files      | 6                       |
| Barrel exports    | 8                       |
| Test files        | 24                      |
| Test count        | 162                     |
| Pages generated   | 27                      |
| Themes            | 6                       |
| Git commits       | 443+                    |

### Largest Files

| File                                      | LOC | Purpose                   |
| ----------------------------------------- | --- | ------------------------- |
| `apps/seat-planner/seat-plan-results.tsx` | 439 | Seat plan results display |
| `features/apps/grade-calculator.tsx`      | 365 | Weighted grade calculator |
| `ui/theme-selector.tsx`                   | 321 | Theme picker (6 themes)   |
| `shared/lib/data/about.ts`                | 297 | About page data           |
| `teaching/course-card.tsx`                | 280 | Course card component     |
| `apps/seat-planner/use-seat-planner.ts`   | 266 | Seat planner state hook   |
| `ui/command-menu.tsx`                     | 259 | Command palette (⌘K)      |
| `teaching/schedule-table.tsx`             | 256 | Course schedule table     |
| `shared/types/index.ts`                   | 255 | Domain type definitions   |

### LOC Distribution

```text
shared/    8,108 (47%)  ██████████████████████████████

features/  7,091 (41%)  ██████████████████████████
app/       1,987 (12%)  ████████
styles/      247  (1%)  █
```

## Feature Modules

| Module      | Files | Purpose                                          |
| ----------- | ----- | ------------------------------------------------ |
| `teaching/` | 20    | Course cards, detail pages, schedules, syllabi   |
| `apps/`     | 18    | Student tools (grade calculator, seat planner)   |
| `about/`    | 11    | Hero, awards, certifications, skills, philosophy |
| `research/` | 9     | Research areas, projects, open source, vision    |
| `home/`     | 7     | Hero, news, research highlights, connect         |

## Pages & Routes

| Route                     | Type     | Purpose                              |
| ------------------------- | -------- | ------------------------------------ |
| `/`                       | Static   | Homepage                             |
| `/about`                  | Static   | About with sections (anchored)       |
| `/apps`                   | Static   | Student apps hub                     |
| `/apps/exam-countdown`    | Static   | Exam countdown timers                |
| `/apps/gpa-calculator`    | Static   | GPA calculator                       |
| `/apps/grade-calculator`  | Static   | Weighted grade calculator            |
| `/apps/office-hours`      | Static   | Office hours schedule                |
| `/apps/seat-planner`      | Static   | Seat plan generator with CSV/PDF     |
| `/blog`                   | Static   | Blog listing (MDX)                   |
| `/blog/[slug]`            | SSG      | Blog post (MDX + Shiki)              |
| `/contact`                | Static   | Contact & social links               |
| `/cv`                     | Static   | PDF CV viewer                        |
| `/experience`             | Redirect | -> /about#experience                 |
| `/publications`           | Static   | Publications with search/filter      |
| `/research`               | Static   | Research interests, libraries, goals |
| `/service`                | Redirect | -> /about#honors-awards              |
| `/service-awards`         | Redirect | -> /about#honors-awards              |
| `/talks`                  | Static   | Conference talks & presentations     |
| `/teaching`               | Static   | Teaching hub with institution tabs   |
| `/teaching/iub`           | Static   | IUB courses listing                  |
| `/teaching/bracu`         | Static   | BRACU courses listing                |
| `/teaching/[inst]/[code]` | SSG      | Dynamic course detail pages          |

## Quality Status

| Check      | Status | Details                                                                             |
| ---------- | ------ | ----------------------------------------------------------------------------------- |
| TypeScript | PASS   | 0 errors (strict mode)                                                              |
| ESLint     | PASS   | 0 errors, 0 warnings                                                                |
| Prettier   | PASS   | All formatted                                                                       |
| Tests      | PASS   | 162/162 pass (24 files)                                                             |
| Build      | PASS   | 27 pages exported                                                                   |
| Audit      | NOTE   | 5 vulns (1 moderate, 3 high, 1 critical — all mitigated: dev-only or static export) |

## Architecture Observations

### Strengths

- Clean 4-layer separation with clear dependency direction
- Type safety via strict TypeScript (`noUncheckedIndexedAccess`, `noImplicitOverride`)
- Full error boundary coverage (factory pattern)
- Strong test foundation (162 tests, CI-enforced)
- Professional CI/CD with conventional commits
- CSP headers with no `unsafe-eval`
- Service worker for offline caching
- Playwright E2E + axe-core accessibility testing
- Route announcer for screen reader navigation
- Well-decomposed Seat Planner (13 files, clean separation of concerns)

### All 228 Findings Resolved

All 228 findings from 15 audit sessions have been resolved (3 false positives). See [ISSUES.md](ISSUES.md) for the complete tracker.

Key resolutions:

- **3 CRITICAL**: Division-by-zero, PII exposure, CV data drift --- all fixed
- **30 HIGH**: XSS, CSP, route announcer, keyboard a11y, error boundaries --- all fixed
- **67 MEDIUM**: Schema integrity, DRY violations, architecture, SEO, dead code --- all fixed
- **55 LOW**: Dead code, stale docs, config cleanup, consistency --- all fixed
- **57 INFO**: Cosmetic items, `'use client'` cleanup, framer-motion removal --- all addressed
- **3 FALSE POSITIVES**: F-212 (CSS token dedup), F-214 (barrel tree-shaking), F-215 (typos)

See [ROADMAP.md](ROADMAP.md) for the improvement plan (Phases 7-11).

## ADRs (Architecture Decision Records)

| ADR     | Title                | Status   |
| ------- | -------------------- | -------- |
| ADR-005 | Student Apps Feature | Accepted |

See [adr/](adr/) for the full record and template.

### Notes

- **shared/ layer is 47% of codebase** --- acceptable for an infrastructure-heavy portfolio site
- **62 client components (.tsx)** --- justified (error boundaries, interactive UI, seat planner, blog); plus client-side analytics and hooks
- **3 shared hooks** (`useDebounce`, `useIsClient`, `useHoverDelay`) + 1 feature-specific (`useSeatPlanner`)
- **8 barrel files** --- all actively imported; organized per feature module and shared layers
- **6 themes** --- light, dark, ocean, forest, lavender, slate
- **54 LOC analytics** --- lean, only 4 wired events (viewCV, downloadCV, viewPublication, downloadPublication)
- **Zero animation libraries** --- framer-motion removed; spotlight effect now vanilla JS (15 LOC)
- **All hardcoded colors migrated** --- only documented exceptions remain (global-error.tsx, brand colors)
- **4 GitHub workflows**: ci.yml (lint/test/build), lhci.yml (Lighthouse CI), nextjs.yml (deploy), security.yml (audit)
- **Tests reorganized** --- mirroring src/ directory structure under tests/shared/ and tests/features/
- **Seat Planner** --- decomposed into 13 files (1,989 LOC): allocation, CSV parsing/export, PDF export, room config, results display, state management

See [ISSUES.md](ISSUES.md) for full finding tracker.
