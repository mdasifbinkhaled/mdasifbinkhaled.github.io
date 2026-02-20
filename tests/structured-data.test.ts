import { describe, it, expect } from 'vitest';
import { generatePersonStructuredData } from '@/shared/lib/structured-data';
import { siteConfig } from '@/shared/config/site';

describe('generatePersonStructuredData', () => {
  it('uses configured profile URLs without placeholders', () => {
    const personData = generatePersonStructuredData();
    const placeholderIndicators = ['YOUR_', 'yourusername'];

    expect(
      personData.mainEntity.sameAs.every(
        (url: string) =>
          !placeholderIndicators.some((indicator) => url.includes(indicator))
      )
    ).toBe(true);
    expect(personData.mainEntity.sameAs).toContain(siteConfig.links.github);
    expect(personData.mainEntity.sameAs).toContain(siteConfig.links.linkedin);
    expect(personData.mainEntity.sameAs).toContain(
      siteConfig.links.googleScholar
    );

    if (siteConfig.links.orcid) {
      expect(personData.mainEntity.sameAs).toContain(siteConfig.links.orcid);
    }
  });
});
