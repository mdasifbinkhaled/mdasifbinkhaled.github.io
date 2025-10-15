'use client';

import { useState } from 'react';
import { SearchInput } from './components/search-input';
import { FilterBar } from './components/filter-bar';
import { SearchResults } from './components/search-results';
import { useSearchFilter } from './hooks/use-search-filter';
import { useDebounce } from '@/shared/hooks';
import { TIMING } from '@/shared/config/constants';
import type { SearchableContent } from './types';

interface AcademicSearchProps {
  content: SearchableContent[];
  placeholder?: string;
  showTypeFilter?: boolean;
  showYearFilter?: boolean;
  maxResults?: number;
}

/**
 * Main academic search component with filtering capabilities.
 * Allows searching and filtering publications, courses, experiences, and news.
 * @param props - Component props
 * @returns Academic search UI
 */
export function AcademicSearch({
  content,
  placeholder = 'Search publications, courses, experience...',
  showTypeFilter = true,
  showYearFilter = true,
  maxResults = 10,
}: AcademicSearchProps) {
  // State management
  const [query, setQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Debounce search query for performance
  const debouncedQuery = useDebounce(query, TIMING.SEARCH_DEBOUNCE);

  // Get filtered content and available filter options
  const { filteredContent, availableYears, contentTypes } = useSearchFilter({
    content,
    query: debouncedQuery,
    selectedTypes,
    selectedYear,
    maxResults,
  });

  // Event handlers
  const toggleTypeFilter = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedYear(null);
  };

  const clearSearch = () => {
    setQuery('');
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  // Determine if filters or search are active
  const hasActiveSearch = query.trim().length > 0;
  const hasActiveFilters = selectedTypes.length > 0 || selectedYear !== null;
  const shouldShowFilters = isExpanded || hasActiveSearch || hasActiveFilters;
  const shouldShowResults = hasActiveSearch || hasActiveFilters;

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <SearchInput
        value={query}
        onChange={setQuery}
        onClear={clearSearch}
        onFocus={handleFocus}
        placeholder={placeholder}
      />

      {/* Filters */}
      {shouldShowFilters && (
        <FilterBar
          contentTypes={contentTypes}
          selectedTypes={selectedTypes}
          onToggleType={toggleTypeFilter}
          availableYears={availableYears}
          selectedYear={selectedYear}
          onSelectYear={setSelectedYear}
          showTypeFilter={showTypeFilter}
          showYearFilter={showYearFilter}
        />
      )}

      {/* Results */}
      {shouldShowResults && (
        <SearchResults
          results={filteredContent}
          hasFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      )}
    </div>
  );
}
