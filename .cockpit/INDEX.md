# .cockpit — Project Central Intelligence

> **Last Updated**: 2026-02-21
> **Project**: mdasifbinkhaled.github.io — Academic Portfolio
> **Version**: 1.2.0 | **Commit**: 0cc9fa6 | **Stack**: Next.js 16.1.4 · React 19 · TypeScript 5.6 · Tailwind 3.4

## Quick Navigation

| Document                         | Purpose                                                    |
| -------------------------------- | ---------------------------------------------------------- |
| [INDEX.md](INDEX.md)             | This file — navigation hub                                 |
| [PMD.md](PMD.md)                 | Project Master Document — architecture, metrics, decisions |
| [ISSUES.md](ISSUES.md)           | Active findings tracker (152 findings, 0 open)             |
| [ROADMAP.md](ROADMAP.md)         | Improvement roadmap — Phases 7-11 (27 items)               |
| [STRUCTURE.md](STRUCTURE.md)     | Annotated file tree with LOC and responsibilities          |
| [HISTORY.md](HISTORY.md)         | Development timeline and milestones                        |
| [GOVERNANCE.md](GOVERNANCE.md)   | Code standards, review process, conventions                |
| [PACKAGING.md](PACKAGING.md)     | Dependencies, build pipeline, deployment                   |
| [RELEASES.md](RELEASES.md)       | Version history and changelog                              |
| [PUBLICATION.md](PUBLICATION.md) | Deployment, hosting, and distribution details              |
| [adr/](adr/)                     | Architecture Decision Records (ADR-005 + template)         |

## Health Dashboard

    Typecheck:  PASS (0 errors)
    Lint:       PASS (0 errors)
    Tests:      143/143 PASS (23 files)
    Build:      20 pages exported
    Format:     All files formatted
    Commit:     0cc9fa6 (0 open findings)

## Findings Summary

    Total:    152 findings (152 resolved, 0 open)
    CRITICAL:   3 (0 open)
    HIGH:      30 (0 open)
    MEDIUM:    55 (0 open)
    LOW:       40 (0 open)
    INFO:      24 (0 open)

## Next Phase: Phase 7 Student Apps (Partially Complete)

See [ROADMAP.md](ROADMAP.md) for the full improvement plan.

**Phase 7 Status:**

1. **Grade Calculator**: Done — per-course weighted grade projection at /apps/grade-calculator/.
2. **Seat Plan Generator**: Planned — upload student list, generate layout.
3. **GPA Calculator**: Planned — multi-course semester GPA computation.

**Phase 6 (Code Quality): COMPLETED**
**Phase 8 (Modern Web): 2/6 DONE** — Service worker + Lighthouse CI added.
**Phase 9 (Testing): 2/6 DONE** — Playwright E2E + axe-core added.

- 143/143 tests passing (23 files).
- Legacy code and unused files removed.

## Project Vitals

| Metric            | Value            |
| ----------------- | ---------------- |
| Source files      | 187              |
| Lines of code     | 14,495           |
| Client components | 54 of 131 (.tsx) |
| Server components | 77 of 131 (.tsx) |
| Data files        | 28               |
| Config files      | 7                |
| Barrel exports    | 9                |
| Test files        | 23               |
| Themes            | 6                |
| ADRs              | 2 (ADR-005 + template) |

## Architecture Layers (LOC Distribution)

    shared/    8,367 LOC (58%) — Infrastructure, data, UI primitives
    features/  4,546 LOC (31%) — Feature modules (teaching, about, research, academic, home, apps)
    app/       1,582 LOC (11%) — Page routes and layouts
    styles/      248 LOC  (2%) — Design tokens + globals
