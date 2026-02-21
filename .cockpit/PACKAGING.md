# PACKAGING.md — Dependencies, Build & Deployment

## Runtime Dependencies

| Package                    | Version | Purpose                                         |
| -------------------------- | ------- | ----------------------------------------------- |
| `next`                     | 16.1.4  | Framework (App Router, static export)           |
| `react`                    | 19.2.3  | UI library                                      |
| `react-dom`                | 19.2.3  | React DOM bindings                              |
| `framer-motion`            | 12.29.0 | Animations                                      |
| `lucide-react`             | 0.544.0 | Icons                                           |
| `next-themes`              | 0.4.6   | Theme management (dark/light/system + 6 themes) |
| `tailwind-merge`           | 3.3.1   | Tailwind class conflict resolution              |
| `clsx`                     | 2.1.1   | Conditional class joining                       |
| `class-variance-authority` | 0.7.1   | Component variant API                           |
| `cmdk`                     | 1.1.1   | Command palette                                 |
| `@radix-ui/*`              | various | Headless UI primitives (10 packages)            |

### Radix UI Packages

- `react-accordion` ^1.2.12
- `react-dialog` ^1.1.15
- `react-dropdown-menu` ^2.1.16
- `react-progress` ^1.1.7
- `react-select` ^2.2.6
- `react-separator` ^1.1.7
- `react-slot` ^1.2.3
- `react-tabs` ^1.1.13
- `react-toast` ^1.2.15
- `react-visually-hidden` ^1.0.3

## Dev Dependencies

| Package                           | Version  | Purpose                      |
| --------------------------------- | -------- | ---------------------------- |
| `typescript`                      | ^5.6.x   | Type checking                |
| `eslint`                          | ^9.39.2  | Linting                      |
| `eslint-config-next`              | ^16.1.4  | Next.js ESLint rules         |
| `prettier`                        | ^3.6.2   | Code formatting              |
| `vitest`                          | ^3.2.4   | Test runner                  |
| `@vitest/coverage-v8`             | ^3.2.4   | Coverage reporting           |
| `@testing-library/react`          | ^16.x    | React testing utilities      |
| `@testing-library/jest-dom`       | ^6.x     | DOM matchers                 |
| `@testing-library/user-event`     | ^14.6.1  | User interaction simulation  |
| `jsdom`                           | ^25.x    | DOM environment for tests    |
| `@vitejs/plugin-react`            | ^4.7.0   | Vite React plugin            |
| `tailwindcss`                     | ^3.4.13  | CSS framework                |
| `tailwindcss-animate`             | ^1.0.7   | Animation utilities          |
| `autoprefixer`                    | ^10.4.20 | CSS vendor prefixing         |
| `postcss`                         | ^8.4.41  | CSS processing               |
| `husky`                           | ^9.1.7   | Git hooks                    |
| `lint-staged`                     | ^15.5.2  | Pre-commit linting           |
| `commitlint`                      | ^20.1.0  | Commit message enforcement   |
| `@commitlint/config-conventional` | ^20.0.0  | Conventional commit rules    |
| `cross-env`                       | ^7.0.3   | Cross-platform env vars      |
| `tsc-files`                       | ^1.1.4   | Type-check staged files only |

## Overrides

```json
{
  "glob": "10.1.0"
}
```

Pinned to avoid breaking changes in glob used by transitive deps.

## Build Pipeline

```
npm run build
  ├── cross-env NEXT_TELEMETRY_DISABLED=1 next build
  │   ├── TypeScript compilation
  │   ├── ESLint checking
  │   ├── Static page generation (20 pages)
  │   ├── SSG for dynamic routes (generateStaticParams)
  │   └── Output to out/ directory
  └── postbuild: creates out/.nojekyll for GitHub Pages
```

### Build Output

- **Format**: Static HTML export (`output: 'export'`)
- **Pages**: 20 static pages
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
| `prepare`          | `husky`                          | Setup git hooks           |

## Known Vulnerabilities

| Package        | Severity | Impact                                      | Mitigation                                        |
| -------------- | -------- | ------------------------------------------- | ------------------------------------------------- |
| `ajv` < 8.18.0 | Moderate | ReDoS with `$data`                          | Dev-only (ESLint chain), no runtime impact        |
| `next` 16.1.4  | High     | Server-side DoS (Image Optimizer, RSC, PPR) | **Fully mitigated** — static export has no server |

## Deployment

- **Platform**: GitHub Pages
- **Trigger**: Push to `main` branch
- **Workflow**: `.github/workflows/nextjs.yml`
- **Custom domain**: mdasifbinkhaled.github.io
- **CDN**: GitHub Pages CDN
- **SSL**: Automatic via GitHub Pages
