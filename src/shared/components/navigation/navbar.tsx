'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/shared/config/site';
import { GraduationCap, Menu } from 'lucide-react';
import { mainNavItems } from '@/shared/config/navigation';
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
      className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm shadow-sm"
      role="banner"
    >
      <div className="container-page flex h-16 items-center justify-between">
        {/* Left Group: Mobile Menu and Branding */}
        <div className="flex items-center gap-x-3">
          {/* Mobile Menu Button */}
          {showMobileMenuButton && onMobileMenuOpen && (
            <button
              onClick={onMobileMenuOpen}
              className="lg:hidden p-2 rounded-md hover:bg-accent transition-fast focus-visible"
              aria-label="Open navigation menu"
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-fast focus-visible"
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
          className="hidden lg:flex flex-1 items-center justify-center gap-x-1"
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
                  className={`nav-link px-3 py-2 rounded-lg focus-visible relative ${
                    isNavItemActive(item.href)
                      ? 'text-primary font-semibold bg-accent/30'
                      : 'text-foreground/90 hover:text-foreground hover:bg-accent/50'
                  }`}
                  aria-current={isNavItemActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                  {isNavItemActive(item.href) && (
                    <span 
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"
                      aria-hidden="true"
                    />
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
