"use client";

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Building2 } from 'lucide-react';
import type { ExperienceItem } from '@/types';
import { cn } from '@/lib/utils';

interface ExperienceCompactProps {
  experiences: ExperienceItem[];
}

export function ExperienceCompact({ experiences }: ExperienceCompactProps) {
  const [showAll, setShowAll] = useState(false);
  const MAX_VISIBLE_ITEMS = 40;
  const shouldCondense = experiences.length > MAX_VISIBLE_ITEMS;
  const displayedExperiences = shouldCondense && !showAll
    ? experiences.slice(0, MAX_VISIBLE_ITEMS)
    : experiences;
  const remainingCount = shouldCondense && !showAll
    ? experiences.length - MAX_VISIBLE_ITEMS
    : 0;

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
      {displayedExperiences.map((exp, index) => {
        const isCurrent = exp.duration.includes('Present');
        const descriptions = Array.isArray(exp.description) ? exp.description : null;
        const firstDescription = descriptions?.[0];
        const secondDescription = descriptions?.[1];
        const hasAdditionalDescriptions = descriptions ? descriptions.length > 2 : false;
        const hasTags = Array.isArray(exp.tags) && exp.tags.length > 0;
        const statusClasses = cn(
          'badge inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors flex-shrink-0',
          isCurrent
            ? 'border-transparent bg-primary text-primary-foreground'
            : 'border-transparent bg-secondary text-secondary-foreground'
        );

        return (
          <article
            key={exp.id ?? index}
            className="group rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary"
          >
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">{exp.institution}</span>
                  </div>
                </div>
                <span className={statusClasses}>{isCurrent ? "Current" : "Past"}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{exp.duration}</span>
                </div>
                {exp.location && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="text-sm text-muted-foreground mb-3">
                {descriptions ? (
                  <ul className="space-y-1">
                    {firstDescription && (
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="line-clamp-2">{firstDescription}</span>
                      </li>
                    )}
                    {secondDescription && (
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="line-clamp-2">{secondDescription}</span>
                      </li>
                    )}
                    {hasAdditionalDescriptions && (
                      <li className="text-xs italic">
                        +{descriptions.length - 2} more responsibilities
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="line-clamp-3">{exp.description}</p>
                )}
              </div>

              {hasTags && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <div className="flex flex-wrap gap-1">
                    {exp.tags!.slice(0, 4).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs py-0 px-2 h-5">
                        {tag}
                      </Badge>
                    ))}
                    {exp.tags!.length > 4 && (
                      <Badge variant="outline" className="text-xs py-0 px-2 h-5">
                        +{exp.tags!.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </article>
        );
      })}

      {remainingCount > 0 && (
        <div className="col-span-full flex justify-center">
          <button
            type="button"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={() => setShowAll(true)}
          >
            Show all {experiences.length} experiences
            <span className="sr-only">, currently showing first {MAX_VISIBLE_ITEMS}</span>
          </button>
        </div>
      )}

      {showAll && shouldCondense && (
        <div className="col-span-full flex justify-center">
          <button
            type="button"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={() => setShowAll(false)}
          >
            Collapse to first {MAX_VISIBLE_ITEMS} roles
          </button>
        </div>
      )}
    </div>
  );
}
