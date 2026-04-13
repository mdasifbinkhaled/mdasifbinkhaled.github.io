# PACKAGING.md — Dependencies, Build & Deployment

## Runtime Dependencies

| Package                    | Version | Purpose                                         |
| -------------------------- | ------- | ----------------------------------------------- |
| `next`                     | 16.1.4  | Framework (App Router, static export)           |
| `react`                    | 19.2.4  | UI library                                      |
| `react-dom`                | 19.2.4  | React DOM bindings                              |
| `lucide-react`             | 0.563.0 | Icons                                           |
| `next-themes`              | 0.4.6   | Theme management (dark/light/system + 6 themes) |
| `tailwind-merge`           | 3.3.1   | Tailwind class conflict resolution              |
| `clsx`                     | 2.1.1   | Conditional class joining                       |
| `class-variance-authority` | 0.7.1   | Component variant API                           |
| `cmdk`                     | 1.1.1   | Command palette                                 |
| `html2canvas`              | 1.4.1   | HTML-to-canvas rendering (seat planner export)  |
| `jspdf`                    | 4.2.0   | PDF document generation (seat planner export)   |
| `jspdf-autotable`          | 5.0.7   | PDF table generation (seat planner export)      |
| `@next/third-parties`      | latest  | Google Analytics GA4 integration                |
| `@sentry/browser`          | latest  | Client-side error tracking                      |
| `gray-matter`              | latest  | Frontmatter parsing for MDX blog posts          |
| `next-mdx-remote`          | ^6.0.0  | Remote MDX rendering (RSC-compatible, archived) |
| `@radix-ui/*`              | various | Headless UI primitives (9 packages)             |

### Radix UI Packages

- `react-accordion` ^1.2.12
- `react-dialog` ^1.1.15
- `react-dropdown-menu` ^2.1.16
- `react-progress` ^1.1.7
- `react-select` ^2.2.6
- `react-separator` ^1.1.7
- `react-slot` ^1.2.4
- `react-tabs` ^1.1.13
- `react-visually-hidden` ^1.2.4

## Dev Dependencies

| Package                           | Version  | Purpose                      |
| --------------------------------- | -------- | ---------------------------- |
| `typescript`                      | ^5.9.x   | Type checking                |
| `eslint`                          | ^9.39.2  | Linting                      |
| `eslint-config-next`              | ^16.1.4  | Next.js ESLint rules         |
| `prettier`                        | ^3.8.2   | Code formatting              |
| `vitest`                          | ^3.2.4   | Test runner                  |
| `@vitest/coverage-v8`             | ^3.2.4   | Coverage reporting           |
| `@testing-library/react`          | ^16.x    | React testing utilities      |
| `@testing-library/jest-dom`       | ^6.x     | DOM matchers                 |
| `@testing-library/user-event`     | ^14.6.1  | User interaction simulation  |
| `jsdom`                           | ^25.x    | DOM environment for tests    |
| `@vitejs/plugin-react`            | ^4.7.0   | Vite React plugin            |
| `tailwindcss`                     | ^4.1.18  | CSS framework                |
| `tailwindcss-animate`             | ^1.0.7   | Animation utilities          |
| `autoprefixer`                    | ^10.4.20 | CSS vendor prefixing         |
| `postcss`                         | ^8.4.41  | CSS processing               |
| `husky`                           | ^9.1.7   | Git hooks                    |
| `lint-staged`                     | ^15.5.2  | Pre-commit linting           |
| `commitlint`                      | ^20.1.0  | Commit message enforcement   |
| `@commitlint/config-conventional` | ^20.0.0  | Conventional commit rules    |
| `cross-env`                       | ^7.0.3   | Cross-platform env vars      |
| `tsc-files`                       | ^1.1.4   | Type-check staged files only |
| `@playwright/test`                | ^1.58.0  | E2E testing + accessibility  |

## Overrides

```json
{
  "glob": "10.1.0",
  "typescript-eslint": "8.53.1"
}
```

- `glob` pinned to avoid breaking changes in transitive deps.
- `typescript-eslint` pinned for ESLint flat config compatibility.

## Build Pipeline

```text
npm run build
  ├── cross-env NEXT_TELEMETRY_DISABLED=1 next build
  │   ├── TypeScript compilation
  │   ├── ESLint checking
  │   ├── Static page generation (25 HTML pages / 27 routes)
  │   ├── SSG for dynamic routes (generateStaticParams)
  │   └── Output to out/ directory
  └── postbuild: creates out/.nojekyll for GitHub Pages
```

### Build Output

- **Format**: Static HTML export (`output: 'export'`)
- **Pages**: 25 HTML pages (27 routes including robots.txt + sitemap.xml)
- **Directory**: `out/`
- `.nojekyll` file prevents GitHub Pages Jekyll processing

## Scripts Reference

