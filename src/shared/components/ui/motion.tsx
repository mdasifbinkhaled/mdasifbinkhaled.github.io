'use client';

import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import type { ReactNode } from 'react';

/**
 * Standard Motion Primitives
 * Centralized animation configurator to ensure consistent "physics" across the app.
 */

// Physics-based Spring Animations (Apple-like feel)
export const SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 350,
  damping: 30,
} as const;

export const SMOOTH_TRANSITION = {
  duration: 0.3,
  ease: 'easeInOut',
} as const;

interface FadeInProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  fullWidth?: boolean;
}

/**
 * FadeIn Component
 * Standard entry animation for content blocks
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
  fullWidth = false,
  ...props
}: FadeInProps) {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: {},
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.4,
        delay: delay,
        ease: [0.25, 0.25, 0, 1], // Cubic bezier for native feel
      }}
      className={cn(fullWidth ? 'w-full' : '', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScaleOnHover Component
 * Micro-interaction for cards and clickable items
 */
export function ScaleOnHover({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={SPRING_TRANSITION}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * LayoutShell Component
 * wrapper for layout animations
 */
export const MotionLayout = motion.div;
