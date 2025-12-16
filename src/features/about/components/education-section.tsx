import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card';
import { educationData } from '@/shared/lib/data/education';

export function EducationSection() {
  return (
    <section id="education">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">
        Education
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {educationData.map((edu) => (
          <Card
            key={edu.id}
            className="shadow-md hover:shadow-xl transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-start gap-4">
              <edu.icon className="h-10 w-10 text-primary mt-1 flex-shrink-0" />
              <div>
                <CardTitle className="text-xl">{edu.degree}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {edu.institution} - {edu.location}
                </p>
                <p className="text-sm text-muted-foreground">{edu.duration}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{edu.distinction}</p>
              <p className="mt-2 text-muted-foreground">
                <strong>Thesis:</strong> {edu.thesis.title}
              </p>
              <p className="text-muted-foreground">
                <strong>Advisor:</strong> {edu.thesis.advisor}
              </p>
              {edu.achievements?.map((achievement, idx) => (
                <p
                  key={`${edu.id}-achievement-${idx}`}
                  className="mt-2 text-muted-foreground font-medium"
                >
                  {achievement}
                </p>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
