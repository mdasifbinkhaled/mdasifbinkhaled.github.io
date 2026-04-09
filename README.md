# Academic Portfolio

[![Deploy](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/nextjs.yml/badge.svg)](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/nextjs.yml)
[![CI](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/ci.yml)
[![Security](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/security.yml/badge.svg)](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/security.yml)
[![LHCI](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/lhci.yml/badge.svg)](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/actions/workflows/lhci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, accessible academic portfolio built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. Designed to showcase research, publications, teaching, and professional experience with high visual fidelity.

🌐 **Live Site**: [mdasifbinkhaled.github.io](https://mdasifbinkhaled.github.io)

---

## ✨ Features

### Core Capabilities

- **📚 Publications** — Display research papers with abstracts, keywords, and citation links
- **🎓 Teaching Portfolio** — Course pages with schedules, resources, and announcements
- **💼 Experience Timeline** — Academic and professional experience showcase
- **🔬 Research Areas** — Highlight research interests and ongoing projects
- **📄 CV Download** — Integrated PDF viewer and download
- **📝 Blog** — MDX-powered blog with syntax highlighting
- **🎤 Talks** — Conference talks and presentations showcase

### Technical Highlights

| Category      | Technology                                          |
| ------------- | --------------------------------------------------- |
| **Framework** | Next.js 16 (App Router, Static Export)              |
| **Language**  | TypeScript 5.6 (Strict Mode)                        |
| **Styling**   | Tailwind CSS 4.1 (CSS-first config)                 |
| **Testing**   | Vitest (357+ tests, 65%+ coverage) + Playwright E2E |
| **Linting**   | ESLint 9 + Prettier                                 |
| **CI/CD**     | GitHub Actions (4 workflows)                        |
| **Security**  | CodeQL, npm audit, CSP hardened                     |
| **A11y**      | WCAG 2.1 AA (CI-enforced via Playwright + axe-core) |
| **Themes**    | 6 color themes with WCAG AA contrast compliance     |

---

## 🚀 Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** v20.0.0 or higher ([Download](https://nodejs.org/))
- **npm** v10.0.0 or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

Verify your installation:

```bash
node --version   # Should output v20.x.x or higher
npm --version    # Should output 10.x.x or higher
git --version    # Should output git version 2.x.x
```

### Step-by-Step Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io.git
cd mdasifbinkhaled.github.io
```

#### 2. Install Dependencies

```bash
npm install
```

This installs all required packages including Next.js, TypeScript, Tailwind CSS, and development tools.

#### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### 4. Verify Installation

Run the validation suite to ensure everything is set up correctly:

```bash
npm run validate
```

This runs linting, formatting checks, tests, and type checking. All should pass with a fresh install.

---

## 🔧 Environment Setup (Optional)

Create a `.env.local` file for optional features:

```bash
cp .env.example .env.local
```

Available environment variables:

| Variable                        | Description                     | Required |
| ------------------------------- | ------------------------------- | -------- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 ID           | No       |
| `NEXT_PUBLIC_ENABLE_ANALYTICS`  | Enable analytics (`true/false`) | No       |
| `NEXT_PUBLIC_SENTRY_DSN`        | Sentry DSN for error tracking   | No       |

---

## 📜 Scripts

| Command              | Description                                        |
| -------------------- | -------------------------------------------------- |
| `npm run dev`        | Start development server (hot reload)              |
| `npm run build`      | Create optimized static export                     |
| `npm run test`       | Run tests in watch mode                            |
| `npm run test:run`   | Run tests once (for CI)                            |
| `npm run test:e2e`   | Run Playwright E2E tests (requires build first)    |
| `npm run lint`       | Lint and auto-fix code                             |
| `npm run lint:check` | Lint without fixing (for CI)                       |
| `npm run format`     | Format code with Prettier                          |
| `npm run typecheck`  | Type-check without emitting files                  |
| `npm run validate`   | Full validation (lint + format + test + typecheck) |

---

## 📁 Project Structure

```text
.
├── src/
│   ├── app/              # Next.js App Router (pages, layouts, metadata)
│   ├── features/         # Feature modules
│   │   ├── about/        # About page components
│   │   ├── apps/         # Student tools (grade calc, seat planner, etc.)
│   │   ├── home/         # Homepage components
│   │   ├── research/     # Research page components
│   │   └── teaching/     # Teaching portfolio & course pages
│   ├── shared/           # Shared infrastructure
│   │   ├── components/   # UI, layout, navigation, common
│   │   ├── config/       # Site configuration (SSoT)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Data, SEO, validation utilities
│   │   ├── providers/    # App-level providers (themes)
│   │   └── types/        # TypeScript type definitions
│   └── styles/           # Global CSS and design tokens
├── content/              # MDX blog posts
├── tests/                # Vitest + Playwright test suites
├── public/               # Static assets (images, CV, favicon)
├── .cockpit/             # Project Master Document (PMD)
└── .github/workflows/    # CI/CD pipelines (ci, deploy, security, lhci)
```

---

## 🎨 Customization

### Changing Site Content

All content is configured in `src/shared/config/` and `src/shared/lib/data/`:

| File                       | Purpose                          |
| -------------------------- | -------------------------------- |
| `config/site.ts`           | Site name, URL, author info      |
| `config/navigation.ts`     | Navigation menu structure        |
| `config/themes.ts`         | Theme definitions (6 themes)     |
| `lib/data/publications.ts` | Publication entries              |
| `lib/data/experience.ts`   | Work experience items            |
| `lib/data/courses/`        | Course data (per-course folders) |

### Adding a New Course

1. Create a new file in `src/shared/lib/data/courses/`
2. Export course data following the `CourseData` schema
3. Import and add to the courses index

### Changing Themes

Edit `src/shared/config/themes.ts` to modify existing themes or add new ones.

---

## 🚢 Deployment

### GitHub Pages (Automatic)

Pushes to `main` automatically deploy via GitHub Actions:

1. CI runs (lint, test, typecheck)
2. Build creates static export
3. Deploys to GitHub Pages
4. Live at configured domain

### Manual Deployment

```bash
npm run build    # Creates static export in 'out/' folder
```

The `out/` folder can be deployed to any static hosting service.

---

## 🤝 Contributing

1. Review `.cockpit/PMD.md` for project conventions
2. Create a feature branch from `main`
3. Follow [Conventional Commits](https://www.conventionalcommits.org/)
4. Ensure `npm run validate` passes
5. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io/issues)
- **Documentation**: [`.cockpit/PMD.md`](.cockpit/PMD.md)
