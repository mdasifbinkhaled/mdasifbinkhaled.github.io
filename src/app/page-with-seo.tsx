import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: siteConfig.name,
    description: siteConfig.description,
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      creator: `@${siteConfig.links.twitter.split('/').pop()}`,
      images: [siteConfig.ogImage],
    },
  };
};

export default function PageWithSEO({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}