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

- Content Security Policy (CSP)
- HTTPS-only deployment via GitHub Pages
- Automated dependency vulnerability scanning
- Regular security audits via GitHub Actions
- Strict TypeScript type checking
- Input sanitization and validation

## Known Development Dependency Vulnerabilities

The following vulnerability exists in a development dependency and is **NOT exploitable** in production:

### js-yaml (MODERATE severity) - GHSA-mh29-5h37-fv8m

- **Affected Versions**: ALL versions (3.x, 4.x) - No version is safe
- **Status**: No patch available across any version
- **Location**: Used by eslint, commitlint for config parsing
- **Vulnerability**: Prototype pollution in merge operator (`<<`)
- **Risk Assessment**: LOW - Only parses trusted config files, merge operator not used
- **Action**: Monitoring for upstream fixes from js-yaml maintainers

**Note**: This vulnerability is in development tooling only and does not affect the production build or runtime security of the deployed website. The production bundle is completely static HTML/CSS/JS with no vulnerable code. The glob vulnerability has been mitigated by downgrading to stable version 10.1.0.

**Last Updated**: 2026-02-05

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
