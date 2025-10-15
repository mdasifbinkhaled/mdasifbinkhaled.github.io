'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { GraduationCap, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface NavbarProps {
  onMobileMenuOpen?: () => void;
  showMobileMenuButton?: boolean;
}

export function Navbar({
  onMobileMenuOpen,
  showMobileMenuButton = true,
}: NavbarProps) {
  const path = normalize(usePathname() ?? '/');
  const { theme, setTheme } = useTheme();

  const items = [
    { label: 'Home', href: '/' },
    { label: 'About Me', href: '/about/' },
    { label: 'Experience', href: '/experience/' },
    { label: 'Research', href: '/research/' },
    { label: 'Publications', href: '/publications/' },
    { label: 'Teaching', href: '/teaching/' },
    { label: 'Service & Awards', href: '/service-awards/' },
    { label: 'Contact', href: '/contact/' },
  ];

  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <div className="flex items-center gap-2">
        <Link
          href="/"
          aria-label="Go to homepage"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <GraduationCap
            data-testid="graduation-cap-icon"
            className="h-6 w-6"
          />
          <span className="font-semibold">Portfolio</span>
        </Link>
      </div>

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

        <nav
          className="hidden lg:flex items-center gap-1"
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

        <button
          data-testid="theme-selector"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="p-2 rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Toggle theme"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>
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
