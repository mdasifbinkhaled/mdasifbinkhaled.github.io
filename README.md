# Academic Portfolio

[![Deploy](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/nextjs.yml/badge.svg)](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/nextjs.yml)
[![CI](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/ci.yml)
[![Security](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/security.yml/badge.svg)](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/security.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, accessible academic portfolio built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Designed to showcase research, publications, teaching, and professional experience with high visual fidelity.

---

## Features

| Category      | Technology                             |
| ------------- | -------------------------------------- |
| **Framework** | Next.js 15 (App Router, Static Export) |
| **Language**  | TypeScript (Strict Mode)               |
| **Styling**   | Tailwind CSS 3.4                       |
| **Testing**   | Vitest (89+ tests)                     |
| **Linting**   | ESLint + Prettier                      |
| **CI/CD**     | GitHub Actions                         |
| **Security**  | CodeQL, npm audit                      |
| **A11y**      | WCAG 2.1 AA Compliant                  |

---

## Quick Start

### Prerequisites

- Node.js **v20+**
- npm **v10+**

### Installation

```bash
npm install
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command              | Description                               |
| -------------------- | ----------------------------------------- |
| `npm run dev`        | Start development server                  |
| `npm run build`      | Create production build                   |
| `npm run test`       | Run tests in watch mode                   |
| `npm run test:run`   | Run tests once (CI)                       |
| `npm run lint`       | Lint and fix code                         |
| `npm run lint:check` | Lint without fixing                       |
| `npm run format`     | Format code with Prettier                 |
| `npm run typecheck`  | Type-check without emit                   |
| `npm run validate`   | Full validation (lint + test + typecheck) |

---

## Project Structure

```text
src/
├── app/              # Next.js App Router (pages, layouts)
├── features/         # Feature modules (about, home, teaching, etc.)
├── shared/           # Shared infrastructure
│   ├── components/   # UI, layout, navigation, common
│   ├── config/       # Site configuration (SSoT)
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Data, SEO, validation utilities
│   └── types/        # Type definitions
└── styles/           # Global CSS and design tokens

tests/                # Vitest test suite
public/               # Static assets
.cockpit/             # Project Master Document (PMD)
.github/workflows/    # CI/CD pipelines
```

---

## Deployment

Pushes to `main` trigger automatic deployment to GitHub Pages via GitHub Actions.

The workflow:

1. Builds static export
2. Deploys to GitHub Pages
3. Site available at configured URL

---

## Contributing

1. Review `.cockpit/PMD.md` for project conventions
2. Follow [Conventional Commits](https://www.conventionalcommits.org/)
3. Ensure `npm run validate` passes before PR

---

## License

[MIT](LICENSE)
