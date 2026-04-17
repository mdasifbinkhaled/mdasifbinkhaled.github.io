# HISTORY.md — Development Timeline

> 460 commits | 4 tags | Single branch (main) | Deployed to GitHub Pages

## Timeline

### Phase 1 — Initial Scaffold (Early Development)

- **`ccc9819`** — Initial scaffold
- Rapid iteration through NextJS errors and multi-page restructuring
- Navigation moved from sidebar to top bar
- Basic page structure established

### Phase 2 — Content & Feature Build-out

- Course pages built (IUB + BRACU institutions)
- Teaching feature module developed (assignments, schedules, resources, syllabus)
- Publications listing with search
- Research page with interests, libraries, goals
- About page with modular sections (awards, certifications, skills, etc.)
- Contact page with social links

### Phase 3 — UI Modernization & Polish

- collapsible sections with shared `CollapsibleSection` component
- Schedule and Syllabus sections separated
- Notice Board standardized
- Overview section redesigned with nested accordion
- Quick Access box styling
- Course page modularized (`bf57124`)

### Phase 4 — Stack Modernization

- **`166b4a3`** `chore(release): stable state push` — Next.js 16, React 19
- Modern stack: Next 16, React 19, TypeScript 5.9, Zod 4
- Conventional commits adopted
- `checkpoint-pre-sota` tag set

### Phase 5 — Quality & Governance

- `v1.1.0-stable` tag
- `v1.1.1-stable` tag
- CI/CD: GitHub Actions (ci.yml, nextjs.yml, security.yml)
- Husky + lint-staged + commitlint
- Vitest test suite (109 tests)
- CODE_OF_CONDUCT.md, CONTRIBUTING.md, SECURITY.md, LICENSE

### Phase 6 — Content & Polish (Recent)

- CSE211 page: consultation hours, feedback, resources reorganization
- Lab faculty updates, Discord link updates
- Python cheat sheet resource added
- Algorithm resources added
- Spacing and alignment optimizations

### Phase 7 — Cockpit Audit & Architecture Cleanup (Current)

- Full codebase analysis (167 files, 15,135 LOC)
- 44 findings documented (0 critical, 6 high, 15 medium, 14 low, 9 info)
- Fixes applied: XSS (JSON-LD), sitemap, accessibility, security headers, theme consistency
- Architecture improvements:
  - Themes reduced from 13 → 6 (light, dark, ocean, forest, lavender, slate)
  - Validation schemas split from 1 monolithic file → 7 domain modules + barrel
  - Dead barrels removed (18 → 8), dead code deleted (FooterYear, publications)
  - Empty publications directory removed
- `.cockpit/` intelligence hub created and synchronized
- All quality gates passing: 0 lint errors, 0 type errors, 109/109 tests, build OK

### Phase 8 — Forensic Code Audit: State & Performance (2026-02-22)

- **`93be3a3`** `refactor: fix code smells, anti-patterns, and technical debt`
- Systematic 3-phase forensic audit (Architecture, State Management, Performance & Bundle)
- 5 new findings (F-153 through F-157), all resolved in-session
- State management fixes:
  - `time-display.tsx`: Interval reduced from 1s to 60s (display only shows hours:minutes)
  - `navbar.tsx`: Duplicated hover-delay logic (~30 LOC × 2) extracted to `useHoverDelay` shared hook
  - `publication-card.tsx`: Added `useRef`-based setTimeout cleanup to prevent memory leaks
- Performance & bundle fixes:
  - `framer-motion` dependency removed entirely (5.3 MB saved) — replaced with vanilla JS (15 LOC)
  - `'use client'` removed from 5 pure-render components (client: 54 → 49, server: 77 → 82)
- Cockpit skill added: `.cockpit/SKILL.md` — forensic code audit methodology (240+ checks, 7 phases)
- All quality gates green: 0 TS errors, 143/143 tests, 20 pages exported

### Phase 9 — Stabilization & Regression Fix (2026-02-22)

