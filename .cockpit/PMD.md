# PMD.md — Project Master Document

> **Project**: mdasifbinkhaled.github.io — Academic Portfolio Website
> **Owner**: Md Asif Bin Khaled (Senior Lecturer, IUB, Bangladesh)
> **URL**: <https://mdasifbinkhaled.github.io>
> **Last Updated**: 2026-05-25
> **Commit**: HEAD (AUD-2026-05 forensic audit: docs truth-sync, code-correctness fixes, security hardening, dep-patch sweep)

## Mission

An academic portfolio showcasing research, publications, teaching activities, and professional experience for Md Asif Bin Khaled, deployed as a static site on GitHub Pages.

## Tech Stack

| Layer         | Technology                            | Version |
| ------------- | ------------------------------------- | ------- |
| Framework     | Next.js (App Router)                  | 16.2.4  |
| UI Library    | React                                 | 19.2.5  |
| Language      | TypeScript (strict)                   | 5.9     |
| Styling       | Tailwind CSS + CSS custom properties  | 4.2.4   |
| Animation     | Vanilla JS (no library)               | ---     |
| Icons         | Lucide React                          | 0.563.0 |
| Themes        | next-themes + 6 color themes          | 0.4.6   |
| UI Primitives | Radix UI (9 packages)                 | various |
| PDF Export    | jsPDF + jspdf-autotable + html2canvas | various |
| Blog          | next-mdx-remote + gray-matter         | various |
| Analytics     | @next/third-parties (Google GA4)      | 16.2.3  |
| Error Track   | @sentry/browser (client-side)         | 10.48.0 |
| Testing       | Vitest + Testing Library + jsdom      | 3.2.4   |
| E2E Testing   | Playwright + axe-core                 | 1.59.1  |
| Linting       | ESLint 9 (flat config)                | 9.39.4  |
| Formatting    | Prettier                              | 3.8.3   |
| Git Hooks     | Husky + lint-staged + local validator | 9.1.7   |
| Deployment    | GitHub Pages (static export)          | ---     |
| CI/CD         | GitHub Actions (5 workflows)          | ---     |

## Architecture

### 4-Layer Design

```text
+---------------------------------------------+
|  App Layer (2,275 LOC / 8%)                 |  Page routes, layouts, error boundaries

|  src/app/                                    |  22 routes, 27 pages
+---------------------------------------------+
|  Features Layer (14,393 LOC / 52%)          |  Domain modules
|  src/features/{about,apps,home,              |  Self-contained feature code
|                 research,teaching}            |
+---------------------------------------------+
|  Shared Layer (10,624 LOC / 39%)            |  Cross-cutting infrastructure
|  src/shared/{components,config,hooks,        |  UI primitives, config, data,
|              lib,providers,types}            |  analytics, types
+---------------------------------------------+
|  Data Layer (bottom of shared/)             |  33 data files (TypeScript objects)
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

| Metric            | Value                    |
| ----------------- | ------------------------ |
| Source files      | 274                      |
| Lines of code     | 27,524                   |
| Components (.tsx) | 170                      |
| Custom hooks      | 4                        |
| Data files        | 33                       |
| Config files      | 6                        |
| Barrel exports    | 19                       |
| Test files        | 63                       |
| Test count        | 485 (unit) + 4 E2E specs |
| Pages generated   | 30 HTML / 30 routes      |
| Themes            | 6                        |
| Git commits       | 460+                     |

### Largest Files

| File                                         | LOC  | Purpose                            |
| -------------------------------------------- | ---- | ---------------------------------- |
| `apps/course-planner/presets/iub-cse.ts`     | 1208 | IUB CSE course catalog payload     |
| `shared/components/common/data-importer.tsx` | 1197 | Shared CSV/XLSX/paste import UI    |
| `apps/seat-planner/seat-plan-results.tsx`    | 949  | Seat plan results display          |
| `apps/study-timer/study-timer.tsx`           | 705  | Study timer state and UI           |
| `apps/seat-planner/use-seat-planner.ts`      | 553  | Seat planner state hook            |
| `apps/course-planner/course-planner.tsx`     | 540  | Course planner state and UI        |
| `apps/seat-planner/seat-planner.tsx`         | 532  | Seat planner orchestration         |
| `apps/grade-calculator.tsx`                  | 495  | Weighted grade calculator          |
| `apps/gpa-calculator/gpa-calculator.tsx`     | 459  | GPA calculator state and UI        |
| `apps/seat-planner/room-configuration.tsx`   | 445  | Seat planner room configuration UI |

### LOC Distribution

```text
shared/   10,624 (39%)  ████████████████████

