import { Target, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { researchIdentity } from '@/shared/lib/data/researcher-profile';

export function ResearchVision() {
  return (
    <section className="max-w-4xl mx-auto">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl">Research Vision</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg leading-relaxed">
            {researchIdentity.philosophy.vision}
          </p>
          <div className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-border">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium mb-2">Why It Matters</p>
              <p className="text-sm text-muted-foreground">
                In healthcare, AI decisions can mean life or death. When a model
                predicts stroke risk or diagnoses a disease, doctors and
                patients need to understand WHY—not just trust a black box. My
                research ensures AI systems are transparent, trustworthy, and
                accountable.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
