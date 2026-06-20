import { getInstitutionGroups } from './institution-data';
import type { InstitutionFilter } from './institution-data';
import { cn } from '@/shared/lib/utils';

interface InstitutionsFilterProps {
  /** The active institution code, or "all". */
  active: InstitutionFilter;
  /** Toggle a code (selecting the active one again clears to "all"). */
  onSelect: (next: InstitutionFilter) => void;
}

/**
 * §1 right column — the connected institution rows. Each row is an
 * `aria-pressed` toggle button: monogram crest (the present institution gets a
 * green presence dot) + name + tenure years (mono) + course count. Selecting
 * filters the record table; selecting the active one again clears. Controlled —
 * parent owns the filter state.
 */
export function InstitutionsFilter({
  active,
  onSelect,
}: InstitutionsFilterProps) {
  const groups = getInstitutionGroups();

  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        Institutions
      </span>
      <div
        role="group"
        aria-label="Filter by institution"
        className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xs"
      >
        {groups.map((g) => {
          const isActive = active === g.short;
          return (
            <button
              key={g.short}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(isActive ? 'all' : g.short)}
              className={cn(
                'relative flex w-full items-center gap-3.5 border-t border-border px-4.5 py-4 text-left transition-colors first:border-t-0',
                'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:[outline-offset:-2px]',
                isActive
                  ? 'bg-primary/6 before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-primary'
                  : 'hover:bg-muted/35'
              )}
            >
              <span className="relative grid size-[42px] shrink-0 place-items-center rounded-md border border-border bg-muted/50">
                <span className="font-mono text-xs font-bold tracking-tight text-foreground">
                  {g.mark}
                </span>
                {g.current && (
                  <span
                    className="absolute -bottom-[3px] -right-[3px] size-3 rounded-full border-2 border-card bg-success"
                    aria-hidden
                  />
                )}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold leading-snug">
                  {g.name}
                </span>
                <span className="whitespace-nowrap font-mono text-xs tracking-tight text-muted-foreground">
                  {g.years}
                </span>
              </span>
              <span className="ml-auto flex shrink-0 flex-col items-end gap-px">
                <span
                  className={cn(
                    'font-mono text-base font-semibold tracking-tight',
                    isActive ? 'text-primary' : 'text-foreground'
                  )}
                >
                  {g.count}
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                  courses
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <span className="text-xs leading-snug text-muted-foreground">
        {active === 'all'
          ? 'Select an institution to filter the record below.'
          : 'Filtering the record · select again to clear.'}
      </span>
    </div>
  );
}
