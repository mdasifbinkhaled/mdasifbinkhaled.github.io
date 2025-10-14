/**
 * ==========================================
 * USE SEARCH HOOK
 * ==========================================
 *
 * Generic search hook for filtering items by search term
 * Extracted from academic-search.tsx for reusability
 *
 * @version 1.0
 * @author Md Asif Bin Khaled
 */

import { useState, useMemo } from 'react';
import { useDebounce } from './use-debounce';

export interface UseSearchOptions<T> {
  items: T[];
  searchFields: (keyof T)[];
  initialQuery?: string;
  debounceMs?: number;
}

export interface UseSearchReturn<T> {
  query: string;
  setQuery: (query: string) => void;
  filteredItems: T[];
  isSearching: boolean;
  clearSearch: () => void;
}

/**
 * Generic search hook for filtering items
 *
 * @example
 * ```tsx
 * const { query, setQuery, filteredItems } = useSearch({
 *   items: publications,
 *   searchFields: ['title', 'authors', 'abstract'],
 * });
 * ```
 */
export function useSearch<T extends Record<string, unknown>>({
  items,
  searchFields,
  initialQuery = '',
  debounceMs = 0,
}: UseSearchOptions<T>): UseSearchReturn<T> {
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, debounceMs);

  const filteredItems = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return items;
    }

    const lowerQuery = debouncedQuery.toLowerCase();

    return items.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];

        if (value == null) {
          return false;
        }

        // Handle string values
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerQuery);
        }

        // Handle array values (like tags, keywords)
        if (Array.isArray(value)) {
          return value.some((v: unknown) =>
            String(v).toLowerCase().includes(lowerQuery)
          );
        }

        // Handle other types by converting to string
        return String(value).toLowerCase().includes(lowerQuery);
      });
    });
  }, [items, debouncedQuery, searchFields]);

  const clearSearch = () => setQuery('');

  return {
    query,
    setQuery,
    filteredItems,
    isSearching: query.trim().length > 0,
    clearSearch,
  };
}
