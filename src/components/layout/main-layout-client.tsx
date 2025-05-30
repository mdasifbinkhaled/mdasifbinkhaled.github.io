"use client";

import { useState, useEffect, type ReactNode } from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from '@/config/site';
import { FooterYear } from '@/components/footer-year';
import { Navbar } from '@/components/navbar';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarInset 
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { ProfileSidebar } from '@/components/profile-sidebar';
import { MotionPage } from '@/components/motion-page';

interface MainLayoutClientProps {
  children: ReactNode;
}

export function MainLayoutClient({ children }: MainLayoutClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a minimal layout to avoid hydration mismatch
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-4">{children}</div>
      </div>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      themes={['light', 'dark', 'retro']}
    >
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar collapsible="icon" side="left" className="hidden md:flex border-r shadow-md bg-sidebar text-sidebar-foreground">
            <SidebarHeader className="p-4 border-b border-sidebar-border flex items-center justify-center">
              <Link href="/" className="flex items-center gap-2">
                <GraduationCap className="h-7 w-7 text-sidebar-primary flex-shrink-0" />
                <span className="font-bold text-lg text-sidebar-foreground group-data-[state=collapsed]:hidden whitespace-nowrap">
                  {siteConfig.shortName}
                </span>
              </Link>
            </SidebarHeader>
            <SidebarContent className="p-0 overflow-y-auto">
              <ProfileSidebar />
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="flex flex-col flex-1">
            <Navbar />
            <main className="flex-1">
              <MotionPage>
                {children}
              </MotionPage>
            </main>
            <footer className="py-6 px-4 md:px-6 lg:px-8 text-center border-t bg-background">
              <p className="text-sm text-muted-foreground">
                &copy; <FooterYear /> {siteConfig.author}. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Built with Next.js, Tailwind CSS, and ShadCN UI.
              </p>
            </footer>
          </SidebarInset>
        </div>
        <Toaster />
      </SidebarProvider>
    </ThemeProvider>
  );
}