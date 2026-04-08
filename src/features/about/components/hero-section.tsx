'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { Download, Mail, Globe } from 'lucide-react';
import { siteConfig } from '@/shared/config/site';

export function HeroSection() {
  const [lang, setLang] = useState<'EN' | 'BN'>('EN');

  const content = {
    EN: {
      bio: `My journey in artificial intelligence research and education, from curiosity-driven exploration to advancing healthcare through transparent AI solutions.`,
    },
    BN: {
      bio: `কৃত্রিম বুদ্ধিমত্তা গবেষণা এবং শিক্ষায় আমার যাত্রা, কৌতূহল-চালিত অন্বেষণ থেকে শুরু করে ব্যাখ্যাযোগ্য এআই সমাধানের মাধ্যমে স্বাস্থ্যসেবাকে এগিয়ে নিয়ে যাওয়ার একটি প্রয়াস।`,
    },
  };

  return (
    <header className="text-center space-y-6 relative">
      <div className="absolute right-0 top-0 hidden sm:flex">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLang(lang === 'EN' ? 'BN' : 'EN')}
          className="text-muted-foreground hover:text-primary gap-2"
        >
          <Globe className="h-4 w-4" />
          <span className="font-semibold">
            {lang === 'EN' ? 'বাংলা রূপান্তর' : 'English View'}
          </span>
        </Button>
      </div>

      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        About {siteConfig.author}
      </h1>

      {/* Mobile lang toggle */}
      <div className="flex sm:hidden justify-center pb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLang(lang === 'EN' ? 'BN' : 'EN')}
          className="text-xs"
        >
          <Globe className="h-3 w-3 mr-1.5" />
          {lang === 'EN' ? 'বাংলা পড়ুন' : 'Read in English'}
        </Button>
      </div>

      <p
        className={`text-lg leading-8 text-muted-foreground max-w-3xl mx-auto transition-opacity duration-300 ${lang === 'BN' ? 'font-serif text-xl' : ''}`}
      >
        {content[lang].bio}
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
