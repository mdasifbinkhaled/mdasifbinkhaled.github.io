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

export interface UseSearchOptions<T> {
  items: T[];
  searchFields: (keyof T)[];
  initialQuery?: string;
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
}: UseSearchOptions<T>): UseSearchReturn<T> {
  const [query, setQuery] = useState(initialQuery);

  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return items;
    }

    const lowerQuery = query.toLowerCase();

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
  }, [items, query, searchFields]);

  const clearSearch = () => setQuery('');

  return {
    query,
    setQuery,
    filteredItems,
    isSearching: query.trim().length > 0,
    clearSearch,
  };
}
