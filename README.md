# Academic Assemblage

This repository hosts Md Asif Bin Khaled's portfolio site built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. It presents research publications, teaching activities and an interactive timeline of professional experience.

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

### Manual Deployment

For manual deployment to the `gh-pages` branch:

```bash
npm run deploy
```

This runs the production build and pushes the static output using `git subtree`.

## Contributing

Contributions are welcome! Please open pull requests for any improvements. Before proposing changes, review the project goals and style guidelines in [docs/blueprint.md](docs/blueprint.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Accessibility

This site is built with accessibility in mind, featuring semantic HTML, ARIA landmarks, skip navigation, keyboard support, and respect for reduced motion preferences.
