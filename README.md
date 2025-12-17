# Academic Assemblage

[![Deploy Next.js site to Pages](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/nextjs.yml/badge.svg)](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/nextjs.yml)
[![CI](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/ci.yml)
[![Security Scanning](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/security.yml/badge.svg)](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/security.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository hosts Md Asif Bin Khaled's portfolio site built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. It presents research publications, teaching activities and an interactive timeline of professional experience.

## ✨ Features

- 🚀 **Next.js 15** with App Router and static export
- 📘 **TypeScript** with strict mode
- 🎨 **Tailwind CSS** for styling
- 🧪 **Vitest** for unit testing with 80% coverage threshold
- 🔍 **ESLint** with strict TypeScript rules
- 💅 **Prettier** for code formatting
- 🐶 **Husky** for git hooks
- 📊 **GitHub Actions** for CI/CD
- 🔒 **Security scanning** with CodeQL and npm audit
- ♿ **Accessibility focused** with semantic HTML

## Prerequisites

- **Node.js** v20 or newer (currently tested with v20.17.0)
- **npm** v10 or newer

## Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application runs at <http://localhost:3000> by default.

## Development Workflow

### Testing

Run the comprehensive test suite:

```bash
npm run test        # Interactive mode with watch
npm run test:run    # Single run (CI mode)
```

### Code Quality

Lint the codebase:

```bash
npm run lint
```

Type-check without compilation:

```bash
npm run pre-commit
```

Validate everything (lint + tests + type-check):

```bash
npm run validate
```

## Build

Create an optimized production build:

```bash
npm run build
```

For production deployment with telemetry disabled:

```bash
npm run build:production
```

## Deployment

### Automated Deployment (Recommended)

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions. The workflow:

1. Builds the Next.js static export
2. Uploads to GitHub Pages
3. Site is available at the configured GitHub Pages URL

## 📁 Project Structure

```text
mdasifbinkhaled.github.io/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── features/            # Feature-specific components
│   ├── shared/              # Shared utilities and components
│   └── styles/              # Global styles and design tokens
├── tests/                   # Vitest test suite
├── public/                  # Static assets
├── .github/workflows/       # CI/CD pipelines
└── docs/                    # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) before submitting pull requests.

Before proposing changes, review the project configuration in `.cockpit/PMD.md`.

## 🔒 Security

For security concerns, please review our [Security Policy](SECURITY.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ♿ Accessibility

This site is built with accessibility in mind, featuring:

- ✅ Semantic HTML5 elements
- ✅ ARIA landmarks and labels
- ✅ Skip navigation links
- ✅ Full keyboard support
- ✅ Respect for reduced motion preferences
- ✅ WCAG 2.1 Level AA compliance

## 🙏 Acknowledgments

Built with modern web technologies and deployed on GitHub Pages.
