'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { GraduationCap, Menu } from 'lucide-react';
import { ThemeSelector } from '@/shared/components/ui/theme-selector';
import { CommandMenu } from '@/shared/components/ui/command-menu';
import { mainNavItems } from '@/shared/config/navigation';
import {
  coursesTaughtIUB,
  coursesTaughtBRACU,
} from '@/shared/lib/data/courses';

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
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const HIDE_DELAY = 200; // Delay in milliseconds before hiding

  const handleMouseEnter = () => {
    // Clear any pending hide timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Set a timeout to hide the dropdown after delay
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, HIDE_DELAY);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
            courses={coursesTaughtIUB}
            institution="iub"
          />
          <InstitutionFlyout
            label="BRACU"
            href="/teaching?tab=bracu#courses-taught"
            courses={coursesTaughtBRACU}
            institution="bracu"
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
  courses,
  institution,
}: {
  label: string;
  href: string;
  courses: Array<{ code: string; title: string }>;
  institution: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const HIDE_DELAY = 200; // Delay in milliseconds before hiding

  const handleMouseEnter = () => {
    // Clear any pending hide timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Set a timeout to hide the flyout after delay
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, HIDE_DELAY);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
        {courses.map((c) => (
          <Link
            key={c.code}
            className="block px-3 py-2 hover:bg-accent/50 text-sm"
            href={`/teaching?tab=${institution}#${c.code.toLowerCase().replace(' ', '')}`}
          >
            {c.title}
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
