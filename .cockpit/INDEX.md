# .cockpit — Project Central Intelligence

> **Last Updated**: 2026-04-08
> **Project**: mdasifbinkhaled.github.io — Academic Portfolio
> **Version**: 1.5.0 | **Stack**: Next.js 16.1.4 · React 19 · TypeScript 5.6 · Tailwind 3.4

## Quick Navigation

| Document                       | Purpose                                                    |
| ------------------------------ | ---------------------------------------------------------- |
| [INDEX.md](INDEX.md)           | This file — navigation hub                                 |
| [PMD.md](PMD.md)               | Project Master Document — architecture, metrics, decisions |
| [ISSUES.md](ISSUES.md)         | Active findings tracker (235 findings, 0 open)             |
| [ROADMAP.md](ROADMAP.md)       | Improvement roadmap — Phases 7-11 (26 items)               |
| [STRUCTURE.md](STRUCTURE.md)   | Annotated file tree with LOC and responsibilities          |
| [HISTORY.md](HISTORY.md)       | Development timeline and milestones                        |
| [GOVERNANCE.md](GOVERNANCE.md) | Code standards, review process, conventions                |
| [PACKAGING.md](PACKAGING.md)   | Dependencies, build, deployment, CI, SEO, PWA, analytics   |
| [RELEASES.md](RELEASES.md)     | Version history and changelog                              |
| [adr/](adr/)                   | Architecture Decision Records (ADR-005 + template)         |

## Health Dashboard

    Typecheck:  PASS (0 errors, strict, zero `any`)
    Lint:       PASS (0 errors, 0 warnings)
    Tests:      204/204 PASS (32 files, 50%+ coverage)
    Build:      27 pages exported (0 warnings)
    Format:     All files formatted
    Commit:     (pending — 0 open findings)

## Findings Summary

    Total:    235 findings (227 resolved, 0 open, 3 false positives, 5 reassessed)
    CRITICAL:   4 (0 open)
    HIGH:      31 (0 open)
    MEDIUM:    70 (0 open)
    LOW:       86 (0 open)
    INFO:      26 (0 open)

## Phase Status

See [ROADMAP.md](ROADMAP.md) for the full improvement plan.

**Phase 6 (Code Quality): COMPLETED**
**Phase 7 (Student Apps): COMPLETED** — 5/5 tools live (Grade Calculator, Seat Planner, GPA Calculator, Office Hours, Exam Countdown). PDF Study Aid deferred.
**Phase 8 (Modern Web): COMPLETED** — View transitions, container queries, content-visibility, SEO enhancements.
**Phase 9 (Testing): COMPLETED** — Playwright E2E + axe-core + smoke render tests + strict 50% coverage wired in CI.
**Phase 10 (Content): IN PROGRESS** — Blog (MDX) and Talks pages live. Mentorship section infrastructure in place (empty state). Research timeline and Bengali intro deferred.
**Phase 11 (Monitoring): IN PROGRESS** — Sentry error tracking and Google Analytics wired. Uptime monitoring pending.

- 204/204 tests passing (32 files).
- 27 pages exported.
- Blog system with MDX and frontmatter.
- Sentry client-side error tracking (lazy-loaded client component).
- Google Analytics via `@next/third-parties`.

## Project Vitals

| Metric            | Value                   |
| ----------------- | ----------------------- |
| Source files      | 219                     |
| Lines of code     | 17,186                  |
| Client components | 62 of 150 (.tsx)        |
| Server components | 88 of 150 (.tsx)        |
| Custom hooks      | 3 (+1 feature-specific) |
| Data files        | 32                      |
| Config files      | 6                       |
| Barrel exports    | 8                       |
| Test files        | 32                      |
| Themes            | 6                       |
| ADRs              | 2 (ADR-005 + template)  |

## Architecture Layers (LOC Distribution)

    shared/    8,108 LOC (47%) — Infrastructure, data, UI primitives
    features/  7,091 LOC (41%) — Feature modules (teaching, about, research, home, apps)
    app/       1,987 LOC (12%) — Page routes and layouts
    styles/      247 LOC  (1%) — Design tokens + globals
