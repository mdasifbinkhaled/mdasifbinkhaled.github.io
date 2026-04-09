# Testing Guide

## Overview

| Layer              | Tool                           | Count                  | Coverage                            |
| ------------------ | ------------------------------ | ---------------------- | ----------------------------------- |
| Unit & Integration | Vitest + React Testing Library | 357 tests, 40 files    | 65% lines, 81% branches             |
| E2E Cross-Browser  | Playwright                     | 125 tests (3 browsers) | 20 routes                           |
| Accessibility      | axe-core + Playwright          | 10 pages WCAG 2.x AA   | All 3 browsers                      |
| Performance        | Lighthouse CI                  | 8 pages                | Perf ≥90, A11y ≥95, BP ≥95, SEO ≥95 |

## Running Tests

```bash
# Unit tests (watch mode)
npm run test

# Unit tests (single run with coverage)
npm run test:run

# E2E tests (requires build first)
npm run build
npm run test:e2e

# Full validation (lint + format + tests + typecheck)
npm run validate
```

## Unit Tests (Vitest)

Tests live in `tests/` mirroring the `src/` structure:

```
tests/
├── features/         # Feature component tests
│   ├── apps/         # App tools (GPA calculator, exam countdown, etc.)
│   └── teaching/     # Teaching components
├── shared/
│   ├── components/   # UI component tests
│   ├── config/       # Configuration tests
│   ├── hooks/        # Custom hook tests
│   └── lib/          # Utility function tests
```

### Coverage Thresholds

Enforced in `vitest.config.mts`:

| Metric     | Threshold |
| ---------- | --------- |
| Lines      | 60%       |
| Functions  | 50%       |
| Branches   | 70%       |
| Statements | 60%       |

### Writing Tests

- Use `@testing-library/react` for component rendering
- Mock Next.js modules (`next/navigation`, `next/dynamic`) via `tests/setup.ts`
- Data modules can be mocked for isolation (e.g., `vi.mock('@/shared/lib/data/...')`)

## E2E Tests (Playwright)

### Browser Matrix

| Project       | Browser  | Viewport            |
| ------------- | -------- | ------------------- |
| chromium      | Chromium | Desktop             |
| firefox       | Firefox  | Desktop             |
| mobile-safari | WebKit   | iPhone 14 (390×844) |

### Test Suites

| File                      | Tests | Description                                                 |
| ------------------------- | ----- | ----------------------------------------------------------- |
| `all-pages-smoke.spec.ts` | 20    | HTTP 200, heading visible, no JS errors per route           |
| `a11y-audit.spec.ts`      | 10    | WCAG 2.x AA axe-core audit per page                         |
| `keyboard-nav.spec.ts`    | 4     | Skip-to-content, tab nav, command palette, Enter activation |
| `theme-contrast.spec.ts`  | 6     | Color contrast across all 6 themes                          |
| `smoke.spec.ts`           | 3     | Layout hydration, WCAG baseline, cross-tier navigation      |

### Notes

- Keyboard navigation tests are skipped on mobile-safari (no physical keyboard)
- Command palette test is skipped on mobile-safari
- Theme tests use `localStorage` injection for reliable theme switching

## Lighthouse CI

Config: `.github/lighthouserc.js`

Runs against 8 pages with assertions:

- Performance ≥ 0.9
- Accessibility ≥ 0.95
- Best Practices ≥ 0.95
- SEO ≥ 0.95

```bash
# Run locally
npx @lhci/cli autorun --config=.github/lighthouserc.js
```

## CI Integration

The `ci.yml` workflow runs on every push/PR:

1. Lint + format check
2. TypeScript type-check
3. Unit tests with coverage
4. Build static export
5. E2E tests (Chromium)

Lighthouse CI runs separately via `lhci.yml`.
