import { Layers, Target } from 'lucide-react';
import { CollapsibleSection } from '@/shared/components/ui/collapsible-section';
import { SyllabusTable } from '@/features/teaching/components/syllabus-table';
import { Progress } from '@/shared/components/ui/progress';
import { Card, CardContent } from '@/shared/components/ui/card';
import type { CourseData } from '@/shared/types';

export function SyllabusSection({ course }: { course: CourseData }) {
  // Determine if we have content to show
  const hasContent =
    (course.weeklyModules && course.weeklyModules.length > 0) ||
    (course.topics && course.topics.length > 0) ||
    !!course.assessment;

  if (!hasContent) return null;

  return (
    <CollapsibleSection
      title="Syllabus & Curriculum"
      icon={<Layers className="w-6 h-6 text-primary" />}
      defaultOpen={false}
    >
      <div className="p-6">
        {/* Assessment Breakdown (if available) - Kept visible inside the section */}
        {course.assessment && (
          <div className="mb-8 p-6 bg-muted/30 rounded-xl border border-border/40">
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Assessment Breakdown
            </h3>
            <div className="space-y-4">
              {Object.entries(course.assessment).map(([key, value]) => {
                if (typeof value !== 'number' || value <= 0) return null;
                return (
                  <div key={key} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize font-medium text-muted-foreground">
                        {key}
                      </span>
                      <span className="font-bold">{value}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Syllabus Table (Weekly Components) */}
        {course.weeklyModules && course.weeklyModules.length > 0 ? (
          <SyllabusTable modules={course.weeklyModules} />
        ) : (
          /* Fallback: Simple Topics List */
          course.topics &&
          course.topics.length > 0 && (
            <Card className="border-border/40 bg-muted/20">
              <CardContent className="p-6">
                <h3 className="text-base font-semibold mb-4">Course Topics</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {course.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-start gap-3 group">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </CollapsibleSection>
  );
}
