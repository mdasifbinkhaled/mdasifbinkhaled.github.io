import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Users, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Service & Awards',
  description: `Md Asif Bin Khaled's honors, awards, and contributions to professional service. ${siteConfig.description}`,
};

const honorsAndAwards = [
  { title: "Vice Chancellor's Award for Academic Excellence", institution: "BRAC University", note: "Awarded 6 times for outstanding academic performance." },
  { title: "Best Intern Award", institution: "Tech Geeks Ltd.", note: "Recognized for contributions during internship." },
  // Add more awards here
];

const professionalService = [
  { role: "IEEE Faculty Mentor", organization: "IEEE Student Branch, IUB", description: "Guiding and mentoring student members in their professional and technical development." },
  { role: "Judge & Organizer", organization: "Intra IUB Tech Fest", description: "Evaluating student projects and contributing to the organization of the university's tech festival." },
  { role: "Vice President", organization: "BRAC University Computer Club (BUCC)", description: "Led club activities, organized events, and promoted computer science engagement among students." },
  // Add more service roles here
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
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {honorsAndAwards.map((award, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">{award.title}</CardTitle>
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
        <div className="space-y-8">
          {professionalService.map((service, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  {service.role.includes("IEEE") ? <Users className="h-8 w-8 text-primary" /> : <ShieldCheck className="h-8 w-8 text-primary" />}
                </div>
                <div>
                  <CardTitle className="text-xl">{service.role}</CardTitle>
                  <CardDescription>{service.organization}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
