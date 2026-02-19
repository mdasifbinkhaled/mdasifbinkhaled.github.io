# STRUCTURE.md — Annotated Project Tree

> Last Updated: 2026-02-19 | 174 source files | 14,820 LOC

## Root Configuration

```
├── package.json            — Project manifest, scripts, dependencies
├── next.config.ts          — Next.js 16 config (static export, typed routes)
├── tsconfig.json           — TypeScript strict config, path aliases
├── tailwind.config.ts      — Tailwind 3.4 + 6-theme system
├── postcss.config.mjs      — PostCSS with Tailwind + Autoprefixer
├── eslint.config.mjs       — ESLint flat config
├── commitlint.config.mjs   — Conventional commits enforcement
├── vitest.config.mts       — Vitest + jsdom + v8 coverage
├── components.json         — shadcn/ui configuration
└── next-env.d.ts           — Next.js type declarations
```

## Public Assets

```
public/
├── _headers                — Security headers (HSTS, CSP) for CDN hosting
├── humans.txt              — Humans.txt standard
├── site.webmanifest        — PWA manifest
├── cv/                     — PDF CV files
└── images/                 — Static images (profile photo, OG image, favicons)
```

## Source Tree — `src/` (15,215 LOC)

### App Layer — `src/app/` (2,175 LOC)

Page routes using Next.js App Router. Each route has error boundary.

```
src/app/
├── layout.tsx              — Root layout: fonts, metadata, JSON-LD, providers
├── page.tsx                — Homepage
├── globals.css             — Global styles + CSS custom properties
├── error.tsx               — Root error boundary
├── global-error.tsx        — Global error boundary (catches layout errors)
├── not-found.tsx           — 404 page
├── robots.ts               — robots.txt generator
├── sitemap.ts              — XML sitemap generator (static + dynamic courses)
│
├── about/
│   ├── page.tsx            — About page (server component, renders feature components)
│   └── error.tsx
├── contact/
│   ├── page.tsx            — Contact page with social links
│   └── error.tsx
├── cv/
│   ├── page.tsx            — CV page (server component — exports metadata)
│   ├── cv-content.client.tsx — Client-side CV viewer (tabs, PDF, analytics)
│   └── error.tsx
├── experience/
│   ├── page.tsx            — Redirects → /about#experience
│   └── error.tsx
├── publications/
│   ├── page.tsx            — Publications listing with search
│   ├── layout.tsx          — Publications layout with structured data
│   └── error.tsx
├── research/
│   ├── page.tsx            — Research interests, libraries, philosophy
│   └── error.tsx
├── service/
│   └── page.tsx            — Redirects → /about#honors-awards
├── service-awards/
│   ├── page.tsx            — Redirects → /about#honors-awards
│   └── error.tsx
└── teaching/
    ├── page.tsx            — Teaching hub (institution tabs)
    ├── error.tsx
    ├── teaching-tabs.client.tsx — Tab switching client component
    ├── iub/
    │   ├── page.tsx        — IUB institution page
    │   └── error.tsx       — IUB error boundary
    ├── bracu/
    │   ├── page.tsx        — BRAC University institution page
    │   └── error.tsx       — BRACU error boundary
    └── [institution]/
        └── [courseCode]/
            ├── page.tsx    — Dynamic course detail pages (SSG)
            └── error.tsx   — Course page error boundary
```

### Features Layer — `src/features/` (3,591 LOC)

Domain-specific feature modules. Each is self-contained.

```
src/features/
├── about/components/       — About page sections (10 files)
│   ├── hero-section.tsx    — Profile hero with CV download
│   ├── awards-section.tsx
│   ├── certifications-section.tsx
│   ├── cta-section.tsx
│   ├── highlights-section.tsx
│   ├── quick-facts.tsx
│   ├── research-philosophy.tsx
│   ├── skills-section.tsx
│   ├── beyond-academia.tsx
│   └── index.ts            — Barrel export
│
├── academic/               — Cross-cutting academic search (8 files)
│   ├── academic-search.tsx — Main search orchestrator
│   ├── types.ts            — Search types
│   ├── components/
│   │   ├── filter-bar.tsx
│   │   ├── search-input.tsx
│   │   ├── search-result-card.tsx
│   │   └── search-results.tsx
│   ├── hooks/
│   │   └── use-search-filter.ts
│   └── utils/
│       └── get-type-icon.ts
│
├── home/components/        — Homepage sections (5 files)
│   ├── hero-section.tsx
│   ├── connect-section.tsx
│   ├── content-previews.tsx
│   ├── news-section.tsx
│   ├── research-highlights.tsx
│   └── index.ts
│
└── teaching/               — Teaching feature (17 files, largest module)
    ├── course-card.tsx         — Full course card (281 LOC)
    ├── course-card-compact.tsx — Compact variant
    ├── course-page-layout.tsx  — Course detail page template
    ├── teaching-cta.tsx        — CTA card (server component)
    ├── teaching-hero-stats.tsx — Stats banner
    ├── styles.ts               — Shared teaching styles
    └── components/
        ├── assignments-section.tsx
        ├── contest-countdown.tsx
        ├── course-hero.tsx
        ├── exam-schedule.tsx
        ├── notice-board.tsx
        ├── overview-section.tsx
        ├── resources-section.tsx
        ├── schedule-section.tsx
        ├── schedule-table.tsx
        ├── syllabus-section.tsx
        └── syllabus-table.tsx
```

### Shared Layer — `src/shared/` (9,011 LOC, 60% of codebase)

Cross-cutting infrastructure: components, config, data, hooks, lib, types.

