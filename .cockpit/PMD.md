# Project Master Document (PMD)

> **Single Source of Truth** | **Version:** 2.0.0 (Comprehensive Upgrade) | **Status:** Active

---

## 1. Project Identity & Vision

- **Project Name:** Md Asif Bin Khaled - Academic Portfolio
- **Domain:** [mdasifbinkhaled.github.io](https://mdasifbinkhaled.github.io)
- **Type:** Static Academic Portfolio & Research Showcase
- **Core Mission:** To present research in Explainable AI (XAI) and Healthcare AI with high visual fidelity, ensuring content is accessible, data-driven, and easy to maintain.
- **Target Audience:** Academic collaborators, PhD supervisors, grant committees, and students.

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
│   ├── home/             # Homepage-specific widgets
│   └── teaching/         # Course cards, Timelines
├── shared/               # Reusable Primitives & Config
│   ├── components/       # UI Library (Radix/Shadcn)
│   ├── config/           # Site-wide configuration (SSoT)
│   ├── lib/              # Utilities, Validation, SEO
│   └── styles/           # Global CSS variables & tokens
└── .cockpit/             # Project Context & Documentation
```

### 2.2 Key Architectural Decisions

- **Single Source of Truth (SSoT)**: Configuration files (`site.ts`, `themes.ts`) drive the application state. Components must NOT contain hardcoded personal data.
- **Server Components First**: default to Server Components. Use `'use client'` only for interactive islands (e.g., Theme Toggle, Expandable Cards).
- **Static Export**: Built with `output: 'export'` for zero-config hosting on GitHub Pages.

---

## 3. Design System

The application features a sophisticated theming engine built on Tailwind CSS and CSS Variables.

- **Framework**: Tailwind CSS v3.x (Utility-First)
- **Component Library**: Primitive composition using Radix UI (accessible, headless) styling with Tailwind (Shadcn-like pattern).
- **Theming Engine**:
  - **Source**: `src/shared/config/themes.ts`
  - **Implementation**: `src/styles/tokens.css` (CSS Custom Properties)
  - **Selection**: `ThemeSelector` component allows dynamic switching.
- **Theme Categories**:
  - **Classic**: Light, Dark.
  - **Natural**: Ocean, Warm, Forest.
  - **Vibrant**: Midnight, Sunset, Lavender.
  - **Professional**: Slate, Crimson, Emerald, Indigo, Vintage.

**Accessibility (A11y)**:

- High Contrast support (`prefers-contrast`).
- Reduced Motion support (`prefers-reduced-motion`).
- Semantic HTML (`<main>`, `<aside>`, `<nav>`).
- Skip Links implemented.

---

## 4. Data Architecture

The site uses a **Static JSON / Zod Validation** strategy to ensure robust content management without a CMS.

### 4.1 Data Sources

| Content Type          | Source Location                           | Loader / Validator        |
| --------------------- | ----------------------------------------- | ------------------------- |
| **Courses**           | `src/shared/lib/data/courses/*.json`      | `courses.ts` / Zod Schema |
| **Global Config**     | `src/shared/config/site.ts`               | Static Import             |
| **Research Identity** | `src/shared/config/researcher-profile.ts` | Static Import             |
| **Navigation**        | `src/shared/config/navigation.ts`         | Static Import             |
| **News**              | `src/shared/lib/data/news.ts`             | TypeScript Interface      |

### 4.2 Validation Strategy

- **Build-Time Validation**: Complex data (Courses, Publications) is validated using **Zod** schemas at build time. This prevents broken deployments due to malformed JSON.
- **Strict Typing**: TypeScript Strict Mode is enabled (`strict: true`).

---

## 5. Security & Dependencies

| Attribute              | State            | Notes                                               |
| ---------------------- | ---------------- | --------------------------------------------------- |
| **Next.js Version**    | 15.6.0-canary.36 | Security Patch                                      |
| **Vulnerabilities**    | Mitigated        | RCE (Critical) fixed in Canary; others N/A (Static) |
| **Server Actions**     | Forbidden        | Security surface area reduced to zero               |
| **Image Optimization** | `unoptimized`    | Configured for GitHub Pages compatibility           |

---

## 6. AI Agent Protocols (Context Engineering)

**Instructions for Future Agents:**

1. **Read PMD First**: This file is the absolute truth.
2. **Modular Enforcement**: NEVER put feature-specific code in `shared/`. Always create a new slice in `features/`.
3. **Strict Validation**: When adding new data types, create a Zod schema in `src/shared/lib/validation/schemas.ts`.
4. **No Anti-Patterns**:
   - `key={index}` is BANNED.
   - Dynamic Tailwind classes (e.g. `bg-${color}`) are BANNED. Use `clsx` / `cva`.
5. **Clean Code**: Remove unused imports and dead code immediately.
6. **Commit Standards**: Use Conventional Commits (`feat:`, `fix:`, `chore:`).

---

## 7. Quality Assurance (QA) Checklist

Before any PR/Merge, the following must pass:

- [ ] `npm run typecheck` (Zero errors)
- [ ] `npm run lint:check` (Zero ESLint warnings)
- [ ] `npm run test:run` (All unit tests pass)
- [ ] `npm run build` (Successful static export)
- [ ] **Forensic Check**: Verify no "Ghost Code" or unused files remain.

---

## 8. Operational Manual

### 8.1 Scripts

- **Development**: `npm run dev`
- **Production Build**: `npm run build`
- **Testing**: `npm run test` / `npm run test:ui`
- **Linting**: `npm run lint`

### 8.2 Deployment

- **Platform**: GitHub Pages
- **Trigger**: Push to `main` branch.
- **Workflow**: `.github/workflows/nextjs.yml` handles build and deploy.

---

> **Note**: Updates to this document require a "Forensic Analysis" task to ensure it reflects reality.
