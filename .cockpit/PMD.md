# Project Master Document (PMD)

> **Version:** 5.0.0 | **Status:** ✅ STABLE | **Updated:** 2026-01-25

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
| **Visuals**       | Physics-based Motion (Springs)      |

---

## 3. Tech Stack

| Category   | Technology    | Version |
| ---------- | ------------- | ------- |
| Framework  | Next.js       | 15.5.x  |
| Language   | TypeScript    | 5.6.x   |
| Styling    | Tailwind CSS  | 3.4.x   |
| Animation  | Framer Motion | 12.x    |
| Charts     | Recharts      | 3.7.x   |
| Validation | Zod           | 4.1.x   |
| Testing    | Vitest        | 3.2.x   |

**Note:** `eslint` pinned to `^8.57.1` for stability.

---

## 4. Design System

### 4.1 Theming

- **13 themes** defined in `config/themes.ts`
- **Tokens** in `styles/tokens.css`
- **Z-Index**: Centralized architecture (`z-navbar`, `z-sidebar`, etc.)

### 4.2 Shape & Motion

| Element      | Style                  |
| ------------ | ---------------------- |
| Cards        | `rounded-xl`           |
| Icons/Badges | `rounded-full`         |
| Animations   | Spring Physics (Apple) |

### 4.3 Components

**UI**: Button, Card, Badge, Sheet, Tabs, Select, DropdownMenu, Toast, Toaster, ThemeSelector, Progress, Skeleton, ErrorBoundary, Input, Separator, PDFViewer.

**Smart Components**:

- `TeachingTrendChart`: Interactive Recharts integration.
- `StatCard`: CountUp animation enabled.
- `TeachingTabs`: Layout projection switching.

---

## 5. Data Layer

### 5.1 Sources

| Type         | Location                      | Status |
| ------------ | ----------------------------- | ------ |
| Facutly      | `lib/data/faculty.ts`         | SSOT   |
| Evaluations  | `lib/data/evaluations.ts`     | SSOT   |
| Courses      | `lib/data/courses/index.json` | Active |
| Publications | `lib/data/publications.ts`    | Active |
| Experience   | `lib/data/experience.ts`      | Active |

### 5.2 Analytics Engine

- **Real-time Math**: Aggregates 21 semesters of data (2019-2025).
- **Metric**: Weighted Average Rating (Student Evaluations).
- **Visualization**: Semester-over-semester trend line.

### 5.3 Configuration

| Config                  | Purpose                   |
| ----------------------- | ------------------------- |
| `site.ts`               | Site metadata             |
| `navigation.ts`         | Nav structure             |
| `themes.ts`             | Theme definitions         |
| `constants.ts`          | Layout & Display limits   |
| `researcher-profile.ts` | Research areas & identity |
| `structured-data.ts`    | SEO & Schema logic        |

---

## 6. Quality Assurance

### 6.1 Testing

- **Framework**: Vitest
- **Tests**: 100% Passing (17 Suites)
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
- Dynamic Tailwind classes (`w-[${value}]` -> use `style={{}}` or constants)
- `as any`, `@ts-ignore`
- Console logs in production
- Non-explicit imports

---

## 8. Changelog

| Date       | Version | Changes                                                                       |
| ---------- | ------- | ----------------------------------------------------------------------------- |
| 2026-01-25 | 5.0.0   | **SOTA Upgrade**: Physics animations, Teaching Analytics, Data centralization |
| 2026-01-18 | 4.10.0  | **System Rebuild**: Clean install, dependencies verified, PMD updated         |
| 2026-01-17 | 4.9.2   | Final Polish: Course Detail refactor restored, Zod Schema fix, Test fix       |
| 2026-01-17 | 4.9.1   | Systematic cleanup: Semantic Tailwind tokens, hardcoded values removed        |

---

> This document is the single source of truth. All changes require verification.
