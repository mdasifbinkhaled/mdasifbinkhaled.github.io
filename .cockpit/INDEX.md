# .cockpit — Project Central Intelligence

> **Last Updated**: 2026-04-21
> **Project**: mdasifbinkhaled.github.io — Academic Portfolio
> **Version**: 1.5.0 | **Stack**: Next.js 16.1.4 · React 19 · TypeScript 5.9 · Tailwind 4.1.18

## Quick Navigation

| Document                           | Purpose                                                    |
| ---------------------------------- | ---------------------------------------------------------- |
| [INDEX.md](INDEX.md)               | This file — navigation hub                                 |
| [PMD.md](PMD.md)                   | Project Master Document — architecture, metrics, decisions |
| [ISSUES.md](ISSUES.md)             | Active findings tracker                                    |
| [ROADMAP.md](ROADMAP.md)           | Improvement roadmap — Phases 7-12                          |
| [STRUCTURE.md](STRUCTURE.md)       | Annotated file tree with LOC and responsibilities          |
| [HISTORY.md](HISTORY.md)           | Development timeline and milestones                        |
| [GOVERNANCE.md](GOVERNANCE.md)     | Code standards, review process, conventions                |
| [PACKAGING.md](PACKAGING.md)       | Dependencies, build, deployment, CI, SEO, PWA, analytics   |
| [RELEASES.md](RELEASES.md)         | Version history and changelog                              |
| [adr/](adr/)                       | ADR-005, ADR-006, ADR-007 (apps I/O redesign)              |
| [uptime-robot.md](uptime-robot.md) | UptimeRobot monitor configuration                          |

## Health Dashboard

    Typecheck:  PASS (0 errors, strict, zero `any`)
    Lint:       PASS (0 errors, 0 warnings)
    Unit:       408/408 PASS (46 files)
    Coverage:   Thresholds 64% lines · 81% branches · 54% funcs · 64% stmts (enforced in vitest.config.mts)
    E2E:        49/49 PASS (chromium primary; firefox + mobile-safari best-effort)
    Build:      25 HTML pages / 27 routes exported + 111 files precached (Workbox, 5477 KB)
    Format:     All files formatted
    Phase:      Phase 12 (Apps I/O redesign) — Phase 1/3 complete

## Findings Summary

    Total:    275 findings (265 resolved, 2 open, 3 false positives, 5 reassessed)
    CRITICAL:   4 (0 open)
    HIGH:      32 (1 open)   — F-264 supply-chain watch (quarterly review)
    MEDIUM:    85 (1 open)   — F-260 /cv a11y flaky under local parallel (hardened)
    LOW:      104 (0 open)
    INFO:      32 (0 open)

## Phase Status

See [ROADMAP.md](ROADMAP.md) for the full improvement plan.

**Phase 6 (Code Quality): COMPLETED**
**Phase 7 (Student Apps): COMPLETED** — 7 tools live (Grade Calculator, GPA Calculator, Seat Planner, Office Hours, Exam Countdown, Study Timer, Course Planner). Item 7.6 (PDF Study Aid via WebLLM) deferred until a WebGPU adoption trigger.
**Phase 8 (Modern Web): COMPLETED** — View transitions, container queries, content-visibility, SEO enhancements.
**Phase 9 (Testing): COMPLETED** — Playwright E2E + axe-core + smoke render tests + 64% coverage floor wired in CI.
**Phase 10 (Content): IN PROGRESS** — Blog (MDX) and Talks pages live. Mentorship section infrastructure in place (empty state). 10.2 (Research timeline) and 10.5 (Bengali intro) deferred with explicit triggers.
**Phase 11 (Monitoring): IN PROGRESS** — Sentry error tracking and Google Analytics wired. 11.3 (Search/filter analytics) deferred until GA traffic baseline > 500 sessions/mo. 11.4 (Uptime monitoring) — configuration guide in [uptime-robot.md](uptime-robot.md); external UptimeRobot monitor activated.

- 368/368 unit tests passing (41 files) + 49 E2E tests passing.
- 25 HTML pages / 27 routes exported.
- Blog system with MDX and frontmatter.
- Sentry client-side error tracking (lazy-loaded client component).
- Google Analytics via `@next/third-parties`.

## Deferred Triggers Watchlist

The following roadmap items are deferred pending external data triggers. These should be reviewed **quarterly** alongside the F-264 security dependency audit (Next review: **2026-07-17**).

| Item     | Feature           | Trigger Condition                                                  | Data Source                       |
| :------- | :---------------- | :----------------------------------------------------------------- | :-------------------------------- |
| **7.6**  | PDF Study Aid     | WebGPU in ≥ 90% sessions OR capable small on-device model released | GA4 client capabilities / AI news |
| **10.2** | Research Timeline | Second peer-reviewed publication accepted in same research area    | Owner's academic pipeline         |
| **10.5** | Bengali Intro     | `bn-BD` visitors exceed 10% for two consecutive months             | GA4 `language` dimension          |
| **11.3** | Search Analytics  | Total site traffic exceeds 500 sessions/month                      | GA4 total sessions                |

## Project Vitals

| Metric            | Value                |
| ----------------- | -------------------- |
| Source files      | 223                  |
| Lines of code     | 17,186               |
| Client components | 59 of 148 (.tsx)     |
| Server components | 89 of 148 (.tsx)     |
| Custom hooks      | 4                    |
| Data files        | 32                   |
| Config files      | 6                    |
| Barrel exports    | 19                   |
| Test files        | 45 (41 unit + 4 E2E) |
| Themes            | 6                    |
| ADRs              | 2 (ADR-005, ADR-006) |

## Architecture Layers (LOC Distribution)

    shared/    8,108 LOC (47%) — Infrastructure, data, UI primitives
    features/  7,091 LOC (41%) — Feature modules (teaching, about, research, home, apps)
    app/       1,987 LOC (12%) — Page routes and layouts
    styles/      247 LOC  (1%) — Design tokens + globals
