# Project Master Document (PMD)

> **Single Source of Truth** | **Version:** 4.4.0 | **Status:** Active | **Last Updated:** 2025-12-17

---

## 1. Project Identity & Vision

- **Project Name:** Md Asif Bin Khaled - Academic Portfolio
- **Domain:** [mdasifbinkhaled.github.io](https://mdasifbinkhaled.github.io)
- **Type:** Static Academic Portfolio & Research Showcase
- **Core Mission:** Present research in Explainable AI (XAI) and Healthcare AI with high visual fidelity.
- **Target Audience:** Academic collaborators, PhD supervisors, grant committees, students.
- **Audit Score:** 8.8/10 ⭐ (Comprehensive audit 2025-12-16)

---

## 2. Technical Architecture

### 2.1 Directory Structure

```text
src/
├── app/                    # Next.js App Router
├── features/               # Feature modules (about, academic, home, publications, teaching)
├── shared/                 # Reusable infrastructure
│   ├── components/         # common, layout, navigation, ui
│   ├── config/             # SSoT configuration
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # data, seo, validation
│   ├── providers/          # React context
│   └── types/              # Type re-exports
├── styles/                 # Global CSS
└── tests/                  # Vitest test suite
```

### 2.2 Key Decisions

- **SSoT**: Config files drive state; no hardcoded personal data
- **Type SSoT via Zod**: Types derived from schemas using `z.infer<>`
- **Server Components First**: `'use client'` only for interactive islands
- **Static Export**: `output: 'export'` for GitHub Pages
- **Clean Dependency Flow**: `shared/` never imports from `features/`

---

## 3. Design System

### 3.1 Framework

- **CSS**: Tailwind CSS v3.4
- **Components**: Radix UI + Tailwind (Shadcn pattern)
- **Grid**: 8pt vertical rhythm

### 3.2 Theming

- **Source**: `config/themes.ts` | **Tokens**: `styles/tokens.css`
- **13 Themes**: Classic, Natural, Vibrant, Professional categories

### 3.3 UI Components (18 files)

| Component          | Purpose                      |
| ------------------ | ---------------------------- |
| `Button`           | Action buttons with variants |
| `Card`             | Content containers           |
| `Badge`            | Labels and tags              |
| `Sheet`            | Mobile slide-out panels      |
| `Tabs`             | Tabbed content               |
| `Select`           | Dropdown selection           |
| `DropdownMenu`     | Context menus                |
| `Toast`            | Notifications                |
| `Toaster`          | Toast container              |
| `ThemeSelector`    | Theme switching              |
| `Progress`         | Progress indicators          |
| `Skeleton`         | Loading states               |
| `ErrorBoundary`    | Error handling               |
| `Input`            | Form inputs                  |
| `Separator`        | Visual dividers              |
| `PDFViewer`        | PDF display                  |
| `PDFViewerWrapper` | PDF wrapper                  |

### 3.4 Common Components (13 files)

| Component           | Purpose                                    |
| ------------------- | ------------------------------------------ |
| `StatCard`          | Statistics display (default/compact/glass) |
| `BackToTop`         | Scroll-to-top button                       |
| `SkipLink`          | A11y skip navigation                       |
| `NewsFeed`          | News display                               |
| `PublicationList`   | Filterable publications                    |
| `Icons`             | Icon component registry                    |
| `ErrorFallback`     | Error UI fallback                          |
| `ExperienceCompact` | Experience display                         |
| `FooterYear`        | Dynamic footer year                        |
| `HashScroll`        | Hash-based scrolling                       |
| `MotionPage`        | Page animations                            |
| `StructuredData`    | SEO structured data                        |

### 3.5 Accessibility

- High Contrast & Reduced Motion support
- Semantic HTML, Skip Links, WCAG 2.1 AA

---

## 4. Custom Hooks (6 in 4 files)

| Hook                 | Purpose                   |
| -------------------- | ------------------------- |
| `useDebounce`        | Debounced value updates   |
| `useIsMobile`        | Mobile viewport detection |
| `useToast`           | Toast notification system |
| `useReducedMotion`   | A11y motion preference    |
| `useMotionDurations` | Animation timing values   |
| `useMotionSafeClass` | Motion-safe CSS classes   |

---

## 5. Data Architecture

### 5.1 Data Sources (10 files + courses/)

| Content Type       | Source Location                     |
| ------------------ | ----------------------------------- |
| About Page         | `lib/data/about.ts`                 |
| Courses            | `lib/data/courses/` (11 JSON files) |
| Courses Loader     | `lib/data/courses.ts`               |
| Education          | `lib/data/education.ts`             |
| Experience         | `lib/data/experience.ts`            |
| News               | `lib/data/news.ts`                  |
| Publications       | `lib/data/publications.ts`          |
| Research Interests | `lib/data/research-interests.ts`    |
| Teaching Stats     | `lib/data/teaching-stats.ts`        |
| Teaching Timeline  | `lib/data/teaching-timeline.ts`     |
| Testimonials       | `lib/data/testimonials.ts`          |

### 5.2 Config Files

| Config           | Location                       |
| ---------------- | ------------------------------ |
| Site             | `config/site.ts`               |
| Research Profile | `config/researcher-profile.ts` |
| Navigation       | `config/navigation.ts`         |
| Themes           | `config/themes.ts`             |
| Assets           | `config/assets.ts`             |
| Constants        | `config/constants.ts`          |

### 5.3 Type Unification

Types from Zod via `z.infer<>`: `PublicationType`, `PublicationItem`, `ExperienceType`, `ExperienceItem`, `CourseData`

---

## 6. SEO Implementation

| File                         | Purpose                   |
| ---------------------------- | ------------------------- |
| `lib/seo/json-ld.ts`         | JSON-LD generators        |
| `common/structured-data.tsx` | Structured data component |

---

## 7. CI/CD Workflows (3)

| Workflow       | Purpose                        |
| -------------- | ------------------------------ |
| `ci.yml`       | Lint, test, typecheck on PR    |
| `nextjs.yml`   | Build & deploy to GitHub Pages |
| `security.yml` | CodeQL, dependency audit       |

---

## 8. Test Architecture

- **Framework**: Vitest 3.2.x | **Files**: 17 | **Tests**: 89+
- **Setup**: `tests/setup.ts` with Radix UI mocks

---

## 9. Dependencies

| Package    | Version |
| ---------- | ------- |
| Next.js    | 15.5.4  |
| React      | 18.3.1  |
| TypeScript | 5.9.2   |
| Tailwind   | 3.4.17  |
| Zod        | 4.1.9   |
| Vitest     | 3.2.4   |

---

## 10. AI Agent Protocols

1. Read PMD First
2. Feature code in `features/`, not `shared/`
3. Type SSoT via Zod schemas
4. Banned: `key={index}`, dynamic Tailwind, `as any`, `@ts-ignore`
5. Console logs wrapped in development check
6. Conventional Commits

---

## 11. Teaching Data Source of Truth (Verified 2025-12-16)

### 11.1 Official Position

- **Role**: Senior Lecturer
- **Department**: Computer Science & Engineering
- **School**: School of Engineering, Technology & Sciences (SETS)
- **Institution**: Independent University, Bangladesh (IUB)

### 11.2 Validated Courses

| Code    | Title                           | Period    | Role            |
| ------- | ------------------------------- | --------- | --------------- |
| CSE 101 | Intro to Programming            | 2023+     | Senior Lecturer |
| CSE 110 | Fundamentals of Computer System | 2019-2023 | Lecturer        |
| CSE 201 | Discrete Mathematics            | 2019-2023 | Lecturer        |
| CSE 203 | Data Structures                 | 2019-2023 | Lecturer        |
| CSE 211 | Algorithms                      | 2019+     | Both            |
| CSE 317 | Numerical Methods               | 2019-2023 | Lecturer        |
| CSE 401 | Finite Automata                 | 2023+     | Senior Lecturer |

### 11.3 Q/A Archive (2025-12-16)

> **Q1: Position Title?**
> A: Senior Lecturer (CV verified), Department of CSE, SETS.
>
> **Q2: Career Timeline?**
> A: BRACU Student Tutor (2015-2017) -> IUB TA (2017) -> BRACU Lecturer (2017-2018) -> IUB Lecturer (2019-2023) -> IUB Senior Lecturer (2023-Present).
>
> **Q3: Verified Courses?**
> A: See table in 11.2 above. CSE 205, 403, 401 (old) removed as invalid.
>
> **Q4: BRACU Role?**
> A: Adjunct Lecturer (Sep 2017 - Dec 2018) for lab courses (Graphics, Numerical Methods, Compiler Design, Android).
>
> **Q5: Teaching Metrics?**
> A: Average Evaluation: 4.32/5. Years Teaching: 10+.

---

## 12. QA Checklist

- [x] `npm run typecheck`
- [x] `npm run lint`
- [x] `npm run test:run`
- [x] `npm run build`

---

## 13. Scripts

| Command            | Purpose          |
| ------------------ | ---------------- |
| `npm run dev`      | Development      |
| `npm run build`    | Production build |
| `npm run test:run` | Tests            |
| `npm run lint`     | Lint             |
| `npm run validate` | Full validation  |

---

## 14. Changes Log

| Date       | Version | Changes                                                          |
| ---------- | ------- | ---------------------------------------------------------------- |
| 2025-12-17 | 4.4.0   | Unified CourseCard component, AI signature cleanup (-303 lines)  |
| 2025-12-16 | 4.3.0   | Teaching data finalized based on CV verification                 |
| 2025-12-16 | 4.2.0   | About page refactored into 12 modular components, Next.js 15.5.4 |
| 2025-12-16 | 4.1.0   | Added all 18 UI components, 13 common components, courses.ts     |
| 2025-12-16 | 4.0.0   | Hooks, CI/CD, test architecture, SEO                             |
| 2025-12-15 | 3.0.0   | Type unification                                                 |

---

> Updates require forensic analysis.
