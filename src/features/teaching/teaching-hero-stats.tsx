import { StatCard } from '@/shared/components/common/stat-card';
import { TeachingTrendChart } from '@/features/teaching/teaching-trend-chart';
import { Users, BookOpen, Calculator, Award } from 'lucide-react';
import { getGlobalAverageRating } from '@/shared/lib/data/evaluations';
import {
  getTotalStudents,
  getTotalCourses,
} from '@/shared/lib/data/teaching-stats';

/**
 * TeachingHeroStats Component
 * Displays key teaching statistics in a grid layout
 * Uses the shared StatCard component with compact variant
 */
export function TeachingHeroStats() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
      {/* Left Column: Key Stats */}
      <div className="lg:col-span-2 grid grid-cols-2 gap-4">
        <StatCard
          number={getTotalStudents()}
          suffix="+"
          label="Students Mentored"
          icon={Users}
          description="Across IUB & BRACU"
          variant="glass"
        />
        <StatCard
          number={getGlobalAverageRating()}
          suffix="/5.0"
          decimals={2}
          label="Average Rating"
          icon={Award}
          description="Consistent high performance"
          variant="glass"
        />
        <StatCard
          number={getTotalCourses()}
          suffix="+"
          label="Courses Taught"
          icon={BookOpen}
          description="Theory & Lab Sections"
          variant="glass"
        />
        <StatCard
          number={95}
          suffix="%"
          label="Pass Rate"
          icon={Calculator}
          description="Average success rate"
          variant="glass"
        />
      </div>

      {/* Right Column: Trend Chart */}
      <div className="lg:col-span-1 h-full">
        <TeachingTrendChart />
      </div>
    </div>
  );
}
