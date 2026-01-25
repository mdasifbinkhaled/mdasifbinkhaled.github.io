'use client';

import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface StatCardProps {
  icon?: LucideIcon;
  label?: string;
  number: number;
  suffix?: string;
  decimals?: number;
  description?: string;
  variant?: 'default' | 'glass';
  className?: string; // Allow external layout control
}

function Counter({
  value,
  decimals = 0,
}: {
  value: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });
  const spring = useSpring(0, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
  });
  const display = useTransform(spring, (current) => current.toFixed(decimals));

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [spring, value, inView]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export function StatCard({
  icon: Icon,
  label,
  number,
  suffix = '',
  decimals = 0,
  description,
  variant = 'default',
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-300 hover:shadow-lg',
        variant === 'glass' &&
          'bg-background/60 backdrop-blur-md border-primary/10',
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="rounded-full bg-primary/10 p-3 text-primary ring-1 ring-inset ring-primary/20">
              <Icon className="h-6 w-6" />
            </div>
          )}
          <div className="flex flex-col">
            {label && (
              <p className="text-sm font-medium text-muted-foreground">
                {label}
              </p>
            )}
            <div className="flex items-baseline gap-1">
              <h3 className="text-2xl font-bold tracking-tight">
                <Counter value={number} decimals={decimals} />
                {suffix}
              </h3>
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1 text-wrap">
                {description}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
