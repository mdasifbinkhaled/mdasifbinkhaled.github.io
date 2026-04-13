import { test, expect } from '@playwright/test';
import { CONTENT_ROUTES, REDIRECT_ROUTES } from './fixtures/routes';

/**
 * Smoke tests for every built page.
 * Each page must:
 *   1. Return HTTP 200
 *   2. Have a visible <h1>
 *   3. Not emit uncaught JS errors
 */

test.describe('All-pages smoke', () => {
  for (const route of CONTENT_ROUTES) {
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

test.describe('Redirect pages', () => {
  for (const { from, to } of REDIRECT_ROUTES) {
    test(`${from} redirects to ${to}`, async ({ page }) => {
      // These pages use <meta http-equiv="refresh"> for static-export redirect.
      // Wait for the navigation triggered by the meta refresh to complete.
      await page.goto(from, { waitUntil: 'domcontentloaded' });
      await page.waitForURL(`**${to}*`, { timeout: 10_000 });
      expect(page.url()).toContain(to);
    });
  }
});
