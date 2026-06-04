# Portfolio De-bloat + Agentic Environment — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace 3,000 lines of solo-project process ceremony with a lean, best-practice agentic environment, then refactor the four oversized "app" god-files into focused modules — without changing any runtime behavior.

**Architecture:** Build the replacement (CLAUDE.md + `.claude/` rules/skills/hooks + `llms.txt`) first, _then_ delete the now-redundant `.cockpit/`/`.github/` docs (migrate-then-delete). Then verify the two suspected live bugs are non-issues (they are — see spec §2.5) and add one cheap regression guard. Finally, apply the repo's own `seat-planner` module pattern (hook + utils + sub-components) to `data-importer.tsx`, `seat-plan-results.tsx`, `study-timer.tsx`, and `course-planner.tsx`, behavior-preserving and test-guarded.

**Tech Stack:** Next.js 16 (App Router, static export), React 19, TypeScript 6 (strict), Tailwind 4, Vitest, Playwright, Husky, knip.

**Spec:** `docs/superpowers/specs/2026-06-04-portfolio-purge-and-agentic-env-design.md`

**Global conventions for every task:**

- Work on branch `chore/debloat-agentic-env` (created in Task 0). One commit per task; Conventional Commits (`type(scope): desc`).
- After any code/config change, the relevant gate must pass before the task's commit: `npm run typecheck`, `npm run lint:check`, `npm run test:run` (scope to touched files where possible), and for refactor tasks `npm run build`.
- **Behavior-preserving means:** no change to public exports, routes, rendered DOM, styling, or data. Extraction tasks are verbatim moves + import rewiring only.
- Do **not** add dependencies, abstraction layers, or runtime validation. Follow existing patterns.

---

## Phase 0 — Setup

### Task 0: Create branch and commit the existing spec + memory groundwork

**Files:**

- Modify (git): branch creation
- Already on disk (uncommitted): `docs/superpowers/specs/2026-06-04-portfolio-purge-and-agentic-env-design.md`

- [ ] **Step 1: Create and switch to the feature branch**

```bash
git checkout -b chore/debloat-agentic-env
```

- [ ] **Step 2: Stage and commit the spec**

```bash
git add "docs/superpowers/specs/2026-06-04-portfolio-purge-and-agentic-env-design.md"
git commit -m "docs: add de-bloat + agentic-env design spec"
```

Expected: clean commit; `git status` shows branch `chore/debloat-agentic-env`.

---

## Phase 1 — Agentic environment (build the replacement first)

### Task 1: Author `CLAUDE.md` (the lean project-memory file, < 150 lines)

**Files:**

- Create: `CLAUDE.md`

- [ ] **Step 1: Create `CLAUDE.md` with this exact content**

