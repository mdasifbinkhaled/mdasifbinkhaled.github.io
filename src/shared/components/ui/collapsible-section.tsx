'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import React from 'react';

export interface CollapsibleSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function CollapsibleSection({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
  className,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn('mb-8', className)}>
      <Card
        className={cn(
          'border-primary/20 overflow-hidden shadow-sm transition-all duration-300',
          isOpen ? 'shadow-md' : 'shadow-sm'
        )}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className={cn(
            'w-full flex items-center justify-between p-6 cursor-pointer hover:bg-muted/30 transition-colors group',
            !isOpen && 'border-b-0',
            isOpen && 'border-b'
          )}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {title}
            </h2>
          </div>
          <ChevronDown
            className={cn(
              'w-5 h-5 text-muted-foreground transition-transform duration-300',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        <div
          className={cn(
            'grid transition-all duration-300 ease-in-out',
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          )}
        >
          <div className="overflow-hidden">
            <CardContent className="p-0">{children}</CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
