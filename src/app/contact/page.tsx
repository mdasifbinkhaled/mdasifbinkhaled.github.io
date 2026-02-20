import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Mail, Github, Linkedin, BookUser, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/shared/config/site';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact Me',
  description: `Get in touch with ${siteConfig.author} for collaborations or research inquiries. ${siteConfig.description}`,
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="container-responsive space-y-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <Breadcrumbs />
        <header className="text-center">
          <h1 className="text-fluid-heading font-bold tracking-tight text-primary pb-1">
            Let&apos;s Connect
          </h1>
          <p className="mt-4 text-fluid-lg leading-8 text-muted-foreground">
            I&apos;m open to research collaborations and interesting
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
      </div>
    </div>
  );
}
