import type { SearchableContent } from '../types';

interface UseSearchFilterOptions {
  content: SearchableContent[];
  query: string;
  selectedTypes: string[];
  selectedYear: string | null;
  maxResults?: number;
}

interface UseSearchFilterReturn {
  filteredContent: SearchableContent[];
  availableYears: (number | undefined)[];
  contentTypes: string[];
}

/**
 * Custom hook for filtering searchable content based on query, type, and year.
 * @param options - Search and filter options
 * @returns Filtered content, available years, and content types
 */
export function useSearchFilter({
  content,
  query,
  selectedTypes,
  selectedYear,
  maxResults = 10,
}: UseSearchFilterOptions): UseSearchFilterReturn {
  const q = query.toLowerCase();

  // Filter content based on search query and filters
  const filtered = content.filter((item) => {
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.content.toLowerCase().includes(q) ||
      item.tags.some((tag) => tag.toLowerCase().includes(q));

    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(item.type);
    const matchesYear = !selectedYear || item.year?.toString() === selectedYear;

    return matchesQuery && matchesType && matchesYear;
  });

  // Get available years and types from content
  const years = [
    ...new Set(content.map((item) => item.year).filter(Boolean)),
  ].sort((a, b) => b! - a!);
  const types = [...new Set(content.map((item) => item.type))];

  return {
    filteredContent: filtered.slice(0, maxResults),
    availableYears: years,
    contentTypes: types,
  };
}
