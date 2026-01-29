import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

import { Calendar, MapPin, FileText } from 'lucide-react';

interface ExamInfo {
  date?: string;
  seatPlanUrl?: string;
  syllabus?: string;
}

interface ExamScheduleProps {
  exams: {
    midterm?: ExamInfo;
    final?: ExamInfo;
  };
}

function ExamCard({ title, info }: { title: string; info?: ExamInfo }) {
  if (!info) return null;

  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3 border-b border-border/40 bg-muted/20">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-md">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Date
              </div>
              <div className="font-medium">{info.date || 'TBA'}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-md">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Seat Plan
              </div>
              {info.seatPlanUrl && info.seatPlanUrl !== '#' ? (
                <a
                  href={info.seatPlanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  View Seat Plan
                </a>
              ) : (
                <div className="text-sm text-muted-foreground italic">
                  Not published yet
                </div>
              )}
            </div>
          </div>

          {info.syllabus && (
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-md">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                  Syllabus
                </div>
                <div className="text-sm font-medium">{info.syllabus}</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function ExamSchedule({ exams }: ExamScheduleProps) {
  if (!exams.midterm && !exams.final) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ExamCard title="Midterm Examination" info={exams.midterm} />
      <ExamCard title="Final Examination" info={exams.final} />
    </div>
  );
}
