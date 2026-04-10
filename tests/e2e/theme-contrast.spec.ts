import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const THEMES = ['light', 'dark', 'ocean', 'forest', 'lavender', 'slate'];

test.describe('Color Contrast & Accessibility across Themes', () => {
  for (const theme of THEMES) {
    test(`Validates WCAG AA contrast for theme: ${theme}`, async ({ page }) => {
      // Set theme via localStorage so the ThemeProvider applies it on hydration
      await page.addInitScript((t) => {
        localStorage.setItem('theme', t);
      }, theme);

      await page.goto('/', { waitUntil: 'load' });
      // Wait for theme to be applied via data-theme attribute
      await page.waitForFunction(
        (t) =>
          document.documentElement.getAttribute('data-theme') === t ||
          (t === 'light' &&
            !document.documentElement.getAttribute('data-theme')),
        theme
      );

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa', 'wcag21aa'])
        .withRules(['color-contrast'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
