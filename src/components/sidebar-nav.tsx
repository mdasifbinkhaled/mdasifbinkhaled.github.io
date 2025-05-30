
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  // useSidebar hook is not needed here if this is only for sheet content
} from '@/components/ui/sidebar'; // Keep sidebar components for styling if desired
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Icon } from '@/components/icons'; 

interface SidebarNavProps {
  items: NavItem[];
  onNavItemClick?: () => void; // Optional callback for when a nav item is clicked
  // isCollapsed?: boolean; // Prop to know if sidebar is collapsed, not needed if only for sheet
}

export function SidebarNav({ items, onNavItemClick }: SidebarNavProps) {
  const pathname = usePathname();
  // const { state: sidebarState } = useSidebar(); // Not needed if not in main sidebar context

  const isItemActive = (href: string): boolean => {
    if (href === "/" && pathname !== "/") return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
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
                    isItemActive(item.href)
                      ? "bg-sidebar-primary text-sidebar-primary-foreground" // Use sidebar theme vars for consistency
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                  onClick={onNavItemClick} // Call onNavItemClick when button is clicked
                >
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    {item.icon && <Icon name={item.icon} className="shrink-0" />}
                    {/* Label always visible in sheet context */}
                    <span className="truncate"> 
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>
              {/* Tooltip only relevant if icons could be shown without labels, not typical for sheet menu
              {sidebarState === 'collapsed' && (
                <TooltipContent side="right" align="center">
                  {item.label}
                </TooltipContent>
              )}
              */}
            </Tooltip>
          </SidebarMenuItem>
        ) : null
      )}
    </SidebarMenu>
  );
}
