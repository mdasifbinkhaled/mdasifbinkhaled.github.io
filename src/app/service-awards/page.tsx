import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  Users,
  ShieldCheck,
  Medal,
  Trophy,
  Star,
  CalendarDays,
} from 'lucide-react';
import { siteConfig } from '@/shared/config/site';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Service & Awards',
  description: `${siteConfig.author}'s honors, awards, and contributions to professional service and academic committees. ${siteConfig.description}`,
};

const honorsAndAwards = [
  {
    title: "Vice Chancellor's Award for Academic Excellence (Spring 2016)",
    institution: 'BRAC University',
    date: '2016',
    icon: Trophy,
  },
  {
    title: 'Best Intern Award, Research & Development',
    institution: 'Tech Geeks Ltd.',
    date: '2016',
    icon: Star,
  },
  {
    title: "Vice Chancellor's Award for Academic Excellence (Fall 2015)",
    institution: 'BRAC University',
    date: '2015',
    icon: Trophy,
  },
  {
    title: "Vice Chancellor's Award for Academic Excellence (Spring 2015)",
    institution: 'BRAC University',
    date: '2015',
    icon: Trophy,
  },
  {
    title: 'Top Ten Contestant, Programming Contest 2015',
    institution: 'BRAC IT',
    date: '2015',
    icon: Medal,
  },
  {
    title: "Vice Chancellor's Award for Academic Excellence (Fall 2014)",
    institution: 'BRAC University',
    date: '2014',
    icon: Trophy,
  },
  {
    title: "Vice Chancellor's Award for Academic Excellence (Summer 2014)",
    institution: 'BRAC University',
    date: '2014',
    icon: Trophy,
  },
  {
    title: "Vice Chancellor's Award for Academic Excellence (Spring 2014)",
    institution: 'BRAC University',
    date: '2014',
    icon: Trophy,
  },
];

const professionalServiceAndCommittees = [
  {
    role: 'Faculty Mentor',
    organization: 'IEEE Computer Society Student Branch, IUB',
    duration: 'Mar 2019 - Present',
    description:
      'Mentoring students and guiding them through various club activities. Organized and managed tech fests, including the Intra IUB Tech Fest.',
    icon: Users,
  },
  {
    role: 'Judge & Organizer – Intra IUB Tech Fest',
    organization: 'Department of Computer Science & Engineering, IUB',
    duration: 'Apr 2019 - Dec 2022',
    description:
      'Judged and organized 5 Tech Fest events spanning Spring, Summer, and Autumn semesters. Coordinated event logistics and ensured active student participation.',
    icon: ShieldCheck,
  },
  {
    role: 'Mentor',
    organization: 'National Hackathon on Frontier Technologies, iDEA',
    duration: 'Feb 2020',
    description:
      'Mentored participants, providing guidance on innovation and design. Supported teams during the hackathon by offering feedback and technical insights.',
    icon: Users,
  },
  {
    role: 'Vice President',
    organization: 'BRAC University Computer Club (BUCC)',
    duration: 'Jun 2016 - Jun 2017',
    description:
      'Led multiple committees and coordinated between executive members and club members. Managed a website project for the Bangladesh Business & Disability Network (BBDN).',
    icon: Users,
  },
  {
    role: 'Assistant Director – Press Release (PR)',
    organization: 'BRAC University Computer Club (BUCC)',
    duration: 'Nov 2015 - Jun 2016',
    description:
      'Worked in writing and publishing press materials to promote club activities and events. Participated in coverage of diverse club activities for better documentation.',
    icon: Users,
  },
  {
    role: 'Campus Ambassador – Game Jam, White Board',
    organization: 'Grameenphone (at BRAC University)',
    duration: 'Jul 2017',
    description:
      'Promoted the Game Jam event and represented it at BRAC University to engage students. Facilitated student participation and collaboration with event organizers.',
    icon: Users,
  },
  {
    role: 'Campus Ambassador – GDG Dhaka',
    organization: 'Google Developer Group Dhaka (at BRAC University)',
    duration: 'Jun 2016 - Jun 2017',
    description:
      'Promoted GDG Dhaka and facilitated student participation in events. Led workshops on Firebase Integration (Aug. 2016) and TensorFlow Basics (Jun. 2016).',
    icon: Users,
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
          Recognitions for academic excellence, contributions to the community,
          and professional affiliations.
        </p>
      </header>

      <section id="honors-awards">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Honors & Awards
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {honorsAndAwards.map((award, index) => {
            const Icon = award.icon;
            return (
              <Card
                key={index}
                className="shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{award.title}</CardTitle>
                    <CardDescription>{award.institution}</CardDescription>
                    {award.date && (
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center">
                        <CalendarDays className="h-3 w-3 mr-1" />
                        {award.date}
                      </p>
                    )}
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
        <div className="mt-12 flex justify-center">
          <Image
            src="https://placehold.co/700x400.png"
            alt="Awards and recognition collage"
            width={700}
            height={400}
            className="rounded-lg shadow-xl object-cover"
          />
        </div>
      </section>

      <section id="professional-service">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Professional Service & Committees
        </h2>
        <div className="space-y-6">
          {professionalServiceAndCommittees.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{service.role}</CardTitle>
                    <CardDescription>{service.organization}</CardDescription>
                    <p className="text-sm text-muted-foreground mt-1">
                      {service.duration}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
