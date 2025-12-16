import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/components/ui/card';
import { Award, CalendarCheck2 } from 'lucide-react';
import { certifications } from '@/shared/lib/data/about';

export function CertificationsSection() {
  return (
    <section id="certifications">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">
        Certifications & Training
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {certifications.map((cert) => (
          <Card
            key={cert.id}
            className="shadow-md hover:shadow-lg transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-start gap-3">
              <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <CardTitle className="text-lg">{cert.title}</CardTitle>
                <CardDescription>{cert.institution}</CardDescription>
                {cert.date && (
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center">
                    <CalendarCheck2 className="h-3 w-3 mr-1" />
                    {cert.date}
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{cert.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
