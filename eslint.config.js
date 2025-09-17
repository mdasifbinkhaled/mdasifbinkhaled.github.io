const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      'out/**',
      '.next/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.turbo/**',
      'public/**',
      'next-env.d.ts',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts'
    ],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript'
  ),
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
];

module.exports = eslintConfig;