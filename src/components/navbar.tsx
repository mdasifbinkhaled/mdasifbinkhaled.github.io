
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site';
import { mainNavItems } from '@/config/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { GraduationCap, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isItemActive = (href: string): boolean => {
    if (href === "/" && pathname !== "/") return false; // Ensure "/" only matches exact for non-homepage active states
    if (href === "/") return pathname === "/"; // Exact match for homepage
    return pathname.startsWith(href);
  };

  // Render a minimal header or nothing if not mounted to prevent hydration issues with Sheet
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="font-bold text-lg text-foreground">{siteConfig.shortName}</span>
          </Link>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" disabled>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
          <GraduationCap className="h-7 w-7 text-primary" />
          <span className="font-bold text-lg text-foreground">{siteConfig.shortName}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
          {mainNavItems.map((item: NavItem) => (
            !item.disabled && (
              <Button
                key={item.label}
                variant="ghost"
                asChild
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary px-3 py-2",
                  isItemActive(item.href) ? "text-primary bg-accent" : "text-muted-foreground hover:bg-accent/50"
                )}
              >
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {item.label}
                </Link>
              </Button>
            )
          ))}
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
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
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                      >
                         {item.icon && <item.icon className="mr-2 h-5 w-5 shrink-0" />}
                        {item.label}
                      </Link>
                    </Button>
                  )
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
