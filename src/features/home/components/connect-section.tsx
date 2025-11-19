import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { siteConfig } from '@/shared/config';
import Link from 'next/link';
import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  BookUser,
  Globe,
  Award,
} from 'lucide-react';

/**
 * Connect Section Component
 * Displays social links and contact CTA
 */
export function ConnectSection() {
  const socialLinks = [
    {
      name: 'Google Scholar',
      href: siteConfig.links.googleScholar,
      icon: BookUser,
      color: 'blue-500',
    },
    {
      name: 'ResearchGate',
      href: siteConfig.links.researchGate,
      icon: Globe,
      color: 'teal-500',
    },
    {
      name: 'ORCID',
      href: siteConfig.links.orcid,
      icon: Award,
      color: 'green-600',
    },
    {
      name: 'GitHub',
      href: siteConfig.links.github,
      icon: Github,
      color: 'purple-500',
    },
    {
      name: 'LinkedIn',
      href: siteConfig.links.linkedin,
      icon: Linkedin,
      color: 'indigo-500',
    },
    {
      name: 'Email',
      href: `mailto:${siteConfig.email}`,
      icon: Mail,
      color: 'rose-500',
    },
  ];

  return (
    <section className="w-full py-12 md:py-16">
      <div className="container-responsive">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Connect & Collaborate
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
          Interested in collaboration, discussing research opportunities, or
          learning more about my work? Let&apos;s connect!
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Card
                key={link.name}
                className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6">
                  <a
                    href={link.href}
                    target={link.name !== 'Email' ? '_blank' : undefined}
                    rel={
                      link.name !== 'Email' ? 'noopener noreferrer' : undefined
                    }
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div
                      className={`p-4 bg-${link.color}/10 rounded-full group-hover:bg-${link.color}/20 transition-colors`}
                    >
                      <Icon className={`w-8 h-8 text-${link.color}`} />
                    </div>
                    <span className="font-semibold text-sm">{link.name}</span>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Button asChild size="lg" className="shadow-lg">
            <Link href="/contact">
              Get in Touch <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
