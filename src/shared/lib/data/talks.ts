export interface Talk {
  id: string;
  title: string;
  event: string;
  date: string;
  location: string;
  type: 'Keynote' | 'Conference' | 'Workshop' | 'Guest Lecture';
  slidesUrl?: string;
  videoUrl?: string;
}

export const talksData: Talk[] = [
  {
    id: 'stroke-xai-2024',
    title: 'Interpretable Machine Learning in Stroke Diagnosis: A New Paradigm',
    event: 'Healthcare AI Summit 2024',
    date: '2024-03-15',
    location: 'Dhaka, Bangladesh',
    type: 'Keynote',
  },
  {
    id: 'multimodal-fusion-2023',
    title: 'Architectures for Multimodal Data Fusion in Remote Sensing',
    event: 'International Conference on Computing (ICC)',
    date: '2023-11-20',
    location: 'Virtual',
    type: 'Conference',
  },
  {
    id: 'python-dsa-2023',
    title: 'SortyPy and Modern Abstract Data Structures',
    event: 'BRACU Computer Club Seminar',
    date: '2023-09-10',
    location: 'BRAC University',
    type: 'Guest Lecture',
  },
];
