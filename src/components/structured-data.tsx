
"use client";

import { useEffect } from 'react';
import { siteConfig } from '@/config/site';
import { samplePublications } from '@/lib/data/publications'; // Import publications

export function ScholarStructuredData() {
  useEffect(() => {
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": siteConfig.author,
      "givenName": "Md Asif Bin",
      "familyName": "Khaled",
      "jobTitle": "Senior Lecturer & Researcher",
      "workLocation": {
        "@type": "Place",
        "name": "Independent University, Bangladesh",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Dhaka",
            "addressCountry": "BD"
        }
      },
      "worksFor": {
        "@type": "Organization",
        "name": "Independent University, Bangladesh",
        "url": "https://www.iub.edu.bd/"
      },
      "url": siteConfig.url,
      "email": siteConfig.email,
      "telephone": siteConfig.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Bashundhara R/A", // More specific if available from CV
        "addressLocality": "Dhaka",
        "postalCode": "1212",
        "addressCountry": "Bangladesh"
      },
      "sameAs": [
        siteConfig.links.github,
        siteConfig.links.linkedin,
        siteConfig.links.googleScholar,
        ...(siteConfig.links.twitter !== "https://twitter.com/yourusername" ? [siteConfig.links.twitter] : []) // Add Twitter if not default
      ],
      "alumniOf": [
        {
          "@type": "CollegeOrUniversity",
          "name": "Independent University, Bangladesh",
          "url": "https://www.iub.edu.bd/",
          "sameAs": "https://www.iub.edu.bd/"
        },
        {
          "@type": "CollegeOrUniversity",
          "name": "BRAC University",
          "url": "https://www.bracu.ac.bd/",
          "sameAs": "https://www.bracu.ac.bd/"
        }
      ],
      "knowsAbout": [
        "Explainable AI (XAI)",
        "Multimodal AI (MMAI)",
        "Computer Vision (CV)",
        "Healthcare AI",
        "Machine Learning",
        "Deep Learning",
        "Data Mining",
        "Algorithm Design",
        "Outcome-Based Education (OBE)"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "degree",
          "name": "Master of Science in Computer Science",
          "educationalLevel": "https://schema.org/CollegeDegree", // Using schema.org enum
          "awardedBy": {
            "@type": "CollegeOrUniversity",
            "name": "Independent University, Bangladesh"
          }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "degree",
          "name": "Bachelor of Science in Computer Science and Engineering",
          "educationalLevel": "https://schema.org/CollegeDegree", // Using schema.org enum
          "awardedBy": {
            "@type": "CollegeOrUniversity",
            "name": "BRAC University"
          }
        }
      ],
      "researchInterest": [
        "Explainable AI (XAI): Ensuring transparency and trustworthiness in disease detection, diagnosis, and healthcare analytics utilizing Artificial Intelligence (AI).",
        "Multimodal AI (MMAI) & Computer Vision (CV): Using Multimodal AI (MMAI) and Computer Vision (CV) to combine imaging, clinical records, and lab results for holistic diagnostics."
      ]
    };

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
    const publicationsSchema = samplePublications.map(pub => ({
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      "headline": pub.title,
      "name": pub.title,
      "author": pub.authors.map(authorName => ({ "@type": "Person", "name": authorName })),
      "datePublished": pub.year.toString(),
      ...(pub.venue && { "isPartOf": { "@type": "PublicationVolume", "name": pub.venue } }), // Simplified, ideally more detailed
      ...(pub.link && { "url": pub.link }),
      ...(pub.doi && { "identifier": { "@type": "PropertyValue", "propertyID": "doi", "value": pub.doi } }),
      ...(pub.abstract && { "description": pub.abstract }),
      ...(pub.keywords && { "keywords": pub.keywords.join(", ") }),
      "publisher": { // Generic publisher, can be refined if each pub has specific publisher info
        "@type": "Organization",
        "name": pub.venue?.includes("IEEE") ? "IEEE" : (pub.venue?.includes("Springer") ? "Springer" : "Academic Publisher")
      }
    }));

    if (publicationsSchema.length > 0) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      // If multiple publications, wrap in an array or use ItemList
      script.text = JSON.stringify(publicationsSchema.length === 1 ? publicationsSchema[0] : publicationsSchema);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
    
    return undefined; // Explicit return for consistency
  }, []);

  return null;
}
