import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

export default eslintConfig;