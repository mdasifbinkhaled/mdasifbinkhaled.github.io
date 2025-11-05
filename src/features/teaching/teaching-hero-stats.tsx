'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import {
  GraduationCap,
  Users,
  Star,
  Calendar,
  Award,
  BookOpen,
} from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  description?: string;
  highlight?: boolean;
}

function StatCard({
  icon: Icon,
  label,
  value,
  suffix = '',
  decimals = 0,
  description,
  highlight = false,
}: StatCardProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <Card
      ref={cardRef}
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        highlight
          ? 'border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10'
          : ''
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardHeader className="relative pb-2">
        <div className="flex items-center justify-between">
          <div
            className={`p-3 rounded-xl ${highlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'} transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon className="h-6 w-6" />
          </div>
          {highlight && (
            <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </p>
          <div className="text-4xl font-bold bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent">
            {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
            <span className="text-2xl">{suffix}</span>
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
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
      {/* Hero Header */}
      <div className="text-center mb-[var(--space-card-lg)] max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Award className="w-4 h-4" />
          <span>Teaching Excellence</span>
        </div>
        <h2
          id="teaching-stats-heading"
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
        >
          Empowering the Next Generation
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Dedicated to fostering academic excellence and practical skills
          through innovative teaching methodologies and personalized mentorship.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-[var(--space-md)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Students Taught"
          value={totalStudents}
          suffix="+"
          description="Across multiple courses and institutions"
        />
        <StatCard
          icon={GraduationCap}
          label="Courses Delivered"
          value={totalCourses}
          suffix="+"
          description="From fundamentals to advanced topics"
          highlight
        />
        <StatCard
          icon={Star}
          label="Average Rating"
          value={averageRating}
          suffix="/5.0"
          decimals={1}
          description="Based on student feedback"
          highlight
        />
        <StatCard
          icon={Calendar}
          label="Years Teaching"
          value={yearsTeaching}
          suffix="+"
          description="Since May 2015"
        />
      </div>

      {/* Philosophy Quote */}
      <div className="mt-[var(--space-card-lg)] max-w-4xl mx-auto">
        <Card className="border-l-4 border-l-primary bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-[var(--space-card-lg)]">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <p className="text-lg italic text-muted-foreground mb-2">
                  &ldquo;Education is not the filling of a pail, but the
                  lighting of a fire.&rdquo;
                </p>
                <p className="text-sm font-medium text-foreground">
                  My teaching philosophy centers on igniting curiosity and
                  building practical problem-solving skills that last a
                  lifetime.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
