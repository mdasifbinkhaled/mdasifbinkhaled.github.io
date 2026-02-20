import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/components/ui/card';
import { Radio } from 'lucide-react';
import {
  professionalService,
  personalInterests,
} from '@/shared/lib/data/about';

export function BeyondAcademia() {
  return (
    <section id="beyond-academia">
      <Card className="border-primary/20 bg-gradient-to-br from-accent/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Radio className="w-6 h-6 text-primary" />
            Beyond Academia & Service
          </CardTitle>
          <CardDescription>
            Personal interests and professional service contributions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Personal Interests */}
            {personalInterests.map((interest) => (
              <div
                key={interest.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-background/50"
              >
                <interest.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">
                    {interest.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {interest.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Professional Service */}
            <div className="pt-4 mt-4 border-t border-border/50">
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                Professional Service
              </h3>
              <div className="space-y-3">
                {professionalService.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-background/50"
                  >
                    <service.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">
                        {service.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {service.organization} • {service.duration}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
