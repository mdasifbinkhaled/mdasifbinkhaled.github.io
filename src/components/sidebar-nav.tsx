"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { mainNavItems } from "@/config/navigation";
import type { NavItem } from "@/types";

export function SidebarNav() {
  const pathname = usePathname();

  // Helper to determine if a link or any of its children is active
  const isItemActive = (item: NavItem): boolean => {
    if (item.href === pathname) {
      return true;
    }
    if (item.children) {
      return item.children.some(child => child.href === pathname);
    }
    // For homepage, check if it's exactly "/" to avoid matching all sub-paths
    if (item.href === "/" && pathname === "/") {
        return true;
    }
    // For other paths, check if pathname starts with item.href (but not if item.href is just "/")
    if (item.href !== "/" && pathname.startsWith(item.href)) {
        return true;
    }
    return false;
  };

  return (
    <SidebarMenu className="space-y-1">
      {mainNavItems.map((item) => {
        if (item.disabled) return null;

        const Icon = item.icon;
        const isActive = isItemActive(item);

        const commonButtonProps = {
          isActive: isActive,
          className: "w-full justify-start text-base py-3 px-3",
          "aria-current": isActive ? ("page" as const) : undefined,
          tooltip: item.label, // Add tooltip for collapsed state
        };
        
        const linkContent = (
          <>
            {Icon && <Icon className={`shrink-0 h-5 w-5 ${isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground group-hover/menu-item:text-sidebar-accent-foreground"}`} />}
            <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
          </>
        );

        if (item.external) {
          return (
            <SidebarMenuItem key={item.label}>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                <SidebarMenuButton {...commonButtonProps}>
                  {linkContent}
                </SidebarMenuButton>
              </a>
            </SidebarMenuItem>
          );
        }

        return (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton {...commonButtonProps}>
                {linkContent}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
