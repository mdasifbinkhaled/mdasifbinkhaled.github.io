"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Building2 } from 'lucide-react';
import type { ExperienceItem } from '@/types';

interface ExperienceCompactProps {
  experiences: ExperienceItem[];
}

export function ExperienceCompact({ experiences }: ExperienceCompactProps) {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
      {experiences.map((exp, index) => {
        const isCurrent = exp.duration.includes('Present');
        return (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors">
                    {exp.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">{exp.institution}</span>
                  </div>
                </div>
                <Badge variant={isCurrent ? "default" : "secondary"} className="text-xs">
                  {isCurrent ? "Current" : "Past"}
                </Badge>
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
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="text-sm text-muted-foreground mb-3">
                {Array.isArray(exp.description) ? (
                  <ul className="space-y-1">
                    {exp.description.slice(0, 2).map((desc: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="line-clamp-2">{desc}</span>
                      </li>
                    ))}
                    {exp.description.length > 2 && (
                      <li className="text-xs italic">
                        +{exp.description.length - 2} more responsibilities
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="line-clamp-3">{exp.description}</p>
                )}
              </div>
              
              {exp.tags && exp.tags.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <div className="flex flex-wrap gap-1">
                    {exp.tags.slice(0, 4).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs py-0 px-2 h-5">
                        {tag}
                      </Badge>
                    ))}
                    {exp.tags.length > 4 && (
                      <Badge variant="outline" className="text-xs py-0 px-2 h-5">
                        +{exp.tags.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
