import type { Metadata } from 'next';
import { siteConfig } from '@/shared/config/site';
import { PublicationStructuredDataScript } from '@/shared/components/common/structured-data';

export const metadata: Metadata = {
  title: 'Publications & Research',
  description: `Explore Md Asif Bin Khaled's scholarly articles, conference papers, and ongoing research in Explainable AI and Multimodal AI for healthcare. ${siteConfig.description}`,
  keywords: [
    ...siteConfig.keywords,
    'academic publications',
    'research papers',
    'conference papers',
    'IEEE',
    'Springer',
  ],
  alternates: {
    canonical: `${siteConfig.url}/publications`,
  },
};

export default function PublicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicationStructuredDataScript />
      {children}
    </>
  );
}
