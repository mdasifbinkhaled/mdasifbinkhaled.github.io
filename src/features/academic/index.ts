/**
 * Academic feature — public API
 *
 * Exposes the academic search functionality used on the
 * publications and service-awards pages.
 */
export { AcademicSearch } from './academic-search';
export { SearchInput } from './components/search-input';
export { SearchResults } from './components/search-results';
export { FilterBar } from './components/filter-bar';
export { getTypeIcon } from './utils/get-type-icon';
export { useSearchFilter } from './hooks/use-search-filter';
export type { SearchableContent } from './types';
