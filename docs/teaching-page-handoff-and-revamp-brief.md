# Teaching Page — Handoff & Revamp Brief

> **⚠️ SUPERSEDED / DONE (2026-06-20). Historical record only — do NOT treat as current.**
> This brief described the teaching page **before** the revamp it requested, which has since shipped (`feb94e7` "swap the revamped index live; remove the superseded components"). The components it documents as "what exists today" were **deleted or renamed**: `CourseCard`/`course-card.tsx`, `TeachingRecordTable`/`teaching-record-table.tsx`, `TeachingHeroStats`, `MentorshipSection`, `TeachingCTA`, `getTeachingStats` (→ `getTeachingFigures`), `mentorship.ts` (removed; `METRICS.AVERAGE_RATING` removed). **Current code:** `src/features/teaching/components/teaching-index/` (index) + `course-page/` (the command-center detail template). Kept only as the record of the revamp's motivation.

_Last updated: 2026-06-17. Audience: (a) another LLM picking this up cold, and
(b) Claude Design, to revamp + simplify the teaching surface. Self-contained —
you should not need to read the whole repo to use it._

---

## Part 0 — How to use this doc

- **Part 1** = what exists today (factual handoff).
- **Part 2** = known issues found in a fresh code review (the "why revamp").
- **Part 3** = the revamp/simplify brief: goals, hard constraints, simplification
  options, open design questions, and the format the design should come back in
  so it maps cleanly onto this codebase.

Stack reality you cannot design around: **Next.js 16 App Router, static export
(`output: 'export'`, no server runtime), React 19, TypeScript 6 strict, Tailwind
4, 6 themes** via `[data-theme]` CSS variables. No client DB, no SSR, no runtime
API. Everything is typed TS data compiled at build time.

---

## Part 1 — What exists today (handoff)

### 1.1 Two distinct surfaces

| Surface                     | Route                                  | File(s)                                                                                                    | Layout                                                                          |
| --------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Teaching index**          | `/teaching`                            | `src/app/teaching/page.tsx`                                                                                | Standard shell: left profile sidebar + top nav + centered content (`max-w-6xl`) |
| **Course "Command Center"** | `/teaching/[institution]/[courseCode]` | `src/app/teaching/[institution]/[courseCode]/page.tsx` → `src/features/teaching/components/course-page/**` | **Full-width** "publication" page, profile sidebar hidden, top nav kept         |

Only **`tier: 'detailed'`** courses generate a Command Center page. Today that is
exactly **one** course: **CSE 211 (Algorithms), Summer 2026** at IUB
(`/teaching/iub/cse211sum26`). Every other course is record-only.

### 1.2 The `/teaching` index — current section stack (top → bottom)

From `src/app/teaching/page.tsx` (sections separated by `space-y-16`):

1. **Breadcrumbs** + visually-hidden `<h1>Teaching</h1>`.
2. **`TeachingHeroStats`** — 4 "glass" stat cards in a `grid-cols-2 md:grid-cols-4`:
   Students Mentored · Courses Taught · Average Rating (`/5.0`) · Years Teaching.
   Data from `getTeachingStats()` (`src/shared/lib/data/teaching-stats.ts`).
3. **Intro paragraph** — one centered sentence (`max-w-3xl`): role + institution +
   a line on what is taught.
4. **"Courses"** (`<h2>`) — featured grid (`md:grid-cols-2`) of
   `CourseCard variant="static" showDetails` for courses where
   `tier === 'detailed' && status === 'ongoing'` → **today: a single CSE 211 card**.
5. **"Teaching record"** (`<h2>`) — `TeachingRecordTable` with **all** courses,
   grouped by institution, newest-first; columns **Code · Title · Term · Level ·
   Role**. A compact `<table>`, no per-row links. Role is `—` on 10 of 11 rows
   (only CSE 211 has a role).
6. **`MentorshipSection`** — heading + a grid of student/supervision cards
   (data from `src/shared/lib/data/mentorship.ts`).
