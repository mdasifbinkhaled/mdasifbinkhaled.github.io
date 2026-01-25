import { StatCard } from '@/shared/components/common/stat-card';
import { GraduationCap, Users, Star, Calendar } from 'lucide-react';

interface TeachingHeroStatsProps {
  totalStudents: number;
  totalCourses: number;
  averageRating: number;
  yearsTeaching: number;
  totalSemesters?: number;
}

/**
 * TeachingHeroStats Component
 * Displays key teaching statistics in a grid layout
 * Uses the shared StatCard component with compact variant
 */
export function TeachingHeroStats(props: TeachingHeroStatsProps) {
  const { totalStudents, totalCourses, averageRating, yearsTeaching } = props;
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
        decimals={2}
        variant="glass"
      />
      <StatCard
        icon={Calendar}
        label="Semesters Taught"
        number={props.totalSemesters || yearsTeaching}
        variant="glass"
      />
    </div>
  );
}
