# ROADMAP.md — Improvement Roadmap

> **Created**: 2026-02-19 | **Updated**: 2026-02-20 (Session 10 Deep Audit)
> **Current Version**: 1.2.0 | **Quality**: All gates green (136/136 tests, 0 TS/ESLint errors, 18/18 pages)
> **Open Findings**: 60 (0 CRITICAL, 8 HIGH, 20 MEDIUM, 17 LOW, 15 INFO)

## Phase 6: Student Tools (New Feature — `/tools`)

Add a new `/tools` route with client-side interactive tools for students. All tools run purely in the browser — no server required. Compatible with static export.

See [ADR-005](adr/ADR-005-student-tools.md) for architecture decisions.

| #   | Tool                                                           | Complexity | Priority | Status      |
| --- | -------------------------------------------------------------- | ---------- | -------- | ----------- |
| 6.1 | **Grade Calculator** — per-course weighted grade projection    | MODERATE   | HIGH     | Planned     |
| 6.2 | **Seat Plan Generator** — upload student list, generate layout | MODERATE   | HIGH     | Planned     |
| 6.3 | **GPA Calculator** — multi-course semester GPA computation     | EASY       | MEDIUM   | Planned     |
| 6.4 | **Office Hours** — structured schedule with booking CTA        | EASY       | MEDIUM   | Planned     |
| 6.5 | **Exam Countdown** — per-course countdown timers               | EASY       | LOW      | Planned     |
| 6.6 | **PDF Study Aid** — upload PDF, produce AI summary (WebLLM)    | HARD       | LOW      | Exploration |

## Phase 7: Modern Web & Performance

| #   | Item                                                     | Category    | Complexity | Impact |
| --- | -------------------------------------------------------- | ----------- | ---------- | ------ |
| 7.1 | **Wire up View Transitions** (flag enabled but not used) | Modern      | MODERATE   | HIGH   |
| 7.2 | **Service worker** for offline + PWA installability      | PWA         | MODERATE   | HIGH   |
| 7.3 | **Container queries** for course/publication cards       | Modern      | MODERATE   | MEDIUM |
| 7.4 | **Lighthouse CI** in GitHub Actions                      | Performance | MODERATE   | MEDIUM |
| 7.5 | **Code split Framer Motion** (only 1 component uses it)  | Performance | MODERATE   | MEDIUM |
| 7.6 | **CSS `content-visibility: auto`** on long pages         | Performance | EASY       | LOW    |

## Phase 8: Testing & Confidence

| #   | Item                                              | Category | Complexity | Impact |
| --- | ------------------------------------------------- | -------- | ---------- | ------ |
| 8.1 | **Playwright E2E tests** for critical flows       | Testing  | MODERATE   | HIGH   |
| 8.2 | **axe-core integration** in component tests       | A11y     | EASY       | HIGH   |
| 8.3 | **Component render tests** for feature modules    | Testing  | MODERATE   | HIGH   |
| 8.4 | **Color contrast CI check** across 6 themes       | A11y     | MODERATE   | HIGH   |
| 8.5 | **Coverage target → 50%**                         | Testing  | MODERATE   | MEDIUM |
| 8.6 | **Link checker** in CI (`lychee` or `linkinator`) | Quality  | EASY       | LOW    |

## Phase 9: Content & Engagement

| #   | Item                                                         | Category | Complexity | Impact |
| --- | ------------------------------------------------------------ | -------- | ---------- | ------ |
| 9.1 | **Blog section** with MDX (course tutorials, research notes) | Content  | HARD       | HIGH   |
| 9.2 | **Research timeline visualization**                          | Content  | MODERATE   | MEDIUM |
| 9.3 | **Talks / Presentations page**                               | Content  | EASY       | MEDIUM |
| 9.4 | **Student supervision / mentorship page**                    | Content  | EASY       | MEDIUM |
| 9.5 | **Bengali introduction** (About page bilingual section)      | i18n     | MODERATE   | MEDIUM |

## Phase 10: Monitoring & Production Readiness

| #    | Item                                                        | Category   | Complexity | Impact |
| ---- | ----------------------------------------------------------- | ---------- | ---------- | ------ |
| 10.1 | **Sentry error tracking** (free tier)                       | Monitoring | MODERATE   | HIGH   |
| 10.2 | **Page view tracking** on SPA navigation                    | Analytics  | EASY       | MEDIUM |
| 10.3 | **Search/filter analytics** (publications, command palette) | Analytics  | EASY       | MEDIUM |
| 10.4 | **Uptime monitoring** (UptimeRobot or similar)              | Monitoring | EASY       | LOW    |

---

## Summary

| Phase                   | Items  | Complexity    | Est. Sessions |
| ----------------------- | ------ | ------------- | ------------- |
| Phase 4A (CRITICAL)     | 3      | EASY-MODERATE | 1             |
| Phase 4B (HIGH Fixes)   | 8      | EASY-MODERATE | 1-2           |
| Phase 4C (DRY/Arch)     | 7      | EASY-MODERATE | 1-2           |
| Phase 5 (Quick Wins)    | 10     | Mostly EASY   | Completed     |
| Phase 6 (Student Tools) | 6      | MODERATE      | 3-4           |
| Phase 7 (Modern Web)    | 6      | MODERATE      | 2-3           |
| Phase 8 (Testing)       | 6      | MODERATE      | 2-3           |
| Phase 9 (Content)       | 5      | MIXED         | 3-5           |
| Phase 10 (Monitoring)   | 4      | EASY-MODERATE | 1-2           |
| **Total**               | **55** |               | **15-24**     |
