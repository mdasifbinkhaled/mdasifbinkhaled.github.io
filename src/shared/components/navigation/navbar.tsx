'use client';
import Link from 'next/link';
import { useId, type FocusEvent } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { GraduationCap, Menu } from 'lucide-react';
import { ThemeSelector } from '@/shared/components/ui/theme-selector';
import { CommandMenu } from '@/shared/components/ui/command-menu';
import { mainNavItems, courseNavItems } from '@/shared/config/navigation';
import { useHoverDelay } from '@/shared/hooks';

interface NavbarProps {
  onMobileMenuOpen?: () => void;
  showMobileMenuButton?: boolean;
  isMobileMenuOpen?: boolean;
}

export function Navbar({
  onMobileMenuOpen,
  showMobileMenuButton = true,
  isMobileMenuOpen = false,
}: NavbarProps) {
  const path = normalize(usePathname() ?? '/');

  const items = mainNavItems.map((item) => ({
    label: item.label,
    href: item.href,
  }));

  return (
    <div className="flex items-center justify-between w-full gap-4">
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href="/"
          aria-label="MABK – Go to homepage"
          className="flex items-center gap-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring hover:opacity-80 transition-opacity"
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
                  'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring',
                  'hover:bg-accent/50',
                  active
                    ? 'text-primary font-semibold border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
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
            className="lg:hidden px-2 py-1 rounded-sm border focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            onClick={onMobileMenuOpen}
            aria-label="Open navigation menu"
            aria-controls="mobile-nav"
            aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
          >
            <Menu data-testid="menu-icon" className="h-4 w-4" />
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
  const panelId = useId();
  const { isOpen, handleMouseEnter, handleMouseLeave, openNow, closeNow } =
    useHoverDelay();

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={openNow}
      onBlurCapture={(event) => handleBlurOutside(event, closeNow)}
    >
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={cn(
          'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
          'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring',
          'hover:bg-accent/50',
          active
            ? 'text-primary font-semibold border-b-2 border-primary'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        {label}
      </Link>

      {/* Dropdown Panel: active courses (those with pages) + All teaching */}
      <div
        id={panelId}
        aria-label={`${label} navigation links`}
        className={cn(
          'absolute left-1/2 -translate-x-1/2 mt-2 z-40 w-72 bg-background border rounded-lg shadow-lg py-2 transition-all duration-200',
          isOpen
            ? 'visible opacity-100 pointer-events-auto'
            : 'invisible opacity-0 pointer-events-none'
        )}
      >
        {courseNavItems.map((item) => (
          <Link
            key={`${item.href}-${item.sectionId}`}
            className="block px-3 py-2 hover:bg-accent/50 text-sm"
            href={item.href}
            tabIndex={isOpen ? 0 : -1}
          >
            {item.label}
          </Link>
        ))}
        {courseNavItems.length > 0 && <div className="my-1 border-t" />}
        <Link
          className="block px-3 py-2 hover:bg-accent/50 text-sm font-medium"
          href="/teaching"
          tabIndex={isOpen ? 0 : -1}
        >
          All teaching →
        </Link>
      </div>
    </div>
  );
}

const normalize = (p: string) =>
  p.endsWith('/') && p !== '/' ? p.slice(0, -1) : p;

const handleBlurOutside = (
  event: FocusEvent<HTMLElement>,
  closeNow: () => void
) => {
  const nextTarget = event.relatedTarget;
  if (
    !(nextTarget instanceof Node) ||
    !event.currentTarget.contains(nextTarget)
  ) {
    closeNow();
  }
};

const isActive = (path: string, href: string) => {
  const a = normalize(path);
  const b = normalize(href);
  return b === '/' ? a === '/' : a.startsWith(b);
};
