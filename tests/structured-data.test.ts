import { describe, it, expect } from 'vitest'
import { generatePersonStructuredData } from '@/lib/structured-data'
import { siteConfig } from '@/config/site'

describe('generatePersonStructuredData', () => {
  it('uses configured profile URLs without placeholders', () => {
    const personData = generatePersonStructuredData()
    const placeholderIndicators = ['YOUR_', 'yourusername']

    expect(personData.sameAs.every(url => !placeholderIndicators.some(indicator => url.includes(indicator)))).toBe(true)
    expect(personData.sameAs).toContain(siteConfig.links.github)
    expect(personData.sameAs).toContain(siteConfig.links.linkedin)
    expect(personData.sameAs).toContain(siteConfig.links.googleScholar)

    if (siteConfig.links.orcid) {
      expect(personData.sameAs).toContain(siteConfig.links.orcid)
    }
  })
})
