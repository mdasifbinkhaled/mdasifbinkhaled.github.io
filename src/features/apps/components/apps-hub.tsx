'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { apps, appCategories } from '@/shared/config/apps';
import type { AppCategory } from '@/shared/types';
import { ToolCard } from './tool-card';
import { ToolsHero } from './tools-hero';

export function AppsHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AppCategory | 'all'>(
    'all'
  );

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesSearch =
        app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || app.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categories = ['all', ...Object.keys(appCategories)] as (
    | 'all'
    | AppCategory
  )[];

  // Group filtered apps by category if no search query, else flat list
  const groups = useMemo(() => {
    if (searchQuery) {
      return [
        { category: 'search', label: 'Search Results', items: filteredApps },
      ];
    }
    const order: AppCategory[] = ['grades', 'planning', 'productivity'];
    return order
      .map((cat) => ({
        category: cat,
        label: appCategories[cat],
        items: filteredApps.filter((a) => a.category === cat),
      }))
      .filter((g) => g.items.length > 0);
  }, [filteredApps, searchQuery]);

  return (
    <div className="container-responsive flex flex-col gap-8 pb-16 pt-8">
      <ToolsHero />

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between py-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background border-input rounded-2xl h-10 transition-colors focus-visible:ring-primary/50"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="rounded-full px-4 shrink-0 transition-all active:scale-95"
            >
              {cat === 'all' ? 'All Tools' : appCategories[cat as AppCategory]}
            </Button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      {groups.length === 0 ? (
        <div className="text-center py-24 px-4 bg-primary/5 rounded-3xl border border-dashed">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background mb-4 shadow-sm">
            <Search className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight mb-2">
            No tools found
          </h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            We couldn't find any tools matching your search criteria. Try using
            different keywords or clear your filters.
          </p>
          <Button
            variant="outline"
            className="mt-6 rounded-full px-6"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="space-y-12">
          {groups.map((group) => (
            <section key={group.category} className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                {group.label}
                <span className="text-sm font-semibold text-muted-foreground bg-muted px-3 py-0.5 rounded-full">
                  {group.items.length}
                </span>
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((app) => (
                  <ToolCard key={app.slug} app={app} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
