'use client';

import { MessageCircle } from 'lucide-react';
import type { CourseData } from '@/shared/types';
import { Card, CardContent } from '@/shared/components/ui/card';

// Modular Components
import { CourseHero } from '@/features/teaching/components/course-hero';
import { NoticeBoard } from '@/features/teaching/components/notice-board';
import { CollapsibleSection } from '@/shared/components/ui/collapsible-section';
import { OverviewSection } from '@/features/teaching/components/overview-section';
import { ScheduleSection } from '@/features/teaching/components/schedule-section';
import { SyllabusSection } from '@/features/teaching/components/syllabus-section';
import { ResourcesSection } from '@/features/teaching/components/resources-section';
import { AssignmentsSection } from '@/features/teaching/components/assignments-section';

interface CoursePageLayoutProps {
  course: CourseData;
}

// -----------------------------------------------------------------------------
// UI Helpers
// -----------------------------------------------------------------------------
function CourseSectionDivider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  );
}

// -----------------------------------------------------------------------------
// Feedback Tab - Student Testimonials (Hidden if empty, simplified)
// -----------------------------------------------------------------------------
function FeedbackSection({ course }: { course: CourseData }) {
  if (!course.feedback || course.feedback.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {course.feedback.map((fb, idx) => (
        <Card key={idx} className="border-border/40 bg-muted/20">
          <CardContent className="p-6">
            <p className="text-sm text-foreground/80 italic leading-relaxed">
              &ldquo;{fb}&rdquo;
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// =============================================================================
// MAIN LAYOUT
// =============================================================================
export function CoursePageLayout({ course }: CoursePageLayoutProps) {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <CourseHero course={course} />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        {/* Notice Board Section (Always Open) */}
        {course.status === 'ongoing' && course.notices && (
          <CollapsibleSection
            title="Notice Board"
            icon={MessageCircle}
            defaultOpen={true}
          >
            <div className="p-6">
              <NoticeBoard notices={course.notices} />
            </div>
          </CollapsibleSection>
        )}

        {/* Section Divider */}
        <CourseSectionDivider />

        {/* Overview Section */}
        <OverviewSection course={course} />

        {/* Section Divider */}
        <CourseSectionDivider />

        {/* Schedule Section - Separated & First */}
        <ScheduleSection course={course} />

        {/* Section Divider */}
        <CourseSectionDivider />

        {/* Syllabus Section - Now Curriculum Only */}
        <SyllabusSection course={course} />

        {/* Section Divider */}
        <CourseSectionDivider />

        {/* Assignments Section */}
        <AssignmentsSection course={course} />

        {/* Section Divider */}
        <CourseSectionDivider />

        {/* Resources Section */}
        <ResourcesSection course={course} />

        {/* Feedback Section - If any */}
        {(course.feedback?.length ?? 0) > 0 && (
          <CollapsibleSection
            title="Student Feedback"
            icon={MessageCircle}
            defaultOpen={false}
          >
            <div className="p-6">
              <FeedbackSection course={course} />
            </div>
          </CollapsibleSection>
        )}
      </div>
    </div>
  );
}
