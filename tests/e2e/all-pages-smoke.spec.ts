import { test, expect } from '@playwright/test';

/**
 * Smoke tests for every built page.
 * Each page must:
 *   1. Return HTTP 200
 *   2. Have a visible <h1>
 *   3. Not emit uncaught JS errors
 *
 * Redirect-only pages (/experience, /service, /service-awards) are excluded
 * since they immediately redirect to /about#section and don't render content.
 */

const ALL_ROUTES = [
  '/',
  '/about',
  '/apps',
  '/apps/exam-countdown',
  '/apps/gpa-calculator',
  '/apps/grade-calculator',
  '/apps/office-hours',
  '/apps/seat-planner',
  '/blog',
  '/contact',
  '/cv',
  '/publications',
  '/research',
  '/talks',
  '/teaching',
  '/teaching/bracu',
  '/teaching/iub',
];

test.describe('All-pages smoke', () => {
  for (const route of ALL_ROUTES) {
    test(`${route} loads without errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (err) => errors.push(err.message));

      const response = await page.goto(route, {
        waitUntil: 'domcontentloaded',
      });
      expect(response?.status()).toBe(200);

      // Every page must have an h1 for accessibility and SEO
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible({ timeout: 5000 });

      // No uncaught JS errors
      expect(errors).toEqual([]);
    });
  }
});
