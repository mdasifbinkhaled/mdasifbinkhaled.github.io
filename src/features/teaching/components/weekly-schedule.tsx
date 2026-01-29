import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  BookOpen,
  Code2,
  Video,
  FileText,
  MonitorPlay,
  Github,
} from 'lucide-react';

interface WeeklyModule {
  week: number;
  title: string;
  description?: string;
  theory?: {
    topic: string;
    slides?: string;
    recording?: string;
  };
  lab?: {
    topic: string;
    task?: string;
    repo?: string;
  };
}

interface WeeklyScheduleProps {
  modules: WeeklyModule[];
}

export function WeeklySchedule({ modules }: WeeklyScheduleProps) {
  if (!modules?.length) return null;

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {modules.map((module) => (
          <AccordionItem
            key={module.week}
            value={`week-${module.week}`}
            className="border border-border/40 rounded-xl bg-card px-0 overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 hover:no-underline group transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-left w-full pr-4">
                <Badge
                  variant="outline"
                  className="w-20 justify-center shrink-0 bg-muted/50"
                >
                  Week {module.week}
                </Badge>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {module.title}
                  </h4>
                  {module.description && (
                    <p className="text-sm text-muted-foreground mt-1 font-normal">
                      {module.description}
                    </p>
                  )}
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="pk-0">
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/40 border-t border-border/40">
                {/* Theory Column */}
                <div className="p-6 space-y-4 bg-muted/5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider">
                    <BookOpen className="w-4 h-4" />
                    Theory Session
                  </div>
                  {module.theory ? (
                    <div className="space-y-4">
                      <p className="text-sm text-foreground/80 font-medium">
                        {module.theory.topic}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {module.theory.slides && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-8 text-xs bg-background"
                          >
                            <a
                              href={module.theory.slides}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FileText className="w-3.5 h-3.5 mr-2" />
                              Slides
                            </a>
                          </Button>
                        )}
                        {module.theory.recording && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-8 text-xs bg-background"
                          >
                            <a
                              href={module.theory.recording}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Video className="w-3.5 h-3.5 mr-2" />
                              Recording
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No theory content scheduled.
                    </p>
                  )}
                </div>

                {/* Lab Column */}
                <div className="p-6 space-y-4 bg-muted/10">
                  <div className="flex items-center gap-2 text-sm font-semibold text-secondary-foreground uppercase tracking-wider">
                    <Code2 className="w-4 h-4" />
                    Lab Session
                  </div>
                  {module.lab ? (
                    <div className="space-y-4">
                      <p className="text-sm text-foreground/80 font-medium">
                        {module.lab.topic}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {module.lab.task && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-8 text-xs bg-background"
                          >
                            <a
                              href={module.lab.task}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <MonitorPlay className="w-3.5 h-3.5 mr-2" />
                              View Task
                            </a>
                          </Button>
                        )}
                        {module.lab.repo && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-8 text-xs bg-background"
                          >
                            <a
                              href={module.lab.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="w-3.5 h-3.5 mr-2" />
                              Repository
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No lab content scheduled.
                    </p>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
