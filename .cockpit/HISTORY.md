# HISTORY.md — Development Timeline

> 510+ commits | 6 tags | Single branch (main) | Deployed to GitHub Pages

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

### Phase — Deferred Roadmap Closeout (2026-04-21)

- **7.6 shipped**: added `/apps/pdf-study-aid` with browser-local PDF extraction via `pdfjs-dist`, deterministic note/glossary/practice-question generation, persisted snapshots, export actions, and tool settings support.
- **10.2 shipped**: restored the research timeline as a first-class `/research` section tied back to publication anchors.
- **10.5 shipped**: added a dedicated bilingual English/Bengali introduction block on `/about`, sourced from shared personal content data.
- **11.3 shipped**: added shared `portfolioEvents` telemetry for publications filters and command-palette search/select flows; fixed the latent `ToolSettings` backup argument-order bug during the rollout.
- **Validation reverified**: `npm run validate` green with 418/418 unit tests, `npm audit --omit=dev` clean, production build generated 30 static pages and 118 precached files, Playwright finished with 161 passed and 4 skipped.

### Phase — Seat Planner Workflow Redesign & Deployment Verification (2026-04-22)

- **Commits**: `e43d3e8` `feat: redesign seat planner workflow`, `bae5ecb` `fix: raise seat planner reset contrast`
- **Workflow redesign**:
  - Reworked the Seat Planner shell into a wider primary workspace with a sticky right rail for stats, workflow guidance, backup, and reset reachability.
  - Added bulk faculty assignment flows, section coverage cues, and a more legible results workspace.
  - Relaxed room ingest so headerless paste and room/capacity label variants work with safer defaults.
  - Prevented allocation mode and sort-order changes from wiping rooms and generated allocations; the planner now recomputes instead.
- **Export polish**:
  - Added a higher-resolution PNG export surface.
  - Restyled PDF output into a more document-like, LaTeX-inspired layout.
  - Tightened print-ready room sheets and export naming consistency.
- **Verification & deploy**:
  - Reproduced a CI-only WCAG AA `color-contrast` failure on the reset action and fixed it in `bae5ecb`.
  - Local `validate:full` passed with 461/461 unit tests, a 30-page static build, 118 precached files, and 55/55 Chromium Playwright checks.
  - The full Playwright matrix also passed at 161 passed / 4 skipped across chromium, firefox, and mobile-safari.
  - Remote GitHub Actions cleared end to end on `main`: `CI`, `Security Scanning`, `Deploy Next.js site to Pages`, and `Lighthouse CI` all succeeded for `bae5ecb`.

### Phase — Course Planner IUB Preset Expansion + CSP Prop Fix (2026-05-02)

- **Commit**: `f1c7dd9` `feat: added all the courses` (Tanvir branch merged into `main`; remote `Tanvir` and `main` are now identical refs).
- **Course Planner data**:
  - `src/features/apps/components/course-planner/presets.ts` grew by ~1,193 lines, expanding the IUB BSc CSE preset to the full Curriculum 01 (Spring 2024) catalog: Foundation tracks (Communication, Computer Skills, Numeracy, Natural & Social Sciences, Humanities, LFE), Core, Major Projects, and Areas 01–10 plus Special Topics.
  - `course-planner.tsx` now renders by `course.group` label when any course defines a group (e.g. "Foundation — Communication Skills", "Area 05 — Intelligent Systems"), and falls back to topological levels otherwise. Existing apps stay on the topo-level layout.
  - `topo-sort.ts` cycle guard refactored from a leaky `Set` mutation to a per-call cloned `nextVisited`, eliminating cross-DFS state bleed.
  - Minor `course-plan-utils.ts` and `types.ts` tweaks to support the optional `group` discriminator.
- **Hidden CSP/JSX fix in `src/app/layout.tsx`** (not advertised in the commit message):
  - Replaced `<meta http-equiv="…">` with the React-correct `httpEquiv` prop. The kebab-case form was invalid as a JSX attribute and silently dropped by React 19 in dev runs.
  - CSP `script-src` now adds `'unsafe-eval'` only when `process.env.NODE_ENV === 'development'` (needed by Next 16 dev tooling). Production CSP is unchanged.