| Script             | Command                          | Purpose                   |
| ------------------ | -------------------------------- | ------------------------- |
| `dev`              | `next dev`                       | Development server        |
| `build`            | `cross-env next build`           | Production build          |
| `build:production` | `NODE_ENV=production build`      | Explicit production build |
| `test`             | `vitest`                         | Test watch mode           |
| `test:run`         | `vitest run`                     | Single test run           |
| `test:coverage`    | `vitest run --coverage`          | Coverage report           |
| `lint`             | `eslint src --fix`               | Lint + auto-fix           |
| `lint:check`       | `eslint src`                     | Lint check only           |
| `format`           | `prettier --write`               | Format all files          |
| `format:check`     | `prettier --check`               | Format check              |
| `typecheck`        | `tsc --noEmit`                   | Type checking             |
| `validate`         | lint + format + test + typecheck | Full validation           |
| `validate:full`    | validate + build + Playwright    | Full validation + E2E     |
| `prepare`          | `husky`                          | Setup git hooks           |

## Known Vulnerabilities

| Package             | Severity | Impact                                      | Mitigation                                        |
| ------------------- | -------- | ------------------------------------------- | ------------------------------------------------- |
| `dompurify` <=3.3.1 | Moderate | mutation-XSS via Re-Contextualization       | No third-party inputs passed; static context      |
| `jspdf` <=4.2.0     | Critical | PDF Object Injection via FreeText color     | Low risk; parameters controlled purely locally    |
| `next` 16.1.4       | High     | Server-side DoS (Image Optimizer, RSC, PPR) | **Fully mitigated** — static export has no server |
| `rollup` 4.x        | High     | Arbitrary file write via path traversal     | **Dev-only** (build tooling), no runtime impact   |
| `vite` 6.x          | High     | Path traversal via URL encoding             | **Dev-only** (test tooling), no runtime impact    |

**Summary**: 8 total advisories (3 production: 1 moderate, 1 high, 1 critical — all at latest versions with no fix available; 5 dev-only). Production vulns are fully mitigated by static export (no server runtime) and controlled-input usage. Reviewed 2026-04-12; re-check by 2026-07-12.

## Deployment

| Property          | Value                                                                  |
| ----------------- | ---------------------------------------------------------------------- |
| **Platform**      | GitHub Pages                                                           |
| **URL**           | [https://mdasifbinkhaled.github.io](https://mdasifbinkhaled.github.io) |
| **Repository**    | mdasifbinkhaled/mdasifbinkhaled.github.io                              |
| **Deploy method** | GitHub Actions → Static Export → Pages                                 |
| **SSL**           | Automatic (GitHub managed)                                             |
| **CDN**           | GitHub Pages CDN (Fastly)                                              |

## CI Workflows

### `nextjs.yml` — Production Deploy

- Triggers: Push to `main`
- Builds and deploys to GitHub Pages

### `ci.yml` — Pull Request Checks & Push

- Triggers: Pull requests and pushes to `main`
- Runs: lint, typecheck, test, build
- All must pass to merge

### `lhci.yml` — Lighthouse CI

- Triggers: Pull requests to `main`
- Runs: Lighthouse audits against static build
- Enforces performance and accessibility budgets

### `security.yml` — Security Audit

- Triggers: Weekly schedule + on push
- Runs: `npm audit`, reports vulnerabilities

## SEO Assets

| Asset         | Location                   | Status                      |
| ------------- | -------------------------- | --------------------------- |
| `robots.txt`  | `/robots.txt` (generated)  | ✅                          |
| `sitemap.xml` | `/sitemap.xml` (generated) | ✅ (20+ URLs)               |
| `humans.txt`  | `/humans.txt` (static)     | ✅                          |
| JSON-LD       | Embedded in `<head>`       | ✅ Person + Website schemas |
| OpenGraph     | `<meta>` tags in layout    | ✅                          |
| Twitter Cards | `<meta>` tags in layout    | ✅                          |

## PWA

| Asset                        | Status                                                             |
| ---------------------------- | ------------------------------------------------------------------ |
| `site.webmanifest`           | ✅ Present                                                         |
| App icons (192x192, 512x512) | ✅ Present                                                         |
| Service Worker               | ✅ Workbox-generated `out/sw.js`, registered via `sw-register.tsx` |
| Offline support              | ✅ Cache-first for static pages (104 files precached)              |

## Analytics

- **Google Analytics**: GA4 via `@next/third-parties/google`
- **Implementation**: `GoogleAnalytics` component in root layout + `src/shared/lib/analytics.ts`
- **Events tracked**: viewCV, downloadCV, viewPublication, downloadPublication
- **Privacy**: Telemetry disabled in build (`NEXT_TELEMETRY_DISABLED=1`)

## Dependabot

- Active for GitHub Actions versions and npm packages
- Groups: linting, testing, UI, react
