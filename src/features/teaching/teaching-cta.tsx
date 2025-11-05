'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { MessageSquare, ArrowRight } from 'lucide-react';

export function TeachingCTA() {
  return (
    <section className="w-full" aria-labelledby="teaching-cta-heading">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex items-center gap-[var(--space-md)] justify-center">
            <MessageSquare className="w-6 h-6 text-primary" />
            <CardTitle
              id="teaching-cta-heading"
              className="text-xl text-center"
            >
              Interested in Academic Collaboration?
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-[var(--space-md)]">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about my teaching approach, curriculum development,
            or looking to collaborate on educational initiatives?
          </p>
          <Link href="/contact">
            <Button size="lg" className="group">
              Get in Touch
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
