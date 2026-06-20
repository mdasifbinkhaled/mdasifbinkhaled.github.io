# Forensic Code Audit — Portfolio

> **✅ HISTORICAL — point-in-time audit, baseline `fad0bd2` (2026-06-17). NOT a live findings tracker.**
> Every actionable finding below has since been remediated (see `git log`): AUD-005 status colors → `bbc5793`; AUD-016/017/019/025 hygiene → `23c35d7`; AUD-007/015/021 DESIGN.md gradient/shadow/radius reconciliation → `3835d0f`/`a1b93d6`/`c9c9573`; M1/M2 correctness + slug SSoT → `e693df5`/`5461810`. Files referenced below that were removed in the teaching revamp (`feb94e7`) — `course-card.tsx`, `teaching-record-table.tsx`, `mentorship-section.tsx`, `getTeachingStats` — no longer exist. Retained as a record of the audit campaign only.

_Baseline commit: `fad0bd2`. Mode: Deep. Method: 6 parallel forensic tracks (architecture/SOLID, security, correctness, testing+ecosystem, JS-TS/vibe, design-centralization) + synthesis. Generated 2026-06-17._

## 1 — Executive summary

**Overall health: Good**

Overall the codebase is in genuinely good shape for a lean static-export solo portfolio: clean unidirectional dependencies (one barrel-based cross-feature import), real SSoT config (DISPLAY_LIMITS, apps registry, icon registry), properly layered parsers/storage, exemplary TypeScript discipline (zero any/ts-ignore in src), correct effect cleanup and stale-closure handling, a comprehensive correctly-ordered CI (audit→lint→types→knip→coverage→build→export-verify→E2E→link-check), and a security posture honestly matched to a small server-less attack surface (both real XSS vectors — JSON-LD and target=\_blank — are correctly mitigated; production CSP excludes unsafe-eval; no secrets committed). There are NO Critical or High security/correctness defects.

The three most urgent items are all genuine but bounded: (1) the exam-countdown stores dates in two incompatible formats — UTC ISO for defaults/imports vs local datetime-local for added/edited exams — so the countdown is skewed by the full timezone offset for any non-UTC user (verified at use-exam-countdown.ts:43 + exam-countdown.utils.ts:74-90); (2) the two flagship calculators' pure math (computeGpa/computeGradeStats/computeTargetRequirement) has zero direct unit tests, leaving grade-boundary and CGPA-blend mutants undefended on tools students rely on for academic decisions; (3) course slug/URL derivation is re-inlined in 6+ sites despite the canonical getCoursePath helper, with a verified falsy (||) vs nullish (??) divergence between getCoursePath and the dynamic route that is a latent static-export 404 risk for any future course with an unusual slug.

Strategically, the highest-leverage work is finishing the design-centralization 'last layer'. Color/theming centralization is excellent (HSL tokens, drift-check grep + WCAG gate), but the page/section HEADING and CONTENT-WIDTH layer has no single source of truth, and DESIGN.md actively contradicts the shipped code (it prohibits gradient text and shadow-xl that the codebase ships as first-class utilities). The root cause is uniform: color rules have a grep+gate and stay clean, while type/elevation/gradient rules have neither and rotted. Closing that with a few primitives plus 2-3 added drift-check grep lines — not a design-system framework — is the proportionate fix. Also worth a small pass: the apps feature hardcodes ~57 raw Tailwind status colors instead of the existing success/warning/destructive tokens, breaking under the 4 non-dark themes.

## 2 — Project profile

| Metric   | Value                                                                  |
| -------- | ---------------------------------------------------------------------- |
| Stack    | Next.js 16 (static export), React 19, TS6 strict, Tailwind 4, 6 themes |
| Source   | 28,150 LOC / 309 files                                                 |
| Tests    | 8,687 LOC / 70 files (ratio ~0.31)                                     |
| Deps     | 28 runtime / 25 dev                                                    |
| Findings | 27 (0 Critical, 0 High, 8 Medium, 13 Low, 6 Info)                      |

## 3 — Findings

### AUD-001: Exam countdown mixes UTC-ISO and local datetime-local strings → countdown off by the timezone offset

**Severity** 🟡 Medium · **Effort** Moderate · **Phase** Correctness & Logic

**Location** `src/features/apps/components/exam-countdown/use-exam-countdown.ts:43 (handleAdd) + exam-countdown.utils.ts:24-35 (DEFAULT_EXAMS toISOString) + :56-62 (import parse) + :74-90 (computeTimeRemaining); exam-timer-card.tsx:151 (datetime-local value)`

**Problem** The single `date` field carries two semantically different string formats. DEFAULT_EXAMS and the import schema store full UTC ISO with a trailing Z (verified: new Date(...).toISOString() at utils.ts:24-35,61). handleAdd stores new Date().toISOString().slice(0,16) = 'YYYY-MM-DDThh:mm' (no Z), and the editor binds value={exam.date.slice(0,16)} to a datetime-local input, writing the raw local-format string back. computeTimeRemaining does new Date(dateIso).getTime(): a string with Z is parsed as UTC, a 'YYYY-MM-DDThh:mm' string is parsed as LOCAL.

