# .cockpit — Project Central Intelligence

> **Last Updated**: 2026-02-21 (Phase 8.6 Completion)
> **Project**: mdasifbinkhaled.github.io — Academic Portfolio
> **Version**: 1.2.0 | **Commit**: Latest | **Stack**: Next.js 16.1.4 · React 19 · TypeScript 5.6 · Tailwind 3.4

## Quick Navigation

| Document                         | Purpose                                                    |
| -------------------------------- | ---------------------------------------------------------- |
| [INDEX.md](INDEX.md)             | This file — navigation hub                                 |
| [PMD.md](PMD.md)                 | Project Master Document — architecture, metrics, decisions |
| [ISSUES.md](ISSUES.md)           | Active findings tracker (152 findings, 0 open)             |
| [ROADMAP.md](ROADMAP.md)         | Improvement roadmap — Phases 6-10 (27 items)               |
| [STRUCTURE.md](STRUCTURE.md)     | Annotated file tree with LOC and responsibilities          |
| [HISTORY.md](HISTORY.md)         | Development timeline and milestones                        |
| [GOVERNANCE.md](GOVERNANCE.md)   | Code standards, review process, conventions                |
| [PACKAGING.md](PACKAGING.md)     | Dependencies, build pipeline, deployment                   |
| [RELEASES.md](RELEASES.md)       | Version history and changelog                              |
| [PUBLICATION.md](PUBLICATION.md) | Deployment, hosting, and distribution details              |
| [adr/](adr/)                     | Architecture Decision Records (ADR-001 through ADR-005)    |

## Health Dashboard

```
Typecheck:  ✅ PASS (0 errors)
Lint:       ✅ PASS (0 errors)
Tests:      ✅ 140/140 PASS (21 files)
Build:      ✅ 18 pages exported
Format:     ✅ All files formatted
Commit:     ✅ SOTA Cleanup Master (0 open findings)
```

## Findings Summary

```
Total:    152 findings (152 resolved, 0 open)
CRITICAL:   3 (0 open)  — ALL RESOLVED
HIGH:      30 (0 open)  — ALL RESOLVED
MEDIUM:    55 (0 open)  — ALL RESOLVED
LOW:       40 (0 open)  — ALL RESOLVED
INFO:      24 (0 open)  — ALL RESOLVED
```

## Next Phase: Phase 9 Student Tools Feature Development

See [ROADMAP.md](ROADMAP.md) for the full improvement plan.

**Immediate Priorities (Phase 9):**

1. **Grade Calculator**: Build per-course weighted grade projection component.
2. **Seat Plan Generator**: Implement student list upload and layout generation.
3. **GPA Calculator**: Create multi-course semester GPA computation tool.

**Phases 6-8 (Testing, Modern Web, CI/CD, Tech Debt): COMPLETED ✅**

- SOTA Axe-Core accessibility bounds and Lighthouse gating implemented.
- End-to-End Playwright coverage injected.
- All legacy code and garbage files systematically eradicated.
- Tests hydrated to 140/140 pure specs.

## Project Vitals

| Metric            | Value            |
| ----------------- | ---------------- |
| Source files      | 174              |
| Lines of code     | 14,820           |
| Client components | 48 of 110 (.tsx) |
| Server components | 62 of 110 (.tsx) |
| Data files        | 28               |
| Config files      | 7                |
| Barrel exports    | 8                |
| Test files        | 22               |
| Themes            | 6                |
| ADRs              | 5 (001-005)      |

## Architecture Layers (LOC Distribution)

```
shared/    8,640 LOC (58%) — Infrastructure, data, UI primitives
features/  3,599 LOC (24%) — Feature modules (teaching, about, home, academic)
app/       2,155 LOC (15%) — Page routes and layouts
styles/      248 LOC  (2%) — Design tokens + globals
```
