import { Telescope } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { researchIdentity } from '@/shared/config/researcher-profile';

export function CurrentFocus() {
  return (
    <section className="max-w-4xl mx-auto">
      <Card className="border-2 border-primary/30">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Telescope className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl">Current Research Focus</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-primary">
              Primary Focus
            </h3>
            <p className="text-lg">{researchIdentity.currentFocus.primary}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Research Domains</h3>
            <div className="flex flex-wrap gap-2">
              {researchIdentity.currentFocus.domains.map((domain) => (
                <Badge key={domain} variant="outline" className="text-sm">
                  {domain}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground italic">
              Methodology: {researchIdentity.currentFocus.methodology}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