features/ 14,393 (52%)  ██████████████████████████
app/       2,275  (8%)  ████
styles/      232  (1%)  █
```

## Feature Modules

| Module      | Files | Purpose                                             |
| ----------- | ----- | --------------------------------------------------- |
| `apps/`     | 35    | Student tools, shared app primitives, import/export |
| `teaching/` | 22    | Course cards, detail pages, schedules, syllabi      |
| `about/`    | 12    | Hero, awards, certifications, skills, philosophy    |
| `research/` | 11    | Research areas, projects, open source, vision       |
| `home/`     | 9     | Hero, news, research highlights, connect            |

## Pages & Routes

| Route                     | Type     | Purpose                                                             |
| ------------------------- | -------- | ------------------------------------------------------------------- |
| `/`                       | Static   | Homepage                                                            |
| `/about`                  | Static   | About with sections (anchored)                                      |
| `/apps`                   | Static   | Student apps hub                                                    |
| `/apps/exam-countdown`    | Static   | Exam countdown timers                                               |
| `/apps/gpa-calculator`    | Static   | GPA calculator                                                      |
| `/apps/grade-calculator`  | Static   | Weighted grade calculator                                           |
| `/apps/course-planner`    | Static   | Browser-local course dependency planner                             |
| `/apps/office-hours`      | Static   | Office hours schedule                                               |
| `/apps/pdf-study-aid`     | Static   | Browser-local PDF study aid                                         |
| `/apps/seat-planner`      | Static   | Seat plan generator with flexible imports and PDF/PNG/print exports |
| `/apps/study-timer`       | Static   | Pomodoro-style study timer with persisted activity log              |
| `/blog`                   | Static   | Blog listing (MDX)                                                  |
| `/blog/[slug]`            | SSG      | Blog post (MDX)                                                     |
| `/contact`                | Static   | Contact & social links                                              |
| `/cv`                     | Static   | PDF CV viewer                                                       |
| `/experience`             | Redirect | -> /about#experience                                                |
| `/publications`           | Static   | Publications with search/filter                                     |
| `/research`               | Static   | Research interests, libraries, goals                                |
| `/service`                | Redirect | -> /about#honors-awards                                             |
| `/service-awards`         | Redirect | -> /about#honors-awards                                             |
| `/talks`                  | Static   | Conference talks & presentations                                    |
| `/teaching`               | Static   | Teaching hub with institution tabs                                  |
| `/teaching/iub`           | Static   | IUB courses listing                                                 |
| `/teaching/bracu`         | Static   | BRACU courses listing                                               |
| `/teaching/[inst]/[code]` | SSG      | Dynamic course detail pages                                         |

## Quality Status

| Check      | Status | Details                                                                                                    |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| TypeScript | PASS   | 0 errors (strict mode)                                                                                     |
| ESLint     | PASS   | 0 errors, 0 warnings                                                                                       |
| Prettier   | PASS   | All formatted                                                                                              |
| Tests      | PASS   | 485/485 unit (59 files); Chromium is the fast CI gate and Firefox/WebKit run in the cross-browser workflow |
| Build      | PASS   | 30 HTML pages generated + 118 custom service-worker precache entries                                       |
| Audit      | NOTE   | 2 upstream advisories (`next` HIGH, bundled `postcss` MODERATE); no safe non-force Next 16 fix published   |

## Architecture Observations

### Strengths

- Clean 4-layer separation with clear dependency direction
- Type safety via strict TypeScript (`noUncheckedIndexedAccess`, `noImplicitOverride`)
- Full error boundary coverage (factory pattern)
- Strong test foundation (485 unit tests, Chromium CI gating, and automated Firefox/WebKit follow-up coverage)
- Professional CI/CD with local Conventional Commit validation
- CSP headers with no `unsafe-eval`
- Service worker registered via `sw-register.tsx` (generated `out/sw.js`)
- Playwright E2E + axe-core accessibility testing (18-route a11y suite)
- Route announcer for screen reader navigation
- Well-decomposed Seat Planner (13 files, clean separation of concerns)

### Findings Status

See [ISSUES.md](ISSUES.md) for the live tracker and [INDEX.md](INDEX.md) for the current totals.

Current posture:

- No open CRITICAL findings remain.
- Two watch items remain open: F-260 (`/cv` accessibility stability) and F-264 (dependency advisory cadence).
- Historical audit work outside those watch items is resolved, reclassified, or documented as a false positive in the tracker.

See [ROADMAP.md](ROADMAP.md) for the improvement plan (Phases 7-11).

## ADRs (Architecture Decision Records)

| ADR     | Title                           | Status   |
| ------- | ------------------------------- | -------- |
| ADR-005 | Student Apps Feature            | Accepted |
| ADR-006 | Tests tsconfig strictness       | Accepted |
| ADR-007 | Apps I/O redesign               | Accepted |
| SPIKE   | jsPDF to pdf-lib migration path | Deferred |

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
- **5 GitHub workflows**: ci.yml (fast PR gate), cross-browser-e2e.yml (Firefox/WebKit), lhci.yml (Lighthouse CI), nextjs.yml (deploy), security.yml (audit)
- **Tests reorganized** --- mirroring src/ directory structure under tests/shared/ and tests/features/
- **Seat Planner** --- decomposed into 13 files (1,989 LOC): allocation, shared import flows, PDF/PNG/print export, room config, results display, state management

See [ISSUES.md](ISSUES.md) for full finding tracker.
