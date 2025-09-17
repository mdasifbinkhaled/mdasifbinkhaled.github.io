'use client';

import { type ReactNode } from 'react';
import { ThemeProvider } from '@/shared/components/common/theme-provider';
import { Toaster } from '@/shared/components/ui/toaster';
import { AppSidebarLayout } from './app-sidebar-layout';
import { MobileThemeFAB } from '@/shared/components/common/mobile-theme-fab';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Root provider component that wraps the entire application
 * with all necessary providers (theme, layout, notifications, etc.)
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      themes={['light', 'dark', 'retro', 'cyberpunk', 'ocean']}
    >
      <AppSidebarLayout>{children}</AppSidebarLayout>
      <MobileThemeFAB />
      <Toaster />
    </ThemeProvider>
  );
}
