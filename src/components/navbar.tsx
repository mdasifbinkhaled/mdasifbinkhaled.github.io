"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { GraduationCap, Menu, Sun, Moon, Palette } from 'lucide-react';
import { mainNavItems } from '@/config/navigation';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onMobileMenuOpen?: () => void;
  showMobileMenuButton?: boolean;
}

export function Navbar({ 
  onMobileMenuOpen, 
  showMobileMenuButton = true
}: NavbarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('retro');
    } else {
      setTheme('light');
    }
  };

  const getThemeLabel = () => {
    if (theme === 'light') return 'Switch to dark mode';
    if (theme === 'dark') return 'Switch to retro mode';
    return 'Switch to light mode';
  };

  const ThemeIcon = () => {
    if (theme === 'light') return <Sun className="h-5 w-5" aria-hidden="true" />;
    if (theme === 'dark') return <Moon className="h-5 w-5" aria-hidden="true" />;
    return <Palette className="h-5 w-5" aria-hidden="true" />;
  };

  const isNavItemActive = (href: string): boolean => {
    if (href === "/" && pathname !== "/") return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header 
      className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Left Group: Mobile Menu and Branding */}
        <div className="flex items-center gap-x-2 sm:gap-x-3">
          {/* Mobile Menu Button */}
          {showMobileMenuButton && onMobileMenuOpen && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onMobileMenuOpen}
              className="lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
          
          <Link 
            href="/" 
            className="flex items-center gap-2"
            aria-label={`${siteConfig.shortName} - Go to homepage`}
          >
            <GraduationCap className="h-7 w-7 text-primary" aria-hidden="true" />
            <span className="font-bold text-lg text-foreground">{siteConfig.shortName}</span>
          </Link>
        </div>

        {/* Desktop Navigation Links - Centered */}
        <nav 
          className="hidden lg:flex flex-1 items-center justify-center gap-x-1 sm:gap-x-2 lg:gap-x-3 text-sm font-medium"
          role="navigation" 
          aria-label="Main navigation"
        >
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

        {/* Right Group: Theme Toggle */}
        <div className="flex items-center gap-x-1 sm:gap-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={cycleTheme} 
            aria-label={getThemeLabel()}
            title={getThemeLabel()}
          >
            <ThemeIcon />
          </Button>
        </div>
      </div>
    </header>
  );
}
