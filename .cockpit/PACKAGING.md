# PACKAGING.md — Dependencies, Build & Deployment

## Runtime Dependencies

| Package                    | Version | Purpose                                         |
| -------------------------- | ------- | ----------------------------------------------- |
| `next`                     | 16.2.6  | Framework (App Router, static export)           |
| `react`                    | 19.2.6  | UI library                                      |
| `react-dom`                | 19.2.6  | React DOM bindings                              |
| `lucide-react`             | 1.8.0   | Icons                                           |
| `next-themes`              | 0.4.6   | Theme management (dark/light/system + 6 themes) |
| `tailwind-merge`           | 3.5.0   | Tailwind class conflict resolution              |
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

| Package                       | Version | Purpose                     |
| ----------------------------- | ------- | --------------------------- |
| `typescript`                  | 6.0.3   | Type checking               |
| `eslint`                      | 9.39.4  | Linting                     |
| `eslint-config-next`          | 16.2.4  | Next.js ESLint rules        |
| `prettier`                    | 3.8.3   | Code formatting             |
| `vitest`                      | 3.2.4   | Test runner                 |
| `@vitest/coverage-v8`         | 3.2.4   | Coverage reporting          |
| `@testing-library/react`      | 16.3.2  | React testing utilities     |
| `@testing-library/jest-dom`   | 6.9.1   | DOM matchers                |
| `@testing-library/user-event` | 14.6.1  | User interaction simulation |
| `jsdom`                       | 28.1.0  | DOM environment for tests   |
| `@vitejs/plugin-react`        | 5.2.0   | Vite React plugin           |
| `tailwindcss`                 | 4.2.4   | CSS framework               |
| `@tailwindcss/postcss`        | 4.2.4   | Tailwind CSS PostCSS plugin |
| `tw-animate-css`              | 1.4.0   | Animation CSS utilities     |
| `postcss`                     | 8.5.15  | CSS processing              |
| `husky`                       | 9.1.7   | Git hooks                   |
| `lint-staged`                 | 16.4.0  | Pre-commit linting          |
| `cross-env`                   | 10.1.0  | Cross-platform env vars     |
| `knip`                        | 6.6.1   | Focused dead-code checks    |
| `@types/node`                 | 25.8.0  | Node.js type declarations   |
| `@playwright/test`            | 1.59.1  | E2E testing + accessibility |

## Overrides

```json
{
  "test-exclude": "8.0.0",
  "serialize-javascript": "7.0.5",
  "typescript-eslint": "8.59.0",
  "postcss": "$postcss",
  "eslint-plugin-react-hooks": "7.1.1"
}
```

- `test-exclude` is advanced to 8.0.0 so Vitest 3 coverage uses the maintained glob 13 chain.
- `serialize-javascript` remains pinned to the patched 7.x line.
- `typescript-eslint` and `eslint-plugin-react-hooks` are advanced through npm overrides while Next's ESLint preset catches up.
- `postcss` is forced to the root patched version used by the CSS toolchain.

## Build Pipeline

```text
npm run build
  ├── cross-env NEXT_TELEMETRY_DISABLED=1 next build
  │   ├── TypeScript compilation
  │   ├── ESLint checking
  │   ├── Static page generation (28 HTML pages / 30 prerendered routes)
  │   ├── SSG for dynamic routes (generateStaticParams)
  │   └── Output to out/ directory
  └── postbuild: creates out/.nojekyll and generates service worker/precache
```

### Build Output

- **Format**: Static HTML export (`output: 'export'`)
- **Pages**: 28 HTML pages exported / 30 prerendered routes in the exported app tree
- **Directory**: `out/`
- `.nojekyll` file prevents GitHub Pages Jekyll processing

## Scripts Reference

