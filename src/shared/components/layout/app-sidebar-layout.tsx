'use client';

import { useState } from 'react';

import { cn } from '@/shared/lib/utils';

import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';

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

import { mainNavItems } from '@/shared/config/navigation';

import { LAYOUT } from '@/shared/config/constants';

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
          className="w-80 p-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border z-sidebar"
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
            'hidden lg:flex flex-col flex-shrink-0 transition-all duration-300 border-r border-sidebar-border bg-sidebar text-sidebar-foreground fixed top-0 left-0 h-screen z-sidebar shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]',

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

            'fixed top-[3.75rem] z-sidebar-toggle h-6 w-6 rounded-full bg-background shadow-md border border-border hover:bg-accent',

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
              'fixed top-0 z-navbar bg-background/95 backdrop-blur-md border-b shadow-sm transition-all duration-300',

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

          {/* Spacer to account for fixed navbar height */}
          <div
            className="flex-shrink-0"
            style={{ height: LAYOUT.NAVBAR_HEIGHT }}
            aria-hidden="true"
          />

          <main
            id="main-content"
            className="flex-1 min-w-0 px-4 lg:px-6 scroll-mt-20"
          >
            <div className="container mx-auto py-6">{children}</div>
          </main>

          <footer className="shrink-0 py-8 px-6 border-t bg-background/50 backdrop-blur">
            <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-sm font-medium text-foreground">
                  {siteConfig.author}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  &copy; {new Date().getFullYear()} All rights reserved.
                </p>
              </div>

              <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="text-center md:text-right flex flex-col items-center md:items-end gap-3">
                <p className="text-xs text-muted-foreground">
                  Last updated: {siteConfig.lastUpdated}
                </p>
                <BackToTop />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
