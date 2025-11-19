import { cn } from '@/shared/lib/utils';

export interface NewsItem {
  date: string;
  text: string;
  highlight?: string;
  description?: string;
}

interface NewsFeedProps {
  items: NewsItem[];
  className?: string;
}

export function NewsFeed({ items, className }: NewsFeedProps) {
  return (
    <div className={cn('space-y-[var(--space-md)]', className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex gap-[var(--space-md)] text-sm p-[var(--space-md)] rounded-lg bg-card/50 backdrop-blur border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 hover:shadow-md"
        >
          <span className="font-semibold text-primary/80 whitespace-nowrap px-[var(--space-sm)] py-1 rounded bg-primary/10 h-fit">
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
