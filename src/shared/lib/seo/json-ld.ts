import { siteConfig } from '@/shared/config/site';
import { researchIdentity } from '@/shared/config/researcher-profile';

export function getPersonJsonLd() {
  const socialLinks = [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.googleScholar,
    siteConfig.links.researchGate,
    siteConfig.links.orcid,
    siteConfig.links.twitter,
  ].filter((link) => link && !link.includes('yourusername'));

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    sameAs: socialLinks,
    jobTitle: 'Senior Lecturer & Researcher',
    worksFor: {
      '@type': 'Organization',
      name: 'Independent University, Bangladesh (IUB)',
    },
    description: siteConfig.description,
    knowsAbout: researchIdentity.primaryAreas.map((area) => area.name),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'Bangladesh',
    },
    email: siteConfig.email,
  };
}
