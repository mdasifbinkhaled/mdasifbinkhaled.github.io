"use client";

import { type ReactNode } from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClientMountProvider } from './client-mount-provider';
import { AppSidebarLayout } from './app-sidebar-layout';
import { MobileThemeFAB } from '@/components/mobile-theme-fab';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Root provider component that wraps the entire application
 * with all necessary providers (theme, client mount, etc.)
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ClientMountProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        themes={[
          'light', 
          'dark', 
          'system',
          'retro', 
          'cyberpunk', 
          'ocean'
        ]}
      >
        <AppSidebarLayout>{children}</AppSidebarLayout>
        <MobileThemeFAB />
        <Toaster />
      </ThemeProvider>
    </ClientMountProvider>
  );
}
