import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  {
    ignores: [
      // Build outputs
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',

      // Dependencies
      'node_modules/**',

      // Test coverage
      'coverage/**',
      '.nyc_output/**',

      // TypeScript build info
      '*.tsbuildinfo',

      // Cache directories
      '.turbo/**',
      '.eslintcache',

      // Public assets (no linting needed)
      'public/**',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      // TypeScript strict rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],

      // React/Next.js rules
      'react-hooks/exhaustive-deps': 'error',
      'react/no-unescaped-entities': 'off',
      'react/jsx-curly-brace-presence': [
        'warn',
        {
          props: 'never',
          children: 'never',
        },
      ],

      // Code quality
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  // Relax rules for test files and configs
  {
    files: [
      '**/*.test.{ts,tsx}',
      '**/*.spec.{ts,tsx}',
      'tests/**/*',
      '*.config.{ts,mjs,js}',
      'vitest.d.ts',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      'react/display-name': 'off',
    },
  },
];

export default config;
