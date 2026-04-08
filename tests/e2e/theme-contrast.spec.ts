import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const THEMES = ['light', 'dark', 'ocean', 'forest', 'lavender', 'slate'];

test.describe('Color Contrast & Accessibility across Themes', () => {
  for (const theme of THEMES) {
    test(`Validates WCAG AA contrast for theme: ${theme}`, async ({ page }) => {
      // Navigate to a rich page
      await page.goto('/');

      // Force the theme using the Next.js ThemeProvider data attribute bypass
      await page.evaluate((t) => {
        document.documentElement.setAttribute('data-theme', t);
        // Force the class toggle as well if needed
        if (document.documentElement.classList.contains('light'))
          document.documentElement.classList.remove('light');
        if (document.documentElement.classList.contains('dark'))
          document.documentElement.classList.remove('dark');
        if (t === 'dark' || t === 'slate') {
          // rough approximation for class-based overrides
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.add('light');
        }
      }, theme);

      // Wait for theme application (CSS transition etc)
      await page.waitForTimeout(500);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa', 'wcag21aa'])
        // Specific focus on just color-contrast rules since structure is tested elsewhere
        .withRules(['color-contrast'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
