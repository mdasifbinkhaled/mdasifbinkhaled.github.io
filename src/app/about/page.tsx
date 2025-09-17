import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/components/ui/card';
import { GraduationCap, Award, CalendarCheck2 } from 'lucide-react';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = {
  title: 'About Me',
  description: `Learn more about ${siteConfig.author}'s academic journey, research interests, and professional background. ${siteConfig.description}`,
};

const certifications = [
  {
    title: 'Hands-on Orientation on Outcomes-Based Education (OBE)',
    institution:
      'Board of Accreditation for Engineering and Technical Education (BAETE), IEB',
    date: 'Feb 2024',
    note: 'Participated in practical sessions on implementing OBE frameworks in engineering education.',
  },
  {
    title:
      'Insider’s Guide to Systematic Literature Review & Research Paper Writing: A Hands-on Workshop',
    institution: 'Center for Computational and Data Sciences (CCSD), IUB',
    date: 'Jan 2024',
    note: 'Learned advanced techniques in conducting systematic literature reviews and academic writing.',
  },
  {
    title: 'BAETE Accreditation for Computer Science and Engineering Programs',
    institution:
      'United International University, BAETE & IEEE Computer Society Bangladesh Chapter',
    date: 'Oct 2023',
    note: 'Acquired knowledge of BAETE accreditation criteria and its application in academic programs.',
  },
  {
    title: 'Outcomes-Based Education (OBE)',
    institution:
      'Board of Accreditation for Engineering and Technical Education (BAETE), IEB',
    date: 'Jun 2019',
    note: 'Received detailed training on implementing and managing OBE in higher education.',
  },
  {
    title: 'Amateur Radio Service Certification Exam',
    institution: 'Bangladesh Telecommunication Regulatory Commission (BTRC)',
    date: 'Dec 2017',
    note: 'Certified for operating amateur radio services in Bangladesh. Serial No. 083/17097.',
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          About {siteConfig.author}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          A Senior Lecturer and Researcher dedicated to advancing AI in
          healthcare through transparent and innovative solutions.
        </p>
      </header>

      <section id="narrative">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">My Journey & Vision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            <div className="md:float-right md:ml-6 mb-4 md:mb-0 md:w-1/3">
              <Image
                src="https://placehold.co/400x500.png"
                alt={`${siteConfig.author} - professional`}
                width={400}
                height={500}
                className="rounded-lg shadow-xl object-cover w-full"
              />
            </div>
            <p>
              I am {siteConfig.author}, a Senior Lecturer in Computer Science
              and Engineering with a profound passion for both education and
              research. My academic and professional pursuits are driven by a
              commitment to developing intelligent systems that can make a
              significant positive impact, particularly within the healthcare
              domain.
            </p>
            <p>
              My core research focuses on Explainable AI (XAI) and Multimodal AI
              (MMAI), with a specialized interest in their applications to
              healthcare. I firmly believe that the future of medical
              diagnostics and treatment can be revolutionized by AI systems that
              are not only highly accurate but also transparent, interpretable,
              and capable of processing diverse data sources such as medical
              images, clinical notes, and lab results.
            </p>
            <p>
              As an educator, I am dedicated to inspiring students to explore
              the vast and exciting potential of computer science. I am a strong
              advocate for Outcome-Based Education (OBE) and employ diverse
              pedagogical strategies to cultivate critical thinking, robust
              problem-solving skills, and a genuine enthusiasm for lifelong
              learning. My aim is to empower the next generation of engineers
              and researchers with the essential knowledge and tools to
              innovate, excel, and lead.
            </p>
            <p>
              Beyond my teaching and research activities, I am actively engaged
              in the academic community by mentoring students, contributing to
              professional service, and continuously seeking opportunities for
              growth. I am currently pursuing PhD opportunities to further
              deepen my research expertise and contribute to pioneering
              advancements in AI for healthcare and beyond.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="education">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          Education
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-start gap-4">
              <GraduationCap className="h-10 w-10 text-primary mt-1 flex-shrink-0" />
              <div>
                <CardTitle className="text-xl">
                  M.Sc in Computer Science
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Independent University, Bangladesh (IUB) - Dhaka, Bangladesh
                </p>
                <p className="text-sm text-muted-foreground">
                  May 2017 - Dec 2018
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Graduated with Distinction (Cum Laude)
              </p>
              <p className="mt-2 text-muted-foreground">
                <strong>Thesis:</strong> Word Sense Disambiguation of Bengali
                Words using FP-Growth Algorithm
              </p>
              <p className="text-muted-foreground">
                <strong>Advisor:</strong> Dr. Mahady Hasan
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-start gap-4">
              <GraduationCap className="h-10 w-10 text-primary mt-1 flex-shrink-0" />
              <div>
                <CardTitle className="text-xl">
                  B.Sc in Computer Science and Engineering
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  BRAC University (BRACU) - Dhaka, Bangladesh
                </p>
                <p className="text-sm text-muted-foreground">
                  Jan 2013 - Apr 2017
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Graduated with Highest Distinction (Summa Cum Laude)
              </p>
              <p className="mt-2 text-muted-foreground">
                <strong>Thesis:</strong> Exploring Deep Features: Deeper Fully
                Convolutional Neural Network for Image Segmentation
              </p>
              <p className="text-muted-foreground">
                <strong>Advisor:</strong> Mr. Moin Mostakim
              </p>
              <p className="mt-2 text-muted-foreground font-medium">
                Achieved Vice Chancellor&apos;s Award for Academic Excellence 6
                times.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section id="certifications" className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          Certifications & Training
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <Card key={index} className="shadow-md">
              <CardHeader className="flex flex-row items-start gap-3">
                <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <CardTitle className="text-lg">{cert.title}</CardTitle>
                  <CardDescription>{cert.institution}</CardDescription>
                  {cert.date && (
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center">
                      <CalendarCheck2 className="h-3 w-3 mr-1" />
                      {cert.date}
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{cert.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