**Impact** User-visible: for a non-UTC user (e.g. UTC+6 Bangladesh, the author's own locale) the countdown for default/imported exams is wrong by the full TZ offset (6h), and editing an exam silently shifts its target time. On a tool whose entire purpose is an accurate countdown, this is a correctness defect.

**Fix** Pick ONE canonical representation. Simplest: store local 'YYYY-MM-DDThh:mm' everywhere — change DEFAULT_EXAMS and the import parse to emit a local-format string (drop .toISOString()), and keep computeTimeRemaining parsing as local. Add a unit test asserting round-trip stability across a non-UTC TZ.

### AUD-002: Flagship calculator pure functions (computeGpa/computeGradeStats/computeTargetRequirement) have NO direct unit tests

**Severity** 🟡 Medium · **Effort** Moderate · **Phase** Testing Quality + Correctness

**Location** `src/features/apps/components/gpa-calculator/gpa-calculator.utils.ts:67 (computeGpa); src/features/apps/components/grade-calculator/grade-calculator.utils.ts:38 (computeGradeStats),:72 (computeTargetRequirement),:94 (computeCurrentGradeLabel). grep across tests/ returns ZERO direct hits.`

**Problem** The most numerically-sensitive logic in the apps (weighted GPA, CGPA blending of prior credits, target-grade required-average projection, letter-grade boundary mapping) is verified ONLY transitively through rendered-DOM string assertions in gpa-calculator.test.tsx / grade-calculator.test.tsx. UI-unreachable edge cases (prevCredits>0 with prevCgpa=0, totalPossiblePoints=0 → requiredAverage null, exact grade-boundary currentPercentage >= s.minPercentage) are never asserted; mutation-readiness is poor (flipping > to >= on a boundary would likely pass the component tests).

**Impact** A refactor or subtle off-by-one in grade-boundary or CGPA math could ship green. For calculators students rely on for academic decisions, silent numeric regressions are the highest-value bug class and currently the least defended.

**Fix** Add tests/features/apps/gpa-calculator.utils.test.ts and grade-calculator.utils.test.ts importing the pure functions directly, asserting exact numbers for: empty courses (termGpa 0), CGPA blend, prevCredits=0 short-circuit, target already-secured (requiredAverage 0), totalPossiblePoints=0 (requiredAverage null), and each grade-boundary exact value (e.g. 85.0 → A-, 84.99 → next-lower). Fast (no jsdom), kills the boundary mutants.

### AUD-003: Course slug/URL derivation re-inlined in 6+ files instead of reusing getCoursePath, with a falsy-vs-nullish divergence (latent static-export 404)

**Severity** 🟡 Medium · **Effort** Moderate · **Phase** Architecture / DRY / Correctness

**Location** `src/shared/lib/course-utils.ts:93-95 (getCoursePath, falsy ||) vs src/app/teaching/[institution]/[courseCode]/page.tsx:19-21 (getCourseByParams) / :39-41 (generateStaticParams) / :62-63 (generateMetadata, nullish ??); src/shared/config/navigation.ts:12-14,20; src/app/sitemap.ts:105; src/shared/lib/structured-data.ts:132`

**Problem** The canonical helper getCoursePath uses `course.slug || code.toLowerCase().replace(/\s+/g,'')` (falsy). The route page uses `c.slug ? c.slug.toLowerCase() : code...` and generateMetadata uses `course.slug?.toLowerCase() ?? code...` (nullish) — an empty-string slug is KEPT by the route but FALLS BACK in getCoursePath. navigation.ts:20 sets sectionId from code, ignoring slug entirely while :14 honors it. The replace(/\s+/g,'') snippet appears in 7 locations (grep-confirmed). generateStaticParams and getCoursePath must produce byte-identical paths or a link 404s under static export.

**Impact** Today all detailed courses have clean slugs so the paths coincide and nothing breaks. The next course with an empty-string slug or an institution containing a space can desync the generated static param from the linked href, yielding a production-only 404 — exactly the class of bug invisible in dev. Also pure duplication the anti-overengineering docs would prefer consolidated.

**Fix** Make getCoursePath (plus a sibling returning just the slug) the single source of truth; import it in navigation.ts, page.tsx (getCourseByParams + generateStaticParams + generateMetadata), sitemap.ts, structured-data.ts. Pick ONE convention (the falsy || is fine for non-empty slugs) and delete the inlined copies. Behavior-preserving.

### AUD-004: No shared PageHeader / SectionHeading primitive — every page hand-rolls heading markup, so they drift

**Severity** 🟡 Medium · **Effort** Significant · **Phase** Design Centralization

**Location** `src/app/*/page.tsx + src/features/*/components/*-section.tsx (no primitive); only src/features/apps/components/app-page-header.tsx exists, scoped to /apps. grep SectionHeading|PageHeader|PageContainer in src/shared returns nothing.`

**Problem** There is no SSoT for the page-title or section-title pattern. Each top-level page repeats its own h1/h2 recipe: contact/publications use 'text-fluid-heading font-bold tracking-tight text-primary', cv uses 'text-4xl font-bold ... sm:text-5xl', talks/blog use 'text-4xl font-bold tracking-tight', about hero uses bg-clip-text. Five different h1 recipes for one role. DESIGN.md §3 documents the intended scale as prose, not a component, so nothing enforces it.

**Impact** Inconsistent typographic hierarchy across surfaces; every new page is a fresh chance to drift; the documented scale and the shipped scale diverge with no guardrail. This is the structural root behind AUD-005.

**Fix** Introduce two small presentational primitives in src/shared/components/layout/: PageHeader ({title, description?, eyebrow?, actions?}) and SectionHeading ({as?:'h2'|'h3', children, description?}), baking the DESIGN.md §3 scale in ONE place. Migrate /apps AppPageHeader to compose PageHeader so there is one header system. Genuinely repeated (16+ section headings, 16 h1s) — not over-engineering.

### AUD-005: Status colors split between semantic tokens and raw Tailwind shades with ad-hoc dark: variants, breaking the 6-theme contract

**Severity** 🟡 Medium · **Effort** Moderate · **Phase** Design Centralization / Consistency

**Location** `src/features/apps/components/exam-countdown/exam-countdown.utils.ts:105-128 (getUrgencyClasses, verified: bg-red-500/orange-500/amber-500 + text-red-600 dark:text-red-400); grade-calculator/target-projection-card.tsx:69,76 (token + raw green-100 in same file); grade-components-table.tsx:48-51,131; seat-planner.tsx:61-63; publication-card.tsx:188; plus exam-timer-card.tsx, student-data-panel.tsx, room-configuration.tsx (~13 files, ~57 occurrences; 5 mix both styles internally)`

**Problem** DESIGN.md and .claude/rules/styling.md mandate semantic-tokens-only and 'don't add dark: ad-hoc'. tokens.css defines theme-aware --success/--warning/--info/--destructive across all 6 themes. Yet the same success/warning/error concept is expressed two incompatible ways — sometimes within one file (target-projection-card.tsx uses text-destructive on line 69 but raw bg-green-100 dark:bg-green-900/30 on line 76). getUrgencyClasses mixes bg-primary/text-muted-foreground tokens for calm states with bg-red-500 + dark: pairs for urgent ones.

**Impact** Hand-written dark: overrides cover only the light+dark pair and ignore the 4 non-dark themes (ocean/forest/lavender/slate), where the literal silently stays light/off-palette while the token-based siblings render correctly. Half-uses the design-token investment; shotgun-surgery risk; the axe gate may pass since these are decorative accents, so drift goes unnoticed.

**Fix** Replace status literals with the existing tokens: bg-destructive/text-destructive (urgent), bg-warning/text-warning (mid), bg-success/text-success (positive/'Copied'/'In-Person'); drop the paired dark: variants. If the 3-step urgency ramp needs an intermediate hue, add a token (e.g. --info) rather than orange-500. Start with target-projection-card.tsx and grade-components-table.tsx (they already prove the token path). Keep the two legitimate exceptions: seat-plan PNG/PDF export (theme-independent) and the distinct-room color array.

### AUD-006: Section-heading weight/color drift: 31 font-bold vs 21 font-semibold; 16 headings tinted text-primary, contradicting DESIGN.md §3/§2

**Severity** 🟡 Medium · **Effort** Moderate · **Phase** Design Centralization / Drift

**Location** `src/features/**/*-section.tsx, src/app/**/page.tsx (h1/h2/h3). Drifted: research/open-source.tsx:18, featured-projects.tsx:10, primary-areas.tsx:25, home/news-section.tsx:15, content-previews.tsx:31/67/97, about/awards-section.tsx:13, certifications-section.tsx:14. Correct reference: src/app/teaching/page.tsx:55,75 (text-2xl font-semibold tracking-tight).`

**Problem** DESIGN.md §3 specifies 'section titles text-2xl/text-3xl font-semibold' and §2 reserves text-primary for the one interactive accent (links/active-nav). Actual: 31 font-bold vs 21 font-semibold headings, and 16 static headings carry text-primary as a default color. Two independent drifts — weight (heavier than documented) and color (overloading the interactive-accent token onto static text).

**Impact** Visually louder/'startup' rather than the 'calm university-press' voice DESIGN.md §1 targets; blue-tinted static headings dilute text-primary's meaning and are a subtle a11y/affordance smell (colored text that isn't a link). The teaching index already sits on the correct contract, giving a shipped convergence target.

