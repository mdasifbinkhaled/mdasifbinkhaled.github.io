import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Video, FileText, MonitorPlay, Github } from 'lucide-react';

// cn unused

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

interface SyllabusTableProps {
  modules: WeeklyModule[];
}

export function SyllabusTable({ modules }: SyllabusTableProps) {
  if (!modules?.length) return null;

  return (
    <div className="rounded-md border border-border/40 overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px]">Week</TableHead>
            <TableHead className="min-w-[200px]">Module / Topic</TableHead>
            <TableHead className="min-w-[250px] hidden md:table-cell">
              Theory Details
            </TableHead>
            <TableHead className="min-w-[250px] hidden md:table-cell">
              Lab Activity
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {modules.map((module) => (
            <TableRow key={module.week} className="hover:bg-muted/5 group">
              {/* Week Column */}
              <TableCell className="align-top font-medium">
                <Badge variant="outline" className="bg-background">
                  Week {module.week}
                </Badge>
                {/* Mobile View: Theory/Lab showed stacked */}
                <div className="md:hidden mt-2 space-y-2">
                  {module.theory && (
                    <div className="text-xs text-muted-foreground">
                      <strong className="text-primary block mb-1">
                        Theory:
                      </strong>
                      {module.theory.topic}
                    </div>
                  )}
                  {module.lab && (
                    <div className="text-xs text-muted-foreground">
                      <strong className="text-secondary-foreground block mb-1">
                        Lab:
                      </strong>
                      {module.lab.topic}
                    </div>
                  )}
                </div>
              </TableCell>

              {/* Module Title Column */}
              <TableCell className="align-top">
                <div className="font-semibold text-foreground">
                  {module.title}
                </div>
                {module.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {module.description}
                  </p>
                )}
              </TableCell>

              {/* Theory Details (Desktop) */}
              <TableCell className="align-top hidden md:table-cell">
                {module.theory ? (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground/80">
                      {module.theory.topic}
                    </div>
                    {/* Theory Links */}
                    {(module.theory.slides || module.theory.recording) && (
                      <div className="flex flex-wrap gap-2">
                        {module.theory.slides && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-7 text-xs px-2 bg-background hover:bg-muted"
                          >
                            <a
                              href={module.theory.slides}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FileText className="w-3 h-3 mr-1.5" />
                              Slides
                            </a>
                          </Button>
                        )}
                        {module.theory.recording && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-7 text-xs px-2 bg-background hover:bg-muted"
                          >
                            <a
                              href={module.theory.recording}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Video className="w-3 h-3 mr-1.5" />
                              Rec
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-muted-foreground/40 text-sm italic">
                    -
                  </span>
                )}
              </TableCell>

              {/* Lab Activity (Desktop) */}
              <TableCell className="align-top hidden md:table-cell bg-muted/5 group-hover:bg-muted/10 transition-colors">
                {module.lab ? (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground/80">
                      {module.lab.topic}
                    </div>
                    {/* Lab Links */}
                    {(module.lab.task || module.lab.repo) && (
                      <div className="flex flex-wrap gap-2">
                        {module.lab.task && (
                          <Button
                            variant="secondary"
                            size="sm"
                            asChild
                            className="h-7 text-xs px-2 bg-background border border-border/50 hover:bg-background/80"
                          >
                            <a
                              href={module.lab.task}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <MonitorPlay className="w-3 h-3 mr-1.5 text-primary/70" />
                              Task
                            </a>
                          </Button>
                        )}
                        {module.lab.repo && (
                          <Button
                            variant="secondary"
                            size="sm"
                            asChild
                            className="h-7 text-xs px-2 bg-background border border-border/50 hover:bg-background/80"
                          >
                            <a
                              href={module.lab.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="w-3 h-3 mr-1.5 text-foreground/70" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-muted-foreground/40 text-sm italic">
                    -
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
