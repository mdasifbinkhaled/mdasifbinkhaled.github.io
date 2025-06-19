"use client"

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { PublicationItem } from '@/types';
import { cn } from '@/lib/utils';

interface PublicationCardProps {
  publication: PublicationItem;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={cn(
      "flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300",
      "transform hover:-translate-y-1",
      isExpanded && "border-primary/30"
    )}>
      <CardHeader>
        <CardTitle className="text-lg leading-tight group">
          {publication.title}
        </CardTitle>
        <CardDescription className="text-sm pt-1">
          {publication.authors.join(', ')}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground italic">{publication.venue}</p>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{publication.year}</span>
          <Badge variant="secondary" className="text-xs px-3 py-1">
            {publication.type}
          </Badge>
        </div>
        
        {(publication.abstract || (publication.keywords && publication.keywords.length > 0)) && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 p-0 h-auto font-medium text-primary hover:text-primary/80 hover:bg-transparent"
          >
            {isExpanded ? (
              <><ChevronUp className="h-4 w-4 mr-1" /> Show less</>
            ) : (
              <><ChevronDown className="h-4 w-4 mr-1" /> Show more</>
            )}
          </Button>
        )}
        
        {isExpanded && publication.abstract && (
          <div className={cn(
            "mt-3 text-sm overflow-hidden transition-all duration-300",
            isExpanded ? "max-h-96" : "max-h-0"
          )}>
            <h4 className="font-semibold text-sm mb-1">Abstract</h4>
            <p className="text-muted-foreground leading-relaxed">{publication.abstract}</p>
          </div>
        )}
        
        {isExpanded && publication.keywords && publication.keywords.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {publication.keywords.map(keyword => (
              <Badge key={keyword} variant="outline" className="text-xs bg-background">
                {keyword}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex gap-2 w-full">
          {publication.link && (
            <Button variant="outline" size="sm" asChild className="flex-1">
              <a href={publication.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> View
              </a>
            </Button>
          )}
          {publication.pdfLink && (
            <Button variant="default" size="sm" asChild className="flex-1">
              <a href={publication.pdfLink} target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" /> PDF
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}