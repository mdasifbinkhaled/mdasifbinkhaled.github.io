# .cockpit — Project Central Intelligence

> **Last Updated**: 2026-02-20 (Session 10 — Deep Module-by-Module Audit)
> **Project**: mdasifbinkhaled.github.io — Academic Portfolio
> **Version**: 1.2.0 | **Commit**: 675e6e4 | **Stack**: Next.js 16.1.4 · React 19 · TypeScript 5.6 · Tailwind 3.4

## Quick Navigation

| Document                         | Purpose                                                    |
| -------------------------------- | ---------------------------------------------------------- |
| [INDEX.md](INDEX.md)             | This file — navigation hub                                 |
| [PMD.md](PMD.md)                 | Project Master Document — architecture, metrics, decisions |
| [ISSUES.md](ISSUES.md)           | Active findings tracker (152 findings, 70 open)            |
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
Tests:      ✅ 136/136 PASS (22 files)
Build:      ✅ 18 pages exported
Format:     ✅ All files formatted
Commit:     ✅ 675e6e4 (11 architectural fixes verified)
```

## Findings Summary

```
Total:    152 findings (92 resolved, 60 open)
CRITICAL:   3 (0 open)  — NEW: IUB div-by-zero, PII in source, CV data drift
HIGH:      30 (8 open) — 7 new from Session 10 deep audit
MEDIUM:    55 (20 open) — 19 new from Session 10 deep audit
LOW:       40 (17 open) — 17 new from Session 10 deep audit
INFO:      24 (15 open) — 8 new from Session 10 deep audit
```

## Next Phase: Fix CRITICALs + Code Quality

See [ROADMAP.md](ROADMAP.md) for the full improvement plan.

**Immediate — CRITICAL fixes (Session 11):**

1. F-099: Guard division-by-zero in `iub/page.tsx` avg rating
2. F-100: Remove hardcoded phone number from `course-hero.tsx`
3. F-101: Extract CV data from hardcoded JSX to data file

**Next up — HIGH fixes:** 4. F-102: Fix contest-countdown.tsx (never ticks due to missing state/effect) 5. F-103/F-104: Add missing `'use client'` directives 6. F-105: Fix structured data `timeRequired` (P1S → P16W) 7. F-106: Fix spotlight-card hardcoded dark colors 8. F-107: Add keyboard accessibility to collapsible-section 9. F-108: Deduplicate publications metadata (page vs layout)

**Phase 5 (from ROADMAP): COMPLETED ✅**

- CSP, canonical URLs, citation meta tags, route announcer, bundle analyzer, structured data upgrade

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