- Server→client boundary regression from F-156 fixed:
  - Removing `'use client'` from `course-page-layout.tsx` made it a server component, but it passed Lucide icon functions (non-serializable) to `CollapsibleSection` (a `'use client'` component)
  - Fix: Changed `CollapsibleSection` `icon` prop from `React.ElementType` to `React.ReactNode`
  - Updated all 7 icon prop usages across 6 consumer files to pass pre-rendered JSX instead of function references
- Added missing `'use client'` directive to `time-display.tsx` (uses `useState`/`useEffect` directly)
- Fixed Turbopack workspace root warning by adding `turbopack: { root: '.' }` to `next.config.ts`
- Full stability audit: 0 remaining boundary violations, 0 `any` types, 0 memory leaks, 0 lint errors
- All quality gates green: 0 TS errors, 0 warnings, 143/143 tests, 20 pages exported

### Phase 10 — Architecture Refactoring (2026-02-22)

- **5-phase refactoring** addressing 28 findings (F-188 through F-217) from a fresh-perspective audit
- **Phase 1 — Data & Types** (`a2b6607`):
  - Duplicate courses.ts merged into courses/index.ts barrel
  - NewsItem type moved from inline to shared/types
  - Grading scale extracted from types to data layer
  - 6 dead type interfaces removed
  - teaching-pillars.ts decoupled from React icon imports
  - researcher-profile moved from config/ to data layer (16 import sites updated)
  - Navbar refactored to use config-driven nav items
- **Phase 2 — Feature Modules** (`b821ef1`):
  - teaching-tabs.client.tsx moved from app/ to features/teaching/
  - Barrel files created for research, teaching, and academic feature modules
- **Phase 3 — Navigation & Layout** (`4a6730e`):
  - Footer nav links driven by config (replaces 7 hardcoded Link elements)
  - Footer lastUpdated read from siteConfig
  - Navbar height extracted to LAYOUT.NAVBAR_HEIGHT constant
  - Breadcrumbs rewritten to use navIconMap + config
- **Phase 4 — SEO & Dead Code** (`aa317f3`):
  - System theme option removed from command menu
  - Homepage metadata export added
  - 3 canonical URLs normalized to relative paths
  - Dead structured data functions removed
- **Phase 5 — Dead Code & Polish** (`b687d8e`):
  - 3 redirect-only error.tsx files deleted
  - Entire toast system removed (use-toast, toast.tsx, toaster.tsx, @radix-ui/react-toast)
  - Error boundary label casing fixed (Cv→CV, Bracu→BRACU, Iub→IUB)
  - 15 unused Tailwind config extensions cleaned up
- **Verification**: 40-point cross-check (39/40 pass), dead AcademicAward type + dead CSS variable removed
- All quality gates green: 0 TS errors, 0 lint errors, 141/141 tests (21 files), 20 pages exported

### Production Polish (2026-02-23)

- **Commit**: `bdb61cb`
- **Findings**: F-218 – F-221
- Changes:
  - 4 raw `<a>` internal links converted to Next.js `<Link>` (cv-content: 3, search-result-card: 1)
  - 4 non-null assertions (`!`) replaced with nullish coalescing (`?? ''`) in course-utils.ts
  - Type assertion removed in skills-section.tsx — `iconName` added to Skill interface + `satisfies Skill[]` on data
  - 12 smoke render tests added for About, Home, Research, Publications feature modules
- Quality gates: 0 TS errors, 0 lint errors, 153/153 tests (22 files), 20 pages exported

### Phase 11 — Structural Cleanup (2026-02-24)

- **Commits**: `634e466`, `25838a6`, `8d4953d`
- **7 findings** (F-218 through F-224), all resolved
- **Test reorganization**: 14 flat test files reorganized into structured directories mirroring src/
  - tests/shared/{components/{common,layout,navigation,ui},config,hooks,lib}/
  - tests/features/{apps,teaching}/
