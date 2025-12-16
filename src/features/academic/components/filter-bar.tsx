import { Filter, Calendar } from 'lucide-react';
import { badgeVariants } from '@/shared/components/ui/badge';
import { cn } from '@/shared/lib/utils';
import { DISPLAY_LIMITS } from '@/shared/config';
import { getTypeIcon } from '../utils/get-type-icon';

interface FilterBarProps {
  contentTypes: string[];
  selectedTypes: string[];
  onToggleType: (type: string) => void;
  availableYears: (number | undefined)[];
  selectedYear: string | null;
  onSelectYear: (year: string | null) => void;
  showTypeFilter?: boolean;
  showYearFilter?: boolean;
}

/**
 * Filter bar component with type and year filters.
 * Provides accessible toggle buttons for filtering content by type and year.
 *
 * @param props - Component props
 * @param props.contentTypes - Available content types for filtering
 * @param props.selectedTypes - Currently selected content types
 * @param props.onToggleType - Callback when a type filter is toggled
 * @param props.availableYears - Available years for filtering
 * @param props.selectedYear - Currently selected year (null for all years)
 * @param props.onSelectYear - Callback when a year filter is selected
 * @param props.showTypeFilter - Whether to show type filter
 * @param props.showYearFilter - Whether to show year filter
 * @returns Filter UI with accessible toggle buttons
 */
export function FilterBar({
  contentTypes,
  selectedTypes,
  onToggleType,
  availableYears,
  selectedYear,
  onSelectYear,
  showTypeFilter = true,
  showYearFilter = true,
}: FilterBarProps) {
  if (!showTypeFilter && !showYearFilter) {
    return null;
  }

  return (
    <div className="space-y-3" role="group" aria-label="Content filters">
      {showTypeFilter && contentTypes.length > 1 && (
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter by type"
        >
          <Filter
            className="w-4 h-4 text-muted-foreground"
            aria-hidden="true"
          />
          <span
            className="text-sm text-muted-foreground"
            id="type-filter-label"
          >
            Type:
          </span>
          {contentTypes.map((type) => {
            const isSelected = selectedTypes.includes(type);

            return (
              <button
                key={type}
                type="button"
                role="button"
                aria-pressed={Boolean(isSelected)}
                aria-label={`Filter by ${type}`}
                aria-describedby="type-filter-label"
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
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter by year"
        >
          <Calendar
            className="w-4 h-4 text-muted-foreground"
            aria-hidden="true"
          />
          <span
            className="text-sm text-muted-foreground"
            id="year-filter-label"
          >
            Year:
          </span>
          <button
            type="button"
            role="button"
            aria-pressed={Boolean(!selectedYear)}
            aria-label="Show all years"
            aria-describedby="year-filter-label"
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
            .map((year) => {
              const yearValue = year?.toString();
              const isSelected = !!yearValue && selectedYear === yearValue;

              return (
                <button
                  key={yearValue ?? 'unknown-year'}
                  type="button"
                  role="button"
                  aria-pressed={Boolean(isSelected)}
                  aria-label={`Filter by year ${year || 'unknown'}`}
                  aria-describedby="year-filter-label"
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
