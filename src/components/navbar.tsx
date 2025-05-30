"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site';
import { mainNavItems } from '@/config/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'; 
import { GraduationCap, Menu, X, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';
import { Icon } from '@/components/icons';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isItemActive = (href: string): boolean => {
    if (href === "/" && pathname !== "/") return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          {/* SidebarTrigger for desktop, controlled by CSS media queries (hidden md:inline-flex) */}
          <SidebarTrigger className="mr-2 hidden md:inline-flex">
            <PanelLeft className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </SidebarTrigger>

          {/* Site logo/name for mobile, controlled by CSS media queries (md:hidden) */}
          <Link href="/" className="flex items-center gap-2 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="font-bold text-lg text-foreground">{siteConfig.shortName}</span>
          </Link>
        </div>

        {/* Desktop nav items can be added here if needed, separate from sidebar */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
          {/* Example: Desktop-specific links could go here if desired */}
        </nav>

        {/* Mobile menu trigger, controlled by CSS media queries (md:hidden) */}
        <div className="md:hidden">
          <MobileSheetTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </MobileSheetTrigger>
        </div>

        {/* Mobile menu Sheet */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="w-full max-w-xs p-6 bg-background">
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between items-center mb-6 pb-2 border-b">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <GraduationCap className="h-7 w-7 text-primary" />
                  <span className="font-bold text-lg text-foreground">{siteConfig.shortName}</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="-mr-2">
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              {mainNavItems.map((item: NavItem) => (
                !item.disabled && (
                  <Button
                    key={item.label}
                    variant="ghost"
                    asChild
                    className={cn(
                      "w-full justify-start text-base py-3 px-3",
                      isItemActive(item.href) ? "text-primary bg-accent" : "text-foreground hover:bg-accent/50"
                    )}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Link
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                    >
                       {item.icon && <Icon name={item.icon} className="mr-2 h-5 w-5 shrink-0" />}
                      {item.label}
                    </Link>
                  </Button>
                )
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}