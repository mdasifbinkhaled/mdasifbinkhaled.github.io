import Link from 'next/link';
import { ArrowRight, Code } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { academicProfiles } from '@/shared/lib/data/researcher-profile';

export function ResearchCTA() {
  return (
    <section className="text-center space-y-6 py-12">
      <h2 className="text-2xl font-bold">Explore My Research Further</h2>
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild size="lg" className="group">
          <Link href="/publications">
            View Publications
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link
            href={academicProfiles.github.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Code className="mr-2 h-4 w-4" />
            GitHub Projects
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </div>
    </section>
  );
}
