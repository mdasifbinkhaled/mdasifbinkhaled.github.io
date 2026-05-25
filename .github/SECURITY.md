# Security Policy

## Supported Versions

The following versions of this project are currently being supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of this portfolio website seriously. If you discover a security vulnerability, please follow these steps:

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

- **Response Time**: You will receive an acknowledgment within 48 hours
- **Investigation**: We will investigate the issue and provide an estimated timeline for a fix
- **Updates**: You will receive regular updates on the progress
- **Disclosure**: Once the vulnerability is fixed, we will coordinate with you on the disclosure timeline

### Security Best Practices

This project follows these security practices:

- **Dependency Scanning**: Automated npm audit in CI/CD pipeline
- **Static Analysis**: CodeQL scanning enabled
- **Secure Defaults**: All security headers configured
- **Regular Updates**: Dependencies are regularly updated
- **Code Review**: All changes require review before merging

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

`npm audit` and `npm audit --omit=dev` currently report one high-severity upstream Next.js advisory entry for `next@16.2.4`. Fixing it with `npm audit fix --force` would install a framework downgrade, which is not a safe update path for this Next 16 static-export app.

Development-only vulnerable chains previously pulled in by `serve`, `workbox-build`, and `commitlint` were removed on 2026-05-13 by replacing them with local Node scripts for static E2E serving, service-worker generation, and commit-message validation.

**Action**: stay on the latest available Next 16 patch (`16.2.4` as of 2026-05-25) and upgrade immediately when a non-force fixed Next 16 release is published.

**Last Updated**: 2026-05-25

## Responsible Disclosure

We kindly ask that you:

- Allow us reasonable time to address the vulnerability before public disclosure
- Make a good faith effort to avoid privacy violations and data destruction
- Do not exploit the vulnerability beyond what is necessary to demonstrate the issue

## Recognition

We appreciate security researchers who help keep our project secure. Contributors who responsibly disclose vulnerabilities will be acknowledged (with their permission) in:

- This SECURITY.md file
- Project release notes
- Special recognition in the repository

Thank you for helping keep this project and its users safe! 🛡️
