/**
 * ==========================================
 * USE FILTER HOOK
 * ==========================================
 *
 * Generic multi-filter hook for complex filtering scenarios
 * Extracted from academic-search.tsx for reusability
 *
 * @version 1.0
 * @author Md Asif Bin Khaled
 */

import { useState, useMemo, useCallback } from 'react';

export interface FilterDefinition<T, K extends keyof T> {
  field: K;
  predicate: (value: T[K], filterValue: unknown) => boolean;
}

export interface UseFilterOptions<T> {
  items: T[];
  filters: Record<string, FilterDefinition<T, keyof T>>;
}

export interface UseFilterReturn<T> {
  filteredItems: T[];
  activeFilters: Record<string, unknown>;
  setFilter: (filterId: string, value: unknown) => void;
  clearFilter: (filterId: string) => void;
  clearAllFilters: () => void;
  hasActiveFilters: boolean;
}

/**
 * Generic filter hook for complex multi-field filtering
 *
 * @example
 * ```tsx
 * const { filteredItems, setFilter, clearAllFilters } = useFilter({
 *   items: courses,
 *   filters: {
 *     institution: {
 *       field: 'institution',
 *       predicate: (value, filterValue) => value === filterValue,
 *     },
 *     year: {
 *       field: 'year',
 *       predicate: (value, filterValue) => value === filterValue,
 *     },
 *   },
 * });
 * ```
 */
export function useFilter<T>({
  items,
  filters,
}: UseFilterOptions<T>): UseFilterReturn<T> {
  const [activeFilters, setActiveFilters] = useState<Record<string, unknown>>(
    {}
  );

  const filteredItems = useMemo(() => {
    if (Object.keys(activeFilters).length === 0) {
      return items;
    }

    return items.filter((item) => {
      return Object.entries(activeFilters).every(([filterId, filterValue]) => {
        const filter = filters[filterId];
        if (!filter) {
          return true;
        }

        const itemValue = item[filter.field];
        return filter.predicate(itemValue, filterValue);
      });
    });
  }, [items, activeFilters, filters]);

  const setFilter = useCallback((filterId: string, value: unknown) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
  }, []);

  const clearFilter = useCallback((filterId: string) => {
    setActiveFilters((prev) => {
      const { [filterId]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setActiveFilters({});
  }, []);

  return {
    filteredItems,
    activeFilters,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters: Object.keys(activeFilters).length > 0,
  };
}
