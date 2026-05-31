# .cockpit — Project Central Intelligence

> **Last Updated**: 2026-05-26 (v1.5.3 final forensic closeout: next@16.2.6 security upgrade, detailed-course WCAG AA contrast fix, Study Timer pause regression fix, CI/CD hardening, docs truth-sync)
> **Project**: mdasifbinkhaled.github.io — Academic Portfolio
> **Version**: 1.5.3 | **Stack**: Next.js 16.2.6 · React 19.2.6 · TypeScript 6.0.3 · Tailwind 4.2.4

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
    Unit:       491/491 PASS (60 files)
    Coverage:   74.56% lines · 81.91% branches · 63.65% funcs · 74.56% stmts (thresholds 70/81/60/70)
    E2E:        59/59 Chromium PASS; Firefox + mobile-safari pass / skips per fixtures
    Build:      28 HTML pages exported (30 prerendered routes) + 118 files precached (custom SW, 7463.2 KB)
    Format:     All files formatted
    Phase:      Roadmap Phases 7-12 complete; Phase 13 partially complete

## Findings Summary

    Total:    289 findings (280 resolved, 1 open, 3 false positives, 5 reassessed)
    CRITICAL:   4 (0 open)
    HIGH:      33 (0 open)   — F-264 Next.js advisory CLOSED by next@16.2.6 (0 vulnerabilities)
    MEDIUM:    89 (1 open)   — F-260 /cv a11y flaky under local parallel (hardened, watched)
    LOW:      108 (0 open)
    INFO:      32 (0 open)

## Phase Status

See [ROADMAP.md](ROADMAP.md) for the full improvement plan.

**Phase 6 (Code Quality): COMPLETED**
**Phase 7 (Student Apps): COMPLETED** — 8 tools live (Grade Calculator, GPA Calculator, Seat Planner, Office Hours, Exam Countdown, Study Timer, Course Planner, PDF Study Aid). The study aid ships as a deterministic browser-local PDF workflow; no WebLLM, WebGPU, or API key required.
**Phase 8 (Modern Web): COMPLETED** — View transitions, container queries, content-visibility, SEO enhancements.
**Phase 9 (Testing): COMPLETED** — Playwright E2E + axe-core + smoke render tests + 70/81/60/70 coverage floor wired in CI.
**Phase 10 (Content): COMPLETED** — Blog (MDX), Talks, mentorship, research timeline, and the bilingual About introduction are live.
**Phase 11 (Monitoring): COMPLETED** — Sentry error tracking, Google Analytics page views, publications filter telemetry, command-palette telemetry, and UptimeRobot monitoring are all live.
**Phase 12 (Apps Hub I/O): COMPLETED** — shared import, storage, export, stats, and settings primitives rolled out; Seat Planner now ships the redesigned workflow shell, resilient reallocation, flexible room ingest, bulk faculty tools, and PDF/PNG/print exports; GPA transcript, Course CSV/XLSX, and Exam CSV/XLSX imports live.

- 491/491 unit tests passing (60 files), with Chromium gated in CI and Firefox/WebKit automated separately.
- 28 HTML pages exported (30 prerendered routes) and precached for static deployment.
- Blog system with MDX and frontmatter.
- Sentry client-side error tracking (lazy-loaded client component).
- Google Analytics via `@next/third-parties`.

## Deferred Triggers Watchlist

All previously deferred roadmap items (`7.6`, `10.2`, `10.5`, `11.3`) shipped on 2026-04-21. Watchlist remains relevant for the two open findings only: F-260 (`/cv` accessibility stability) and F-264 (upstream Next.js advisory cadence). Next reviews: **F-260 2026-07-17**, **F-264 weekly until a fixed Next 16 patch is published**.

## Project Vitals

| Metric              | Value                           |
| ------------------- | ------------------------------- |
| Source files        | 273                             |
| Lines of code       | 27,547                          |
| Source `.tsx` files | 170                             |
| Test files          | 64 executable (60 unit + 4 E2E) |
| Runtime deps        | 29                              |
| Dev deps            | 25                              |
| ADRs                | 3 (ADR-005, ADR-006, ADR-007)   |

## Architecture Layers (LOC Distribution)

    shared/   10,610 LOC (39%) — Infrastructure, data, UI primitives
    features/ 14,414 LOC (52%) — Feature modules (teaching, about, research, home, apps)
    app/       2,291 LOC  (8%) — Page routes and layouts
    styles/      232 LOC  (1%) — Design tokens + globals
