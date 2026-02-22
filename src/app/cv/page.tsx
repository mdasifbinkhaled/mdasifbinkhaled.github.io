import type { Metadata } from 'next';
import { siteConfig } from '@/shared/config/site';
import { assetPaths } from '@/shared/config/assets';
import { researchIdentity } from '@/shared/lib/data/researcher-profile';
import CVContent from './cv-content.client';

export const metadata: Metadata = {
  title: 'Curriculum Vitae',
  description: `View and download the CV of ${siteConfig.author} — ${siteConfig.role} at ${siteConfig.institution}. Research, publications, teaching, and professional experience.`,
  openGraph: {
    title: `CV — ${siteConfig.author}`,
    description: `Academic CV of ${siteConfig.author}, ${siteConfig.role}.`,
    images: [assetPaths.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `CV — ${siteConfig.author}`,
    description: `Academic CV of ${siteConfig.author}, ${siteConfig.role}.`,
    images: [assetPaths.ogImage],
  },
  alternates: {
    canonical: '/cv',
  },
};

export default function CVPage() {
  return (
    <div className="flex flex-col items-center space-y-8">
      <header className="text-center w-full">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Curriculum Vitae
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          {researchIdentity.philosophy.statement}
        </p>
      </header>

      <CVContent />
    </div>
  );
}
