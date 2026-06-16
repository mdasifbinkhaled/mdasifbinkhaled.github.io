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
        // Course-page "Command Center" template: presentational React + DOM
        // hooks (IntersectionObserver, clipboard) are covered via the E2E a11y
        // + smoke suite; the pure logic in `course-page.utils.ts` is unit-tested.
        'src/features/teaching/components/course-page/*.tsx',
        'src/features/teaching/components/course-page/copy-link.ts',
        'src/shared/hooks/use-scrollspy.ts',
      ],
      thresholds: {
        // Recalibrated for vitest 4 / coverage-v8 4 branch counting, which
        // counts optional chaining, nullish coalescing, and default params as
        // branches — measuring lower than vitest 3 on identical code (~82%→~58%).
        lines: 70,
        functions: 60,
        branches: 55,
        statements: 70,
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
