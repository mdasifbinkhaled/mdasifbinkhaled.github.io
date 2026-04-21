/**
 * Personal Data
 * Bio, goals, and interests.
 */

export const personalIdentity = {
  introductions: {
    english: {
      heading: 'English introduction',
      paragraphs: [
        'I work at the intersection of explainable AI, multimodal learning, and applied computing for healthcare. My academic work is driven by a practical question: how can intelligent systems support high-stakes decisions without becoming opaque to the people who rely on them?',
        'Alongside research, I care deeply about teaching, mentorship, and building tools that reduce friction for students. I value clarity, ethical responsibility, and useful systems over novelty for its own sake.',
      ],
    },
    bengali: {
      heading: 'বাংলা পরিচিতি',
      paragraphs: [
        'আমি ব্যাখ্যাযোগ্য এআই, মাল্টিমোডাল লার্নিং এবং স্বাস্থ্যসেবায় প্রয়োগযোগ্য কম্পিউটিং নিয়ে কাজ করি। আমার গবেষণার মূল লক্ষ্য হলো এমন বুদ্ধিমান ব্যবস্থা তৈরি করা, যেগুলো গুরুত্বপূর্ণ সিদ্ধান্তে সহায়তা করবে কিন্তু ব্যবহারকারীর কাছে অস্বচ্ছ হয়ে উঠবে না।',
        'গবেষণার পাশাপাশি আমি শিক্ষাদান, মেন্টরশিপ এবং শিক্ষার্থীদের জন্য ব্যবহারযোগ্য টুল তৈরিতে আগ্রহী। আমার কাছে স্বচ্ছতা, নৈতিক দায়বদ্ধতা এবং বাস্তব উপযোগিতা নতুনত্বের চেয়েও বেশি গুরুত্বপূর্ণ।',
      ],
    },
  },
  goals: {
    shortTerm: 'Advance explainable AI techniques in healthcare applications',
    longTerm:
      'Become an expert in the field working towards innovations that benefit humanity',
    impact:
      'Making AI decisions in critical domains transparent and trustworthy',
  },
  teachingPhilosophy: {
    core: 'Teach that inspires and makes students capable, impactful, and honest',
    approach:
      'Outcome-Based Education (OBE) with focus on practical application',
    values: [
      'Inspiration',
      'Capability Building',
      'Real-world Impact',
      'Integrity',
    ],
    commitment:
      'Creating an environment where students develop both technical skills and ethical responsibility',
  },
  phdInterests: {
    timeline: {
      targetStart: 'Fall 2026',
      applicationPeriod: '2025-2026',
    },
    targetLocations: ['Europe', 'Australia', 'Saudi Arabia'],
    researchFocus: ['Healthcare AI', 'AI/ML', 'Explainable AI'],
    supervisorPreferences: {},
    isPrivate: true,
  },
} as const;
