import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Must mock env before importing the module
const originalEnv = { ...process.env };

describe('analytics', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('trackEvent is a no-op when analytics is disabled', async () => {
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS = 'false';
    const { trackEvent } = await import('@/shared/lib/analytics');
    // Should not throw
    trackEvent('test_event', { key: 'value' });
  });

  it('trackEvent is a no-op in development mode', async () => {
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS = 'true';
    (process.env as Record<string, string>).NODE_ENV = 'development';
    const { trackEvent } = await import('@/shared/lib/analytics');
    trackEvent('test_event');
  });

  it('academicEvents exposes expected methods', async () => {
    const { academicEvents, portfolioEvents } =
      await import('@/shared/lib/analytics');
    expect(typeof academicEvents.viewPublication).toBe('function');
    expect(typeof academicEvents.downloadPublication).toBe('function');
    expect(typeof academicEvents.viewCV).toBe('function');
    expect(typeof academicEvents.downloadCV).toBe('function');
    expect(typeof portfolioEvents.publicationsFilter).toBe('function');
    expect(typeof portfolioEvents.commandPaletteSearch).toBe('function');
    expect(typeof portfolioEvents.commandPaletteSelect).toBe('function');
  });

  it('academicEvents methods call without errors', async () => {
    const { academicEvents, portfolioEvents } =
      await import('@/shared/lib/analytics');
    // All should be no-ops in test environment (no gtag, analytics disabled)
    academicEvents.viewPublication('pub-1', 'Test Paper');
    academicEvents.downloadPublication('pub-1', 'Test Paper');
    academicEvents.viewCV();
    academicEvents.downloadCV();
    portfolioEvents.publicationsFilter({
      queryLength: 3,
      yearFilter: '2024',
      typeFilter: 'Conference',
      resultCount: 1,
    });
    portfolioEvents.commandPaletteSearch(4);
    portfolioEvents.commandPaletteSelect('Publications', 4);
  });
});
