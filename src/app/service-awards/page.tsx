import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Users, ShieldCheck, Medal, Trophy } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Service & Awards',
  description: `Md Asif Bin Khaled's honors, awards, and contributions to professional service. ${siteConfig.description}`,
};

const honorsAndAwards = [
  { title: "Vice Chancellor's Award for Academic Excellence (Spring 2016)", institution: "BRAC University", note: "Awarded for outstanding academic performance." },
  { title: "Best Intern Award", institution: "Tech Geeks Ltd.", note: "Recognized for contributions during research internship in R&D." },
  { title: "Vice Chancellor's Award for Academic Excellence (Fall 2015)", institution: "BRAC University", note: "Awarded for outstanding academic performance." },
  { title: "Vice Chancellor's Award for Academic Excellence (Spring 2015)", institution: "BRAC University", note: "Awarded for outstanding academic performance." },
  { title: "Top Ten Contestant, Programming Contest 2015", institution: "BRAC IT", note: "Recognized for programming skills in a competitive environment." },
  { title: "Vice Chancellor's Award for Academic Excellence (Fall 2014)", institution: "BRAC University", note: "Awarded for outstanding academic performance." },
];

const professionalService = [
  { 
    role: "IEEE Computer Society Student Branch Faculty Mentor", 
    organization: "Independent University, Bangladesh", 
    duration: "Mar 2019 - Present",
    description: "Mentoring students and guiding them through various club activities. Organizing and managing tech fests, including the Intra IUB Tech Fest." 
  },
  { 
    role: "Judge & Organizer - Intra IUB Tech Fest", 
    organization: "Department of Computer Science & Engineering, IUB", 
    duration: "Apr 2019 - Dec 2022",
    description: "Judged and organized 5 Tech Fest events spanning Spring, Summer, and Autumn semesters. Coordinated event logistics and ensured active student participation." 
  },
  { 
    role: "Mentor - National Hackathon on Frontier Technologies", 
    organization: "iDEA", 
    duration: "Feb 2020",
    description: "Mentored participants, providing guidance on innovation and design. Supported teams during the hackathon by offering feedback and technical insights." 
  },
];

const committeeAffiliations = [
  {
    role: "Vice President", 
    organization: "BRAC University Computer Club (BUCC)", 
    duration: "Jun 2016 - Jun 2017",
    description: "Led multiple committees and coordinated between executive members and club members. Managed a website project for the Bangladesh Business & Disability Network (BBDN)."
  },
  {
    role: "Assistant Director - Press Release (PR)", 
    organization: "BRAC University Computer Club (BUCC)", 
    duration: "Nov 2015 - Jun 2016",
    description: "Worked in writing and publishing press materials to promote club activities and events. Participated in coverage of diverse club activities for better documentation."
  },
  {
    role: "Campus Ambassador - Game Jam, White Board", 
    organization: "Grameenphone", 
    duration: "Jul 2017",
    description: "Promoted the Game Jam event and represented it at BRAC University to engage students. Facilitated student participation and collaboration with event organizers."
  },
  {
    role: "Campus Ambassador - GDG Dhaka", 
    organization: "Google Developer Group Dhaka", 
    duration: "Jun 2016 - Jun 2017",
    description: "Promoted GDG Dhaka and facilitated student participation in events. Led workshops on Firebase Integration (Aug. 2016) and TensorFlow Basics (Jun. 2016)."
  },
];

export default function ServiceAwardsPage() {
  return (
    <div className="space-y-16">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Service & Awards
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Recognitions for academic excellence and contributions to the community.
        </p>
      </header>

      <section id="honors-awards">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Honors & Awards
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {honorsAndAwards.map((award, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  {index % 2 === 0 ? <Trophy className="h-6 w-6 text-primary" /> : <Medal className="h-6 w-6 text-primary" />}
                </div>
                <div>
                  <CardTitle className="text-lg">{award.title}</CardTitle>
                  <CardDescription>{award.institution}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{award.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Image 
            src="https://placehold.co/700x400.png" 
            alt="Awards and recognition collage" 
            width={700} 
            height={400} 
            className="rounded-lg shadow-xl object-cover"
            data-ai-hint="trophies certificates" 
          />
        </div>
      </section>

      <section id="professional-service">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Professional Service
        </h2>
        <div className="space-y-6">
          {professionalService.map((service, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  {service.role.includes("IEEE") ? <Users className="h-6 w-6 text-primary" /> : <ShieldCheck className="h-6 w-6 text-primary" />}
                </div>
                <div>
                  <CardTitle className="text-xl">{service.role}</CardTitle>
                  <CardDescription>{service.organization}</CardDescription>
                  <p className="text-sm text-muted-foreground mt-1">{service.duration}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="committees-affiliations">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Committees & Affiliations
        </h2>
        <div className="space-y-6">
          {committeeAffiliations.map((affiliation, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">{affiliation.role}</CardTitle>
                  <CardDescription>{affiliation.organization}</CardDescription>
                  <p className="text-sm text-muted-foreground mt-1">{affiliation.duration}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{affiliation.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}