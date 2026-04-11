import { Users, GraduationCap, ArrowRight, UserCheck } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { mentorshipData } from '@/shared/lib/data/mentorship';

export function MentorshipSection() {
  if (!mentorshipData || mentorshipData.length === 0) return null;

  return (
    <section
      role="region"
      aria-labelledby="mentorship-heading"
      className="py-8"
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <h2
            id="mentorship-heading"
            className="text-3xl font-bold tracking-tight inline-flex items-center gap-3 text-primary"
          >
            <Users className="h-8 w-8" />
            Mentorship & Supervision
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Proud to advise, mentor, and teach incredibly talented students
            through their thesis projects and research endeavors.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mentorshipData.map((student, idx) => (
            <Card
              key={idx}
              className="hover:shadow-md hover:-translate-y-1 transition-all duration-300 border-border/50 hover:border-primary/50 group bg-card/60 backdrop-blur-xs relative overflow-hidden"
            >
              <div
                className={`absolute top-0 right-0 w-2 h-full ${student.status === 'Current' ? 'bg-primary' : 'bg-muted-foreground/30'}`}
              />

              <CardHeader className="pb-3 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge
                    variant={
                      student.status === 'Current' ? 'default' : 'secondary'
                    }
                    className="text-xs"
                  >
                    {student.status}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground font-medium">
                    <GraduationCap className="mr-1 h-3.5 w-3.5" />
                    {student.period}
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center gap-2">
                  <UserCheck className="h-4 w-4 opacity-70" />
                  {student.name}
                </CardTitle>
                <CardDescription className="font-semibold text-foreground/80">
                  {student.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {student.project && (
                  <div className="text-sm text-muted-foreground bg-muted/40 p-3 rounded-md border border-border/50">
                    <span className="font-semibold text-foreground block mb-1 flex items-center">
                      <ArrowRight className="h-3 w-3 mr-1 text-primary" /> Key
                      Project:
                    </span>
                    {student.project}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
