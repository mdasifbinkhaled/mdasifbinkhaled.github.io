import { ExperienceTimeline } from '@/components/experience-timeline';
import { PublicationList } from '@/components/publication-list';
import type { ExperienceItem, PublicationItem } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ExternalLinkIcon } from 'lucide-react';
import Image from 'next/image';

// Sample Data (Ideally, this would come from a CMS, API, or Markdown files)
const sampleExperiences: ExperienceItem[] = [
  {
    id: 'exp1',
    title: 'Lead Research Scientist',
    company: 'Innovatech Labs',
    duration: 'Jan 2022 - Present',
    description: 'Leading a team of researchers in developing novel AI algorithms for natural language understanding and computer vision. Secured multiple research grants and published extensively in top-tier conferences.',
    logoUrl: 'https://placehold.co/48x48.png',
    logoAiHint: 'modern building',
    tags: ['AI/ML', 'NLP', 'Computer Vision', 'Team Lead'],
  },
  {
    id: 'exp2',
    title: 'Senior Software Engineer',
    company: 'NextGen Solutions',
    duration: 'June 2019 - Dec 2021',
    description: 'Developed scalable backend systems for a cloud-based analytics platform. Contributed to significant performance improvements and mentored junior engineers.',
    logoUrl: 'https://placehold.co/48x48.png',
    logoAiHint: 'circuit board',
    tags: ['Software Engineering', 'Cloud Computing', 'Big Data', 'System Architecture'],
  },
  {
    id: 'exp3',
    title: 'Research Assistant',
    company: 'University of Technology',
    duration: 'Sep 2017 - May 2019',
    description: 'Conducted research on distributed machine learning algorithms. Co-authored several workshop papers and assisted in teaching undergraduate courses.',
    logoUrl: 'https://placehold.co/48x48.png',
    logoAiHint: 'university campus',
    tags: ['Research', 'Distributed Systems', 'Teaching'],
  },
];

const samplePublications: PublicationItem[] = [
  {
    id: 'pub1',
    title: 'Scalable Deep Learning for Big Data Analytics',
    authors: ['Md Asif Bin Khaled', 'Dr. Eva Rostova', 'Dr. Kenji Tanaka'],
    venue: 'Proceedings of the International Conference on Data Science (ICDS)',
    year: 2023,
    type: 'Conference',
    link: '#',
    pdfLink: '#',
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
];


export default function HomePage() {
  return (
    <div className="space-y-24 md:space-y-32">
      {/* About Me Section */}
      <section id="about" className="min-h-[calc(100vh-4rem)] md:min-h-screen flex items-center justify-center py-16 md:py-20 bg-gradient-to-br from-background to-secondary/30">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Avatar className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 border-4 border-primary shadow-lg">
            <AvatarImage src="https://placehold.co/200x200.png" alt="Md Asif Bin Khaled" data-ai-hint="professional portrait" />
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Md Asif Bin Khaled
          </h1>
          <p className="text-xl md:text-2xl text-foreground mb-8">
            Passionate Researcher & Software Engineer specializing in AI/ML.
          </p>
          <p className="text-md md:text-lg text-muted-foreground leading-relaxed mb-10">
            Welcome to my academic portfolio. I am dedicated to advancing the frontiers of artificial intelligence and machine learning, translating complex research into impactful real-world applications. Explore my work, experience, and publications to learn more about my journey and contributions to the field.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:mdasif.khaled@example.com" aria-label="Email Md Asif Bin Khaled">
                <Mail className="mr-2 h-5 w-5" /> Email
              </a>
            </Button>
            <Button variant="default" size="lg" asChild>
              <a href="#publications" aria-label="View Publications">
                View Publications <ExternalLinkIcon className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
          <div className="mt-10 flex justify-center space-x-6">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Md Asif Bin Khaled's GitHub profile">
              <Github className="h-7 w-7" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Md Asif Bin Khaled's LinkedIn profile">
              <Linkedin className="h-7 w-7" />
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-primary">
            Professional Experience
          </h2>
          <ExperienceTimeline experiences={sampleExperiences} />
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-16 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-primary">
            Publications & Research
          </h2>
          <PublicationList initialPublications={samplePublications} />
        </div>
      </section>

      <footer className="py-8 text-center border-t">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Md Asif Bin Khaled. All rights reserved.
        </p>
         <p className="text-xs text-muted-foreground mt-1">
          Built with Next.js and Tailwind CSS.
        </p>
      </footer>
    </div>
  );
}
