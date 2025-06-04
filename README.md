# Academic Assemblage

This repository hosts Md Asif Bin Khaled's portfolio site built with **Next.js**, **TypeScript**, and **Firebase**. It presents research publications, teaching activities and an interactive timeline of professional experience.

## Prerequisites

- **Node.js** v20 or newer
- **npm**

## Setup

Install dependencies first:

```bash
npm install
```

To start a local development server run:

```bash
npm run dev
```

The application defaults to http://localhost:9002.

## Build

Create an optimized production build with:

```bash
npm run build
```

## Deployment

A convenience script is included to deploy the static output to the `gh-pages` branch:

```bash
npm run deploy
```

This runs `next build`, adds a `.nojekyll` file to the `out` directory and pushes the result using `git subtree`.

## Contributing

Contributions are welcome! Please open pull requests for any improvements. Before proposing changes, review the project goals and style guidelines in [docs/blueprint.md](docs/blueprint.md).