| Script             | Command                                               | Purpose                              |
| ------------------ | ----------------------------------------------------- | ------------------------------------ |
| `dev`              | `next dev`                                            | Development server                   |
| `build`            | `cross-env next build`                                | Production build                     |
| `build:production` | `NODE_ENV=production build`                           | Explicit production build            |
| `test`             | `vitest`                                              | Test watch mode                      |
| `test:run`         | `vitest run`                                          | Single test run                      |
| `test:coverage`    | `vitest run --coverage`                               | Coverage report                      |
| `lint`             | `eslint src --fix`                                    | Lint + auto-fix                      |
| `lint:check`       | `eslint src`                                          | Lint check only                      |
| `format`           | `prettier --write`                                    | Format all files                     |
| `format:check`     | `prettier --check`                                    | Format check                         |
| `typecheck`        | `tsc --noEmit && tsc --noEmit -p tests/tsconfig.json` | Type checking                        |
| `deadcode`         | `knip --no-progress`                                  | Focused unused-file/dependency check |
| `validate`         | lint + format + test + typecheck                      | Full validation                      |
| `validate:full`    | validate + build + Chromium Playwright                | Full validation + fast E2E gate      |
| `prepare`          | `husky`                                               | Setup git hooks                      |

## Local Tooling Scripts

| Script path                           | Purpose                                                |
| ------------------------------------- | ------------------------------------------------------ |
| `scripts/generate-service-worker.mjs` | Generates `out/sw.js` and the static precache manifest |
| `scripts/serve-static.mjs`            | Serves `out/` for Playwright without `serve`           |
| `scripts/validate-commit-message.mjs` | Enforces Conventional Commit headers in Husky          |

## Known Vulnerabilities

| Package | Severity | Impact                                                                      | Mitigation |
| ------- | -------- | --------------------------------------------------------------------------- | ---------- |
| _None_  | —        | `npm audit` reports 0 vulnerabilities on prod (`--omit=dev`) and full trees | —          |

**Summary**: 0 vulnerabilities. F-264 (the prior upstream Next.js advisory chain) was closed by upgrading to `next@16.2.6`; `npm audit` is clean on both prod and full dependency trees. Reviewed 2026-05-26.

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

- Triggers: successful `CI` workflow on `main` + manual dispatch
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

| Asset                        | Status                                                     |
| ---------------------------- | ---------------------------------------------------------- |
| `site.webmanifest`           | ✅ Present                                                 |
| App icons (192x192, 512x512) | ✅ Present                                                 |
| Service Worker               | ✅ Generated `out/sw.js`, registered via `sw-register.tsx` |
| Offline support              | ✅ Cache-first for static pages (118 files precached)      |

## Analytics

- **Google Analytics**: GA4 via `@next/third-parties/google`
- **Implementation**: `GoogleAnalytics` component in root layout + `src/shared/lib/analytics.ts`
- **Events tracked**: viewCV, downloadCV, viewPublication, downloadPublication
- **Privacy**: Telemetry disabled in build (`NEXT_TELEMETRY_DISABLED=1`)

## Dependabot

- Active for GitHub Actions versions and npm packages
- Groups: linting, testing, UI, react
- Queue cleaned on 2026-05-06: stale PRs #29, #30, #41, #48–#56 closed after triage.
- Accepted locally: TypeScript 6.0.3, @types/node 25.8.0, jsdom 28.1.0, lucide-react 1.8.0, cross-env 10.1.0, lint-staged 16.4.0, postcss 8.5.15, tailwind-merge 3.5.0, knip 6.6.1.
- Accepted locally: `@vitejs/plugin-react` 4.7.0 -> 5.2.0, validated with the full gate.
- Accepted locally: `github/codeql-action` v3 -> v4 in `security.yml`.
- Rejected/deferred: ESLint 10 (`@eslint/config-helpers@^0.6.0` unavailable in the registry), jsdom 29 (`@asamuzakjp/css-color@^5.1.11` unavailable), Vitest 4 / `@vitest/coverage-v8` 4 (unit tests pass but V8 branch coverage drops below the 81% ratchet), and `@vitejs/plugin-react` 6 while Vitest remains on the 3.x toolchain.
