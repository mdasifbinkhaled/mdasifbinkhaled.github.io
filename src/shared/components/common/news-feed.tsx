import { cn } from '@/shared/lib/utils';

/**
 * NewsItem interface for news feed data
 */
export interface NewsItem {
  /** Unique identifier for stable React keys */
  id: string;
  /** Display date (e.g., '[2025/03]') */
  date: string;
  /** Main text content */
  text: string;
  /** Optional highlighted portion (displayed in accent color) */
  highlight?: string;
  /** Optional description following the highlight */
  description?: string;
}

interface NewsFeedProps {
  items: NewsItem[];
  className?: string;
}

/**
 * NewsFeed Component
 * Displays a list of news items with consistent styling
 */
export function NewsFeed({ items, className }: NewsFeedProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex gap-4 text-sm p-4 rounded-lg bg-card/50 backdrop-blur border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 hover:shadow-md"
        >
          <span className="font-semibold text-primary/80 whitespace-nowrap px-2 py-1 rounded bg-primary/10 h-fit">
            {item.date}
          </span>
          <div className="flex-1">
            <span className="text-foreground">{item.text}</span>
            {item.highlight && (
              <span className="text-primary font-semibold">
                {item.highlight}
              </span>
            )}
            {item.description && (
              <span className="text-foreground">{item.description}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
