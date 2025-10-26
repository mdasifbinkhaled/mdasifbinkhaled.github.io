import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import {
  GraduationCap,
  Award,
  CalendarCheck2,
  MapPin,
  Briefcase,
  Target,
  Mail,
  Download,
  BookOpen,
  Users,
  Trophy,
  Brain,
  Radio,
  FlaskConical,
  Heart,
  Code,
  Cpu,
  Wrench,
  Layers,
  Star,
  Medal,
  ShieldCheck,
} from 'lucide-react';
import { siteConfig } from '@/shared/config/site';
import { assetPaths } from '@/shared/config/assets';
import { researchIdentity } from '@/shared/config/researcher-profile';
import { AcademicProfiles } from '@/shared/components/academic-profiles';
import { ExperienceCompact } from '@/shared/components/common/experience-compact';
import {
  professionalExperiences,
  technicalSkills,
} from '@/shared/lib/data/experience';

export const metadata: Metadata = {
  title: 'About Me',
  description: `Learn more about ${siteConfig.author}'s academic journey, research interests, and professional background. ${siteConfig.description}`,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: `About ${siteConfig.author}`,
    description: `Learn more about ${siteConfig.author}'s academic journey, research interests, and professional background.`,
    images: [assetPaths.ogImage],
  },
};

const quickFacts = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'Dhaka, Bangladesh',
  },
  {
    icon: Briefcase,
    label: 'Current Position',
    value: 'Senior Lecturer, IUB',
  },
  {
    icon: Brain,
    label: 'Research Philosophy',
    value: 'Explainable & Trustworthy AI',
  },
  {
    icon: Target,
    label: 'Career Goal',
    value: 'Pursuing PhD Opportunities',
  },
];

const highlights = [
  {
    icon: BookOpen,
    value: '15+',
    label: 'Publications',
  },
  {
    icon: Users,
    value: '1000+',
    label: 'Students Taught',
  },
  {
    icon: Trophy,
    value: '6x',
    label: 'VC Awards',
  },
  {
    icon: FlaskConical,
    value: '4',
    label: 'Research Grants',
  },
];

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
      "Insider's Guide to Systematic Literature Review & Research Paper Writing: A Hands-on Workshop",
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

const honorsAndAwards = [
  {
    title: "Vice Chancellor's Award for Academic Excellence",
    institution: 'BRAC University',
    date: 'Spring 2016',
    icon: Trophy,
  },
  {
    title: "Vice Chancellor's Award for Academic Excellence",
    institution: 'BRAC University',
    date: 'Fall 2015',
    icon: Trophy,
  },
  {
    title: "Vice Chancellor's Award for Academic Excellence",
    institution: 'BRAC University',
    date: 'Spring 2015',
    icon: Trophy,
  },
  {
    title: "Vice Chancellor's Award for Academic Excellence",
    institution: 'BRAC University',
    date: 'Fall 2014',
    icon: Trophy,
  },
  {
    title: "Vice Chancellor's Award for Academic Excellence",
    institution: 'BRAC University',
    date: 'Summer 2014',
    icon: Trophy,
  },
  {
    title: "Vice Chancellor's Award for Academic Excellence",
    institution: 'BRAC University',
    date: 'Spring 2014',
    icon: Trophy,
  },
  {
    title: 'Best Intern Award',
    institution: 'Tech Geeks Ltd.',
    date: 'Sep 2016',
    icon: Star,
  },
  {
    title: 'Top Ten Contestant in Programming Contest',
    institution: 'BRAC IT',
    date: 'Nov 2015',
    icon: Medal,
  },
];

