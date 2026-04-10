import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Per-page WCAG 2.x AA accessibility audit.
 * Covers all content pages. Redirect-only pages (/experience, /service,
 * /service-awards) are excluded since they redirect to /about#section.
 */

const A11Y_ROUTES = [
  '/',
  '/about',
  '/apps',
  '/blog',
  '/contact',
  '/cv',
  '/publications',
  '/research',
  '/talks',
  '/teaching',
];

test.describe('Per-page accessibility audit', () => {
  for (const route of A11Y_ROUTES) {
    test(`${route} passes WCAG 2.x AA`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('load');

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
