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
 * Uses the shared StatCard component with glass variant
 */
export function TeachingHeroStats({
  totalStudents,
  totalCourses,
  averageRating,
  yearsTeaching,
}: TeachingHeroStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        icon={Users}
        label="Students Mentored"
        number={totalStudents}
        suffix="+"
        variant="glass"
      />
      <StatCard
        icon={GraduationCap}
        label="Courses Taught"
        number={totalCourses}
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
  );
}
