import { BookOpenText, Target, CheckCircle, Award } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { CollapsibleSection } from '@/shared/components/ui/collapsible-section';
import type { CourseData } from '@/shared/types';
import { cn } from '@/shared/lib/utils';

export function OverviewSection({ course }: { course: CourseData }) {
  return (
    <CollapsibleSection
      title="Course Overview"
      icon={BookOpenText}
      defaultOpen={true}
    >
      <div className="p-6 space-y-8">
        {/* Quick Facts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-muted/50 border border-border/50 space-y-1">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Level
            </h4>
            <div className="font-medium capitalize">{course.level}</div>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 border border-border/50 space-y-1">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Credits
            </h4>
            <div className="font-medium">{course.credits} Credits</div>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 border border-border/50 space-y-1">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Semester
            </h4>
            <div className="font-medium">
              {course.semester} {course.year}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 border border-border/50 space-y-1">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Status
            </h4>
            <div className="flex items-center gap-2 font-medium">
              <span
                className={cn(
                  'w-2 h-2 rounded-full',
                  course.status === 'ongoing'
                    ? 'bg-green-500 animate-pulse'
                    : 'bg-muted-foreground'
                )}
              />
              <span className="capitalize">{course.status}</span>
            </div>
          </div>
        </div>

        <Accordion
          type="multiple"
          defaultValue={['description', 'objectives', 'outcomes']}
          className="w-full"
        >
          <AccordionItem value="description" className="border-b px-6">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
              Course Description
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
              {course.description}
            </AccordionContent>
          </AccordionItem>

          {course.objectives && course.objectives.length > 0 && (
            <AccordionItem value="objectives" className="border-b px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary/80" />
                  Learning Objectives
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <ul className="space-y-3">
                  {course.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full p-1 mt-0.5 shrink-0">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{obj}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}

          {course.outcomes && course.outcomes.length > 0 && (
            <AccordionItem value="outcomes" className="px-6 border-b-0">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary/80" />
                  Expected Outcomes
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <ul className="space-y-3">
                  {course.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="bg-green-500/10 rounded-full p-1 mt-0.5 shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <span className="text-sm sm:text-base text-muted-foreground">
                        {outcome}
                      </span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </CollapsibleSection>
  );
}
