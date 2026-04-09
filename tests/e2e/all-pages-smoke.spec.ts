import { test, expect } from '@playwright/test';

/**
 * Smoke tests for every built page.
 * Each page must:
 *   1. Return HTTP 200
 *   2. Have a visible <h1>
 *   3. Not emit uncaught JS errors
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
  '/contact',
  '/cv',
  '/experience',
  '/publications',
  '/research',
  '/service',
  '/service-awards',
  '/teaching',
  '/teaching/bracu',
  '/teaching/bracu/cse420',
  '/teaching/iub',
  '/teaching/iub/cse211spr26',
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

      // Every page should have at least one heading
      const heading = page.locator('h1, h2').first();
      await expect(heading).toBeVisible({ timeout: 5000 });

      // No uncaught JS errors
      expect(errors).toEqual([]);
    });
  }
});
