# Project Master Document (PMD)

> **Single Source of Truth** | **Version:** 1.0.0 (Dec 2024 Reform) | **Status:** Active

---

## 1. Project Identity

- **Name:** Md Asif Bin Khaled - Academic Portfolio
- **Type:** Static Website (Portfolio & Research Showcase)
- **Goal:** Showcase research in Explainable AI (XAI) and Healthcare AI, teaching experience, and publications to facilitate PhD opportunities and academic collaboration.
- **Hosted On:** GitHub Pages
- **URL:** [mdasifbinkhaled.github.io](https://mdasifbinkhaled.github.io)

---

## 2. Technical Stack (SOTA)

| Layer          | Technology   | Version | Rationale                                      |
| -------------- | ------------ | ------- | ---------------------------------------------- |
| **Core**       | Next.js      | 15.5.4  | Server Components, Static Export, Performance. |
| **UI Library** | React        | 18.3.1  | Component architecture, Ecosystem support.     |
| **Styling**    | Tailwind CSS | 3.4.13  | Utility-first, Design Tokens, Themes.          |
| **Language**   | TypeScript   | 5.x     | Type safety, Robustness.                       |
| **Validation** | Zod          | 3.23    | Build-time data validation for JSON loaders.   |
| **Icons**      | Lucide React | 0.447   | Consistent, modern iconography.                |
| **Testing**    | Vitest       | 2.1     | Unit testing, fast execution.                  |

---

## 3. Architecture & Context Engineering

### 3.1 Directory Structure (Feature-Sliced)

The project follows a strict modular architecture to ensure separation of concerns:

- **`src/features/`**: Domain-specific business logic. Contains `components/`, `hooks/`, `utils/`.
  - `academic`: Research, publications.
  - `teaching`: Course cards, timeline.
  - `home`: Landing page widgets.
- **`src/shared/`**: Truly reusable primitives.
  - `components/ui`: Shadcn-like base components (Button, Card).
  - `components/common`: Generic widgets (StatCard, NewsFeed).
  - `config/`: Centralized configuration (SiteConfig, Themes).
  - `lib/`: Utilities, Validation, Data Loaders.
- **`src/app/`**: Thin routing layer (Next.js App Router).

### 3.2 Key Design Patterns

1. **Single Source of Truth (SSoT)**:
   - **Configuration**: All personal data and links live in `src/shared/config/site.ts`.
   - **Researcher Data**: `researcher-profile.ts` imports from `site.ts`.
   - **Themes**: Defined in `src/styles/tokens.css` and `src/shared/config/themes.ts`.

2. **Data-Driven Content**:
   - **Courses/Publications**: Stored as JSON files in `src/shared/lib/data/courses/`.
   - **Loading**: Loaded and validated via Zod schemas at build time. No hardcoded content in React components (except simple static labels).

3. **Component Composition**:
   - Use generic containers (`Card`, `Section`) composed with specific data display components (`StatCard`, `CourseCard`).
   - Avoid "God Components".

### 3.3 Security & Robustness Rules

- **Static Export**: The site uses `output: 'export'`.
- **No Server Actions**: Security vulnerabilities restricted to server runtime are mitigated.
- **Strict Validation**: All external/complex data MUST be validated via `validateData` (Zod).
- **Anti-Patterns**:
  - ❌ `key={index}` is STRICTLY FORBIDDEN. Use unique IDs.
  - ❌ Dynamic Tailwind classes (e.g., `bg-${color}`). Use static maps (`clsx`).

---

## 4. Development Workflow & Context

### 4.1 AI Agent Instructions

When working on this project, adhere to these rules:

1. **Read First**: Check `.cockpit/PMD.md` for architecture and conventions.
2. **Verify**: Always run `npm run typecheck` and `npm run test:run` after changes.
3. **Modular**: Place new features in `src/features/[name]`. Do not clutter `shared/`.
4. **Config**: Updates to personal info go to `src/shared/config/site.ts`, NOT components.
5. **Cleanliness**: Remove unused code immediately. Keep `globals.css` minimal.

### 4.2 Commands

| Action     | Command              |
| ---------- | -------------------- |
| Dev Server | `npm run dev`        |
| Build      | `npm run build`      |
| Type Check | `npm run typecheck`  |
| Lint       | `npm run lint:check` |
| Test       | `npm run test:run`   |

---

## 5. Maintenance Roadmap

- [ ] **Image Optimization**: Integrate third-party loader for `next/image` (optional).
- [ ] **Font Optimization**: Migrate system fonts to `next/font/google`.
- [ ] **Content**: Regularly update JSON data files for new publications/courses.

---

> **Note**: This file serves as the context anchor for all future development sessions.
