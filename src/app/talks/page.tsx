import type { Metadata } from 'next';
import { Presentation, MapPin, Calendar, Video, FileText } from 'lucide-react';
import { talksData } from '@/shared/lib/data/talks';
import { siteConfig } from '@/shared/config/site';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

export const metadata: Metadata = {
  title: `Talks & Presentations | ${siteConfig.author}`,
  description: 'Speaking engagements, keynotes, and lecture seminars.',
  alternates: {
    canonical: '/talks',
  },
};

export default function TalksPage() {
  return (
    <div className="container-responsive py-8 space-y-12 max-w-4xl">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight inline-flex items-center gap-3">
          <Presentation className="h-10 w-10 text-primary" />
          Talks
        </h1>
        <p className="text-xl text-muted-foreground">
          Public speaking engagements, conference presentations, and guest
          lectures.
        </p>
      </div>

      <div className="space-y-6 relative border-l border-primary/20 ml-4 md:ml-6 py-4">
        {talksData.map((talk) => (
          <div key={talk.id} className="relative pl-8 md:pl-12 group">
            {/* Timeline node */}
            <div className="absolute -left-3.5 top-6 flex items-center justify-center w-7 h-7 rounded-full bg-background border-2 border-primary/40 group-hover:border-primary transition-colors duration-300">
              <div className="w-2.5 h-2.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors duration-300" />
            </div>

            <Card className="hover:shadow-md transition-all duration-300 border-border/50 hover:border-primary/50 group-hover:-translate-y-1 bg-card/60 backdrop-blur-sm">
              <CardHeader className="pb-3 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-primary/5 text-primary"
                  >
                    {talk.type}
                  </Badge>
                  <div className="flex items-center text-sm font-medium text-muted-foreground mr-2">
                    <Calendar className="mr-1.5 h-4 w-4" />
                    {new Date(talk.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <CardTitle className="text-2xl leading-none tracking-tight group-hover:text-primary transition-colors">
                  {talk.title}
                </CardTitle>
                <CardDescription className="text-base font-semibold text-foreground/80 flex items-center gap-2">
                  <Presentation className="h-4 w-4 text-primary opacity-80" />
                  {talk.event}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                  <MapPin className="h-4 w-4" />
                  {talk.location}
                </div>
              </CardContent>
              {(talk.slidesUrl || talk.videoUrl) && (
                <CardFooter className="pt-0 pb-6 gap-3">
                  {talk.slidesUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      asChild
                    >
                      <a
                        href={talk.slidesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-4 w-4" />
                        Slides
                      </a>
                    </Button>
                  )}
                  {talk.videoUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      asChild
                    >
                      <a
                        href={talk.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Video className="h-4 w-4" />
                        Recording
                      </a>
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>
          </div>
        ))}

        {talksData.length === 0 && (
          <div className="pl-12 py-12 text-center text-muted-foreground">
            No active talks available right now.
          </div>
        )}
      </div>
    </div>
  );
}
