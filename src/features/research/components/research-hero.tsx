import { Lightbulb } from 'lucide-react';
import { researchIdentity } from '@/shared/config/researcher-profile';
import { AcademicProfiles } from '@/shared/components/common/academic-profiles';

export function ResearchHero() {
  return (
    <section className="text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
        <Lightbulb className="h-4 w-4" />
        <span>Research Philosophy</span>
      </div>

      <h1 className="text-fluid-heading font-bold tracking-tight text-gradient pb-1">
        Breaking Out of the Black Box
      </h1>

      <p className="text-fluid-lg text-foreground font-medium max-w-4xl mx-auto">
        {researchIdentity.philosophy.statement}
      </p>

      <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        {researchIdentity.philosophy.approach}
      </p>

      {/* Quick Stats */}
      <div className="flex flex-wrap justify-center gap-8 pt-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">XAI</div>
          <div className="text-sm text-muted-foreground">Core Focus</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">Healthcare</div>
          <div className="text-sm text-muted-foreground">Primary Domain</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">Multimodal</div>
          <div className="text-sm text-muted-foreground">AI Approach</div>
        </div>
      </div>

      {/* Academic Profiles */}
      <div className="pt-8">
        <p className="text-sm text-muted-foreground mb-4">
          Find my research profiles:
        </p>
        <AcademicProfiles
          primaryOnly
          variant="horizontal"
          className="justify-center"
        />
      </div>
    </section>
  );
}
