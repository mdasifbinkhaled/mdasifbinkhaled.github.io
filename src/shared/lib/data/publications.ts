import type { PublicationItem } from '@/shared/types';

export const samplePublications: PublicationItem[] = [
  {
    id: 'pub-desrist-2024',
    title:
      'Conceptual Design and Evaluation Plan of a Mobile Relational Agent for Dengue Management in Bangladesh',
    authors: [
      'Khaled, M.A.B.',
      'Yasmin, S.',
      'Al Haque, A.S.M.F.',
      'Islam, A.',
      'Ahmed, E.',
      'Moalla Chaudhry, B.',
    ],
    venue:
      '19th International Conference on Design Science Research in Information Systems and Technology (DESRIST), University West, Trollhättan, Sweden (Paper 66)',
    year: 2024,
    type: 'In Progress', // Research-in-Progress paper
    abstract:
      'This research-in-progress paper presents a conceptual design for a mobile relational agent to assist with dengue management in Bangladesh, including evaluation plans.',
    keywords: [
      'mHealth',
      'Relational Agent',
      'Dengue',
      'Bangladesh',
      'Healthcare',
      'DESRIST',
    ],
  },
  {
    id: 'pub-embc-2024',
    title:
      'Relational Agent-Enabled mHealth Platform for Addressing Dengue Crisis in Bangladesh',
    authors: ['Khaled, M.A.B.', 'Alam, K.', 'Rahman, M.', 'Bhuiyan, J.'],
    venue:
      '2024 IEEE Engineering in Medicine & Biology Society (EMBC), Annual International Conference (Accepted for poster presentation)',
    year: 2024,
    type: 'Conference', // Accepted for poster presentation
    abstract:
      'A poster presentation introducing a mobile health platform using relational agents to address the dengue crisis in Bangladesh, focusing on preventive measures and early intervention.',
    keywords: [
      'mHealth',
      'Relational Agents',
      'Dengue',
      'Public Health',
      'Mobile Technology',
      'IEEE EMBC',
    ],
  },
  {
    id: 'pub-vtc-2024',
    title:
      'Advancements in Bangla Speech Emotion Recognition: A Deep Learning Approach with Cross-Lingual Validation',
    authors: [
      'Alam, K.',
      'Bhuiyan, M.H.',
      'Hossain, M.J.',
      'Monir, M.F.',
      'Khaled, M.A.B.',
    ],
    venue:
      '2024 IEEE 99th Vehicular Technology Conference (VTC2024-Spring), Singapore',
    pages: '1–5',
    year: 2024,
    type: 'Conference',
    link: 'https://ieeexplore.ieee.org/document/10550900', // Specific link if known, otherwise general IEEE
    doi: '10.1109/VTC2024-Spring59554.2024.10550900',
    abstract:
      'This paper explores advancements in Bangla speech emotion recognition using deep learning techniques with cross-lingual validation to improve emotion detection in multilingual contexts.',
    keywords: [
      'Speech Emotion Recognition',
      'Deep Learning',
      'Bangla',
      'Cross-Lingual Validation',
      'IEEE',
    ],
  },
  {
    id: 'pub-ajcai-gvh-2022',
    title:
      'Multiclass Classification for GvHD Prognosis Prior to Allogeneic Stem Cell Transplantation',
    authors: ['Khaled, M.A.B.', 'Hossain, M.J.', 'Rahman, S.', 'Ferdaus, J.'],
    venue:
      '36th Australasian Joint Conference on Artificial Intelligence (AJCAI), AI 2023: Advances in Artificial Intelligence, Perth, WA, Australia. Lecture Notes in Computer Science, vol 14430. Springer, Cham',
    pages: '487–500',
    year: 2023,
    type: 'Conference',
    link: 'https://link.springer.com/chapter/10.1007/978-3-031-49811-8_39',
    doi: '10.1007/978-3-031-49811-8_39',
    abstract:
      'A machine learning approach for predicting Graft-versus-Host Disease outcomes before stem cell transplantation, improving patient risk assessment.',
    keywords: [
      'Multiclass Classification',
      'GvHD Prognosis',
      'Healthcare',
      'Stem Cell Transplantation',
      'Machine Learning',
      'Springer',
      'AJCAI',
    ],
  },
  {
    id: 'pub-ajcai-liver-2022',
    title:
      'Liver Disease Classification by Pruning Data Dependency Utilizing Ensemble Learning Based Feature Selection',
    authors: ['Khaled, M.A.B.', 'Rahman, M.M.', 'Quaiyum, M.G.', 'Akter, S.'],
    venue:
      '36th Australasian Joint Conference on Artificial Intelligence (AJCAI), AI 2023: Advances in Artificial Intelligence, Perth, WA, Australia. Lecture Notes in Computer Science, vol 14430. Springer, Cham',
    pages: '614–627',
    year: 2023,
    type: 'Conference',
    link: 'https://link.springer.com/chapter/10.1007/978-3-031-49811-8_48',
    doi: '10.1007/978-3-031-49811-8_48',
    abstract:
      'This paper proposes an ensemble learning approach for feature selection to improve liver disease classification by reducing data dependencies.',
    keywords: [
      'Liver Disease',
      'Classification',
      'Ensemble Learning',
      'Feature Selection',
      'Machine Learning',
      'Springer',
      'AJCAI',
    ],
  },
  {
    id: 'pub-ecce-2019',
    title:
      'Word Sense Disambiguation of Bengali Words using FP-Growth Algorithm',
    authors: ['Kaysar, M.S.', 'Khaled, M.A.B.', 'Hasan, M.', 'Khan, M.I.'],
    venue:
      'International Conference on Electrical, Computer and Communication Engineering (ECCE)',
    pages: '1-5',
    year: 2019,
    type: 'Conference',
    link: 'https://ieeexplore.ieee.org/document/8741512',
    doi: '10.1109/ECACE.2019.8741512',
    abstract:
      'This research addresses word sense disambiguation in Bengali using the FP-Growth algorithm to improve natural language processing for Bengali text.',
    keywords: [
      'Natural Language Processing',
      'Bengali',
      'Word Sense Disambiguation',
      'FP-Growth',
      'IEEE',
    ],
  },
  {
    id: 'pub-icsca-2018',
    title: 'Detecting Sex From Handwritten Examples',
    authors: [
      'Saha, S.',
      'Khaled, M.A.B.',
      'Islam, M.S.',
      'Puja, N.S.',
      'Hasan, M.',
    ],
    venue:
      'IEEE International Conference on System, Computation, Automation and Networking (ICSCA)',
    pages: '1–7',
    year: 2018,
    type: 'Conference',
    link: 'https://ieeexplore.ieee.org/document/8541217',
    doi: '10.1109/ICSCA.2018.8541217',
    abstract:
      'A novel approach to determine the sex of a writer based on handwriting samples, using machine learning techniques for feature extraction and classification.',
    keywords: [
      'Handwriting Analysis',
      'Gender Classification',
      'Feature Extraction',
      'Machine Learning',
      'IEEE',
    ],
  },
];
