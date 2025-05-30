
"use client";

import { useState, useEffect, type ReactNode } from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from '@/config/site';
import { FooterYear } from '@/components/footer-year';
import { MotionDiv } from '@/components/motion-div';
import { Navbar } from '@/components/navbar';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarInset 
} from '@/components/ui/sidebar';
// SidebarNav is no longer needed here for mainNavItems
// import { SidebarNav } from '@/components/sidebar-nav';
// import { mainNavItems } from '@/config/navigation';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

interface MainLayoutClientProps {
  children: ReactNode;
}

export function MainLayoutClient({ children }: MainLayoutClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a minimal fallback or null to avoid hydration mismatch
    // This can be a visually hidden div or a simple loader if preferred
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
      <SidebarProvider>
        <Sidebar className="hidden md:flex border-r shadow-md bg-sidebar text-sidebar-foreground">
          <SidebarHeader className="p-4 border-b border-sidebar-border flex items-center justify-center">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-7 w-7 text-sidebar-primary flex-shrink-0" />
              <span className="font-bold text-lg text-sidebar-foreground group-data-[state=collapsed]:hidden whitespace-nowrap">
                {siteConfig.shortName}
              </span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <div className="p-2 group-data-[state=expanded]:block hidden">
              <h3 className="text-sm font-semibold text-sidebar-foreground/70 mb-2">SUMMARY</h3>
              <p className="text-xs text-sidebar-foreground/90">
                A brief overview or summary content can go here. This section is part of the main collapsible sidebar.
                You can add more details about your research focus or teaching philosophy here as a quick glance.
              </p>
            </div>
            {/* 
              Quick Links can be added here later if needed, using a separate NavItem list.
              For example:
              <h3 className="text-sm font-semibold text-sidebar-foreground/70 mt-4 mb-2 p-2 group-data-[state=expanded]:block hidden">QUICK LINKS</h3>
              <SidebarNav items={quickLinkItems} isMobile={false} /> 
            */}
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
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
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </ThemeProvider>
  );
}
