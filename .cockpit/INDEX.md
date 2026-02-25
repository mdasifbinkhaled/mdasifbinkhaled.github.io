# .cockpit — Project Central Intelligence

> **Last Updated**: 2026-02-25
> **Project**: mdasifbinkhaled.github.io — Academic Portfolio
> **Version**: 1.3.0 | **Stack**: Next.js 16.1.4 · React 19 · TypeScript 5.6 · Tailwind 3.4

## Quick Navigation

| Document                       | Purpose                                                    |
| ------------------------------ | ---------------------------------------------------------- |
| [INDEX.md](INDEX.md)           | This file — navigation hub                                 |
| [PMD.md](PMD.md)               | Project Master Document — architecture, metrics, decisions |
| [ISSUES.md](ISSUES.md)         | Active findings tracker (228 findings, 0 open)             |
| [ROADMAP.md](ROADMAP.md)       | Improvement roadmap — Phases 7-11 (27 items)               |
| [STRUCTURE.md](STRUCTURE.md)   | Annotated file tree with LOC and responsibilities          |
| [HISTORY.md](HISTORY.md)       | Development timeline and milestones                        |
| [GOVERNANCE.md](GOVERNANCE.md) | Code standards, review process, conventions                |
| [PACKAGING.md](PACKAGING.md)   | Dependencies, build, deployment, CI, SEO, PWA, analytics   |
| [RELEASES.md](RELEASES.md)     | Version history and changelog                              |
| [adr/](adr/)                   | Architecture Decision Records (ADR-005 + template)         |

## Health Dashboard

    Typecheck:  PASS (0 errors, strict, zero `any`)
    Lint:       PASS (0 errors, 0 warnings)
    Tests:      149/149 PASS (21 files)
    Build:      20 pages exported (0 warnings)
    Format:     All files formatted
    Commit:     b612559 (0 open findings)

## Findings Summary

    Total:    228 findings (225 resolved, 0 open, 3 false positives)
    CRITICAL:   4 (0 open)
    HIGH:      30 (0 open)
    MEDIUM:    68 (0 open)
    LOW:       79 (0 open)
    INFO:      38 (0 open)

## Next Phase: Phase 7 Student Apps (Partially Complete)

See [ROADMAP.md](ROADMAP.md) for the full improvement plan.

**Phase 7 Status:**

1. **Grade Calculator**: Done — per-course weighted grade projection at /apps/grade-calculator/.
2. **Seat Plan Generator**: Planned — upload student list, generate layout.
3. **GPA Calculator**: Planned — multi-course semester GPA computation.

**Phase 6 (Code Quality): COMPLETED**
**Phase 8 (Modern Web): COMPLETED** — View transitions, container queries, logic isolation, content-visibility.
**Phase 9 (Testing): 2/6 DONE** — Playwright E2E + axe-core added.

- 149/149 tests passing (21 files).
- Legacy code and unused files removed.
- Framer Motion dependency eliminated (5.3 MB saved).
- Structural SEO semantics deployed.

## Project Vitals

| Metric            | Value                  |
| ----------------- | ---------------------- |
| Source files      | 201                    |
| Lines of code     | 13,951                 |
| Client components | 48 of 125 (.tsx)       |
| Server components | 77 of 125 (.tsx)       |
| Custom hooks      | 3                      |
| Data files        | 30                     |
| Config files      | 10                     |
| Barrel exports    | 14                     |
| Test files        | 22                     |
| Themes            | 6                      |
| ADRs              | 2 (ADR-005 + template) |

## Architecture Layers (LOC Distribution)

    shared/    7,865 LOC (57%) — Infrastructure, data, UI primitives
    features/  4,234 LOC (31%) — Feature modules (teaching, about, research, home, apps)
    app/       1,498 LOC (11%) — Page routes and layouts
    styles/      247 LOC  (2%) — Design tokens + globals
