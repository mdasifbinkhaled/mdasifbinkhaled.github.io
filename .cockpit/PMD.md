# PMD.md — Project Master Document

> **Project**: mdasifbinkhaled.github.io — Academic Portfolio Website
> **Owner**: Md Asif Bin Khaled (Senior Lecturer, IUB, Bangladesh)
> **URL**: https://mdasifbinkhaled.github.io
> **Last Updated**: 2025-02-21
> **Commit**: 1d521d2

## Mission

An academic portfolio showcasing research, publications, teaching activities, and professional experience for Md Asif Bin Khaled, deployed as a static site on GitHub Pages.

## Tech Stack

| Layer         | Technology                           | Version |
| ------------- | ------------------------------------ | ------- |
| Framework     | Next.js (App Router)                 | 16.1.4  |
| UI Library    | React                                | 19.2.3  |
| Language      | TypeScript (strict)                  | 5.6     |
| Styling       | Tailwind CSS + CSS custom properties | 3.4.13  |
| Animation     | Framer Motion                        | 12.29.0 |
| Icons         | Lucide React                         | 0.544.0 |
| Themes        | next-themes + 6 color themes         | 0.4.6   |
| UI Primitives | Radix UI (10 packages)               | various |
| Testing       | Vitest + Testing Library + jsdom     | 3.2.4   |
| E2E Testing   | Playwright + axe-core                | 1.52.0  |
| Linting       | ESLint 9 (flat config)               | 9.39.2  |
| Formatting    | Prettier                             | 3.6.2   |
| Git Hooks     | Husky + lint-staged + commitlint     | 9.1.7   |
| Deployment    | GitHub Pages (static export)         | ---     |
| CI/CD         | GitHub Actions (4 workflows)         | ---     |

## Architecture

### 4-Layer Design

