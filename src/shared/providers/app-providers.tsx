'use client';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      themes={[
        'light',
        'dark',
        'ocean',
        'warm',
        'forest',
        'midnight',
        'sunset',
        'lavender',
        'slate',
        'crimson',
        'emerald',
        'indigo',
        'vintage',
      ]}
    >
      {children}
    </ThemeProvider>
  );
}
