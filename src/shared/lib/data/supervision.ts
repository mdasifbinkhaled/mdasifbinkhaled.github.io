import type { DraftRecords, SupervisionRecord } from '@/shared/types/teaching';

/**
 * Supervision records (thesis · directed research · capstone).
 *
 * SAMPLE / draft: real supervision records are not in the public data yet, so
 * this is topic-led structure with no invented individuals (themes echo the
 * owner's real research areas). The UI shows a visible "Sample" badge while
 * `draft` is true. Replace `rows` with real records and set `draft: false`.
 */
export const supervision: DraftRecords<SupervisionRecord> = {
  draft: true,
  note: 'Sample structure — replace with real supervision records.',
  rows: [
    {
      level: 'B.Sc. thesis',
      topic: 'Explainable AI for clinical risk prediction',
      year: '2025–26',
      status: 'Ongoing',
      abstract:
        'Interpretable gradient-boosted models for ICU mortality risk, with SHAP-based clinician-facing explanations.',
      members: [
        { name: 'Thesis student', role: 'Author', initials: 'TS' },
        { name: 'Md Asif Bin Khaled', role: 'Supervisor', initials: 'MK' },
      ],
    },
    {
      level: 'B.Sc. thesis',
      topic: 'Bangla NLP & speech-emotion recognition',
      year: '2024–25',
      status: 'Completed',
      abstract:
        'Transformer fine-tuning for Bangla speech-emotion classification on a low-resource corpus.',
      members: [
        { name: 'Thesis student', role: 'Author', initials: 'TS' },
        { name: 'Md Asif Bin Khaled', role: 'Supervisor', initials: 'MK' },
      ],
    },
    {
      level: 'Directed research',
      topic: 'Ensemble methods for medical diagnosis',
      year: '2024',
      status: 'Completed',
      abstract:
        'Comparative study of stacking and boosting ensembles across three public diagnostic datasets.',
      members: [
        { name: 'Research student A', role: 'Co-author', initials: 'RA' },
        { name: 'Research student B', role: 'Co-author', initials: 'RB' },
        { name: 'Md Asif Bin Khaled', role: 'Supervisor', initials: 'MK' },
      ],
    },
    {
      level: 'Capstone project',
      topic: 'mHealth relational agents for dengue care',
      year: '2023–24',
      status: 'Completed',
      abstract:
        'A conversational mobile agent guiding dengue patients through symptom tracking and care escalation.',
      members: [
        { name: 'Team member 1', role: 'Developer', initials: 'T1' },
        { name: 'Team member 2', role: 'Developer', initials: 'T2' },
        { name: 'Team member 3', role: 'Designer', initials: 'T3' },
        { name: 'Md Asif Bin Khaled', role: 'Supervisor', initials: 'MK' },
      ],
    },
  ],
};
