import type { Metadata } from 'next';
import { Suspense } from 'react';
import { siteConfig } from '@/shared/config/site';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import TeachingTabsClient from './teaching-tabs.client';
import {
  coursesTaughtIUB,
  coursesTaughtBRACU,
} from '@/shared/lib/data/courses';
import { getTeachingStats } from '@/shared/lib/data/teaching-stats';
import { Users, BookOpen, Star, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Teaching',
  description: `${siteConfig.author}'s teaching portfolio, courses taught at IUB and BRACU, and teaching philosophy.`,
};

export default function TeachingPage() {
  const stats = getTeachingStats();

  return (
    <div className="space-y-12">
      <Breadcrumbs />

      {/* Clean Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Teaching Portfolio</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          As a {siteConfig.role} at {siteConfig.institution}, I teach computer
          science fundamentals, algorithms, and system design with a focus on
          practical, outcome-based learning.
        </p>

        {/* Compact Stats Bar */}
        <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>
              <strong className="text-foreground">
                {stats.totalStudents}+
              </strong>{' '}
              students taught
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="w-4 h-4 text-primary" />
            <span>
              <strong className="text-foreground">{stats.totalCourses}</strong>{' '}
              courses
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>
              <strong className="text-foreground">{stats.averageRating}</strong>
              /5.0 avg rating
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>
              <strong className="text-foreground">
                {stats.yearsTeaching}+
              </strong>{' '}
              years experience
            </span>
          </div>
        </div>
      </section>

      {/* Courses Section - Main Content */}
      <section id="courses-taught" aria-labelledby="courses-heading">
        <h2 id="courses-heading" className="text-2xl font-semibold mb-6">
          Courses Taught
        </h2>
        <Suspense
          fallback={
            <div className="text-center text-muted-foreground py-8">
              Loading courses...
            </div>
          }
        >
          <TeachingTabsClient
            coursesTaughtIUB={coursesTaughtIUB}
            coursesTaughtBRACU={coursesTaughtBRACU}
          />
        </Suspense>
      </section>
    </div>
  );
}
