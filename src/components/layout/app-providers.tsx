"use client";

import { type ReactNode } from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AppSidebarLayout } from './app-sidebar-layout';
import { MobileThemeFAB } from '@/components/mobile-theme-fab';

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
      themes={[
        'light',
        'dark',
        'retro',
        'cyberpunk',
        'ocean'
      ]}
    >
      <AppSidebarLayout>{children}</AppSidebarLayout>
      <MobileThemeFAB />
      <Toaster />
    </ThemeProvider>
  );
}
