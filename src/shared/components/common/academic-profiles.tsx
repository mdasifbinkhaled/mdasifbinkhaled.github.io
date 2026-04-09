/**
 * ACADEMIC PROFILES COMPONENT
 *
 * Displays academic profile links in a clean, modular way
 * Reads from central researcher-profile configuration
 */

import Link from 'next/link';
import {
  GraduationCap,
  Award,
  Network,
  BookOpen,
  Database,
  Globe,
  Github,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { academicProfiles } from '@/shared/lib/data/researcher-profile';

const iconMap = {
  GraduationCap,
  Award,
  Network,
  BookOpen,
  Database,
  Globe,
  Github,
};

interface AcademicProfilesProps {
  /**
   * Show only primary profiles
   */
  primaryOnly?: boolean;
  /**
   * Display variant
   */
  variant?: 'horizontal' | 'vertical' | 'grid';
  /**
   * Show labels
   */
  showLabels?: boolean;
  /**
   * Custom className
   */
  className?: string;
}

export function AcademicProfiles({
  primaryOnly = false,
  variant = 'horizontal',
  showLabels = true,
  className = '',
}: AcademicProfilesProps) {
  const profiles = primaryOnly
    ? academicProfiles.profiles.filter(
        (p) => p.primary && !('placeholder' in p)
      )
    : academicProfiles.profiles.filter((p) => !('placeholder' in p));

  const variantClasses = {
    horizontal: 'flex flex-row flex-wrap gap-4',
    vertical: 'flex flex-col gap-3',
    grid: 'grid grid-cols-2 md:grid-cols-3 gap-4',
  };

  return (
    <div className={cn(variantClasses[variant], className)}>
      {profiles.map((profile) => {
        const Icon = iconMap[profile.icon as keyof typeof iconMap];

        return (
          <Link
            key={profile.platform}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent/50 hover:border-primary/50 transition-all duration-300 hover:shadow-md"
            aria-label={`${profile.platform} Profile`}
          >
            {Icon && (
              <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
            )}
            {showLabels && (
              <span className="text-sm font-medium">{profile.platform}</span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
