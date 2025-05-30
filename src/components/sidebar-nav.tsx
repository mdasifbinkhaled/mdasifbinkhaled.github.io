
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Icon } from '@/components/icons'; 

interface SidebarNavProps {
  items: NavItem[];
  onNavItemClick?: () => void;
  isMobile: boolean; // To differentiate styling/behavior if needed
}

export function SidebarNav({ items, onNavItemClick, isMobile }: SidebarNavProps) {
  const pathname = usePathname();

  const isItemActive = (href: string): boolean => {
    if (href === "/" && pathname !== "/") return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const navContent = (
    <SidebarMenu>
      {items.map((item) =>
        !item.disabled ? (
          <SidebarMenuItem key={item.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  asChild
                  isActive={isItemActive(item.href)}
                  className={cn(
                    "w-full justify-start",
                    // Apply sidebar-specific active/hover styles only if not in mobile sheet
                    !isMobile && (isItemActive(item.href)
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"),
                    // Apply general active/hover for mobile sheet (uses default button/link styling)
                    isMobile && (isItemActive(item.href)
                      ? "bg-accent text-accent-foreground" // Or your preferred mobile active style
                      : "hover:bg-accent/80") 
                  )}
                  onClick={onNavItemClick}
                >
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    {item.icon && <Icon name={item.icon} className="shrink-0" />}
                    <span className={cn(
                      "truncate",
                      // For main sidebar, hide label when collapsed (controlled by Sidebar component's data-state)
                      !isMobile && "group-data-[state=collapsed]:hidden"
                    )}> 
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>
              {/* Tooltip only for collapsed main sidebar, not for mobile sheet */}
              {!isMobile && (
                <TooltipContent side="right" align="center" className="group-data-[state=expanded]:hidden">
                  {item.label}
                </TooltipContent>
              )}
            </Tooltip>
          </SidebarMenuItem>
        ) : null
      )}
    </SidebarMenu>
  );

  // TooltipProvider is only needed if tooltips are active (i.e., not for mobile sheet)
  if (!isMobile) {
    return <TooltipProvider delayDuration={0}>{navContent}</TooltipProvider>;
  }
  
  return navContent;
}
