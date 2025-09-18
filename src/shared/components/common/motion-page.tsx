'use client';

interface MotionPageProps {
  children: React.ReactNode;
  className?: string;
}

export function MotionPage({ children, className }: MotionPageProps) {
  return (
    <div className={`animate-in ${className || ''}`}>
      {children}
    </div>
  );
}
