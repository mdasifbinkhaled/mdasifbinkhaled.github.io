"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Icon } from '@/components/icons'; // Import the new Icon component

interface SidebarNavProps {
  items: NavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar(); 

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
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    {item.icon && <Icon name={item.icon} className="shrink-0" />}
                    <span className={cn("truncate", sidebarState === 'collapsed' && 'hidden')}>
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>
              {sidebarState === 'collapsed' && (
                <TooltipContent side="right" align="center">
                  {item.label}
                </TooltipContent>
              )}
            </Tooltip>
          </SidebarMenuItem>
        ) : null
      )}
    </SidebarMenu>
  );
}