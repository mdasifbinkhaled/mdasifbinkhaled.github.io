'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, X, Calendar } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Badge, badgeVariants } from '@/shared/components/ui/badge';
import { Card, CardContent } from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils';

interface SearchableContent {
  id: string;
  title: string;
  type: 'publication' | 'course' | 'experience' | 'news';
  content: string;
  tags: string[];
  year?: number;
  url: string;
  metadata?: Record<string, unknown>;
}

interface AcademicSearchProps {
  content: SearchableContent[];
  placeholder?: string;
  showTypeFilter?: boolean;
  showYearFilter?: boolean;
  maxResults?: number;
}

export function AcademicSearch({
  content,
  placeholder = 'Search publications, courses, experience...',
  showTypeFilter = true,
  showYearFilter = true,
  maxResults = 10,
}: AcademicSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const { filteredContent, availableYears, contentTypes } = useMemo(() => {
    // Filter content based on search and filters
    const filtered = content.filter((item) => {
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase())
        );

      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(item.type);
      const matchesYear =
        !selectedYear || item.year?.toString() === selectedYear;

      return matchesQuery && matchesType && matchesYear;
    });

    // Get available years and types
    const years = [
      ...new Set(content.map((item) => item.year).filter(Boolean)),
    ].sort((a, b) => b! - a!);
    const types = [...new Set(content.map((item) => item.type))];

    return {
      filteredContent: filtered.slice(0, maxResults),
      availableYears: years,
      contentTypes: types,
    };
  }, [content, query, selectedTypes, selectedYear, maxResults]);

  const toggleTypeFilter = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'publication':
        return '📄';
      case 'course':
        return '📚';
      case 'experience':
        return '💼';
      case 'news':
        return '📰';
      default:
        return '📋';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
          onFocus={() => setIsExpanded(true)}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuery('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Filters */}
      {(isExpanded || query || selectedTypes.length > 0 || selectedYear) && (
        <div className="space-y-3">
          {showTypeFilter && contentTypes.length > 1 && (
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Type:</span>
              {contentTypes.map((type) => {
                const isSelected = selectedTypes.includes(type);

                return (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleTypeFilter(type)}
                    className={cn(
                      badgeVariants({
                        variant: isSelected ? 'default' : 'secondary',
                      }),
                      'flex items-center gap-1 cursor-pointer capitalize'
                    )}
                  >
                    <span>{getTypeIcon(type)}</span>
                    {type}
                  </button>
                );
              })}
            </div>
          )}

          {showYearFilter && availableYears.length > 1 && (
            <div className="flex flex-wrap items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Year:</span>
              <button
                type="button"
                aria-pressed={!selectedYear}
                onClick={() => setSelectedYear(null)}
                className={cn(
                  badgeVariants({
                    variant: !selectedYear ? 'default' : 'secondary',
                  }),
                  'cursor-pointer'
                )}
              >
                All
              </button>
              {availableYears.slice(0, 8).map((year, index) => {
                const yearValue = year?.toString();
                const isSelected = !!yearValue && selectedYear === yearValue;

                return (
                  <button
                    key={yearValue ?? `year-${index}`}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedYear(yearValue ?? null)}
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
      )}

      {/* Results */}
      {(query || selectedTypes.length > 0 || selectedYear) && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {filteredContent.length} result
              {filteredContent.length !== 1 ? 's' : ''} found
            </span>
            {(selectedTypes.length > 0 || selectedYear) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedTypes([]);
                  setSelectedYear(null);
                }}
              >
                Clear filters
              </Button>
            )}
          </div>

          {filteredContent.length > 0 ? (
            <div className="grid gap-3">
              {filteredContent.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">
                            {getTypeIcon(item.type)}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-xs capitalize"
                          >
                            {item.type}
                          </Badge>
                          {item.year && (
                            <Badge variant="secondary" className="text-xs">
                              {item.year}
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {item.content}
                        </p>
                        {item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {item.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {item.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{item.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={item.url}>View</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-muted-foreground">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No results found for your search criteria.</p>
                  <p className="text-sm mt-1">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
