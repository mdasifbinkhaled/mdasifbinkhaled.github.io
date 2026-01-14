import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Target,
  Users,
  Award,
  BookOpen,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';
import { siteConfig } from '@/shared/config/site';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import {
  coursesTaughtIUB,
  coursesTaughtBRACU,
} from '@/shared/lib/data/courses';
import { getTeachingStats } from '@/shared/lib/data/teaching-stats';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { CourseCard } from '@/features/teaching/course-card';

export const metadata: Metadata = {
  title: 'Teaching',
  description: `${siteConfig.author}'s teaching portfolio, course details, teaching philosophy, and student mentorship at IUB and BRACU.`,
};

export default function TeachingPage() {
  // Get teaching stats from centralized data source
  const stats = getTeachingStats();

  return (
    <div className="space-y-20">
      <Breadcrumbs />

      {/* Hero Section - Aligned with Research/Publications */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <BookOpen className="h-4 w-4" />
          <span>Teaching Portfolio</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-gradient">
          Inspiring the Next Generation
        </h1>

        <p className="text-xl md:text-2xl text-foreground font-medium max-w-4xl mx-auto">
          As a {siteConfig.role} at {siteConfig.institution}, I specialize in
          computer science fundamentals, algorithms, and system design.
        </p>

        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          My approach combines theoretical depth with practical application,
          bridging the gap between academic concepts and industry requirements.
        </p>

        {/* Inline Quick Stats - Consistent with Research Page */}
        <div className="flex flex-wrap justify-center gap-8 pt-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {stats.totalStudents}+
            </div>
            <div className="text-sm text-muted-foreground">
              Students Mentored
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {stats.totalCourses}
            </div>
            <div className="text-sm text-muted-foreground">Courses Taught</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {stats.yearsTeaching}+
            </div>
            <div className="text-sm text-muted-foreground">
              Years Experience
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {stats.averageRating}/5.0
            </div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy - Standard Cards like Research Areas */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Philosophy & Approach
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My teaching methodology fosters critical thinking and practical
            problem-solving skills
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Pillar 1 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">Hands-On Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Bridging theory and industry practice through real-world
                projects, interactive coding sessions, and practical
                applications.
              </p>
            </CardContent>
          </Card>

          {/* Pillar 2 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">Outcome-Based</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Structuring courses with clear learning objectives, measurable
                outcomes, and continuous assessment aligned with international
                OBE standards.
              </p>
            </CardContent>
          </Card>

          {/* Pillar 3 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Award className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">Student Success</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Fostering potential through personalized mentorship, career
                guidance, and building confidence to tackle complex technical
                challenges.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Courses Sections - Grouped by Institution */}
      <section id="courses">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Courses Taught
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive curriculum delivered across leading institutions
          </p>
        </div>

        <div className="space-y-16">
          {/* IUB Courses */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h3 className="text-2xl font-bold">
                Independent University, Bangladesh (IUB)
              </h3>
              <Badge variant="secondary" className="ml-2">
                {coursesTaughtIUB.length} Courses
              </Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {coursesTaughtIUB.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  variant="static" // Use static variant for cleaner look
                  showDetails={false}
                />
              ))}
            </div>
          </div>

          {/* BRACU Courses */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h3 className="text-2xl font-bold">BRAC University (BRACU)</h3>
              <Badge variant="secondary" className="ml-2">
                {coursesTaughtBRACU.length} Courses
              </Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {coursesTaughtBRACU.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  variant="static"
                  showDetails={false}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Consistent with other pages */}
      <section className="text-center space-y-6 py-12">
        <h2 className="text-2xl font-bold">Interested in Collaboration?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          I am always open to discussing new educational initiatives, research
          collaborations, or mentorship opportunities.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/research">View Research</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