- **Import cleanup**: 12 broken relative `../src/` imports replaced with `@/` path alias across 6 files
- **Icon consolidation**: Dual icon registries merged — nav-icon-map.ts now re-exports from icons.tsx
- **Barrel exports**: Added feature-level index.ts for home/, about/, apps/ modules; updated all page consumers
- **Error boundary consistency**: Re-added error.tsx to 3 redirect pages (/experience, /service, /service-awards)
- **Stale artifacts**: Deleted .playwright-mcp/ log directory
- **Cockpit sync**: All 7 .cockpit/ documentation files updated to match codebase reality
- Quality gates: 0 TS errors, 0 lint errors, 153/153 tests (23 files), 20 pages exported

### Phase 12 — Final Cleanup & Stable Tag

- **Dead code removal**: Removed `src/features/academic/` (9 files, 544 LOC) — never imported by any page
- **Missing icons fixed**: Generated `favicon-16x16.png` and `apple-touch-icon.png` (referenced in layout.tsx but missing)
- **Cockpit consolidation**: Merged `PUBLICATION.md` into `PACKAGING.md`, deleted `SKILL.md` (533 lines of generic methodology)
- **Local artifacts purged**: coverage/, playwright-report/, test-results/, .husky/\_/, 18× .tsbuildinfo files
- **All cockpit docs updated**: Metrics, file counts, LOC distribution corrected across INDEX, PMD, STRUCTURE
- Quality gates: 0 TS errors, 0 lint errors, all tests pass, 20 pages exported
- Tagged `v1.3.0-stable`

### Roadmap Phase 8 — Modern Web & SEO Enhancements (2026-02-25)

- **View Transitions**: Enabled experimental `viewTransition: true` in `next.config.ts` for native cross-fade DOM routing.
- **Container Queries**: Integrated `@tailwindcss/container-queries`. `PublicationCard` and `CourseCard` now resize intrinsically (`@sm:`, `@container`) regardless of browser viewport width.
- **Content Visibility**: Applied `content-visibility: auto` to publication lists to defer off-screen rendering and heavily stabilize TTI.
- **SEO & Semantics**:
  - Injected dynamic route `openGraph` overrides into Course pages, App tools, and Publication views for exact rich social-sharing snippets.
  - Upgraded component semantics from loose `<div>` wrappers to precise `<article>`, `<time>`, and `<section>` tags.
- Quality Gates: Codebase structurally clean (13,951 LOC). 149/149 test positives. Zero static export warnings.

### Ground-Up Audit & A11y Remediation (2026-04-12)

- **Forensic verification**: Validated all prior session changes (9 modified + 5 new files)
- **Service worker registration**: Created `sw-register.tsx` — Workbox `out/sw.js` now registered in root layout
- **E2E test expansion**: A11y suite expanded from 10 to 18 routes; smoke tests from 11 to 21; total E2E: 37 → 49
- **7 real a11y violations discovered and fixed**:
  - Missing aria-labels: exam-countdown (4), gpa-calculator (2), seat-planner (2)
  - Insufficient color contrast: office-hours badges, blog tag badge, teaching course-cards and stat-cards
- **E2E redirect flakiness fixed**: `page.waitForURL()` pattern for `<meta http-equiv="refresh">` redirects
- **Error boundaries**: Re-added to 3 redirect pages (`/experience`, `/service`, `/service-awards`)
- **Metadata**: `siteConfig.lastUpdated` corrected
- **Cockpit sync**: All 9 documentation files synchronized — 40+ stale claims corrected
- Quality gates: 0 TS errors, 0 lint errors, 368/368 unit (41 files), 49/49 E2E (4 files), 25 HTML pages / 27 routes

### Seat Planner — Feature Build & Decomposition (2026-02 – 2026-04)

