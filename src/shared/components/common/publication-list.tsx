'use client';

import type { PublicationItem, PublicationType } from '@/shared/types';
import React, { useState, useMemo, useCallback } from 'react';
import { Card } from '@/shared/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { BookOpenText } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { PublicationCard } from '@/features/publications/publication-card';

interface PublicationListProps {
  initialPublications: PublicationItem[];
}

const publicationTypeOptions: PublicationType[] = [
  'Conference',
  'Journal',
  'Workshop',
  'Preprint',
  'In Progress',
  'Book Chapter',
  'Thesis',
];

export const PublicationList = React.memo(function PublicationList({
  initialPublications,
}: PublicationListProps) {
  const [publications] = useState<PublicationItem[]>(initialPublications);
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<PublicationType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const uniqueYears = useMemo(() => {
    const years = new Set(initialPublications.map((p) => p.year.toString()));
    return [
      'all',
      ...Array.from(years).sort((a, b) => parseInt(b) - parseInt(a)),
    ];
  }, [initialPublications]);

  const handleYearChange = useCallback((value: string) => {
    setYearFilter(value);
  }, []);

  const handleTypeChange = useCallback((value: string) => {
    setTypeFilter(value as PublicationType | 'all');
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      const yearMatch =
        yearFilter === 'all' || pub.year.toString() === yearFilter;
      const typeMatch = typeFilter === 'all' || pub.type === typeFilter;
      const searchMatch =
        searchTerm === '' ||
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors
          .join(', ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (pub.keywords &&
          pub.keywords
            .join(', ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));
      return yearMatch && typeMatch && searchMatch;
    });
  }, [publications, yearFilter, typeFilter, searchTerm]);

  if (!initialPublications || initialPublications.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8">
        No publications to display.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="p-4 sm:p-6 shadow-md sticky top-16 md:top-0 z-30 bg-background/90 backdrop-blur-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <div>
            <label
              htmlFor="search-filter"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Search
            </label>
            <Input
              id="search-filter"
              placeholder="Filter by title, author, keyword..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="year-filter"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Year
            </label>
            <Select value={yearFilter} onValueChange={handleYearChange}>
              <SelectTrigger id="year-filter" className="w-full">
                <SelectValue placeholder="Filter by Year" />
              </SelectTrigger>
              <SelectContent>
                {uniqueYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label
              htmlFor="type-filter"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Type
            </label>
            <Select value={typeFilter} onValueChange={handleTypeChange}>
              <SelectTrigger id="type-filter" className="w-full">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {publicationTypeOptions.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {filteredPublications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPublications.map((pub) => (
            <PublicationCard key={pub.id} publication={pub} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpenText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-xl font-semibold text-foreground">
            No publications match your filters.
          </p>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
});
