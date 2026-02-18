# PUBLICATION.md — Deployment & Distribution

## Hosting

| Property          | Value                                     |
| ----------------- | ----------------------------------------- |
| **Platform**      | GitHub Pages                              |
| **URL**           | https://mdasifbinkhaled.github.io         |
| **Repository**    | mdasifbinkhaled/mdasifbinkhaled.github.io |
| **Deploy method** | GitHub Actions → Static Export → Pages    |
| **SSL**           | Automatic (GitHub managed)                |
| **CDN**           | GitHub Pages CDN (Fastly)                 |

## Deployment Pipeline

```
Push to main
  └── .github/workflows/nextjs.yml
        ├── Checkout code
        ├── Setup Node.js 20+
        ├── Install dependencies (npm ci)
        ├── Build (next build → static export to out/)
        ├── Upload artifact (actions/upload-pages-artifact)
        └── Deploy to GitHub Pages (actions/deploy-pages)
```

## CI Workflows

### `ci.yml` — Pull Request Checks

- Triggers: Pull requests to `main`
- Runs: lint, typecheck, test, build
- All must pass to merge

### `nextjs.yml` — Production Deploy

- Triggers: Push to `main`
- Builds and deploys to GitHub Pages

### `security.yml` — Security Audit

- Triggers: Weekly schedule + on push
- Runs: `npm audit`
- Reports vulnerabilities

## Static Export Details

- **Output**: `out/` directory
- **Format**: Pre-rendered HTML + JS bundles
- **No server required**: All pages are static HTML
- **`.nojekyll`**: Created by postbuild to disable Jekyll processing
- **`_headers`**: Security headers file (effective on Cloudflare/Netlify, informational on GitHub Pages)

## SEO Assets

| Asset         | Location                   | Status                      |
| ------------- | -------------------------- | --------------------------- |
| `robots.txt`  | `/robots.txt` (generated)  | ✅                          |
| `sitemap.xml` | `/sitemap.xml` (generated) | ✅ (18+ URLs)               |
| `humans.txt`  | `/humans.txt` (static)     | ✅                          |
| JSON-LD       | Embedded in `<head>`       | ✅ Person + Website schemas |
| OpenGraph     | `<meta>` tags in layout    | ✅                          |
| Twitter Cards | `<meta>` tags in layout    | ✅                          |

## PWA

| Asset                        | Status                          |
| ---------------------------- | ------------------------------- |
| `site.webmanifest`           | ✅ Present                      |
| App icons (192x192, 512x512) | ⚠️ Referenced but may not exist |
| Service Worker               | ❌ Not implemented              |
| Offline support              | ❌ Not implemented              |

## Analytics

- **Google Analytics**: GA4 via `gtag.js`
- **Implementation**: `src/shared/lib/analytics.ts` (345 LOC)
- **Events tracked**: Page views, clicks, form submissions, theme changes
- **Privacy**: Telemetry disabled in build (`NEXT_TELEMETRY_DISABLED=1`)

## Dependabot

- Active for GitHub Actions versions
- Active for npm packages
- Groups: linting, testing, UI, react
- 24 automated branches
