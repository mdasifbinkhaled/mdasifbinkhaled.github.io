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

      await page.goto('/', { waitUntil: 'networkidle' });
      // Wait for ThemeProvider hydration + CSS variable computation
      await page.waitForTimeout(1000);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa', 'wcag21aa'])
        .withRules(['color-contrast'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