- **Validation reverified at `f1c7dd9`**: 0 lint, 0 typecheck errors, 473/473 unit tests across 57 files, coverage 73.74% lines / 81.65% branches / 63.07% funcs / 73.74% stmts (floor 64/81/54/64). Coverage of `course-planner` block: 92.99% lines / 82.55% branches / 70.37% funcs.
- **Cockpit truth-sync**: ISSUES.md was 3 months stale (still showed 368/368 unit, 25 pages, 1 open finding); refreshed header + dashboard + quality gates and re-listed F-260 alongside F-264 as the two open watchlist entries. ROADMAP Phase 7 expanded from 6 rows to 8 rows (added 7.7 Study Timer + 7.8 Course Planner). INDEX last-updated bumped.
- **Remaining advisory items** (deferred to next round):
  - 11 open Dependabot PRs (#41, #48–#56) untriaged; merge plan to be drafted before any merges.
  - 22 stale `dependabot/*` remote branches awaiting cleanup confirmation.
  - F-264 quarterly review still due 2026-07-17.

### Phase — Forensic Audit Remediation: A11y + Course Planner Cascade Fix (2026-05-06)

- **Audits dispatched**: four parallel forensic passes (architecture, security, test-quality, UI/UX a11y) over the post-Tanvir codebase. Findings consolidated and the highest-leverage fixes shipped this round; lower-leverage items (presets-folder split, discriminated-union course state, tokens.css contrast bump) deferred.
- **Course Planner — silent data corruption fix (must-fix)**: `removeCourse` previously did `prev.filter(c => c.id !== id).map(c => ({ ...c, prerequisites: c.prerequisites.filter(pid => pid !== id) }))`. Removing a completed prerequisite left every dependent (and transitive dependent) marked `completed: true` even though their entire prereq chain was now broken — the topo viewer kept them "Done" while the underlying invariant was violated. Replaced with a fixed-point cascade that computes the orphan set (`{ c | c.prerequisites ⊇ {id} ∨ c.prerequisites ⊇ orphans }`) and flips `completed → false` for every member. Closes the audit's #2 must-fix finding.
- **Course Planner — preset lookup hardening**: index-based dropdown lookup (`PRESETS[i]`) replaced with name-keyed (`PRESETS.find(p => p.name === name)`) so the second/third preset can no longer collide on the same numeric index after a reorder. Closes audit #6.
- **Course Planner — readonly preset shape**: `export const PRESETS = [IUB_CSE_PRESET] as const satisfies readonly CoursePlannerPreset[]` to lock the array against accidental mutation. Closes audit #9.
- **Course Planner — O(n) prereq label lookup**: replaced O(n²) `courses.find(c => c.id === pid)` per prereq render with a `codeById = useMemo(() => new Map(courses.map(c => [c.id, c.code])), [courses])` lookup. Sub-millisecond improvement scales linearly with course count.
- **A11y wins (course-planner)**: 4 add-form `<Input>` elements gained `aria-label`s (Course code / Course title / Credits / Prerequisites). Enter-key-to-submit now wired via per-input `onKeyDown` rather than a `<form>` wrapper (jsdom + `fireEvent.click` does not reliably bubble submit-button clicks to form `onSubmit`, which silently broke the existing test suite — discovered and reverted in-session). "Mark Done" and Trash buttons bumped from `h-7` → `h-9` / `h-7 w-7` → `h-9 w-9` to clear the 36 px iOS touch-target floor. `motion-reduce:transition-none` added to the locked-card overlay. Closes audit #1, #3, #11.
- **A11y wins (study-timer)**: all four settings labels (Focus / Short Break / Long Break / Sessions Before Long Break) restructured from sibling `<label> + <Input>` to nested `<label><span>…</span><Input/></label>`, fixing the broken accessible-name binding. Closes audit #2.
- **A11y wins (pdf-study-aid)**: Upload button gained `aria-busy={isProcessing}` plus a sibling `<span className="sr-only" role="status" aria-live="polite">Processing PDF, please wait.</span>` so screen readers announce long-running PDF parsing instead of going silent. Closes audit #5.
- **New tests**: `tests/features/apps/topo-sort.test.ts` (7 cases: linear chain depth, parallel courses at level 0, 2-cycle stability via the per-call clone guard, orphan-prereq tolerance, and three `getUnlocked` scenarios). `tests/features/apps/course-planner.test.tsx` extended with a removeCourse cascade test asserting both data invariants (B/C uncompleted + B.prerequisites no longer references A.id).
- **Coverage ratchet**: vitest thresholds raised from 64/81/54/64 → 70/81/60/70 to lock in the measured 73.81 lines / 81.78 branches / 62.66 funcs / 73.81 stmts. Branches floor held at 81 (only ~0.78 pt headroom — a coverage regression there now fails CI immediately). Lines/functions/statements have ~2.66–3.81 pt headroom.
- **Validation re-verified**: 0 lint, 0 typecheck errors, 481/481 unit tests across 58 files (up from 473/57 — net +8 tests across +1 file), coverage 73.81 lines / 81.78 branches / 62.66 funcs / 73.81 stmts (floor 70/81/60/70). Build 30 pages, 118 files / 7680.9 KB precached.
- **F-264 truth-sync**: stale advisory list (`next, jspdf, dompurify` from 2026-04-17) replaced with the current `npm audit --omit=dev` output (`next, postcss, @next/third-parties` — 3 moderate, 0 high/critical, GHSA-qx2v-qp2m-jg93 postcss <8.5.10 line-return parsing). The previous jspdf/dompurify advisory chain has resolved upstream and dropped off the audit list. `npm audit fix` reports `fixAvailable: false`; all three are transitive through Next 16's bundled toolchain. Static export + Workbox precache + strict CSP keep the exploitable surface near-zero. Quarterly review bumped to 2026-08-06 after the 2026-05-06 re-check.
- **Reverted in-session**: an attempted functional `setCourses` refactor inside `commitCoursePlan` (`let committed = false; setCourses(prev => { ...; committed = true; ... }); return committed;`) broke the addCourse flow because React's state updater runs lazily during reconciliation rather than synchronously, so `committed` was always read as `false` and the form never closed. Reverted to the original `[courses, setCourses]`-dep closure form. Documented here so the next refactor doesn't re-attempt the same pattern.
- **Follow-up modularization**: the 1,200-line Course Planner preset payload moved from flat `presets.ts` to `course-planner/presets/iub-cse.ts` with `course-planner/presets/index.ts` preserving the existing `./presets` import surface. This completes the mechanical preset-folder split without changing runtime behavior.
- **Branch cleanup completed after user approval**: remote `origin/Tanvir` deleted after verifying it was already merged into `origin/main`; local remote refs pruned.
- **Dependabot queue triaged and cleaned after user approval**: twelve stale PRs (#29, #30, #41, #48–#56) were reviewed against current `main`. GitHub Actions PRs were mostly obsolete because workflows already use newer action majors (`checkout@v6`, `setup-node@v6`, `upload-artifact@v6`, `upload-pages-artifact@v5`); the remaining relevant action bump (`github/codeql-action` v3 -> v4) was applied directly. Lockfile-only PRs #41 and #49 were already superseded (`generator-function@2.0.1`, `electron-to-chromium@1.5.336+`). React/UI/linting PRs were based on an old Next 15 / React 18 / Tailwind 3 state and are superseded by current Next 16 / React 19 / Tailwind 4.
- **Accepted dependency cleanup**: `@vitejs/plugin-react` upgraded from 4.7.0 to 5.2.0 and `github/codeql-action` upgraded from v3 to v4. The plugin upgrade was validated with lint, format, typecheck, 481/481 unit, coverage, build, Chromium E2E, and production high/critical audit.
- **Rejected/deferred dependency cleanup**: Vitest 4.1.5 + `@vitest/coverage-v8` 4.1.5 was tested. With default forks it timed out worker startup after 52/58 files; with `pool: 'threads'`, 481/481 unit tests passed but branch coverage dropped to 56.34%, below the 81% ratchet. Rolled back to Vitest 3.2.4; future Vitest 4 migration needs a dedicated coverage rebaseline without weakening the quality floor.
- **Deferred** (out of scope this round): discriminated-union course state (audit #11) and tokens.css contrast bump (visual regression risk requiring screenshot review).

### Phase — CSE211 Summer 2026 Rollover & Data Freshness (2026-05-13)

- **CSE211 term rollover**: detailed IUB `CSE 211 — Algorithms` course metadata moved from Spring 2026 to Summer 2026 (`iub-cse211-summer26`, `cse211sum26`) using a shared `cse211Term` source of truth.
- **Stale logistics removed**: Spring 2026 VJudge contest, Discord invite notice, assignment link, and section/lab room table were removed from the active course surface until official Summer 2026 logistics are published.
- **Consultation root fix**: `CourseHero` no longer hardcodes one office-hours block for every ongoing course; consultation now lives in `CourseData` and renders only when current course data provides it.
- **Regression coverage**: added CSE211 data freshness tests plus CourseHero consultation rendering/omission tests; `formatBreadcrumbTitle` now explicitly covers `cse211sum26` while preserving historical Spring slug parsing.
- **Dependency-audit cleanup**: `npm audit fix` advanced the safe patch surface (`next@16.2.4`, `@next/third-parties@16.2.3`, `eslint-config-next@16.2.4`, root `postcss@8.5.14`, Tailwind 4.2.4, Playwright 1.59.1). Replaced `serve`, `workbox-build`, and `commitlint` with local Node scripts for static E2E serving, service-worker generation, and commit-message validation, eliminating their vulnerable dev-only chains.
- **F-264 status**: audit is narrowed to the upstream Next.js chain only (`next` HIGH + bundled `postcss` MODERATE). `npm audit fix --force` would install `next@15.5.15`, a framework downgrade, so the safe path is weekly Next 16 patch watch rather than a force fix.
- **Measured quality snapshot**: full gates passed after clean reinstall and dependency refresh — lint, format, typecheck, 485/485 unit tests across 59 files, coverage 74.12 lines / 81.42 branches / 62.89 funcs / 74.12 stmts, build 30/30 pages with 118 generated SW precache entries (7548.1 KB), Chromium 55/55, Firefox/mobile-safari 106 pass + 4 skipped.

### Phase — AUD-2026-05 Forensic Audit & v1.5.1 Release (2026-05-25)

- **Scope**: Five-wave grouped-commit forensic audit landing on top of v1.5.0 (`d321a60`). Plan locked as "C (Continue original full overhaul) + B (Logical grouped commits)" with risky majors deferred to Phase 13.
- **Wave 1 — docs truth-sync (`b7abd76`)**: TESTING.md, README.md (Tailwind 4.2 callout), `public/humans.txt` (2026/05/25), `.cockpit/INDEX.md`, `.cockpit/PMD.md`. All counts/versions reconciled to measured reality.
- **Wave 2 — code correctness (`b773628`)**: seat-planner `allocation.ts` defensive fixes; `researcher-profile.ts` `siteConfig.lastUpdated`.
- **Wave 3 — security hardening (`89b041a` `fix(security):`)**: Sentry sampling tightened (`tracesSampleRate 0.1`, `replaysSessionSampleRate 0.1`, `replaysOnErrorSampleRate 0.5`); CSP refined in `layout.tsx` (added `manifest-src 'self'; media-src 'self';`, dropped unused YouTube `frame-src`, documented `frame-ancestors` static-export limitation); `robots.ts` `disallow: []` removes phantom path entries.
- **Wave 4 — safe dep sweep (`273b238`)**: `react`/`react-dom` 19.2.5 → 19.2.6, `@types/react` 19.2.14 → 19.2.15, lockfile refresh inside existing carets (`@types/node` 22.19.17 → 22.19.19 + ~28 transitive). Pinned `eslint-plugin-react-hooks` to 7.0.1 via npm override (7.1.x adds `preserve-manual-memoization` + `set-state-in-effect` rules that would flag 5 pre-existing call sites; re-enable tracked under Phase 13). Verified `npm outdated` phantom versions for `@next/*`, `@sentry/browser`, `pdfjs-dist`, `read-excel-file` against `npm view` — registry cache staleness, not actual upstream releases.
- **Wave 5 — release (this commit)**: `package.json` 1.5.0 → 1.5.1; cockpit RELEASES/HISTORY/ISSUES/ROADMAP updated; tag `v1.5.1` pushed.
- **Quality gates between waves and at tag**: lint clean, format clean, typecheck 0 errors, 488/488 unit (60 files), coverage 74.12/81.42/62.89/74.12 vs floor 70/81/60/70, build 30/30 HTML + 118 SW precache files (7548.1 KB), Playwright Chromium 55/55.
- **Open findings unchanged**: F-260 (`/cv` a11y local flake, hardened), F-264 (Next.js upstream advisory weekly watch with public-PoC / fixed-patch escalation rule).

### Phase — v1.5.2 Maintenance Modernization (2026-05-25)

- **Dependency modernization**: accepted the verified safe subset from Phase 13 — TypeScript 6.0.3, @types/node 25.8.0, jsdom 28.1.0, lucide-react 1.8.0, cross-env 10.1.0, lint-staged 16.4.0, postcss 8.5.15, tailwind-merge 3.5.0, knip 6.6.1, `typescript-eslint` 8.59.0, `eslint-plugin-react-hooks` 7.1.1, and `test-exclude` 8.0.0.
- **Blocked with evidence**: ESLint 10 is blocked by unpublished `@eslint/config-helpers@^0.6.0`; jsdom 29 is blocked by unpublished `@asamuzakjp/css-color@^5.1.11`; Vitest 4 / `@vitest/coverage-v8` 4 passes unit tests but drops branch coverage below the 81% ratchet; `@vitejs/plugin-react` 6 stays deferred while Vitest remains on 3.x.
- **Hooks cleanup**: `DataImporter` reset-on-close moved into the dialog open-change path; `StudyTimer` now completes sessions through a stable callback and `secondsLeftRef`, satisfying React Hooks 7.1 without weakening lint.
- **Icon migration**: lucide brand exports removed upstream (`Github`, `Linkedin`), so social/profile links now use available generic icons (`Code2`, `BriefcaseBusiness`) while preserving link behavior and labels.
- **Dead-code guardrail**: added focused `knip.json` + `npm run deadcode`; removed an unused parser barrel and stale shared teaching types; documented workflow/test fixture entries and CSS-imported Tailwind dependency exceptions.
- **Docs/security sync**: current docs record 273 source files, 27,547 LOC, 488/488 unit tests, 74.16/81.53/63.20/74.16 coverage, and one high upstream Next.js advisory entry under F-264.
- **Release gates reverified**: lint clean, format clean, typecheck 0 errors, 488/488 unit, coverage gate pass, focused knip clean, build 30/30 HTML + 118 SW precache entries (7461.5 KB), Playwright Chromium 55/55, full Playwright matrix 161 passed / 4 skipped.

### Phase — v1.5.3 Final Forensic Closeout (2026-05-26)

- **Security upgrade**: `next` 16.2.4 → 16.2.6 (plus `@next/third-parties` and `@next/bundle-analyzer` → 16.2.6), closing the upstream advisory chain tracked under F-264. `npm audit` now reports 0 vulnerabilities on both prod (`--omit=dev`) and full dependency trees. `eslint-config-next` intentionally remains at 16.2.4 (dev-only lint config).
- **Accessibility (WCAG AA contrast)**: `notice-board.tsx` alert icon/badge colors moved to `[&>svg]:text-info` / `[&>svg]:text-success` and the "New" badge to `bg-red-700 text-white dark:bg-red-600`; `contest-countdown.tsx` badge background softened to `bg-primary/5`. Verified by the Playwright theme-contrast suite.
- **Bug fix**: corrected a Study Timer pause regression.
- **CI/CD hardening**: SHA-pinned all GitHub Actions across the five workflows (ci, nextjs, cross-browser-e2e, lhci, security); rewrote `SECURITY.md`.
- **Docs truth-sync**: reconciled cockpit (INDEX, PMD, ROADMAP, PACKAGING, RELEASES, HISTORY, ISSUES) and root docs to measured reality — 491/491 unit (60 files), coverage 74.56/81.91/63.65/74.56, 28 HTML pages exported / 30 prerendered routes, SW 118 files (7463.2 KB), 0 npm-audit vulnerabilities.
- **Release gates at tag**: lint clean, format clean, typecheck 0 errors, 491/491 unit, coverage gate pass (floor 70/81/60/70), focused knip clean, build 28 HTML pages exported (30 prerendered routes) + 118 SW precache entries (7463.2 KB), Playwright Chromium 59/59, 0 npm-audit vulnerabilities.
- **Open findings**: F-260 (`/cv` a11y local flake, hardened, watched) remains the sole open item. F-264 is CLOSED.

| Tag                   | Description                            |
| --------------------- | -------------------------------------- |
| `checkpoint-pre-sota` | Pre-modernization checkpoint           |
| `v1.1.0-stable`       | First stable release with modern stack |
| `v1.1.1-stable`       | Patch release                          |
| `v1.3.0-stable`       | Final cleanup, dead code removal       |
| `v1.5.1`              | AUD-2026-05 forensic audit closeout    |
| `v1.5.2`              | Maintenance modernization              |
| `v1.5.3`              | Final forensic closeout (next@16.2.6)  |

## Branch Strategy

- **`main`** — Single production branch, deploys to GitHub Pages on push
- **`dependabot/*`** — Automated dependency update PRs (cleaned when stale; current queue empty after 2026-05-06 cleanup)
- No feature branch strategy currently in use
