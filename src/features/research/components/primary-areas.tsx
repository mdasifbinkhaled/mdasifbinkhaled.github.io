import { Heart, Eye, Layers, Lightbulb, BookOpen, Code } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { researchIdentity } from '@/shared/lib/data/researcher-profile';

const iconMap = {
  Heart,
  Eye,
  Layers,
  Lightbulb,
  BookOpen,
  Code,
};

export function PrimaryAreas() {
  return (
    <section id="research-areas">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Primary Research Areas
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          My work spans three interconnected domains, all focused on making AI
          understandable and beneficial for humanity
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {researchIdentity.primaryAreas.map((area) => {
          const Icon = iconMap[area.icon as keyof typeof iconMap];
          return (
            <Card
              key={area.id}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/50"
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-4 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    {Icon && <Icon className="h-6 w-6 text-primary" />}
                  </div>
                </div>
                <CardTitle className="text-xl">{area.name}</CardTitle>
                <CardDescription>{area.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {area.keywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="secondary"
                      className="text-xs"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