- **Commit**: `b612559` `refactor(apps): decompose seat-planner god component & fix critical bugs`
- **Feature**: Full seat plan generator at `/apps/seat-planner/`
  - Upload student CSV, configure rooms, generate seat allocation
  - Export to CSV and PDF (via jsPDF + jspdf-autotable + html2canvas)
  - 13 files, 1,989 LOC — well-decomposed architecture:
    - `allocation.ts` — seat allocation algorithm
    - `csv-parser.ts` / `csv-export.ts` — student data I/O
    - `pdf-export.ts` — PDF seat plan generation
    - `room-configuration.tsx` — room setup UI
    - `seat-plan-results.tsx` — results display (439 LOC, largest file)
    - `use-seat-planner.ts` — state management hook (266 LOC)
    - Plus: exam-details-form, student-data-panel, shared-ui, types, index
  - Error boundary at `/apps/seat-planner/error.tsx`
- **Dependencies added**: `html2canvas` ^1.4.1, `jspdf` ^4.2.0, `jspdf-autotable` ^5.0.7
- Codebase grew from 13,951 → ~15,900 LOC; features/ layer from 31% → 39%
- Quality gates: 0 TS errors, 0 lint errors, 149/149 tests, 20 pages exported

### Phase 8 (continued) — Modern Web & SEO Enhancements (2026-04-04)

- **Commit**: `38b2586` `feat: implementation of Phase 8 Modern Web optimizations and SEO enhancements`
- **Container Queries**: Extended to news-feed, course-card components
- **SEO Enhancements**: Dynamic OpenGraph metadata for course pages, apps, publications
- **Semantic HTML**: Upgraded component wrappers to `<article>`, `<time>`, `<section>` tags
- **Content Visibility**: Applied to publication lists for deferred off-screen rendering
- **Tailwind Container Queries**: `@container` responsive breakpoints added
- Quality Gates: 15,909 LOC. 149/149 tests. Zero static export warnings.

### Cockpit Synchronization (2026-04-04)

- Full cockpit sync: all 9 documentation files updated to match codebase reality
- 28 drift items resolved across INDEX, PMD, STRUCTURE, ROADMAP, PACKAGING, HISTORY, RELEASES
- Version bumped to 1.4.0 (Seat Planner = significant feature addition)
- Quality Gates: All green — 0 TS errors, 0 lint errors, 149/149 tests, 20 pages

### Content, Monitoring & Forensic Remediation (2026-04-08)

- **Blog system**: MDX-powered blog at `/blog` with frontmatter parsing
  - Dependencies: `next-mdx-remote`, `gray-matter` (no Shiki/rehype-pretty-code/remark-gfm installed)
  - Dynamic `[slug]` route with `generateStaticParams`, error boundaries
- **Talks page**: Conference talks & presentations at `/talks`
- **3 new student apps**: Exam Countdown, GPA Calculator, Office Hours (all with error boundaries)
- **Sentry integration**: Client-side error tracking via `@sentry/browser`, CSP updated for Sentry domains
- **Google Analytics**: Migrated to `@next/third-parties/google` component
- **Forensic audit & remediation**:
  - Apps page "Coming Soon" mismatch fixed (active tools moved to Available section)
  - 6 missing error boundaries added (blog, blog/[slug], talks, 3 new apps)
  - README false claims corrected (Zod 4, test count, workflow count)
  - CI stale branch triggers removed (develop, feature/\*\*)
  - .env.example: dead `NEXT_PUBLIC_STATIC_EXPORT` removed, `NEXT_PUBLIC_SENTRY_DSN` added
  - Dependency patches: react 19.2.4, lucide-react 0.563.0, radix-ui packages updated
- **Full cockpit sync**: All documentation aligned to 219-file / 17,186-LOC / 27-page reality
- Quality Gates: 0 TS errors, 0 lint errors, 162/162 tests (24 files), 27 pages exported

### Stabilization & Quality Push (2026-04-08)

- **Coverage push**: 47% → 50.07% — 40 new tests across 7 new test files
  - error-card, error-fallback, error-boundary, teaching-cta, teaching-hero-stats, course-card-compact, mdx utilities
  - Total: 202/202 tests passing (31 files)
- **Blog fix**: Removed stale `hello-world.mdx` placeholder, created proper `welcome.mdx` first post
  - Fixed `generateStaticParams` to use async `getAllPosts()` (Turbopack-compatible)
  - Removed raw `fs`/`path` imports from page component
