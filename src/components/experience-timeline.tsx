import type { ExperienceItem } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Briefcase, CalendarDays, MapPin } from 'lucide-react';
import Image from 'next/image';

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  if (!experiences || experiences.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No professional experiences to display.</p>;
  }

  return (
    <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-primary/50 before:to-transparent md:before:mx-auto md:before:translate-x-0">
      {experiences.map((item) => (
        <div
          key={item.id}
          className="relative flex items-start md:items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary bg-background shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 mt-1 md:mt-0">
            {item.logoUrl ? (
              <Image
                src={item.logoUrl}
                alt={`${item.institution} logo`}
                width={24}
                height={24}
                className="rounded-sm object-contain"
              />
            ) : (
              <Briefcase className="w-5 h-5 text-primary" />
            )}
          </div>

          <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
              <CardDescription className="text-md text-muted-foreground">
                {item.institution}
              </CardDescription>
              {item.location && (
                <div className="flex items-center text-sm text-muted-foreground pt-1">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  {item.location}
                </div>
              )}
              <div className="flex items-center text-sm text-muted-foreground pt-1">
                <CalendarDays className="w-4 h-4 mr-2 flex-shrink-0" />
                {item.duration}
              </div>
            </CardHeader>
            <CardContent>
              {Array.isArray(item.description) ? (
                <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed">
                  {item.description.map((desc, idx) => <li key={idx}>{desc}</li>)}
                </ul>
              ) : (
                <p className="text-sm leading-relaxed">{item.description}</p>
              )}
              {item.tags && item.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
