import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { mainNavItems } from '@/shared/config/navigation';
import { navIconMap } from '@/shared/lib/nav-icon-map';

interface NavigationSectionProps {
  isCollapsed: boolean;
  onLinkClick?: () => void;
}

export function NavigationSection({
  isCollapsed,
  onLinkClick,
}: NavigationSectionProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className={cn('flex-none', isCollapsed ? 'p-2' : 'px-6 pt-6 pb-2')}>
      {!isCollapsed && (
        <h4 className="text-xs uppercase font-semibold text-sidebar-foreground/80 mb-3 tracking-wider sidebar-section-title">
          Menu
        </h4>
      )}
      <nav className={cn('space-y-1', isCollapsed && 'space-y-1')}>
        {mainNavItems.map((item) => {
          const IconComponent = (item.icon && navIconMap[item.icon]) || Globe;
          const active = isActive(item.href);

          return (
            <Button
              key={item.href}
              variant={active ? 'secondary' : 'ghost'}
              size={isCollapsed ? 'icon' : 'sm'}
              asChild
              className={cn(
                'transition-all duration-300 group',
                isCollapsed ? 'w-full justify-center' : 'w-full justify-start',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground hover:translate-x-1'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Link
                href={item.href}
                onClick={onLinkClick}
                aria-current={active ? 'page' : undefined}
              >
                <IconComponent
                  className={cn(
                    'flex-shrink-0 transition-transform duration-200',
                    active ? 'text-primary' : 'group-hover:scale-110',
                    isCollapsed ? 'h-4 w-4' : 'mr-3 h-4 w-4'
                  )}
                />
                {!isCollapsed && (
                  <span className="truncate text-sm sidebar-button-text">
                    {item.label}
                  </span>
                )}
              </Link>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