- **Content cleanup**:
  - Talks data: replaced `'#'` placeholder links with proper values
  - Mentorship section: replaced sample students with empty-state template
  - Research timeline: deferred (import removed from research/page.tsx, component retained)
- **CI/CD improvements**:
  - ci.yml: added `format:check` step, fixed coverage JSON path, added Playwright E2E step
  - security.yml: improved audit exception logic (was masking real criticals)
  - package.json: added `test:e2e` script
- **Hygiene**: removed duplicate `.DS_Store` in .gitignore, removed stale `content/blog/.gitkeep`
- **Cockpit sync**: all documentation updated to match 202-test / 27-page / 50%+ coverage reality
- Quality Gates: 0 TS errors, 0 lint errors, 202/202 tests (31 files), 27 pages exported, 50%+ coverage

### External Audit Remediation (2026-04-11)

- **External audit**: 16 findings (AUD-001 through AUD-016) cross-verified against codebase
  - 13 confirmed, 2 partially incorrect (jspdf 4.2.1 does NOT exist — 4.2.0 is latest), 1 not reproducible (/cv axe passes locally)
- **10 code fixes applied**:
  - 3 redirect pages converted from `redirect()` to `<meta httpEquiv="refresh">` + visible fallback link (static-export-safe)
  - Footer duplicate "Home" link removed from footer nav
  - `hash-scroll.tsx`: magic `80px` → `LAYOUT.NAVBAR_HEIGHT` constant
  - `mentorship-section.tsx`: self-wraps in `<section>` only when data exists (no orphaned empty region)
  - Command palette: 4 missing theme items added (Ocean, Forest, Lavender, Slate)
  - `humans.txt`: date updated, WCAG claim softened to "targeted (axe-core audited)"
  - CSV parser: naive `split(delimiter)` → RFC 4180 `splitFields()` with quoted-field support
  - `security.yml`: time-bound review date added to jspdf exception
- **New script**: `validate:full` — validate + build + Playwright E2E
- **3 new tests**: quoted-field CSV parsing (12 total in seat-planner.test.ts)
- **14 new findings** (F-236 through F-249), all resolved
- **Documentation cleanup**: removed false MDX claims, fixed Tailwind version, synced all cockpit metrics
- Quality Gates: 0 TS errors, 0 lint errors, 363/363 tests (40 files), 27 pages exported

### Forensic Autopsy Remediation (2026-04-12)

- **Forensic codebase autopsy**: 6-phase deep audit covering architecture, code quality, security, performance, testing, and documentation
- **20 findings** (AUD-001 through AUD-020) identified, mapped to 10 fixes (F-250 through F-259)
- **Source code fixes**:
  - `global-error.tsx`: replaced hardcoded Tailwind colors with inline styles + `prefers-color-scheme` (renders outside providers)
  - `back-to-top.tsx`: removed unused `React` namespace import
  - `pdf-export.ts`: eliminated `as any` cast via `jspdf-autotable.d.ts` type augmentation
  - `mentorship.ts`: replaced open TODO with intentional-empty documentation
  - `layout.tsx`: tightened CSP `img-src` from wildcard `https:` to specific CDN origins, added CSP rationale comment
  - `lighthouserc.js`: removed 3 redirect stub URLs from Lighthouse CI audit list
- **Testing**: 5 new tests for `cv-content.client.tsx` (render, download link, analytics, tab switching, nav links)
- **Coverage thresholds bumped**: statements/lines 60→63, functions 50→53, branches 70→75
- **Documentation**: GOVERNANCE.md Tailwind 3.4→4.x, PMD.md/INDEX.md/ISSUES.md/HISTORY.md synced
- **npm audit fix**: dev dependency vulnerabilities resolved
- Quality Gates: 0 TS errors, 0 lint errors, 368/368 tests (41 files), 27 pages exported

### Phase — Student Apps Expansion (Mid 2026)

