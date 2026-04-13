# .cockpit — Project Central Intelligence

> **Last Updated**: 2026-04-12
> **Project**: mdasifbinkhaled.github.io — Academic Portfolio
> **Version**: 1.5.0 | **Stack**: Next.js 16.1.4 · React 19 · TypeScript 5.9 · Tailwind 4.1.18

## Quick Navigation

| Document                       | Purpose                                                    |
| ------------------------------ | ---------------------------------------------------------- |
| [INDEX.md](INDEX.md)           | This file — navigation hub                                 |
| [PMD.md](PMD.md)               | Project Master Document — architecture, metrics, decisions |
| [ISSUES.md](ISSUES.md)         | Active findings tracker (275 findings, 5 open)             |
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
    Unit:       368/368 PASS (41 files, 50%+ coverage)
    E2E:        49 tests × 3 browsers = 147 runs (143 passed, 4 skipped — /cv a11y flaky F-260)
    Build:      25 HTML pages / 27 routes exported (0 warnings)
    Format:     All files formatted
    Commit:     (pending — 2 open findings)

## Findings Summary

    Total:    275 findings (265 resolved, 2 open, 3 false positives, 5 reassessed)
    CRITICAL:   4 (0 open)
    HIGH:      32 (1 open)
    MEDIUM:    85 (1 open)
    LOW:      104 (0 open)
    INFO:      32 (0 open)

## Phase Status

See [ROADMAP.md](ROADMAP.md) for the full improvement plan.

**Phase 6 (Code Quality): COMPLETED**
**Phase 7 (Student Apps): COMPLETED** — 5/5 tools live (Grade Calculator, Seat Planner, GPA Calculator, Office Hours, Exam Countdown). PDF Study Aid deferred.
**Phase 8 (Modern Web): COMPLETED** — View transitions, container queries, content-visibility, SEO enhancements.
**Phase 9 (Testing): COMPLETED** — Playwright E2E + axe-core + smoke render tests + strict 50% coverage wired in CI.
**Phase 10 (Content): IN PROGRESS** — Blog (MDX) and Talks pages live. Mentorship section infrastructure in place (empty state). Research timeline and Bengali intro deferred.
**Phase 11 (Monitoring): IN PROGRESS** — Sentry error tracking and Google Analytics wired. Uptime monitoring pending.

- 368/368 unit tests passing (41 files) + 49 E2E tests passing.
- 25 HTML pages / 27 routes exported.
- Blog system with MDX and frontmatter.
- Sentry client-side error tracking (lazy-loaded client component).
- Google Analytics via `@next/third-parties`.

## Project Vitals

| Metric            | Value                  |
| ----------------- | ---------------------- |
| Source files      | 223                    |
| Lines of code     | 17,186                 |
| Client components | 59 of 148 (.tsx)       |
| Server components | 89 of 148 (.tsx)       |
| Custom hooks      | 4                      |
| Data files        | 32                     |
| Config files      | 6                      |
| Barrel exports    | 19                     |
| Test files        | 45 (41 unit + 4 E2E)   |
| Themes            | 6                      |
| ADRs              | 2 (ADR-005 + template) |

## Architecture Layers (LOC Distribution)

    shared/    8,108 LOC (47%) — Infrastructure, data, UI primitives
    features/  7,091 LOC (41%) — Feature modules (teaching, about, research, home, apps)
    app/       1,987 LOC (12%) — Page routes and layouts
    styles/      247 LOC  (1%) — Design tokens + globals
