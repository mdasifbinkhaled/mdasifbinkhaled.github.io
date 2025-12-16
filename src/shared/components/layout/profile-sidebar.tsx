'use client';

import { memo, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { assetPaths, assetConfig } from '@/shared/config/assets';
import { Button } from '@/shared/components/ui/button';
import { siteConfig } from '@/shared/config/site';
import {
  FileText,
  Mail,
  Github,
  Linkedin,
  BookUser,
  Smartphone,
  User,
  Globe,
  Award,
  Home,
  UserCircle,
  Cpu,
  BookOpenText,
  Presentation,
  Send,
} from 'lucide-react';
import { Separator } from '@/shared/components/ui/separator';
import { cn } from '@/shared/lib/utils';
import { mainNavItems } from '@/shared/config/navigation';

const iconMap: Record<string, React.ElementType> = {
  Home,
  UserCircle,
  Cpu,
  BookOpenText,
  Presentation,
  Send,
};

interface ProfileSidebarProps {
  onLinkClick?: () => void;
  isCollapsed?: boolean;
  hideNav?: boolean;
}

export const ProfileSidebar = memo(function ProfileSidebar({
  onLinkClick,
  isCollapsed = false,
  hideNav = false,
}: ProfileSidebarProps) {
  const [imageError, setImageError] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleLinkClick = useCallback(() => {
    onLinkClick?.();
  }, [onLinkClick]);

  return (
    <div className="flex flex-col h-full bg-sidebar">
      {/* Content Area (no inner scrollbar) */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-sidebar-border scrollbar-track-transparent">
        {/* Profile Section */}
        <div
          className={cn(
            'flex flex-col items-center text-center transition-all duration-200 bg-gradient-to-b from-sidebar-accent/20 to-transparent',
            isCollapsed ? 'p-2 pb-4' : 'p-6 pb-6'
          )}
        >
          <div
            className={cn(
              'relative overflow-hidden rounded-full border-4 border-sidebar-primary/20 shadow-xl mb-5 ring-4 ring-sidebar-background',
              isCollapsed ? 'w-10 h-10' : 'w-32 h-32'
            )}
          >
            {!imageError ? (
              <Image
                src={assetPaths.profile}
                alt={assetConfig.profileImage.alt}
                width={assetConfig.profileImage.width}
                height={assetConfig.profileImage.height}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full bg-sidebar-accent/30 flex items-center justify-center">
                <User
                  className={cn(
                    'text-sidebar-foreground/50',
                    isCollapsed ? 'w-6 h-6' : 'w-16 h-16'
                  )}
                />
              </div>
            )}
          </div>

          {!isCollapsed && (
            <>
              <h3 className="font-bold text-2xl text-sidebar-foreground leading-tight tracking-tight">
                {siteConfig.author}
              </h3>
              <p className="text-sm text-sidebar-foreground/80 mt-2 font-medium leading-relaxed">
                {siteConfig.jobTitle}
              </p>
              <p className="text-xs text-sidebar-foreground/60 mt-0.5 px-2">
                {siteConfig.address.split(',')[0]}
              </p>
              <div className="mt-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                <p className="text-[10px] uppercase tracking-wider text-primary font-bold">
                  Open to PhD
                </p>
              </div>
            </>
          )}
        </div>

        {!isCollapsed && (
          <Separator className="bg-sidebar-border/60 mx-4 w-[calc(100%-2rem)]" />
        )}

        {/* Navigation Section */}
        {!hideNav && (
          <div
            className={cn('flex-none', isCollapsed ? 'p-2' : 'px-6 pt-6 pb-2')}
          >
            {!isCollapsed && (
              <h4 className="text-xs uppercase font-semibold text-sidebar-foreground/80 mb-3 tracking-wider sidebar-section-title">
                Menu
              </h4>
            )}
            <nav className={cn('space-y-1', isCollapsed && 'space-y-1')}>
              {mainNavItems.map((item) => {
                const IconComponent =
                  (item.icon && iconMap[item.icon]) || Globe;
                const active = isActive(item.href);

                return (
                  <Button
                    key={item.href}
                    variant={active ? 'secondary' : 'ghost'}
                    size={isCollapsed ? 'icon' : 'sm'}
                    asChild
                    className={cn(
                      'transition-all duration-300 group',
                      isCollapsed
                        ? 'w-full justify-center'
                        : 'w-full justify-start',
                      active
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground hover:translate-x-1'
                    )}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
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
        )}

        {!isCollapsed && !hideNav && (
          <Separator className="bg-sidebar-border/60 mx-4 w-[calc(100%-2rem)] my-2" />
        )}

        {/* Quick Actions (Contact & CV) */}
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
                onClick={handleLinkClick}
              >
                <FileText
                  className={cn('w-4 h-4', isCollapsed ? '' : 'mr-2')}
                />
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
                <a
                  href={`mailto:${siteConfig.email}`}
                  onClick={handleLinkClick}
                >
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
                  onClick={handleLinkClick}
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
          </div>
        </div>

        {!isCollapsed && (
          <Separator className="bg-sidebar-border/60 mx-4 w-[calc(100%-2rem)]" />
        )}
      </div>

      {/* Social Icons - Sticky at Bottom - Always Visible */}
      <div
        className={cn(
          'flex-shrink-0 bg-sidebar border-t border-sidebar-border/40 shadow-lg',
          isCollapsed ? 'p-2' : 'p-6'
        )}
      >
        {!isCollapsed && (
          <h4 className="text-xs uppercase font-semibold text-sidebar-foreground/60 mb-4 tracking-wider text-center sidebar-section-title">
            Follow Me
          </h4>
        )}
        <div
          className={cn(
            'grid',
            isCollapsed
              ? 'grid-cols-1 gap-2 justify-items-center'
              : 'grid-cols-3 gap-3 justify-items-center'
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group h-9 w-9"
            title={isCollapsed ? 'GitHub Profile' : undefined}
          >
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              onClick={handleLinkClick}
            >
              <Github className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group h-9 w-9"
            title={isCollapsed ? 'LinkedIn Profile' : undefined}
          >
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              onClick={handleLinkClick}
            >
              <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group h-9 w-9"
            title={isCollapsed ? 'Google Scholar Profile' : undefined}
          >
            <a
              href={siteConfig.links.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Scholar Profile"
              onClick={handleLinkClick}
            >
              <BookUser className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group h-9 w-9"
            title={isCollapsed ? 'ResearchGate Profile' : undefined}
          >
            <a
              href={siteConfig.links.researchGate}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ResearchGate Profile"
              onClick={handleLinkClick}
            >
              <Globe className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group h-9 w-9"
            title={isCollapsed ? 'Academia.edu Profile' : undefined}
          >
            <a
              href={siteConfig.links.academiaEdu}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Academia.edu Profile"
              onClick={handleLinkClick}
            >
              <BookOpenText className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group h-9 w-9"
            title={isCollapsed ? 'ORCID Profile' : undefined}
          >
            <a
              href={siteConfig.links.orcid}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ORCID Profile"
              onClick={handleLinkClick}
            >
              <Award className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
});
