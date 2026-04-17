# Testing Guide

## Overview

| Layer              | Tool                           | Description                         |
| ------------------ | ------------------------------ | ----------------------------------- |
| Unit & Integration | Vitest + React Testing Library | Component and utility tests         |
| E2E Cross-Browser  | Playwright                     | 3 browsers, smoke + a11y + keyboard |
| Accessibility      | axe-core + Playwright          | WCAG 2.x AA audit on all main pages |
| Performance        | Lighthouse CI                  | 13 pages, 3 runs each               |

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
│   ├── home/         # Homepage component tests
│   ├── publications/ # Publication list tests
│   ├── research/     # Research component tests
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
| Lines      | 64%       |
| Functions  | 54%       |
| Branches   | 81%       |
| Statements | 64%       |

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

| File                      | Description                                                 |
| ------------------------- | ----------------------------------------------------------- |
| `all-pages-smoke.spec.ts` | HTTP 200, h1 visible, no JS errors per route                |
| `a11y-audit.spec.ts`      | WCAG 2.x AA axe-core audit per page                         |
| `keyboard-nav.spec.ts`    | Skip-to-content, tab nav, command palette, Enter activation |
| `theme-contrast.spec.ts`  | Color contrast across all 6 themes                          |

### Notes

- Keyboard navigation tests are skipped on mobile-safari (no physical keyboard)
- Theme tests verify `data-theme` attribute before running axe contrast checks

## Lighthouse CI

Config: `.github/lighthouserc.js`

Runs against 13 pages (3 runs each) with assertions:

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
