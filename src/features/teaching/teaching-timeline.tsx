'use client';

import { teachingTimelineEvents } from '@/shared/lib/data/teaching-timeline';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent } from '@/shared/components/ui/card';

export function TeachingTimeline() {
  return (
    <section className="w-full" aria-labelledby="teaching-timeline-heading">
      <h2 id="teaching-timeline-heading" className="sr-only">
        Teaching Timeline
      </h2>

      {/* Horizontal Timeline - Desktop */}
      <div className="hidden lg:block relative">
        {/* Timeline Line */}
        <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

        {/* Timeline Events */}
        <div className="grid grid-cols-5 gap-[var(--space-lg)]">
          {teachingTimelineEvents.map((event) => {
            const Icon = event.icon;
            const isCurrent = event.type === 'current';

            return (
              <div key={event.id} className="relative">
                {/* Connector Dot */}
                <div className="absolute top-[4.75rem] left-1/2 -translate-x-1/2 z-10">
                  <div
                    className={`w-4 h-4 rounded-full border-4 ${
                      isCurrent
                        ? 'bg-primary border-primary shadow-lg shadow-primary/50'
                        : 'bg-card border-primary/40'
                    }`}
                  />
                </div>

                {/* Event Card */}
                <Card
                  className={`relative mt-32 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    isCurrent
                      ? 'border-primary/50 shadow-lg shadow-primary/10'
                      : ''
                  }`}
                >
                  <CardContent className="p-[var(--space-card-md)] text-center">
                    {/* Icon */}
                    <div
                      className={`absolute -top-12 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center ${
                        isCurrent
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Period */}
                    <div className="text-xs font-semibold text-muted-foreground mb-2 mt-6">
                      {event.period}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-sm mb-1 line-clamp-2">
                      {event.title}
                    </h3>

                    {/* Institution */}
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {event.institution}
                    </p>

                    {/* Current Badge */}
                    {isCurrent && (
                      <Badge className="bg-green-500 text-white hover:bg-green-600 text-xs">
                        Current
                      </Badge>
                    )}

                    {/* Highlights */}
                    {event.highlights && event.highlights.length > 0 && (
                      <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                        {event.highlights.slice(0, 2).map((highlight, idx) => (
                          <li key={idx} className="truncate">
                            • {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vertical Timeline - Mobile & Tablet */}
      <div className="lg:hidden space-y-[var(--space-md)]">
        {teachingTimelineEvents.map((event, index) => {
          const Icon = event.icon;
          const isCurrent = event.type === 'current';

          return (
            <div key={event.id} className="relative pl-12">
              {/* Timeline Line */}
              {index < teachingTimelineEvents.length - 1 && (
                <div className="absolute left-[1.875rem] top-12 bottom-0 w-0.5 bg-primary/20" />
              )}

              {/* Icon Circle */}
              <div className="absolute left-3 top-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCurrent
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Event Card */}
              <Card
                className={`transition-all duration-300 hover:shadow-lg ${
                  isCurrent ? 'border-primary/50 shadow-md' : ''
                }`}
              >
                <CardContent className="p-[var(--space-card-md)]">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="text-xs font-semibold text-muted-foreground">
                      {event.period}
                    </div>
                    {isCurrent && (
                      <Badge className="bg-green-500 text-white hover:bg-green-600 text-xs">
                        Current
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-bold text-base mb-1">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {event.institution}
                  </p>

                  {event.description && (
                    <p className="text-sm text-muted-foreground mb-3">
                      {event.description}
                    </p>
                  )}

                  {event.highlights && event.highlights.length > 0 && (
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {event.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
}
