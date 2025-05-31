
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { professionalExperiences, technicalSkills } from '@/lib/data/experience';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layers, Code, Cpu, Wrench } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper';

const ExperienceTimeline = dynamic(() => import('@/components/experience-timeline').then(mod => mod.ExperienceTimeline), {
  ssr: false,
  loading: () => (
    <div className="space-y-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex gap-4">
          <SkeletonWrapper isLoading className="h-10 w-10 rounded-full" />
          <SkeletonWrapper isLoading className="h-40 w-full" />
        </div>
      ))}
    </div>
  ),
});


export const metadata: Metadata = {
  title: 'Experience & Skills',
  description: `Md Asif Bin Khaled's professional experience and technical skills. ${siteConfig.description}`,
};

export default function ExperiencePage() {
  return (
    <div className="space-y-16">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Professional Experience
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          A timeline of my academic, research, and industry roles.
        </p>
      </header>

      <section id="experience-timeline">
        <ExperienceTimeline experiences={professionalExperiences} />
      </section>

      <section id="skills">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Technical Skills
        </h2>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {technicalSkills.map((skillGroup) => (
            <Card key={skillGroup.category} className="shadow-lg w-full">
              <CardHeader className="flex flex-row items-center space-x-3">
                {skillGroup.category === "Programming & Frameworks" && <Code className="w-6 h-6 text-primary" />}
                {skillGroup.category === "Data Analysis & Visualization" && <Cpu className="w-6 h-6 text-primary" />}
                {skillGroup.category === "Tools & Software" && <Wrench className="w-6 h-6 text-primary" />}
                {!["Programming & Frameworks", "Data Analysis & Visualization", "Tools & Software"].includes(skillGroup.category) && <Layers className="w-6 h-6 text-primary" />}
                <CardTitle className="text-xl">{skillGroup.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

    