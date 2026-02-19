# PMD.md — Project Master Document

> **Project**: mdasifbinkhaled.github.io — Academic Portfolio Website
> **Owner**: Md Asif Bin Khaled (Senior Lecturer, IUB, Bangladesh)
> **URL**: https://mdasifbinkhaled.github.io
> **Last Updated**: 2026-02-18

## Mission

An academic portfolio showcasing research, publications, teaching activities, and professional experience for Md Asif Bin Khaled, deployed as a static site on GitHub Pages.

## Tech Stack

| Layer         | Technology                           | Version |
| ------------- | ------------------------------------ | ------- |
| Framework     | Next.js (App Router)                 | 16.1.4  |
| UI Library    | React                                | 19.2.3  |
| Language      | TypeScript (strict)                  | 5.6     |
| Styling       | Tailwind CSS + CSS custom properties | 3.4.13  |
| Validation    | Zod (schema-first types)             | 4.1.9   |
| Animation     | Framer Motion                        | 12.29.0 |
| Icons         | Lucide React                         | 0.544.0 |
| Themes        | next-themes + 6 color themes         | 0.4.6   |
| UI Primitives | Radix UI (10 packages)               | various |
| Testing       | Vitest + Testing Library + jsdom     | 3.2.4   |
| Linting       | ESLint 9 (flat config)               | 9.39.2  |
| Formatting    | Prettier                             | 3.6.2   |
| Git Hooks     | Husky + lint-staged + commitlint     | 9.1.7   |
| Deployment    | GitHub Pages (static export)         | —       |
| CI/CD         | GitHub Actions (3 workflows)         | —       |

## Architecture

### 4-Layer Design

```
┌─────────────────────────────────────────────┐
│  App Layer (2,157 LOC / 14%)                │  Page routes, layouts, error boundaries
│  src/app/                                    │  13 routes, 18 pages
├─────────────────────────────────────────────┤
│  Features Layer (3,587 LOC / 24%)           │  Domain modules
│  src/features/{about,academic,home,          │  Self-contained feature code
│                 teaching}                    │
├─────────────────────────────────────────────┤
│  Shared Layer (8,751 LOC / 59%)             │  Cross-cutting infrastructure
│  src/shared/{components,config,hooks,        │  UI primitives, config, data,
│              lib,providers,types}            │  validation, analytics
├─────────────────────────────────────────────┤
│  Data + Validation (bottom of shared/)      │  28 data files + 7 domain Zod schemas
│  src/shared/lib/data/ + validation/          │  Import-time validation
└─────────────────────────────────────────────┘
```

### Key Patterns

1. **Static Export**: `output: 'export'` — all pages pre-rendered at build time. No server.
2. **Zod-First Types**: All domain types inferred from Zod schemas. Single source of truth.
3. **Import-Time Validation**: `validateData()` runs Zod `parse()` when data files are imported.
4. **Tiered Courses**: Summary (inline data) → Standard (separate file) → Detailed (multi-file directory).
5. **3-Tier Error Boundaries**: Global (`global-error.tsx`) → Root (`error.tsx`) → Route-level.
6. **6-Theme System**: CSS custom properties in `tokens.css`, managed by `next-themes` (light, dark, ocean, forest, lavender, slate).
7. **Domain-Split Validation**: Schemas split into 7 domain files (`common`, `publication`, `experience`, `course`, `education`, `about`, `teaching`) with barrel re-export.

## Metrics

| Metric            | Value    |
| ----------------- | -------- |
| Source files      | 173      |
| Lines of code     | 14,934   |
| Components (.tsx) | 110      |
| Client components | 48 (44%) |
| Server components | 62 (56%) |
| Data files        | 28       |
| Config files      | 7        |
| Barrel exports    | 8        |
| Test files        | 21       |
| Test count        | 129      |
| Pages generated   | 18       |
| Themes            | 6        |
| Git commits       | 404      |

### Largest Files

| File                          | LOC | Purpose                   |
| ----------------------------- | --- | ------------------------- |
| `layout/profile-sidebar.tsx`  | 419 | Sidebar component         |
| `app/research/page.tsx`       | 392 | Research page             |
| `lib/analytics.ts`            | 345 | GA event tracking         |
| `ui/theme-selector.tsx`       | 334 | Theme picker              |
| `validation/course-schema.ts` | 287 | Course domain Zod schemas |
| `teaching/course-card.tsx`    | 281 | Course card component     |
| `navigation/navbar.tsx`       | 279 | Top navigation            |
| `data/about.ts`               | 274 | About page data           |

### LOC Distribution

```
shared/    8,751 (59%)  ████████████████████████████████████
features/  3,587 (24%)  ██████████████
app/       2,157 (14%)  █████████
styles/      439  (3%)  ██
```

## Feature Modules

| Module      | Files | Purpose                                          |
| ----------- | ----- | ------------------------------------------------ |
| `teaching/` | 17    | Course cards, detail pages, schedules, syllabi   |
| `about/`    | 10    | Hero, awards, certifications, skills, philosophy |
| `home/`     | 6     | Hero, news, research highlights, connect         |
| `academic/` | 8     | Cross-cutting search with filters                |

## Pages & Routes

| Route                     | Type     | Purpose                              |
| ------------------------- | -------- | ------------------------------------ |
| `/`                       | Static   | Homepage                             |
| `/about`                  | Static   | About with sections (anchored)       |
| `/publications`           | Static   | Publications with search/filter      |
| `/research`               | Static   | Research interests, libraries, goals |
| `/teaching`               | Static   | Teaching hub with institution tabs   |
| `/teaching/iub`           | Static   | IUB courses listing                  |
| `/teaching/bracu`         | Static   | BRACU courses listing                |
| `/teaching/[inst]/[code]` | SSG      | Dynamic course detail pages          |
| `/cv`                     | Static   | PDF CV viewer                        |
| `/contact`                | Static   | Contact & social links               |
| `/experience`             | Redirect | → /about#experience                  |
| `/service`                | Redirect | → /about#honors-awards               |
| `/service-awards`         | Redirect | → /about#honors-awards               |

## Quality Status

| Check      | Status | Details                                              |
| ---------- | ------ | ---------------------------------------------------- |
| TypeScript | ✅     | 0 errors (strict mode)                               |
| ESLint     | ✅     | 0 errors, 0 warnings                                 |
| Prettier   | ✅     | All formatted                                        |
| Tests      | ✅     | 129/129 pass (21 files)                              |
| Build      | ✅     | 18 pages exported                                    |
| Audit      | ⚠️     | 10 vulns (all mitigated — dev-only or static export) |

## Architecture Observations

### Strengths

- Clean 4-layer separation with clear dependency direction
- Type safety via Zod-first approach (catches data errors at import time)
- Comprehensive error boundary coverage
- Good test foundation (109 tests, CI-enforced)
- Professional CI/CD with conventional commits

### Concerns

- **shared/ layer is 60% of codebase** — risk of becoming a grab-bag
- **47 client components** — acceptable (error boundaries, interactive UI, animations)
- **8 barrel files** — all actively imported, healthy
- **7 domain schema files** — clean domain boundaries via barrel re-export
- **6 themes** — light, dark, ocean, forest, lavender, slate
- **345 LOC analytics** — heavy for a portfolio site
- **All hardcoded colors migrated** — only documented exceptions remain (global-error.tsx, brand colors)

See [ISSUES.md](ISSUES.md) for full finding tracker.