**Fix** Converge ALL onto the teaching-index/DESIGN.md choice (text-2xl font-semibold, foreground color, no text-primary) via the SectionHeading primitive (AUD-004). Reserve text-primary on headings for genuinely interactive titles only. Update DESIGN.md §3 in the same commit if the final decision differs.

### AUD-007: text-gradient utility + gradient headings ship site-wide, directly contradicting DESIGN.md's explicit gradient-text prohibition

**Severity** 🟡 Medium · **Effort** Moderate · **Phase** Design Centralization / Contract integrity

**Location** `src/app/globals.css:124-125 (@utility text-gradient {bg-clip-text text-transparent bg-linear-to-r from-primary to-accent}); src/features/home/components/hero-section.tsx:73, research-highlights.tsx:24, connect-section.tsx:123; about/hero-section.tsx:37, skills-section.tsx:14; research/research-hero.tsx:13`

**Problem** DESIGN.md §2 ('Prohibited: gradient text (bg-clip-text)') and §8 ("Don't: gradient text") prohibit the exact pattern the codebase ships as a first-class utility applied to h1/h2 in 6+ non-course components. The SSoT document and the SSoT stylesheet disagree — leaving both is false confidence.

**Impact** DESIGN.md loses credibility as a contract: an agent told 'follow DESIGN.md' will either strip gradients the owner may want or keep them and violate the doc. Gradient text is also a mild per-theme contrast risk (endpoints aren't contrast-checked across 6 themes).

**Fix** Make ONE ruling and converge. Recommended: confine the brand gradient to page hero h1s only, carve it out as an explicit scoped exception in DESIGN.md (like the §11 .cp exceptions), and delete the gradient on section h2s. Update DESIGN.md §2/§8 in the same commit. Requires an owner decision, so sequence it last.

### AUD-008: Page content max-width is ad-hoc per page (max-w-2xl..7xl) with no shared ContentColumn primitive; vertical rhythm also drifts

**Severity** 🟡 Medium · **Effort** Moderate · **Phase** Design Centralization / Drift

**Location** `src/app/about/page.tsx:35 (max-w-7xl), research/page.tsx:35 (max-w-7xl, space-y-20), publications/page.tsx:41 (max-w-7xl)/55 (max-w-5xl, space-y-12), contact/page.tsx (max-w-7xl/2xl), blog/page.tsx:31 (max-w-2xl), talks/page.tsx:26 (max-w-4xl), teaching/page.tsx:29 (max-w-6xl)/42 (max-w-3xl)`

**Problem** The outer frame IS centralized (container-responsive, 23 usages, 0 raw 'container'), but each page then picks an inner max-width by hand (2xl/3xl/4xl/5xl/6xl/7xl) and its own section gap (space-y-12/16/20). DESIGN.md §4 says content is 'constrained and centered' but fixes no value, and there is no ContentColumn/Section primitive.

**Impact** Pages feel like different widths/rhythms as you navigate (research is wider and more spaced than publications); no single knob to retune the column. Each value is individually defensible but the cross-page inconsistency is visible.

**Fix** Define a ContentColumn primitive with named width variants (prose ~max-w-3xl, standard ~max-w-5xl, wide ~max-w-7xl) and pick ONE documented section gap (space-y-12 or 16). Migrate pages to the named variants. Add the chosen values to DESIGN.md §4 so it is a real contract.

### AUD-009: User file importers (CSV/XLSX/PDF) read entire files into memory with no size or row-count cap

**Severity** 🔵 Low · **Effort** QuickFix · **Phase** Security / client-side input handling

**Location** `src/shared/components/common/use-data-importer.ts:158 (parseFiles, no size check); src/shared/lib/parsers/xlsx-adapter.ts:20 (readSheet then Math.max(...stringRows.map(...))); src/features/apps/components/pdf-study-aid/study-aid.ts:240 (new Uint8Array(await file.arrayBuffer()))`

**Problem** A user can select an arbitrarily large CSV/XLSX/PDF; the whole file is buffered into memory and parsed on the main thread. No file.size/MAX_FILE_SIZE guard exists anywhere in the import path (grep-confirmed). Math.max(...stringRows.map(...)) also spreads a potentially huge array (RangeError risk on pathologically wide sheets).

**Impact** Tab freeze or crash on a multi-hundred-MB file. Pure self-DoS on the user's own tab — no cross-user or server impact on a static site; accept attributes already constrain file types.

**Fix** Reject file.size > MAX_FILE_BYTES (e.g. 10 MB) with a toast before reading, cap row count with a warning, and replace Math.max(...arr) spreads with a reduce to avoid call-stack RangeError.

### AUD-010: Seat-planner allocation (anti-cheating core) tests never assert mixed-mode interleaving or a student-conservation invariant

**Severity** 🔵 Low · **Effort** Moderate · **Phase** Testing Quality

**Location** `tests/features/apps/seat-planner.test.ts:13 (suite) vs src/features/apps/components/seat-planner/allocation.ts:119 (allocateMixed),:160-166 (room-advance loop)`

**Problem** allocation.ts is ~202 LOC of round-robin/cohort packing; the suite covers 4 students/2 rooms with 5 happy-path cases. The mixed-mode assertion only checks both sections appear somewhere in room[0] — never the actual interleaved ordering, uneven section sizes, the mid-section room-advance, or that no student is dropped/duplicated. The 'random' test only checks counts, so a shuffle returning the input unchanged passes.

**Impact** A regression that clusters sections together (defeating the anti-cheating purpose) or drops/duplicates a student under uneven sizes would ship green. This is the app with the most real logic, so the gap is meaningful even at Low.

**Fix** Add cases: (a) uneven sections [1,1,1,2] over capacity-2 rooms asserting the mixed result alternates sections within a room; (b) a conservation invariant — flatten allocations+unassigned and assert the id multiset equals the input; (c) a random-sort test asserting ordering differs across two runs (or spy Math.random).

### AUD-011: Study timer completes at 1s remaining — display never visibly reaches 00:00

**Severity** 🔵 Low · **Effort** QuickFix · **Phase** Correctness & Logic

**Location** `src/features/apps/components/study-timer/use-study-timer.ts:133-152 (tick effect)`

**Problem** The interval guard `if (secondsLeftRef.current <= 1) { clearInterval; completeSession; return; }` runs BEFORE the decrement. At ref=1 the tick that should render 00:00 instead completes the session and switchSession resets to the next duration. Off-by-one on the boundary check; the alarm fires ~1s early relative to the displayed clock.

**Impact** Cosmetic/perceptual only — total elapsed time per session is still correct (ref started at duration). The user sees the clock jump from 00:01 to the next session. No data corruption.

**Fix** Change the guard to `<= 0` and let the decrement branch (already Math.max(prev-1,0)) reach 0 before completion, or setSecondsLeft(0) explicitly before completeSession().

### AUD-012: Grade component maxScore of 0 is silently coerced to 100 in the math but stored as 0

**Severity** 🔵 Low · **Effort** QuickFix · **Phase** Correctness & Logic

**Location** `src/features/apps/components/grade-calculator/grade-calculator.utils.ts:47,50 (computeGradeStats) vs use-grade-calculator.ts:64-70 (handleChange clamp)`

**Problem** handleChange clamps maxScore with Math.max(0, num) so 0 IS persisted, but computeGradeStats does `Number(c.maxScore) || 100` then `if (parsedMax > 0)` — a stored maxScore of 0 is treated as 100 in the calculation while the input shows 0. Storage and computation disagree on the maxScore=0 case.

**Impact** A degenerate but reachable input (mid-typing, or a not-yet-graded component) yields a subtly wrong current-grade percentage. No crash (|| 100 prevents division by zero).

**Fix** Make the two layers agree: either clamp maxScore to a minimum of 1 in handleChange, or in computeGradeStats treat parsedMax<=0 as 'exclude this component' (matching the existing if (parsedMax > 0) intent).

### AUD-013: Core CSV/text parser stack (papaparse-adapter, tabular, schema) has no direct unit tests despite owning header-detection and multi-file merge logic

**Severity** 🔵 Low · **Effort** Moderate · **Phase** Testing Quality

**Location** `src/shared/lib/parsers/papaparse-adapter.ts (parseText, looksLikeHeader L38-49, sniffDelimiter L19-31); tabular.ts (parseFiles, createAlignedRows L31-71); schema.ts (applySchema, inferMapping)`

**Problem** The most logic-dense, edge-case-prone code (turning arbitrary user CSV/paste into typed rows) is exercised only indirectly through React component tests. Note: parsers.test.ts (340 LOC) DOES cover BOM/CRLF/delimiter-sniffing/header-synthesis/short-row padding well — but the specific multi-file createAlignedRows realignment (duplicate-header reorder refusal, 2-file merge with reordered columns) and the all-numeric-first-row heuristic branches are not directly asserted.

**Impact** Regressions in merging/realignment could silently corrupt imports into GPA/exam/seat-planner tools without a failing test; lines70 coverage can pass while these branches go unexercised.

**Fix** Add a focused tests/shared/lib/parsers/tabular.test.ts (+ schema.test.ts) covering: single numeric column (no header), header-vs-no-header heuristic, mixed-arity padding, duplicate-header reorder refusal, and a 2-file merge with reordered columns. Pure functions, fast.

### AUD-014: GPA: courses with an unrecognized stored grade are silently dropped; import defaults a missing grade to 'A'

**Severity** 🔵 Low · **Effort** Moderate · **Phase** Correctness & Logic

**Location** `src/features/apps/components/gpa-calculator/gpa-calculator.utils.ts:75-83 (computeGpa); use-gpa-calculator.ts:45,51 (import default grade 'A' + name merge key)`

**Problem** computeGpa only accumulates when scaleMatch && credits>0; an unmatched grade (stale/hand-edited/older-schema localStorage data) contributes nothing with no UI warning. Separately, handleImportTranscript defaults a missing grade to 'A' (the maximum), so a transcript row missing its grade column silently inflates GPA. The lowercase+trim name merge key also collapses two courses sharing a name (e.g. two 'Thesis').

**Impact** Edge-case (requires data outside the validated import path, or a blank grade cell). Could mislead a user about their GPA. Not a crash.

**Fix** In computeGpa, surface a skipped-courses count so the UI can warn 'N courses skipped: unknown grade'. For import, prefer to reject/flag a missing grade rather than defaulting to 'A'.

### AUD-015: shadow-xl / hover:shadow-2xl / hover:scale on static cards across 8+ components contradicts DESIGN.md §6 elevation rule; StatCard primitive itself encodes the drift

**Severity** 🔵 Low · **Effort** Moderate · **Phase** Design Centralization / Drift

**Location** `src/features/home/components/content-previews.tsx:100 (shadow-xl hover:shadow-2xl), research/primary-areas.tsx:40, featured-projects.tsx:28, home/research-highlights.tsx:39, connect-section.tsx:140, publications/publication-card.tsx:88, about/skills-section.tsx:22; src/shared/components/common/stat-card.tsx:103,144 (hover:shadow-lg ... hover:scale-105, plus two divergent number treatments default vs glass)`

**Problem** DESIGN.md §6 ('No shadow-xl/shadow-2xl on static content; no stacked shadows') and §8 ('subtle, purposeful' motion) are contradicted by heavy SaaS-style lift-and-scale cards. Even the shared StatCard primitive bakes in hover:scale-105 + hover:shadow-lg and ships two different number styles (default text-2xl font-bold vs glass text-3xl text-primary), so the one centralized stat component still produces inconsistent visuals.

**Impact** Heavier visual texture than the 'calm, unhurried' voice; reads as 'generic AI card grid'. Cosmetic, no a11y/function impact.

**Fix** Establish one elevation convention (border + at most subtle shadow). Add a card elevation variant (flat|raised capping at shadow-sm/md) and route cards through it; remove shadow-xl/2xl + hover:scale from static cards; tighten StatCard to one number treatment and subtle motion. Cheap first step: grep-replace shadow-xl→shadow-md and drop hover:shadow-2xl/hover:scale.

### AUD-016: PdfStudyAid component holds state + async upload/parse handlers inline instead of the documented use-hook/utils split

**Severity** 🔵 Low · **Effort** Moderate · **Phase** Architecture / SRP / Consistency

**Location** `src/features/apps/components/pdf-study-aid/pdf-study-aid.tsx:31 (PdfStudyAid, 317 LOC, 5 hooks, handleUpload :88 / handleCopy / handleJsonExport inline); no use-pdf-study-aid.ts`

**Problem** .claude/rules/apps.md and CLAUDE.md require apps to follow seat-planner structure (state in use-<name>.ts, pure logic in <name>.utils.ts). pdf-study-aid extracted pure logic to study-aid.ts but has NO use-hook — the view component holds 5 hooks plus side-effecting upload/parse handlers. It is the one stateful app that deviates; every other stateful app has a use-\*.ts hook.

**Impact** Mild SRP coupling of presentation to state-management and an inconsistency a maintainer will trip on. Lower than the LOCKED oversized-files set because parsing is already separated.

**Fix** Extract state + handleUpload/handleCopy/handleJsonExport into use-pdf-study-aid.ts matching the siblings; leave parsing in study-aid.ts and rendering in the component. Behavior-preserving.

### AUD-017: filteredPublications/uniqueYears computed via render-time IIFEs and threaded into an effect dep array, diverging from the useMemo convention

**Severity** 🔵 Low · **Effort** QuickFix · **Phase** React patterns / Consistency

**Location** `src/features/publications/components/publication-list.tsx:41-47 (uniqueYears IIFE), 61-80 (filteredPublications IIFE), 96-107 (analytics useEffect deps)`

**Problem** These derived values are written as self-invoking functions rather than useMemo, recomputing the filter on every render, then filteredPublications.length is threaded into the analytics effect deps. apps-hub.tsx:18 and course-page.tsx:39 correctly use useMemo for the same kind of derived list — this component diverged.

**Impact** Minor wasted filter passes on a small array; no user-visible bug. Maintainability/consistency smell; the two 'filter a list by query' implementations diverged in pattern.

**Fix** Wrap filteredPublications and uniqueYears in useMemo matching apps-hub/course-page; keep filteredPublications.length in the effect deps (now stable).

### AUD-018: package.json omits the license field though an MIT LICENSE file exists

**Severity** 🔵 Low · **Effort** QuickFix · **Phase** Ecosystem

**Location** `package.json (no "license" key) vs LICENSE:1 ('MIT License / Copyright (c) 2024 Md Asif Bin Khaled')`

**Problem** Metadata divergence: the file says MIT, package.json says nothing. private:true suppresses npm warnings, but SBOM/CodeQL supply-chain summaries and license detectors read the field, not the file — and the rest of package.json (author/repo/bugs/homepage) is complete.

**Impact** Negligible functionally for a solo private portfolio; a one-line metadata gap in an otherwise meticulous package.json.

**Fix** Add "license": "MIT" next to the existing repository/bugs fields.

### AUD-019: PDF text extraction swallows all errors generically and skips page.cleanup() on mid-loop failure

**Severity** ⚪ Info · **Effort** QuickFix · **Phase** Correctness & Logic

**Location** `src/features/apps/components/pdf-study-aid/study-aid.ts:235-277 (extractTextFromPdf)`

**Problem** The whole loop is wrapped in one try/catch; if getPage/getTextContent throws on page N, pages 1..N-1 are not cleanup()-ed and the underlying error is discarded (bare catch, no logging), so corrupt-PDF vs worker-load-failure vs OOM all collapse to one message.

**Impact** Low — browser-local, page is GC'd eventually; the generic message is acceptable UX. Mainly a debuggability/resource-tidiness nit.

**Fix** Wrap per-page work in its own try/finally so page.cleanup() always runs, and console.warn(e) (or include e.message in dev) before returning the friendly error.

### AUD-020: MDX blog renderer executes author MDX with no sanitization layer — safe under author-only content, but the trust boundary is implicit

**Severity** ⚪ Info · **Effort** QuickFix · **Phase** Security

**Location** `src/app/blog/[slug]/page.tsx:4,171 (MDXRemote from next-mdx-remote/rsc); src/shared/lib/mdx.ts:33,40 (getPostBySlug, matter())`

**Problem** MDX compiles to JSX and can execute arbitrary expressions/raw HTML; there is no rehype-sanitize/DOMPurify. Safe today because the only source is author-committed content/blog/\*.mdx (git-gated, no CMS/remote/user input on this static export) — same trust level as the rest of the source tree. Becomes a real XSS/build-time RCE surface the moment content is ever sourced from an untrusted origin.

**Impact** None under the current author-only model. Latent risk if blog content ever becomes externally sourced (external PR merged unreviewed, a future CMS, remote fetch).

**Fix** No code change needed now. Add a one-line comment in mdx.ts documenting the trust assumption ('content/blog is author-trusted; MDX executes — never render remote/untrusted MDX'). If untrusted MDX is ever introduced, switch to a sanitized remark/rehype + rehype-sanitize pipeline.

### AUD-021: DESIGN.md drift-check has a grep+gate for color only; gradient/shadow/heading prohibitions have neither and rot silently

**Severity** ⚪ Info · **Effort** QuickFix · **Phase** Design Centralization / Contract integrity

**Location** `DESIGN.md:81 (§10 color drift-check grep), :100 (Last synced 2026-06-16, predates the gradient/shadow drift)`

**Problem** Color centralization is enforced by a documented grep ('bg-(gray|zinc|...)') + the WCAG E2E gate, so it stays clean. The gradient-text/shadow-xl/heading-weight rules in the same doc have no grep and no gate, so they drifted silently (AUD-006/007/015). The gap is a missing lightweight check, not a missing framework — it is the meta-cause behind the design findings.

**Impact** DESIGN.md is trustworthy for color but quietly false for type/elevation/gradient.

**Fix** Add 2-3 lines to the §10 drift-check grep covering the other prohibitions (e.g. 'bg-clip-text|shadow-xl|shadow-2xl' should return ~nothing outside hero/course-page), optionally wired into validate. Do NOT build a design-lint framework — a grep is proportionate for a solo site.

### AUD-022: getLevelStyle widens the CourseLevel union to string, defeating exhaustiveness checking

**Severity** 🔵 Low · **Effort** QuickFix · **Phase** SOLID / Primitive obsession

**Location** `src/features/teaching/components/styles.ts:18 (getLevelStyle(level: string), casts LEVEL_STYLES[level as keyof ...] || LEVEL_STYLES.undergraduate)`

**Problem** CourseData.level is typed CourseLevel ('undergraduate'|'graduate', types/index.ts:53,272) but the helper accepts string and launders the union through an `as` cast + runtime || fallback. Adding a third CourseLevel would compile cleanly and silently fall back to 'undergraduate' styling — invisible to the type system, unlike most of this strict codebase.

**Impact** Lost compile-time safety on a styling branch; silent mis-styling if the union grows.

**Fix** Type the parameter as CourseLevel and make LEVEL_STYLES a Record<CourseLevel, string>. The indexed access becomes total; the cast and || disappear; adding a level becomes a compile error until styled.

### AUD-023: Inline magic number 4 for tech-tag truncation duplicated 3x instead of a DISPLAY_LIMITS constant

**Severity** 🔵 Low · **Effort** QuickFix · **Phase** Code Quality / Magic numbers

**Location** `src/features/teaching/components/course-card.tsx:213,222,224 (technologies.slice(0,4), length > 4, length - 4); same file imports DISPLAY_LIMITS.COURSE_FEEDBACK on :118`

**Problem** The cap 4 is duplicated as a bare literal three times while the established SSoT (config/constants.ts DISPLAY_LIMITS) is already imported two lines away and used for feedback. Inconsistent, with a latent off-by-one in the '+N more' arithmetic.

**Impact** Trivial readability/consistency debt; isolated.

**Fix** Add COURSE_TECH_TAGS: 4 (or reuse EXPERIENCE_TAGS) to DISPLAY_LIMITS and derive all three spots from it.

### AUD-024: Weak test assertions: pdf-study-aid .length>0 and smoke-test document.body truthy checks overstate behavioral coverage

**Severity** 🔵 Low · **Effort** QuickFix · **Phase** Testing Quality

**Location** `tests/features/apps/pdf-study-aid.test.tsx:31 (.length>0 only); tests/features/pages-smoke.test.tsx:58,73,80,105,116,123,130,152 (expect(document.body).toBeTruthy())`

**Problem** buildStudyAidFromText is the only real logic in pdf-study-aid; .length>0 passes for almost any non-empty output (a placeholder section would pass). document.body is always truthy in jsdom, so the smoke blocks verify only render-without-crash (which is their stated contract, but the assertion reads like it checks more). Both inflate the apparent test count/coverage without proportional verification.

**Impact** Low — smoke tests do catch the import/crash class. But the ~0.31 test:src ratio overstates real behavior coverage.

**Fix** Assert content not length in pdf-study-aid (sections.map(s=>s.heading) toContain('Methods'); summary toMatch). For the static smoke sections (Awards/Certifications/ResearchHero/PrimaryAreas/OpenSource), assert one stable rendered string instead of document.body.

### AUD-025: Minor React/TS hygiene: index keys on static CV lists, redundant `as` casts, and a stable-key assumption in usePersistedState

**Severity** ⚪ Info · **Effort** QuickFix · **Phase** React patterns / TS hygiene

**Location** `src/app/cv/cv-content.client.tsx:98-102 (key={idx}); src/shared/components/ui/command-menu.tsx:100 (href as string, no-op), apps-hub.tsx:75, teaching-record-table.tsx:94 (redundant casts); src/shared/hooks/use-persisted-state.ts:39-48 (persist effect omits key dep, reads keyRef)`

**Problem** Three small smells, all harmless today: index keys on static module data (diverges from the codebase's stable-id convention and becomes a real reconciliation bug if copy-pasted into a dynamic list); redundant `as` casts where inference/narrowing suffices (the codebase is otherwise any/cast-clean); and usePersistedState's persist effect omitting `key` from deps — fine because every consumer passes a constant namespaced key, but a latent footgun for a dynamic key.

**Impact** None functional. Consistency/maintainability nits; the redundant casts can mask future regressions.

**Fix** Key on stable content/id; drop the no-op `as string`; either document that usePersistedState's key must be stable (one-line JSDoc) or add key to the persist deps and drop keyRef.

### AUD-026: Transitive dompurify (via jspdf) and js-yaml (via gray-matter) advisories are unreachable in this app's code paths

**Severity** ⚪ Info · **Effort** QuickFix · **Phase** Security / dependency CVEs

**Location** `package.json → jspdf@4.2.1 → dompurify@3.4.0 (seat-planner pdf-export.ts:111 uses autoTable not doc.html()); gray-matter → js-yaml (mdx.ts:40 matter() on author files only)`

**Problem** npm audit reports moderate dompurify (IN_PLACE/HTML-string sanitization) and js-yaml (quadratic merge-key DoS) advisories, both below the --audit-level=high CI gate. The vulnerable paths are unreachable: this app builds PDFs from structured data via jspdf-autotable (never doc.html()), and parses YAML only from author-committed frontmatter at build time — never attacker input.

**Impact** No exploitable impact. Surfaces only in npm audit; consistent with the accepted Dependabot-deferral decision.

**Fix** No action required. Optionally run npm audit fix (non-breaking) at the next dependency-grouping pass to silence the dompurify noise. Periodically eyeball moderate prod advisories rather than trusting the green gate.

### AUD-027: Known: Featured CourseCard (variant="static") renders no link to the detail page; flag-argument coupling drops navigation

**Severity** ⚪ Info · **Effort** QuickFix · **Phase** Known / pending revamp

**Location** `src/features/teaching/components/course-card.tsx:240-277 (footer gated on isCollapsible; the only View Course Link lives inside it), :174 (ArrowRight affordance shown but Card root not wrapped in a Link)`

**Problem** LOCKED/known per the audit baseline. Structurally a flag-argument coupling: the variant boolean silently drops the footer (and its only navigational Link) for the featured card even when hasDetailPage is true, so the affordance and behavior diverge. Recorded for completeness, not re-litigated.

**Impact** User cannot reach the command-center page from the featured card. Already identified; revamp pending.

**Fix** During the planned teaching-page revamp, make navigation independent of the collapsible/static flag — render the View Course link (or wrap the Card in a Link) whenever hasDetailPage, regardless of variant.

## 4 — Perspective review

| Lens                     | Rating           | Note                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------ | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🧑‍💻 Developer Experience  | ⭐⭐⭐⭐ (4/5)   | Excellent TS discipline (zero any/ts-ignore), consistent error-boundary factory, well-documented hooks with deliberate stale-closure handling, and a thorough validate/validate:full pipeline. Held back from 5 by real consistency drift: two competing status-color conventions, slug logic re-inlined 6+ times, and a publication-list using render-time IIFEs where siblings use useMemo — a contributor can easily copy the wrong pattern. |
| ⚙️ Operations Readiness  | ⭐⭐⭐⭐⭐ (5/5) | For a static export this is near-ideal: comprehensive correctly-ordered CI with a page-count export-verify guard, CodeQL weekly, Dependabot grouped, lychee link-check, Lighthouse + axe-across-6-themes gates, husky/lint-staged/conventional-commits. No server/DB to operate; deploy is GitHub Pages. Only nit: a couple of prohibitions (gradient/shadow) lack a CI grep so they drift silently.                                            |
| 💼 Business Alignment    | ⭐⭐⭐⭐ (4/5)   | The site serves its purpose well; the apps are real, working student tools. The one user-visible functional defect — exam countdown wrong by the TZ offset for the author's own UTC+6 locale — directly undercuts a tool's whole purpose. The known non-clickable featured CourseCard also blocks a navigation path. Both are scoped and on the revamp roadmap.                                                                                 |
| 🆕 Newcomer Friendliness | ⭐⭐⭐⭐ (4/5)   | Strong onboarding surface: lean CLAUDE.md, DESIGN.md visual contract, .claude/rules, llms.txt and README all accurate to the route table. The friction is that DESIGN.md is partly false (prohibits patterns the code ships), so a newcomer told 'follow DESIGN.md' gets contradictory guidance; and the apps' deviation (pdf-study-aid lacks a use-hook; status colors hardcoded) muddies the otherwise-clear reference structure.             |

## 5 — What's done well

- Clean unidirectional dependency direction: zero shared→features imports, zero app→deep-feature leakage, and only ONE cross-feature import (home/content-previews.tsx → @/features/publications via its public barrel) — acceptable composition.
- Strong SSoT discipline where it exists: config/constants.ts (DISPLAY_LIMITS/LAYOUT/SCROLL/TIMING), config/apps.ts as an OCP-friendly apps registry, a single icon registry re-exported by nav-icon-map.ts, and container-responsive (23 usages, 0 raw 'container').
- Exceptional TypeScript discipline: zero any/as any/@ts-ignore/@ts-nocheck in src, exactly one justified eslint-disable (lazy hydration), non-null assertions only where provably safe under noUncheckedIndexedAccess.
- Parsers and calculators are cleanly separated into pure side-effect-free .utils.ts modules; division-by-zero is consistently guarded across every averaging path (GPA, grade, target, seat-planner stats).
- Security correctly mitigates its two real vectors: sanitizeJsonLd() escapes <,>,&,U+2028,U+2029 before dangerouslySetInnerHTML, and every target=_blank carries rel=noopener noreferrer. Production CSP excludes unsafe-eval (dev-only); no eval/new Function in src; no secrets committed (only empty NEXT_PUBLIC_\* placeholders).
- Deliberate security-driven dependency choice: switched off the vulnerable npm xlsx package to read-excel-file (ADR-007), lazy-loaded only on .xlsx/.xls, avoiding the known HIGH xlsx CVEs.
- Persistence is cleanly layered (use-tool-storage → use-persisted-state, the only direct localStorage consumer; namespaced + migrate), with defensive try/catch hydration so poisoned localStorage cannot crash the app.
- Strong tests where the hard logic lives: study-timer uses fake timers with exact transition assertions, parsers.test.ts (340 LOC) covers BOM/CRLF/delimiter-sniffing edge cases, course-planner/topo-sort cover cycle/orphan-prereq paths; no skipped/.only/commented-out tests.
- Exemplary CI/ecosystem for a solo static export: correctly-ordered pipeline with a page-count export-verify guard, CodeQL weekly (refuses to except next), grouped Dependabot, lychee link-check, axe-across-6-themes + Lighthouse gates, husky/lint-staged/conventional-commits, knip with a justified ui/\*\* ignore.
- Color/theming centralization is done well — the hard part: 6 themes + dark as pure HSL custom properties in tokens.css surfaced via @theme, enforced by a passing drift-check grep and the WCAG E2E gate.
- Error boundaries are perfectly consistent via the createErrorBoundary() factory; the .cp Command Center exception is cleanly scoped under .cp in course-page.css, documented in DESIGN.md §11, with the sidebar-hide derived from a flag rather than hardcoded paths.
- Correct Next 16 / React 19 patterns: async params awaited, generateStaticParams filters to detailed-tier matching the link logic, dynamicParams=false on blog, force-static on robots/sitemap, consistent useEffect cleanup for every interval/observer/listener.

## 6 — Things probably overlooked

- The status-color drift is most dangerous in the 4 NON-DARK themes: hand-written dark: overrides give a false sense of theme-correctness while ocean/forest/lavender/slate silently keep the light literal — the semantic tokens were added precisely to solve this, but adoption is partial (AUD-005).
- The exam-countdown TZ skew specifically hits the author's own UTC+6 locale by 6 hours on default exams, but is easy to miss if the author always re-edits dates (which converts them to local semantics) (AUD-001).
- The getCoursePath falsy-vs-nullish divergence is a dormant static-export 404: generateStaticParams and the linked href must produce byte-identical paths, and an empty-string slug or space-containing institution would desync them in production only (AUD-003).
- Conservation invariants (no student dropped or duplicated) and the anti-cheating interleaving guarantee are never asserted in seat-planner tests, despite splice/push/pointer machinery being exactly where such bugs hide (AUD-010).
- The flagship calculators' boundary mutants (>= vs >, prevCredits>0 vs >=0) slip through because the math is verified only via rendered-DOM strings — the dev likely assumes the component tests 'cover' the utils (AUD-002).
- DESIGN.md gives an agent contradictory instructions today: 'follow DESIGN.md' tells it to remove gradient text and shadow-xl that the codebase ships as first-class utilities — the doc and stylesheet are out of sync (AUD-007/015/021).
- The teaching index already sits on the DESIGN.md-correct heading scale (text-2xl font-semibold), so heading convergence has a shipped reference target rather than needing a fresh owner decision (AUD-006).
- The AudioContext in use-study-timer.ts is created lazily but never closed/suspended; browsers cap concurrent contexts (~6), so heavy navigation could eventually fail to beep — very low priority but un-tracked.
- No upper bound on imported file size: a Math.max(...rows.map(...)) spread over a very wide sheet can throw a RangeError independent of the OOM concern (AUD-009).

## 7 — Sprint action plan

### Sprint 1 — Correctness fixes + math test safety net (no dependencies, highest user-facing value)

| Pri | ID      | Task                                                                                                                                               | Effort   | Deps                                  |
| --- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------- |
| P0  | AUD-001 | Unify exam-countdown date format to local 'YYYY-MM-DDThh:mm' everywhere (DEFAULT_EXAMS + import parse + compute) and add a non-UTC round-trip test | Moderate | none                                  |
| P0  | AUD-002 | Add direct unit tests for computeGpa/computeGradeStats/computeTargetRequirement/computeCurrentGradeLabel with exact-number boundary + edge cases   | Moderate | none                                  |
| P1  | AUD-011 | Fix study-timer off-by-one so the clock visibly reaches 00:00 (guard <= 0)                                                                         | QuickFix | none                                  |
| P1  | AUD-012 | Reconcile grade maxScore=0 handling between handleChange clamp and computeGradeStats                                                               | QuickFix | AUD-002 (add covering test alongside) |
| P2  | AUD-014 | Surface skipped unknown-grade courses in computeGpa; stop defaulting a missing import grade to 'A'                                                 | Moderate | AUD-002                               |

### Sprint 2 — Consolidation + remaining test gaps (DRY, depends on nothing structural)

| Pri | ID      | Task                                                                                                                                                            | Effort   | Deps |
| --- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---- |
| P0  | AUD-003 | Make getCoursePath (+ slug-only sibling) the single source of truth; import it in navigation.ts, route page, sitemap, structured-data; pick one null convention | Moderate | none |
| P1  | AUD-010 | Add seat-planner conservation invariant + mixed-mode interleaving + real shuffle assertions                                                                     | Moderate | none |
| P1  | AUD-013 | Add direct tests for tabular createAlignedRows / schema (multi-file merge, duplicate-header reorder refusal, all-numeric heuristic)                             | Moderate | none |
| P2  | AUD-009 | Add MAX_FILE_BYTES + row-count guard in the import path; replace Math.max(...arr) spreads with reduce                                                           | QuickFix | none |
| P2  | AUD-016 | Extract use-pdf-study-aid.ts hook to match the seat-planner reference structure                                                                                 | Moderate | none |
| P3  | AUD-024 | Strengthen pdf-study-aid content assertions and smoke-test sections to assert a stable rendered string                                                          | QuickFix | none |

### Sprint 3 — Design centralization — finish the last layer (mechanical first, owner-decision last)

| Pri | ID      | Task                                                                                                                | Effort      | Deps                                                             |
| --- | ------- | ------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------- | -------- | ------------------------------------------- |
| P0  | AUD-006 | Converge section-heading weight/color onto text-2xl font-semibold foreground (className swaps), update DESIGN.md §3 | Moderate    | none (do before AUD-004 extraction)                              |
| P0  | AUD-004 | Extract PageHeader + SectionHeading primitives; route pages through them; compose AppPageHeader onto PageHeader     | Significant | AUD-006 (converge first so the primitive bakes the right values) |
| P1  | AUD-008 | Introduce ContentColumn primitive (prose/standard/wide) + one section-gap; migrate pages; document in DESIGN.md §4  | Moderate    | AUD-004 (same layout layer)                                      |
| P1  | AUD-005 | Replace ~57 raw status-color literals in apps with success/warning/destructive tokens; drop ad-hoc dark: variants   | Moderate    | none (parallelizable)                                            |
| P2  | AUD-015 | Tighten card elevation (remove shadow-xl/2xl + hover:scale; unify StatCard number treatment)                        | Moderate    | none                                                             |
| P2  | AUD-007 | OWNER DECISION: confine gradient text to hero h1s, carve out as DESIGN.md §2/§8 exception, remove elsewhere         | Moderate    | AUD-006 (after heading convergence)                              |
| P3  | AUD-021 | Add bg-clip-text                                                                                                    | shadow-xl   | shadow-2xl drift-check grep lines to DESIGN.md §10 / validate    | QuickFix | AUD-007, AUD-015 (gate the converged state) |

### Sprint 4 — Hygiene polish (low-risk QuickFixes, batchable)

| Pri | ID      | Task                                                                                         | Effort   | Deps |
| --- | ------- | -------------------------------------------------------------------------------------------- | -------- | ---- |
| P2  | AUD-022 | Type getLevelStyle as CourseLevel + Record<CourseLevel,string>; drop cast and fallback       | QuickFix | none |
| P2  | AUD-023 | Add COURSE_TECH_TAGS to DISPLAY_LIMITS and derive the 3 course-card truncation spots         | QuickFix | none |
| P2  | AUD-017 | Convert publication-list IIFEs to useMemo matching apps-hub/course-page                      | QuickFix | none |
| P3  | AUD-018 | Add "license": "MIT" to package.json                                                         | QuickFix | none |
| P3  | AUD-020 | Document the MDX author-trust assumption in mdx.ts                                           | QuickFix | none |
| P3  | AUD-019 | Wrap pdf per-page work in try/finally for cleanup(); log error before friendly message       | QuickFix | none |
| P3  | AUD-025 | Fix CV index keys, drop redundant as casts, document usePersistedState stable-key assumption | QuickFix | none |
| P3  | AUD-026 | Optional npm audit fix at next dependency-grouping pass (no urgency)                         | QuickFix | none |

## 8 — Design centralization proposal (the rethink)

### Current state

Centralization is ~80% complete and the hard 80% (color/theming) is done well: all 6 themes + dark are pure HSL CSS custom properties in src/styles/tokens.css, exposed via @theme in globals.css, enforced by a passing §10 color drift-check grep PLUS the axe-WCAG-across-6-themes E2E gate. cn() class-merging is consistent from @/shared/lib/utils; shadcn-style ui primitives (button/card/badge/dialog) live in one place with cva variants. container-responsive is a real centralized outer-frame utility (23 usages, 0 raw 'container'). Config SSoTs exist (DISPLAY_LIMITS, apps registry, icon registry). The .cp Command Center exception is cleanly scoped under .cp in course-page.css and documented in DESIGN.md §11, with sidebar-hide derived from a flag. AppPageHeader is a good data-driven header — but scoped only to /apps. The missing 20% is the page/section HEADING and CONTENT-WIDTH layer, which has NO single source of truth, and a contract-integrity gap where DESIGN.md prohibits patterns the code ships.

### Concrete drifts

- Five different h1 recipes for one role: contact/publications 'text-fluid-heading font-bold tracking-tight text-primary', cv 'text-4xl font-bold ... sm:text-5xl', talks/blog 'text-4xl font-bold tracking-tight', about hero bg-clip-text (no primitive — AUD-004).
- Section-heading weight/color: 31 font-bold vs 21 font-semibold; 16 headings tinted text-primary (overloading the interactive-accent token onto static text) — teaching/page.tsx:55,75 is the only correct reference; research/featured-projects/primary-areas/home content-previews/about awards+certifications all drifted heavier and bluer (AUD-006).
- Gradient text shipped as a first-class @utility text-gradient (globals.css:124) applied to h1/h2 in hero-section.tsx:73, research-highlights.tsx:24, connect-section.tsx:123, about/hero-section.tsx:37, skills-section.tsx:14, research/research-hero.tsx:13 — directly prohibited by DESIGN.md §2/§8 (AUD-007).
- shadow-xl/hover:shadow-2xl/hover:scale on static cards in content-previews.tsx:100, primary-areas.tsx:40, featured-projects.tsx:28, research-highlights.tsx:39, connect-section.tsx:140, publication-card.tsx:88, skills-section.tsx:22 — and the shared StatCard primitive itself (stat-card.tsx:144) bakes in hover:scale-105 + hover:shadow-lg and two divergent number treatments — contradicting DESIGN.md §6 (AUD-015).
- Content max-width chosen by hand per page (max-w-2xl/3xl/4xl/5xl/6xl/7xl across about/research/publications/contact/blog/talks/teaching) and section gap drifts (space-y-12/16/20) — no ContentColumn primitive (AUD-008).
- ~57 raw status-color literals (red/orange/amber/emerald/green + ad-hoc dark:) across the apps feature instead of the existing success/warning/destructive tokens — exam-countdown.utils.ts:105-128, seat-planner.tsx:61-63, publication-card.tsx:188, target-projection-card.tsx:76 (AUD-005).

### Proposed single sources of truth

- PageHeader primitive (canonical h1 + lede + optional eyebrow/actions) in src/shared/components/layout/ — baking the DESIGN.md §3 h1 scale in ONE place; AppPageHeader composes it so there is one header system, not two.
- SectionHeading primitive (as: 'h2'|'h3', children, optional description) baking the canonical section-title style (text-2xl font-semibold tracking-tight, foreground color) — converges the 31/21 font-weight split and removes text-primary from static headings.
- ContentColumn primitive with three named width variants (prose ~max-w-3xl, standard ~max-w-5xl, wide ~max-w-7xl) plus ONE documented section-gap value — replaces the ad-hoc max-w-2xl..7xl and space-y-12/16/20.
- Strengthen the existing StatCard into the canonical Stat primitive: one number treatment, subtle motion (drop hover:scale-105, cap at shadow-md), so the 'single source' stops producing default-vs-glass divergence.
- Extend the DESIGN.md §10 drift-check grep to cover the OTHER prohibitions (bg-clip-text|shadow-xl|shadow-2xl) so type/elevation/gradient get the same grep+gate enforcement that keeps color clean.

### New primitives

| Primitive                     | Purpose                                                                                                                        | Replaces                                                                                          | Worth it?                                                                                                                                                                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SectionHeading`              | One canonical section title (h2/h3) with optional description, baking text-2xl font-semibold tracking-tight + foreground color | 31 font-bold vs 21 font-semibold hand-rolled headings, 16 of them tinted text-primary             | YES — 16+ genuine repetitions carrying active drift; a shipped reference (teaching index) already proves the target style. High signal, pure className convergence.                                                               |
| `PageHeader`                  | Canonical page h1 + lede (+ eyebrow/actions) for every top-level route                                                         | 5 divergent h1 recipes across cv/talks/blog/contact/publications + about hero                     | YES — repeats 16 times; AppPageHeader already proves the data-driven pattern works for /apps and just needs generalizing. Composing AppPageHeader onto it unifies two header systems into one.                                    |
| `ContentColumn`               | Named content-width variants (prose/standard/wide) + one section gap                                                           | ad-hoc max-w-2xl..7xl and space-y-12/16/20 chosen per page                                        | YES but lower-leverage than the headings — the outer frame is already centralized (container-responsive); this finishes the inner column so width/rhythm stops drifting cross-page. Keep to 3 variants; do not over-parameterize. |
| `StatCard (tighten, not new)` | Make the existing primitive the single Stat treatment with subtle motion                                                       | the default-vs-glass number split + hover:scale/shadow-lg baked into the 'consolidated' component | YES, cheap — it already exists; this is a one-time tightening pass against DESIGN.md §6, not a new abstraction.                                                                                                                   |

### Migration order

1. Converge section-heading weight/color via className swaps (AUD-006) — no layout shift, instant visual signal, lands the target style before extraction.
2. Extract SectionHeading + PageHeader and route pages through them (AUD-004); compose AppPageHeader onto PageHeader.
3. Introduce ContentColumn and replace ad-hoc max-w + unify section gap (AUD-008).
4. Replace apps status-color literals with tokens (AUD-005) and tighten StatCard/card elevation (AUD-015) — parallelizable with steps 1-3.
5. LAST: the owner-decision ruling on gradient text + shadow-xl (AUD-007), update DESIGN.md §2/§6/§8, then add the §10 drift-check grep lines (AUD-021) so the converged state is enforced the way color already is.

### Anti-overengineering guard

This is a SOLO static site — finish the last layer, do NOT build a design-system framework. The proposed primitives (PageHeader/SectionHeading/ContentColumn) are small presentational components that genuinely repeat 16+ times each and carry active drift; they are warranted. Do NOT add a design-system package, a theme-provider abstraction, runtime style validation, or a design-lint framework — a few grep lines in the existing DESIGN.md §10 drift-check (wired into validate) is the proportionate enforcement, mirroring exactly how color centralization already stays clean. Keep spacing/radius as utility tokens, not components. The .cp Command Center exception must remain scoped under .cp and out of the new primitives. The root cause across every design finding is simply that color has a grep+gate and stays clean while type/elevation/gradient have neither and rotted — close that gap with checks, not ceremony.
