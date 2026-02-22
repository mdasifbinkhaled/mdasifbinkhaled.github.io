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
  /** Visual variant: default (card style) or glass (frosted/translucent) */
  variant?: 'default' | 'glass';
  /** Enable cursor-tracking spotlight effect (glass variant only) */
  spotlight?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Shared inner layout for glass and spotlight variants
 */
function GlassContent({
  displayValue,
  suffix,
  label,
  description,
  icon: Icon,
}: {
  displayValue: string;
  suffix: string;
  label: string;
  description?: string;
  icon: LucideIcon;
}) {
  return (
    <>
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
    </>
  );
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
  spotlight = false,
  className,
}: StatCardProps) {
  // Format the display value
  const displayValue =
    typeof number === 'number' && decimals > 0
      ? number.toFixed(decimals)
      : String(number);

  const isGlass = variant === 'glass';

  // Glass variant (with optional spotlight effect)
  if (isGlass) {
    const glassClasses = cn(
      'flex flex-col p-5 bg-background/60 border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm',
      className
    );

    const content = (
      <GlassContent
        displayValue={displayValue}
        suffix={suffix}
        label={label}
        description={description}
        icon={Icon}
      />
    );

    if (spotlight) {
      return (
        <SpotlightCard
          className={glassClasses}
          spotlightColor="hsl(var(--primary) / 0.15)"
        >
          {content}
        </SpotlightCard>
      );
    }

    return (
      <div
        className={cn(
          'group relative rounded-xl border hover:border-primary/30 hover:bg-background/80',
          glassClasses
        )}
      >
        {content}
      </div>
    );
  }

  // Default variant
  return (
    <Card
      className={cn(
        'backdrop-blur border shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 group',
        'bg-card/50 hover:bg-card/80 border-border/50 hover:border-primary/20',
        className
      )}
    >
      <CardContent className="text-center p-6">
        <div
          className={cn(
            'mx-auto rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110',
            'bg-primary/10 text-primary group-hover:bg-primary/20',
            'w-12 h-12 mb-4'
          )}
        >
          <Icon className="w-7 h-7" />
        </div>

        <div className="font-bold text-foreground text-2xl mb-1">
          {displayValue}
          {suffix && <span className="text-lg">{suffix}</span>}
        </div>

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
