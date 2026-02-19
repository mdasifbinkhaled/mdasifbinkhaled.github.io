import { describe, it, expect } from 'vitest';
import { siteConfig } from '../src/shared/config/site';
import { mainNavItems } from '../src/shared/config/navigation';
import { themeConfigs, getThemeConfig } from '../src/shared/config/themes';
import { academicEvents } from '../src/shared/lib/analytics';

describe('Site configuration smoke tests', () => {
  it('siteConfig has required fields', () => {
    expect(siteConfig.name).toBeTruthy();
    expect(siteConfig.url).toMatch(/^https?:\/\//);
    expect(siteConfig.author).toBeTruthy();
    expect(siteConfig.email).toContain('@');
  });

  it('siteConfig URL matches GitHub Pages domain', () => {
    expect(siteConfig.url).toBe('https://mdasifbinkhaled.github.io');
  });
});

describe('Navigation configuration', () => {
  it('mainNavItems contains Home and Contact', () => {
    const labels = mainNavItems.map((i) => i.label);
    expect(labels).toContain('Home');
    expect(labels).toContain('Contact');
  });

  it('all nav items have href starting with /', () => {
    for (const item of mainNavItems) {
      expect(item.href).toMatch(/^\//);
    }
  });
});

describe('Theme configuration', () => {
  it('provides at least light and dark themes', () => {
    const names = Object.keys(themeConfigs);
    expect(names).toContain('light');
    expect(names).toContain('dark');
  });

  it('getThemeConfig returns valid config for known theme', () => {
    const cfg = getThemeConfig('dark');
    expect(cfg).toBeDefined();
    expect(cfg.label).toBeTruthy();
  });
});

describe('Analytics exports', () => {
  it('exports all wired-up academic event functions', () => {
    expect(typeof academicEvents.viewPublication).toBe('function');
    expect(typeof academicEvents.downloadPublication).toBe('function');
    expect(typeof academicEvents.viewCV).toBe('function');
    expect(typeof academicEvents.downloadCV).toBe('function');
  });

  it('does not export removed dead methods', () => {
    const keys = Object.keys(academicEvents);
    expect(keys).not.toContain('search');
    expect(keys).not.toContain('pageView');
    expect(keys).not.toContain('themeChanged');
    expect(keys).not.toContain('contactFormSubmit');
  });
});
