import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Mail } from 'lucide-react';
import { siteConfig } from '@/shared/config/site';

export function CtaSection() {
  return (
    <section>
      <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <CardContent className="pt-8 pb-8 text-center">
          <h3 className="text-2xl font-bold mb-3 text-primary">
            Let&apos;s Connect
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I&apos;m always open to discussing research collaborations, PhD
            opportunities, or speaking engagements. Feel free to reach out!
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link href="/contact">
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link
                href={siteConfig.links.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Scholar
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link
                href={siteConfig.links.orcid}
                target="_blank"
                rel="noopener noreferrer"
              >
                ORCID
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
