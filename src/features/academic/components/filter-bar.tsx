import { Filter, Calendar } from 'lucide-react';
import { badgeVariants } from '@/shared/components/ui/badge';
import { cn } from '@/shared/lib/utils';
import { DISPLAY_LIMITS } from '@/shared/config';

interface FilterBarProps {
  contentTypes: string[];
  selectedTypes: string[];
  onToggleType: (type: string) => void;
  availableYears: (number | undefined)[];
  selectedYear: string | null;
  onSelectYear: (year: string | null) => void;
  getTypeIcon: (type: string) => string;
  showTypeFilter?: boolean;
  showYearFilter?: boolean;
}

/**
 * Filter bar component with type and year filters.
 * @param props - Component props
 * @returns Filter UI with buttons
 */
export function FilterBar({
  contentTypes,
  selectedTypes,
  onToggleType,
  availableYears,
  selectedYear,
  onSelectYear,
  getTypeIcon,
  showTypeFilter = true,
  showYearFilter = true,
}: FilterBarProps) {
  if (!showTypeFilter && !showYearFilter) {
    return null;
  }

  return (
    <div className="space-y-3">
      {showTypeFilter && contentTypes.length > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          <Filter
            className="w-4 h-4 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="text-sm text-muted-foreground">Type:</span>
          {contentTypes.map((type) => {
            const isSelected = selectedTypes.includes(type);

            return (
              <button
                key={type}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onToggleType(type)}
                className={cn(
                  badgeVariants({
                    variant: isSelected ? 'default' : 'secondary',
                  }),
                  'flex items-center gap-1 cursor-pointer capitalize'
                )}
              >
                <span aria-hidden="true">{getTypeIcon(type)}</span>
                {type}
              </button>
            );
          })}
        </div>
      )}

      {showYearFilter && availableYears.length > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          <Calendar
            className="w-4 h-4 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="text-sm text-muted-foreground">Year:</span>
          <button
            type="button"
            aria-pressed={!selectedYear}
            onClick={() => onSelectYear(null)}
            className={cn(
              badgeVariants({
                variant: !selectedYear ? 'default' : 'secondary',
              }),
              'cursor-pointer'
            )}
          >
            All
          </button>
          {availableYears
            .slice(0, DISPLAY_LIMITS.ACADEMIC_SEARCH_YEARS)
            .map((year, index) => {
              const yearValue = year?.toString();
              const isSelected = !!yearValue && selectedYear === yearValue;

              return (
                <button
                  key={yearValue ?? `year-${index}`}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onSelectYear(yearValue ?? null)}
                  className={cn(
                    badgeVariants({
                      variant: isSelected ? 'default' : 'secondary',
                    }),
                    'cursor-pointer'
                  )}
                >
                  {year}
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
}
