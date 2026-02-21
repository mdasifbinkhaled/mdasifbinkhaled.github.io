import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { getResearchInterests } from '@/shared/lib/data/research-interests';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';

/** Displays primary research areas and interests. */
export function ResearchHighlights() {
  const interests = getResearchInterests();

  return (
    <section className="w-full py-12 md:py-16 relative overflow-hidden">
      {/* Subtle ambient background */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-2xl" />

      <div className="container-responsive relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Research Interests
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exploring the intersection of AI, healthcare, and human-centered
            computing
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {interests.map((interest) => {
            const Icon = interest.icon;
            return (
              <Card
                key={interest.id}
                className="group relative overflow-hidden border-0 bg-background/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50" />

                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{interest.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  <p>{interest.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" asChild className="group">
            <Link href="/research">
              View All Research
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
