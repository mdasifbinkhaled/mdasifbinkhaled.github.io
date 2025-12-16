import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/components/ui/card';
import { CalendarCheck2 } from 'lucide-react';
import { honorsAndAwards } from '@/shared/lib/data/about';

export function AwardsSection() {
  return (
    <section id="honors-awards">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">
        Honors & Awards
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {honorsAndAwards.map((award) => (
          <Card
            key={award.id}
            className="shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <CardHeader className="flex flex-row items-start gap-3">
              <award.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <CardTitle className="text-base">{award.title}</CardTitle>
                <CardDescription className="text-sm">
                  {award.institution}
                </CardDescription>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <CalendarCheck2 className="h-3 w-3 mr-1" />
                  {award.date}
                </p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
