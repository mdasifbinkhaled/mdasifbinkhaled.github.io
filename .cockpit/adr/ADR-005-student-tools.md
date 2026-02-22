# ADR-005: Student-Facing Tools Tab

**Date**: 2026-02-19
**Status**: Proposed
**Deciders**: Md Asif Bin Khaled

## Context

The academic portfolio currently serves as a read-only showcase. Students visit for course information but have no interactive tools. Adding a `/tools` route with lightweight, client-side utilities would:

1. Increase student engagement and repeat visits
2. Differentiate from standard academic portfolios
3. Use existing course data (TypeScript types, assessment breakdowns)
4. Remain compatible with static export (no server required)

The `courseAssessmentBreakdownSchema` already supports `midterm`, `final`, `assignments`, `projects`, `quizzes`, and `participation` weights — but no course data files populate the `assessment` field yet. This ADR establishes the architecture for adding tools incrementally.

## Decision

### 1. Route Structure

```
src/app/tools/
├── page.tsx              — Tools hub (grid of available tools)
├── error.tsx             — Error boundary
├── layout.tsx            — Tools layout with back navigation
├── grade-calculator/
│   ├── page.tsx          — Grade calculator tool
│   └── error.tsx
├── seat-plan/
│   ├── page.tsx          — Seat plan generator
│   └── error.tsx
└── gpa-calculator/
    ├── page.tsx          — GPA calculator
    └── error.tsx
```

### 2. Feature Module

```
src/features/tools/
├── index.ts                    — Barrel export
├── types.ts                    — Tool-specific types
├── components/
│   ├── tool-card.tsx           — Tool selection card for hub page
│   ├── grade-calculator.tsx    — Grade calculator widget (client)
│   ├── seat-plan-generator.tsx — Seat plan generator widget (client)
│   └── gpa-calculator.tsx      — GPA calculator widget (client)
└── utils/
    ├── grade-utils.ts          — Grade calculation logic
    └── seat-plan-utils.ts      — Seat plan layout algorithms
```

### 3. Navigation

Add to `mainNavItems` in `navigation.ts`:

```typescript
{ href: '/tools', label: 'Tools', icon: 'Wrench', sectionId: 'tools' }
```

Add `Wrench` to `navIconMap` in `nav-icon-map.ts`.

### 4. Tool Specifications

#### Tool 1: Grade Calculator (Priority: HIGH)

- **Input**: Select course → shows assessment weights from course data. Student enters scores per component.
- **Output**: Weighted total, letter grade, pass/fail projection.
- **Data Source**: `course.assessment` field (needs population in course data files).
- **Fallback**: If no assessment data, allow manual weight entry.
- **Tech**: Pure client-side calculation. `'use client'` component.

#### Tool 2: Seat Plan Generator (Priority: HIGH)

- **Input**: Upload CSV/paste student list, room dimensions (rows × columns), randomization seed.
- **Output**: Visual seat plan grid, exportable as PDF via `html2canvas` + `jsPDF` (or browser print).
- **Tech**: Pure client-side. No file leaves the browser. CSP-compatible.
- **Dependencies**: None required (optional: `jsPDF` for PDF export).

#### Tool 3: GPA Calculator (Priority: MEDIUM)

- **Input**: Add courses with credit hours and letter grades. Supports IUB and BRACU grading scales.
- **Output**: Semester GPA, cumulative GPA projection.
- **Tech**: Pure client-side. Grade scale data stored in config.

#### Tool 4: Office Hours Widget (Priority: MEDIUM)

- **Input**: None (data-driven from config).
- **Output**: Structured office hours display with "Book via email" CTA.
- **Tech**: Server component, reads from `researcher-profile.ts`.

#### Future Tools (Priority: LOW)

- **Exam Countdown**: Per-course countdown timers using `course.exams` data.
- **PDF Study Aid**: Upload PDF, produce AI summary. Requires WebLLM (runs in browser) or external API key. Complex — deferred.
- **Assignment Tracker**: Checklist from `course.assignments` data.

### 5. Constraints

- **Static export**: All tools must work without a server. No API routes.
- **No data leaves browser**: Student data (grades, names) is never transmitted.
- **Progressive**: Tools work without JS for basic display, enhanced with client components.
- **Bundle budget**: Each tool should add < 30KB gzipped. Lazy-load heavy dependencies.
- **Schema-first**: Any new data shapes get TypeScript interfaces before implementation.

### 6. Data Changes Required

Before the grade calculator works with real data, populate `assessment` in course files:

```typescript
// Example: iub-cse211/index.ts
assessment: {
  midterm: 25,
  final: 35,
  assignments: 15,
  quizzes: 15,
  participation: 10,
}
```

## Consequences

### Positive

- Students get practical value from the portfolio (not just information)
- Increased engagement and return visits
- Demonstrates technical capability (interactive tools on static site)
- Uses existing TypeScript types and course data architecture
- All processing is client-side — no privacy concerns, no server costs

### Negative

- Adds ~5 new pages and a feature module (~500-800 LOC initially)
- Grade calculator depends on populating assessment data in all courses
- Seat plan generator may need `jsPDF` dependency (~200KB)
- Broader nav menu — need to ensure mobile UX remains clean

### Neutral

- Follows existing 4-layer architecture (no new patterns)
- Tools feature module is independent — can be removed without affecting other features
- Assessment data population is beneficial regardless (documents grading policy)
