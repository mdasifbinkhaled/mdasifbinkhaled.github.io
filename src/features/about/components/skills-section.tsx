import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import {
  Code,
  Cpu,
  Wrench,
  Users,
  Briefcase,
  Heart,
  BookOpen,
  Layers,
} from 'lucide-react';
import { technicalSkills } from '@/shared/lib/data/experience';

export function SkillsSection() {
  return (
    <section id="skills">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">
        Technical Skills
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {technicalSkills.map((skillGroup) => {
          const iconMap: Record<string, typeof Code> = {
            'Programming & Frameworks': Code,
            'Data Analysis & Visualization': Cpu,
            'Tools & Software': Wrench,
            'Teaching & Pedagogy': Users,
            'Project Management': Briefcase,
            'Soft Skills': Heart,
            Languages: BookOpen,
          };
          const IconComponent = iconMap[skillGroup.category] || Layers;

          return (
            <Card
              key={skillGroup.category}
              className="shadow-md hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <IconComponent className="w-5 h-5 text-primary" />
                  {skillGroup.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
