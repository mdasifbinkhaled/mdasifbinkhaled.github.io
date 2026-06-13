# Design Spec — Portfolio De-bloat + Agentic Environment

> **Date**: 2026-06-04
> **Author**: Md Asif Bin Khaled (with Claude)
> **Repo**: `mdasifbinkhaled.github.io` — academic portfolio (Next.js 16 / React 19 / TS 6 / Tailwind 4)
> **Status**: ✅ Implemented & shipped to `main` (2026-06-05). Retained as historical record.

---

## 1. Problem statement

The repo is a **solo academic portfolio** that has accreted the process, tooling, and code mass of a multi-team SaaS product. This spec covers (a) building a lean, evidence-based **agentic development environment** (currently absent), (b) a **moderate purge** of process-document overhead, (c) fixing two **live bugs**, and (d) a **behavior-preserving refactor** of the oversized "student app" files.

The two headline goals converge: a bloated context (3,000 lines of `.cockpit/` docs) is the human equivalent of a bloated `CLAUDE.md`, and research shows bloated agent context _reduces_ an agent's instruction adherence. **Purging the ceremony is a prerequisite for the agentic environment to work well.**

---

## 2. Forensic findings (evidence)

Measured on 2026-06-04 against the tracked working tree.

### 2.1 Disproportionate scale

- **27,547 LOC across 273 source files**, 170 `.tsx`, **78 `'use client'` components**, 23 barrel files — for a one-person CV site.
- Semantic-versioned to **v1.5.3** with changelogs and "forensic audit closeout" commits. The audit _process itself_ has become recurring make-work.

### 2.2 Biggest mass: the student apps (~36% of code)

- `src/features/apps/**` = **9,734 LOC** (route layer only 165 LOC). Eight tools: Grade Calc, GPA Calc, Seat Planner, Course Planner, Exam Countdown, Office Hours, Study Timer, PDF Study Aid.
- Drives nearly all heavy deps: `jspdf`, `jspdf-autotable`, `pdfjs-dist`, `read-excel-file`, `papaparse`, `html2canvas`.
- **God-files** (the refactor targets):
  | File | LOC | Shape |
  |---|---|---|
  | `features/apps/components/course-planner/presets/iub-cse.ts` | 1,208 | data preset (acceptable as data) |
  | `shared/components/common/data-importer.tsx` | 1,199 | ~1,000-line generic component + helpers |
  | `features/apps/components/seat-planner/seat-plan-results.tsx` | 949 | 1 main component + 6 inline sub-components |
  | `features/apps/components/study-timer/study-timer.tsx` | 724 | helpers + ~630-line component |
  | `features/apps/components/course-planner/course-planner.tsx` | 540 | ~450-line component |

### 2.3 Enterprise ceremony for a solo project

- `.cockpit/` = **3,005 LOC of markdown / 15 files**: `ISSUES.md` (476, a 289-finding tracker graded CRITICAL/HIGH/MED/LOW), `HISTORY.md` (475), `STRUCTURE.md` (440, a file-by-file tree), `RELEASES.md`, `PACKAGING.md`, `PMD.md`, `ROADMAP.md` (Phases 6–13), `GOVERNANCE.md`, `INDEX.md`, plus `adr/` (real decision records) and `uptime-robot.md`.
- `.github/` full OSS apparatus: `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODEOWNERS`, PR + issue templates, `dependabot.yml`, **5 CI workflows** (`ci`, `cross-browser-e2e`, `lhci`, `nextjs`, `security`).
- Standing monitoring: Sentry + Google Analytics + UptimeRobot + Lighthouse CI.

### 2.4 The agentic environment is empty

- **No `CLAUDE.md`, `AGENTS.md`, or `.claude/` exists in the repo.** `.cockpit/` is a human-shaped attempt at the same job.

### 2.5 Live "bugs" — investigated and resolved (evidence-based)

Both initially-observed issues were verified against the built `out/` export and found NOT to be code defects:

- **B1 — stale deploy, not a bug.** The live site links to `/teaching/iub/cse211spr26` (HTTP 404), but current source uses term slug `cse211sum26` (Summer 2026); `out/index.html` links to `cse211sum26` and `out/teaching/iub/cse211sum26/` is generated. The live 404 is an old "Spring 2026" deploy. **Resolves automatically on the next push to `main`** (auto-deploy via `nextjs.yml`). No code change.
- **B2 — screenshot artifact, not a bug.** The full-page screenshot showed a blank gap under "Recent Publications", but `out/index.html` contains the filter UI ("Filter by title, author, keyword"), author text (`Khaled, M` ×6), and `IEEE`/`Conference` markers — the cards render server-side. The gap is caused by `[content-visibility:auto] [contain-intrinsic-size:auto_500px]` on the grid, which skips painting off-screen content during a full-page screenshot. Real users see the publications. No fix needed.

