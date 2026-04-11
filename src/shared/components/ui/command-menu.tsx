'use client';

import * as React from 'react';
import { Command } from 'cmdk';
import {
  Search,
  Send,
  Sun,
  Moon,
  FileText,
  ExternalLink,
  ArrowRight,
  Download,
  GraduationCap,
  Laptop,
  Waves,
  Trees,
  Flower,
  Briefcase,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { sendGAEvent } from '@next/third-parties/google';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import {
  navItems,
  iubCourseNavItems,
  bracuCourseNavItems,
} from '@/shared/config/navigation';
import { navIconMap } from '@/shared/lib/nav-icon-map';
import { cn } from '@/shared/lib/utils';
import type { NavItem } from '@/shared/types';

// ---------------------------------------------------------------------------
// Shared item class for consistent styling
// ---------------------------------------------------------------------------
const itemClass =
  'relative flex cursor-pointer select-none items-center rounded-md px-2 py-2.5 text-sm outline-hidden aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 gap-2';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  // ⌘K / Ctrl+K / '/' keyboard shortcut
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
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback(
    (command: () => unknown, label: string) => {
      setOpen(false);

      // Dispatch telemetry event to track which features are searched/used
      sendGAEvent('event', 'command_palette_select', {
        value: label,
      });

      command();
    },
    [setOpen]
  );

  // Render a group of NavItem entries
  const renderNavItems = (items: NavItem[]) =>
    items.map((navItem) => {
      const Icon = navItem.icon ? navIconMap[navItem.icon] : null;
      return (
        <Command.Item
          key={`${navItem.href}-${navItem.sectionId}`}
          value={`${navItem.label} ${navItem.sectionId}`}
          onSelect={() =>
            runCommand(() => router.push(navItem.href as string), navItem.label)
          }
          className={itemClass}
        >
          {Icon ? (
            <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
          ) : (
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          )}
          <span className="truncate">{navItem.label}</span>
        </Command.Item>
      );
    });

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'relative inline-flex h-9 w-full items-center justify-start gap-2 rounded-md border border-input bg-background/50 px-3 py-2 text-sm font-medium text-muted-foreground shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring sm:pr-12 md:w-56 lg:w-64'
        )}
      >
        <Search className="h-4 w-4 shrink-0 opacity-60" />
        <span className="hidden lg:inline-flex">Search portfolio...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded-sm border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Command dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 shadow-2xl sm:max-w-lg">
          <DialogTitle className="sr-only">Search portfolio</DialogTitle>
          <Command
            className={cn(
              '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground/70',
              '[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0',
              '[&_[cmdk-group]]:px-1'
            )}
          >
            {/* Search input */}
            <div
              className="flex items-center border-b px-3"
              cmdk-input-wrapper=""
            >
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Command.Input
                placeholder="Search pages, courses, actions…"
                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Results list */}
            <Command.List className="max-h-[360px] overflow-y-auto overflow-x-hidden px-1 py-2">
              <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                No results found.
              </Command.Empty>

              {/* Pages */}
              <Command.Group heading="Pages">
                {renderNavItems(navItems.main)}
              </Command.Group>

              {/* Teaching — IUB */}
              <Command.Group heading="IUB Courses">
                {renderNavItems(iubCourseNavItems)}
              </Command.Group>

              {/* Teaching — BRACU */}
              <Command.Group heading="BRACU Courses">
                {renderNavItems(bracuCourseNavItems)}
              </Command.Group>

              {/* Quick actions */}
              <Command.Group heading="Quick Actions">
                <Command.Item
                  value="Contact email send message"
                  onSelect={() =>
                    runCommand(() => router.push('/contact'), 'Contact')
                  }
                  className={itemClass}
                >
                  <Send className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>Send a Message</span>
                </Command.Item>
                <Command.Item
                  value="Download CV resume curriculum vitae"
                  onSelect={() =>
                    runCommand(() => router.push('/cv'), 'Download CV')
                  }
                  className={itemClass}
                >
                  <Download className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>Download CV</span>
                </Command.Item>
                <Command.Item
                  value="Publications papers research conference journal"
                  onSelect={() =>
                    runCommand(
                      () => router.push('/publications'),
                      'Publications'
                    )
                  }
                  className={itemClass}
                >
                  <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>Browse Publications</span>
                </Command.Item>
                <Command.Item
                  value="Experience jobs work career professional"
                  onSelect={() =>
                    runCommand(() => router.push('/experience'), 'Experience')
                  }
                  className={itemClass}
                >
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>View Experience</span>
                </Command.Item>
                <Command.Item
                  value="Grade calculator GPA student app"
                  onSelect={() =>
                    runCommand(
                      () => router.push('/apps/grade-calculator'),
                      'Grade Calculator'
                    )
                  }
                  className={itemClass}
                >
                  <Laptop className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>Grade Calculator</span>
                </Command.Item>
                <Command.Item
                  value="Service awards achievements honors recognition"
                  onSelect={() =>
                    runCommand(
                      () => router.push('/service-awards'),
                      'Service & Awards'
                    )
                  }
                  className={itemClass}
                >
                  <GraduationCap className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>Service & Awards</span>
                </Command.Item>
              </Command.Group>

              {/* Theme */}
              <Command.Group heading="Theme">
                <Command.Item
                  value="Light theme mode"
                  onSelect={() =>
                    runCommand(() => setTheme('light'), 'Theme: Light')
                  }
                  className={itemClass}
                >
                  <Sun className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>Light Mode</span>
                </Command.Item>
                <Command.Item
                  value="Dark theme mode"
                  onSelect={() =>
                    runCommand(() => setTheme('dark'), 'Theme: Dark')
                  }
                  className={itemClass}
                >
                  <Moon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>Dark Mode</span>
                </Command.Item>
                <Command.Item
                  value="Ocean theme blue"
                  onSelect={() =>
                    runCommand(() => setTheme('ocean'), 'Theme: Ocean')
                  }
                  className={itemClass}
                >
                  <Waves className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>Ocean Theme</span>
                </Command.Item>
                <Command.Item
                  value="Forest theme green nature"
                  onSelect={() =>
                    runCommand(() => setTheme('forest'), 'Theme: Forest')
                  }
                  className={itemClass}
                >
                  <Trees className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>Forest Theme</span>
                </Command.Item>
                <Command.Item
                  value="Lavender theme purple"
                  onSelect={() =>
                    runCommand(() => setTheme('lavender'), 'Theme: Lavender')
                  }
                  className={itemClass}
                >
                  <Flower className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>Lavender Theme</span>
                </Command.Item>
                <Command.Item
                  value="Slate theme professional gray"
                  onSelect={() =>
                    runCommand(() => setTheme('slate'), 'Theme: Slate')
                  }
                  className={itemClass}
                >
                  <Briefcase className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>Slate Theme</span>
                </Command.Item>
              </Command.Group>
            </Command.List>

            {/* Footer hint */}
            <div className="border-t px-3 py-2 text-[11px] text-muted-foreground/60 flex items-center justify-between">
              <span>
                <kbd className="rounded-sm border bg-muted px-1 py-0.5 font-mono text-[10px]">
                  ↑↓
                </kbd>{' '}
                Navigate{' '}
                <kbd className="ml-1 rounded-sm border bg-muted px-1 py-0.5 font-mono text-[10px]">
                  ↵
                </kbd>{' '}
                Select{' '}
                <kbd className="ml-1 rounded-sm border bg-muted px-1 py-0.5 font-mono text-[10px]">
                  Esc
                </kbd>{' '}
                Close
              </span>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
