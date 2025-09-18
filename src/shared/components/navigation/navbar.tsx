'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/shared/config/site';
import { Button } from '@/shared/components/ui/button';
import { GraduationCap, Menu } from 'lucide-react';
import { mainNavItems } from '@/shared/config/navigation';
import { cn } from '@/shared/lib/utils';
import { ThemeSelector } from '@/shared/components/ui/theme-selector';

interface NavbarProps {
  onMobileMenuOpen?: () => void;
  showMobileMenuButton?: boolean;
}

export function Navbar({
  onMobileMenuOpen,
  showMobileMenuButton = true,
}: NavbarProps) {
  const pathname = usePathname();

  // Normalize paths - remove trailing slashes for comparison but keep for active check
  const normalizePathForComparison = (path: string): string => {
    if (path === '/') return path;
    return path.replace(/\/+$/, '');
  };

  const isNavItemActive = (href: string): boolean => {
    const normalizedPathname = normalizePathForComparison(pathname);
    const normalizedHref = normalizePathForComparison(href);

    if (normalizedHref === '/' && normalizedPathname !== '/') return false;
    if (normalizedHref === '/') return normalizedPathname === '/';
    return normalizedPathname.startsWith(normalizedHref);
  };

  return (
    <header
      className="sticky top-0 z-40 w-full border-b-2 border-border/50 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/75 shadow-sm"
      role="banner"
    >
      <div className="container-responsive flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left Group: Mobile Menu and Branding */}
        <div className="flex items-center gap-x-3">
          {/* Mobile Menu Button */}
          {showMobileMenuButton && onMobileMenuOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileMenuOpen}
              className="lg:hidden hover:bg-accent/50 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
            aria-label={`${siteConfig.shortName} - Go to homepage`}
          >
            <GraduationCap
              className="h-7 w-7 text-primary"
              aria-hidden="true"
            />
            <span className="font-bold text-lg text-foreground hidden sm:block">
              {siteConfig.shortName}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links - Centered */}
        <nav
          className="hidden lg:flex flex-1 items-center justify-center gap-x-1 text-sm font-medium"
          role="navigation"
          aria-label="Main navigation"
        >
          {mainNavItems.map(
            (item) =>
              !item.disabled && (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'transition-all duration-200 px-3 py-2 rounded-lg hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 relative',
                    isNavItemActive(item.href)
                      ? 'text-primary font-semibold bg-accent/30'
                      : 'text-foreground/90 hover:text-foreground'
                  )}
                  aria-current={isNavItemActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                  {isNavItemActive(item.href) && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"></span>
                  )}
                </Link>
              )
          )}
        </nav>

        {/* Right Group: Theme Selector */}
        <div className="flex items-center">
          <ThemeSelector variant="default" align="end" showLabel={false} />
        </div>
      </div>
    </header>
  );
}