---

## 3. Goals & non-goals

### Goals

1. A lean, high-signal **agentic environment** (`CLAUDE.md` + `.claude/rules/` + `.claude/skills/` + hooks + `llms.txt`) grounded in current best practices.
2. **Moderate purge**: remove process _documents_ and OSS-collaboration ceremony; migrate the genuinely useful knowledge into the agentic files first.
3. Fix **B1** and **B2**.
4. **Behavior-preserving refactor** of the god-files into focused modules following the existing `seat-planner` pattern.

### Non-goals (explicit — to prevent over-engineering)

- **Do NOT remove or rewrite any of the 8 apps.** Keep all; only restructure oversized files internally.
- **Do NOT remove monitoring** (Sentry, GA, UptimeRobot, LHCI all stay) or any CI workflow / quality gate.
- **Do NOT change runtime behavior, routes, styling, or public APIs** during the refactor.
- **Do NOT introduce new dependencies, abstraction layers, or a runtime schema/validation library.** Use existing patterns and libraries only.
- **Do NOT recreate an audit/findings treadmill** or scheduled-audit automation. Automation here = fast feedback (pre-commit, CI), not recurring make-work.
- No design/visual redesign of pages beyond fixing B1/B2.

---

## 4. Design

### Workstream A — Agentic environment ("full + automation")

**A1. `CLAUDE.md` (root, target < 150 lines).** Contains only non-inferable facts:

