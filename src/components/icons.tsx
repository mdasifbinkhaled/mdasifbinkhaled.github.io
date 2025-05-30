// @/components/icons.tsx
"use client"; // Ensure this can be used in other client components

import React from 'react';
import {
  Home,
  UserCircle,
  Briefcase,
  BookOpenText,
  Rss,
  Cpu,
  Award,
  Send,
  type LucideProps,
  type LucideIcon as LucideIconType // Renamed to avoid conflict with component name
} from 'lucide-react';

// Define the IconName type based on the keys of iconComponents
export type IconName = keyof typeof iconComponents;

const iconComponents = {
  Home,
  UserCircle,
  Briefcase,
  BookOpenText,
  Rss,
  Cpu,
  Award,
  Send,
};

interface IconComponentProps extends LucideProps {
  name?: IconName; // Use the IconName type
}

export const Icon: React.FC<IconComponentProps> = ({ name, className, ...props }) => {
  if (!name) {
    return null;
  }
  const LucideComponent = iconComponents[name];

  if (!LucideComponent) {
    console.warn(`Icon "${name}" not found.`);
    return null; // Or a default fallback icon
  }

  return <LucideComponent className={className} {...props} />;
};
