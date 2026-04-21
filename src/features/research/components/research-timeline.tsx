import Link from 'next/link';
import { Badge } from '@/shared/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Icon } from '@/shared/components/common/icons';
import { researchData } from '@/shared/lib/data/research';
import { samplePublications } from '@/shared/lib/data/publications';

function eventYear(value: string): number | null {
  const match = value.match(/\d{4}/);
  return match ? Number(match[0]) : null;
}

export function ResearchTimeline() {
  return (
    <section id="research-timeline" className="max-w-5xl mx-auto space-y-6">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Research Timeline</h2>
        <p className="mx-auto max-w-3xl text-muted-foreground leading-relaxed">
          A compact view of how the research agenda has evolved across grants,
          projects, and published outputs.
        </p>
      </div>

      <div className="relative ml-4 border-l border-primary/20 py-2 md:ml-6">
        {researchData.timeline.map((entry) => {
          const year = eventYear(entry.year);
          const relatedPublications =
            year === null
              ? []
              : samplePublications
                  .filter((publication) => publication.year === year)
                  .slice(0, 2);

          return (
            <div
              key={`${entry.year}-${entry.title}`}
              className="relative pl-8 pb-6 md:pl-12"
            >
              <div className="absolute -left-3.5 top-6 flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary/40 bg-background">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              </div>

              <Card className="border-border/60 bg-card/70 shadow-sm backdrop-blur-xs">
                <CardHeader className="space-y-3 pb-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="secondary" className="capitalize">
                      {entry.type}
                    </Badge>
                    <span className="text-sm font-medium text-muted-foreground">
                      {entry.year}
                    </span>
                  </div>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <span className="rounded-lg bg-primary/10 p-2 text-primary">
                      <Icon name={entry.icon} className="h-5 w-5" />
                    </span>
                    {entry.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="leading-relaxed text-muted-foreground">
                    {entry.description}
                  </p>

                  {relatedPublications.length > 0 ? (
                    <div className="space-y-2 rounded-xl border bg-muted/20 p-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Related outputs
                      </h3>
                      <ul className="space-y-2">
                        {relatedPublications.map((publication) => (
                          <li
                            key={publication.id}
                            className="text-sm leading-relaxed"
                          >
                            <Link
                              href="/publications#publication-listing"
                              className="font-medium text-primary hover:underline"
                            >
                              {publication.title}
                            </Link>
                            <span className="text-muted-foreground">
                              {' '}
                              — {publication.venue}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
}
