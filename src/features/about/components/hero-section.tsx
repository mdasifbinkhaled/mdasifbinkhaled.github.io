import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { Download, Mail } from 'lucide-react';
import { siteConfig } from '@/shared/config/site';

export function HeroSection() {
  return (
    <header className="text-center space-y-6">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        About {siteConfig.author}
      </h1>
      <p className="text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
        My journey in artificial intelligence research and education, from
        curiosity-driven exploration to advancing healthcare through transparent
        AI solutions.
      </p>
      <div className="flex flex-wrap gap-4 justify-center pt-2">
        <Button
          asChild
          size="lg"
          className="shadow-md hover:shadow-lg transition-shadow"
        >
          <Link
            href={siteConfig.links.cv}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="w-4 h-4 mr-2" />
            Download CV
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="hover:bg-primary/5 transition-colors"
        >
          <Link href="/contact">
            <Mail className="w-4 h-4 mr-2" />
            Get in Touch
          </Link>
        </Button>
      </div>
    </header>
  );
}
