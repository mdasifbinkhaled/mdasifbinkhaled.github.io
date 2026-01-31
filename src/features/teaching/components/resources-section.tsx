import {
  Globe,
  Video,
  FileText,
  Code2,
  BookOpenText,
  ExternalLink,
  Presentation,
} from 'lucide-react';
import { CollapsibleSection } from '@/shared/components/ui/collapsible-section';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import type { CourseData } from '@/shared/types';
import { Icon } from '@/shared/components/common/icons';

// Helper for resource section icons
function getSectionIcon(title: string): React.ElementType {
  if (title.includes('Tool') || title.includes('Tech')) return Code2;
  if (title.includes('Note')) return BookOpenText;
  if (title.includes('Code')) return Code2;
  if (title.includes('Slide')) return Presentation;
  if (title.includes('Ref')) return Globe;
  return FileText;
}

export function ResourcesSection({ course }: { course: CourseData }) {
  const videoSection = course.resourceSections?.find((r) =>
    r.title.includes('Video')
  );
  const toolSections =
    course.resourceSections?.filter((r) => !r.title.includes('Video')) || [];

  // Check if we have anything to show
  const hasContent = videoSection || toolSections.length > 0;

  if (!hasContent) return null;

  return (
    <CollapsibleSection
      title="Resources & Tools"
      icon={Globe}
      defaultOpen={false}
    >
      <div className="p-6 space-y-8">
        {/* 1. Technologies & Assignments Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {toolSections.map((section, idx) => {
            const SectionIcon = getSectionIcon(section.title);

            return (
              <Card
                key={idx}
                className="border-border/40 shadow-sm hover:shadow-md transition-all"
              >
                <div className="p-4 border-b bg-muted/10 flex items-center gap-3">
                  <div className="p-2 bg-background rounded-lg border shadow-sm">
                    <SectionIcon className="w-5 h-5 text-foreground" />
                  </div>
                  <h4 className="font-semibold">{section.title}</h4>
                </div>
                <CardContent className="p-4 pt-6">
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start justify-between group"
                      >
                        <div className="flex items-center gap-2.5">
                          {item.icon ? (
                            <Icon
                              name={item.icon}
                              className="w-4 h-4 text-muted-foreground"
                            />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5" />
                          )}
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">
                            {item.label}
                          </span>
                        </div>
                        {item.url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <a href={item.url} target="_blank" rel="noreferrer">
                              <ExternalLink className="w-3 h-3 text-muted-foreground" />
                            </a>
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 2. Video Resources (Full Width) */}
        {videoSection && (
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-muted/10 flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg border shadow-sm text-red-600 dark:text-red-400">
                <Video className="w-5 h-5" />
              </div>
              <h4 className="font-semibold">{videoSection.title}</h4>
              <Badge variant="outline" className="ml-auto">
                {videoSection.items.length} Videos
              </Badge>
            </div>
            <div className="divide-y divide-border/40">
              {videoSection.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 flex items-center justify-between hover:bg-muted/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                      <Video className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  {item.url ? (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="text-xs h-8"
                    >
                      <a href={item.url} target="_blank" rel="noreferrer">
                        Watch
                        <ExternalLink className="w-3 h-3 ml-2 opacity-50" />
                      </a>
                    </Button>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      Coming Soon
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </CollapsibleSection>
  );
}
