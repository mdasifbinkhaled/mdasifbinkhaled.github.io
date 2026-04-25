# .cockpit — Project Central Intelligence

> **Last Updated**: 2026-04-25
> **Project**: mdasifbinkhaled.github.io — Academic Portfolio
> **Version**: 1.5.0 | **Stack**: Next.js 16.2.3 · React 19 · TypeScript 5.9 · Tailwind 4.1.18

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
    Unit:       473/473 PASS (57 files)
    Coverage:   72.23% lines · 81.71% branches · 63.07% funcs · 72.23% stmts (thresholds 64/81/54/64)
    E2E:        Chromium is the fast CI gate; Firefox + mobile-safari run in Cross-Browser E2E on main/manual
    Build:      30 HTML pages generated + 118 files precached (Workbox, 7664.5 KB)
    Format:     All files formatted
    Phase:      Roadmap Phases 7-12 — complete (all tracked items done)

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
**Phase 7 (Student Apps): COMPLETED** — 8 tools live (Grade Calculator, GPA Calculator, Seat Planner, Office Hours, Exam Countdown, Study Timer, Course Planner, PDF Study Aid). The study aid ships as a deterministic browser-local PDF workflow; no WebLLM, WebGPU, or API key required.
**Phase 8 (Modern Web): COMPLETED** — View transitions, container queries, content-visibility, SEO enhancements.
**Phase 9 (Testing): COMPLETED** — Playwright E2E + axe-core + smoke render tests + 64% coverage floor wired in CI.
**Phase 10 (Content): COMPLETED** — Blog (MDX), Talks, mentorship, research timeline, and the bilingual About introduction are live.
**Phase 11 (Monitoring): COMPLETED** — Sentry error tracking, Google Analytics page views, publications filter telemetry, command-palette telemetry, and UptimeRobot monitoring are all live.
**Phase 12 (Apps Hub I/O): COMPLETED** — shared import, storage, export, stats, and settings primitives rolled out; Seat Planner now ships the redesigned workflow shell, resilient reallocation, flexible room ingest, bulk faculty tools, and PDF/PNG/print exports; GPA transcript, Course CSV/XLSX, and Exam CSV/XLSX imports live.

- 473/473 unit tests passing (57 files), with Chromium gated in CI and Firefox/WebKit automated separately.
- 30 HTML pages generated and precached for static deployment.
- Blog system with MDX and frontmatter.
- Sentry client-side error tracking (lazy-loaded client component).
- Google Analytics via `@next/third-parties`.

## Deferred Triggers Watchlist

All previously deferred roadmap items (`7.6`, `10.2`, `10.5`, `11.3`) shipped on 2026-04-21. Quarterly review remains relevant for the two open findings only: F-260 (`/cv` accessibility stability) and F-264 (dependency advisory cadence). Next review: **2026-07-17**.

## Project Vitals

| Metric              | Value                         |
| ------------------- | ----------------------------- |
| Source files        | 272                           |
| Lines of code       | 26,397                        |
| Source `.tsx` files | 170                           |
| Test files          | 61 (57 unit + 4 E2E)          |
| Runtime deps        | 29                            |
| Dev deps            | 28                            |
| ADRs                | 3 (ADR-005, ADR-006, ADR-007) |

## Architecture Layers (LOC Distribution)

    shared/   10,732 LOC (41%) — Infrastructure, data, UI primitives
    features/ 13,150 LOC (50%) — Feature modules (teaching, about, research, home, apps)
    app/       2,283 LOC  (9%) — Page routes and layouts
    styles/      232 LOC  (1%) — Design tokens + globals
