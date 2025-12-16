import { Card, CardContent } from '@/shared/components/ui/card';
import { highlights } from '@/shared/lib/data/about';

export function HighlightsSection() {
  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {highlights.map((stat) => (
          <Card
            key={stat.id}
            className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-primary/10"
          >
            <CardContent className="pt-6 pb-6">
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
              <div className="text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
