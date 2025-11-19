import { Card, CardContent } from '@/shared/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface StatCardProps {
  number: string;
  label: string;
  icon: LucideIcon;
  description?: string;
  className?: string;
}

export function StatCard({
  number,
  label,
  icon: Icon,
  description,
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        'backdrop-blur border shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 group',
        'bg-card/50 hover:bg-card/80 border-border/50 hover:border-primary/20',
        className
      )}
    >
      <CardContent className="p-6 text-center">
        <div
          className={cn(
            'w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110',
            'bg-primary/10 text-primary group-hover:bg-primary/20'
          )}
        >
          <Icon className="w-7 h-7" />
        </div>
        <div className="text-2xl font-bold text-foreground mb-1">{number}</div>
        <div className="text-sm font-medium text-muted-foreground mb-1">
          {label}
        </div>
        {description && (
          <div className="text-xs text-muted-foreground/80 mt-2">
            {description}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
