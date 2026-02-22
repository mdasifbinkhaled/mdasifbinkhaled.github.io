import {
  ClipboardList,
  ExternalLink,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { CollapsibleSection } from '@/shared/components/ui/collapsible-section';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import type { CourseData } from '@/shared/types';
import { cn } from '@/shared/lib/utils';

interface AssignmentsSectionProps {
  course: CourseData;
}

export function AssignmentsSection({ course }: AssignmentsSectionProps) {
  if (!course.assignments || course.assignments.length === 0) return null;

  return (
    <CollapsibleSection
      title="Assignments"
      icon={<ClipboardList className="w-6 h-6 text-primary" />}
      defaultOpen={true}
    >
      <div className="p-6 space-y-4">
        {course.assignments.map((assignment, idx) => (
          <Card
            key={idx}
            className="border-border/40 shadow-sm hover:shadow-md transition-all group overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-primary/10 rounded-lg text-primary shrink-0">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-base">
                      {assignment.title}
                    </h4>
                    {assignment.status && (
                      <Badge
                        variant={
                          assignment.status === 'active'
                            ? 'default'
                            : assignment.status === 'closed'
                              ? 'secondary'
                              : 'outline'
                        }
                        className={cn(
                          'text-[10px] px-1.5 h-5 capitalize',
                          assignment.status === 'active' && 'bg-primary'
                        )}
                      >
                        {assignment.status}
                      </Badge>
                    )}
                  </div>
                  {assignment.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {assignment.description}
                    </p>
                  )}
                  {assignment.dueDate && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Due: {assignment.dueDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {assignment.link ? (
                <Button asChild size="sm" className="shrink-0 gap-2">
                  <a
                    href={assignment.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${assignment.title}`}
                  >
                    View Assignment
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Button>
              ) : (
                <Badge variant="outline" className="shrink-0 gap-1.5 py-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Coming Soon
                </Badge>
              )}
            </div>
          </Card>
        ))}
      </div>
    </CollapsibleSection>
  );
}
