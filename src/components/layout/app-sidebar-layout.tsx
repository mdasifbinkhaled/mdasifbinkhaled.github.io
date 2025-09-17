"use client";

import { type ReactNode, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ProfileSidebar } from '@/components/profile-sidebar';
import { Navbar } from '@/components/navbar';
import { MotionPage } from '@/components/motion-page';
import { FooterYear } from '@/components/footer-year';
import { SkipLink } from '@/components/skip-link';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

interface AppSidebarLayoutProps {
  children: ReactNode;
}

/**
 * Modern responsive sidebar layout with mobile sheet and desktop sidebar
 */
export function AppSidebarLayout({ children }: AppSidebarLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full bg-sidebar">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-sidebar-border">
        <Link 
          href="/" 
          className="flex items-center gap-2"
          onClick={() => isMobile && setMobileMenuOpen(false)}
        >
          <GraduationCap className="h-7 w-7 text-sidebar-primary flex-shrink-0" aria-hidden="true" />
          <span 
            className={cn(
              "font-bold text-lg text-sidebar-foreground transition-all duration-200",
              !isMobile && desktopSidebarCollapsed && "sidebar-hide-when-collapsed"
            )}
          >
            {siteConfig.shortName}
          </span>
        </Link>
      </div>
      
      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto">
        <ProfileSidebar 
          onLinkClick={() => isMobile && setMobileMenuOpen(false)} 
          isCollapsed={!isMobile && desktopSidebarCollapsed}
        />
      </div>
    </div>
  );

  return (
    <>
      <SkipLink />

      <div className="min-h-screen lg:flex">
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            "relative hidden lg:flex border-r border-sidebar-border bg-sidebar",
            "sidebar-collapse-transition",
            desktopSidebarCollapsed ? "layout-sidebar-collapsed" : "layout-sidebar-width"
          )}
        >
          {/* Collapse Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute -right-3 top-6 z-10 h-6 w-6 rounded-full bg-background shadow-md border border-sidebar-border hover:bg-background",
              "transition-all duration-200"
            )}
            onClick={() => setDesktopSidebarCollapsed(!desktopSidebarCollapsed)}
            aria-label={desktopSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {desktopSidebarCollapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
          </Button>

          <div className={cn(desktopSidebarCollapsed && "sidebar-collapsed")}>
            <SidebarContent isMobile={false} />
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-1 min-w-0 flex-col">
          <div className="lg:hidden">
            <Navbar
              onMobileMenuOpen={() => setMobileMenuOpen(true)}
              showMobileMenuButton={true}
            />

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetContent
                side="left"
                className="w-80 p-0 bg-sidebar border-sidebar-border"
              >
                <SidebarContent isMobile={true} />
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden lg:block">
            <Navbar showMobileMenuButton={false} />
          </div>

          <main
            id="main-content"
            className={cn(
              "flex-1 focus:outline-none min-h-screen pt-16",
              "lg:min-h-0 lg:pt-0"
            )}
            role="main"
            tabIndex={-1}
          >
            <MotionPage>
              <div
                className={cn(
                  "container-responsive",
                  "py-6 sm:py-8",
                  "transition-all duration-300 ease-in-out"
                )}
              >
                {children}
              </div>
            </MotionPage>
          </main>

          <footer
            className="py-6 px-6 text-center border-t bg-background/50 backdrop-blur-sm"
            role="contentinfo"
          >
            <p className="text-sm text-muted-foreground">
              &copy; <FooterYear /> {siteConfig.author}. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Built with Next.js, Tailwind CSS, and ShadCN UI.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
