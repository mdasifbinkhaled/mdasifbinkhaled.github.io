import { Search as SearchIcon } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { SearchResultCard } from './search-result-card';
import type { SearchableContent } from '../types';

interface SearchResultsProps {
  results: SearchableContent[];
  hasFilters: boolean;
  onClearFilters: () => void;
}

/**
 * Search results list component with empty state.
 * @param props - Component props
 * @returns Search results UI
 */
export function SearchResults({
  results,
  hasFilters,
  onClearFilters,
}: SearchResultsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </span>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear filters
          </Button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid gap-3">
          {results.map((item) => (
            <SearchResultCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              <SearchIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No results found for your search criteria.</p>
              <p className="text-sm mt-1">
                Try adjusting your filters or search terms.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
