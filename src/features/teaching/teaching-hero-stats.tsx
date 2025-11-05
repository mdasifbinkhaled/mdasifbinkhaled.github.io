'use client';

import { Card, CardContent } from '@/shared/components/ui/card';
import { GraduationCap, Users, Star, Calendar } from 'lucide-react';

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
}

function StatCard({
  icon: Icon,
  label,
  value,
  suffix = '',
  decimals = 0,
}: StatCardProps) {
  return (
    <Card className="text-center transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-[var(--space-card-md)]">
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </p>
          <div className="text-3xl font-bold text-primary">
            {decimals > 0 ? value.toFixed(decimals) : value}
            <span className="text-xl">{suffix}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface TeachingHeroStatsProps {
  totalStudents: number;
  totalCourses: number;
  averageRating: number;
  yearsTeaching: number;
}

export function TeachingHeroStats({
  totalStudents,
  totalCourses,
  averageRating,
  yearsTeaching,
}: TeachingHeroStatsProps) {
  return (
    <section className="w-full" aria-labelledby="teaching-stats-heading">
      <h2 id="teaching-stats-heading" className="sr-only">
        Teaching Statistics
      </h2>

      {/* Stats Grid */}
      <div className="grid gap-[var(--space-md)] grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Students Taught"
          value={totalStudents}
          suffix="+"
        />
        <StatCard
          icon={GraduationCap}
          label="Courses Delivered"
          value={totalCourses}
          suffix="+"
        />
        <StatCard
          icon={Star}
          label="Average Rating"
          value={averageRating}
          suffix="/5.0"
          decimals={1}
        />
        <StatCard
          icon={Calendar}
          label="Years Teaching"
          value={yearsTeaching}
          suffix="+"
        />
      </div>
    </section>
  );
}
