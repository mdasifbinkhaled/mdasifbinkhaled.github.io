'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { GraduationCap, Menu } from 'lucide-react';
import { ThemeSelector } from '@/shared/components/ui/theme-selector';
import { CommandMenu } from '@/shared/components/ui/command-menu';
import {
  mainNavItems,
  iubCourseNavItems,
  bracuCourseNavItems,
} from '@/shared/config/navigation';
import type { NavItem } from '@/shared/types';
import { useHoverDelay } from '@/shared/hooks';

interface NavbarProps {
  onMobileMenuOpen?: () => void;
  showMobileMenuButton?: boolean;
}

export function Navbar({
  onMobileMenuOpen,
  showMobileMenuButton = true,
}: NavbarProps) {
  const path = normalize(usePathname() ?? '/');

  const items = mainNavItems.map((item) => ({
    label: item.label,
    href: item.href,
  }));

  return (
    <div className="flex items-center justify-between w-full gap-4">
      <div className="flex items-center gap-2 flex-shrink-0">
        <Link
          href="/"
          aria-label="Go to homepage"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:opacity-80 transition-opacity"
        >
          <GraduationCap
            data-testid="graduation-cap-icon"
            className="h-6 w-6 text-primary"
          />
          <span className="font-bold text-lg">MABK</span>
        </Link>
      </div>

      <nav
        className="hidden lg:flex items-center gap-1 flex-1 justify-center"
        aria-label="Main navigation"
      >
        {items.map((it) => {
          const active = isActive(path, it.href);
          const isTeaching = it.href === '/teaching';
          if (!isTeaching) {
            return (
              <Link
                key={it.href}
                href={it.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'hover:bg-accent/50',
                  active
                    ? 'text-primary font-semibold bg-accent/30 border-b-2 border-primary'
                    : 'text-foreground/80 hover:text-foreground'
                )}
              >
                {it.label}
              </Link>
            );
          }

          return (
            <TeachingDropdown
              key={it.href}
              href={it.href}
              label={it.label}
              active={active}
            />
          );
        })}
      </nav>

      <div className="flex items-center gap-2">
        {showMobileMenuButton && (
          <button
            className="lg:hidden px-2 py-1 rounded border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={onMobileMenuOpen}
            aria-label="Open navigation menu"
            aria-controls="mobile-nav"
            aria-expanded="false"
          >
            <Menu data-testid="menu-icon" className="h-4 w-4" />
            <span className="sr-only">Menu</span>
          </button>
        )}

        <CommandMenu />
        <ThemeSelector variant="compact" align="end" showLabel={false} />
      </div>
    </div>
  );
}

// Teaching Dropdown Component with delay on unhover
function TeachingDropdown({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  const { isOpen, handleMouseEnter, handleMouseLeave } = useHoverDelay();

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'hover:bg-accent/50',
          active
            ? 'text-primary font-semibold bg-accent/30 border-b-2 border-primary'
            : 'text-foreground/80 hover:text-foreground'
        )}
      >
        {label}
      </Link>

      {/* Dropdown Panel: simple vertical with flyouts */}
      <div
        className={cn(
          'absolute left-1/2 -translate-x-1/2 mt-2 z-40 w-56 bg-background border rounded-lg shadow-lg py-2 transition-all duration-200',
          isOpen
            ? 'visible opacity-100 pointer-events-auto'
            : 'invisible opacity-0 pointer-events-none'
        )}
      >
        <div className="relative">
          <InstitutionFlyout
            label="IUB"
            href="/teaching?tab=iub#courses-taught"
            navItems={iubCourseNavItems}
          />
          <InstitutionFlyout
            label="BRACU"
            href="/teaching?tab=bracu#courses-taught"
            navItems={bracuCourseNavItems}
          />
          <Link
            className="block px-3 py-2 hover:bg-accent/50"
            href="/teaching?tab=support#courses-taught"
          >
            TA/ST/SoD
          </Link>
        </div>
      </div>
    </div>
  );
}

// Institution Flyout Component with delay on unhover
function InstitutionFlyout({
  label,
  href,
  navItems,
}: {
  label: string;
  href: string;
  navItems: NavItem[];
}) {
  const { isOpen, handleMouseEnter, handleMouseLeave } = useHoverDelay();

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link className="block px-3 py-2 hover:bg-accent/50" href={href}>
        {label}
      </Link>
      {/* Flyout */}
      <div
        className={cn(
          'absolute top-0 left-full ml-2 w-72 max-h-80 overflow-auto bg-background border rounded-lg shadow-lg py-2 transition-all duration-200 z-50',
          isOpen
            ? 'visible opacity-100 pointer-events-auto'
            : 'invisible opacity-0 pointer-events-none'
        )}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            className="block px-3 py-2 hover:bg-accent/50 text-sm"
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

const normalize = (p: string) =>
  p.endsWith('/') && p !== '/' ? p.slice(0, -1) : p;
const isActive = (path: string, href: string) => {
  const a = normalize(path);
  const b = normalize(href);
  return b === '/' ? a === '/' : a.startsWith(b);
};
