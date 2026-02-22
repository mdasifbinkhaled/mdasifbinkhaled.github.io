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
import { researchIdentity } from '@/shared/lib/data/researcher-profile';

export function OpenSource() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary mb-3">
          Open Source Contributions
        </h2>
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
              <Button variant="outline" size="sm" asChild>
                <Link
                  href={library.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
