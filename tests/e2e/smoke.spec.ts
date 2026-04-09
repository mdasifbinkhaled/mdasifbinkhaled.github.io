import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Fundamental Route Hydration & Accessibility', () => {
  test('has standard layout rendering context on Home', async ({
    page,
  }, testInfo) => {
    await page.goto('/');
    // Check root semantic header hydration
    await expect(page.locator('h1').first()).toBeVisible();

    // Check profile navigation
    const nav = page.locator('nav:visible').first();
    await expect(nav).toBeVisible();

    // Command Palette Quick Invoke — skip on mobile (no keyboard shortcut)
    if (testInfo.project.name !== 'mobile-safari') {
      await page.keyboard.press('ControlOrMeta+k');
      await expect(
        page.getByPlaceholder('Search pages, courses, actions…')
      ).toBeVisible();
      await page.keyboard.press('Escape');
    }
  });

  test('maintains WCAG 2.x AA accessibility bounds upon mount', async ({
    page,
  }) => {
    await page.goto('/');
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('successfully navigates cross-tier segments', async ({ page }) => {
    await page.goto('/research');
    await expect(page).toHaveTitle(/Research/);

    await page.goto('/publications');
    await expect(page).toHaveTitle(/Publications/);

    await page.goto('/teaching');
    await expect(page).toHaveTitle(/Teaching/);
  });
});
