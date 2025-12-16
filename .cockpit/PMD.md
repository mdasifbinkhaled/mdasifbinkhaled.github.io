# Project Master Document (PMD)

> **Single Source of Truth** | **Version:** 4.0.0 | **Status:** Active | **Last Updated:** 2025-12-16

---

## 1. Project Identity & Vision

- **Project Name:** Md Asif Bin Khaled - Academic Portfolio
- **Domain:** [mdasifbinkhaled.github.io](https://mdasifbinkhaled.github.io)
- **Type:** Static Academic Portfolio & Research Showcase
- **Core Mission:** Present research in Explainable AI (XAI) and Healthcare AI with high visual fidelity, ensuring content is accessible, data-driven, and easy to maintain.
- **Target Audience:** Academic collaborators, PhD supervisors, grant committees, students.
- **SOTA Score:** 9.2/10 ⭐

---

## 2. Technical Architecture

### 2.1 Directory Structure

```
src/
├── app/                    # Next.js App Router
├── features/               # Feature modules
│   ├── academic/           # Research, search components
│   ├── home/               # Homepage widgets
│   ├── publications/       # Publication cards
│   └── teaching/           # Course components
├── shared/                 # Reusable infrastructure
│   ├── components/         # UI library
│   │   ├── common/         # Business components
│   │   ├── layout/         # Layout components
│   │   ├── navigation/     # Nav components
│   │   └── ui/             # Primitives (Radix/Shadcn)
│   ├── config/             # Configuration (SSoT)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities
│   │   ├── data/           # Static data files
│   │   ├── seo/            # Structured data
│   │   └── validation/     # Zod schemas
│   ├── providers/          # React context
│   └── types/              # Type re-exports
├── styles/                 # Global CSS
└── tests/                  # Vitest test suite
```

### 2.2 Key Decisions

- **SSoT**: Config files drive state; no hardcoded personal data in components
- **Type SSoT via Zod**: Types derived from schemas using `z.infer<>`
- **Server Components First**: `'use client'` only for interactive islands
- **Static Export**: `output: 'export'` for GitHub Pages
- **Clean Dependency Flow**: `shared/` never imports from `features/`

---

## 3. Design System

### 3.1 Framework

- **CSS**: Tailwind CSS v3.4 (Utility-First)
- **Components**: Radix UI (headless) + Tailwind (Shadcn pattern)
- **Grid**: 8pt vertical rhythm

### 3.2 Theming

- **Source**: `src/shared/config/themes.ts`
- **Tokens**: `src/styles/tokens.css`
- **Categories**: Classic, Natural, Vibrant, Professional (13 themes)

### 3.3 UI Component Library

| Component       | Location                | Purpose                      |
| --------------- | ----------------------- | ---------------------------- |
| `Button`        | `ui/button.tsx`         | Action buttons with variants |
| `Card`          | `ui/card.tsx`           | Content containers           |
| `Badge`         | `ui/badge.tsx`          | Labels and tags              |
| `Sheet`         | `ui/sheet.tsx`          | Mobile slide-out panels      |
| `Tabs`          | `ui/tabs.tsx`           | Tabbed content               |
| `Select`        | `ui/select.tsx`         | Dropdown selection           |
| `DropdownMenu`  | `ui/dropdown-menu.tsx`  | Context menus                |
| `Toast`         | `ui/toast.tsx`          | Notifications                |
| `ThemeSelector` | `ui/theme-selector.tsx` | Theme switching              |
| `Progress`      | `ui/progress.tsx`       | Progress indicators          |
| `Skeleton`      | `ui/skeleton.tsx`       | Loading states               |
| `ErrorBoundary` | `ui/error-boundary.tsx` | Error handling               |

### 3.4 Common Components

| Component         | Location                      | Purpose                                    |
| ----------------- | ----------------------------- | ------------------------------------------ |
| `StatCard`        | `common/stat-card.tsx`        | Statistics display (default/compact/glass) |
| `BackToTop`       | `common/back-to-top.tsx`      | Scroll-to-top button                       |
| `SkipLink`        | `common/skip-link.tsx`        | A11y skip navigation                       |
| `NewsFeed`        | `common/news-feed.tsx`        | News display                               |
| `PublicationList` | `common/publication-list.tsx` | Filterable publications                    |
| `Icons`           | `common/icons.tsx`            | Icon component registry                    |

### 3.5 Accessibility

- High Contrast & Reduced Motion support
- Semantic HTML, Skip Links
- WCAG 2.1 Level AA compliance

---

## 4. Custom Hooks

| Hook                 | Purpose                          |
| -------------------- | -------------------------------- |
| `useDebounce`        | Debounced value updates          |
| `useIsMobile`        | Mobile viewport detection        |
| `useToast`           | Toast notification system        |
| `useReducedMotion`   | A11y motion preference detection |
| `useMotionDurations` | Animation timing values          |
| `useMotionSafeClass` | Motion-safe CSS class helper     |

---

## 5. Data Architecture

### 5.1 Data Sources

| Content Type       | Source Location                  | Validator     |
| ------------------ | -------------------------------- | ------------- |
| About Page         | `lib/data/about.ts`              | TypeScript    |
| Courses            | `lib/data/courses/`              | Zod           |
| Experience         | `lib/data/experience.ts`         | Zod           |
| News               | `lib/data/news.ts`               | TypeScript    |
| Publications       | `lib/data/publications.ts`       | Zod           |
| Research Interests | `lib/data/research-interests.ts` | TypeScript    |
| Teaching Stats     | `lib/data/teaching-stats.ts`     | TypeScript    |
| Teaching Timeline  | `lib/data/teaching-timeline.ts`  | TypeScript    |
| Testimonials       | `lib/data/testimonials.ts`       | TypeScript    |
| Site Config        | `config/site.ts`                 | Static Import |
| Research Profile   | `config/researcher-profile.ts`   | Static Import |
| Navigation         | `config/navigation.ts`           | Static Import |
| Themes             | `config/themes.ts`               | Static Import |

### 5.2 Type Unification

Types derived from Zod schemas via `z.infer<>`:

- `PublicationType`, `PublicationItem`
- `ExperienceType`, `ExperienceItem`
- `CourseInstitution`, `CourseLevel`, `CourseStatus`, `CourseData`

---

## 6. SEO Implementation

| File                         | Purpose                   |
| ---------------------------- | ------------------------- |
| `lib/seo/json-ld.ts`         | JSON-LD schema generators |
| `common/structured-data.tsx` | Structured data component |
| Page `metadata` exports      | Next.js metadata API      |

---

## 7. CI/CD Workflows

| Workflow     | File           | Purpose                           |
| ------------ | -------------- | --------------------------------- |
| **CI**       | `ci.yml`       | Lint, test, typecheck on PR       |
| **Deploy**   | `nextjs.yml`   | Build & deploy to GitHub Pages    |
| **Security** | `security.yml` | CodeQL analysis, dependency audit |

---

## 8. Test Architecture

- **Framework**: Vitest 3.2.x
- **Test Files**: 17 files in `tests/`
- **Coverage**: 89+ tests passing
- **Setup**: `tests/setup.ts` with Radix UI mocks

| Test Category | Files                                                                           |
| ------------- | ------------------------------------------------------------------------------- |
| Components    | `components.test.tsx`, `sidebar.test.tsx`, `navbar.test.tsx`                    |
| A11y          | `sidebar.a11y.test.tsx`, `skip-link.test.tsx`                                   |
| Hooks         | `use-toast.test.tsx`                                                            |
| UI            | `theme-selector.test.tsx`, `sheet.test.tsx`, `select.test.tsx`, `tabs.test.tsx` |
| Data          | `structured-data.test.ts`, `analytics.test.tsx`                                 |

---

## 9. Security & Dependencies

| Attribute       | Value            |
| --------------- | ---------------- |
| Next.js         | 15.6.0-canary.36 |
| TypeScript      | 5.6.x            |
| Zod             | 4.1.9            |
| Tailwind        | 3.4.13           |
| Vulnerabilities | Mitigated        |

---

## 10. AI Agent Protocols

1. **Read PMD First**: This file is absolute truth
2. **Modular Enforcement**: Feature-specific code goes in `features/`, not `shared/`
3. **Type SSoT**: Create Zod schema → export inferred type → re-export in `types/`
4. **Banned Patterns**: `key={index}`, dynamic Tailwind, `as any`, `@ts-ignore`
5. **Console Logs**: Wrap in `if (process.env.NODE_ENV === 'development')`
6. **Commit Standards**: Conventional Commits

---

## 11. QA Checklist

- [ ] `npm run typecheck` (Zero errors)
- [ ] `npm run lint` (Zero warnings)
- [ ] `npm run test:run` (89+ tests pass)
- [ ] `npm run build` (Successful export)

---

## 12. Scripts

| Command            | Purpose            |
| ------------------ | ------------------ |
| `npm run dev`      | Development server |
| `npm run build`    | Production build   |
| `npm run test:run` | Run tests          |
| `npm run lint`     | Lint with auto-fix |
| `npm run format`   | Prettier format    |
| `npm run validate` | Full validation    |

---

## 13. Changes Log

| Date       | Version | Changes                                                                     |
| ---------- | ------- | --------------------------------------------------------------------------- |
| 2025-12-16 | 4.0.0   | Added hooks, UI components, CI/CD, test architecture, SEO, all data sources |
| 2025-12-15 | 3.0.0   | Type unification, About page extraction, StatCard variants                  |
| 2025-12-14 | 2.1.0   | Hero redesign, 8pt grid, sidebar beautification                             |

---

> **Note**: Updates require forensic analysis to ensure accuracy.