- Stack one-liner + the **exact commands** that matter (`npm run validate`, `validate:full`, `dev`, `build`, `test:run`, `typecheck`, `deadcode`).
- **Conventions that differ from defaults** (migrated from `GOVERNANCE.md`): named exports only; Server Components by default, `'use client'` only when needed; theme tokens only (never hardcoded colors); `cn()` for class merging; file = kebab-case, component = PascalCase; data lives in `src/shared/lib/data/`.
- **Architecture map**: one paragraph + pointers (`app/` routes, `features/<x>/` feature modules, `shared/` infra) — NOT a file tree (that's inferable/stale-prone).
- **Gotchas**: static export (`output: 'export'`), no server runtime; conventional-commit hook; coverage gate thresholds exist.
- An explicit **"Out of scope / do not over-engineer"** block: small diffs, follow existing patterns, no new deps/abstractions without ask, keep it on a leash.

**A2. `.claude/rules/*.md` (path-scoped, load on demand):**

- `styling.md` — token rules (loads when touching `src/styles/**` or components).
- `apps.md` — the apps module structure + "follow `seat-planner` pattern (hook + utils + sub-components)" rule (loads under `src/features/apps/**`).
- `content-data.md` — how to add courses/publications/experience (loads under `src/shared/lib/data/**`).

**A3. `.claude/skills/` (2–3 project-specific skills for real recurring tasks):**

- `add-publication` — append a typed entry to `lib/data/publications.ts`.
- `add-course` — scaffold a course in the tiered course system.
- `add-blog-post` — scaffold an MDX post in `content/` with frontmatter.

**A4. Hooks / automation (light, deterministic):**

- Keep existing Husky `pre-commit` (lint-staged) and `commit-msg` (conventional commits).
- Add a Claude Code **post-edit / Stop hook** that runs `typecheck` (or `lint:check`) so "looks done" is backed by a real gate. Fast tier only; heavy gates stay in CI.

**A5. `public/llms.txt`** — a Markdown index of the site for agent/LLM consumers (Karpathy "build for agents").

### Workstream B — Moderate purge ("keep gates, drop docs")

**Migrate first, then delete.** Salvage architecture notes + `GOVERNANCE.md` conventions into `CLAUDE.md`/rules before removing.

- **`.cockpit/` →** move `adr/` to `docs/adr/`; move `uptime-robot.md` to `docs/` (monitoring stays); **delete** `INDEX`, `PMD`, `ISSUES`, `HISTORY`, `ROADMAP`, `STRUCTURE`, `RELEASES`, `PACKAGING`, `GOVERNANCE` after migration. Remove the now-empty `.cockpit/`.
- **`.github/` →** delete `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `CODEOWNERS`, `ISSUE_TEMPLATE/`, `pull_request_template.md` (solo project). **Keep** `SECURITY.md`, `dependabot.yml`, and **all 5 workflows** (gates + monitoring stay per user decision).
- **`README.md` →** light trim of OSS-collaboration sections (Contributing/PR flow) and the `.cockpit/PMD.md` pointers (repoint to `CLAUDE.md`); keep the genuinely useful setup/scripts/structure sections.

### Workstream C — Live bug fixes (test-guarded)

- **B1:** find the source of the `/teaching/iub/cse211spr26` link (likely course data / news item), correct or remove the dangling course slug, and add a test/assertion so internal links resolve (the CI lychee link-checker should already catch this — investigate why it didn't, e.g. external vs offline routing).
- **B2:** root-cause the empty homepage Recent Publications section (data filter returning empty vs. render guard) and fix so publications render; add a smoke test asserting ≥1 publication card on `/`.

### Workstream D — God-file refactor (behavior-preserving)

**Principle:** apply the repo's existing `seat-planner` module pattern (`use-*.ts` hook + `*.utils.ts` + focused sub-component files). No behavior change. Each file refactored in small, individually-verifiable steps, guarded by the existing 491 unit tests + added characterization tests where coverage is thin.

| Target                        | Extract to                                                                                                                                                                                                                         |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-importer.tsx` (1,199)   | pure helpers → `data-importer.utils.ts`; state → `use-data-importer.ts`; paste/upload/column-mapping/preview sub-views → own files                                                                                                 |
| `seat-plan-results.tsx` (949) | move 6 inline sub-components (`SeatPlanPngDocument`, `RoomUtilisationPanel`, `SectionOverviewCard`, `RoomSheet`, `ResultActions`, `PngSummaryStat`) to own files; PNG export doc isolated; `useMemo` derivations → small util/hook |
| `study-timer.tsx` (724)       | helpers → `study-timer.utils.ts`; timer state → `use-study-timer.ts`; settings/heatmap/log views → own files                                                                                                                       |
| `course-planner.tsx` (540)    | state → `use-course-planner.ts`; add-form / plan-table / prereq-view → own files                                                                                                                                                   |
| `iub-cse.ts` (1,208)          | leave as-is (it is data, not logic) — out of scope                                                                                                                                                                                 |

**Target:** no single component/file > ~300 LOC (except data files). Same public exports preserved (barrel `index.ts` unchanged for consumers).

---

## 5. Verification strategy

The "leash" (per Karpathy / Anthropic): every change closes its own verification loop.

- Workstreams B/C/D each gated by `npm run validate` (lint + format + typecheck + unit) and `npm run build` (static export must still emit ≥ current page count).
- Refactor steps: run the relevant unit tests after each extraction; characterization test added before extracting any logic lacking coverage.
- B1/B2: new smoke tests; manual browser re-check via Playwright on the affected pages.
- Whole effort ends green on `npm run validate:full`.

---

## 6. Risks & mitigations

- **R1 — Refactor regresses an app.** Mitigation: behavior-preserving only, small diffs, test-after-each-step, no public-API change.
- **R2 — Deleting docs loses real knowledge.** Mitigation: migrate-then-delete; ADRs preserved in `docs/adr/`.
- **R3 — Agentic files drift/bloat over time.** Mitigation: hard <150-line budget on `CLAUDE.md`; sometimes-relevant knowledge lives in path-scoped rules, not the always-on file.
- **R4 — Large single spec = large blast radius** (user chose combined). Mitigation: execute as ordered, independently-committable phases (see §7); each phase shippable on its own.

---

## 7. Execution order (independently committable)

1. **B (purge)** + migrate knowledge — clears context noise first.
2. **A (agentic env)** — author `CLAUDE.md`/rules/skills/hooks/`llms.txt` from migrated knowledge.
3. **C (bug fixes)** — quick wins, now test-backed.
4. **D (refactor)** — one god-file at a time, each its own commit, behavior-preserving.

---

## 8. Findings recorded ("appropriate places")

- This spec (forensic report + plan) — committed to `docs/superpowers/specs/`.
- Durable facts → agent memory files (user profile; project "de-bloat" fact; overengineering watch-list).
- Migrated architecture/conventions → `CLAUDE.md` + `.claude/rules/` (in implementation).

---

## Appendix — Sourced principles guiding this design

- CLAUDE.md < ~200 lines, only non-inferable facts; bloat reduces adherence — Anthropic ([best practices](https://code.claude.com/docs/en/best-practices), [memory](https://code.claude.com/docs/en/memory)).
- Repo-duplicating agent files measurably lowered success across 2,500+ repos — [GitHub blog](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/).
- Tight leash, small diffs, "product is works.all()" — Karpathy ([YC talk](https://singjupost.com/andrej-karpathy-software-is-changing-again/), [tweet](https://x.com/karpathy/status/1915581920022585597)).
- Fight AI over-engineering: state out-of-scope, point at existing patterns — [Anthropic](https://code.claude.com/docs/en/best-practices), [YAGNI](https://aipatternbook.com/yagni).
- Two-tier automation; deterministic hooks for must-happen steps — [Anthropic memory](https://code.claude.com/docs/en/memory).
