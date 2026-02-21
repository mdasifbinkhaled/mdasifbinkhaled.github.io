# STRUCTURE.md — Annotated Project Tree

> Last Updated: 2025-02-21 | 187 source files | 14,541 LOC

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
├── playwright.config.ts    — Playwright E2E config (static export)
├── components.json         — shadcn/ui configuration
└── next-env.d.ts           — Next.js type declarations
```

## Public Assets

```
public/
├── _headers                — Security headers (HSTS, CSP) for CDN hosting
├── humans.txt              — Humans.txt standard
├── site.webmanifest        — PWA manifest
├── sw.js                   — Service worker (offline caching)
├── cv/                     — PDF CV files
└── images/                 — Static images (profile photo, OG image, favicons)
```

## Source Tree — `src/` (14,541 LOC)

### App Layer — `src/app/` (1,582 LOC)

Page routes using Next.js App Router. Each route has error boundary.

```
src/app/
├── layout.tsx              — Root layout: fonts, metadata, JSON-LD, CSP, providers
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
├── apps/
│   ├── page.tsx            — Student apps hub (tool cards grid)
│   ├── error.tsx           — Error boundary (factory pattern)
│   └── grade-calculator/
│       └── page.tsx        — Grade calculator tool page
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
    │   └── error.tsx
    ├── bracu/
    │   ├── page.tsx        — BRAC University institution page
    │   └── error.tsx
    └── [institution]/
        └── [courseCode]/
            ├── page.tsx    — Dynamic course detail pages (SSG)
            └── error.tsx
```

### Features Layer — `src/features/` (4,556 LOC)

Domain-specific feature modules. Each is self-contained.

```
src/features/
├── about/components/       — About page sections (10 files)
│   ├── hero-section.tsx
│   ├── awards-section.tsx
│   ├── certifications-section.tsx
│   ├── cta-section.tsx
│   ├── highlights-section.tsx
│   ├── quick-facts.tsx
│   ├── research-philosophy.tsx
│   ├── skills-section.tsx
│   ├── beyond-academia.tsx
│   └── index.ts
│
├── academic/               — Cross-cutting academic search (8 files)
│   ├── academic-search.tsx
│   ├── types.ts
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
├── apps/                   — Student apps feature (4 files)
│   └── components/
│       ├── grade-calculator.tsx — Weighted grade calculator (363 LOC)
│       ├── tool-card.tsx       — Reusable tool card component
│       ├── tools-hero.tsx      — Apps page hero section
│       └── index.ts
│
├── home/components/        — Homepage sections (6 files)
│   ├── hero-section.tsx
│   ├── connect-section.tsx
│   ├── content-previews.tsx
│   ├── news-section.tsx
│   ├── research-highlights.tsx
│   └── index.ts
│
├── research/components/    — Research page sections (8 files)
│   ├── current-focus.tsx
│   ├── featured-projects.tsx
│   ├── looking-ahead.tsx
│   ├── open-source.tsx
│   ├── primary-areas.tsx
│   ├── research-cta.tsx
│   ├── research-hero.tsx
│   └── research-vision.tsx
│
└── teaching/               — Teaching feature (19 files, largest module)
    ├── course-card.tsx
    ├── course-card-compact.tsx
    ├── course-page-layout.tsx
    ├── teaching-cta.tsx
    ├── teaching-hero-stats.tsx
    ├── styles.ts
    ├── index.ts
    └── components/
        ├── assignments-section.tsx
        ├── contest-countdown.tsx
        ├── course-hero.tsx
        ├── exam-schedule.tsx
        ├── institution-courses-page.tsx — Shared institution page template
        ├── notice-board.tsx
        ├── overview-section.tsx
        ├── resources-section.tsx
        ├── schedule-section.tsx
        ├── schedule-table.tsx
        ├── syllabus-section.tsx
        └── syllabus-table.tsx
