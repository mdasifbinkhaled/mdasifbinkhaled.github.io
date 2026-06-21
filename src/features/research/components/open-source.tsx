import Link from 'next/link';
import { Code, ExternalLink } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { SectionHeading } from '@/shared/components/layout/section-heading';
import { researchIdentity } from '@/shared/lib/data/researcher-profile';

export function OpenSource() {
  return (
    <section>
      <div className="text-center mb-12">
        <SectionHeading className="mb-3">
          Open Source Contributions
        </SectionHeading>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Building tools for the research community
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {researchIdentity.libraries.map((library) => (
          <Card
            key={library.name}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  <CardTitle>{library.name}</CardTitle>
                </div>
                <Badge variant="outline">{library.status}</Badge>
              </div>
              <CardDescription>{library.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {library.github ? (
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={library.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" size="sm" disabled>
                  Repository coming soon
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
