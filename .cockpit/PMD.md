# PMD.md — Project Master Document

> **Project**: mdasifbinkhaled.github.io — Academic Portfolio Website
> **Owner**: Md Asif Bin Khaled (Senior Lecturer, IUB, Bangladesh)
> **URL**: https://mdasifbinkhaled.github.io
> **Last Updated**: 2025-02-18

## Mission

A comprehensive academic portfolio showcasing research, publications, teaching activities, and professional experience for Md Asif Bin Khaled, deployed as a static site on GitHub Pages.

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
│  App Layer (2,262 LOC / 14%)                │  Page routes, layouts, error boundaries
│  src/app/                                    │  13 routes, 18 pages
├─────────────────────────────────────────────┤
│  Features Layer (3,599 LOC / 23%)           │  Domain modules
│  src/features/{about,academic,home,          │  Self-contained feature code
│                 publications,teaching}       │
├─────────────────────────────────────────────┤
│  Shared Layer (9,150 LOC / 59%)             │  Cross-cutting infrastructure
│  src/shared/{components,config,hooks,        │  UI primitives, config, data,
│              lib,providers,types}            │  validation, analytics
├─────────────────────────────────────────────┤
│  Data + Validation (bottom of shared/)      │  29 data files + Zod schemas
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
| Source files      | 172      |
| Lines of code     | 15,496   |
| Components (.tsx) | 107      |
| Client components | 44 (41%) |
| Server components | 63 (59%) |
| Data files        | 29       |
| Config files      | 7        |
| Barrel exports    | 8        |
| Test files        | 17       |
| Test count        | 109      |
| Pages generated   | 18       |
| Themes            | 6        |
| Git commits       | 403      |

### Largest Files

| File                         | LOC | Purpose                                  |
| ---------------------------- | --- | ---------------------------------------- |
| `validation/schemas.ts`      | 14  | Barrel re-export (7 domain schema files) |
| `layout/profile-sidebar.tsx` | 419 | Sidebar component                        |
| `ui/theme-selector.tsx`      | 397 | Theme picker                             |
| `app/research/page.tsx`      | 384 | Research page                            |
| `lib/analytics.ts`           | 345 | GA event tracking                        |
| `teaching/course-card.tsx`   | 281 | Course card component                    |
| `navigation/navbar.tsx`      | 279 | Top navigation                           |
| `data/about.ts`              | 274 | About page data                          |

### LOC Distribution

```
shared/    9,150 (59%)  ████████████████████████████████████
features/  3,599 (23%)  ██████████████
app/       2,262 (14%)  █████████
styles/      485  (3%)  ███
```

## Feature Modules

| Module              | Files | Purpose                                          |
| ------------------- | ----- | ------------------------------------------------ |
| `teaching/`         | 16    | Course cards, detail pages, schedules, syllabi   |
| `about/`            | 10    | Hero, awards, certifications, skills, philosophy |
| `home/`             | 5     | Hero, news, research highlights, connect         |
| `academic/`         | 8     | Cross-cutting search with filters                |
| ~~`publications/`~~ | —     | _Deleted: was empty re-export only_              |

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
| ESLint     | ✅     | 0 errors                                             |
| Prettier   | ✅     | All formatted                                        |
| Tests      | ✅     | 109/109 pass                                         |
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

- **shared/ layer is 59% of codebase** — risk of becoming a grab-bag
- **~42 client components** — reduced (removed unnecessary `'use client'` from `teaching-cta.tsx`, deleted `footer-year.tsx`)
- ~~**19 barrel files**~~ → **8 barrel files** — removed 10 dead barrels, remaining are all actively imported
- ~~**614-line schema file**~~ → **7 domain schema files** + barrel re-export — clean domain boundaries
- ~~**13 themes**~~ → **6 themes** — reduced to light, dark, ocean, forest, lavender, slate
- **345 LOC analytics** — heavy for a portfolio site
- ~~**`publications/` feature is empty**~~ → _Deleted_

See [ISSUES.md](ISSUES.md) for full finding tracker.
