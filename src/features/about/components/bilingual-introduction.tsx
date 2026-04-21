import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Languages } from 'lucide-react';
import { personalIdentity } from '@/shared/lib/data/personal';

export function BilingualIntroduction() {
  return (
    <section id="bilingual-introduction" className="grid gap-6 lg:grid-cols-2">
      <Card className="border-primary/20 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Languages className="h-5 w-5 text-primary" />
            {personalIdentity.introductions.english.heading}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
          {personalIdentity.introductions.english.paragraphs.map(
            (paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            )
          )}
        </CardContent>
      </Card>

      <Card className="border-primary/20 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl" lang="bn">
            <Languages className="h-5 w-5 text-primary" />
            {personalIdentity.introductions.bengali.heading}
          </CardTitle>
        </CardHeader>
        <CardContent
          className="space-y-4 text-muted-foreground leading-relaxed"
          lang="bn"
        >
          {personalIdentity.introductions.bengali.paragraphs.map(
            (paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            )
          )}
        </CardContent>
      </Card>
    </section>
  );
}
