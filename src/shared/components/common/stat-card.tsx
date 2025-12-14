import { Card, CardContent } from '@/shared/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

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
  variant?: 'default' | 'compact';
  /** Additional CSS classes */
  className?: string;
}

/**
 * StatCard Component
 * Reusable statistics card with icon, number, label, and optional description
 *
 * @example
 * // Basic usage
 * <StatCard number="7+" label="Years Teaching" icon={GraduationCap} />
 *
 * // With suffix and decimals
 * <StatCard number={4.7} label="Rating" icon={Star} suffix="/5.0" decimals={1} />
 *
 * // Compact variant
 * <StatCard number={300} label="Students" icon={Users} suffix="+" variant="compact" />
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
            'mx-auto rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110',
            'bg-primary/10 text-primary group-hover:bg-primary/20',
            isCompact ? 'w-10 h-10 mb-3 rounded-full p-2' : 'w-12 h-12 mb-4'
          )}
        >
          <Icon className={cn(isCompact ? 'w-5 h-5' : 'w-7 h-7')} />
        </div>

        {/* Label first for compact variant (visual hierarchy) */}
        {isCompact && (
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
            {label}
          </p>
        )}

        {/* Number display */}
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

        {/* Label for default variant */}
        {!isCompact && (
          <div className="text-sm font-medium text-muted-foreground mb-1">
            {label}
          </div>
        )}

        {/* Optional description */}
        {description && (
          <div className="text-xs text-muted-foreground/80 mt-2">
            {description}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
