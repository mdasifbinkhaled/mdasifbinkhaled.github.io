
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
import { GraduationCap, Menu, PanelLeft, Sun, Moon, Palette } from 'lucide-react';
import { mainNavItems } from '@/config/navigation';
import { cn } from '@/lib/utils';
import { SidebarNav } from './sidebar-nav'; // Assuming SidebarNav is used for mobile

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
    return <Sun className="h-5 w-5" />; // Default to Sun icon
  };

  const isNavItemActive = (href: string): boolean => {
    if (href === "/" && pathname !== "/") return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left side: Site Name/Logo AND Desktop Sidebar Trigger */}
        <div className="flex items-center gap-x-3 sm:gap-x-4"> {/* Adjusted gap */}
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="font-bold text-lg text-foreground">{siteConfig.shortName}</span>
          </Link>
          <SidebarTrigger className="hidden md:flex" aria-label="Toggle main sidebar" />
        </div>

        {/* Desktop Navigation Links - Centered */}
        <nav className="hidden md:flex items-center gap-x-1 sm:gap-x-2 lg:gap-x-3 text-sm font-medium"> {/* Adjusted gap */}
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

        {/* Right side: Theme Toggle and Mobile Menu Trigger */}
        <div className="flex items-center gap-x-1 sm:gap-x-2"> {/* Adjusted gap */}
          <Button variant="ghost" size="icon" onClick={cycleTheme} aria-label="Toggle theme">
            <ThemeIcon />
          </Button>

          {/* Mobile Menu Trigger for Sheet */}
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
                  <SheetTitle className="font-bold text-lg text-sidebar-foreground">
                    {siteConfig.shortName}
                  </SheetTitle>
                </div>
                 <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent">
                      <Menu className="h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> {/* Using Menu as an X example */}
                       <X className="h-6 w-6 पूर्ण-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                {/* Visually hidden title for accessibility, actual title is the logo */}
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
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
