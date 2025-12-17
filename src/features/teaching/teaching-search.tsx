'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/shared/components/ui/input';
import { Badge } from '@/shared/components/ui/badge';
import { Search, X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface TeachingSearchProps {
  onSearch: (query: string) => void;
  onFilterLevel?: (level: 'all' | 'undergraduate' | 'graduate') => void;
  onFilterYear?: (year: number | 'all') => void;
  totalResults?: number;
}

export function TeachingSearch({
  onSearch,
  onFilterLevel,
  onFilterYear,
  totalResults,
}: TeachingSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<
    'all' | 'undergraduate' | 'graduate'
  >('all');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 7 }, (_, i) => currentYear - i);
  }, []);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  const handleLevelFilter = (level: 'all' | 'undergraduate' | 'graduate') => {
    setSelectedLevel(level);
    onFilterLevel?.(level);
  };

  const handleYearFilter = (year: number | 'all') => {
    setSelectedYear(year);
    onFilterYear?.(year);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search courses by name, code, or topic..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10"
          aria-label="Search courses"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Filter by:</span>

        {/* Level Filter */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleLevelFilter('all')}
            className="focus:outline-none"
          >
            <Badge
              variant={selectedLevel === 'all' ? 'default' : 'outline'}
              className="cursor-pointer transition-colors hover:bg-primary/90 pointer-events-none"
            >
              All Levels
            </Badge>
          </button>
          <button
            type="button"
            onClick={() => handleLevelFilter('undergraduate')}
            className="focus:outline-none"
          >
            <Badge
              variant={
                selectedLevel === 'undergraduate' ? 'default' : 'outline'
              }
              className="cursor-pointer transition-colors hover:bg-primary/90 pointer-events-none"
            >
              Undergraduate
            </Badge>
          </button>
          <button
            type="button"
            onClick={() => handleLevelFilter('graduate')}
            className="focus:outline-none"
          >
            <Badge
              variant={selectedLevel === 'graduate' ? 'default' : 'outline'}
              className="cursor-pointer transition-colors hover:bg-primary/90 pointer-events-none"
            >
              Graduate
            </Badge>
          </button>
        </div>

        {/* Year Filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => handleYearFilter('all')}
            className="focus:outline-none"
          >
            <Badge
              variant={selectedYear === 'all' ? 'default' : 'outline'}
              className="cursor-pointer transition-colors hover:bg-primary/90 pointer-events-none"
            >
              All Years
            </Badge>
          </button>
          {years.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => handleYearFilter(year)}
              className="focus:outline-none"
            >
              <Badge
                variant={selectedYear === year ? 'default' : 'outline'}
                className="cursor-pointer transition-colors hover:bg-primary/90 pointer-events-none"
              >
                {year}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      {totalResults !== undefined && (
        <div className="text-sm text-muted-foreground">
          {searchQuery || selectedLevel !== 'all' || selectedYear !== 'all' ? (
            <>
              Found{' '}
              <span className="font-semibold text-foreground">
                {totalResults}
              </span>{' '}
              course{totalResults !== 1 ? 's' : ''}
            </>
          ) : (
            <>
              Showing{' '}
              <span className="font-semibold text-foreground">
                {totalResults}
              </span>{' '}
              course{totalResults !== 1 ? 's' : ''}
            </>
          )}
        </div>
      )}
    </div>
  );
}
