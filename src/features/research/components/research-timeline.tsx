import { researchData } from '@/shared/lib/data/research';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Icon, type IconName } from '@/shared/components/common/icons';

export function ResearchTimeline() {
  const { timeline } = researchData;

  if (!timeline) return null;

  return (
    <div className="relative border-l border-primary/20 ml-4 md:ml-6 space-y-12">
      {timeline.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          className="relative pl-8 md:pl-12 group"
        >
          {/* Timeline Node Connector */}
          <div className="absolute -left-3.5 flex items-center justify-center w-7 h-7 rounded-full bg-background border-2 border-primary/30 group-hover:border-primary transition-colors duration-300">
            <div className="w-2.5 h-2.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-300" />
          </div>

          <Card className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-border/50 bg-card/50 backdrop-blur-xs">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold tracking-wider text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full w-fit">
                      {item.year}
                    </span>
                    <Badge
                      variant={item.type === 'grant' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      {item.type}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold font-heading tracking-tight flex items-center gap-2 group-hover:text-primary transition-colors">
                    {item.icon && (
                      <Icon
                        name={item.icon as IconName}
                        className="h-5 w-5 opacity-70"
                      />
                    )}
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
