import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import {
  Mail,
  Github,
  Linkedin,
  BookUser,
  MapPin,
  Phone,
  Lightbulb,
  Heart,
} from 'lucide-react';
import { siteConfig } from '@/shared/config/site';
import {
  researchIdentity,
  availability,
} from '@/shared/config/researcher-profile';
import { AcademicProfiles } from '@/shared/components/academic-profiles';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact Me',
  description: `Get in touch with ${siteConfig.author} for collaborations, PhD opportunities, or inquiries. ${siteConfig.description}`,
};

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <Breadcrumbs />
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Let&apos;s Connect
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          I&apos;m open to collaborations, PhD opportunities, and interesting
          conversations.
        </p>
      </header>

      <section id="contact-info">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Contact Information
            </CardTitle>
            <CardDescription className="text-center mt-2">
              Feel free to reach out for research collaborations or academic
              inquiries.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <Mail className="h-7 w-7 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Email</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-muted-foreground hover:text-primary underline"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <Phone className="h-7 w-7 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Phone</p>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s|\(|\)/g, '')}`}
                  className="text-muted-foreground hover:text-primary underline"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <MapPin className="h-7 w-7 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Location</p>
                <p className="text-muted-foreground">{siteConfig.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <Button variant="outline" asChild className="py-6 text-base">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-5 w-5" /> GitHub
                </a>
              </Button>
              <Button variant="outline" asChild className="py-6 text-base">
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
                </a>
              </Button>
              <Button variant="outline" asChild className="py-6 text-base">
                <a
                  href={siteConfig.links.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BookUser className="mr-2 h-5 w-5" /> Google Scholar
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="research-areas">
        <Card className="max-w-3xl mx-auto shadow-lg border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Lightbulb className="w-6 h-6 text-primary" />
              Research Philosophy & Areas
            </CardTitle>
            <CardDescription className="text-center text-base">
              &ldquo;{researchIdentity.philosophy.statement}&rdquo;
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {researchIdentity.primaryAreas.map((area) => (
                <div
                  key={area.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-primary">{area.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="academic-profiles">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Academic Profiles & Collaboration
            </CardTitle>
            <CardDescription className="text-center">
              Connect with me on various academic platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <p className="text-muted-foreground text-center max-w-2xl">
                {availability.collaboration
                  ? 'I am open to research collaborations, particularly in Explainable AI, Healthcare AI, and Multimodal Systems.'
                  : 'Currently focused on existing research commitments.'}
              </p>
              <AcademicProfiles variant="grid" showLabels={true} />
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="phd-opportunities">
        <Card className="max-w-3xl mx-auto shadow-lg bg-primary/5 border-primary/30">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              PhD Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              I am actively seeking PhD opportunities starting in{' '}
              <span className="font-semibold text-primary">2026</span> in the
              following research areas:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {researchIdentity.primaryAreas.slice(0, 2).map((area) => (
                <div
                  key={area.id}
                  className="p-4 border rounded-lg bg-background hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-semibold text-primary mb-2">
                    {area.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {area.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {area.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-4">
              If you are a professor or researcher working in these or related
              areas, I would be delighted to discuss potential PhD positions or
              collaborative research opportunities.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
