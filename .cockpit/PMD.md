# Project Master Document (PMD)

> **Version:** 5.0.0 | **Status:** ✅ VERIFIED | **Updated:** 2026-01-27

---

## 1. Overview

| Field       | Value                                                          |
| ----------- | -------------------------------------------------------------- |
| **Project** | Academic Portfolio                                             |
| **Domain**  | [mdasifbinkhaled.github.io](https://mdasifbinkhaled.github.io) |
| **Type**    | Static Site (GitHub Pages)                                     |
| **Stack**   | Next.js 15.5 · TypeScript · Tailwind CSS                       |

---

## 2. Architecture

### 2.1 Directory Layout

```text
src/
├── app/              # Next.js App Router
├── features/         # Feature modules (about, home, teaching, publications)
├── shared/           # Shared infrastructure
│   ├── components/   # common, layout, navigation, ui
│   ├── config/       # Site configuration (SSoT)
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # data, seo, validation
│   └── types/        # Type definitions
└── styles/           # Global CSS tokens
```

### 2.2 Principles

| Principle         | Implementation                      |
| ----------------- | ----------------------------------- |
| **SSoT**          | Config files drive all content      |
| **Type Safety**   | Zod schemas + `z.infer<>`           |
| **Server First**  | Use `'use client'` only when needed |
| **Static Export** | `output: 'export'`                  |
| **Clean Deps**    | `shared/` never imports `features/` |

---

## 3. Tech Stack

| Category   | Technology   | Version |
| ---------- | ------------ | ------- |
| Framework  | Next.js      | 15.5.9  |
| Language   | TypeScript   | 5.6.x   |
| Styling    | Tailwind CSS | 3.4.13  |
| Validation | Zod          | 4.1.9   |
| Testing    | Vitest       | 3.2.4   |
| Components | Radix UI     | Latest  |

**Note:** `eslint` pinned to `^8.57.1` for stability. `next` pinned to `15.5.9`. Vitest issue resolved by ESM configuration.

---

## 4. Design System

### 4.1 Theming

- **13 themes** defined in `config/themes.ts`
- **Tokens** in `styles/tokens.css`
- **Categories**: Classic, Natural, Vibrant, Professional

### 4.2 Shape Standards

| Element      | Style          |
| ------------ | -------------- |
| Cards        | `rounded-xl`   |
| Icons/Badges | `rounded-full` |

### 4.3 Components

**UI (17)**: Button, Card, Badge, Sheet, Tabs, Select, DropdownMenu, Toast, Toaster, ThemeSelector, Progress, Skeleton, ErrorBoundary, Input, Separator, PDFViewer, PDFViewerWrapper

**Common (14)**: AcademicProfiles, StatCard, BackToTop, SkipLink, NewsFeed, PublicationList, Icons, ErrorFallback, ExperienceCompact, FooterYear, HashScroll, MotionPage, StructuredData, PublicationCard

---

## 5. Data Layer

### 5.1 Sources

| Type         | Location                      |
| ------------ | ----------------------------- |
| Courses      | `lib/data/courses/index.json` |
| Publications | `lib/data/publications.ts`    |
| Experience   | `lib/data/experience.ts`      |
| Activities   | `lib/data/activities.ts`      |
| News         | `lib/data/news.ts`            |

### 5.2 Course Tier System

| Tier       | Display         | Count |
| ---------- | --------------- | ----- |
| `detailed` | Full page       | 1     |
| `standard` | Expandable card | 6     |
| `summary`  | Card only       | 4     |

### 5.3 Configuration

| Config                  | Purpose                   |
| ----------------------- | ------------------------- |
| `site.ts`               | Site metadata             |
| `navigation.ts`         | Nav structure             |
| `themes.ts`             | Theme definitions         |
| `constants.ts`          | Display limits            |
| `researcher-profile.ts` | Research areas & identity |
| `structured-data.ts`    | SEO & Schema logic        |

### 5.4 SEO & Structured Data

- **Implementation**: `src/shared/lib/structured-data.ts`
- **Schema Support**: `Person` (Global), `Course` (Teaching), `ScholarlyArticle` (Publications)
- **Optimization**: `next/font/google` (Zero CLS), Dynamic Metadata generation

---

## 6. Quality Assurance

### 6.1 Testing

- **Framework**: Vitest
- **Tests**: 98 (100% Passing)
- **Coverage**: 80% threshold

### 6.2 CI/CD

| Workflow       | Trigger      | Purpose               |
| -------------- | ------------ | --------------------- |
| `ci.yml`       | PR           | Lint, test, typecheck |
| `nextjs.yml`   | Push to main | Build & deploy        |
| `security.yml` | Schedule     | CodeQL, audit         |

### 6.3 Verification Commands

```bash
npm run validate   # Full check (Passes all)
npm run typecheck  # Types only
npm run lint:check # Lint only
npm run test:run   # Tests only
```

---

## 7. Conventions

### 7.1 Code

- **Files**: `kebab-case.tsx`
- **Components**: `PascalCase`
- **Hooks**: `use-*.ts`
- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/)

### 7.2 Banned Patterns

- `key={index}` in lists
- Dynamic Tailwind classes
- `as any`, `@ts-ignore`
- Console logs without env check
- Non-explicit imports (Barrel files only for modules)

---

## 8. Changelog

| Date       | Version | Changes                                                                          |
| ---------- | ------- | -------------------------------------------------------------------------------- |
| 2026-01-27 | 5.0.0   | **SOTA Integration**: Command Menu, Spotlight UI, Typed Routes, View Transitions |
| 2026-01-18 | 4.10.0  | **System Rebuild**: Clean install, dependencies verified, PMD updated            |
| 2026-01-17 | 4.9.2   | Final Polish: Course Detail refactor restored, Zod Schema fix, Test fix          |
| 2026-01-17 | 4.9.1   | Systematic cleanup: Semantic Tailwind tokens, hardcoded values removed           |
| 2026-01-17 | 4.9.0   | Performance & SEO Optimization (Next.font, JSON-LD)                              |
| 2026-01-14 | 4.8.0   | Teaching module refactoring - data-driven architecture                           |
| 2026-01-13 | 4.7.0   | Dependency audit, PMD sync (fix Tailwind version)                                |
| 2025-12-21 | 4.6.0   | Documentation overhaul (README/PMD), systematic cleanup                          |
| 2025-12-20 | 4.5.0   | Cleanup & finalization, fixed barrel exports                                     |
| 2025-12-19 | 4.4.1   | Shape system unification                                                         |
| 2025-12-17 | 4.4.0   | AI signature cleanup, CourseCard unification                                     |
| 2025-12-16 | 4.3.0   | Teaching data verified                                                           |
| 2025-12-16 | 4.0.0   | Major architecture overhaul                                                      |

---

> This document is the single source of truth. All changes require verification.
