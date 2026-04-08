# ROADMAP.md — Improvement Roadmap

> **Created**: 2026-02-19 | **Updated**: 2026-04-08
> **Current Version**: 1.5.0 | **Quality**: All gates green (204/204 tests, 0 TS/ESLint errors, 27/27 pages)
> **Open Findings**: 0 (235 total, 227 resolved, 3 false positives, 5 reassessed)

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

| #   | Tool                                                           | Complexity | Priority | Status      |
| --- | -------------------------------------------------------------- | ---------- | -------- | ----------- |
| 7.1 | **Grade Calculator** — per-course weighted grade projection    | MODERATE   | HIGH     | Done        |
| 7.2 | **Seat Plan Generator** — upload student list, generate layout | MODERATE   | HIGH     | Done        |
| 7.3 | **GPA Calculator** — multi-course semester GPA computation     | EASY       | MEDIUM   | Done        |
| 7.4 | **Office Hours** — structured schedule with booking CTA        | EASY       | MEDIUM   | Done        |
| 7.5 | **Exam Countdown** — per-course countdown timers               | EASY       | LOW      | Done        |
| 7.6 | **PDF Study Aid** — upload PDF, produce AI summary (WebLLM)    | HARD       | LOW      | Exploration |

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

| #    | Item                                                         | Category | Complexity | Impact | Status   |
| ---- | ------------------------------------------------------------ | -------- | ---------- | ------ | -------- |
| 10.1 | **Blog section** with MDX (course tutorials, research notes) | Content  | HARD       | HIGH   | Done     |
| 10.2 | **Research timeline visualization**                          | Content  | MODERATE   | MEDIUM | Deferred |
| 10.3 | **Talks / Presentations page**                               | Content  | EASY       | MEDIUM | Done     |
| 10.4 | **Student supervision / mentorship page**                    | Content  | EASY       | MEDIUM | Done     |
| 10.5 | **Bengali introduction** (About page bilingual section)      | i18n     | MODERATE   | MEDIUM | Deferred |

## Phase 11: Monitoring & Production Readiness

| #    | Item                                                        | Category   | Complexity | Impact | Status |
| ---- | ----------------------------------------------------------- | ---------- | ---------- | ------ | ------ |
| 11.1 | **Sentry error tracking** (free tier)                       | Monitoring | MODERATE   | HIGH   | Done   |
| 11.2 | **Page view tracking** on SPA navigation                    | Analytics  | EASY       | MEDIUM | Done   |
| 11.3 | **Search/filter analytics** (publications, command palette) | Analytics  | EASY       | MEDIUM |        |
| 11.4 | **Uptime monitoring** (UptimeRobot or similar)              | Monitoring | EASY       | LOW    |        |

---

## Summary

| Phase                       | Items  | Complexity    | Est. Sessions           |
| --------------------------- | ------ | ------------- | ----------------------- |
| Phase 4A/B/C (CRITICAL/DRY) | 18     | EASY-MODERATE | Completed               |
| Phase 5 (Modernization)     | 10     | MODERATE      | Completed               |
| Phase 6 (Code Quality)      | 4      | MODERATE-HARD | Completed               |
| Phase 7 (Student Apps)      | 6      | MODERATE      | 5/6 done, 1 exploration |
| Phase 8 (Modern Web)        | 6      | MODERATE      | 6/6 done                |
| Phase 9 (Testing)           | 6      | MODERATE      | 6/6 done                |
| Phase 10 (Content)          | 5      | MIXED         | 3/5 done, 2 deferred    |
| Phase 11 (Monitoring)       | 4      | EASY-MODERATE | 2/4 done                |
| **Total**                   | **59** |               | **12-20**               |