```
+---------------------------------------------+
|  App Layer (1,582 LOC / 11%)                |  Page routes, layouts, error boundaries
|  src/app/                                    |  15 routes, 20 pages
+---------------------------------------------+
|  Features Layer (4,556 LOC / 31%)           |  Domain modules
|  src/features/{about,academic,apps,home,     |  Self-contained feature code
|                 research,teaching}            |
+---------------------------------------------+
|  Shared Layer (8,403 LOC / 58%)             |  Cross-cutting infrastructure
|  src/shared/{components,config,hooks,        |  UI primitives, config, data,
|              lib,providers,types}            |  analytics, types
+---------------------------------------------+
|  Data Layer (bottom of shared/)             |  28 data files (TypeScript objects)
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

| Metric            | Value    |
| ----------------- | -------- |
| Source files      | 187      |
| Lines of code     | 14,541   |
| Components (.tsx) | 131      |
| Client components | 54 (41%) |
| Server components | 77 (59%) |
| Data files        | 28       |
| Config files      | 7        |
| Barrel exports    | 9        |
| Test files        | 23       |
| Test count        | 143      |
| Pages generated   | 20       |
| Themes            | 6        |
| Git commits       | 413      |

### Largest Files

| File                                | LOC | Purpose                     |
| ----------------------------------- | --- | --------------------------- |
| `features/apps/grade-calculator.tsx`| 363 | Weighted grade calculator   |
| `ui/theme-selector.tsx`             | 340 | Theme picker (6 themes)     |
| `shared/types/index.ts`            | 295 | Domain type definitions     |
| `teaching/course-card.tsx`          | 280 | Course card component       |
| `navigation/navbar.tsx`             | 279 | Top navigation bar          |
| `teaching/schedule-table.tsx`       | 256 | Course schedule table       |
| `lib/structured-data.ts`            | 228 | Schema.org JSON-LD          |
| `hooks/use-toast.ts`                | 224 | Toast notification system   |

### LOC Distribution

```
shared/    8,403 (58%)  ####################################
features/  4,556 (31%)  ###################
app/       1,582 (11%)  ######
```

## Feature Modules

| Module      | Files | Purpose                                          |
| ----------- | ----- | ------------------------------------------------ |
| `teaching/` | 19    | Course cards, detail pages, schedules, syllabi   |
| `about/`    | 10    | Hero, awards, certifications, skills, philosophy |
| `research/` | 8     | Research areas, projects, open source, vision    |
| `home/`     | 6     | Hero, news, research highlights, connect         |
| `academic/` | 8     | Cross-cutting search with filters                |
| `apps/`     | 4     | Student tools (grade calculator, tool cards)     |

## Pages & Routes

| Route                     | Type     | Purpose                              |
| ------------------------- | -------- | ------------------------------------ |
| `/`                       | Static   | Homepage                             |
| `/about`                  | Static   | About with sections (anchored)       |
| `/apps`                   | Static   | Student apps hub                     |
| `/apps/grade-calculator`  | Static   | Weighted grade calculator            |
| `/publications`           | Static   | Publications with search/filter      |
| `/research`               | Static   | Research interests, libraries, goals |
| `/teaching`               | Static   | Teaching hub with institution tabs   |
| `/teaching/iub`           | Static   | IUB courses listing                  |
| `/teaching/bracu`         | Static   | BRACU courses listing                |
| `/teaching/[inst]/[code]` | SSG      | Dynamic course detail pages          |
| `/cv`                     | Static   | PDF CV viewer                        |
| `/contact`                | Static   | Contact & social links               |
| `/experience`             | Redirect | -> /about#experience                 |
| `/service`                | Redirect | -> /about#honors-awards              |
| `/service-awards`         | Redirect | -> /about#honors-awards              |

## Quality Status

| Check      | Status | Details                                              |
| ---------- | ------ | ---------------------------------------------------- |
| TypeScript | PASS   | 0 errors (strict mode)                               |
| ESLint     | PASS   | 0 errors, 0 warnings                                 |
| Prettier   | PASS   | All formatted                                        |
| Tests      | PASS   | 143/143 pass (23 files)                              |
| Build      | PASS   | 20 pages exported                                    |
| Audit      | NOTE   | 10 vulns (all mitigated --- dev-only or static export) |

## Architecture Observations

### Strengths

- Clean 4-layer separation with clear dependency direction
- Type safety via strict TypeScript (`noUncheckedIndexedAccess`, `noImplicitOverride`)
- Comprehensive error boundary coverage (factory pattern)
- Strong test foundation (143 tests, CI-enforced)
- Professional CI/CD with conventional commits
- CSP headers with no `unsafe-eval`
- Service worker for offline caching
- Playwright E2E + axe-core accessibility testing
- Route announcer for screen reader navigation

### All 152 Findings Resolved

All 152 findings from 10 audit sessions have been resolved. See [ISSUES.md](ISSUES.md) for the complete tracker.

Key resolutions:
- **3 CRITICAL**: Division-by-zero, PII exposure, CV data drift --- all fixed
- **30 HIGH**: XSS, CSP, route announcer, keyboard a11y, error boundaries --- all fixed
- **55 MEDIUM**: Schema integrity, DRY violations, theme consistency --- all fixed
- **40 LOW**: Dead code, stale docs, minor DX issues — all fixed
- **24 INFO**: Cosmetic and informational items --- all addressed

See [ROADMAP.md](ROADMAP.md) for the improvement plan (Phases 7-11).

## ADRs (Architecture Decision Records)

| ADR     | Title                       | Status   |
| ------- | --------------------------- | -------- |
| ADR-001 | Static Export over SSR      | Accepted |
| ADR-002 | Plain TypeScript Types      | Accepted |
| ADR-003 | 6-Theme System              | Accepted |
| ADR-004 | Feature Module Architecture | Accepted |
| ADR-005 | Student Apps Feature        | Accepted |

See [adr/](adr/) for full records.

### Notes

- **shared/ layer is 58% of codebase** --- acceptable for an infrastructure-heavy portfolio site
- **54 client components** --- justified (error boundaries, interactive UI, animations)
- **9 barrel files** --- all actively imported, healthy
- **6 themes** --- light, dark, ocean, forest, lavender, slate
- **54 LOC analytics** --- lean, only 4 wired events (viewCV, downloadCV, viewPublication, downloadPublication)
- **All hardcoded colors migrated** --- only documented exceptions remain (global-error.tsx, brand colors)
- **4 GitHub workflows**: ci.yml (lint/test/build), lhci.yml (Lighthouse CI), nextjs.yml (deploy), security.yml (audit)

See [ISSUES.md](ISSUES.md) for full finding tracker.