const professionalService = [
  {
    title: 'IEEE Computer Society Faculty Mentor',
    organization: 'Independent University, Bangladesh (IUB)',
    duration: 'Mar 2019 - Present',
    description:
      'Mentoring students in IEEE Computer Society activities and research initiatives.',
    icon: Users,
  },
  {
    title: 'Tech Fest Judge & Organizer',
    organization: 'Independent University, Bangladesh (IUB)',
    duration: 'Apr 2019 - Dec 2022',
    description:
      'Judged and organized 5 tech fest events, fostering innovation and technical skills among students.',
    icon: ShieldCheck,
  },
  {
    title: 'National Hackathon Mentor',
    organization: 'Bangladesh Innovation Forum',
    duration: 'Feb 2020',
    description:
      'Mentored student teams in developing innovative solutions for national challenges.',
    icon: Users,
  },
  {
    title: 'Vice President',
    organization: 'BRAC University Computer Club (BUCC)',
    duration: 'Jun 2016 - Jun 2017',
    description:
      'Led the executive team in organizing workshops, programming contests, and technical events.',
    icon: ShieldCheck,
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-[var(--space-section-md)]">
      {/* Hero Section */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          About {siteConfig.author}
        </h1>
        <p className="mt-[var(--space-card-default)] text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
          My journey in artificial intelligence research and education, from
          curiosity-driven exploration to advancing healthcare through
          transparent AI solutions.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <Button asChild size="lg">
            <Link href={siteConfig.links.cv} target="_blank">
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">
              <Mail className="w-4 h-4 mr-2" />
              Get in Touch
            </Link>
          </Button>
        </div>
      </header>

      {/* Quick Facts */}
      <section>
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickFacts.map((fact, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-background/50 transition-colors"
                >
                  <fact.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      {fact.label}
                    </p>
                    <p className="text-sm font-semibold">{fact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Highlights Stats */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((stat, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-primary/10"
            >
              <CardContent className="pt-6 pb-6">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Research Philosophy Section */}
      <section id="research-philosophy">
        <Card className="shadow-lg border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              Research Philosophy
            </CardTitle>
            <CardDescription className="text-base">
              {researchIdentity.philosophy.statement}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {researchIdentity.philosophy.vision}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {researchIdentity.philosophy.approach}
            </p>

            {/* Research Areas */}
            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-3">
                Primary Research Areas
              </h3>
              <div className="grid gap-3 md:grid-cols-3">
                {researchIdentity.primaryAreas.map((area) => (
                  <div
                    key={area.id}
                    className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="font-medium text-sm">{area.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {area.keywords.join(' • ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Profiles */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold mb-3">Academic Profiles</h3>
              <AcademicProfiles variant="grid" showLabels={true} />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Biography Section */}
      <section id="narrative">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">My Journey & Vision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            <div className="md:float-right md:ml-6 mb-4 md:mb-0 md:w-1/3">
              <Image
                src={assetPaths.profile}
                alt={`${siteConfig.author} - professional`}
                width={400}
                height={500}
                className="rounded-lg shadow-xl object-cover w-full"
                loading="lazy"
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

      {/* Education */}
      <section id="education">
        <h2 className="text-3xl font-bold text-center mb-[var(--space-section-sm)] text-primary">
          Education
        </h2>
        <div className="grid gap-[var(--space-card-lg)] md:grid-cols-2">
          <Card className="shadow-md hover:shadow-xl transition-all duration-300">
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
          <Card className="shadow-md hover:shadow-xl transition-all duration-300">
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

      {/* Professional Experience */}
      <section id="experience">
        <h2 className="text-3xl font-bold text-center mb-[var(--space-section-sm)] text-primary">
          Professional Experience
        </h2>
        <ExperienceCompact experiences={professionalExperiences} />
      </section>

      {/* Technical Skills */}
      <section id="skills">
        <h2 className="text-3xl font-bold text-center mb-[var(--space-section-sm)] text-primary">
          Technical Skills
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {technicalSkills.map((skillGroup, index) => {
            const iconMap: Record<string, typeof Code> = {
              'Programming & Frameworks': Code,
              'Data Analysis & Visualization': Cpu,
              'Tools & Software': Wrench,
              'Teaching & Pedagogy': Users,
              'Project Management': Briefcase,
              'Soft Skills': Heart,
              Languages: BookOpen,
            };
            const IconComponent = iconMap[skillGroup.category] || Layers;

            return (
              <Card
                key={index}
                className="shadow-md hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <IconComponent className="w-5 h-5 text-primary" />
                    {skillGroup.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Beyond Academia & Service */}
      <section id="beyond-academia">
        <Card className="border-primary/20 bg-gradient-to-br from-accent/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Radio className="w-6 h-6 text-primary" />
              Beyond Academia & Service
            </CardTitle>
            <CardDescription>
              Personal interests and professional service contributions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Personal Interests */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                <Radio className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">
                    Amateur Radio Operator
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Licensed by BTRC, Bangladesh. Passionate about radio
                    communications and emergency response networks.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                <Heart className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">
                    Community Engagement
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Actively mentoring students and contributing to academic
                    community development through workshops and seminars.
                  </p>
                </div>
              </div>

              {/* Professional Service */}
              <div className="pt-4 mt-4 border-t border-border/50">
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Professional Service
                </h3>
                <div className="space-y-3">
                  {professionalService.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-background/50"
                    >
                      <service.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">
                          {service.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {service.organization} • {service.duration}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Certifications */}
      <section id="certifications">
        <h2 className="text-3xl font-bold text-center mb-[var(--space-section-sm)] text-primary">
          Certifications & Training
        </h2>
        <div className="grid gap-[var(--space-card-default)] md:grid-cols-2">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-lg transition-all duration-300"
            >
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

      {/* Honors & Awards */}
      <section id="honors-awards">
        <h2 className="text-3xl font-bold text-center mb-[var(--space-section-sm)] text-primary">
          Honors & Awards
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {honorsAndAwards.map((award, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="flex flex-row items-start gap-3">
                <award.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <CardTitle className="text-base">{award.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {award.institution}
                  </CardDescription>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center">
                    <CalendarCheck2 className="h-3 w-3 mr-1" />
                    {award.date}
                  </p>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section>
        <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
          <CardContent className="pt-8 pb-8 text-center">
            <h3 className="text-2xl font-bold mb-3 text-primary">
              Let&apos;s Connect
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              I&apos;m always open to discussing research collaborations, PhD
              opportunities, or speaking engagements. Feel free to reach out!
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button asChild size="lg">
                <Link href="/contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Me
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link
                  href={siteConfig.links.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Scholar
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link
                  href={siteConfig.links.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ORCID
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
