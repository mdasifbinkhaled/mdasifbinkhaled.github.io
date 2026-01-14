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
      <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
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
              className="group border-0 bg-background/60 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
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
