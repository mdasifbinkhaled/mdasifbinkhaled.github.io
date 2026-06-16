# Spec: Teaching page restructure — "Courses" + "Teaching record"

**Status:** Approved direction · **build deferred** until after the CSE 211 real-data polish.
**Decided:** 2026-06-16 (discussion).

## Context / problem

The Teaching page is bloated and confusing. Today it renders **every** course (11 across
IUB + BRACU) as an equal-weight card behind IUB/BRACU **tabs** (`TeachingTabsClient`), and
duplicates those lists on separate `/teaching/iub` and `/teaching/bracu` pages. A one-off
course from years ago gets the same prominence as one being actively taught.

The owner is a lecturer/contractual lecturer who has taught many courses — some current and
worth a rich page, most just part of the record. We want to **foreground the few active
courses** (which get full "Command Center" pages) and present **everything else as a compact
record**, so the page is cleaner and scales as more courses accumulate.

This is a **presentation** change — the tiered data model already encodes the distinction
(`tier: 'detailed'` = has a page; `summary`/`standard` = record-only).

## Decisions (locked)

1. **Featured "Courses" = currently-active courses only.** Active courses get a card + a
   dedicated CoursePage; everything else (incl. completed courses) drops to the record.
   Rule of thumb: **`tier: 'detailed'` ⇒ featured + has a page**, and the owner only marks a
   course `detailed` while it's active. Today that set = **CSE 211 only**.
2. **Teaching record = a compact table grouped by institution** (IUB / BRACU), newest-first:
   **Code · Title · Term · Level · Role**. No page per row.
3. **Add a per-course `role`** (e.g. `Instructor` / `Course Coordinator` / `Lab Instructor` /
   `Contractual Lecturer`).
4. **Remove the institution pages + tabs.** Delete `/teaching/iub` and `/teaching/bracu` and
   the IUB/BRACU tab switcher; one clean Teaching page covers it.
5. **Trim the philosophy block** — drop the 3-pillar icon-card grid (DESIGN.md §8 flags the
   3-col icon grid as the "#1 generic-AI tell"); keep a concise intro sentence + the stats band.

## Target structure (`/teaching`)

```
Teaching
├── h1 (sr-only) + short intro sentence
├── compact stats band                 (TeachingHeroStats — keep)
├── ▸ Courses           active, detailed courses → cards → CoursePage   (today: CSE 211)
├── ▸ Teaching record   ALL courses, compact table grouped by IUB / BRACU
│                        columns: Code · Title · Term · Level · Role     (no links/pages)
├── Mentorship          (MentorshipSection — keep, already data-gated)
└── TeachingCTA         (keep, or fold into intro — minor)
```

## Implementation plan

### Data (`src/shared/lib/data/courses/`, `src/shared/types`)

- Add optional `role?: CourseRole` to `CourseData` (new union: `'Instructor' | 'Course Coordinator'
| 'Lab Instructor' | 'Teaching Assistant' | 'Contractual Lecturer'` — confirm the set with owner).
- **Demote CSE 420** from `tier: 'detailed'` → `'standard'` (it's completed/2018) so the route
  stops generating its page; it now appears only in the record. Keep its data module (archived).
- Ensure every course has `semester` + `year` (for the Term column) and a `role`. **Content pass
  needed** — terms/roles for the older courses are owner-supplied. Flag any gaps; don't invent.
- `getTeachingStats()` stays (computes the stats band from all courses).

### Routes (`src/app/teaching/`)

- Delete `src/app/teaching/iub/` and `src/app/teaching/bracu/` (institution pages + their
  `error.tsx`). Add **redirects** `/teaching/iub`, `/teaching/bracu`, and `/teaching/bracu/cse420`
  → `/teaching` (mirror the existing `/experience` → `/about#…` redirect pattern: a small route
  file calling `redirect()`).
- `[institution]/[courseCode]/page.tsx` stays; `generateStaticParams` already filters to
  `detailed`, so only CSE 211 generates after the demotion. The `course.template ===
'command-center'` branch is unchanged.

### Components (`src/features/teaching/components/`)

- **New** `teaching-record-table.tsx` — compact table, grouped by institution, sorted
  newest-first; real `<table>` semantics (caption, `<th scope>`), token-only styling, reuses the
  `Badge` for Level/Role chips. Keep < 300 LOC.
- **Featured Courses**: render active `detailed` courses with the existing `CourseCard` (it
  already shows "View Course" only for `detailed`) — or a slimmer card if preferred.
- **Remove**: `teaching-tabs.client.tsx`, `institution-courses-page.tsx`, and the
  `teachingPillars` data + its usage in the index. Drop now-unused exports from the barrel
  (knip is strict — verify no orphans). Keep `course-card-compact` only if still referenced.
- Rewrite `src/app/teaching/page.tsx` to the target structure above.

### Tests / a11y

- Update `tests/e2e/fixtures/routes.ts` (`A11Y_ROUTES`, smoke routes): drop `/teaching/iub`,
  `/teaching/bracu`, `/teaching/bracu/cse420`; add redirect smoke (they 3xx → `/teaching`),
  matching the existing `/experience` redirect test.
- `/teaching` must keep one `h1`, pass the 6-theme axe + contrast gates, and the record table
  must be a proper table (the project's WebKit `scrollable-region-focusable` rule applies if it
  ever scrolls — prefer reflow over horizontal scroll, or add `tabIndex`/`role`/`aria-label`).
- Add a small unit test if any record-sorting/grouping helper is extracted.

## Out of scope

- CSE 211 visual polish (separate effort, gated on real data).
- Migrating any other course to the Command Center template (only active courses get pages; do
  it per course when it becomes active).
- Whole-site harmonization.

## Open content questions for the owner (at build time)

- Confirm the `CourseRole` value set.
- Which courses are **currently active** (→ stay/become `detailed` with a page)? Today only
  CSE 211 is `ongoing`.
- Supply missing `semester`/`year`/`role` for older courses so the record reads accurately.

## Verification (at build)

`npm run validate:full` + cross-browser a11y (firefox + mobile-safari, all 6 themes) green;
knip clean (removed components leave no orphans); redirects smoke-tested; `/teaching` visually
reviewed in all 6 themes via Playwright before shipping.
