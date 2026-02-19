# .cockpit — Project Central Intelligence

> **Last Updated**: 2026-02-18
> **Project**: mdasifbinkhaled.github.io — Academic Portfolio
> **Version**: 1.2.0 | **Stack**: Next.js 16.1.4 · React 19 · TypeScript 5.6 · Tailwind 3.4

## Quick Navigation

| Document                         | Purpose                                                    |
| -------------------------------- | ---------------------------------------------------------- |
| [INDEX.md](INDEX.md)             | This file — navigation hub                                 |
| [PMD.md](PMD.md)                 | Project Master Document — architecture, metrics, decisions |
| [ISSUES.md](ISSUES.md)           | Active findings tracker (F-NNN format)                     |
| [STRUCTURE.md](STRUCTURE.md)     | Annotated file tree with LOC and responsibilities          |
| [HISTORY.md](HISTORY.md)         | Development timeline and milestones                        |
| [GOVERNANCE.md](GOVERNANCE.md)   | Code standards, review process, conventions                |
| [PACKAGING.md](PACKAGING.md)     | Dependencies, build pipeline, deployment                   |
| [RELEASES.md](RELEASES.md)       | Version history and changelog                              |
| [PUBLICATION.md](PUBLICATION.md) | Deployment, hosting, and distribution details              |
| [adr/](adr/)                     | Architecture Decision Records                              |

## Health Dashboard

```
Typecheck:  ✅ PASS (0 errors)
Lint:       ✅ PASS (0 errors)
Tests:      ✅ 129/129 PASS (21 files)
Build:      ✅ 18 pages exported
Format:     ✅ All files formatted
```

## Project Vitals

| Metric            | Value            |
| ----------------- | ---------------- |
| Source files      | 173              |
| Lines of code     | 14,934           |
| Client components | 48 of 110 (.tsx) |
| Server components | 62 of 110 (.tsx) |
| Data files        | 28               |
| Config files      | 7                |
| Barrel exports    | 8                |
| Test files        | 21               |
| Themes            | 6                |

## Architecture Layers (LOC Distribution)

```
shared/    8,751 LOC (59%) — Infrastructure, data, UI primitives
features/  3,587 LOC (24%) — Feature modules (teaching, about, home, academic)
app/       2,157 LOC (14%) — Page routes and layouts
styles/      439 LOC  (3%) — Design tokens + globals
```
