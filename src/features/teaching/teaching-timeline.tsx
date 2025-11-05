'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  GraduationCap,
  Users,
  Presentation,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  institution: string;
  type: 'position' | 'milestone' | 'workshop' | 'achievement';
  description?: string[];
  icon: React.ElementType;
  current?: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 'senior-lecturer',
    date: 'Feb 2023',
    title: 'Senior Lecturer',
    institution: 'Independent University, Bangladesh (IUB)',
    type: 'position',
    description: [
      'Promoted to Senior Lecturer',
      'Teaching advanced courses: Algorithms, Finite Automata',
      'Research supervision with 4.32/5 avg evaluation',
      'LFE Program Coordinator (4 times)',
    ],
    icon: GraduationCap,
    current: true,
  },
  {
    id: 'python-workshop-2024',
    date: 'Spring 2024',
    title: 'Python Automation Workshop',
    institution: 'Independent University, Bangladesh (IUB)',
    type: 'workshop',
    description: [
      'Conducted hands-on workshops on Python automation techniques',
    ],
    icon: Presentation,
  },
  {
    id: 'sar-workshop',
    date: 'Oct 2024',
    title: 'SAR Preparation Workshop',
    institution: 'IUB - IQAC',
    type: 'workshop',
    description: ['Participated in BAC Accreditation workshop'],
    icon: Award,
  },
  {
    id: 'python-workshop-2023',
    date: 'Autumn 2023',
    title: 'Python Automation Workshop',
    institution: 'Independent University, Bangladesh (IUB)',
    type: 'workshop',
    description: ['Conducted hands-on workshops on Python automation'],
    icon: Presentation,
  },
  {
    id: 'lecturer-iub',
    date: 'Jan 2019',
    title: 'Lecturer',
    institution: 'Independent University, Bangladesh (IUB)',
    type: 'position',
    description: [
      'Taught: Data Structures, Discrete Math, Numerical Methods',
      'Developed OBE course outlines',
      'Conducted lectures, tutorials, and labs',
    ],
    icon: GraduationCap,
  },
  {
    id: 'adjunct-bracu',
    date: 'Sep 2017',
    title: 'Adjunct Lecturer',
    institution: 'BRAC University',
    type: 'position',
    description: [
      'Lab courses: Computer Graphics, Compiler Design, Android Development',
      'Developed lesson plans and assessments',
    ],
    icon: GraduationCap,
  },
  {
    id: 'grad-ta-iub',
    date: 'May 2017',
    title: 'Graduate Teaching Assistant',
    institution: 'Independent University, Bangladesh (IUB)',
    type: 'position',
    description: [
      'Academic support to student groups',
      'Course material guidance',
    ],
    icon: Users,
  },
  {
    id: 'undergrad-ta-bracu',
    date: 'May 2015',
    title: 'Undergraduate Teaching Assistant',
    institution: 'BRAC University',
    type: 'position',
    description: [
      '6 appointments for Java OOP courses',
      'Student mentoring and feedback',
    ],
    icon: Users,
  },
];

const typeColors = {
  position: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  milestone:
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  workshop:
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  achievement:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
};

function TimelineEventCard({ event }: { event: TimelineEvent }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = event.icon;

  return (
    <Card className="transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-[var(--space-md)]">
          <div className="flex items-start gap-[var(--space-md)] flex-1">
            <div className="bg-primary/10 p-2 rounded-full mt-1">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <CardTitle className="text-lg">{event.title}</CardTitle>
                {event.current && (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Current
                  </Badge>
                )}
              </div>
              <CardDescription className="space-y-1">
                <div className="font-medium">{event.institution}</div>
                <div className="text-sm">{event.date}</div>
              </CardDescription>
            </div>
          </div>
          <Badge className={typeColors[event.type]} variant="outline">
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      {event.description && event.description.length > 0 && (
        <>
          <CardContent className="pt-0">
            <ul className="text-sm text-muted-foreground space-y-1">
              {event.description
                .slice(0, expanded ? undefined : 2)
                .map((desc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {desc}
                  </li>
                ))}
            </ul>
            {event.description.length > 2 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(!expanded)}
                className="h-auto p-0 mt-2 text-xs text-primary hover:text-primary/80"
              >
                {expanded ? (
                  <>
                    Show Less <ChevronUp className="w-3 h-3 ml-1" />
                  </>
                ) : (
                  <>
                    Show More <ChevronDown className="w-3 h-3 ml-1" />
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
}

export function TeachingTimeline() {
  return (
    <section className="w-full" aria-labelledby="teaching-timeline-heading">
      <h2
        id="teaching-timeline-heading"
        className="text-2xl font-bold text-center mb-[var(--space-card-lg)] text-primary"
      >
        Teaching Journey
      </h2>
      <div className="space-y-[var(--space-md)]">
        {timelineEvents.map((event) => (
          <TimelineEventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
