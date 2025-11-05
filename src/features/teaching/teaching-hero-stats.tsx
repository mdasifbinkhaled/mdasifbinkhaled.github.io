'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
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

    const duration = 2000; // 2 seconds
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
      className="transition-all duration-300 hover:shadow-lg hover:scale-105 border-l-4 border-l-primary"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary">
          {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
          {suffix}
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
        Teaching Statistics Overview
      </h2>
      <div className="grid gap-[var(--space-md)] grid-cols-2 md:grid-cols-4">
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
