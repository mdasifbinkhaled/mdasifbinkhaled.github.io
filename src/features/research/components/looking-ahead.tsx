import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { researchIdentity } from '@/shared/config/researcher-profile';

export function LookingAhead() {
  return (
    <section className="max-w-4xl mx-auto">
      <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">Looking Ahead</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
              Long-term Vision
            </h3>
            <p className="text-lg">{researchIdentity.goals.longTerm}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
              Impact Goal
            </h3>
            <p className="text-lg">{researchIdentity.goals.impact}</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
