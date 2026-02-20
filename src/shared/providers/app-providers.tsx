'use client';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { getThemeNames, DEFAULT_THEME } from '@/shared/config/themes';

/**
 * Application Providers
 * Wraps the app with theme and other global providers
 */
export function AppProviders({ children }: { children: ReactNode }) {
  // Derive themes from single source of truth
  const availableThemes = getThemeNames();

  useEffect(() => {
    // Register Service Worker for PWA compliance and offline caching
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.error('Service Worker registration failed:', err);
      });
    }
  }, []);

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
