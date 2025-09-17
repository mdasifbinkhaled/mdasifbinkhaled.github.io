import { memo } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/card';
import { ExternalLink, FileText, ChevronDown } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import type { PublicationItem } from '@/types';
import { cn } from '@/shared/lib/utils';

interface PublicationCardProps {
  publication: PublicationItem;
}

export const PublicationCard = memo(function PublicationCard({
  publication,
}: PublicationCardProps) {
  return (
    <Card
      className={cn(
        'flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300',
        'transform hover:-translate-y-1 group'
      )}
    >
      <CardHeader>
        <CardTitle className="text-lg leading-tight">
          {publication.title}
        </CardTitle>
        <CardDescription className="text-sm pt-1">
          {publication.authors.join(', ')}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground italic">
          {publication.venue}
        </p>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{publication.year}</span>
          <Badge variant="secondary" className="text-xs px-3 py-1">
            {publication.type}
          </Badge>
        </div>

        {(publication.abstract ||
          (publication.keywords && publication.keywords.length > 0)) && (
          <details className="mt-3 group">
            <summary className="cursor-pointer font-medium text-primary hover:text-primary/80 transition-colors flex items-center list-none">
              <ChevronDown className="h-4 w-4 mr-1 transition-transform group-open:rotate-180" />
              <span className="select-none">Show more</span>
            </summary>

            <div className="mt-3 space-y-3">
              {publication.abstract && (
                <div>
                  <h4 className="font-semibold text-sm mb-1">Abstract</h4>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {publication.abstract}
                  </p>
                </div>
              )}

              {publication.keywords && publication.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {publication.keywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="outline"
                      className="text-xs bg-background"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </details>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex gap-2 w-full">
          {publication.link && (
            <a
              href={publication.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 flex-1"
            >
              <ExternalLink className="mr-2 h-4 w-4" /> View
            </a>
          )}
          {publication.pdfLink && (
            <a
              href={publication.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 flex-1"
            >
              <FileText className="mr-2 h-4 w-4" /> PDF
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
});
