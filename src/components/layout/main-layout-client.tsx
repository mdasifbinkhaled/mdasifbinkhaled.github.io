
"use client";

import { useState, useEffect, type ReactNode } from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from '@/config/site';
import { FooterYear } from '@/components/footer-year';
import { MotionDiv } from '@/components/motion-div';
import { Navbar } from '@/components/navbar';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset } from '@/components/ui/sidebar';
// SidebarNav is no longer imported here as mainNavItems are removed from this sidebar
import { mainNavItems } from '@/config/navigation';
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
    return null; 
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
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
            <SidebarContent className="p-2 flex flex-col">
              <div className="mb-3 group-data-[state=collapsed]:hidden">
                <h4 className="px-2 pt-1 pb-1 text-xs font-semibold text-sidebar-foreground/70 tracking-wider uppercase">Summary</h4>
                <div className="mx-2 mt-1 p-2 rounded-md text-sidebar-foreground/90 text-xs leading-normal bg-sidebar-accent/20 ">
                  Senior Lecturer & Researcher. Focused on Explainable AI & Multimodal AI in Healthcare. Open to PhD opportunities.
                </div>
              </div>
              {/* SidebarNav with mainNavItems is removed from here */}
              <div className="flex-grow overflow-y-auto"> {/* Ensure Sidebar can scroll if content exceeds height */}
                {/* Placeholder for other potential sidebar content/links later */}
              </div>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="flex flex-col flex-1">
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
          </SidebarInset>
        </div>
      </SidebarProvider>
      <Toaster />
    </ThemeProvider>
  );
}

