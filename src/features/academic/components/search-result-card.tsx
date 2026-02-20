import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { DISPLAY_LIMITS } from '@/shared/config';
import type { SearchableContent } from '../types';
import { getTypeIcon } from '../utils/get-type-icon';

interface SearchResultCardProps {
  item: SearchableContent;
}

/**
 * Individual search result card component.
 * @param props - Component props
 * @returns Single search result card UI
 */
export function SearchResultCard({ item }: SearchResultCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg" aria-hidden="true">
                {getTypeIcon(item.type)}
              </span>
              <Badge variant="outline" className="text-xs capitalize">
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
                {item.tags
                  .slice(0, DISPLAY_LIMITS.ACADEMIC_SEARCH_TAGS)
                  .map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                {item.tags.length > DISPLAY_LIMITS.ACADEMIC_SEARCH_TAGS && (
                  <Badge variant="outline" className="text-xs">
                    +{item.tags.length - DISPLAY_LIMITS.ACADEMIC_SEARCH_TAGS}
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
  );
}
