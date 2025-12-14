import { StatCard } from '@/shared/components/common/stat-card';
import { GraduationCap, Users, Star, Calendar } from 'lucide-react';

interface TeachingHeroStatsProps {
  totalStudents: number;
  totalCourses: number;
  averageRating: number;
  yearsTeaching: number;
}

/**
 * TeachingHeroStats Component
 * Displays key teaching statistics in a grid layout
 * Uses the shared StatCard component with compact variant
 */
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
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Students Taught"
          number={totalStudents}
          suffix="+"
          variant="glass"
        />
        <StatCard
          icon={GraduationCap}
          label="Courses Delivered"
          number={totalCourses}
          suffix="+"
          variant="glass"
        />
        <StatCard
          icon={Star}
          label="Average Rating"
          number={averageRating}
          suffix="/5.0"
          decimals={1}
          variant="glass"
        />
        <StatCard
          icon={Calendar}
          label="Years Teaching"
          number={yearsTeaching}
          suffix="+"
          variant="glass"
        />
      </div>
    </section>
  );
}
