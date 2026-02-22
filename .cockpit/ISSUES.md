# ISSUES.md — Finding Tracker

> **Last Audit**: 2026-02-22 | **Status**: All resolved
> **Total Findings**: 215 | **Resolved**: 212 | **False Positives**: 3 | **Open**: 0

## Dashboard

```
CRITICAL:  4 (0 open)   — Build breaks, data loss, security holes
HIGH:      30 (0 open)  — Functional bugs, SEO/a11y violations, dead code
MEDIUM:    65 (0 open)  — Performance, DRY, architecture, testing gaps
LOW:       75 (0 open)  — Polish, minor config, cosmetic
INFO:      38 (0 open)  — Informational, acceptable trade-offs
FALSE POS: 3            — F-212 (CSS dedup), F-214 (config barrel), F-215 (typos)
```

## Quality Gates

```
TypeScript:  ✅ 0 errors  (strict mode, zero `any`)
ESLint:      ✅ 0 errors, 0 warnings  (eslint-config-next@16, native flat config)
Tests:       ✅ 141/141 pass  (21 files, vitest)
Build:       ✅ 20 pages exported  (static, 0 warnings)
Bundle:      ✅ No heavy deps  (framer-motion removed, @radix-ui/react-toast removed)
```

---

## Open Findings

_All findings resolved._

## Resolved Findings

### Resolved in Architecture Refactoring — Phase 5: Dead Code & Polish (2026-02-22)

| ID    | Category    | Severity | Title                                                 | Resolution                                                                                                     |
| ----- | ----------- | -------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| F-209 | Dead Code   | LOW      | Redirect-only routes have unnecessary error.tsx files | Deleted error.tsx for `/experience`, `/service`, `/service-awards` — `redirect()` never triggers boundaries    |
| F-210 | Dead Code   | MEDIUM   | Entire toast system is dead code                      | Removed use-toast.ts, toast.tsx, toaster.tsx, test, TOAST_DURATION constant, uninstalled @radix-ui/react-toast |
| F-211 | Consistency | LOW      | Error label acronym casing: Cv, Bracu, Iub            | Fixed to CV, BRACU, IUB in createErrorBoundary labels                                                          |
| F-212 | FALSE POS   | —        | CSS token dedup between tokens.css and globals.css    | No duplicates exist — audit was wrong                                                                          |
| F-213 | Dead Config | MEDIUM   | 15 unused Tailwind config extensions                  | Removed unused screens.xs, spacing._, maxWidth.content, fontSize.academic-_, gap.\*, zIndex.toast              |
| F-214 | FALSE POS   | —        | Config barrel re-exports hurt tree-shaking            | All exports are small static constants; webpack/turbopack tree-shakes correctly                                |
| F-215 | FALSE POS   | —        | Typos in codebase                                     | Zero typos found for 19 searched terms                                                                         |
| F-216 | Dead Code   | LOW      | Dead `AcademicAward` type never imported              | Removed from types/index.ts — found during cross-check verification                                            |
| F-217 | Dead CSS    | LOW      | Dead `--content-max-width` CSS variable in tokens.css | Removed — Tailwind utility that consumed it was already cleaned up in F-213                                    |

### Resolved in Architecture Refactoring — Phase 4: SEO & Dead Code (2026-02-22)

| ID    | Category  | Severity | Title                                                | Resolution                                                                                                                         |
| ----- | --------- | -------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| F-205 | Dead Code | LOW      | Command menu "System" theme option is a no-op        | Removed System theme CommandItem and unused Monitor icon import (enableSystem=false in ThemeProvider)                              |
| F-206 | SEO       | MEDIUM   | Homepage missing explicit metadata export            | Added metadata export with title, description, canonical to page.tsx                                                               |
| F-207 | SEO       | LOW      | 3 pages use full-URL canonicals instead of relative  | Normalized apps, apps/grade-calculator, research to relative paths (metadataBase resolves them)                                    |
| F-208 | Dead Code | MEDIUM   | Dead structured data functions and duplicate JSON-LD | Removed generateBreadcrumbStructuredData, generateWebsiteStructuredData, ScholarStructuredDataScript, duplicate about page JSON-LD |

### Resolved in Architecture Refactoring — Phase 3: Navigation & Layout (2026-02-22)

| ID    | Category     | Severity | Title                                             | Resolution                                                                                       |
| ----- | ------------ | -------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| F-200 | Architecture | MEDIUM   | Footer nav links hardcoded (7 Link elements)      | Replaced with mainNavItems.map() loop driven by navigation config                                |
| F-201 | Architecture | LOW      | Footer "Last updated" date hardcoded              | Added siteConfig.lastUpdated field; footer reads from config                                     |
| F-202 | Architecture | LOW      | Navbar spacer uses magic height h-[73px]          | Added LAYOUT.NAVBAR_HEIGHT constant (73); spacer uses inline style from constant                 |
| F-203 | Architecture | MEDIUM   | Breadcrumbs hardcode icon map with direct imports | Rewritten to use navIconMap + mainNavItems config; removed 5 hardcoded lucide-react icon imports |
| F-204 | DRY          | LOW      | Duplicate comment in breadcrumbs                  | Removed (included in F-203 rewrite)                                                              |

