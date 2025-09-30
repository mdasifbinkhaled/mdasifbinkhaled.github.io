# Contributing

## Prerequisites

- Node.js v20 or newer
- npm v10 or newer

## Development Setup

1. Fork and clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Development Workflow

### Code Quality

Before submitting changes, ensure your code meets our quality standards:

```bash
# Run all validations (recommended)
npm run validate

# Or run individually:
npm run lint         # ESLint
npm run test:run     # Tests
npm run pre-commit   # TypeScript type checking
```

### Testing

We maintain comprehensive test coverage. Run tests during development:

```bash
npm run test        # Interactive mode with file watching
npm run test:run    # Single run (CI mode)
```

Add tests for new features and ensure existing tests pass.

### Commit Messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

```text
<type>(scope): summary

[optional body]

[optional footer]
```

**Examples:**

```text
feat(ui): add dark mode toggle
fix(navigation): resolve mobile menu accessibility
docs(readme): update installation instructions
test(utils): add unit tests for date formatting
```

**Valid types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Commit messages are validated automatically with `commitlint`.

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes with appropriate tests
3. Ensure all validations pass: `npm run validate`
4. Submit a pull request with a clear description
5. Address any feedback during code review

## Deployment

Changes to the `main` branch automatically deploy to GitHub Pages via GitHub Actions. No manual deployment is typically needed.