```markdown
# CLAUDE.md

Academic portfolio for Md Asif Bin Khaled. Next.js 16 (App Router, **static export** — `output: 'export'`, no server runtime), React 19, TypeScript 6 (strict), Tailwind 4.

## Commands

- `npm run dev` — local dev server
- `npm run validate` — lint + format:check + test:run + typecheck (run before committing)
- `npm run validate:full` — validate + build + Chromium E2E (run before pushing)
- `npm run build` — static export to `out/`
- `npm run test:run` — unit tests once · `npm run test:e2e` — Playwright (needs build)
- `npm run typecheck` · `npm run lint` (autofix) · `npm run deadcode` (knip)

## Architecture

- `src/app/**` — routes/layouts/metadata only (thin). Every route has `error.tsx`.
- `src/features/<name>/**` — feature modules (`about`, `apps`, `home`, `publications`, `research`, `teaching`); each has `components/`, optional `hooks/`/`utils/`, and an `index.ts` barrel.
- `src/shared/**` — `components/` (ui, layout, navigation, common), `config/` (SSoT), `hooks/`, `lib/` (incl. `data/`), `providers/`, `types/`.
- Content data lives in `src/shared/lib/data/` as typed TS objects (`satisfies`). Blog posts are MDX in `content/`.
- Courses use a tiered system in `lib/data/courses/`: summary (inline) → standard (file) → detailed (directory). Only `tier: 'detailed'` courses generate `/teaching/[institution]/[courseCode]` pages.

## Conventions (only what differs from defaults)

- **Named exports only** (except Next.js `page`/`layout`/etc.).
- **Server Components by default**; add `'use client'` ONLY for hooks/events/browser APIs.
- **Theme tokens only** — use `bg-background`, `text-foreground`, etc. NEVER hardcoded colors (`bg-gray-50`). Merge classes with `cn()` (`@/shared/lib/utils`).
- Files `kebab-case`; components `PascalCase`; hooks `useX`; constants `SCREAMING_SNAKE_CASE`.
- No `any` (ESLint-enforced); `noUncheckedIndexedAccess` is on.
- Conventional Commits enforced by the `commit-msg` hook.
- `target="_blank"` links must include `rel="noopener noreferrer"`.

## App modules (`src/features/apps/`)

Eight browser-local student tools. **Follow the `seat-planner/` structure** when editing apps: state in a `use-<name>.ts` hook, pure logic in `<name>.utils.ts`, and focused sub-components in their own files. Keep components under ~300 LOC.

## Out of scope / do NOT over-engineer

- This is a **solo** site. Do not add OSS-collaboration ceremony, governance docs, findings trackers, or scheduled audits.
- Do not add dependencies, abstraction layers, or runtime schema validation without asking.
- Prefer **small, behavior-preserving diffs**. Reuse existing patterns; don't invent new ones.
- When asked to "fix" something, first verify it's actually broken (check `out/` build output), then fix the minimum.
```

- [ ] **Step 2: Verify line count is under budget**

Run: `wc -l CLAUDE.md`
Expected: < 150.

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add lean CLAUDE.md agent memory"
```

### Task 2: Author path-scoped rules in `.claude/rules/`

**Files:**

- Create: `.claude/rules/styling.md`
- Create: `.claude/rules/apps.md`
- Create: `.claude/rules/content-data.md`

- [ ] **Step 1: Create `.claude/rules/styling.md`**

```markdown
---
description: Styling/theming rules for components and styles
globs: ['src/**/*.tsx', 'src/styles/**']
---

- Use theme tokens ONLY (`bg-background`, `text-foreground`, `text-primary`, `border-border`, …). Never hardcode colors (`bg-gray-50`, `text-zinc-700`, hex).
- Merge/condition classes with `cn()` from `@/shared/lib/utils`.
- 6 themes are defined via CSS custom properties; new colors must be tokens, not literals.
- Dark mode is `[data-theme="dark"]` driven — don't add `dark:` ad-hoc unless matching existing usage.
```

- [ ] **Step 2: Create `.claude/rules/apps.md`**

```markdown
---
description: Structure rules for the student-app feature modules
globs: ['src/features/apps/**']
---

- Follow the `seat-planner/` pattern: `use-<name>.ts` (state/effects) + `<name>.utils.ts` (pure logic) + focused sub-components, each in its own file.
- Keep any single component file under ~300 LOC. If it grows past that, extract a sub-component or a hook.
- These apps are browser-local (no backend). Heavy work (PDF/CSV/XLSX) uses the already-installed libs (`jspdf`, `pdfjs-dist`, `papaparse`, `read-excel-file`, `html2canvas`) — do not add new ones.
- Preserve public exports in each app's `index.ts` barrel when refactoring.
```

- [ ] **Step 3: Create `.claude/rules/content-data.md`**

```markdown
---
description: How to add/edit portfolio content data
globs: ['src/shared/lib/data/**', 'content/**']
---

- All domain data is typed TS in `src/shared/lib/data/` using `satisfies` against `@/shared/types`.
- Publications: append to `publications.ts` (`PublicationItem`). Homepage shows the first 3 that are not `In Progress`/`Thesis`.
- Courses: tiered. summary=inline, standard=one file, detailed=directory (see `iub-cse211/`). Register new courses in `courses/index.ts` and the right institution array. Only `tier:'detailed'` generates a course page.
- Blog: MDX file in `content/` with frontmatter (title, date, …).
```

- [ ] **Step 4: Commit**

```bash
git add .claude/rules
git commit -m "chore: add path-scoped Claude rules"
```

### Task 3: Author a project skill — `add-publication`

**Files:**

- Create: `.claude/skills/add-publication/SKILL.md`

- [ ] **Step 1: Create `.claude/skills/add-publication/SKILL.md`**

```markdown
---
name: add-publication
description: Use when adding a new publication entry to the portfolio. Appends a typed PublicationItem to the data file in the correct shape.
---

# Add a publication

1. Open `src/shared/lib/data/publications.ts`.
2. Append a new object to `rawPublications` matching the `PublicationItem` type:
   - Required: `id` (kebab, e.g. `pub-venue-year`), `title`, `authors` (string[]), `venue`, `year` (number), `type` (`'Conference' | 'Journal' | 'Workshop' | 'Preprint' | 'In Progress' | 'Book Chapter' | 'Thesis'`).
   - Optional: `abstract`, `keywords` (string[]), links.
3. Keep newest first if the file is ordered by recency.
4. Run `npm run typecheck && npm run test:run` to confirm the shape is valid.
5. Note: `type: 'In Progress'` and `'Thesis'` are excluded from the homepage "Recent Publications" preview.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills
git commit -m "chore: add add-publication project skill"
```

### Task 4: Author a project skill — `add-course`

**Files:**

- Create: `.claude/skills/add-course/SKILL.md`

- [ ] **Step 1: Create `.claude/skills/add-course/SKILL.md`**

```markdown
---
name: add-course
description: Use when adding a new taught course to the teaching portfolio. Scaffolds a course in the tiered course data system and registers it.
---

# Add a course

1. Decide the tier:
   - **summary** — minimal info; add inline where summaries live.
   - **standard** — one file: `src/shared/lib/data/courses/<institution>-<code>.ts` exporting a `CourseData` (use an existing file like `iub-cse201.ts` as a template).
   - **detailed** — a directory `courses/<institution>-<code>/` with `index.ts`, `term.ts`, `schedule.ts` (model on `iub-cse211/`). Only `tier:'detailed'` generates a `/teaching/[institution]/[courseCode]` page.
2. Register it in `src/shared/lib/data/courses/index.ts`: add the import, the re-export, and push it into `coursesTaughtIUB` or `coursesTaughtBRACU`.
3. For detailed courses, the route slug comes from the term `slug` (e.g. `cse211sum26`). Make sure any link to the course uses that exact slug.
4. Run `npm run build` and confirm `out/teaching/<institution>/<slug>/` is generated, then `npm run test:run`.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills
git commit -m "chore: add add-course project skill"
```

### Task 5: Add a deterministic "done-gate" hook + `llms.txt`

**Files:**

- Create: `.claude/settings.json`
- Create: `public/llms.txt`

- [ ] **Step 1: Create `.claude/settings.json` with a Stop hook that runs the type+lint gate**

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "npm run typecheck && npm run lint:check"
          }
        ]
      }
    ]
  }
}
```

Rationale: the gate runs once when the agent finishes (not per-edit), so "looks done" is backed by a real typecheck+lint pass without slowing each edit (research: deterministic hooks for must-happen steps; keep per-edit hooks fast).

- [ ] **Step 2: Create `public/llms.txt`**

```text
# Md Asif Bin Khaled — Academic Portfolio

> Senior Lecturer & Researcher (CS). Research in Explainable AI (XAI) and Multimodal AI for healthcare and environment.

## Pages
- /: Home (bio, news, research interests, recent publications, experience)
- /about: About / bio
- /research: Research areas, projects, grants
- /publications: Full publication list
- /teaching: Courses taught (IUB, BRACU)
- /experience: Professional experience timeline
- /cv: CV (PDF)
- /blog: Articles (MDX)
- /talks: Talks & presentations
- /apps: Browser-local academic utilities (grade/GPA calculators, seat & course planners, timers)

## Notes
- Static site (Next.js export). Content data lives in src/shared/lib/data/.
```

- [ ] **Step 3: Verify the build still emits `llms.txt` and nothing broke**

Run: `npm run build`
Expected: build succeeds; `out/llms.txt` exists (`ls out/llms.txt`).

- [ ] **Step 4: Commit**

```bash
git add .claude/settings.json public/llms.txt
git commit -m "chore: add Claude done-gate hook and llms.txt"
```

---

## Phase 2 — Purge process ceremony (migrate-then-delete)

### Task 6: Preserve ADRs and monitoring notes under `docs/`

**Files:**

- Move: `.cockpit/adr/` → `docs/adr/`
- Move: `.cockpit/uptime-robot.md` → `docs/uptime-robot.md`

- [ ] **Step 1: Move the ADRs and uptime note (preserve git history)**

```bash
mkdir -p docs/adr
git mv .cockpit/adr/ADR-005-student-tools.md docs/adr/ADR-005-student-tools.md
git mv .cockpit/adr/ADR-006-tests-tsconfig-strictness.md docs/adr/ADR-006-tests-tsconfig-strictness.md
git mv .cockpit/adr/ADR-007-apps-io-redesign.md docs/adr/ADR-007-apps-io-redesign.md
git mv .cockpit/adr/SPIKE-pdf-lib.md docs/adr/SPIKE-pdf-lib.md
git mv .cockpit/adr/TEMPLATE.md docs/adr/TEMPLATE.md
git mv .cockpit/uptime-robot.md docs/uptime-robot.md
```

- [ ] **Step 2: Commit**

```bash
git commit -m "docs: relocate ADRs and uptime note to docs/"
```

### Task 7: Delete the `.cockpit/` governance/process documents

**Files:**

- Delete: `.cockpit/INDEX.md`, `PMD.md`, `ISSUES.md`, `HISTORY.md`, `ROADMAP.md`, `STRUCTURE.md`, `RELEASES.md`, `PACKAGING.md`, `GOVERNANCE.md`

> Their useful content (conventions, architecture, commands) was migrated into `CLAUDE.md`/`.claude/rules/` in Phase 1.

- [ ] **Step 1: Confirm nothing in the codebase imports/links these (other than README)**

Run: `grep -rIl "\.cockpit/" --exclude-dir=node_modules --exclude-dir=.git . | grep -v "docs/superpowers"`
Expected: only `README.md` (handled in Task 9) — note any others before deleting.

- [ ] **Step 2: Delete the ceremony docs**

```bash
git rm .cockpit/INDEX.md .cockpit/PMD.md .cockpit/ISSUES.md .cockpit/HISTORY.md .cockpit/ROADMAP.md .cockpit/STRUCTURE.md .cockpit/RELEASES.md .cockpit/PACKAGING.md .cockpit/GOVERNANCE.md
```

- [ ] **Step 3: Confirm `.cockpit/` is now empty and remove the dir if so**

Run: `ls -A .cockpit 2>/dev/null || echo EMPTY`
Expected: `EMPTY` (all ADRs/uptime moved out). If empty, `rmdir .cockpit` (git tracks no empty dirs, so nothing to commit for the dir itself).

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove .cockpit governance ceremony (migrated to CLAUDE.md)"
```

### Task 8: Delete `.github/` OSS-collaboration ceremony

**Files:**

- Delete: `.github/CODE_OF_CONDUCT.md`, `.github/CONTRIBUTING.md`, `.github/CODEOWNERS`, `.github/pull_request_template.md`, `.github/ISSUE_TEMPLATE/feature_request.md`, `.github/ISSUE_TEMPLATE/bug_report.md`
- Keep: `.github/SECURITY.md`, `.github/dependabot.yml`, all `.github/workflows/*`, `.github/lighthouserc.js`

- [ ] **Step 1: Delete the solo-irrelevant OSS docs**

```bash
git rm .github/CODE_OF_CONDUCT.md .github/CONTRIBUTING.md .github/CODEOWNERS .github/pull_request_template.md
git rm -r .github/ISSUE_TEMPLATE
```

- [ ] **Step 2: Verify no workflow references the removed files**

Run: `grep -rIl "CODEOWNERS\|CONTRIBUTING\|CODE_OF_CONDUCT\|ISSUE_TEMPLATE\|pull_request_template" .github`
Expected: no output.

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove OSS-collaboration ceremony for solo repo"
```

### Task 9: Trim README of ceremony pointers

**Files:**

- Modify: `README.md`

- [ ] **Step 1: Update README so it no longer points to deleted docs**

Replace the "🤝 Contributing" section's reference to `.cockpit/PMD.md` and `.github/CONTRIBUTING.md`, and the "📞 Support → Documentation: `.cockpit/PMD.md`" line, with a pointer to `CLAUDE.md`. Remove the badges/sections that reference removed workflows only if those workflows were removed (none were — keep all badges). Concretely:

- In "## 🤝 Contributing": replace the numbered list with a short note: "This is a personal portfolio. Conventions live in `CLAUDE.md`. Run `npm run validate` before pushing."
- In "## 📞 Support": change "Documentation: `.cockpit/PMD.md`" → "Conventions: `CLAUDE.md`".
- In "## 📁 Project Structure": change the `.cockpit/` line to reference `docs/` (ADRs) instead.

- [ ] **Step 2: Verify no dangling references remain**

Run: `grep -n "\.cockpit" README.md`
Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: repoint README from .cockpit to CLAUDE.md/docs"
```

---

## Phase 3 — Verify the suspected live bugs + add one regression guard

> Per spec §2.5, B1 (404) is a stale deploy that self-heals on the next push to `main`, and B2 (empty publications) is a screenshot artifact — neither is a code defect. This phase confirms that and adds one cheap guard so a future data change can't silently empty the homepage publications preview.

### Task 10: Add a regression test for the homepage publications preview

**Files:**

- Create: `tests/unit/features/home/publications-preview.test.ts` (match the repo's existing test directory layout; if unit tests live elsewhere, place it beside sibling home tests)

- [ ] **Step 1: Locate where unit tests live and how data is imported**

Run: `find tests -name "*.test.ts*" | head; grep -rn "samplePublications" src/shared/lib/data/publications.ts | head`
Expected: confirms the test root and that `samplePublications` is exported.

- [ ] **Step 2: Write the failing test (asserts the homepage filter yields ≥1 publication)**

```ts
import { describe, it, expect } from 'vitest';
import { samplePublications } from '@/shared/lib/data/publications';

describe('homepage publications preview data', () => {
  it('has at least one non-(In Progress/Thesis) publication to show', () => {
    const shown = samplePublications.filter(
      (p) => p.type !== 'In Progress' && p.type !== 'Thesis'
    );
    expect(shown.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 3: Run it**

Run: `npm run test:run -- publications-preview`
Expected: PASS (current data has 6 conference pubs). If it fails, the homepage really would be empty — investigate the data.

- [ ] **Step 4: Commit**

```bash
git add tests/unit/features/home/publications-preview.test.ts
git commit -m "test: guard homepage publications preview against empty data"
```

### Task 11: Confirm deploy auto-fixes B1

**Files:** none (verification only)

- [ ] **Step 1: Confirm the deploy workflow triggers on push to `main`**

Run: `grep -n "on:\|push:\|branches" .github/workflows/nextjs.yml`
Expected: triggers on push to `main`.

- [ ] **Step 2: Confirm the built homepage links to the valid course slug**

Run: `npm run build && grep -o "teaching/iub/cse211[a-z0-9]*" out/index.html && ls -d out/teaching/iub/cse211sum26`
Expected: link is `cse211sum26` and the directory exists → B1 resolves once this branch merges and deploys. No code change needed.

---

## Phase 4 — Refactor the four god-files (behavior-preserving)

**Shared extraction procedure (apply per file; verify after EACH extraction):**

1. **Safety net:** run the file's existing tests (`npm run test:run -- <name>`). If there are none for the component, first add a render smoke test (mount the component, assert a stable visible string) and commit it before refactoring.
2. **Extract pure helpers** (named below) verbatim into `<name>.utils.ts`; export them; import them back into the original. Run typecheck + tests.
3. **Extract state/effects** into a `use-<name>.ts` hook (move `useState`/`useEffect`/derivations + handlers; return the values/handlers the JSX uses). Import the hook into the component. Run typecheck + tests.
4. **Extract sub-views** (named below) verbatim into their own component files; import them back. Run typecheck + tests + `npm run build`.
5. Confirm the original component file is now < ~300 LOC and its public export (and any barrel) is unchanged. Commit.

> These are mechanical moves — cut a declaration, paste into the new file, wire imports/exports, replace the original site with the import. No logic changes. Do them with the file open in context; verify the rendered output is identical (the existing tests + build are the guard).

### Task 12: Refactor `study-timer.tsx` (724 LOC) — do this one first (simplest)

**Files:**

- Modify: `src/features/apps/components/study-timer/study-timer.tsx`
- Create: `src/features/apps/components/study-timer/study-timer.utils.ts`
- Create: `src/features/apps/components/study-timer/use-study-timer.ts`
- Create sub-components as needed (e.g. `study-timer-settings.tsx`, `study-timer-heatmap.tsx`, `session-log.tsx`)
- Test: `src/features/apps/components/study-timer/study-timer.utils.test.ts`

- [ ] **Step 1:** Run existing tests: `npm run test:run -- study-timer`. Record pass/fail.
- [ ] **Step 2:** Extract pure helpers `getSessionLabel`, `getSessionDuration`, `formatTime`, `getHeatmapToneClass` and the types `SessionType`, `TimerSettings`, `SessionLog` into `study-timer.utils.ts`; import back. Run `npm run typecheck`.
- [ ] **Step 3:** Add `study-timer.utils.test.ts` covering `formatTime` and `getSessionDuration` (pure, easy to test):

```ts
import { describe, it, expect } from 'vitest';
import { formatTime } from './study-timer.utils';

describe('formatTime', () => {
  it('formats seconds as mm:ss', () => {
    expect(formatTime(0)).toBe('00:00');
    expect(formatTime(65)).toBe('01:05');
    expect(formatTime(3599)).toBe('59:59');
  });
});
```

Run: `npm run test:run -- study-timer.utils`. Expected: PASS (adjust the expected strings to the actual `formatTime` output if its format differs — confirm by reading the function).

- [ ] **Step 4:** Extract the timer state/effects into `use-study-timer.ts`; import into `StudyTimer`. Run `npm run typecheck && npm run test:run -- study-timer`.
- [ ] **Step 5:** Extract the settings panel, heatmap, and session-log JSX regions into their own component files; import back. Run `npm run typecheck && npm run test:run -- study-timer && npm run build`.
- [ ] **Step 6:** Confirm `study-timer.tsx` < 300 LOC (`wc -l`). Commit:

```bash
git add src/features/apps/components/study-timer
git commit -m "refactor(apps): split study-timer into hook + utils + subcomponents"
```

### Task 13: Refactor `course-planner.tsx` (540 LOC)

**Files:**

- Modify: `src/features/apps/components/course-planner/course-planner.tsx`
- Create: `src/features/apps/components/course-planner/use-course-planner.ts`
- Create sub-components (e.g. `add-course-form.tsx`, `course-plan-table.tsx`, `prerequisite-view.tsx`)
- Note: pure helpers already live in `course-plan-utils.ts` — reuse it; move any remaining inline pure logic there.

- [ ] **Step 1:** Run `npm run test:run -- course-planner`. Record result; if no component test exists, add a render smoke test asserting a stable heading, commit it.
- [ ] **Step 2:** Move any remaining inline pure logic into the existing `course-plan-utils.ts`; import back. `npm run typecheck`.
- [ ] **Step 3:** Extract state/handlers into `use-course-planner.ts`; import into `CoursePlanner`. `npm run typecheck && npm run test:run -- course-planner`.
- [ ] **Step 4:** Extract the add-form, plan table, and prerequisite/topological view JSX into their own components; import back. `npm run typecheck && npm run test:run -- course-planner && npm run build`.
- [ ] **Step 5:** Confirm `course-planner.tsx` < 300 LOC. Commit:

```bash
git add src/features/apps/components/course-planner
git commit -m "refactor(apps): split course-planner into hook + subcomponents"
```

### Task 14: Refactor `seat-plan-results.tsx` (949 LOC)

**Files:**

- Modify: `src/features/apps/components/seat-planner/seat-plan-results.tsx`
- Create one file per currently-inline sub-component: `seat-plan-png-document.tsx` (`SeatPlanPngDocument` + `PngSummaryStat`), `room-utilisation-panel.tsx` (`RoomUtilisationPanel`), `section-overview-card.tsx` (`SectionOverviewCard`), `room-sheet.tsx` (`RoomSheet`), `result-actions.tsx` (`ResultActions`)
- Create: `seat-plan-results.utils.ts` for the `useMemo` derivation logic if it is pure

- [ ] **Step 1:** Run `npm run test:run -- seat-plan`. Record result.
- [ ] **Step 2:** Move each named sub-component verbatim into its own file (keep props/types); export named; import back into `seat-plan-results.tsx`. After EACH move: `npm run typecheck`.
- [ ] **Step 3:** If the `useMemo` derivations (totalCapacity, sectionSummary, printablePages, masterColumns) are pure functions of props, extract their bodies into `seat-plan-results.utils.ts` and call them inside the `useMemo`s. `npm run typecheck && npm run test:run -- seat-plan`.
- [ ] **Step 4:** `npm run build`. Confirm `seat-plan-results.tsx` < 300 LOC.
- [ ] **Step 5:** Commit:

```bash
git add src/features/apps/components/seat-planner
git commit -m "refactor(apps): split seat-plan-results into focused component files"
```

### Task 15: Refactor `data-importer.tsx` (1,199 LOC) — do this one last (most complex, shared component)

**Files:**

- Modify: `src/shared/components/common/data-importer.tsx`
- Create: `src/shared/components/common/data-importer.utils.ts`
- Create: `src/shared/components/common/use-data-importer.ts`
- Create sub-components: e.g. `data-importer-paste-panel.tsx`, `data-importer-upload-panel.tsx`, `data-importer-column-mapping.tsx`, `data-importer-preview.tsx`
- Test: `src/shared/components/common/data-importer.utils.test.ts`

> This is a generic component consumed by multiple apps (GPA/Course/Exam imports). Public export `DataImporter` and `DataImporterProps` MUST remain unchanged. Verify each consuming app still builds.

- [ ] **Step 1:** Find consumers and run their tests: `grep -rln "DataImporter" src --include=*.tsx` then `npm run test:run -- import` (and any app-import tests). Record result.
- [ ] **Step 2:** Extract the pure helpers `createDraftId`, `getParsedFiles`, `buildInitialPerFileValues`, `buildInitialFileDefaults`, `buildInitialAdditionalFileDefaults` and the internal `ExtraColumnDraft` type into `data-importer.utils.ts`; export; import back. Keep `DataImporterProps` exported from the original file (it's the public API). `npm run typecheck`.
- [ ] **Step 3:** Add `data-importer.utils.test.ts` covering `getParsedFiles` and `buildInitialFileDefaults` with representative inputs (read the functions to construct valid inputs). Run `npm run test:run -- data-importer.utils`.
- [ ] **Step 4:** Extract the component state/effects into `use-data-importer.ts`; import into `DataImporter`. `npm run typecheck && npm run test:run -- import`.
- [ ] **Step 5:** Extract the paste panel, upload panel, column-mapping panel, and preview-table JSX regions into their own component files; import back. After each: `npm run typecheck`.
- [ ] **Step 6:** `npm run build` (verifies every consuming app still compiles + exports unchanged). Confirm `data-importer.tsx` < 300 LOC.
- [ ] **Step 7:** Commit:

```bash
git add src/shared/components/common
git commit -m "refactor: split data-importer into hook + utils + panel subcomponents"
```

---

## Phase 5 — Final verification & finish

### Task 16: Full validation and dead-code sweep

- [ ] **Step 1:** Run the full gate:

Run: `npm run validate:full`
Expected: lint + format + tests + typecheck + build + Chromium E2E all PASS.

- [ ] **Step 2:** Dead-code check (refactor may have left orphan exports):

Run: `npm run deadcode`
Expected: no new unused files/exports. Remove any the refactor orphaned, then re-run.

- [ ] **Step 3:** Confirm no file regressed past the size budget:

Run: `git ls-files 'src/**/*.tsx' | xargs wc -l | sort -rn | head -10`
Expected: no non-data component over ~300 LOC except acceptable cases; `iub-cse.ts` (data) is exempt.

### Task 17: Open the PR (only when the user asks)

- [ ] **Step 1:** Push and open a PR summarizing: removed ~3,000 lines of ceremony, added lean agentic env, refactored 4 god-files (behavior-preserving), verified B1/B2 were non-bugs. Reference the spec. **Do not push without explicit user confirmation.**

---

## Self-review notes

- **Spec coverage:** WS-A → Tasks 1–5; WS-B → Tasks 6–9; WS-C → Tasks 10–11 (corrected to verification, per evidence); WS-D → Tasks 12–15; verification → Tasks 16–17. All spec §4 items mapped.
- **No-placeholder caveat (refactor):** Phase 4 sub-view boundaries are finalized against the live file at execution time because the exact JSX isn't reproduced here; each step still has a concrete action + verification gate, and all _known_ symbols (helpers, sub-components, types) are named explicitly. This is the standard, safe way to do a behavior-preserving split and is not a substitute for unspecified logic.
- **Type consistency:** new files use names referenced consistently (`use-<name>.ts`, `<name>.utils.ts`); public exports `DataImporter`/`DataImporterProps` preserved.
