'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';

interface MotionPageProps {
  children: React.ReactNode;
  className?: string;
}

export function MotionPage({ children, className }: MotionPageProps) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn('container mx-auto p-4 md:p-6 lg:p-8', className)}
    >
      {children}
    </motion.div>
  );
}
