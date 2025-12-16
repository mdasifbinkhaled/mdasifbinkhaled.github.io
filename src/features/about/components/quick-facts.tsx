import { Card, CardContent } from '@/shared/components/ui/card';
import { quickFacts } from '@/shared/lib/data/about';

export function QuickFacts() {
  return (
    <section>
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickFacts.map((fact) => (
              <div
                key={fact.id}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-background/50 transition-colors"
              >
                <fact.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    {fact.label}
                  </p>
                  <p className="text-sm font-semibold">{fact.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
