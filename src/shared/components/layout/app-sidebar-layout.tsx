'use client';

import { type ReactNode, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { GraduationCap, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { ProfileSidebar } from '@/shared/components/layout/profile-sidebar';
import { Navbar } from '@/shared/components/navigation/navbar';
import { FooterYear } from '@/shared/components/common/footer-year';
import { BackToTop } from '@/shared/components/common/back-to-top';
import { SkipLink } from '@/shared/components/common/skip-link';
import { siteConfig } from '@/shared/config/site';

interface AppSidebarLayoutProps {
  children: ReactNode;
}

/**
 * Accessible responsive sidebar layout with mobile Sheet and desktop collapse
 * Uses Radix Dialog for mobile sidebar with proper accessibility
 */
export function AppSidebarLayout({ children }: AppSidebarLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-border">
        <Link
          href="/"
          className="flex items-center gap-2 transition-fast hover:opacity-80"
          onClick={() => isMobile && setMobileMenuOpen(false)}
        >
          <GraduationCap
            className="h-7 w-7 text-primary flex-shrink-0"
            aria-hidden="true"
          />
          <span
            className={`font-bold text-lg text-foreground transition-normal ${
              !isMobile && desktopSidebarCollapsed ? 'sr-only' : ''
            }`}
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

      {/* Mobile Layout - Hidden on desktop */}
      <div className="lg:hidden min-h-screen flex flex-col">
        <Navbar
          onMobileMenuOpen={() => setMobileMenuOpen(true)}
          showMobileMenuButton={true}
        />

        {/* Mobile Sidebar using Radix Dialog */}
        <Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40 animate-in" />
            <Dialog.Content className="fixed top-0 left-0 h-full w-80 bg-background shadow-lg z-50 animate-in focus:outline-none">
              <VisuallyHidden.Root>
                <Dialog.Title>Navigation Menu</Dialog.Title>
                <Dialog.Description>
                  Main navigation menu with links to different sections of the site
                </Dialog.Description>
              </VisuallyHidden.Root>
              
              <Dialog.Close className="absolute top-4 right-4 p-2 rounded-md hover:bg-accent transition-fast focus-visible">
                <X className="h-4 w-4" />
                <span className="sr-only">Close navigation menu</span>
              </Dialog.Close>
              
              <SidebarContent isMobile={true} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <main
          id="main-content"
          className="flex-1 pt-0"
          role="main"
          tabIndex={-1}
        >
          <div className="container-page py-6">{children}</div>
        </main>
      </div>

      {/* Desktop Layout - Hidden on mobile */}
      <div className="hidden lg:flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside
          id="desktop-sidebar"
          className={`relative flex-shrink-0 transition-normal ${
            desktopSidebarCollapsed ? 'w-[60px]' : 'w-[320px]'
          }`}
          aria-label="Main navigation"
        >
          {/* Collapse Toggle */}
          <button
            className="absolute -right-3 top-6 z-50 h-6 w-6 rounded-full bg-background shadow-md border border-border hover:bg-accent transition-fast focus-visible"
            onClick={() => setDesktopSidebarCollapsed(!desktopSidebarCollapsed)}
            aria-controls="desktop-sidebar"
            aria-expanded={!desktopSidebarCollapsed}
            aria-label={
              desktopSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
            }
          >
            {desktopSidebarCollapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
          </button>

          <SidebarContent isMobile={false} />
        </aside>

        {/* Desktop Main Content */}
        <div className="flex flex-col flex-1 min-w-0">
          <Navbar showMobileMenuButton={false} />

          <main
            id="main-content"
            className="flex-1 min-h-0 flex flex-col"
            role="main"
            tabIndex={-1}
          >
            <div className="container-page py-8 h-full flex-1">
              {children}
            </div>

            <footer
              className="py-6 px-6 text-center border-t bg-background/50 backdrop-blur-sm flex-shrink-0"
              role="contentinfo"
            >
              <p className="text-sm text-muted-foreground">
                &copy; <FooterYear /> {siteConfig.author}. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Built with Next.js, Tailwind CSS, and Radix UI.
              </p>
              {/* One global BackToTop control for the whole site */}
              <BackToTop />
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
