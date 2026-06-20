import { BookOpen, CalendarDays, Building2, Layers, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getTeachingFigures } from '@/shared/lib/data/teaching-stats';
import { cn } from '@/shared/lib/utils';

interface FigureCell {
  value: string;
  label: string;
  note: string;
  icon: LucideIcon;
}

/**
 * §2 — the unified 5-cell figure strip, single-sourced from
 * `getTeachingFigures()`. One bordered card split into five connected cells by
 * hairline dividers (collapses to a single column ≤ md). Server component:
 * pure data, no interaction.
 */
export function TeachingFigures() {
  const f = getTeachingFigures();

  const cells: FigureCell[] = [
    {
      value: String(f.courses),
      label: 'Courses taught',
      note: 'across two universities',
      icon: BookOpen,
    },
    {
      value: String(f.years),
      label: 'Years teaching',
      note: `since ${f.earliestYear}`,
      icon: CalendarDays,
    },
    {
      value: String(f.institutions),
      label: 'Institutions',
      note: 'IUB · BRACU',
      icon: Building2,
    },
    {
      value: String(f.creditHours),
      label: 'Credit-hours',
      note: 'delivered to date',
      icon: Layers,
    },
    {
      value: f.avgRating.toFixed(2),
      label: 'Avg. evaluation',
      note: `${f.ratedCount} rated courses · /5.0`,
      icon: Star,
    },
  ];

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-border bg-card shadow-xs md:grid-cols-5">
      {cells.map((cell) => {
        const Icon = cell.icon;
        return (
          <div
            key={cell.label}
            className={cn(
              'group/cell border-t border-border px-6 pb-5 pt-6 transition-colors first:border-t-0 hover:bg-muted/30',
              'md:border-l md:border-t-0 md:first:border-l-0'
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-4xl font-semibold leading-none tracking-tight">
                {cell.value}
              </span>
              <span className="grid size-[30px] shrink-0 place-items-center rounded-full bg-muted/70 text-muted-foreground transition-colors group-hover/cell:bg-primary/10 group-hover/cell:text-primary">
                <Icon className="size-4" aria-hidden />
              </span>
            </div>
            <div className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-foreground">
              {cell.label}
            </div>
            <div className="mt-1 text-xs leading-snug text-muted-foreground">
              {cell.note}
            </div>
          </div>
        );
      })}
    </div>
  );
}
