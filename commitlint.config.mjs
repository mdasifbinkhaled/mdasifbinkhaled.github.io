/**
 * ==========================================
 * Commitlint Configuration
 * ==========================================
 *
 * Enforces conventional commit message format for better changelog generation
 * and version management.
 *
 * Format: <type>(<scope>): <subject>
 *
 * Examples:
 * - feat(ui): add dark mode toggle
 * - fix(api): resolve data fetching issue
 * - docs(readme): update installation steps
 * - refactor(utils): simplify date formatting
 * - test(components): add button tests
 * - chore(deps): upgrade next.js to v15
 *
 * @see https://www.conventionalcommits.org/
 */

const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Enforce types
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style changes (formatting, etc.)
        'refactor', // Code refactoring
        'perf', // Performance improvements
        'test', // Adding or updating tests
        'build', // Build system changes
        'ci', // CI/CD changes
        'chore', // Maintenance tasks
        'revert', // Revert previous commit
      ],
    ],
    // Length limits
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 100],
    // Enforce lowercase type
    'type-case': [2, 'always', 'lower-case'],
    // Enforce lowercase scope
    'scope-case': [2, 'always', 'lower-case'],
    // Subject should not end with period
    'subject-full-stop': [2, 'never', '.'],
    // Subject should be sentence-case, start-case, pascal-case, upper-case
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
  },
};

export default config;
