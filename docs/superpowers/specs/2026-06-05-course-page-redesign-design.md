# Design Spec — Course Page Redesign (v7)

> **⚠️ SUPERSEDED (2026-06-16).** Historical record only. The shipped CSE 211
> redesign uses the separate `src/features/teaching/components/course-page/`
> "Command Center" module (Inter + IBM Plex Mono, **no serif**; full-width) —
> see DESIGN.md §11. The serif/`--font-serif` and `course-subnav`/`course-week`
> proposals below were **not** built. CSE 420 was **not** migrated (still legacy
> `CoursePageLayout`). Future teaching IA: `docs/.../2026-06-16-teaching-page-restructure.md`.

> **Date**: 2026-06-05
> **Scope**: the detailed-course page (`/teaching/[institution]/[courseCode]`) shared layout — applies to **CSE 211** and **BRACU CSE 420**
> **Status**: Draft — awaiting review before implementation plan
> **Mockup**: v7 (theme-synced; `cse211-v7-light.jpeg` / `-dark.jpeg`)

## 1. Goal & principles

Replace the long collapsible-accordion course page with the v7 **"Course Hub"**: a dashboard header (act/status) + a navigable content zone (learn). **Behavior- and data-preserving** — same routes, same data sources, same external links; this is an IA + presentation change plus a few _additive, optional_ data fields. Theme-token-driven (all 6 themes + dark), WCAG AA (keep the axe/contrast E2E green), follows `DESIGN.md`.

## 2. Decisions (locked via Q&A 2026-06-05)

| #   | Decision       | Choice                                                                                  |
| --- | -------------- | --------------------------------------------------------------------------------------- |
| 1   | Typography     | Add a **serif** for course-page **headings only**                                       |
| 2   | Serif face     | **Source Serif 4** (next/font, `--font-serif`)                                          |
| 3   | Rollout        | **Shared `CoursePageLayout`** → both detailed courses                                   |
| 4   | Desktop nav    | **Responsive**: left rail (xl) · top sticky bar (md) · pills (mobile), scrollspy        |
| 5   | Current week   | **Computed** from term start date (client-side; always live)                            |
| 6   | Syllabus units | Optional **`unit?: string`** per weekly module; group consecutive weeks                 |
| 7   | Past offerings | Build **data-driven**, render only when prior-term data exists (hidden for CSE 211 now) |
| 8   | Build approach | **Reuse & restructure** existing teaching components; add only the new pieces           |

## 3. Information architecture (v7)

**Header zone (act/status):** ① Hero (light, primary-tinted; identity + status pills + "This week / Next / Progress" glance + Consultation card) → ② Quick Links band → ③ Active Contest banner (primary; only if `activeContest`) → ④ Exams (Midterm/Final cards, TBA chips; empty weekly routine hidden) → ⑤ Announcements (only if `notices`).
**Content zone (learn):** responsive scrollspy nav + ⑥ Overview → ⑦ Syllabus (unit-grouped table, current week highlighted) → ⑧ Resources (categorized) → ⑨ Assignments.
**Footer:** Past offerings archive (only if data).

## 4. Data-model changes (additive, optional, type-safe)

- `weeklyModules[].unit?: string` — optional unit label; consecutive same-unit weeks render under one header row. Courses without it render flat. (`src/shared/types`)
- Term **start date** for current-week math: reuse `cse211Term.publishedOn` as the fallback, add an explicit `startDate?` to the term/course where the academic start differs. Current week = `clamp(floor((today − start) / 7) + 1, 1, weeklyModules.length)`.
- `CourseData.pastOfferings?: { label: string; href: string }[]` — optional; archive renders only when present. (None for CSE 211 yet → hidden.)
- No changes to existing data values; all new fields optional so BRACU CSE 420 and others remain valid.

## 5. Components (reuse vs new)

**New:**

- `course-subnav.tsx` (client) — responsive scrollspy: left rail (xl) / sticky top pill bar (md) / inline pills (mobile); `aria-current` on active; smooth-scroll respecting `prefers-reduced-motion`.
- `course-quick-links.tsx` — the labeled button band, derived from the existing `links` data (single source; removes the old hero/Resources duplication).
- `course-week.ts` util — pure current-week computation (unit-tested).
- `past-offerings.tsx` — footer archive (renders only if `pastOfferings`).

**Restructured/adapted (keep internals where good):**

- `course-hero.tsx` — light primary-tinted hero + status pills + glance strip + Consultation card; serif title.
- `syllabus-table.tsx` — add optional unit-header rows (group by `unit`); keep current-week highlight via `--academic-highlight`.
- `course-page-layout.tsx` — recompose into the two zones above; render sections only when their data exists (drop the always-on accordion shell; hide empty Class Schedule).
- Reuse `overview-section`, `resources-section`, `notice-board`, `assignments-section`, `exam-schedule` (light styling pass to match v7; no logic change).

## 6. Typography

Add **Source Serif 4** via `next/font/google` in `layout.tsx`, expose `--font-serif` in `globals.css @theme` (`--font-serif: var(--font-source-serif), serif`), and apply `font-serif` to course-page headings only (hero title + section `h2`s). Update `DESIGN.md` §3 from "planned" to "available (course pages)".

## 7. Empty-state & theming discipline

- Hide: empty `classSchedule` (no "Class Schedule" block), absent contest/notices/assignments → those sections don't render.
- Show with chips: exam dates "To be announced" (`warning` token); assignment "Coming soon".
- All color via tokens (primary = action, `warning` amber = time-sensitive, `success` = active, `--academic-highlight` = current week). Verify in all 6 themes + dark.

## 8. Verification

- `npm run validate` (lint/format/504 tests/typecheck) + new unit tests for `course-week` util and unit-grouping.
- `npm run build` (both course routes generate) + `npm run deadcode`.
- E2E: the existing per-page axe + theme-contrast suites must stay green for `/teaching/iub/cse211sum26` and `/teaching/bracu/cse420`.
- Manual: browser check of both course pages in light + dark + one colored theme; mobile width (schedule → stacked cards).

## 9. Risks & mitigations

- **R1 broad component touch.** Mitigation: reuse/restructure (decision 8), behavior-preserving, incremental commits, full gate per commit.
- **R2 serif font weight/CLS.** Mitigation: `next/font` (self-hosted, `display:swap`, preloaded); scope to headings.
- **R3 scrollspy a11y/motion.** Mitigation: `aria-current`, `prefers-reduced-motion`, keyboard-navigable anchors; covered by axe E2E.
- **R4 current-week off-by-one / timezone.** Mitigation: pure util with unit tests (boundaries, pre-term clamps to 1, post-term clamps to N).

## 10. Out of scope

No change to: routes/slugs, the course data values, the apps, other pages, monitoring, or the tiered course system. Not building per-week detail pages. Serif stays course-pages-only (site-wide serif is a separate future decision).
