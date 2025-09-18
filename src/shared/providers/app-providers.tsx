'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode, useEffect } from 'react';
import { AppSidebarLayout } from '@/shared/components/layout/app-sidebar-layout';
import { Toaster } from '@/shared/components/ui/toaster';
import { MobileThemeFAB } from '@/shared/components/common/mobile-theme-fab';

type Props = { children: ReactNode };

export function AppProviders({ children }: Props) {
  // no mount gate, keep theme provider simple
  // you can add other client side hooks if needed
  useEffect(() => {
    // future client side hooks if needed
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AppSidebarLayout>{children}</AppSidebarLayout>
      <MobileThemeFAB />
      <Toaster />
    </ThemeProvider>
  );
}