7. **`TeachingCTA`** — a soft gradient card ("Interested in Academic
   Collaboration?") linking to `/contact`.

Components live in `src/features/teaching/components/`:
`course-card.tsx`, `teaching-record-table.tsx`, `teaching-hero-stats.tsx`,
`teaching-cta.tsx`, `mentorship-section.tsx`, `styles.ts` (level-badge styles),
plus the `course-page/` subtree (Command Center).

### 1.3 The Command Center page (the course detail surface)

`src/features/teaching/components/course-page/` — a data-driven, full-width page
with its own scoped CSS (`course-page.css`, `.cp` namespace, `--cp-*` tokens
derived from the active theme's `--primary` via `color-mix`). Regions:
hero · "This Week" band · notice strip · sticky section-nav · overview ·
sections/roster table · syllabus (unit-grouped weeks) · assessment · assignments ·
resources · instructor rail · footer. Reads optional `CourseData` fields:
`units`, `assessmentSchemes`, `sectionsRoster`, `quickLinks`, `staff`,
`nextMilestone`, `announcements`, `termStartDate`, `pastOfferings`, `activeContest`,
`exams`, `resourceSections`, `consultation`, `rating`. Populated per-course in a
`command-center.ts` module (model: `src/shared/lib/data/courses/iub-cse211/`).

**This surface is intentionally distinct and is _not_ the subject of this revamp.**
It already shipped and has its own design contract (DESIGN.md §11). The revamp
target is the **`/teaching` index** and how it _gates into_ the Command Center.

### 1.4 Data model (tiered courses)

`src/shared/lib/data/courses/` — every course is a typed `CourseData` object
(`src/shared/types/index.ts`). Three tiers:

- **summary** — inline minimal entry.
- **standard** — one file (e.g. `bracu-cse420.ts`).
- **detailed** — a directory (e.g. `iub-cse211/`) that also carries a
  `command-center.ts`; **only this tier renders a page**, and it **must** set
  `template: 'command-center'` (the route `notFound()`s otherwise).

`courses/index.ts` exports `allCourses`, `coursesTaughtIUB`, `coursesTaughtBRACU`,
`getDetailedCourses()`, `institutionNames`. Course path is built by
`getCoursePath()` in `src/shared/lib/course-utils.ts`
(`/teaching/{institution}/{slug}`).

### 1.5 How a course page is reached today

- Navbar "Teaching" hover-dropdown → lists detailed courses (CSE 211) + "All teaching".
- ⌘K command palette → "Courses" group (detailed courses).
- Direct URL / sitemap.
- **NOT** from the `/teaching` page body itself — see Part 2, finding A.

### 1.6 Recent history (what changed and why)

1. **Command Center build** — CSE 211 detail page rebuilt as the full-width
   data-driven template (DESIGN.md §11). Only CSE 211 uses it.
2. **Teaching restructure** — replaced a tabbed, per-institution layout (every
   course as an equal card behind IUB/BRACU tabs + duplicate `/teaching/iub` and
   `/teaching/bracu` pages) with the current **"Courses" (active) + "Teaching
   record" (all)** split. Demoted CSE 420 `detailed → standard`. Removed the
   institution pages (now meta-refresh redirects to `/teaching`). Deleted the
   entire legacy `CoursePageLayout` system.
3. **Nav alignment** — navbar dropdown + ⌘K now list only courses that have a
   page; sitemap/redirects reconciled.
4. **Post-restructure cleanup** — pruned orphaned `CourseData` fields, dead
   components, fixed SEO (canonical, JSON-LD, sitemap), surfaced secondary nav.

Net effect: the page is **cleaner than before** but now has **one** featured
course and several leftover rough edges (Part 2).

### 1.7 Hard constraints (design must honor)

- **DESIGN.md is the contract.** Tokens only (`bg-background`, `text-foreground`,
  `text-primary`, `border-border`, …) — never hardcoded colors. 6 themes must all
  pass an automated contrast gate. Merge classes with `cn()`.
- **DESIGN.md §8 "Don't":** no `bg-indigo/purple/gray-*`, no gradient _text_, no
  heavy/stacked shadows, **no 3-column icon-card hero**, no `rounded-2xl` on cards,
  no new deps/animation libraries without asking.
- The index page stays on the **§1–§9 defaults** (8px cards, `font-semibold`
  headings, Inter). The bolder/mono/12px treatment is **scoped to `.cp`** course
  pages only (§11) and must not leak to the index.
- **Accessibility is gated** (axe, WCAG AA, keyboard, reduced-motion) across all 6
  themes and WebKit. Any scrollable region needs a focusable wrapper.
- Components <300 LOC; server components by default (`'use client'` only for
  hooks/events/browser APIs).
- Self-reported stats must be **consistent across pages** (single source of truth
  in `src/shared/lib/data/`).

---

## Part 2 — Known issues (fresh code-review findings)

These are the concrete reasons to revamp, ordered by severity. All are
file-verified, not assumptions.

**A. (Bug / highest priority) The page has no click-through to the course page.**
The featured `CourseCard` is rendered `variant="static"`, and its "View Course"
button lives in a `CardFooter` that **only renders for `variant="collapsible"`**
(`course-card.tsx:240`). The card is not wrapped in a `Link` either. The
`TeachingRecordTable` rows are also plain text (no links). So from the `/teaching`
page body, **a visitor cannot reach the CSE 211 Command Center** — the page's one
"active course" is a dead end. The card even shows an `ArrowRight` affordance
implying it's clickable. _This should be fixed regardless of the visual revamp._

**B. `CourseCard` is over-built for its one current use.** It's a `'use client'`
memoised component with two behavior variants (`collapsible`/`static`), a rich
`CourseDetails` sub-block (objectives / technologies / assessment % / student
feedback). On `/teaching` it's only used as `static` + `showDetails`, and for
CSE 211 most of that detail is absent in the data, so it renders just a
description + a couple of tech badges. The `collapsible` variant is now unused on
this page. A simpler, link-first card would do.

**C. Single featured card looks sparse.** "Courses" is a 2-column grid holding
exactly one card. Visually unbalanced; reads as "empty slot next to it".

**D. CSE 211 appears twice.** Once as the featured card, once as a row in the
record table — and (per A) neither instance links anywhere.

**E. Stats hero is generic + thin on provenance.** Four "glass" stat cards
(Students Mentored, Courses Taught, Average Rating 4.32/5, Years Teaching). This
is close to the "icon-card hero" pattern DESIGN.md §8 warns against.
`getTeachingStats()` also carries vestigial logic: a documented weighted-rating
formula that is never implemented and an enrollment-sum path that always returns 0
(every course has `enrollmentCount: 0`), so it silently falls back to constants in
`METRICS`. The numbers are real-ish but their derivation is theatre.

**F. Stylistic jump index → Command Center.** The index is calm/default; the
course page is bold/mono/full-width. The featured card is the bridge between them
but does nothing to signal the shift (and, per A, doesn't even link).

**G. Owner-deferred content gaps (not bugs, context for design):** the Role
column is `—` on 10/11 rows (owner will backfill); `enrollmentCount`/`rating` are
0/placeholder; only one active course exists right now (so "Courses" will be
1 card for the foreseeable term).

---

## Part 3 — Revamp & simplify brief (for Claude Design)

### 3.1 Goal

Redesign the **`/teaching` index** to be **simpler, calmer, and honest**, with a
clear visual + interaction **bridge into the Command Center** course page. Reduce
the number of stacked sections and the component surface area. Keep it credible
for an academic audience (recruiters, collaborators, grant committees).

### 3.2 Non-goals

- Do **not** redesign the Command Center course page (`.cp`) — it's settled (§11).
- Do **not** invent content (no fabricated stats, talks, or course detail).
- Do **not** introduce new dependencies, animation libraries, or non-token colors.
- Do **not** bring back per-institution tabs/pages (deliberately removed).

### 3.3 Principles to hold

- **Honest over impressive.** If a number's provenance is weak, make it smaller or
  cut it — don't dress it up.
- **One obvious path to the live course.** The active course must be the clear
  focal point and must link to its page.
- **Fewer sections.** Today there are 6 stacked blocks; aim to consolidate.
- **Scales to N courses.** Design must look right with 1 active course (today) and
  with 2–4 later — and with a long record table.
- **Tokens + §1–§9 only** on this surface; no `.cp` exceptions leaking in.

### 3.4 Concrete simplification opportunities (design may take or leave)

1. **Make the active course the hero.** Instead of "stats grid → intro → 1 lonely
   card", lead with a single, prominent, **clickable** "currently teaching" feature
   (CSE 211) that previews the Command Center and links into it. This fixes
   finding A and C and F at once.
2. **Demote or fold the stats.** Either drop the 4-card hero, or reduce to an
   inline one-line figure set ("11 courses · 6 years · IUB & BRACU") that doesn't
   read as a marketing dashboard. Tie to honest, single-sourced numbers.
3. **Collapse intro into the hero.** The standalone centered sentence can become
   the hero's supporting line.
4. **Keep "Teaching record" as the archive** — it's good. Consider linking the
   CSE 211 row (the one detailed course) to its page; leave the rest unlinked.
   Decide how to show the empty Role column gracefully until data arrives.
5. **Consider merging Mentorship + CTA** or tightening them — two large trailing
   blocks make the page long.
6. **Replace the heavy `CourseCard`** (on this page) with a simpler link-first
   "active course" component; retire the unused collapsible path.

### 3.5 Open design questions (please decide / propose)

1. What is the **hero** of `/teaching` — the active course, the stats, or a
   bio-style intro? (Recommendation: the active course.)
2. Keep the **4-stat grid**, reduce it to an inline figure line, or cut it?
3. Should the **active-course feature** visually echo the Command Center (a hint
   of the bolder/mono treatment) to signal the bridge, or stay fully on default
   index styling? (Note the §11 "don't leak `.cp`" rule — a _hint_ via tokens is
   fine; copying `.cp` is not.)
4. How should the page **degrade to "no active course"** (between terms)? And how
   should it **scale to 2–4 active courses** without becoming a card wall again?
5. How to present the **empty Role column** until the owner backfills it (drop it,
   keep dashes, fold into the title, or a "role TBA" affordance)?
6. Where do **Mentorship** and the **collaboration CTA** sit in the simplified
   flow — kept as sections, merged, or moved?

### 3.6 What to hand back (so it maps to code)

For each proposed section, please provide:

- A layout sketch / mock (desktop + mobile) and the **section order**.
- **Token usage only** (name the roles: `primary`, `muted-foreground`, `border`,
  `card`, …) — no hex. Flag anything that would need a new token.
- Component breakdown matching the existing structure
  (`src/features/teaching/components/*`), each <300 LOC, server-component-first.
- Explicit **interaction/affordance** notes (esp. the link into the course page)
  and the **empty/degraded states** (no active course; empty Role).
- Confirmation it holds in **light + dark** and respects **reduced-motion**.

### 3.7 Pointers

- Visual contract: `DESIGN.md` (esp. §1–§9 for this surface, §11 for what _not_ to
  copy from the course page).
- Current code: `src/app/teaching/page.tsx`,
  `src/features/teaching/components/*`.
- Data shape: `CourseData` in `src/shared/types/index.ts`; instances in
  `src/shared/lib/data/courses/`.
- Tokens: `src/styles/tokens.css` (6 themes); fonts: Inter + IBM Plex Mono.
- The prior design-portal handoff for the course page lived in
  `.dump/design_handoff_cse211_course_page/` (gitignored) — same workflow expected
  here.