```
src/shared/
├── components/             — Reusable UI components
│   ├── common/             — Domain-aware shared components (14 files)
│   │   ├── academic-profiles.tsx
│   │   ├── back-to-top.tsx
│   │   ├── error-fallback.tsx
│   │   ├── experience-compact.tsx
│   │   ├── hash-scroll.tsx
│   │   ├── icons.tsx
│   │   ├── motion-page.tsx
│   │   ├── news-feed.tsx
│   │   ├── publication-card.tsx
│   │   ├── publication-list.tsx
│   │   ├── skip-link.tsx
│   │   ├── stat-card.tsx
│   │   ├── structured-data.tsx
│   │   └── time-display.tsx
│   ├── layout/             — Layout components (2 files)
│   │   ├── app-sidebar-layout.tsx
│   │   └── profile-sidebar.tsx  — 419 LOC (largest component)
│   ├── navigation/         — Nav components (2 files)
│   │   ├── breadcrumbs.tsx
│   │   └── navbar.tsx       — 279 LOC
│   └── ui/                 — Primitive UI (shadcn/ui based, 24 files)
│       ├── accordion.tsx, alert.tsx, badge.tsx, button.tsx
│       ├── card.tsx, collapsible-section.tsx, command-menu.tsx
│       ├── dialog.tsx, dropdown-menu.tsx, error-boundary.tsx
│       ├── input.tsx, pdf-viewer.tsx, pdf-viewer-wrapper.tsx
│       ├── progress.tsx, select.tsx, separator.tsx
│       ├── sheet.tsx, skeleton.tsx, spotlight-card.tsx
│       ├── table.tsx, tabs.tsx, theme-selector.tsx
│       └── toast.tsx, toaster.tsx
│
├── config/                 — Static configuration (7 files)
│   ├── assets.ts           — Asset path constants
│   ├── constants.ts        — App-wide constants
│   ├── navigation.ts       — Nav menu structure
│   ├── researcher-profile.ts — Academic profile data
│   ├── site.ts             — Site metadata (URL, name, links)
│   ├── themes.ts           — 6-theme definitions (light/dark/ocean/forest/lavender/slate)
│   └── index.ts
│
├── hooks/                  — Custom React hooks (4 files)
│   ├── use-debounce.ts
│   ├── use-is-client.ts    — SSR hydration detection via useSyncExternalStore
│   ├── use-toast.ts        — 224 LOC (toast notification system)
│   └── index.ts
│
├── lib/                    — Core utilities (37 files, 5,000+ LOC)
│   ├── analytics.ts        — Google Analytics helpers (138 LOC)
│   ├── course-utils.ts     — Course data helpers
│   ├── structured-data.ts  — Schema.org JSON-LD generators (222 LOC)
│   ├── utils.ts            — cn() utility
│   ├── data/               — Domain data layer (29 files, TypeScript objects)
│   │   ├── about.ts        — About page data (274 LOC)
│   │   ├── activities.ts
│   │   ├── courses.ts      — Course registry + helpers
│   │   ├── courses/        — Individual course definitions (14 files)
│   │   │   ├── index.ts
│   │   │   ├── bracu-cse284.ts, bracu-cse420/, bracu-cse423.ts, bracu-cse489.ts
│   │   │   ├── iub-cse101.ts, iub-cse110.ts, iub-cse201.ts, iub-cse203.ts
│   │   │   ├── iub-cse211/ (4 files: index, modules, resources, schedule)
│   │   │   ├── iub-cse317.ts, iub-cse331.ts
│   │   ├── education.ts
│   │   ├── experience.ts   — 204 LOC
│   │   ├── metrics.ts
│   │   ├── news.ts
│   │   ├── personal.ts
│   │   ├── publications.ts — 187 LOC
│   │   ├── research-interests.ts
│   │   ├── research.ts
│   │   └── teaching-stats.ts
│   └── validation/         — Zod schemas split into 7 domain files
│       ├── schemas.ts      — Barrel re-export (entry point)
│       ├── common-schema.ts        — iconNameSchema, validateData, validateDataSafe
│       ├── publication-schema.ts   — Publication schemas + types
│       ├── experience-schema.ts    — Experience schemas + types
│       ├── course-schema.ts        — Course schemas + types (270 LOC, largest)
│       ├── education-schema.ts     — Education schemas + types
│       ├── about-schema.ts         — About page schemas + types
│       └── teaching-schema.ts      — Teaching/testimonial schemas + types
│
├── providers/
│   └── app-providers.tsx   — ThemeProvider + Toaster wrapper
│
└── types/
    ├── index.ts            — Re-exports from Zod inferred types
    └── teaching.ts         — Teaching-specific types
```

### Styles — `src/styles/` (439 LOC)

```
src/styles/
└── tokens.css              — Design tokens: colors, spacing, typography for 6 themes
```

## Tests — `tests/` (21 files, 129 tests)

```
tests/
├── setup.ts                — Vitest setup (jest-dom matchers, lucide mocks)
├── analytics.test.tsx
├── back-to-top.test.tsx
├── basic.test.ts
├── components.test.tsx
├── data-integrity.test.ts  — Validates all Zod schemas at test time
├── navbar.active.test.tsx
├── navbar.test.tsx
├── select.test.tsx
├── sheet.test.tsx
├── sidebar.a11y.test.tsx
├── sidebar.test.tsx
├── skip-link.test.tsx
├── structured-data.test.ts
├── tabs.test.tsx
├── theme-selector.test.tsx
├── use-debounce.test.ts    — useDebounce hook timing tests
├── use-toast.test.tsx
├── features/
│   ├── academic/
│   │   └── get-type-icon.test.ts   — Academic type icon mapping
│   └── teaching/
│       └── styles.test.ts          — Level styles semantic token checks
└── shared/lib/
    ├── course-utils.test.ts        — Breadcrumb formatting + link icons
    └── data.test.ts                — Data layer tests
```
