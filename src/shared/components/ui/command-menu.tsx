'use client';

import * as React from 'react';
import { Command } from 'cmdk';
import { Search, Send, Sun, Moon, Monitor } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { type DialogProps } from '@radix-ui/react-dialog';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import {
  navItems,
  iubCourseNavItems,
  bracuCourseNavItems,
} from '@/shared/config/navigation';
import { navIconMap } from '@/shared/lib/nav-icon-map';
import { cn } from '@/shared/lib/utils';
import type { NavItem } from '@/shared/types';

export function CommandMenu(_props: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const renderItems = (items: NavItem[]) => {
    return items.map((navItem) => {
      const Icon = navItem.icon ? navIconMap[navItem.icon] : null;
      return (
        <Command.Item
          key={navItem.href}
          value={`${navItem.label} ${navItem.sectionId}`}
          onSelect={() => {
            runCommand(() => router.push(navItem.href as string));
          }}
          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
        >
          {Icon && <Icon className="mr-2 h-4 w-4 opacity-70" />}
          <span>{navItem.label}</span>
        </Command.Item>
      );
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'relative inline-flex h-9 w-full items-center justify-start rounded-md border border-input bg-background/50 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:w-56 lg:w-64'
        )}
      >
        <span className="hidden lg:inline-flex">Search portfolio...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 shadow-2xl">
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
            <div
              className="flex items-center border-b px-3"
              cmdk-input-wrapper=""
            >
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Command.Input
                placeholder="Type a command or search..."
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
              <Command.Empty>No results found.</Command.Empty>

              <Command.Group heading="Pages">
                {renderItems(navItems.main)}
              </Command.Group>

              <Command.Group heading="Teaching (IUB)">
                {renderItems(iubCourseNavItems)}
              </Command.Group>

              <Command.Group heading="Teaching (BRACU)">
                {renderItems(bracuCourseNavItems)}
              </Command.Group>

              <Command.Group heading="Actions">
                <Command.Item
                  value="Contact Email"
                  onSelect={() => runCommand(() => router.push('/contact'))}
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
                >
                  <Send className="mr-2 h-4 w-4 opacity-70" />
                  <span>Contact Me</span>
                </Command.Item>
              </Command.Group>

              <Command.Group heading="Theme">
                <Command.Item
                  onSelect={() => runCommand(() => setTheme('light'))}
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
                >
                  <Sun className="mr-2 h-4 w-4 opacity-70" />
                  Light
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => setTheme('dark'))}
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
                >
                  <Moon className="mr-2 h-4 w-4 opacity-70" />
                  Dark
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => setTheme('system'))}
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
                >
                  <Monitor className="mr-2 h-4 w-4 opacity-70" />
                  System
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