### Resolved in Architecture Refactoring — Phase 2: Feature Modules (2026-02-22)

| ID    | Category     | Severity | Title                                                   | Resolution                                                                 |
| ----- | ------------ | -------- | ------------------------------------------------------- | -------------------------------------------------------------------------- |
| F-195 | Architecture | —        | Contact page decomposition (reassessed)                 | Only 113 lines — no decomposition needed                                   |
| F-196 | Architecture | —        | CommandMenu imports from navigation config (reassessed) | Imports are appropriate — commands source from navigation config by design |
| F-197 | Architecture | LOW      | teaching-tabs.client.tsx in app/ instead of features/   | Moved to src/features/teaching/components/teaching-tabs.client.tsx         |
| F-198 | Architecture | MEDIUM   | Research feature module has no barrel file              | Created src/features/research/index.ts with 8 component exports            |
| F-199 | Architecture | MEDIUM   | Teaching and Academic features missing barrel files     | Created barrel index.ts for both features with all public API exports      |

### Resolved in Architecture Refactoring — Phase 1: Data & Types (2026-02-22)

| ID    | Category     | Severity | Title                                                    | Resolution                                                                                                          |
| ----- | ------------ | -------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| F-188 | DRY          | MEDIUM   | Duplicate courses.ts alongside courses/ directory        | Deleted courses.ts; absorbed exports into courses/index.ts barrel                                                   |
| F-189 | Architecture | LOW      | NewsItem type defined inline in news-feed.tsx            | Moved to shared/types/index.ts; news-feed.tsx imports from there                                                    |
| F-190 | Architecture | MEDIUM   | STANDARD_GRADING_SCALE embedded in types/tools.ts        | Extracted to shared/lib/data/grading.ts (data belongs in data layer, not type defs)                                 |
| F-191 | Dead Code    | LOW      | 6 dead type interfaces in shared/types/index.ts          | Removed unused types that had zero imports                                                                          |
| F-192 | Architecture | MEDIUM   | teaching-pillars.ts imports React for icon components    | Decoupled: uses iconName strings + navIconMap lookup instead of direct React imports                                |
| F-193 | Architecture | LOW      | researcher-profile.ts in config/ (it's data, not config) | Moved to shared/lib/data/researcher-profile.ts; updated 16 import sites                                             |
| F-194 | Architecture | MEDIUM   | Navbar imports raw course data to build nav items        | Refactored to use iubCourseNavItems/bracuCourseNavItems from navigation config; InstitutionFlyout accepts NavItem[] |

### Resolved in Root Organization Cleanup (2026-02-22)

| ID    | Category     | Severity | Title                                                      | Resolution                                                                  |
| ----- | ------------ | -------- | ---------------------------------------------------------- | --------------------------------------------------------------------------- |
| F-182 | Organization | LOW      | Community docs cluttering root                             | Moved `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md` → `.github/`   |
| F-183 | Organization | LOW      | `.prettierrc.json` standalone config file                  | Merged into `package.json` `"prettier"` key, deleted file                   |
| F-184 | Organization | LOW      | `.lintstagedrc.json` standalone config file                | Merged into `package.json` `"lint-staged"` key, deleted file                |
| F-185 | Redundancy   | LOW      | `.prettierignore` 39 lines duplicating `.gitignore`        | Reduced to 4 lines — Prettier v3 auto-reads `.gitignore`                    |
| F-186 | Organization | LOW      | Test configs (`tsconfig.test.json`, `vitest.d.ts`) in root | Moved to `tests/tsconfig.json` and `tests/vitest.d.ts`, updated references  |
| F-187 | Organization | INFO     | `.lighthouserc.js` in root, only used in CI                | Moved to `.github/lighthouserc.js`, updated `lhci.yml` with `--config` flag |

### Resolved in Deep Quality Audit (2026-02-22)

| ID    | Category     | Severity | Title                                               | Resolution                                                                                                                             |
| ----- | ------------ | -------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| F-174 | Dead Code    | MEDIUM   | Dead export `getMaxRating()` in `teaching-stats.ts` | Removed — exported but never imported anywhere                                                                                         |
| F-175 | Dead Code    | MEDIUM   | Dead export `formatMetric()` in `metrics.ts`        | Removed — exported but never imported anywhere                                                                                         |
| F-176 | Dead Code    | LOW      | 5 unused METRICS constants in `metrics.ts`          | Removed `AVERAGE_CLASS_SIZE`, `IMPACT_FACTOR_TOTAL`, `PUBLICATIONS`, `AWARDS`, `GRANTS` — never used outside file                      |
| F-177 | Dead CSS     | MEDIUM   | 6 dead CSS utility classes in `globals.css`         | Removed `.glow-effect`, `.hover-lift`, `.hover-glow`, `.scrollbar-hide`, `.animate-gradient`, `.animate-pulse-soft` + 2 dead keyframes |
| F-178 | Architecture | LOW      | Inline data in `teaching/page.tsx` (pillar array)   | Extracted to `src/shared/lib/data/teaching-pillars.ts` data file                                                                       |
| F-179 | Consistency  | LOW      | Duplicate comment in `teaching/page.tsx`            | Removed redundant `/* Three Pillars - Modernized */` comment                                                                           |
| F-180 | DRY          | MEDIUM   | StatCard glass/spotlight/compact variant redundancy | Merged glass+spotlight into single glass variant with `spotlight` boolean prop; removed unused compact variant                         |
| F-181 | DRY          | LOW      | ConnectSection 7 color variants → 3 unique colors   | Reduced to 3 semantic variants (`primary`, `secondary`, `accent`) matching actual unique color mappings                                |

### Resolved in Full Project Tree Audit (2026-02-22)

| ID    | Category      | Severity | Title                                                   | Resolution                                                                                                                                   |
| ----- | ------------- | -------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| F-166 | Content       | MEDIUM   | AI trace in `research-interests.ts`                     | Replaced "comprehensive", "leverage", "holistic" with "complete", "use", "deeper"                                                            |
| F-167 | Content       | LOW      | AI trace in `about.ts`                                  | Replaced "fostering innovation", "innovative solutions" with "encouraging creativity", "practical solutions"                                 |
| F-168 | Content       | LOW      | AI trace in `teaching/page.tsx`                         | Replaced "Fostering potential" with "Nurturing potential"                                                                                    |
| F-169 | Content       | LOW      | AI trace in `personal.ts`                               | Replaced "Fostering an environment" with "Creating an environment"                                                                           |
| F-170 | Content       | LOW      | AI trace in `research.ts`                               | Replaced "comprehensive AI solutions" with "complete AI solutions"                                                                           |
| F-171 | History       | INFO     | AI trace in commit messages (`1d521d2`, `e766fbd`)      | Accepted — Commits are already pushed to remote. Amending would require force-push. No action needed.                                        |
| F-172 | Documentation | LOW      | AI trace in `ADR-005-student-tools.md` (Leverage)       | Replaced "Leverage" with "Use" and "Uses"                                                                                                    |
| F-173 | Documentation | LOW      | AI trace in `HISTORY.md`, `PMD.md`, `STRUCTURE.md`      | Replaced "Comprehensive" with "Full", "orchestrator" with "manager"                                                                          |
| F-161 | PWA           | MEDIUM   | sw.js pre-cache list incomplete (7 of 12 static routes) | Added `/cv/`, `/apps/`, `/apps/grade-calculator/`, `/teaching/iub/`, `/teaching/bracu/` to `URLS_TO_CACHE`. Bumped cache version to v2.      |
| F-162 | Config        | LOW      | `.mypy_cache/` directory not in `.gitignore`            | Added `.mypy_cache` to `.gitignore` under Temporary/Cache section.                                                                           |
| F-163 | Resilience    | INFO     | `apps/grade-calculator/` missing own `error.tsx`        | Created `src/app/apps/grade-calculator/error.tsx` using `createErrorBoundary()` factory pattern. Now every route has its own error boundary. |
| F-164 | Documentation | INFO     | `humans.txt` last-update date stale                     | Updated "Last update" from 2026/02/18 to 2026/02/22.                                                                                         |
| F-165 | Config        | INFO     | `.nvmrc` says Node 20, local runtime is v23.11.0        | Accepted — CI correctly uses Node 20 per `.nvmrc`. Local v23 is backward compatible. No action needed.                                       |

### Resolved in Stabilization & Regression Fix (2026-02-22)

| ID    | Category       | Severity | Title                                                               | Resolution                                                                                                                                                                                  |
| ----- | -------------- | -------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F-158 | Bug/Regression | CRITICAL | BUILD BREAK: Server→client boundary violation in CollapsibleSection | Changed `icon` prop from `React.ElementType` (non-serializable function) to `React.ReactNode` (pre-rendered JSX). Updated all 7 icon usages across 6 consumer files. Regression from F-156. |
| F-159 | Best Practice  | LOW      | Missing `'use client'` on time-display.tsx                          | Added `'use client'` directive — component uses `useState`/`useEffect` directly.                                                                                                            |
| F-160 | Config         | INFO     | Turbopack workspace root inference warning                          | Added `turbopack: { root: '.' }` to `next.config.ts`.                                                                                                                                       |

### Resolved in Forensic Code Audit — State & Performance (2026-02-22)

| ID    | Category    | Severity | Title                                                          | Resolution                                                                                                                                                                                       |
| ----- | ----------- | -------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| F-153 | Performance | MEDIUM   | PERF: time-display.tsx 59x Over-Rendering (1s for h:m display) | Changed `setInterval(1000)` to `setInterval(60_000)` — component only shows hours:minutes.                                                                                                       |
| F-154 | DRY         | MEDIUM   | DRY: navbar.tsx Duplicated Hover-Delay Logic (~30 LOC × 2)     | Extracted `useHoverDelay` hook to `src/shared/hooks/use-hover-delay.ts`. Both `TeachingDropdown` and `InstitutionFlyout` now use the hook.                                                       |
| F-155 | Bug         | LOW      | BUG: publication-card.tsx Uncleaned setTimeout on Unmount      | Added `useRef`-based timeout tracking with `useEffect` cleanup to prevent memory leaks.                                                                                                          |
| F-156 | Performance | INFO     | PERF: 5 Unnecessary `'use client'` Directives                  | Removed `'use client'` from `experience-compact.tsx`, `skip-link.tsx`, `icons.tsx`, `course-page-layout.tsx`, `table.tsx` — all pure render components. Client → server: 54 → 49.                |
| F-157 | Performance | INFO     | PERF: framer-motion 5.3 MB for 1 Spotlight Effect              | Replaced `framer-motion` (`useMotionValue`, `useMotionTemplate`, `motion.div`) in `spotlight-card.tsx` with vanilla `useRef` + DOM style manipulation (15 LOC). Dependency uninstalled entirely. |

### Resolved in Phase 8.6 Final Hardening (2026-02-21)

| ID    | Category             | Severity | Title                                                      | Resolution |
| ----- | -------------------- | -------- | ---------------------------------------------------------- | ---------- |
| F-082 | SEO                  | HIGH     | SEO: Missing Google Scholar Meta Tags                      | Resolved.  |
| F-083 | Security             | HIGH     | SEC: No CSP via `<meta>` Tag                               | Resolved.  |
| F-084 | PWA                  | HIGH     | PWA: No Service Worker / Offline Support                   | Resolved.  |
| F-085 | Accessibility        | HIGH     | A11Y: No aria-live Route Announcer                         | Resolved.  |
| F-086 | Modern Web           | HIGH     | MODERN: View Transitions Enabled but Unused                | Resolved.  |
| F-087 | Monitoring           | HIGH     | MONITOR: No Web Vitals Reporting                           | Resolved.  |
| F-088 | Testing              | HIGH     | TEST: No E2E Tests                                         | Resolved.  |
| F-089 | SEO                  | HIGH     | SEO: Missing Canonical URLs on Most Pages                  | Resolved.  |
| F-090 | Developer Experience | HIGH     | DX: No Bundle Analyzer Script                              | Resolved.  |
| F-091 | Accessibility        | HIGH     | A11Y: Color Contrast Audit Needed Across 6 Themes          | Resolved.  |
| F-015 | Security             | MEDIUM   | SEC: \_headers Not Applied on GitHub Pages                 | Resolved.  |
| F-016 | Testing              | MEDIUM   | TEST: Coverage for Feature and Utility Modules             | Resolved.  |
| F-092 | SEO                  | MEDIUM   | SEO: Missing `sameAs` Profiles in Structured Data          | Resolved.  |
| F-093 | SEO                  | MEDIUM   | SEO: No `ProfilePage` Schema.org Type                      | Resolved.  |
| F-094 | PWA                  | MEDIUM   | PWA: Missing `apple-touch-icon` Link Tag                   | Resolved.  |
| F-095 | Performance          | MEDIUM   | PERF: Framer Motion Not Code-Split                         | Resolved.  |
| F-096 | Performance          | MEDIUM   | PERF: No CSS `content-visibility` for Long Pages           | Resolved.  |
| F-097 | Testing              | MEDIUM   | TEST: No Component Render Tests for Feature Modules        | Resolved.  |
| F-098 | Developer Experience | MEDIUM   | DX: No Lighthouse CI in GitHub Actions                     | Resolved.  |
| F-130 | Deprecated API       | LOW      | DEPRECATED: `window.pageYOffset` Used in 2 Files           | Resolved.  |
| F-131 | Theme                | LOW      | UI: stat-card.tsx Hardcoded Purple Spotlight Color         | Resolved.  |
| F-133 | Architecture         | LOW      | ABOUT: skills-section.tsx Fragile Icon Mapping             | Resolved.  |
| F-134 | Consistency          | LOW      | ACADEMIC: Emojis Instead of Lucide Icons                   | Resolved.  |
| F-135 | Accessibility        | LOW      | ACADEMIC: search-result-card.tsx Misleading cursor-pointer | Resolved.  |
| F-136 | DRY                  | LOW      | TEACH: course-page-layout.tsx 5 Identical Section Dividers | Resolved.  |
| F-137 | Architecture         | LOW      | TEACH: resources-section.tsx Icon by Substring Match       | Resolved.  |
| F-138 | Accessibility        | LOW      | TEACH: Hover-Only Resource Links Inaccessible              | Resolved.  |
| F-139 | DRY                  | LOW      | TEACH: teaching/page.tsx Three Pillars Copy-Pasted         | Resolved.  |
| F-141 | Architecture         | LOW      | CONFIG: `hasDetailPage` Deprecated Field Still in Schema   | Resolved.  |
| F-142 | Code Quality         | LOW      | CONFIG: CAREER Getter Inside `as const` Object             | Resolved.  |
| F-144 | Architecture         | LOW      | CONFIG: next.config.ts Dead `headers()` Function           | Resolved.  |
| F-018 | Architecture         | LOW      | ARCH: useToast Module Complexity                           | Resolved.  |
| F-020 | Architecture         | LOW      | ARCH: Command Menu Complexity                              | Resolved.  |
| F-021 | SEO                  | LOW      | SEO: Redirect Routes in Build Output                       | Resolved.  |
| F-022 | Data                 | LOW      | DATA: Hardcoded Academic Profile URLs                      | Resolved.  |
| F-023 | Performance          | LOW      | PERF: Framer Motion Bundle Size                            | Resolved.  |
| F-025 | CI/CD                | LOW      | CI: Dependabot Branch Accumulation                         | Resolved.  |
| F-028 | Config               | INFO     | glob Override Pinned                                       | Resolved.  |
| F-029 | Config               | INFO     | TypeScript Version Capped                                  | Resolved.  |
| F-030 | Config               | INFO     | Static Export Header Warning                               | Resolved.  |
| F-031 | DevOps               | INFO     | No Preview/Staging Environment                             | Resolved.  |
| F-048 | Quality              | INFO     | Error Boundary Console Statements Unguarded                | Resolved.  |
| F-049 | Theme                | INFO     | global-error.tsx Uses Hardcoded Colors                     | Resolved.  |
| F-145 | Quality              | INFO     | academic-profiles.tsx String Template Instead of cn()      | Resolved.  |
| F-146 | Quality              | INFO     | time-display.tsx Hardcoded Label                           | Resolved.  |
| F-147 | UI                   | INFO     | back-to-top.tsx Position Conflict with ThemeSelector       | Resolved.  |
| F-148 | Accessibility        | INFO     | schedule-table.tsx Missing Table Caption                   | Resolved.  |
| F-149 | Quality              | INFO     | Hash Scroll Hardcoded navbarHeight and Memory Leak         | Resolved.  |
| F-150 | Quality              | INFO     | cv-content.client.tsx viewCV Fires Twice in Strict Mode    | Resolved.  |
| F-151 | DRY                  | INFO     | Course Lookup Duplicated in generateMetadata and Page      | Resolved.  |
| F-152 | Architecture         | INFO     | Dead Error Boundaries for Redirect Routes                  | Resolved.  |

### Resolved in Phase 6 Cockpit Synchronization & Cleanup (2026-02-20)

| ID    | Category     | Severity | Title                                      | Resolution                                                             |
| ----- | ------------ | -------- | ------------------------------------------ | ---------------------------------------------------------------------- |
| F-117 | Data         | MEDIUM   | FeaturedGrant Content Hardcoded in JSX     | Extracted data to `src/shared/lib/data/research.ts` config.            |
| F-124 | Testing      | MEDIUM   | Duplicated Icon Mocks Across 5+ Test Files | Centralized via Proxy object in `tests/setup.ts`.                      |
| F-127 | Architecture | MEDIUM   | `research/page.tsx` Monolithic (393 LOC)   | Sliced into 8 composable sub-components in `src/features/research/`.   |
| F-010 | Architecture | MEDIUM   | Oversized Profile Sidebar                  | Split into 4 domain-specific modules for clean separation of concerns. |
| F-132 | Data         | LOW      | `beyond-academia.tsx` Inline Data          | Moved personal interests out of component root into `data/about.ts`.   |

### Resolved in Phase 5 Modernization (2026-02-20)

| ID    | Category     | Severity | Title                                            | Resolution                                                              |
| ----- | ------------ | -------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| F-067 | Architecture | MEDIUM   | 7 Validation Schema Files for Mostly Static Data | Purged all static Zod assertions and ported config mapping purely to TS |
| F-111 | Architecture | MEDIUM   | BaseCourseInfo Duplicate Zod Types               | Centralized strictly generic CourseData interfaces natively             |
| F-125 | Testing      | MEDIUM   | Sheet Tests Verify Mocks Not Components          | Stripped global Radix mocks and validated `role="dialog"` native builds |
| F-143 | Testing      | LOW      | Sidebar Tests Verify State, Not Behavior         | Re-mounted Vitest instances asynchronously over synthetic browser logic |

### Resolved in Phase 4B Option B Tech Debt (2026-02-20)

| ID    | Category      | Severity | Title                                                 | Resolution                                                               |
| ----- | ------------- | -------- | ----------------------------------------------------- | ------------------------------------------------------------------------ |
| F-112 | Architecture  | MEDIUM   | navIconMap Missing 4 Icons from iconNameSchema        | Added BookOpen, Users, Award, Rss to map + all mock layers.              |
| F-114 | Architecture  | MEDIUM   | researcher-profile.ts Contains Dead/Placeholder Data  | Purged keyLearnings, phdInterests, visualIdentity, availability.         |
| F-115 | Data          | MEDIUM   | Hardcoded Stats Will Become Stale                     | Calculated using METRICS and data array lengths.                         |
| F-116 | Theme         | MEDIUM   | connect-section.tsx Uses Raw Color Classes            | Remapped UI variant tokens to standard generic primary/secondary themes. |
| F-120 | Performance   | MEDIUM   | Unnecessary 'use client' on Presentational Components | Stripped boundary tags to restore server rendering.                      |
| F-121 | Architecture  | MEDIUM   | Card/Button Primitives Deviate From shadcn/ui         | Stripped hover and scale boundaries to restore pure shadcn identity.     |
| F-122 | Accessibility | MEDIUM   | CardTitle Renders `<div>` Instead of Heading          | Converted root primitive to standard `<h3>`.                             |
| F-123 | SEO           | MEDIUM   | new Date() Causes Unnecessary Git Diffs               | Static ISO string mapped to freeze the sitemap build node.               |

### Resolved in Phase 4 System Audit Remediation (2026-02-20)

| ID    | Category      | Severity | Title                                                       | Resolution                                                     |
| ----- | ------------- | -------- | ----------------------------------------------------------- | -------------------------------------------------------------- |
| F-099 | Bug           | CRITICAL | Division-by-Zero in IUB Page Average Rating                 | Added defensive guard against length 0.                        |
| F-100 | Security/Data | CRITICAL | PII Hardcoded in Source Code (Phone Number)                 | Replaced with siteConfig references.                           |
| F-101 | Data          | CRITICAL | CV Content Hardcoded (Data Drift Risk)                      | Sourced from dynamic CV data arrays.                           |
| F-102 | Bug           | HIGH     | Contest Countdown Never Ticks                               | Converted to dynamic ticker state with derived calculations.   |
| F-103 | Bug           | HIGH     | Missing 'use client' in collapsible-section.tsx             | Added 'use client' directive.                                  |
| F-104 | Bug           | HIGH     | Missing 'use client' in publication-card.tsx                | Added 'use client' directive.                                  |
| F-105 | SEO/Data      | HIGH     | Structured Data timeRequired: 'P1S' (1 second)              | Changed to 'P16W'.                                             |
| F-106 | Theme         | HIGH     | spotlight-card.tsx Hardcoded Dark Colors                    | Replaced with theme-aware semantic tokens.                     |
| F-107 | Accessibility | HIGH     | collapsible-section.tsx Not Keyboard Accessible             | Replaced div with native semantic button element.              |
| F-108 | Architecture  | HIGH     | Duplicate Metadata in Publications Page and Layout          | Removed duplicated metadata from layout.tsx.                   |
| F-109 | Type Safety   | MEDIUM   | z.any() Bypasses Type Safety in 3 Schema Files              | Replaced with z.custom<LucideIcon>().                          |
| F-110 | Data          | MEDIUM   | TOTAL_STUDENTS: 1000 Contradicts Dynamic Calculation        | Calculated dynamically using getTotalStudentsFromCourses().    |
| F-113 | Theme         | MEDIUM   | darkMode: 'class' vs attribute="data-theme" Mismatch        | Synchronized with next-themes specific selector.               |
| F-118 | Type Safety   | MEDIUM   | Notice Board Type Drifts from Schema                        | Derived directly from CourseData['notices'].                   |
| F-119 | DRY           | MEDIUM   | Course URL Construction Duplicated                          | Extracted to getCoursePath() utility in course-utils.ts.       |
| F-126 | DRY           | MEDIUM   | 11 Identical Error Boundary Files                           | Consolidated using a HOC factory function createErrorBoundary. |
| F-128 | DRY           | LOW      | theme-selector.tsx 335 LOC with 3 Duplicated Variant Blocks | Extracted ThemeCategoryList subcomponent.                      |
| F-129 | Architecture  | LOW      | pdf-viewer.tsx Domain Components in ui/ Primitives          | Moved to shared/components/common/.                            |
| F-140 | DRY           | LOW      | bracu/page.tsx and iub/page.tsx Near-Identical              | Extracted into shared InstitutionCoursesPage.                  |

### Resolved in Session 8 Deep Re-Audit (2026-02-19)

| ID    | Category     | Severity | Title                                                                 | Resolution                                                                                        |
| ----- | ------------ | -------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| F-071 | Quality      | HIGH     | CSS variable mismatch: `--max-content-width` vs `--content-max-width` | Fixed tailwind.config.ts to use `var(--content-max-width)` matching tokens.css                    |
| F-072 | Architecture | HIGH     | Duplicate `sanitizeJsonLd` in structured-data.ts and .tsx             | Removed local copy in .tsx, imports from shared lib                                               |
| F-073 | Architecture | HIGH     | 8 dead `academicEvents` methods in analytics.ts                       | Pruned to 4 wired methods (viewCV, downloadCV, viewPublication, downloadPublication). 138→54 LOC  |
| F-074 | Testing      | HIGH     | Coverage thresholds at 15% — no quality gate                          | Raised to 30% lines/branches/statements, 20% functions                                            |
| F-075 | Architecture | MEDIUM   | Dead `motionPreferences` export in themes.ts (never imported)         | Deleted ~14 LOC                                                                                   |
| F-076 | Quality      | MEDIUM   | Custom `.sr-only` CSS duplicates Tailwind's built-in                  | Removed from tokens.css (~12 LOC)                                                                 |
| F-077 | Testing      | MEDIUM   | `basic.test.ts` placeholder (`1+1=2`) provides zero value             | Replaced with 8 meaningful smoke tests (site config, navigation, themes, analytics exports)       |
| F-078 | Data         | HIGH     | Hardcoded "Spring 2026 Semester" in schedule-table.tsx                | Made `semesterLabel` prop, derived from course `semester` + `year` fields in schedule-section.tsx |
| F-079 | Architecture | MEDIUM   | Hardcoded `baseUrl` in assets.ts (not centralized)                    | Created `SITE_URL` constant in assets.ts, used by both `getAssetUrl()` and `siteConfig.url`       |
| F-080 | Architecture | MEDIUM   | 2 duplicate nav icon maps (profile-sidebar, command-menu)             | Created shared `navIconMap` in `src/shared/lib/nav-icon-map.ts`, both components import it        |
| F-081 | Architecture | LOW      | Garbage `--version/` directory (17 husky scripts) at root             | Deleted                                                                                           |

### Resolved in Phase 4 Deep Audit (2026-02-18)

| ID    | Category      | Severity | Title                                                                      | Resolution                                                                                                              |
| ----- | ------------- | -------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| F-053 | Security      | HIGH     | cv/error.tsx leaks `error.message` to production                           | Replaced hand-rolled Card UI with standard `ErrorFallback` component                                                    |
| F-054 | Quality       | HIGH     | eslint-config-next@15 mismatched with Next.js 16                           | Updated to `^16.1.4`, rewrote eslint.config.mjs to native flat config, removed `@eslint/eslintrc` and `@eslint/js` deps |
| F-055 | Architecture  | HIGH     | Legacy `.husky/_/` directory (17 scripts from Husky v4/v8)                 | Deleted entire directory — modern Husky 9+ does not use it                                                              |
| F-056 | Architecture  | MEDIUM   | analytics.ts: ~200 LOC dead code (performanceTracker, userBehaviorTracker) | Deleted trackers, 5 helper functions, 2 interfaces. 346 to 138 LOC                                                      |
| F-057 | Architecture  | MEDIUM   | courses.ts: 7 unused utility functions never imported                      | Deleted 7 unused exports. 114 to 48 LOC                                                                                 |
| F-058 | Quality       | MEDIUM   | AI traces in comments (comprehensive, world-class, leverage)               | Rewrote JSDoc in 5 files: teaching-stats.ts, course-schema.ts, course page, hero-section, CONTRIBUTING.md               |
| F-059 | Quality       | MEDIUM   | tailwind.config.ts: decorative ASCII, emoji, planned themes banner         | Complete rewrite. Removed all decorative separators, emoji, author/version tags. 251 to 165 LOC                         |
| F-060 | Architecture  | MEDIUM   | next.config.ts: dead `outputFileTracingRoot` and `remotePatterns`          | Removed both — no effect with `output: 'export'` and `unoptimized: true`                                                |
| F-061 | Architecture  | MEDIUM   | Missing error boundary for `/service` route                                | Created `src/app/service/error.tsx` with standard ErrorFallback                                                         |
| F-062 | Quality       | LOW      | TOAST_REMOVE_DELAY = 1000000 (~17 minutes instead of ~10 seconds)          | Changed to 10_000                                                                                                       |
| F-063 | CI/CD         | LOW      | ci.yml runs tests twice (test:run then test:coverage)                      | Removed redundant `test:run` step                                                                                       |
| F-064 | CI/CD         | LOW      | nextjs.yml uses `npm install` instead of `npm ci`                          | Changed to `npm ci --no-audit` for deterministic builds                                                                 |
| F-065 | Documentation | LOW      | README.md stale values (ESLint 8, 13 themes, 109 tests, Zod 4.3)           | Updated: ESLint 9, 6 themes, 129+ tests, Zod 4. Removed stale `npm run start` row                                       |
| F-066 | Architecture  | MEDIUM   | Stale build artifacts (6 tsbuildinfo, coverage/, out/, og-image.svg)       | Deleted all orphan files                                                                                                |
| F-068 | Quality       | MEDIUM   | schedule-table.tsx: 5 inner component definitions (unstable identity)      | Extracted all 5 components to module level                                                                              |
| F-069 | Quality       | MEDIUM   | 3 files use useState+useEffect for mounted detection (anti-pattern)        | Created `useIsClient` hook via `useSyncExternalStore`. Refactored cv-content, time-display, back-to-top                 |
| F-070 | Quality       | LOW      | eslint.config.mjs FlatCompat bridge legacy (unneeded with next@16)         | Rewrote to native flat config imports from `eslint-config-next/*`                                                       |
| F-013 | Performance   | MEDIUM   | Analytics module size (345 LOC)                                            | Resolved by F-056 — pruned to 138 LOC                                                                                   |
| F-027 | Quality       | INFO     | eslint-config-next version mismatch (15 vs 16)                             | Resolved by F-054 — upgraded to ^16.1.4 with native flat config                                                         |

### Resolved in Phase 3 Hardening (2026-02-18)

| ID    | Category      | Severity | Title                                                 | Resolution                                                                                       |
| ----- | ------------- | -------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| F-003 | SEO           | HIGH     | CV page cannot export metadata (`'use client'`)       | Extracted `cv-content.client.tsx`, page is now server with `export const metadata`               |
| F-006 | Accessibility | HIGH     | Keyboard navigation for teaching tabs                 | Confirmed Radix `@radix-ui/react-tabs` provides full keyboard support                            |
| F-007 | SEO           | MEDIUM   | OG image is SVG (social platforms cannot render)      | Converted to 1200x630 PNG, updated `assets.ts`                                                   |
| F-008 | PWA           | MEDIUM   | Missing 192x192 and 512x512 app icons                 | Generated from new `icon.svg`, updated `site.webmanifest`                                        |
| F-026 | Documentation | LOW      | Package version `1.0.0` vs git tag `v1.1.1-stable`    | Bumped to `1.2.0`                                                                                |
| F-047 | Accessibility | LOW      | Hardcoded colors bypass theme in teaching components  | Migrated 12 replacements across 7 files to semantic tokens                                       |
| F-050 | Quality       | LOW      | AI fingerprints and stale docs                        | Removed emoji, AI auditor attribution, AI language, updated humans.txt                           |
| F-051 | Architecture  | MEDIUM   | Non-semantic colors across teaching/shared components | Full migration to semantic tokens                                                                |
| F-052 | Architecture  | MEDIUM   | Missing error boundaries for teaching sub-routes      | Added `error.tsx` for `/teaching/iub`, `/teaching/bracu`, `/teaching/[institution]/[courseCode]` |

### Resolved in Cockpit Audit (2026-02-18)

| ID    | Category      | Severity | Title                                                         | Resolution                                                    |
| ----- | ------------- | -------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| F-001 | Security      | HIGH     | XSS in JSON-LD via raw `JSON.stringify`                       | Added `sanitizeJsonLd()` with HTML entity escaping            |
| F-002 | Security      | HIGH     | Missing HSTS and CSP headers                                  | Added to `public/_headers`                                    |
| F-032 | SEO           | HIGH     | Sitemap includes redirect stubs, missing teaching routes      | Rewrote sitemap with dynamic course generation                |
| F-033 | SEO           | MEDIUM   | Bogus SearchAction in structured data                         | Removed (no /search page exists)                              |
| F-034 | SEO           | MEDIUM   | Incomplete OpenGraph metadata                                 | Added type, locale, siteName, description, url, Twitter cards |
| F-035 | Data          | MEDIUM   | Structured data image path wrong                              | Fixed to use `assetPaths.profile`                             |
| F-036 | A11Y          | MEDIUM   | Skip-link `tabIndex={1}` (WCAG anti-pattern)                  | Changed to `tabIndex={0}`                                     |
| F-037 | A11Y          | MEDIUM   | PDF viewer hardcoded colors bypass theme                      | Replaced with theme tokens                                    |
| F-038 | Perf          | LOW      | `teaching-cta.tsx` unnecessary `'use client'`                 | Removed directive                                             |
| F-039 | Perf          | LOW      | `footer-year.tsx` unnecessary `'use client'`                  | Removed directive                                             |
| F-040 | Quality       | LOW      | Console statements in production code                         | Guarded behind `process.env.NODE_ENV !== 'production'`        |
| F-041 | Quality       | LOW      | Double-redirect chain (/service to /service-awards to /about) | Direct redirect to `/about#honors-awards`                     |
| F-042 | Quality       | LOW      | 7 `target="_blank"` links missing `rel="noopener noreferrer"` | Fixed all 7 instances                                         |
| F-043 | Quality       | LOW      | Test asserting buggy `tabIndex={1}` behavior                  | Updated test to expect `tabIndex={0}`                         |
| F-009 | Architecture  | MEDIUM   | 614-line monolithic `schemas.ts`                              | Split into 7 domain modules + barrel                          |
| F-011 | Architecture  | MEDIUM   | 13 themes (695 LOC) overengineered                            | Reduced to 6 themes, saved ~308 LOC                           |
| F-012 | Architecture  | MEDIUM   | Empty publications feature module                             | Deleted dead re-export                                        |
| F-014 | Architecture  | MEDIUM   | 19 barrel files hurt tree-shaking                             | Removed 10 dead barrels, kept 8 healthy                       |
| F-017 | Architecture  | LOW      | Unused FooterYear component                                   | Deleted dead code                                             |
| F-019 | Architecture  | LOW      | ThemeSelector bloated by 13 themes                            | Reduced to 6, removed 7 icon imports                          |
| F-024 | Accessibility | LOW      | 13 themes = 26 contrast combos                                | Reduced to 6 themes, manageable audit scope                   |
| F-045 | Documentation | INFO     | Cockpit docs had 30+ stale data points                        | Full cross-validation and sync of all cockpit documents       |
| F-046 | Architecture  | LOW      | Empty `src/features/publications/` directory                  | Deleted empty directory                                       |

### Previously Acceptable (No Action Needed)

| ID    | Category | Severity | Title                                               | Reason                                                    |
| ----- | -------- | -------- | --------------------------------------------------- | --------------------------------------------------------- |
| F-044 | Security | INFO     | npm audit: 20 vulnerabilities (1 moderate, 19 high) | ajv is dev-only; Next.js vulns mitigated by static export |
