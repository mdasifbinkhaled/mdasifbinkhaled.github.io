# Security Policy

This is the security policy for a single-maintainer academic portfolio site
(static export, no server runtime). The site tracks the latest commit on `main`;
there are no versioned releases, so fixes ship by updating `main`.

## Reporting a Vulnerability

If you discover a security vulnerability, please follow these steps:

### How to Report

1. **DO NOT** open a public issue
2. Email security concerns to: **<mdasifbinkhaled@gmail.com>**
3. Include the following information:
   - Type of vulnerability
   - Full paths of source file(s) related to the vulnerability
   - Location of the affected source code (tag/branch/commit or direct URL)
   - Step-by-step instructions to reproduce the issue
   - Proof-of-concept or exploit code (if possible)
   - Impact of the vulnerability

### What to Expect

You will receive an acknowledgment, and once the issue is confirmed and fixed
we'll coordinate on a disclosure timeline.

### Security Best Practices

This project follows these security practices:

- **Dependency Scanning**: Automated npm audit in CI/CD pipeline
- **Static Analysis**: CodeQL scanning enabled
- **Secure Defaults**: Security headers configured (see CSP note below)
- **Regular Updates**: Dependencies kept current via Dependabot

## Security Features

This website implements the following security measures:

- Content Security Policy (CSP) — see limitation note below
- HTTPS-only deployment via GitHub Pages
- Automated dependency vulnerability scanning
- Regular security audits via GitHub Actions
- Strict TypeScript type checking
- Input sanitization and validation

### CSP delivery limitation (GitHub Pages)

The site is hosted on GitHub Pages, which does not allow custom HTTP response
headers. The CSP is therefore delivered via a `<meta http-equiv>` tag in the
document `<head>`. This has the following consequences, documented here for
reviewers:

- **`frame-ancestors` is not enforceable via `<meta>`** — the directive is
  ignored by browsers when set this way. Clickjacking protection relies on
  GitHub Pages' default `X-Frame-Options: deny` header instead.
- **`report-uri` / `report-to` have reduced utility** — violation reports
  cannot be posted without a controllable endpoint, so the CSP is enforced
  without a reporter.
- **Headers that protect the HTML shell itself** (e.g. `X-Content-Type-Options`,
  `Referrer-Policy`) are applied by GitHub Pages and cannot be further tightened
  from the repo. GitHub Pages does not read Netlify/Cloudflare-style `_headers`
  files, so no such file is tracked here.

If the site moves to a host that supports custom headers (Cloudflare Pages,
Netlify, a reverse proxy, etc.), the CSP should be lifted out of the `<meta>`
tag and served via HTTP response header to close these gaps.

## Known Dependency Advisory Watch

As of 2026-05-26 the dependency tree is clean: `npm audit` and
`npm audit --omit=dev` report **0 vulnerabilities**. The previously tracked
high-severity Next.js advisory was resolved by upgrading to `next@16.2.6`, a
non-force in-place patch within the Next 16 line (no framework downgrade
required).

Development-only vulnerable chains previously pulled in by `serve`, `workbox-build`, and `commitlint` were removed on 2026-05-13 by replacing them with local Node scripts for static E2E serving, service-worker generation, and commit-message validation.

**Action**: stay on the latest available Next 16 patch and upgrade promptly when
new Next 16 patches are published. The CI `audit:ci` gate runs
`npm audit --omit=dev --audit-level=high` against production dependencies
(dev-only build-tool advisories don't ship in a static export), and the weekly
security workflow audits the full tree, failing on any non-build-time critical
advisory.

**Last Updated**: 2026-05-26

## Responsible Disclosure

Please allow reasonable time to address an issue before public disclosure, make a
good-faith effort to avoid privacy violations and data destruction, and don't
exploit a vulnerability beyond what's needed to demonstrate it. Genuine reports
are credited here with your permission.