- **`5d96302`** `feat(apps): add Study Timer and Course Planner tools` — new Pomodoro/focus tracker with daily summary; course planner with topological prerequisite sort and unlocked-set computation
- **`990a5e4`** `feat: add persistence, validation, visualization & export across all apps`
  - `usePersistedState` SSR-safe hook rolled out to GPA and Grade calculators
  - Toast-based validation + export (CSV/JSON/ICS) across student tools
  - Small data-visualization touches in apps
- **`6f1bf43`** `feat(apps): shared download util, weekly heatmap, error handling`
  - Extracted `downloadFile()` utility (client-only, `document`-guarded) to replace per-app Blob/anchor duplication
  - Study Timer: 49-day weekly-activity heatmap with immutable date arithmetic and column headers dynamically aligned to grid weekdays
  - Seat Planner: toast-based error handling for PDF/PNG export failures, CSV-only file input with 10 MB cap and explicit UTF-8 decoding
  - `FileReader.onerror` now surfaces a toast instead of silently failing

### Phase — Forensic Audit Remediation (AUD-001 through AUD-016)

- Post-audit sweep resolving the entire Sprint Action Plan in one pass
- **Coverage gate restored**: `vitest.config.mts` gains `include: ['src/**/*']`; browser-only export utilities (jsPDF/html2canvas/`pdf-viewer`/`sw-register`/MDX loader) excluded with documented rationale. Coverage went 62.68 % → 65.52 %, clearing the 63 % threshold.
- **Test typecheck**: fixed fixtures in `teaching-components.test.tsx` and `components.test.tsx` (valid `CourseLevel` / `CourseTier`, required `outcomes` array, `id` on mocks). Cleaned `data-integrity.test.ts` to stop referencing the non-existent `svc.role`. Relaxed `noUncheckedIndexedAccess` only in `tests/tsconfig.json`. `typecheck` npm script now runs both projects; `lint-staged` typechecks tests via `tsc-files`.
- **Typing**: replaced the `as unknown as Record<…>` cast in `pdf-export.ts` with a proper `declare module 'jspdf'` augmentation in `src/shared/types/jspdf-autotable.d.ts`.
- **Persistence**: Course Planner, Exam Countdown, and Study Timer migrated from hand-rolled `localStorage` + `mounted` flags to the shared `usePersistedState` hook.
- **Seat Planner hardening**: file input restricted to `accept=".csv,text/csv"`, 10 MB upload cap, unsupported-type toast, explicit `readAsText(file, 'utf-8')`.
- **Download helper**: `downloadFile()` now returns early when `document` is undefined (SSR-safe).
- **Service worker**: removed redundant runtime-cache rule for `*.js` / `*.css`; Next.js hashed assets are already precached, so the rule added risk without benefit.
- **Documentation**: README prerequisite bumped to Node.js 22 (matches `engines` and CI); `.github/SECURITY.md` documents the GitHub-Pages CSP-via-`<meta>` limitations (e.g. `frame-ancestors` not enforceable).
- Quality gates green: `npm run typecheck` (src + tests), lint, format, vitest coverage, production build, Playwright E2E.

### Phase — Cockpit Hygiene & Advisory Pass (2026-04-17)

- Post-AUD-016 advisory audit produced a set of cleanup items scoped to "Trust & Hygiene":
- **Cockpit resync**: INDEX, ROADMAP, ISSUES brought in line with the real v1.5.0 state — coverage 65.52 %, commit `f399fca` landed, open-finding count reduced from "5" (stale) to "2" (F-260, F-264), ROADMAP date corrected from future-stamped 2026-05-02 to 2026-04-17.
- **Roadmap dispositions**: Phase 7.6 (PDF Study Aid / WebLLM), 10.2 (Research timeline), 10.5 (Bengali intro), 11.3 (Search/filter analytics) marked **Deferred** with explicit triggers; 11.4 (Uptime monitoring) marked **Done** — UptimeRobot monitor is configured externally per the in-repo guide.
- **F-260 hardening**: `/cv` axe audit now also calls `test.slow()` (3× timeout) in addition to the existing `iframe` exclusion; CI already runs `workers: 1`, so CI remains deterministic. Re-review scheduled 2026-07-17.
- **F-264 cadence**: quarterly re-review recorded in `ISSUES.md` with explicit next-date (2026-07-17) and escalation rule.
- **ADR-006**: captured the deliberate divergence between root and `tests/tsconfig.json` (`noUncheckedIndexedAccess` off in tests only) so the decision doesn't regress silently.
- **README**: softened WCAG claim from "WCAG 2.1 AA (CI-enforced)" to "WCAG 2.1 AA targeted (axe-core enforced per page in CI)" — matches humans.txt and evidence.
- **package.json**: `engines.npm` pinned to `>=10.0.0 <12` to align with `packageManager: npm@11.4.2`.
- Quality gates green (re-verified): typecheck, lint, 368/368 unit, 49/49 E2E, build, coverage 65.52 %.

