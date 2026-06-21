import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Icon } from '@/shared/components/common/icons';
import { technicalSkills } from '@/shared/lib/data/experience';

export function SkillsSection() {
  return (
    <section id="skills">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground text-center mb-10">
        Technical Skills
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {technicalSkills.map((skillGroup) => {
          return (
            <Card
              key={skillGroup.category}
              className="group border-0 bg-background/60 backdrop-blur-xs shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon
                      name={skillGroup.iconName || 'Layers'}
                      className="w-5 h-5 text-primary"
                    />
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
