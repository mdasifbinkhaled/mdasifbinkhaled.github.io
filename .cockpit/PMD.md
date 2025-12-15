# Project Master Document (PMD)

> **Single Source of Truth** | **Version:** 3.0.0 (Type Unification & UI Upgrade) | **Status:** Active | **Last Updated:** 2025-12-15

---

## 1. Project Identity & Vision

- **Project Name:** Md Asif Bin Khaled - Academic Portfolio
- **Domain:** [mdasifbinkhaled.github.io](https://mdasifbinkhaled.github.io)
- **Type:** Static Academic Portfolio & Research Showcase
- **Core Mission:** To present research in Explainable AI (XAI) and Healthcare AI with high visual fidelity, ensuring content is accessible, data-driven, and easy to maintain.
- **Target Audience:** Academic collaborators, PhD supervisors, grant committees, and students.
- **SOTA Score:** 9.2/10 ⭐ (as of latest audit)

---

## 2. Technical Architecture (Feature-Sliced Design)

The project leverages a **Feature-Sliced** architecture to ensure modularity and scalability.

### 2.1 Directory Structure Breakdown

```
src/
├── app/                  # Next.js App Router (Routing Layer only)
│   ├── layout.tsx        # Global shell (Providers, Metadata)
│   ├── page.tsx          # Homepage (Composes features)
│   └── [routes]/         # /about, /teaching, etc.
├── features/             # Business Logic & Smart Components
│   ├── academic/         # Research, Publications logic
│   ├── home/             # Homepage-specific widgets (HeroSection, NewsSection)
│   ├── publications/     # Publication cards and lists
│   └── teaching/         # Course cards, Timelines, Stats
├── shared/               # Reusable Primitives & Config
│   ├── components/       # UI Library (Radix/Shadcn)
│   │   ├── common/       # StatCard, NewsFeed, PublicationList
│   │   ├── layout/       # AppSidebarLayout, ProfileSidebar
│   │   └── ui/           # Primitive UI (Button, Card, Badge)
│   ├── config/           # Site-wide configuration (SSoT)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities, Validation, SEO, Data Layer
│   │   ├── data/         # Static data files (about.ts, news.ts, courses/)
│   │   ├── seo/          # JSON-LD structured data
│   │   └── validation/   # Zod schemas (SSoT for types)
│   ├── providers/        # React context providers
│   └── types/            # Re-exports from Zod schemas
└── .cockpit/             # Project Context & Documentation
```

### 2.2 Key Architectural Decisions

- **Single Source of Truth (SSoT)**: Configuration files (`site.ts`, `themes.ts`) drive the application state. Components must NOT contain hardcoded personal data.
- **Type SSoT via Zod**: TypeScript types are derived from Zod schemas using `z.infer<>`. See Section 4.2.
- **Server Components First**: default to Server Components. Use `'use client'` only for interactive islands (e.g., Theme Toggle, Expandable Cards).
- **Static Export**: Built with `output: 'export'` for zero-config hosting on GitHub Pages.
- **Clean Dependency Flow**: `shared/` never imports from `features/`. Features may import from shared.

---

## 3. Design System

The application features a sophisticated theming engine built on Tailwind CSS and CSS Variables.

### 3.1 Framework & Components

- **Framework**: Tailwind CSS v3.4 (Utility-First)
- **Component Library**: Primitive composition using Radix UI (accessible, headless) styled with Tailwind (Shadcn pattern).
- **Grid System**: 8pt (rem-based) vertical rhythm for mathematical beauty.

### 3.2 Theming Engine

- **Source**: `src/shared/config/themes.ts`
- **Implementation**: `src/styles/tokens.css` (CSS Custom Properties)
- **Selection**: `ThemeSelector` component allows dynamic switching.

**Theme Categories:**

- **Classic**: Light, Dark.
- **Natural**: Ocean, Warm, Forest.
- **Vibrant**: Midnight, Sunset, Lavender.
- **Professional**: Slate, Crimson, Emerald, Indigo, Vintage.

### 3.3 Unified Components

| Component        | Location                                       | Variants                      | Purpose                                      |
| ---------------- | ---------------------------------------------- | ----------------------------- | -------------------------------------------- |
| `StatCard`       | `shared/components/common/stat-card.tsx`       | `default`, `compact`, `glass` | Statistics display across Hero, Teaching     |
| `NewsSection`    | `features/home/components/news-section.tsx`    | -                             | Homepage news feed                           |
| `ProfileSidebar` | `shared/components/layout/profile-sidebar.tsx` | -                             | Fixed sidebar with profile, nav, social grid |

### 3.4 Accessibility (A11y)

- High Contrast support (`prefers-contrast`).
- Reduced Motion support (`prefers-reduced-motion`).
- Semantic HTML (`<main>`, `<aside>`, `<nav>`).
- Skip Links implemented.
- WCAG 2.1 Level AA compliance.

---

## 4. Data Architecture

The site uses a **Static TypeScript / Zod Validation** strategy to ensure robust content management without a CMS.

### 4.1 Data Sources

| Content Type          | Source Location                           | Loader / Validator        |
| --------------------- | ----------------------------------------- | ------------------------- |
| **About Page Data**   | `src/shared/lib/data/about.ts`            | TypeScript Interface      |
| **Courses**           | `src/shared/lib/data/courses/*.json`      | `courses.ts` / Zod Schema |
| **Global Config**     | `src/shared/config/site.ts`               | Static Import             |
| **Research Identity** | `src/shared/config/researcher-profile.ts` | Static Import             |
| **Navigation**        | `src/shared/config/navigation.ts`         | Static Import             |
| **News**              | `src/shared/lib/data/news.ts`             | TypeScript Interface      |
| **Publications**      | `src/shared/lib/data/publications.ts`     | Zod Schema                |
| **Experience**        | `src/shared/lib/data/experience.ts`       | Zod Schema                |

### 4.2 Type Unification (SSoT Pattern)

**CRITICAL:** Types are derived from Zod schemas to prevent duplication.

```typescript
// In schemas.ts - Single Source of Truth
export const publicationItemSchema = z.object({ ... });
export type PublicationItem = z.infer<typeof publicationItemSchema>;

// In types/index.ts - Re-export only
export type { PublicationItem } from '@/shared/lib/validation/schemas';
```

**Unified Types (from Zod):**

- `PublicationType`, `PublicationItem`
- `ExperienceType`, `ExperienceItem`
- `CourseInstitution`, `CourseLevel`, `CourseStatus`, `CourseData`
- `CourseAssessmentBreakdown`

### 4.3 Validation Strategy

- **Build-Time Validation**: Complex data is validated using Zod schemas at build time.
- **Strict Typing**: TypeScript Strict Mode is enabled (`strict: true`, `noUncheckedIndexedAccess: true`).

---

## 5. Security & Dependencies

| Attribute              | State            | Notes                                               |
| ---------------------- | ---------------- | --------------------------------------------------- |
| **Next.js Version**    | 15.6.0-canary.36 | Security Patch                                      |
| **TypeScript Version** | 5.6.x            | Latest stable                                       |
| **Zod Version**        | 4.1.9            | Latest with TypeScript 5 support                    |
| **Vulnerabilities**    | Mitigated        | RCE (Critical) fixed in Canary; others N/A (Static) |
| **Server Actions**     | Forbidden        | Security surface area reduced to zero               |
| **Image Optimization** | `unoptimized`    | Configured for GitHub Pages compatibility           |

---

## 6. AI Agent Protocols (Context Engineering)

**Instructions for Future Agents:**

1. **Read PMD First**: This file is the absolute truth.
2. **Modular Enforcement**: NEVER put feature-specific code in `shared/`. Always create a new slice in `features/`.
3. **Type SSoT**: When adding new data types:
   - Create Zod schema in `src/shared/lib/validation/schemas.ts`
   - Export inferred type: `export type NewType = z.infer<typeof newTypeSchema>;`
   - Re-export in `types/index.ts`
4. **No Anti-Patterns**:
   - `key={index}` is BANNED.
   - Dynamic Tailwind classes (e.g. `bg-${color}`) are BANNED. Use `clsx` / `cva`.
   - `as any` is BANNED in production code.
   - `@ts-ignore` is BANNED.
5. **Clean Code**: Remove unused imports and dead code immediately.
6. **Commit Standards**: Use Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`).
7. **Console Logs**: Wrap in `if (process.env.NODE_ENV === 'development')`.

---

## 7. Quality Assurance (QA) Checklist

Before any PR/Merge, the following must pass:

- [ ] `npm run typecheck` (Zero errors)
- [ ] `npm run lint` (Zero ESLint warnings)
- [ ] `npm run test:run` (All 89+ unit tests pass)
- [ ] `npm run build` (Successful static export)
- [ ] **Forensic Check**: Verify no "Ghost Code" or unused files remain.

**Current Test Status:** 89/89 passing ✅

---

## 8. Operational Manual

### 8.1 Scripts

| Command                             | Purpose                                   |
| ----------------------------------- | ----------------------------------------- |
| `npm run dev`                       | Development server                        |
| `npm run build`                     | Production build                          |
| `npm run test` / `npm run test:run` | Run tests                                 |
| `npm run lint`                      | Lint with auto-fix                        |
| `npm run format`                    | Format with Prettier                      |
| `npm run validate`                  | Full validation (lint + test + typecheck) |

### 8.2 Deployment

- **Platform**: GitHub Pages
- **Trigger**: Push to `main` branch.
- **Workflow**: `.github/workflows/nextjs.yml` handles build and deploy.

---

## 9. Recent Changes Log

| Date       | Version | Changes                                                                                           |
| ---------- | ------- | ------------------------------------------------------------------------------------------------- |
| 2025-12-15 | 3.0.0   | Type unification via z.infer, About page data extraction, StatCard glass variant, test mock fixes |
| 2025-12-14 | 2.1.0   | Hero section redesign, 8pt grid system, sidebar beautification                                    |
| 2025-12-13 | 2.0.0   | Feature-sliced architecture, Zod validation, theming engine                                       |

---

> **Note**: Updates to this document require a "Forensic Analysis" task to ensure it reflects reality.
