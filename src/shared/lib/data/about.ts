import type { LucideIcon } from 'lucide-react';
import {
  MapPin,
  Briefcase,
  Brain,
  Target,
  BookOpen,
  Users,
  Trophy,
  FlaskConical,
  Star,
  Medal,
  ShieldCheck,
} from 'lucide-react';

export interface QuickFact {
  id: string;
  icon: LucideIcon;
  label: string;
  value: string;
}

export interface HighlightStats {
  id: string;
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface Certification {
  id: string;
  title: string;
  institution: string;
  date: string;
  note: string;
}

export interface AwardItem {
  id: string;
  title: string;
  institution: string;
  date: string;
  icon: LucideIcon;
}

export interface ServiceItem {
  id: string;
  title: string;
  organization: string;
  duration: string;
  description: string;
  icon: LucideIcon;
}

export const quickFacts: QuickFact[] = [
  {
    id: 'qf-location',
    icon: MapPin,
    label: 'Location',
    value: 'Dhaka, Bangladesh',
  },
  {
    id: 'qf-position',
    icon: Briefcase,
    label: 'Current Position',
    value: 'Senior Lecturer, IUB',
  },
  {
    id: 'qf-philosophy',
    icon: Brain,
    label: 'Research Philosophy',
    value: 'Explainable & Trustworthy AI',
  },
  {
    id: 'qf-goal',
    icon: Target,
    label: 'Career Goal',
    value: 'Pursuing PhD Opportunities',
  },
];

export const highlights: HighlightStats[] = [
  {
    id: 'hl-publications',
    icon: BookOpen,
    value: '15+',
    label: 'Publications',
  },
  {
    id: 'hl-students',
    icon: Users,
    value: '1000+',
    label: 'Students Taught',
  },
  {
    id: 'hl-awards',
    icon: Trophy,
    value: '6x',
    label: 'VC Awards',
  },
  {
    id: 'hl-grants',
    icon: FlaskConical,
    value: '4',
    label: 'Research Grants',
  },
];

export const certifications: Certification[] = [
  {
    id: 'cert-obe-2024',
    title: 'Hands-on Orientation on Outcomes-Based Education (OBE)',
    institution:
      'Board of Accreditation for Engineering and Technical Education (BAETE), IEB',
    date: 'Feb 2024',
    note: 'Participated in practical sessions on implementing OBE frameworks in engineering education.',
  },
  {
    id: 'cert-slr-2024',
    title:
      "Insider's Guide to Systematic Literature Review & Research Paper Writing: A Hands-on Workshop",
    institution: 'Center for Computational and Data Sciences (CCSD), IUB',
    date: 'Jan 2024',
    note: 'Learned advanced techniques in conducting systematic literature reviews and academic writing.',
  },
  {
    id: 'cert-baete-2023',
    title: 'BAETE Accreditation for Computer Science and Engineering Programs',
    institution:
      'United International University, BAETE & IEEE Computer Society Bangladesh Chapter',
    date: 'Oct 2023',
    note: 'Acquired knowledge of BAETE accreditation criteria and its application in academic programs.',
  },
  {
    id: 'cert-obe-2019',
    title: 'Outcomes-Based Education (OBE)',
    institution:
      'Board of Accreditation for Engineering and Technical Education (BAETE), IEB',
    date: 'Jun 2019',
    note: 'Received detailed training on implementing and managing OBE in higher education.',
  },
  {
    id: 'cert-radio-2017',
    title: 'Amateur Radio Service Certification Exam',
    institution: 'Bangladesh Telecommunication Regulatory Commission (BTRC)',
    date: 'Dec 2017',
    note: 'Certified for operating amateur radio services in Bangladesh. Serial No. 083/17097.',
  },
];

export const honorsAndAwards: AwardItem[] = [
  {
    id: 'award-vc-spring-2016',
    title: "Vice Chancellor's Award for Academic Excellence",
    institution: 'BRAC University',
    date: 'Spring 2016',
    icon: Trophy,
  },
  {
    id: 'award-vc-fall-2015',
    title: "Vice Chancellor's Award for Academic Excellence",
    institution: 'BRAC University',
    date: 'Fall 2015',
    icon: Trophy,
  },
  {
    id: 'award-vc-spring-2015',
    title: "Vice Chancellor's Award for Academic Excellence",
    institution: 'BRAC University',
    date: 'Spring 2015',
    icon: Trophy,
  },
  {
    id: 'award-vc-fall-2014',
    title: "Vice Chancellor's Award for Academic Excellence",
    institution: 'BRAC University',
    date: 'Fall 2014',
    icon: Trophy,
  },
  {
    id: 'award-vc-summer-2014',
    title: "Vice Chancellor's Award for Academic Excellence",
    institution: 'BRAC University',
    date: 'Summer 2014',
    icon: Trophy,
  },
  {
    id: 'award-vc-spring-2014',
    title: "Vice Chancellor's Award for Academic Excellence",
    institution: 'BRAC University',
    date: 'Spring 2014',
    icon: Trophy,
  },
  {
    id: 'award-intern-2016',
    title: 'Best Intern Award',
    institution: 'Tech Geeks Ltd.',
    date: 'Sep 2016',
    icon: Star,
  },
  {
    id: 'award-contest-2015',
    title: 'Top Ten Contestant in Programming Contest',
    institution: 'BRAC IT',
    date: 'Nov 2015',
    icon: Medal,
  },
];

export const professionalService: ServiceItem[] = [
  {
    id: 'svc-ieee-mentor',
    title: 'IEEE Computer Society Faculty Mentor',
    organization: 'Independent University, Bangladesh (IUB)',
    duration: 'Mar 2019 - Present',
    description:
      'Mentoring students in IEEE Computer Society activities and research initiatives.',
    icon: Users,
  },
  {
    id: 'svc-techfest',
    title: 'Tech Fest Judge & Organizer',
    organization: 'Independent University, Bangladesh (IUB)',
    duration: 'Apr 2019 - Dec 2022',
    description:
      'Judged and organized 5 tech fest events, fostering innovation and technical skills among students.',
    icon: ShieldCheck,
  },
  {
    id: 'svc-hackathon',
    title: 'National Hackathon Mentor',
    organization: 'Bangladesh Innovation Forum',
    duration: 'Feb 2020',
    description:
      'Mentored student teams in developing innovative solutions for national challenges.',
    icon: Users,
  },
  {
    id: 'svc-bucc-vp',
    title: 'Vice President',
    organization: 'BRAC University Computer Club (BUCC)',
    duration: 'Jun 2016 - Jun 2017',
    description:
      'Led the executive team in organizing workshops, programming contests, and technical events.',
    icon: ShieldCheck,
  },
];
