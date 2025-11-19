import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { getResearchInterests } from '@/shared/lib/data/research-interests';

/**
 * Research Highlights Section Component
 * Displays primary research areas and interests
 */
export function ResearchHighlights() {
  const interests = getResearchInterests();

  return (
    <section className="w-full py-12 md:py-16">
      <div className="container-responsive">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          Research Interests
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {interests.map((interest) => {
            const Icon = interest.icon;
            return (
              <Card
                key={interest.id}
                className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary"
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <Icon className="w-6 h-6 text-primary" />
                    <CardTitle className="text-xl">{interest.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>{interest.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
