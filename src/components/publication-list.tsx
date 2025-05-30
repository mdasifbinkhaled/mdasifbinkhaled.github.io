"use client";

import type { PublicationItem, PublicationType } from '@/types';
import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, BookOpenText, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface PublicationListProps {
  initialPublications: PublicationItem[];
}

const publicationTypeOptions: PublicationType[] = ['Conference', 'Journal', 'Workshop', 'Preprint', 'In Progress', 'Book Chapter', 'Thesis'];

export function PublicationList({ initialPublications }: PublicationListProps) {
  const [publications, setPublications] = useState<PublicationItem[]>(initialPublications);
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<PublicationType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);


  const uniqueYears = useMemo(() => {
    const years = new Set(initialPublications.map(p => p.year.toString()));
    return ['all', ...Array.from(years).sort((a, b) => parseInt(b) - parseInt(a))];
  }, [initialPublications]);

  const filteredPublications = useMemo(() => {
    return publications.filter(pub => {
      const yearMatch = yearFilter === 'all' || pub.year.toString() === yearFilter;
      const typeMatch = typeFilter === 'all' || pub.type === typeFilter;
      const searchMatch = searchTerm === '' || 
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.join(', ').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pub.keywords && pub.keywords.join(', ').toLowerCase().includes(searchTerm.toLowerCase()));
      return yearMatch && typeMatch && searchMatch;
    });
  }, [publications, yearFilter, typeFilter, searchTerm]);

  if (!mounted) {
     // Render nothing or a placeholder on the server/initial client render to avoid hydration mismatch
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 border rounded-lg shadow-sm bg-card">
          <div className="flex-1 min-w-[150px]"></div>
          <div className="flex-1 min-w-[150px]"></div>
          <div className="flex-1 min-w-[150px]"></div>
        </div>
        <Card className="opacity-50">
          <CardHeader>
            <CardTitle>Loading publications...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }


  if (!initialPublications || initialPublications.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No publications to display.</p>;
  }

  return (
    <div className="space-y-8">
      <Card className="p-4 sm:p-6 shadow-md sticky top-16 md:top-0 z-30 bg-background/90 backdrop-blur-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="search-filter" className="block text-sm font-medium text-foreground mb-1">Search</label>
            <Input
              id="search-filter"
              placeholder="Filter by title, author, keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="year-filter" className="block text-sm font-medium text-foreground mb-1">Year</label>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger id="year-filter" className="w-full">
                <SelectValue placeholder="Filter by Year" />
              </SelectTrigger>
              <SelectContent>
                {uniqueYears.map(year => (
                  <SelectItem key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="type-filter" className="block text-sm font-medium text-foreground mb-1">Type</label>
            <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as PublicationType | 'all')}>
              <SelectTrigger id="type-filter" className="w-full">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {publicationTypeOptions.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {filteredPublications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPublications.map(pub => (
            <Card key={pub.id} className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg leading-tight">{pub.title}</CardTitle>
                <CardDescription className="text-sm pt-1">
                  {pub.authors.join(', ')}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground italic">{pub.venue}</p>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{pub.year}</span>
                  <span className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full">{pub.type}</span>
                </div>
                {pub.abstract && (
                   <details className="mt-3 text-sm">
                     <summary className="cursor-pointer text-primary hover:underline">Abstract</summary>
                     <p className="mt-1 text-muted-foreground leading-relaxed">{pub.abstract}</p>
                   </details>
                )}
                 {pub.keywords && pub.keywords.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {pub.keywords.map(keyword => (
                      <span key={keyword} className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex gap-2 w-full">
                  {pub.link && (
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a href={pub.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> View Online
                      </a>
                    </Button>
                  )}
                  {pub.pdfLink && (
                    <Button variant="default" size="sm" asChild className="flex-1">
                      <a href={pub.pdfLink} target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 h-4 w-4" /> Download PDF
                      </a>
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpenText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-xl font-semibold text-foreground">No publications match your filters.</p>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
