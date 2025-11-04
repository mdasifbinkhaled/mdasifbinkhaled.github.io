'use client';

import { memo, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { assetPaths, assetConfig } from '@/shared/config/assets';
import { Button } from '@/shared/components/ui/button';
import { siteConfig } from '@/shared/config/site';
import {
  ExternalLink,
  FileText,
  Mail,
  Github,
  Linkedin,
  BookUser,
  Smartphone,
  User,
  Globe,
  Award,
} from 'lucide-react';
import { Separator } from '@/shared/components/ui/separator';
import { cn } from '@/shared/lib/utils';

interface ProfileSidebarProps {
  onLinkClick?: () => void;
  isCollapsed?: boolean;
}

export const ProfileSidebar = memo(function ProfileSidebar({
  onLinkClick,
  isCollapsed = false,
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
    <div className="flex flex-col h-full max-h-[calc(100vh-1rem)] bg-sidebar overflow-hidden">
      {/* Scrollable Content Area - Constrained height */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        {/* Profile Section */}
        <div
          className={cn(
            'flex flex-col items-center text-center transition-all duration-200',
            isCollapsed ? 'p-2' : 'p-2 sm:p-2.5'
          )}
        >
          <div
            className={cn(
              'relative overflow-hidden rounded-full border-2 border-sidebar-primary/30 shadow-lg',
              isCollapsed
                ? 'w-10 h-10 mb-1'
                : 'w-20 h-20 sm:w-24 sm:h-24 mb-1.5'
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
                    isCollapsed ? 'w-6 h-6' : 'w-12 h-12 sm:w-14 sm:h-14'
                  )}
                />
              </div>
            )}
          </div>

          {!isCollapsed && (
            <>
              <h3 className="font-bold text-sm sm:text-xl text-sidebar-foreground leading-tight mt-1">
                {siteConfig.author}
              </h3>
              <p className="text-[10px] sm:text-[13px] text-sidebar-foreground/90 mt-0.5 font-medium">
                Senior Lecturer & Researcher
              </p>
              <p className="text-[12px] text-sidebar-foreground/75 mt-0.5 px-2">
                {siteConfig.address.split(',')[0]}{' '}
                {/* Show only first part of address e.g. Bashundhara R/A */}
              </p>
              <div className="mt-1 px-2 py-0.5 bg-sidebar-accent/20 rounded-full border border-sidebar-border/50">
                <p className="text-[9px] text-sidebar-foreground/90 font-medium">
                  Open to PhD Opportunities
                </p>
              </div>
            </>
          )}
        </div>

        {!isCollapsed && (
          <Separator className="bg-sidebar-border/60 mx-4 w-[calc(100%-2rem)] my-1" />
        )}

        {/* Quick Info */}
        <div
          className={cn('flex-grow', isCollapsed ? 'p-2' : 'p-2 sm:p-2.5 pb-2')}
        >
          {!isCollapsed && (
            <h4 className="text-[10px] sm:text-xs uppercase font-semibold text-sidebar-foreground/80 mb-1 tracking-wider sidebar-section-title">
              Contact & Links
            </h4>
          )}

          <div className={cn('space-y-1', isCollapsed && 'space-y-1')}>
            <Button
              variant="ghost"
              size={isCollapsed ? 'icon' : 'sm'}
              asChild
              className={cn(
                'transition-all duration-300 hover:translate-x-1 focus-visible:translate-x-1 focus-visible:bg-sidebar-accent group',
                isCollapsed
                  ? 'w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  : 'w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
              title={isCollapsed ? siteConfig.email : undefined}
            >
              <a href={`mailto:${siteConfig.email}`} onClick={handleLinkClick}>
                <Mail
                  className={cn(
                    'flex-shrink-0 group-hover:scale-110 transition-transform duration-200',
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
                'transition-all duration-300 hover:translate-x-1 focus-visible:translate-x-1 focus-visible:bg-sidebar-accent group',
                isCollapsed
                  ? 'w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  : 'w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
              title={isCollapsed ? siteConfig.phone : undefined}
            >
              <a
                href={`tel:${siteConfig.phone.replace(/\s|\(|\)/g, '')}`}
                onClick={handleLinkClick}
              >
                <Smartphone
                  className={cn(
                    'flex-shrink-0 group-hover:scale-110 transition-transform duration-200',
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

            <div
              className={cn('pt-0.5', isCollapsed ? 'space-y-1' : 'space-y-1')}
            >
              <Button
                variant="outline"
                size={isCollapsed ? 'icon' : 'sm'}
                asChild
                className={cn(
                  'bg-sidebar-accent/10 hover:bg-sidebar-accent/30 border-sidebar-border/60 hover:border-sidebar-border text-sidebar-foreground transition-all duration-300 hover:translate-x-1 hover:shadow-lg focus-visible:translate-x-1 focus-visible:shadow-lg group',
                  isCollapsed ? 'w-full justify-center' : 'w-full justify-start'
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
                    className={cn(
                      'flex-shrink-0 group-hover:scale-110 transition-transform duration-200',
                      isCollapsed ? 'h-4 w-4' : 'mr-3 h-4 w-4'
                    )}
                  />
                  {!isCollapsed && (
                    <span className="font-medium text-xs sidebar-button-text">
                      Download CV
                    </span>
                  )}
                </a>
              </Button>

              <Button
                variant="outline"
                size={isCollapsed ? 'icon' : 'sm'}
                asChild
                className={cn(
                  'bg-sidebar-accent/10 hover:bg-sidebar-accent/30 border-sidebar-border/60 hover:border-sidebar-border text-sidebar-foreground transition-all duration-300 hover:translate-x-1 hover:shadow-lg focus-visible:translate-x-1 focus-visible:shadow-lg group',
                  isCollapsed
                    ? 'w-full justify-center'
                    : 'w-full justify-start',
                  isActive('/research') &&
                    'bg-sidebar-accent/20 border-sidebar-primary/50 text-sidebar-accent-foreground font-semibold'
                )}
                title={isCollapsed ? 'Research Focus' : undefined}
              >
                <Link
                  href="/research"
                  aria-current={isActive('/research') ? 'page' : undefined}
                  {...(onLinkClick && { onClick: onLinkClick })}
                >
                  <ExternalLink
                    className={cn(
                      'flex-shrink-0 group-hover:scale-110 transition-transform duration-200',
                      isCollapsed ? 'h-4 w-4' : 'mr-3 h-4 w-4'
                    )}
                  />
                  {!isCollapsed && (
                    <span className="font-medium text-xs sidebar-button-text">
                      Research Focus
                    </span>
                  )}
                </Link>
              </Button>

              <Button
                variant="outline"
                size={isCollapsed ? 'icon' : 'sm'}
                asChild
                className={cn(
                  'bg-sidebar-accent/10 hover:bg-sidebar-accent/30 border-sidebar-border/60 hover:border-sidebar-border text-sidebar-foreground transition-all duration-300 hover:translate-x-1 hover:shadow-lg focus-visible:translate-x-1 focus-visible:shadow-lg group',
                  isCollapsed
                    ? 'w-full justify-center'
                    : 'w-full justify-start',
                  isActive('/publications') &&
                    'bg-sidebar-accent/20 border-sidebar-primary/50 text-sidebar-accent-foreground font-semibold'
                )}
                title={isCollapsed ? 'Publications' : undefined}
              >
                <Link
                  href="/publications"
                  aria-current={isActive('/publications') ? 'page' : undefined}
                  {...(onLinkClick && { onClick: onLinkClick })}
                >
                  <FileText
                    className={cn(
                      'flex-shrink-0 group-hover:scale-110 transition-transform duration-200',
                      isCollapsed ? 'h-4 w-4' : 'mr-3 h-4 w-4'
                    )}
                  />
                  {!isCollapsed && (
                    <span className="font-medium text-xs sidebar-button-text">
                      Publications
                    </span>
                  )}
                </Link>
              </Button>
            </div>

            {/* Social Icons - After Contact & Links */}
            <div className={cn('mt-2 pt-1.5', isCollapsed && 'mt-1.5 pt-1')}>
              <div
                className={cn(
                  'flex items-center flex-wrap',
                  isCollapsed
                    ? 'flex-col gap-1.5 justify-center'
                    : 'justify-center gap-2 sm:gap-2.5'
                )}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className={cn(
                    'text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group',
                    isCollapsed ? 'h-7 w-7' : 'h-8 w-8 sm:h-9 sm:w-9'
                  )}
                  title={isCollapsed ? 'GitHub Profile' : undefined}
                >
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    onClick={handleLinkClick}
                  >
                    <Github
                      className={cn(
                        'group-hover:scale-110 transition-transform duration-200',
                        isCollapsed
                          ? 'h-3.5 w-3.5'
                          : 'h-3.5 w-3.5 sm:h-4 sm:w-4'
                      )}
                    />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className={cn(
                    'text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group',
                    isCollapsed ? 'h-7 w-7' : 'h-8 w-8 sm:h-9 sm:w-9'
                  )}
                  title={isCollapsed ? 'LinkedIn Profile' : undefined}
                >
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    onClick={handleLinkClick}
                  >
                    <Linkedin
                      className={cn(
                        'group-hover:scale-110 transition-transform duration-200',
                        isCollapsed
                          ? 'h-3.5 w-3.5'
                          : 'h-3.5 w-3.5 sm:h-4 sm:w-4'
                      )}
                    />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className={cn(
                    'text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group',
                    isCollapsed ? 'h-7 w-7' : 'h-8 w-8 sm:h-9 sm:w-9'
                  )}
                  title={isCollapsed ? 'Google Scholar Profile' : undefined}
                >
                  <a
                    href={siteConfig.links.googleScholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Google Scholar Profile"
                    onClick={handleLinkClick}
                  >
                    <BookUser
                      className={cn(
                        'group-hover:scale-110 transition-transform duration-200',
                        isCollapsed
                          ? 'h-3.5 w-3.5'
                          : 'h-3.5 w-3.5 sm:h-4 sm:w-4'
                      )}
                    />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className={cn(
                    'text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group',
                    isCollapsed ? 'h-7 w-7' : 'h-8 w-8 sm:h-9 sm:w-9'
                  )}
                  title={isCollapsed ? 'ResearchGate Profile' : undefined}
                >
                  <a
                    href={siteConfig.links.researchGate}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="ResearchGate Profile"
                    onClick={handleLinkClick}
                  >
                    <Globe
                      className={cn(
                        'group-hover:scale-110 transition-transform duration-200',
                        isCollapsed
                          ? 'h-3.5 w-3.5'
                          : 'h-3.5 w-3.5 sm:h-4 sm:w-4'
                      )}
                    />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className={cn(
                    'text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group',
                    isCollapsed ? 'h-7 w-7' : 'h-8 w-8 sm:h-9 sm:w-9'
                  )}
                  title={isCollapsed ? 'ORCID Profile' : undefined}
                >
                  <a
                    href={siteConfig.links.orcid}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="ORCID Profile"
                    onClick={handleLinkClick}
                  >
                    <Award
                      className={cn(
                        'group-hover:scale-110 transition-transform duration-200',
                        isCollapsed
                          ? 'h-3.5 w-3.5'
                          : 'h-3.5 w-3.5 sm:h-4 sm:w-4'
                      )}
                    />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {!isCollapsed && (
          <Separator className="bg-sidebar-border/60 mx-4 w-[calc(100%-2rem)] mt-0.5 mb-0.5" />
        )}
      </div>
    </div>
  );
});
