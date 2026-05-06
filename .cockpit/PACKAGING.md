# PACKAGING.md — Dependencies, Build & Deployment

## Runtime Dependencies

| Package                    | Version | Purpose                                         |
| -------------------------- | ------- | ----------------------------------------------- |
| `next`                     | 16.2.3  | Framework (App Router, static export)           |
| `react`                    | 19.2.5  | UI library                                      |
| `react-dom`                | 19.2.5  | React DOM bindings                              |
| `lucide-react`             | 0.563.0 | Icons                                           |
| `next-themes`              | 0.4.6   | Theme management (dark/light/system + 6 themes) |
| `tailwind-merge`           | 3.3.1   | Tailwind class conflict resolution              |
| `clsx`                     | 2.1.1   | Conditional class joining                       |
| `class-variance-authority` | 0.7.1   | Component variant API                           |
| `cmdk`                     | 1.1.1   | Command palette                                 |
| `html2canvas`              | 1.4.1   | HTML-to-canvas rendering (seat planner export)  |
| `jspdf`                    | 4.2.1   | PDF document generation (seat planner export)   |
| `jspdf-autotable`          | 5.0.7   | PDF table generation (seat planner export)      |
| `pdfjs-dist`               | 5.6.205 | Browser-local PDF text extraction               |
| `papaparse`                | 5.5.3   | CSV import parsing                              |
| `read-excel-file`          | 9.0.6   | XLSX import parsing                             |
| `sonner`                   | 2.0.7   | Toast notifications                             |
| `@next/third-parties`      | 16.2.3  | Google Analytics GA4 integration                |
| `@sentry/browser`          | 10.48.0 | Client-side error tracking                      |
| `gray-matter`              | 4.0.3   | Frontmatter parsing for MDX blog posts          |
| `next-mdx-remote`          | 6.0.0   | Remote MDX rendering (RSC-compatible, archived) |
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

| Package                           | Version | Purpose                     |
| --------------------------------- | ------- | --------------------------- |
| `typescript`                      | ^5.9.x  | Type checking               |
| `eslint`                          | ^9.39.2 | Linting                     |
| `eslint-config-next`              | ^16.1.4 | Next.js ESLint rules        |
| `prettier`                        | ^3.8.2  | Code formatting             |
| `vitest`                          | ^3.2.4  | Test runner                 |
| `@vitest/coverage-v8`             | ^3.2.4  | Coverage reporting          |
| `@testing-library/react`          | ^16.x   | React testing utilities     |
| `@testing-library/jest-dom`       | ^6.x    | DOM matchers                |
| `@testing-library/user-event`     | ^14.6.1 | User interaction simulation |
| `jsdom`                           | ^25.x   | DOM environment for tests   |
| `@vitejs/plugin-react`            | ^4.7.0  | Vite React plugin           |
| `tailwindcss`                     | ^4.1.18 | CSS framework               |
| `@tailwindcss/postcss`            | ^4.1.18 | Tailwind CSS PostCSS plugin |
| `tw-animate-css`                  | ^1.4.0  | Animation CSS utilities     |
| `postcss`                         | ^8.4.41 | CSS processing              |
| `husky`                           | ^9.1.7  | Git hooks                   |
| `lint-staged`                     | ^15.5.2 | Pre-commit linting          |
| `commitlint`                      | ^20.1.0 | Commit message enforcement  |
| `@commitlint/config-conventional` | ^20.0.0 | Conventional commit rules   |
| `cross-env`                       | ^7.0.3  | Cross-platform env vars     |
| `@playwright/test`                | ^1.58.0 | E2E testing + accessibility |

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
  │   ├── Static page generation (30 HTML pages / 30 routes)
  │   ├── SSG for dynamic routes (generateStaticParams)
  │   └── Output to out/ directory
  └── postbuild: creates out/.nojekyll and generates Workbox SW/precache
```

### Build Output

- **Format**: Static HTML export (`output: 'export'`)
- **Pages**: 30 HTML pages / routes in the exported app tree
- **Directory**: `out/`
- `.nojekyll` file prevents GitHub Pages Jekyll processing

## Scripts Reference

| Script             | Command                                               | Purpose                         |
| ------------------ | ----------------------------------------------------- | ------------------------------- |
| `dev`              | `next dev`                                            | Development server              |
| `build`            | `cross-env next build`                                | Production build                |
| `build:production` | `NODE_ENV=production build`                           | Explicit production build       |
| `test`             | `vitest`                                              | Test watch mode                 |
| `test:run`         | `vitest run`                                          | Single test run                 |
| `test:coverage`    | `vitest run --coverage`                               | Coverage report                 |
| `lint`             | `eslint src --fix`                                    | Lint + auto-fix                 |
| `lint:check`       | `eslint src`                                          | Lint check only                 |
| `format`           | `prettier --write`                                    | Format all files                |
| `format:check`     | `prettier --check`                                    | Format check                    |
| `typecheck`        | `tsc --noEmit && tsc --noEmit -p tests/tsconfig.json` | Type checking                   |
| `validate`         | lint + format + test + typecheck                      | Full validation                 |
| `validate:full`    | validate + build + Chromium Playwright                | Full validation + fast E2E gate |
| `prepare`          | `husky`                                               | Setup git hooks                 |

## Known Vulnerabilities

| Package               | Severity | Impact                                               | Mitigation                                                       |
| --------------------- | -------- | ---------------------------------------------------- | ---------------------------------------------------------------- |
| `next` 16.2.3         | Moderate | Carries bundled PostCSS advisory chain               | Static export; no server runtime; wait for Next patch train      |
| `postcss` <8.5.10     | Moderate | XSS via unescaped `</style>` in CSS stringify output | Build/toolchain path only; no untrusted CSS input in static site |
| `@next/third-parties` | Moderate | Transitive advisory via `next`                       | Resolves when Next ships fixed bundled PostCSS                   |

**Summary**: 3 total advisories, all moderate, no high/critical, no fix available (`npm audit` and `npm audit --omit=dev` both verified on 2026-05-06). Reviewed 2026-05-06; re-check by 2026-08-06 under F-264.

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
- Runs: format, lint, typecheck, unit tests with coverage, build, Chromium Playwright
- All must pass to merge

### `cross-browser-e2e.yml` — Firefox & WebKit Matrix

- Triggers: `CI` success on `main` + manual dispatch
- Runs: static build + Playwright `firefox` and `mobile-safari`
- Purpose: keep the documented browser matrix honest without slowing the PR gate

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
| Offline support              | ✅ Cache-first for static pages (118 files precached)              |

## Analytics

- **Google Analytics**: GA4 via `@next/third-parties/google`
- **Implementation**: `GoogleAnalytics` component in root layout + `src/shared/lib/analytics.ts`
- **Events tracked**: viewCV, downloadCV, viewPublication, downloadPublication
- **Privacy**: Telemetry disabled in build (`NEXT_TELEMETRY_DISABLED=1`)

## Dependabot

- Active for GitHub Actions versions and npm packages
- Groups: linting, testing, UI, react
