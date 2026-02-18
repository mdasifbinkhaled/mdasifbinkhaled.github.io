# .cockpit — Project Central Intelligence

> **Last Updated**: 2025-02-18
> **Project**: mdasifbinkhaled.github.io — Academic Portfolio
> **Version**: 1.0.0 | **Stack**: Next.js 16.1.4 · React 19 · TypeScript 5.6 · Tailwind 3.4

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
Tests:      ✅ 109/109 PASS (17 files)
Build:      ✅ 18 pages exported
Format:     ✅ All files formatted
```

## Project Vitals

| Metric            | Value            |
| ----------------- | ---------------- |
| Source files      | 172              |
| Lines of code     | 15,496           |
| Client components | 44 of 107 (.tsx) |
| Server components | 63 of 107 (.tsx) |
| Data files        | 29               |
| Config files      | 7                |
| Barrel exports    | 19               |
| Test files        | 17               |
| Themes            | 13               |

## Architecture Layers (LOC Distribution)

```
shared/    9,150 LOC (59%) — Infrastructure, data, UI primitives
features/  3,599 LOC (23%) — Feature modules (teaching, about, home, academic, publications)
app/       2,262 LOC (14%) — Page routes and layouts
styles/      485 LOC  (3%) — Design tokens
```
