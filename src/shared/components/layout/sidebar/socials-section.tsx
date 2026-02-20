import {
  Github,
  Linkedin,
  BookUser,
  Globe,
  Award,
  BookOpenText,
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { siteConfig } from '@/shared/config/site';
import { cn } from '@/shared/lib/utils';

interface SocialsSectionProps {
  isCollapsed: boolean;
  onLinkClick?: () => void;
}

export function SocialsSection({
  isCollapsed,
  onLinkClick,
}: SocialsSectionProps) {
  return (
    <div
      className={cn(
        'flex-shrink-0 bg-sidebar border-t border-sidebar-border/40 shadow-lg',
        isCollapsed ? 'p-2' : 'px-4 py-4'
      )}
    >
      {!isCollapsed && (
        <h4 className="text-xs uppercase font-semibold text-sidebar-foreground/60 mb-3 tracking-wider text-center sidebar-section-title">
          Follow Me
        </h4>
      )}
      <div
        className={cn(
          'flex',
          isCollapsed
            ? 'flex-col gap-2 items-center'
            : 'flex-row flex-nowrap gap-1 justify-center items-center'
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group h-8 w-8 flex-shrink-0"
          title={isCollapsed ? 'GitHub Profile' : undefined}
        >
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            onClick={onLinkClick}
          >
            <Github className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group h-8 w-8 flex-shrink-0"
          title={isCollapsed ? 'LinkedIn Profile' : undefined}
        >
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            onClick={onLinkClick}
          >
            <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group h-8 w-8 flex-shrink-0"
          title={isCollapsed ? 'Google Scholar Profile' : undefined}
        >
          <a
            href={siteConfig.links.googleScholar}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Scholar Profile"
            onClick={onLinkClick}
          >
            <BookUser className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group h-8 w-8 flex-shrink-0"
          title={isCollapsed ? 'ResearchGate Profile' : undefined}
        >
          <a
            href={siteConfig.links.researchGate}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ResearchGate Profile"
            onClick={onLinkClick}
          >
            <Globe className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group h-8 w-8 flex-shrink-0"
          title={isCollapsed ? 'Academia.edu Profile' : undefined}
        >
          <a
            href={siteConfig.links.academiaEdu}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Academia.edu Profile"
            onClick={onLinkClick}
          >
            <BookOpenText className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group h-8 w-8 flex-shrink-0"
          title={isCollapsed ? 'ORCID Profile' : undefined}
        >
          <a
            href={siteConfig.links.orcid}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ORCID Profile"
            onClick={onLinkClick}
          >
            <Award className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
          </a>
        </Button>
      </div>
    </div>
  );
}
