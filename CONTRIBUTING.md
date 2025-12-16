# Contributing to Academic Assemblage

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 📋 Prerequisites

- **Node.js** v20 or newer
- **npm** v10 or newer
- **Git** for version control
- A **GitHub account**

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

## 🔀 Pull Request Process

1. **Create a feature branch** from `main` (e.g., `feature/new-component` or `fix/mobile-nav`)
2. **Make your changes** with appropriate tests
3. **Ensure all validations pass**: `npm run validate`
4. **Update documentation** if needed (README, comments, etc.)
5. **Submit a pull request** with a clear description:
   - What changes were made
   - Why the changes were necessary
   - Any breaking changes or migration notes
6. **Address feedback** during code review
7. **Squash commits** if requested before merging

### Pull Request Checklist

- [ ] Tests added/updated and all tests pass
- [ ] TypeScript types are properly defined
- [ ] Documentation updated (if applicable)
- [ ] Commit messages follow Conventional Commits
- [ ] No console errors or warnings
- [ ] Accessibility tested (keyboard navigation, screen readers)

## 🚀 Deployment

Changes to the `main` branch automatically deploy to GitHub Pages via GitHub Actions. No manual deployment is typically needed.

The CI/CD pipeline includes:

- ✅ Linting and type checking
- ✅ Unit tests with coverage
- ✅ Security scanning
- ✅ Build verification
- ✅ Automatic deployment

### Branch Protection Rules (Recommended)

For repository maintainers, configure these branch protection rules on `main`:

1. **Require pull request reviews before merging**
   - Require at least 1 approval
   - Dismiss stale reviews when new commits are pushed

2. **Require status checks to pass before merging**
   - Require branches to be up to date before merging
   - Required checks:
     - `test` (CI workflow)
     - `dependency-audit` (Security workflow)
     - `codeql-analysis` (Security workflow)

3. **Require conversation resolution before merging**

4. **Do not allow bypassing the above settings**

5. **Require signed commits** (optional but recommended)

These rules ensure code quality and prevent broken builds from reaching production.

## 🐛 Reporting Bugs

Found a bug? Please open an issue with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser and OS information

## 💡 Suggesting Features

Feature requests are welcome! Please open an issue describing:

- The problem you're trying to solve
- Your proposed solution
- Alternative solutions considered
- Any additional context

## 📝 Code Style Guidelines

- **TypeScript**: Use strict mode, avoid `any` types
- **React**: Use functional components with hooks
- **Naming**: Use descriptive names (camelCase for variables, PascalCase for components)
- **Imports**: Use absolute imports via `@/` alias
- **Comments**: Write clear comments for complex logic
- **Formatting**: Let Prettier handle formatting automatically

## 🧪 Testing Guidelines

- Write tests for new features and bug fixes
- Maintain minimum 80% code coverage
- Test accessibility features
- Test responsive behavior
- Use descriptive test names

## 📞 Getting Help

- Check existing issues and discussions
- Review the project documentation
- Reach out via issue comments

## 📜 Code of Conduct

Please review our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## 🙏 Thank You

Your contributions make this project better! We appreciate your time and effort.
