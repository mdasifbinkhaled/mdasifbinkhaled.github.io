'use client';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { getThemeNames, DEFAULT_THEME } from '@/shared/config/themes';

/**
 * Application Providers
 * Wraps the app with theme and other global providers
 */
export function AppProviders({ children }: { children: ReactNode }) {
  // Derive themes from single source of truth
  const availableThemes = getThemeNames();

  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme={DEFAULT_THEME}
      enableSystem={false}
      themes={availableThemes}
    >
      {children}
    </ThemeProvider>
  );
}
