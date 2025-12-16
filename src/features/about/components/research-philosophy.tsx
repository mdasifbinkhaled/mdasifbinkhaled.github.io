import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/components/ui/card';
import { Brain } from 'lucide-react';
import { researchIdentity } from '@/shared/config/researcher-profile';
import { AcademicProfiles } from '@/shared/components/academic-profiles';

export function ResearchPhilosophy() {
  return (
    <section id="research-philosophy">
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            Research Philosophy
          </CardTitle>
          <CardDescription className="text-base">
            {researchIdentity.philosophy.statement}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {researchIdentity.philosophy.vision}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {researchIdentity.philosophy.approach}
          </p>

          {/* Research Areas */}
          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-4">
              Primary Research Areas
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {researchIdentity.primaryAreas.map((area) => (
                <div
                  key={area.id}
                  className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="font-medium text-sm">{area.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {area.keywords.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Profiles */}
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold mb-4">Academic Profiles</h3>
            <AcademicProfiles variant="grid" showLabels={true} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
