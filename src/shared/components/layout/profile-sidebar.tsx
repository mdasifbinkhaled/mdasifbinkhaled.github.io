import { Separator } from '@/shared/components/ui/separator';
import { ProfileSection } from '@/shared/components/layout/sidebar/profile-section';
import { NavigationSection } from '@/shared/components/layout/sidebar/navigation-section';
import { ActionsSection } from '@/shared/components/layout/sidebar/actions-section';
import { SocialsSection } from '@/shared/components/layout/sidebar/socials-section';

interface ProfileSidebarProps {
  onLinkClick?: () => void;
  isCollapsed?: boolean;
  hideNav?: boolean;
}

export function ProfileSidebar({
  onLinkClick,
  isCollapsed = false,
  hideNav = false,
}: ProfileSidebarProps) {
  const handleLinkClick = () => {
    onLinkClick?.();
  };

  return (
    <div className="flex flex-col h-full bg-sidebar">
      {/* Content Area (no inner scrollbar) */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-sidebar-border scrollbar-track-transparent">
        <ProfileSection isCollapsed={isCollapsed} />

        {!isCollapsed && (
          <Separator className="bg-sidebar-border/60 mx-4 w-[calc(100%-2rem)]" />
        )}

        {!hideNav && (
          <NavigationSection
            isCollapsed={isCollapsed}
            onLinkClick={handleLinkClick}
          />
        )}

        {!isCollapsed && !hideNav && (
          <Separator className="bg-sidebar-border/60 mx-4 w-[calc(100%-2rem)] my-2" />
        )}

        <ActionsSection
          isCollapsed={isCollapsed}
          onLinkClick={handleLinkClick}
          hideNav={hideNav}
        />

        {!isCollapsed && (
          <Separator className="bg-sidebar-border/60 mx-4 w-[calc(100%-2rem)]" />
        )}
      </div>

      <SocialsSection isCollapsed={isCollapsed} onLinkClick={handleLinkClick} />
    </div>
  );
}
