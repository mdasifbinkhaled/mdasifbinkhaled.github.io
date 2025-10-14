/**
 * ==========================================
 * USE SEARCH AND FILTER HOOK
 * ==========================================
 *
 * Combined hook that integrates search and filter functionality
 * Perfect for complex data tables and lists
 *
 * @version 1.0
 * @author Md Asif Bin Khaled
 */

import { useSearch } from './use-search';
import { useFilter, type UseFilterOptions } from './use-filter';

export interface UseSearchAndFilterOptions<T> {
  items: T[];
  searchFields: (keyof T)[];
  filters?: UseFilterOptions<T>['filters'];
  initialQuery?: string;
  debounceMs?: number;
}

export interface UseSearchAndFilterReturn<T> {
  // Search
  query: string;
  setQuery: (query: string) => void;
  isSearching: boolean;
  clearSearch: () => void;

  // Filter
  activeFilters: Record<string, unknown>;
  setFilter: (filterId: string, value: unknown) => void;
  clearFilter: (filterId: string) => void;
  clearAllFilters: () => void;
  hasActiveFilters: boolean;

  // Combined results
  filteredItems: T[];
  resultCount: number;

  // Utilities
  clearAll: () => void;
}

/**
 * Combined search and filter hook
 *
 * @example
 * ```tsx
 * const {
 *   query,
 *   setQuery,
 *   setFilter,
 *   filteredItems,
 *   clearAll,
 * } = useSearchAndFilter({
 *   items: publications,
 *   searchFields: ['title', 'authors'],
 *   filters: {
 *     year: {
 *       field: 'year',
 *       predicate: (value, filterValue) => value === filterValue,
 *     },
 *     type: {
 *       field: 'type',
 *       predicate: (value, filterValue) => value === filterValue,
 *     },
 *   },
 * });
 * ```
 */
export function useSearchAndFilter<T extends Record<string, unknown>>({
  items,
  searchFields,
  filters = {},
  initialQuery = '',
  debounceMs = 0,
}: UseSearchAndFilterOptions<T>): UseSearchAndFilterReturn<T> {
  // First apply search with debouncing
  const searchResult = useSearch({
    items,
    searchFields,
    initialQuery,
    debounceMs,
  });

  // Then apply filters to searched results
  const filterResult = useFilter({
    items: searchResult.filteredItems,
    filters,
  });

  // Clear all search and filters
  const clearAll = () => {
    searchResult.clearSearch();
    filterResult.clearAllFilters();
  };

  return {
    // Search
    query: searchResult.query,
    setQuery: searchResult.setQuery,
    isSearching: searchResult.isSearching,
    clearSearch: searchResult.clearSearch,

    // Filter
    activeFilters: filterResult.activeFilters,
    setFilter: filterResult.setFilter,
    clearFilter: filterResult.clearFilter,
    clearAllFilters: filterResult.clearAllFilters,
    hasActiveFilters: filterResult.hasActiveFilters,

    // Combined results
    filteredItems: filterResult.filteredItems,
    resultCount: filterResult.filteredItems.length,

    // Utilities
    clearAll,
  };
}
