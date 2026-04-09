import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Per-page WCAG 2.x AA accessibility audit.
 * Tests a representative set of pages beyond just the homepage.
 */

const A11Y_ROUTES = [
  '/',
  '/about',
  '/publications',
  '/research',
  '/teaching',
  '/contact',
  '/cv',
  '/apps',
  '/experience',
  '/service',
];

test.describe('Per-page accessibility audit', () => {
  for (const route of A11Y_ROUTES) {
    test(`${route} passes WCAG 2.x AA`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      // Wait for hydration
      await page.waitForTimeout(300);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const violations = results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.length,
      }));

      expect(violations, `A11y violations on ${route}`).toEqual([]);
    });
  }
});
