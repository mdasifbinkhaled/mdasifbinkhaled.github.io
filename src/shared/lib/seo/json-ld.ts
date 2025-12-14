import { siteConfig } from '@/shared/config/site';
import { researchIdentity } from '@/shared/config/researcher-profile';

/**
 * Generate Person JSON-LD structured data for SEO
 * Uses centralized configuration for consistency
 */
export function getPersonJsonLd() {
  // Build social links from siteConfig (excludes deprecated/placeholder links)
  const socialLinks = [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.googleScholar,
    siteConfig.links.researchGate,
    siteConfig.links.orcid,
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    sameAs: socialLinks,
    jobTitle: siteConfig.jobTitle,
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.institution,
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
