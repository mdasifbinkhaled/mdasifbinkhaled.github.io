import { FileText, Mail, Smartphone } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { siteConfig } from '@/shared/config/site';
import { cn } from '@/shared/lib/utils';
import { TimeDisplay } from '@/shared/components/common/time-display';

interface ActionsSectionProps {
  isCollapsed: boolean;
  onLinkClick?: () => void;
  hideNav?: boolean;
}

export function ActionsSection({
  isCollapsed,
  onLinkClick,
  hideNav = false,
}: ActionsSectionProps) {
  return (
    <div className={cn('flex-grow', isCollapsed ? 'p-2' : 'px-6 py-4')}>
      {!isCollapsed && (
        <h4 className="text-xs uppercase font-semibold text-sidebar-foreground/60 mb-3 tracking-wider sidebar-section-title">
          Contact & Actions
        </h4>
      )}

      <div className={cn('space-y-2', isCollapsed && 'space-y-2')}>
        {/* Primary Action: CV */}
        <Button
          variant="default"
          size={isCollapsed ? 'icon' : 'sm'}
          asChild
          className={cn(
            'w-full shadow-md transition-all hover:scale-105 active:scale-95 mb-4 font-semibold',
            isCollapsed ? 'justify-center p-0' : 'justify-center'
          )}
          title={isCollapsed ? 'Download CV' : undefined}
        >
          <a
            href={siteConfig.links.cv}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onLinkClick}
          >
            <FileText className={cn('w-4 h-4', isCollapsed ? '' : 'mr-2')} />
            {!isCollapsed && 'Download CV'}
          </a>
        </Button>

        <div className="space-y-1">
          <Button
            variant="ghost"
            size={isCollapsed ? 'icon' : 'sm'}
            asChild
            className={cn(
              'transition-all duration-300 hover:translate-x-1 hover:bg-sidebar-accent/50 text-sidebar-foreground/80',
              isCollapsed ? 'w-full justify-center' : 'w-full justify-start'
            )}
            title={isCollapsed ? siteConfig.email : undefined}
          >
            <a href={`mailto:${siteConfig.email}`} onClick={onLinkClick}>
              <Mail
                className={cn(
                  'flex-shrink-0 transition-transform duration-200',
                  isCollapsed ? 'h-4 w-4' : 'mr-3 h-4 w-4'
                )}
              />
              {!isCollapsed && (
                <span className="truncate text-xs sidebar-button-text">
                  {siteConfig.email}
                </span>
              )}
            </a>
          </Button>

          <Button
            variant="ghost"
            size={isCollapsed ? 'icon' : 'sm'}
            asChild
            className={cn(
              'transition-all duration-300 hover:translate-x-1 hover:bg-sidebar-accent/50 text-sidebar-foreground/80',
              isCollapsed ? 'w-full justify-center' : 'w-full justify-start'
            )}
            title={isCollapsed ? siteConfig.phone : undefined}
          >
            <a
              href={`tel:${siteConfig.phone.replace(/\s|\(|\)/g, '')}`}
              onClick={onLinkClick}
            >
              <Smartphone
                className={cn(
                  'flex-shrink-0 transition-transform duration-200',
                  isCollapsed ? 'h-4 w-4' : 'mr-3 h-4 w-4'
                )}
              />
              {!isCollapsed && (
                <span className="truncate text-xs sidebar-button-text">
                  {siteConfig.phone}
                </span>
              )}
            </a>
          </Button>
        </div>

        {/* Dual Time Display */}
        {!hideNav && (
          <TimeDisplay userTimezone="Asia/Dhaka" isCollapsed={isCollapsed} />
        )}
      </div>
    </div>
  );
}
