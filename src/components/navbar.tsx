
"use client";

import Link from 'next/link';
// usePathname and mainNavItems are not directly used for rendering links here anymore
import { useTheme } from 'next-themes';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
// Sheet components are no longer used for main navigation here
import { SidebarTrigger } from '@/components/ui/sidebar'; // Key for controlling the main sidebar
import { GraduationCap, Menu, PanelLeft, Sun, Moon, Palette } from 'lucide-react';
// Icon component from '@/components/icons' is not needed here if mainNavItems are not rendered directly

export function Navbar() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('retro');
    } else {
      setTheme('light');
    }
  };

  const ThemeIcon = () => {
    if (theme === 'light') return <Sun className="h-5 w-5" />;
    if (theme === 'dark') return <Moon className="h-5 w-5" />;
    if (theme === 'retro') return <Palette className="h-5 w-5" />;
    return <Sun className="h-5 w-5" />; 
  };
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Left side: Desktop Sidebar Trigger and Site Name/Logo */}
        <div className="flex items-center">
          {/* Desktop Sidebar Trigger (for main collapsible sidebar) */}
          <SidebarTrigger className="mr-2 hidden md:inline-flex" aria-label="Toggle sidebar">
            <PanelLeft className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </SidebarTrigger>
          
          <Link href="/" className="flex items-center gap-2 mr-6">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="font-bold text-lg text-foreground">{siteConfig.shortName}</span>
          </Link>
        </div>

        {/* Main navigation links are NOT rendered horizontally here */}

        {/* Right side: Theme Toggle and Mobile Sidebar Trigger */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" onClick={cycleTheme} aria-label="Toggle theme">
            <ThemeIcon />
          </Button>

          {/* Mobile Sidebar Trigger (for main collapsible sidebar, which acts as a sheet on mobile) */}
          <SidebarTrigger className="md:hidden" aria-label="Toggle sidebar">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </SidebarTrigger>
        </div>
      </div>
    </header>
  );
}
