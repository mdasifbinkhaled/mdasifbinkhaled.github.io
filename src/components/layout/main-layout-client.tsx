
"use client";

import { useState, useEffect, type ReactNode } from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from '@/config/site';
import { FooterYear } from '@/components/footer-year';
import { MotionDiv } from '@/components/motion-div';
import { Navbar } from '@/components/navbar';
// SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset, SidebarNav, mainNavItems are no longer directly used here for main layout structure.

interface MainLayoutClientProps {
  children: ReactNode;
}

export function MainLayoutClient({ children }: MainLayoutClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render null or a minimal loader to prevent hydration mismatch before client-side logic runs
    return null;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      themes={['light', 'dark', 'retro']}
    >
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto p-4 md:p-6 lg:p-8"
          >
            {children}
          </MotionDiv>
        </main>
        <footer className="py-6 px-4 md:px-6 lg:px-8 text-center border-t bg-background">
          <p className="text-sm text-muted-foreground">
            &copy; <FooterYear /> {siteConfig.author}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Built with Next.js, Tailwind CSS, and ShadCN UI.
          </p>
        </footer>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
