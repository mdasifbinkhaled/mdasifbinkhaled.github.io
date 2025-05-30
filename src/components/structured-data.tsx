"use client";

import { useEffect } from 'react';
import { siteConfig } from '@/config/site';

export function ScholarStructuredData() {
  useEffect(() => {
    // Create schema.org Person data for academic profile
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": siteConfig.author,
      "givenName": "Md Asif Bin",
      "familyName": "Khaled",
      "jobTitle": "Senior Lecturer & Researcher",
      "workLocation": {
        "@type": "Place",
        "name": "Independent University, Bangladesh"
      },
      "worksFor": {
        "@type": "Organization",
        "name": "Independent University, Bangladesh",
        "url": "https://iub.edu.bd/"
      },
      "url": siteConfig.url,
      "sameAs": [
        siteConfig.links.github,
        siteConfig.links.linkedin,
        siteConfig.links.googleScholar
      ],
      "alumniOf": [
        {
          "@type": "CollegeOrUniversity",
          "name": "Independent University, Bangladesh",
          "url": "https://iub.edu.bd/"
        },
        {
          "@type": "CollegeOrUniversity",
          "name": "BRAC University",
          "url": "https://www.bracu.ac.bd/"
        }
      ],
      "knowsAbout": [
        "Explainable AI (XAI)",
        "Multimodal AI",
        "Computer Vision",
        "Healthcare AI",
        "Machine Learning"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "degree",
          "name": "Master of Science in Computer Science",
          "educationalLevel": "graduate"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "degree",
          "name": "Bachelor of Science in Computer Science and Engineering",
          "educationalLevel": "undergraduate"
        }
      ]
    };

    // Add structured data to the document
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(personSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}

export function PublicationStructuredData() {
  useEffect(() => {
    // Create schema.org ScholarlyArticle data
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      "headline": "Advancements in Bangla Speech Emotion Recognition: A Deep Learning Approach with Cross-Lingual Validation",
      "author": [
        {
          "@type": "Person",
          "name": "K. Alam"
        },
        {
          "@type": "Person",
          "name": "M.H. Bhuiyan"
        },
        {
          "@type": "Person",
          "name": "M.J. Hossain"
        },
        {
          "@type": "Person",
          "name": "M.F. Monir"
        },
        {
          "@type": "Person",
          "name": "M.A.B. Khaled"
        }
      ],
      "datePublished": "2024",
      "publisher": {
        "@type": "Organization",
        "name": "IEEE"
      },
      "name": "Advancements in Bangla Speech Emotion Recognition: A Deep Learning Approach with Cross-Lingual Validation",
      "isPartOf": {
        "@type": "PublicationIssue",
        "isPartOf": {
          "@type": "PublicationVolume",
          "isPartOf": {
            "@type": "Periodical",
            "name": "IEEE 99th Vehicular Technology Conference (VTC2024-Spring)"
          }
        }
      },
      "keywords": "Speech Emotion Recognition, Deep Learning, Bangla, Cross-Lingual Validation"
    };

    // Add structured data to the document
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(articleSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}