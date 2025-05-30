
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { siteConfig } from '@/config/site';
import { mainNavItems } from '@/config/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'; // Added SheetHeader, SheetTitle
import { SidebarTrigger } from '@/components/ui/sidebar';
import { GraduationCap, Menu, X, PanelLeft, Sun, Moon, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';
import { Icon } from '@/components/icons';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const isItemActive = (href: string): boolean => {
    if (href === "/" && pathname !== "/") return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

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
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Left side: Sidebar Trigger and Site Name/Logo */}
        <div className="flex items-center">
          <SidebarTrigger className="mr-2 hidden md:inline-flex"> {/* For Desktop Collapsible Sidebar */}
            <PanelLeft className="h-6 w-6" />
            <span className="sr-only">Toggle summary sidebar</span>
          </SidebarTrigger>
          <Link href="/" className="flex items-center gap-2 mr-6" onClick={() => setIsMobileMenuOpen(false)}>
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="font-bold text-lg text-foreground">{siteConfig.shortName}</span>
          </Link>
        </div>

        {/* Main navigation is now solely handled by the Sheet (drawer) on the right */}

        {/* Right side: Theme Toggle and Main Navigation Drawer Trigger */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" onClick={cycleTheme} aria-label="Toggle theme">
            <ThemeIcon />
          </Button>

          {/* Main navigation trigger (Sheet for vertical links) - Always visible */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open main menu">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle main menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs p-0 bg-background">
              <SheetHeader className="p-6 pb-2 border-b">
                <div className="flex justify-between items-center">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <GraduationCap className="h-7 w-7 text-primary" />
                    <span className="font-bold text-lg text-foreground">{siteConfig.shortName}</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="-mr-2" aria-label="Close menu">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <SheetTitle className="sr-only">Main Navigation Menu</SheetTitle> {/* Added visually hidden title */}
              </SheetHeader>
              <div className="flex flex-col space-y-1 p-6">
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
      </div>
    </header>
  );
}
