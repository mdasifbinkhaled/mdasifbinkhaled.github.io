import type { Metadata } from 'next';
import { siteConfig } from '@/shared/config/site';
import { ContactSection } from '@/features/contact';

export const metadata: Metadata = {
  title: 'Contact Me',
  description: `Get in touch with ${siteConfig.author} for collaborations or research inquiries. ${siteConfig.description}`,
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactSection />;
}
