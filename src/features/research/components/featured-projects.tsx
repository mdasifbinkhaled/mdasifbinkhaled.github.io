import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { researchProjects } from '@/shared/config/researcher-profile';

export function FeaturedProjects() {
  return (
    <section id="research-projects">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Featured Research Projects
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          In-depth explorations of AI applications in healthcare and beyond
        </p>
      </div>

      <div
        className="grid gap-8 lg:grid-cols-1"
        style={{
          contentVisibility: 'auto',
          containIntrinsicSize: 'auto 500px',
        }}
      >
        {researchProjects.featured.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 border-b border-border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <Badge variant="outline">{project.status}</Badge>
                    <Badge variant="secondary">{project.domain}</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-primary font-medium">{project.tagline}</p>
                </div>
              </div>
            </div>

            <CardContent className="pt-6 space-y-4">
              <p className="text-lg leading-relaxed">{project.description}</p>

              {project.placeholder && (
                <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg border border-border">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium mb-2">
                      Detailed Information Coming Soon
                    </p>
                    <p className="text-muted-foreground">
                      Comprehensive project details including methodologies,
                      results, and code repositories will be added here.
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Impact:</span>{' '}
                  {'impact' in project ? project.impact : 'To be detailed'}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
