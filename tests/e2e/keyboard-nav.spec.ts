import { test, expect } from '@playwright/test';

/**
 * Keyboard navigation E2E tests.
 * Validates that the site is fully operable via keyboard alone.
 * Skipped on mobile projects where physical keyboard interaction is unavailable.
 */
test.describe('Keyboard navigation', () => {
  test.beforeEach(async ({ page: _page }, testInfo) => {
    test.skip(
      testInfo.project.name === 'mobile-safari',
      'Keyboard nav is not applicable on mobile viewports'
    );
  });

  test('skip-to-content link is focusable and jumps to main', async ({
    page,
  }) => {
    await page.goto('/');
    // First tab should focus the skip link
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    const href = await focused.getAttribute('href');

    // Skip link must exist and point to an anchor
    expect(
      href,
      'Skip link should have an anchor href starting with #'
    ).toBeTruthy();
    expect(
      href!.startsWith('#'),
      `Expected href to start with #, got "${href}"`
    ).toBe(true);

    // Use Enter to activate skip link
    await page.keyboard.press('Enter');
    const target = page.locator(href!);
    await expect(target).toBeVisible();
  });

  test('tab navigates through main nav links', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();

    // Tab through elements until we land inside the nav
    let inNav = false;
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('Tab');
      const active = await page.evaluate(() => {
        const el = document.activeElement;
        return el?.closest('nav') !== null;
      });
      if (active) {
        inNav = true;
        break;
      }
    }
    expect(inNav).toBe(true);
  });

  test('command palette opens with Cmd/Ctrl+K and closes with Escape', async ({
    page,
  }) => {
    await page.goto('/');
    await page.keyboard.press('ControlOrMeta+k');
    const searchInput = page.getByPlaceholder(
      'Search pages, courses, actions…'
    );
    await expect(searchInput).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(searchInput).not.toBeVisible();
  });

  test('Enter activates focused nav link', async ({ page }) => {
    await page.goto('/');
    // Find an About link in any navigation element (handles trailing slash from static export)
    const aboutLink = page
      .locator('a[href="/about"], a[href="/about/"]')
      .first();
    await expect(aboutLink).toBeVisible();
    await aboutLink.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/about/);
  });
});