### Phase — Advisory Closeout: Coverage Ratchet + lint-staged Simplification (2026-04-17)

- **Coverage thresholds raised** in `vitest.config.mts` from 63/75/53/63 (lines/branches/functions/statements) to **64/81/54/64** — locks in the measured 65.52/82.40/55.14/65.52 floor while leaving ~1 – 1.5 pt headroom against transient noise; any future regression below the new floor now fails CI instead of silently decaying.
- **`tsc-files` dropped** from the `src/**/*.{ts,tsx}` lint-staged hook (and uninstalled as a dependency). The tool was flaky with path-aliased projects, and CI + `npm run validate:full` already run `tsc --noEmit` against both root and `tests/tsconfig.json` projects — so zero loss of coverage, one fewer moving part. `PACKAGING.md` updated.
- Cockpit docs (INDEX Health Dashboard, ISSUES Quality Gates, ROADMAP header) re-pointed at the 64/81/54/64 floor.
- Closes advisory-audit "Later Improvements" items #8 and #10. Item #9 (pdf-lib migration) remains deliberately deferred under F-264 with its `CRITICAL-or-public-PoC` escalation trigger.
- Quality gates re-verified: lint/format/unit/typecheck clean, 368/368 unit, coverage 65.52/82.40/55.14/65.52 ≥ 64/81/54/64 floor.

### Phase — Docs Truth-Sync (2026-04-17)

- Cross-referenced every cockpit MD, root MD, and `.github/*.md` against reality and fixed the drifts an audit surfaced:
  - `TESTING.md` coverage-threshold table corrected from stale 60/50/70/60 to current **64/54/81/64**.
  - `.github/CONTRIBUTING.md` Node prerequisite bumped from v20 → **v22** to match `package.json` `engines.node` and `README.md`.
  - `.cockpit/adr/ADR-005-student-tools.md` re-stamped from `Proposed` to `Accepted (implemented as /apps/)` with an Implementation Notes block recording that the shipped prefix is `/apps/` (not `/tools/`), the nav icon is `LayoutGrid` (not `Wrench`), and the shipped tool count is 7 (not the original 4).
  - `.cockpit/INDEX.md` Phase 7 line corrected from "5 tools live" to **"7 tools live"** (adds Course Planner, Study Timer); `ADRs` vitals row corrected from "ADR-005 + template" to "ADR-005, ADR-006"; Health-Dashboard `Commit:` row re-pointed from the historical `f399fca` to the current `d8e2c96` HEAD.
- No code changes, no dependency changes; documentation only.
- Quality gates untouched (typecheck, lint, 368/368 unit, coverage 65.52 %, build, 49/49 E2E chromium).

## Tags

| Tag                   | Description                            |
| --------------------- | -------------------------------------- |
| `checkpoint-pre-sota` | Pre-modernization checkpoint           |
| `v1.1.0-stable`       | First stable release with modern stack |
| `v1.1.1-stable`       | Patch release                          |
| `v1.3.0-stable`       | Final cleanup, dead code removal       |

## Branch Strategy

- **`main`** — Single production branch, deploys to GitHub Pages on push
- **`dependabot/*`** — Automated dependency update PRs (24 branches)
- No feature branch strategy currently in use
