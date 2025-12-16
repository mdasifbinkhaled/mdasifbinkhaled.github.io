import { ExperienceCompact } from '@/shared/components/common/experience-compact';
import { professionalExperiences } from '@/shared/lib/data/experience';

export function ExperienceSection() {
  return (
    <section id="experience">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">
        Professional Experience
      </h2>
      <ExperienceCompact experiences={professionalExperiences} />
    </section>
  );
}
