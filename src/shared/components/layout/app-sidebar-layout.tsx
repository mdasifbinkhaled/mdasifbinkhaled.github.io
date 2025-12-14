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
            'relative hidden lg:flex flex-col flex-shrink-0 transition-all duration-300 border-r border-sidebar-border bg-sidebar text-sidebar-foreground sticky top-0 max-h-[calc(100vh-1rem)] self-start',
            collapsed ? 'w-[60px]' : 'w-[300px]'
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-3 top-4 z-20 h-6 w-6 rounded-full bg-background shadow-md border border-border hover:bg-accent"
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
          <ProfileSidebar isCollapsed={collapsed} />
        </aside>

        {/* Right column: navbar, content, footer. No inner scrollbars. */}
        <div className="flex-1 min-w-0 flex flex-col">
          <header
            role="banner"
            className="z-10 bg-background/95 backdrop-blur-md border-b shadow-sm"
          >
            <div className="container mx-auto px-6 py-4">
              <Navbar onMobileMenuOpen={() => setMobileOpen(true)} />
            </div>
          </header>

          <main id="main-content" className="flex-1 min-w-0 px-4 lg:px-6">
            <div className="container mx-auto py-6">{children}</div>
          </main>

          <footer className="shrink-0 py-6 px-6 text-center border-t bg-background/50 backdrop-blur">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Md Asif Bin Khaled.
            </p>
            <BackToTop />
          </footer>
        </div>
      </div>
    </div>
  );
}
