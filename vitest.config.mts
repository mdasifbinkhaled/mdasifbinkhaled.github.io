/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    typecheck: {
      tsconfig: './tests/tsconfig.json',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules/**',
        'tests/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/*.test.{ts,tsx}',
        'coverage/**',
        '.next/**',
        'out/**',
        'public/**',
        'src/app/**/error.tsx',
        'src/app/**/not-found.tsx',
        'src/app/**/global-error.tsx',
        'src/app/**/layout.tsx',
        'src/app/**/page.tsx',
        'src/app/robots.ts',
        'src/app/sitemap.ts',
        'src/shared/types/**',
        'src/shared/config/**',
        // Browser-only export utilities (rely on jsPDF/html2canvas/DOM).
        // Covered indirectly via E2E; unit-testing would require heavy mocking
        // that would verify the mocks rather than the code.
        'src/features/apps/components/seat-planner/pdf-export.ts',
        'src/features/apps/components/seat-planner/csv-export.ts',
        'src/shared/components/common/pdf-viewer.tsx',
        'src/shared/components/infra/sw-register.tsx',
        'src/shared/lib/mdx.ts',
        'vitest.d.ts',
        'next-env.d.ts',
      ],
      thresholds: {
        lines: 64,
        functions: 54,
        branches: 81,
        statements: 64,
      },
      all: true,
      clean: true,
    },
    include: ['tests/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '.next', 'out'],
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
