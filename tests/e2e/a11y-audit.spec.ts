import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { A11Y_ROUTES } from './fixtures/routes';

/**
 * Per-page WCAG 2.x AA accessibility audit.
 * Covers all content pages. Redirect-only pages (/experience, /service,
 * /service-awards) are excluded since they redirect to /about#section.
 */

test.describe('Per-page accessibility audit', () => {
  // F-260: Prevent axe cross-origin iframe pressure timeouts during local parallel runs
  test.describe.configure({ mode: 'serial' });

  for (const route of A11Y_ROUTES) {
    test(`${route} passes WCAG 2.x AA`, async ({ page }) => {
      // F-260: /cv embeds a PDF iframe that puts axe under cross-origin
      // pressure, occasionally exceeding the default 30s budget under local
      // parallel execution. CI runs workers:1 so this is local-only, but we
      // harden the test with test.slow() (tripled timeout) as insurance.
      if (route === '/cv') {
        test.slow();
      }

      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('load');

      let builder = new AxeBuilder({ page }).withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
      ]);

      // Exclude PDF viewer iframe on /cv — it causes axe timeouts
      // under parallel execution due to cross-origin analysis pressure.
      if (route === '/cv') {
        builder = builder.exclude('iframe');
      }

      const results = await builder.analyze();

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
