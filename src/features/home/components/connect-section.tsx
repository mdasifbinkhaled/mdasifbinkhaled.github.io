import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { siteConfig } from '@/shared/config';
import Link from 'next/link';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  BookUser,
  Globe,
  Award,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';

/**
 * Social link color variants
 * Uses static Tailwind classes to ensure proper purging at build time
 */
type ColorVariant =
  | 'blue'
  | 'teal'
  | 'green'
  | 'purple'
  | 'indigo'
  | 'rose'
  | 'primary';

/**
 * Static color class mappings
 * IMPORTANT: These must be complete class strings for Tailwind to detect them
 */
const colorClasses: Record<
  ColorVariant,
  { bg: string; bgHover: string; text: string }
> = {
  blue: {
    bg: 'bg-blue-500/10',
    bgHover: 'group-hover:bg-blue-500/20',
    text: 'text-blue-500',
  },
  teal: {
    bg: 'bg-teal-500/10',
    bgHover: 'group-hover:bg-teal-500/20',
    text: 'text-teal-500',
  },
  green: {
    bg: 'bg-green-600/10',
    bgHover: 'group-hover:bg-green-600/20',
    text: 'text-green-600',
  },
  purple: {
    bg: 'bg-purple-500/10',
    bgHover: 'group-hover:bg-purple-500/20',
    text: 'text-purple-500',
  },
  indigo: {
    bg: 'bg-indigo-500/10',
    bgHover: 'group-hover:bg-indigo-500/20',
    text: 'text-indigo-500',
  },
  rose: {
    bg: 'bg-rose-500/10',
    bgHover: 'group-hover:bg-rose-500/20',
    text: 'text-rose-500',
  },
  primary: {
    bg: 'bg-primary/10',
    bgHover: 'group-hover:bg-primary/20',
    text: 'text-primary',
  },
};

interface SocialLink {
  id: string;
  name: string;
  href: string;
  icon: LucideIcon;
  colorVariant: ColorVariant;
  isExternal: boolean;
}

/**
 * Social links configuration
 * Centralized data for all connect section links
 */
const socialLinks: SocialLink[] = [
  {
    id: 'google-scholar',
    name: 'Google Scholar',
    href: siteConfig.links.googleScholar,
    icon: BookUser,
    colorVariant: 'blue',
    isExternal: true,
  },
  {
    id: 'researchgate',
    name: 'ResearchGate',
    href: siteConfig.links.researchGate,
    icon: Globe,
    colorVariant: 'teal',
    isExternal: true,
  },
  {
    id: 'orcid',
    name: 'ORCID',
    href: siteConfig.links.orcid,
    icon: Award,
    colorVariant: 'green',
    isExternal: true,
  },
  {
    id: 'github',
    name: 'GitHub',
    href: siteConfig.links.github,
    icon: Github,
    colorVariant: 'purple',
    isExternal: true,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: siteConfig.links.linkedin,
    icon: Linkedin,
    colorVariant: 'indigo',
    isExternal: true,
  },
  {
    id: 'email',
    name: 'Email',
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    colorVariant: 'rose',
    isExternal: false,
  },
];

/**
 * Connect Section Component
 * Displays social links and contact CTA - World-class design
 */
export function ConnectSection() {
  return (
    <section className="w-full py-12 md:py-16 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
      <div className="absolute top-0 right-1/4 w-56 h-56 bg-secondary/10 rounded-full blur-2xl" />

      <div className="container-responsive relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Connect & Collaborate
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interested in collaboration, discussing research opportunities, or
            learning more about my work? Let&apos;s connect!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            const colors = colorClasses[link.colorVariant];

            return (
              <Card
                key={link.id}
                className="text-center border-0 bg-background/60 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <a
                    href={link.href}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div
                      className={cn(
                        'p-4 rounded-2xl transition-all duration-300',
                        colors.bg,
                        colors.bgHover
                      )}
                    >
                      <Icon className={cn('w-7 h-7', colors.text)} />
                    </div>
                    <span className="font-semibold text-sm">{link.name}</span>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Button
            asChild
            size="lg"
            className="shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            <Link href="/contact">
              Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
