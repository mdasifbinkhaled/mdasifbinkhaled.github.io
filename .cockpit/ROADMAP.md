# ROADMAP.md — Improvement Roadmap

> **Created**: 2026-02-19 | **Updated**: 2026-04-21
> **Current Version**: 1.5.0 | **Quality**: All gates green (418/418 unit, 161 passed + 4 skipped E2E, static build 30/30, prod audit clean, 0 TS/ESLint errors)
> **Open Findings**: 2 — F-260 `/cv` a11y hardened (watched), F-264 supply-chain advisories (quarterly review)

## Phase 6: Code Quality & Cleanup

| #   | Item                                                     | Category     | Complexity | Impact | Status    |
| --- | -------------------------------------------------------- | ------------ | ---------- | ------ | --------- |
| 6.1 | **Remove Unnecessary Hooks** (useMemo/useEffect)         | Refactor     | MODERATE   | HIGH   | Completed |
| 6.2 | **Eliminate Magic Numbers & Hardcoded UI sizing**        | UI/Style     | EASY       | MEDIUM | Completed |
| 6.3 | **Split Monolithic Components** (e.g. `research/page`)   | Architecture | HARD       | HIGH   | Completed |
| 6.4 | **Standardize Inline Data** into `shared/lib/data` files | Data         | EASY       | MEDIUM | Completed |

## Phase 7: Student Apps (New Feature — `/apps`)

Add a new `/apps` route with client-side interactive tools for students. All tools run purely in the browser — no server required. Compatible with static export.

See [ADR-005](adr/ADR-005-student-tools.md) for architecture decisions.

| #   | Tool                                                                                           | Complexity | Priority | Status |
| --- | ---------------------------------------------------------------------------------------------- | ---------- | -------- | ------ |
| 7.1 | **Grade Calculator** — per-course weighted grade projection                                    | MODERATE   | HIGH     | Done   |
| 7.2 | **Seat Plan Generator** — upload student list, generate layout                                 | MODERATE   | HIGH     | Done   |
| 7.3 | **GPA Calculator** — multi-course semester GPA computation                                     | EASY       | MEDIUM   | Done   |
| 7.4 | **Office Hours** — structured schedule with booking CTA                                        | EASY       | MEDIUM   | Done   |
| 7.5 | **Exam Countdown** — per-course countdown timers                                               | EASY       | LOW      | Done   |
| 7.6 | **PDF Study Aid** — upload PDF, generate browser-local notes, glossary, and practice questions | HARD       | LOW      | Done   |

> **7.6 Shipped**: Implemented as a deterministic browser-local workflow using `pdfjs-dist` text extraction plus heuristic summary, glossary, and question generation. No WebLLM, WebGPU, or external API key is required.

## Phase 8: Modern Web & Performance

| #   | Item                                                     | Category    | Complexity   | Impact     | Status |
| --- | -------------------------------------------------------- | ----------- | ------------ | ---------- | ------ |
| 8.1 | **Wire up View Transitions** (flag enabled but not used) | Modern      | MODERATE     | HIGH       | Done   |
| 8.2 | **Service worker** for offline + PWA installability      | PWA         | MODERATE     | HIGH       | Done   |
| 8.3 | **Container queries** for course/publication cards       | Modern      | MODERATE     | MEDIUM     | Done   |
| 8.4 | **Lighthouse CI** in GitHub Actions                      | Performance | MODERATE     | MEDIUM     | Done   |
| 8.5 | **~~Code split Framer Motion~~** — Removed entirely      | Performance | ~~MODERATE~~ | ~~MEDIUM~~ | Done   |
| 8.6 | **CSS `content-visibility: auto`** on long pages         | Performance | EASY         | LOW        | Done   |

## Phase 9: Testing & Confidence

| #   | Item                                              | Category | Complexity | Impact | Status |
| --- | ------------------------------------------------- | -------- | ---------- | ------ | ------ |
| 9.1 | **Playwright E2E tests** for critical flows       | Testing  | MODERATE   | HIGH   | Done   |
| 9.2 | **axe-core integration** in component tests       | A11y     | EASY       | HIGH   | Done   |
| 9.3 | **Component render tests** for feature modules    | Testing  | MODERATE   | HIGH   | Done   |
| 9.4 | **Color contrast CI check** across 6 themes       | A11y     | MODERATE   | HIGH   | Done   |
| 9.5 | **Coverage target → 50%**                         | Testing  | MODERATE   | MEDIUM | Done   |
| 9.6 | **Link checker** in CI (`lychee` or `linkinator`) | Quality  | EASY       | LOW    | Done   |

