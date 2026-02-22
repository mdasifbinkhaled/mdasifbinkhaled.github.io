'use client';

import { useRef, useCallback } from 'react';
import { cn } from '@/shared/lib/utils';
import type { MouseEvent } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(255, 255, 255, 0.1)',
  ...props
}: SpotlightCardProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    ({ currentTarget, clientX, clientY }: MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      const x = clientX - left;
      const y = clientY - top;

      if (overlayRef.current) {
        overlayRef.current.style.background = `radial-gradient(650px circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`;
      }
    },
    [spotlightColor]
  );

  return (
    <div
      className={cn(
        'group relative border border-border bg-card overflow-hidden rounded-xl',
        className
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
