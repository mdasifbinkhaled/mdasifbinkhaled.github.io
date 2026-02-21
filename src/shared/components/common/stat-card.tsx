import { Card, CardContent } from '@/shared/components/ui/card';
import dynamic from 'next/dynamic';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const SpotlightCard = dynamic(() =>
  import('@/shared/components/ui/spotlight-card').then(
    (mod) => mod.SpotlightCard
  )
);
/**
 * StatCard Props
 * Consolidated interface supporting all stat card use cases
 */
interface StatCardProps {
  /** Main numeric or string value */
  number: string | number;
  /** Label describing the stat */
  label: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** Optional description text */
  description?: string;
  /** Optional suffix (e.g., '+', '/5.0') */
  suffix?: string;
  /** Number of decimal places for numeric values */
  decimals?: number;
  /** Visual variant */
  variant?: 'default' | 'compact' | 'glass' | 'spotlight';
  /** Additional CSS classes */
  className?: string;
}

/**
 * StatCard Component
 * Reusable statistics card with icon, number, label, and optional description
 */
export function StatCard({
  number,
  label,
  icon: Icon,
  description,
  suffix = '',
  decimals = 0,
  variant = 'default',
  className,
}: StatCardProps) {
  // Format the display value
  const displayValue =
    typeof number === 'number' && decimals > 0
      ? number.toFixed(decimals)
      : String(number);

  const isCompact = variant === 'compact';
  const isSpotlight = variant === 'spotlight';
  const isGlass = variant === 'glass';

  // Spotlight variant
  if (isSpotlight) {
    return (
      <SpotlightCard
        className={cn(
          'flex flex-col p-5 bg-background/60 border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm',
          className
        )}
        spotlightColor="hsl(var(--primary) / 0.15)"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="text-3xl font-bold text-primary tracking-tight">
            {displayValue}
            {suffix}
          </div>
          <div className="p-2 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors">
            <Icon className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm font-bold text-foreground/90 uppercase tracking-wide text-0.8rem">
            {label}
          </div>
          {description && (
            <div className="text-xs text-muted-foreground font-medium leading-relaxed whitespace-pre-line">
              {description}
            </div>
          )}
        </div>
      </SpotlightCard>
    );
  }

  // Glass Variant (Hero Style)
  if (isGlass) {
    return (
      <div
        className={cn(
          'group relative flex flex-col p-5 rounded-xl bg-background/60 border border-border/50 hover:border-primary/30 hover:bg-background/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm',
          className
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="text-3xl font-bold text-primary tracking-tight">
            {displayValue}
            {suffix}
          </div>
          <div className="p-2 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors">
            <Icon className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm font-bold text-foreground/90 uppercase tracking-wide text-0.8rem">
            {label}
          </div>
          {description && (
            <div className="text-xs text-muted-foreground font-medium leading-relaxed whitespace-pre-line">
              {description}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default & Compact Variants (Legacy support or alternative styles)
  return (
    <Card
      className={cn(
        'backdrop-blur border shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 group',
        'bg-card/50 hover:bg-card/80 border-border/50 hover:border-primary/20',
        className
      )}
    >
      <CardContent className={cn('text-center', isCompact ? 'p-5' : 'p-6')}>
        <div
          className={cn(
            'mx-auto rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110',
            'bg-primary/10 text-primary group-hover:bg-primary/20',
            isCompact ? 'w-10 h-10 mb-3 p-2' : 'w-12 h-12 mb-4'
          )}
        >
          <Icon className={cn(isCompact ? 'w-5 h-5' : 'w-7 h-7')} />
        </div>

        {isCompact && (
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
            {label}
          </p>
        )}

        <div
          className={cn(
            'font-bold text-foreground',
            isCompact ? 'text-3xl text-primary' : 'text-2xl mb-1'
          )}
        >
          {displayValue}
          {suffix && (
            <span className={cn(isCompact ? 'text-xl' : 'text-lg')}>
              {suffix}
            </span>
          )}
        </div>

        {!isCompact && (
          <div className="text-sm font-medium text-muted-foreground mb-1">
            {label}
          </div>
        )}

        {description && (
          <div className="text-xs text-muted-foreground/80 mt-2">
            {description}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