## Phase 10: Content & Engagement

| #    | Item                                                         | Category | Complexity | Impact | Status |
| ---- | ------------------------------------------------------------ | -------- | ---------- | ------ | ------ |
| 10.1 | **Blog section** with MDX (course tutorials, research notes) | Content  | HARD       | HIGH   | Done   |
| 10.2 | **Research timeline visualization**                          | Content  | MODERATE   | MEDIUM | Done   |
| 10.3 | **Talks / Presentations page**                               | Content  | EASY       | MEDIUM | Done   |
| 10.4 | **Student supervision / mentorship page**                    | Content  | EASY       | MEDIUM | Done   |
| 10.5 | **Bengali introduction** (About page bilingual section)      | i18n     | MODERATE   | MEDIUM | Done   |

> **10.2 / 10.5 Shipped**: `/research` now includes a visual timeline tied to publications, and `/about` now includes a dedicated English/Bengali introduction sourced from shared personal data.

## Phase 11: Monitoring & Production Readiness

| #    | Item                                                        | Category   | Complexity | Impact | Status |
| ---- | ----------------------------------------------------------- | ---------- | ---------- | ------ | ------ |
| 11.1 | **Sentry error tracking** (free tier)                       | Monitoring | MODERATE   | HIGH   | Done   |
| 11.2 | **Page view tracking** on SPA navigation                    | Analytics  | EASY       | MEDIUM | Done   |
| 11.3 | **Search/filter analytics** (publications, command palette) | Analytics  | EASY       | MEDIUM | Done   |
| 11.4 | **Uptime monitoring** (UptimeRobot or similar)              | Monitoring | EASY       | LOW    | Done   |

> **11.3 Shipped**: Shared `portfolioEvents` now track publications search/year/type filters and command-palette search/select interactions.
> **11.4 Status**: UptimeRobot HTTP(S) monitor configured for `https://mdasifbinkhaled.github.io/` per [uptime-robot.md](uptime-robot.md) (5-minute interval, email alerts). Monitor lives outside the repo — the guide in-repo is the single source of truth for re-provisioning.

## Phase 12: Apps Hub I/O Redesign

Unify data ingress, storage, stats, exports, and settings across every tool under `/apps`. See [ADR-007](adr/ADR-007-apps-io-redesign.md) for the full decision record.

| #    | Item                                                                                                                                                                  | Category     | Complexity | Impact | Status |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ---------- | ------ | ------ |
| 12.1 | **Shared primitives** — `Result<T>`, namespaced storage, parsers (CSV/TSV/XLSX), `<DataImporter>`, `<StatsPanel>`, `<ExportBar>`, `<ToolSettings>`, shared ICS writer | Architecture | HARD       | HIGH   | Done   |
| 12.2 | **Seat Planner** — refactor onto primitives (paste/upload students + rooms, merge/append/replace, back-up + reset)                                                    | Refactor     | MODERATE   | HIGH   | Done   |
| 12.3 | **Grade / GPA / Exam / Course / Study** — apply primitives (storage migration, stats panel, export bar, tool settings)                                                | Refactor     | MODERATE   | HIGH   | Done   |
| 12.4 | **Importers** — GPA transcript paste, Course CSV/XLSX, Exam CSV/XLSX                                                                                                  | Feature      | MODERATE   | MEDIUM | Done   |

> **12.x Security note**: Phase 12.1 swapped `xlsx@0.18.5` (2 unpatched HIGH CVEs) for `read-excel-file@^9.0.6` (Apache-2.0, read-only, ~35 KB lazy). `npm audit` is clean.

---

## Summary

| Phase                       | Items  | Complexity    | Est. Sessions |
| --------------------------- | ------ | ------------- | ------------- |
| Phase 4A/B/C (CRITICAL/DRY) | 18     | EASY-MODERATE | Completed     |
| Phase 5 (Modernization)     | 10     | MODERATE      | Completed     |
| Phase 6 (Code Quality)      | 4      | MODERATE-HARD | Completed     |
| Phase 7 (Student Apps)      | 6      | MODERATE      | 6/6 done      |
| Phase 8 (Modern Web)        | 6      | MODERATE      | 6/6 done      |
| Phase 9 (Testing)           | 6      | MODERATE      | 6/6 done      |
| Phase 10 (Content)          | 5      | MIXED         | 5/5 done      |
| Phase 11 (Monitoring)       | 4      | EASY-MODERATE | 4/4 done      |
| Phase 12 (Apps Hub I/O)     | 4      | MODERATE-HARD | 4/4 done      |
| **Total**                   | **63** |               | **12-20**     |
