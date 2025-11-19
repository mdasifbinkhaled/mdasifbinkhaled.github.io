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
2. Email security concerns to: **mdasifbinkhaled@gmail.com**
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

- Content Security Policy (CSP)
- HTTPS-only deployment via GitHub Pages
- Automated dependency vulnerability scanning
- Regular security audits via GitHub Actions
- Strict TypeScript type checking
- Input sanitization and validation

## Known Development Dependency Vulnerabilities

The following vulnerabilities exist in development dependencies and are **NOT exploitable** in production:

### glob (HIGH severity) - GHSA-5j98-mcp5-4vw2

- **Affected Versions**: 10.2.0 - 11.0.3
- **Status**: No patch available (latest version 11.0.3 still vulnerable)
- **Location**: Used by `sucrase` and `test-exclude` (dev dependencies)
- **Vulnerability**: Command injection via `-c/--cmd` CLI flag
- **Risk Assessment**: LOW - Not used in production, CLI flags not exposed in build/test context
- **Action**: Monitoring for upstream fixes from glob maintainers

### js-yaml (MODERATE severity) - GHSA-mh29-5h37-fv8m

- **Affected Versions**: 4.0.0 - 4.1.0 (4.1.0 is latest)
- **Status**: No patch available
- **Location**: Used by eslint, commitlint for config parsing
- **Vulnerability**: Prototype pollution in merge operator (`<<`)
- **Risk Assessment**: LOW - Only parses trusted config files, merge operator not used
- **Action**: Monitoring for upstream fixes from js-yaml maintainers

**Note**: Both vulnerabilities are in development tooling only and do not affect the production build or runtime security of the deployed website. The production bundle is completely static HTML/CSS/JS with no vulnerable code.

**Last Updated**: 2025-11-19

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
