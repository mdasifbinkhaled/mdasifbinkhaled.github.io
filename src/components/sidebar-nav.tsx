"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { UserCircle, Briefcase, BookOpenText, Rss } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"; // Assuming this is the correct import path for your sidebar components

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  sectionId: string;
}

const navItems: NavItem[] = [
  { href: "/#about", label: "About Me", icon: <UserCircle size={20} />, sectionId: "about" },
  { href: "/#experience", label: "Experience", icon: <Briefcase size={20} />, sectionId: "experience" },
  { href: "/#publications", label: "Publications", icon: <BookOpenText size={20} />, sectionId: "publications" },
  // Example for an external link, if needed later:
  // { href: "https://blog.example.com", label: "Blog", icon: <Rss size={20} />, sectionId: "blog", external: true },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionElementsRef = useRef<Map<string, HTMLElement>>(new Map());

  const handleScrollOrHashChange = useCallback(() => {
    // Prioritize hash if present and matches a section
    if (window.location.hash) {
      const currentHash = window.location.hash.substring(1);
      if (navItems.some(item => item.sectionId === currentHash)) {
        setActiveHash(currentHash);
        return;
      }
    }
    // Fallback for initial load or if hash doesn't match known sections
    if (pathname === '/' && !window.location.hash) {
        setActiveHash('about');
    }
  }, [pathname]);

  useEffect(() => {
    handleScrollOrHashChange(); // Set initial active hash

    window.addEventListener("hashchange", handleScrollOrHashChange, { passive: true });
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Only update if not manually set by hash recently or if hash is not the target
            // This helps prevent observer overriding a direct link click before scroll finishes
            if (window.location.hash.substring(1) !== entry.target.id) {
                 setActiveHash(entry.target.id);
            }
          }
        });
      },
      {
        rootMargin: "-40% 0px -60% 0px", // Adjust to make active when section is more centered
        threshold: 0, // Trigger as soon as any part is visible within rootMargin
      }
    );

    const currentObserver = observerRef.current;

    navItems.forEach(item => {
      const element = document.getElementById(item.sectionId);
      if (element) {
        sectionElementsRef.current.set(item.sectionId, element);
        currentObserver.observe(element);
      }
    });

    return () => {
      window.removeEventListener("hashchange", handleScrollOrHashChange);
      if (currentObserver) {
        sectionElementsRef.current.forEach(el => currentObserver.unobserve(el));
      }
      sectionElementsRef.current.clear();
    };
  }, [handleScrollOrHashChange]);
  

  return (
    <SidebarMenu className="space-y-1">
      {navItems.map((item) => {
        const isActive = activeHash === item.sectionId;
        const commonButtonProps = {
          isActive: isActive,
          className: "w-full justify-start text-base py-3 px-3",
          "aria-current": isActive ? ("page" as const) : undefined,
        };

        // if (item.external) {
        //   return (
        //     <SidebarMenuItem key={item.label}>
        //       <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
        //         <SidebarMenuButton {...commonButtonProps}>
        //           {item.icon}
        //           <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
        //         </SidebarMenuButton>
        //       </a>
        //     </SidebarMenuItem>
        //   );
        // }

        return (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton {...commonButtonProps} onClick={() => setActiveHash(item.sectionId)}>
                {item.icon}
                <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
