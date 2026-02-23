# .cockpit — Project Central Intelligence

> **Last Updated**: 2026-02-24
> **Project**: mdasifbinkhaled.github.io — Academic Portfolio
> **Version**: 1.2.0 | **Commit**: 8d4953d | **Stack**: Next.js 16.1.4 · React 19 · TypeScript 5.6 · Tailwind 3.4

## Quick Navigation

| Document                         | Purpose                                                    |
| -------------------------------- | ---------------------------------------------------------- |
| [INDEX.md](INDEX.md)             | This file — navigation hub                                 |
| [PMD.md](PMD.md)                 | Project Master Document — architecture, metrics, decisions |
| [ISSUES.md](ISSUES.md)           | Active findings tracker (228 findings, 0 open)             |
| [ROADMAP.md](ROADMAP.md)         | Improvement roadmap — Phases 7-11 (27 items)               |
| [STRUCTURE.md](STRUCTURE.md)     | Annotated file tree with LOC and responsibilities          |
| [HISTORY.md](HISTORY.md)         | Development timeline and milestones                        |
| [GOVERNANCE.md](GOVERNANCE.md)   | Code standards, review process, conventions                |
| [PACKAGING.md](PACKAGING.md)     | Dependencies, build pipeline, deployment                   |
| [RELEASES.md](RELEASES.md)       | Version history and changelog                              |
| [PUBLICATION.md](PUBLICATION.md) | Deployment, hosting, and distribution details              |
| [SKILL.md](SKILL.md)             | Forensic code audit skill definition (240+ checks)         |
| [adr/](adr/)                     | Architecture Decision Records (ADR-005 + template)         |

## Health Dashboard

    Typecheck:  PASS (0 errors, strict, zero `any`)
    Lint:       PASS (0 errors, 0 warnings)
    Tests:      153/153 PASS (23 files)
    Build:      20 pages exported (0 warnings)
    Format:     All files formatted
    Commit:     8d4953d (0 open findings)

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
**Phase 8 (Modern Web): 3/6 DONE** — Service worker + Lighthouse CI + Framer Motion removed (replaced with vanilla JS).
**Phase 9 (Testing): 2/6 DONE** — Playwright E2E + axe-core added.

- 153/153 tests passing (23 files).
- Legacy code and unused files removed.
- Framer Motion dependency eliminated (5.3 MB saved).

## Project Vitals

| Metric            | Value                  |
| ----------------- | ---------------------- |
| Source files      | 195                    |
| Lines of code     | 14,388                 |
| Client components | 49 of 130 (.tsx)       |
| Server components | 81 of 130 (.tsx)       |
| Custom hooks      | 4                      |
| Data files        | 30                     |
| Config files      | 10                     |
| Barrel exports    | 15                     |
| Test files        | 23                     |
| Themes            | 6                      |
| ADRs              | 2 (ADR-005 + template) |

## Architecture Layers (LOC Distribution)

    shared/    7,865 LOC (55%) — Infrastructure, data, UI primitives
    features/  4,778 LOC (33%) — Feature modules (teaching, about, research, academic, home, apps)
    app/       1,385 LOC (10%) — Page routes and layouts
    styles/      247 LOC  (2%) — Design tokens + globals
