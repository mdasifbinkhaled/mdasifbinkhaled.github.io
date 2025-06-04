# Contributing

## Setup
1. Install dependencies:
   ```sh
   npm install
   ```
2. Initialize Husky hooks:
   ```sh
   npm run prepare
   ```

## Commit Messages
This project uses [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. Use the format:

```
<type>(scope): summary
```

Example:

```
feat(auth): add login page
```

Valid types include `feat`, `fix`, `docs`, `chore`, and more. Commit messages are checked automatically with `commitlint`.

## Pre-commit
Husky runs linting and tests before each commit:

```
npm run lint
npm test
```

Make sure these commands pass before committing.
