import type { PublicationItem } from '@/types';

// Sample Data based on PRD structure
export const samplePublications: PublicationItem[] = [
  {
    id: 'pub1',
    title: 'Scalable Deep Learning for Big Data Analytics',
    authors: ['Md Asif Bin Khaled', 'Dr. Eva Rostova', 'Dr. Kenji Tanaka'],
    venue: 'Proceedings of the International Conference on Data Science (ICDS)',
    year: 2023,
    type: 'Conference',
    link: '#', // Replace with actual link or MDX page path
    pdfLink: '#', // Replace with actual PDF link
    abstract: 'This paper introduces a novel framework for scaling deep learning models to handle massive datasets, achieving state-of-the-art results on several benchmarks.',
    keywords: ['Deep Learning', 'Big Data', 'Scalability', 'Distributed Training'],
  },
  {
    id: 'pub2',
    title: 'Ethical Considerations in Autonomous AI Systems',
    authors: ['Md Asif Bin Khaled', 'Prof. Aliyah Chen'],
    venue: 'Journal of AI Ethics & Society',
    year: 2022,
    type: 'Journal',
    link: '#',
    pdfLink: '#',
    abstract: 'We explore the multifaceted ethical challenges posed by increasingly autonomous AI systems and propose a comprehensive framework for responsible development and deployment.',
    keywords: ['AI Ethics', 'Autonomous Systems', 'Responsible AI', 'Bias'],
  },
  {
    id: 'pub3',
    title: 'Advancements in Few-Shot Learning (Work in Progress)',
    authors: ['Md Asif Bin Khaled'],
    venue: 'Anticipated submission to NeurIPS 2024',
    year: 2024,
    type: 'In Progress',
    abstract: 'This ongoing research aims to develop new techniques for training effective machine learning models with very limited labeled data, focusing on meta-learning and transfer learning approaches.',
    keywords: ['Few-Shot Learning', 'Meta-Learning', 'Transfer Learning'],
  },
  {
    id: 'pub4',
    title: 'A Lightweight Model for On-Device Sentiment Analysis',
    authors: ['Md Asif Bin Khaled', 'Samira Jones'],
    venue: 'Workshop on Mobile and Embedded AI (MEAI)',
    year: 2021,
    type: 'Workshop',
    link: '#',
    pdfLink: '#',
    keywords: ['Sentiment Analysis', 'Mobile AI', 'Edge Computing'],
  },
  // Add more publications here as needed
];
