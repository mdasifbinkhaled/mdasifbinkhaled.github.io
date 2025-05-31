
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose 
} from '@/components/ui/sheet';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { GraduationCap, Menu, PanelLeft, Sun, Moon, Palette, X } from 'lucide-react';
import { mainNavItems } from '@/config/navigation';
import { cn } from '@/lib/utils';
import { SidebarNav } from './sidebar-nav';

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('retro');
    } else {
      setTheme('light');
    }
  };

  const ThemeIcon = () => {
    if (theme === 'light') return <Sun className="h-5 w-5" />;
    if (theme === 'dark') return <Moon className="h-5 w-5" />;
    if (theme === 'retro') return <Palette className="h-5 w-5" />;
    return <Sun className="h-5 w-5" />;
  };

  const isNavItemActive = (href: string): boolean => {
    if (href === "/" && pathname !== "/") return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left Group: Branding and Desktop Sidebar Trigger */}
        <div className="flex items-center gap-x-3 sm:gap-x-4">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="font-bold text-lg text-foreground">{siteConfig.shortName}</span>
          </Link>
          {/* Desktop Sidebar Trigger */}
          <SidebarTrigger className="hidden md:flex" aria-label="Toggle main sidebar" />
        </div>

        {/* Desktop Navigation Links - Centered */}
        <nav className="hidden md:flex items-center gap-x-1 sm:gap-x-2 lg:gap-x-3 text-sm font-medium">
          {mainNavItems.map((item) => (
            !item.disabled && (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "transition-colors px-2 lg:px-3 py-1 rounded-md",
                  isNavItemActive(item.href) 
                    ? "text-primary font-semibold" 
                    : "text-foreground hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>

        {/* Right Group: Theme Toggle and Mobile Menu Trigger */}
        <div className="flex items-center gap-x-1 sm:gap-x-2">
          <Button variant="ghost" size="icon" onClick={cycleTheme} aria-label="Toggle theme">
            <ThemeIcon />
          </Button>

          {/* Mobile Menu Sheet Trigger - visible only on mobile */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[340px] bg-sidebar text-sidebar-foreground p-0">
              <SheetHeader className="p-4 border-b border-sidebar-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-7 w-7 text-sidebar-primary" />
                  <SheetTitle className="font-bold text-lg text-sidebar-foreground sr-only">
                    {siteConfig.shortName} Menu
                  </SheetTitle>
                  <span className="font-bold text-lg text-sidebar-foreground">
                    {siteConfig.shortName}
                  </span>
                </div>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetClose>
              </SheetHeader>
              <div className="p-2">
                <SidebarNav 
                  items={mainNavItems} 
                  onNavItemClick={() => setIsMobileMenuOpen(false)}
                  isMobile={true} 
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