```

### Shared Layer — `src/shared/` (8,403 LOC, 58% of codebase)

Cross-cutting infrastructure: components, config, data, hooks, lib, types.

```
src/shared/
├── components/
│   ├── common/             — Domain-aware shared components (19 files)
│   │   ├── academic-profiles.tsx
│   │   ├── back-to-top.tsx
│   │   ├── error-boundary.tsx  — Error boundary wrapper
│   │   ├── error-card.tsx      — Reusable error display card
│   │   ├── error-fallback.tsx
│   │   ├── experience-compact.tsx
│   │   ├── hash-scroll.tsx
│   │   ├── icons.tsx
│   │   ├── news-feed.tsx
│   │   ├── pdf-viewer.tsx
│   │   ├── pdf-viewer-wrapper.tsx
│   │   ├── publication-card.tsx
│   │   ├── publication-list.tsx
│   │   ├── route-announcer.tsx — aria-live route change announcer
│   │   ├── skip-link.tsx
│   │   ├── stat-card.tsx
│   │   ├── structured-data.tsx
│   │   ├── time-display.tsx
│   │   └── web-vitals-reporter.tsx — Core Web Vitals reporting
│   ├── layout/             — Layout components (6 files)
│   │   ├── app-sidebar-layout.tsx
│   │   ├── profile-sidebar.tsx   — Sidebar orchestrator
│   │   └── sidebar/             — Sidebar domain modules
│   │       ├── actions-section.tsx
│   │       ├── navigation-section.tsx
│   │       ├── profile-section.tsx
│   │       └── socials-section.tsx
│   ├── navigation/         — Nav components (2 files)
│   │   ├── breadcrumbs.tsx
│   │   └── navbar.tsx
│   └── ui/                 — Primitive UI (shadcn/ui based, 21 files)
│       ├── accordion.tsx, alert.tsx, badge.tsx, button.tsx
│       ├── card.tsx, collapsible-section.tsx, command-menu.tsx
│       ├── dialog.tsx, dropdown-menu.tsx
│       ├── input.tsx, progress.tsx, select.tsx, separator.tsx
│       ├── sheet.tsx, skeleton.tsx, spotlight-card.tsx
│       ├── table.tsx, tabs.tsx, theme-selector.tsx
│       └── toast.tsx, toaster.tsx
│
├── config/                 — Static configuration (7 files)
│   ├── assets.ts
│   ├── constants.ts
│   ├── navigation.ts
│   ├── researcher-profile.ts
│   ├── site.ts
│   ├── themes.ts
│   └── index.ts
│
├── hooks/                  — Custom React hooks (4 files)
│   ├── use-debounce.ts
│   ├── use-is-client.ts    — SSR hydration detection via useSyncExternalStore
│   ├── use-toast.ts
│   └── index.ts
│
├── lib/                    — Core utilities (34 files)
│   ├── analytics.ts        — Google Analytics helpers
│   ├── course-utils.ts     — Course data helpers
│   ├── nav-icon-map.ts     — Shared navigation icon mapping
│   ├── structured-data.ts  — Schema.org JSON-LD generators
│   ├── utils.ts            — cn() utility
│   └── data/               — Domain data layer (28 files, TypeScript objects)
│       ├── about.ts
│       ├── activities.ts
│       ├── courses.ts      — Course registry + helpers
│       ├── courses/        — Individual course definitions (14 files)
│       │   ├── index.ts
│       │   ├── bracu-cse284.ts, bracu-cse420/, bracu-cse423.ts, bracu-cse489.ts
│       │   ├── iub-cse101.ts, iub-cse110.ts, iub-cse201.ts, iub-cse203.ts
│       │   ├── iub-cse211/ (4 files: index, modules, resources, schedule)
│       │   ├── iub-cse317.ts, iub-cse331.ts
│       ├── education.ts
│       ├── experience.ts
│       ├── metrics.ts
│       ├── news.ts
│       ├── personal.ts
│       ├── publications.ts
│       ├── research-interests.ts
│       ├── research.ts
│       └── teaching-stats.ts
│
├── providers/
│   └── app-providers.tsx   — ThemeProvider + Toaster wrapper
│
└── types/                  — Plain TypeScript interfaces (3 files)
    ├── index.ts            — Domain types (CourseData, Publication, etc.)
    ├── teaching.ts         — Teaching-specific types
    └── tools.ts            — Student apps types + STANDARD_GRADING_SCALE
```

### Styles — `src/styles/` (248 LOC)

```
src/styles/
└── tokens.css              — Design tokens: colors, spacing, typography for 6 themes
```

## Tests — `tests/` (23 files, 143 tests)

```
tests/
├── setup.ts                — Vitest setup (jest-dom matchers, lucide mocks)
├── analytics.test.tsx
├── back-to-top.test.tsx
├── basic.test.ts           — 8 smoke tests (config, navigation, themes, analytics)
├── components.test.tsx
├── data-integrity.test.ts  — Validates data layer integrity at test time
├── grade-calculator.test.tsx — Grade calculator component tests
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
├── use-debounce.test.ts
├── use-toast.test.tsx
├── e2e/
│   └── smoke.spec.ts      — Playwright E2E smoke + accessibility tests
├── features/
│   ├── academic/
│   │   └── get-type-icon.test.ts
│   └── teaching/
│       └── styles.test.ts
└── shared/lib/
    ├── course-utils.test.ts
    └── data.test.ts
```

## Cockpit — `.cockpit/` (Project Intelligence)

```
.cockpit/
├── INDEX.md                — Navigation hub + health dashboard
├── PMD.md                  — Project Master Document (architecture, metrics)
├── ISSUES.md               — Finding tracker (152 findings, 0 open)
├── ROADMAP.md              — Improvement roadmap (Phases 7-11)
├── STRUCTURE.md            — This file
├── HISTORY.md              — Development timeline
├── GOVERNANCE.md           — Standards and conventions
├── PACKAGING.md            — Dependencies and build pipeline
├── RELEASES.md             — Version changelog
├── PUBLICATION.md          — Deployment details
└── adr/
    ├── TEMPLATE.md         — ADR template + inline ADRs 001-004
    └── ADR-005-student-tools.md — Student apps feature design
```
