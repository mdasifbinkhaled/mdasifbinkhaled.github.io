'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Timer, ExternalLink, Trophy } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface ContestCountdownProps {
  contest: {
    title: string;
    url: string;
    endDate: string;
    platform: string;
  };
}

export function ContestCountdown({ contest }: ContestCountdownProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [, setTicker] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const timer = setInterval(() => {
      setTicker((t) => t + 1);
    }, 1000 * 60 * 60);

    return () => clearInterval(timer);
  }, [contest.endDate]);

  if (!isMounted) return null;

  const difference = +new Date(contest.endDate) - +new Date();
  const timeLeft = difference > 0 ? {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
  } : null;

  if (!timeLeft) return null;

  return (
    <Card className="border-border/60 bg-muted/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Trophy className="w-24 h-24 rotate-12" />
      </div>
      <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <div className="space-y-2 text-center sm:text-left">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border border-primary/20"
          >
            <Timer className="w-3 h-3 mr-1" />
            Active Contest
          </Badge>
          <h3 className="text-xl font-bold tracking-tight">{contest.title}</h3>
          <p className="text-muted-foreground">
            Hosted on{' '}
            <span className="font-semibold text-foreground">
              {contest.platform}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-4 text-center">
            <div>
              <div className="text-3xl font-bold font-mono text-foreground">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Days
              </div>
            </div>
            <div className="text-3xl font-bold font-mono text-muted-foreground/30">
              :
            </div>
            <div>
              <div className="text-3xl font-bold font-mono text-foreground">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Hours
              </div>
            </div>
          </div>

          <Button asChild size="lg" className="shadow-lg">
            <a href={contest.url} target="_blank" rel="noopener noreferrer">
              Join Contest <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
