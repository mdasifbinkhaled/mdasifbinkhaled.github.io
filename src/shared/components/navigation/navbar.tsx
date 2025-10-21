'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { GraduationCap, Menu } from 'lucide-react';
import { ThemeSelector } from '@/shared/components/ui/theme-selector';
import { mainNavItems } from '@/shared/config/navigation';

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

        <ThemeSelector variant="compact" align="end" showLabel={false} />
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
