'use client';

import { useState } from 'react';

import { cn } from '@/shared/lib/utils';

import { Button } from '@/shared/components/ui/button';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/shared/components/ui/sheet';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { BackToTop } from '@/shared/components/common/back-to-top';

import { ProfileSidebar } from '@/shared/components/layout/profile-sidebar';

import { Navbar } from '@/shared/components/navigation/navbar';

import { siteConfig } from '@/shared/config/site';

export default function AppSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Mobile sheet */}

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          id="mobile-nav"
          side="left"
          className="w-80 p-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border z-[60]"
        >
          <VisuallyHidden asChild>
            <SheetTitle>Navigation menu</SheetTitle>
          </VisuallyHidden>

          <VisuallyHidden asChild>
            <SheetDescription>Site sections and links</SheetDescription>
          </VisuallyHidden>

          <ProfileSidebar onLinkClick={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Two-column layout on desktop */}

      <div className="lg:flex">
        {/* Desktop sidebar - natural height, no inner scrollbars */}

        <aside
          id="desktop-sidebar"
          className={cn(
            'hidden lg:flex flex-col flex-shrink-0 transition-all duration-300 border-r border-sidebar-border bg-sidebar text-sidebar-foreground fixed top-0 left-0 h-screen z-60 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]',

            collapsed ? 'w-[60px]' : 'w-80'
          )}
        >
          <ProfileSidebar isCollapsed={collapsed} hideNav={true} />
        </aside>

        {/* Desktop sidebar toggle button - overlays navbar and content */}

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'hidden lg:inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200',

            'fixed top-[3.75rem] z-[80] h-6 w-6 rounded-full bg-background shadow-md border border-border hover:bg-accent',

            collapsed
              ? 'left-[60px] -translate-x-1/2'
              : 'left-80 -translate-x-1/2'
          )}
          onClick={() => setCollapsed(!collapsed)}
          aria-controls="desktop-sidebar"
          aria-expanded={!collapsed}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>

        {/* Right column: navbar, content, footer. No inner scrollbars. */}

        <div
          className={cn(
            'flex-1 min-w-0 flex flex-col transition-all duration-300',

            collapsed ? 'lg:ml-[60px]' : 'lg:ml-80'
          )}
        >
          <header
            role="banner"
            className={cn(
              'fixed top-0 z-30 bg-background/95 backdrop-blur-md border-b shadow-sm transition-all duration-300',

              'left-0 w-full',

              collapsed
                ? 'lg:left-[60px] lg:w-[calc(100%-60px)]'
                : 'lg:left-80 lg:w-[calc(100%-20rem)]'
            )}
          >
            <div className="container mx-auto px-6 py-4">
              <Navbar onMobileMenuOpen={() => setMobileOpen(true)} />
            </div>
          </header>

          {/* Spacer to account for fixed navbar height */}

          <div className="h-[73px] flex-shrink-0" aria-hidden="true" />

          <main
            id="main-content"
            className="flex-1 min-w-0 px-4 lg:px-6 scroll-mt-20"
            style={{ scrollMarginTop: '5rem' }}
          >
            <div className="container mx-auto py-6">{children}</div>
          </main>

          <footer className="shrink-0 py-6 px-6 text-center border-t bg-background/50 backdrop-blur">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {siteConfig.author}.
            </p>

            <BackToTop />
          </footer>
        </div>
      </div>
    </div>
  );
}
