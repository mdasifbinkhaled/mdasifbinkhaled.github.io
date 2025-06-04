import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BookCopy,
  Brain,
  Code2,
  Calculator,
  BookOpen,
  Database,
  Server,
  Users,
  Group,
  Mic2,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Teaching Portfolio',
  description: `${siteConfig.author}'s teaching philosophy, experience with Outcome-Based Education (OBE), and list of courses taught. ${siteConfig.description}`,
};

const coursesTaughtIUB = [
  {
    id: 'iub-cse101',
    title: 'Introduction to Programming',
    icon: Code2,
    description: 'Fundamentals of programming concepts and problem-solving.',
  },
  {
    id: 'iub-cse201',
    title: 'Algorithms',
    icon: Brain,
    description: 'Design and analysis of algorithms and data structures.',
  },
  {
    id: 'iub-cse203',
    title: 'Data Structures',
    icon: Database,
    description: 'Implementation and application of common data structures.',
  },
  {
    id: 'iub-cse205',
    title: 'Discrete Mathematics',
    icon: Calculator,
    description: 'Mathematical foundations for computer science.',
  },
  {
    id: 'iub-cse303',
    title: 'Numerical Methods',
    icon: Calculator,
    description: 'Computational techniques for solving mathematical problems.',
  },
  {
    id: 'iub-cse401',
    title: 'Fundamentals of Computer System',
    icon: Server,
    description: 'Core concepts of computer architecture and systems.',
  },
  {
    id: 'iub-cse403',
    title: 'Finite Automata and Computability',
    icon: BookOpen,
    description: 'Theory of computation and formal languages.',
  },
];

const coursesTaughtBRACU = [
  {
    id: 'bracu-cg-lab',
    title: 'Computer Graphics Lab',
    icon: Code2,
    description: 'Practical application of computer graphics principles.',
  },
  {
    id: 'bracu-nm-lab',
    title: 'Numerical Methods Lab',
    icon: Calculator,
    description: 'Hands-on numerical computation exercises.',
  },
  {
    id: 'bracu-cd-lab',
    title: 'Compiler Design Lab',
    icon: Brain,
    description: 'Implementation of compiler components.',
  },
  {
    id: 'bracu-android-lab',
    title: 'Android Development Lab',
    icon: Code2,
    description: 'Building mobile applications for Android.',
  },
];

export default function TeachingPage() {
  return (
    <div className="space-y-16">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          My Teaching Approach
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Fostering a dynamic and engaging learning environment through
          Outcome-Based Education and practical application.
        </p>
      </header>

      <section id="teaching-philosophy">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">
              Teaching Philosophy & Outcome-Based Education (OBE)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            <Image
              src="https://placehold.co/800x400.png"
              alt="Engaging teaching environment with students"
              width={800}
              height={400}
              className="rounded-md mb-6 object-cover"
              data-ai-hint="classroom lecture students"
            />
            <p>
              My teaching philosophy is centered on creating an inclusive,
              interactive, and stimulating learning experience. I strive to
              empower students to ask critical questions, explore complex
              concepts deeply, and bridge the gap between theoretical knowledge
              and practical application. A cornerstone of my approach is
              Outcome-Based Education (OBE), which emphasizes clearly defined
              learning objectives and measures student success by their ability
              to achieve these outcomes.
            </p>
            <p>
              In my courses, I integrate a variety of OBE strategies, such as
              active learning techniques, project-based assignments that mirror
              real-world challenges, and continuous, constructive feedback
              mechanisms. My ultimate goal extends beyond merely imparting
              knowledge; I aim to cultivate critical thinking, robust
              problem-solving capabilities, and a lifelong passion for learning
              in every student. I am committed to preparing them not only for
              successful careers but also to be adaptable, innovative, and
              responsible contributors to society.
            </p>
            <p>
              I have received comprehensive training in implementing OBE
              frameworks, evidenced by certifications from the Board of
              Accreditation for Engineering and Technical Education (BAETE).
              This training has equipped me to design courses with clear,
              measurable outcomes and develop effective assessment strategies
              that genuinely reflect student comprehension and achievement.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="courses-taught">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Courses Taught
        </h2>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-center mb-6 text-foreground">
            Independent University, Bangladesh (IUB)
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {coursesTaughtIUB.map(course => {
              const IconComponent = course.icon;
              return (
                <Card
                  key={course.id}
                  className="shadow-md hover:shadow-lg transition-shadow flex flex-col"
                >
                  <CardHeader className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                    </div>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full mt-auto"
                      disabled
                    >
                      Course Materials (Coming Soon)
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-center mb-6 text-foreground">
            BRAC University (BRACU) - Adjunct Lecturer
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {' '}
            {/* Adjusted for 4 items */}
            {coursesTaughtBRACU.map(course => {
              const IconComponent = course.icon;
              return (
                <Card
                  key={course.id}
                  className="shadow-md hover:shadow-lg transition-shadow flex flex-col"
                >
                  <CardHeader className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                    </div>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full mt-auto"
                      disabled
                    >
                      Lab Materials (Coming Soon)
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="teaching-assistant-experience" className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Teaching Assistant Experience
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-start gap-3">
              <Users className="h-8 w-8 text-primary mt-1" />
              <div>
                <CardTitle className="text-xl">
                  Undergraduate Teaching Assistant
                </CardTitle>
                <CardDescription>
                  BRAC University • May 2015 - Apr 2017
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>
                  Appointed 6 times to assist students in learning
                  object-oriented programming (OOP) in Java.
                </li>
                <li>
                  Provided academic feedback and helped students with complex
                  concepts and problem-solving.
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-start gap-3">
              <Group className="h-8 w-8 text-primary mt-1" />
              <div>
                <CardTitle className="text-xl">
                  Graduate Teaching Assistant
                </CardTitle>
                <CardDescription>
                  Independent University, Bangladesh • May 2017 - Jun 2017
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>
                  Provided academic support to student groups to enhance their
                  understanding of course material.
                </li>
                <li>
                  Offered guidelines for related activities and decision-making
                  processes.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="workshops-seminars">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Workshops & Seminars Conducted/Participated
        </h2>
        <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-start gap-3">
              <Mic2 className="h-8 w-8 text-primary mt-1" />
              <div>
                <CardTitle className="text-xl">
                  Instructor - Automate Your Day with Python Workshops
                </CardTitle>
                <CardDescription>
                  Independent University, Bangladesh • Autumn 2023 & Spring 2024
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Conducted hands-on workshops to teach Python automation
                techniques to students and faculty members, focusing on
                practical applications that can improve productivity and
                streamline routine tasks.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-start gap-3">
              <BookOpen className="h-8 w-8 text-primary mt-1" />
              <div>
                <CardTitle className="text-xl">
                  Participant - Preparation of Self-Assessment Report (SAR) for
                  BAC Accreditation Workshop
                </CardTitle>
                <CardDescription>
                  Institutional Quality Assurance Cell (IQAC), IUB • Oct 2024
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Participated in a workshop on SAR preparation, course file
                management, and accreditation requirements for PSAC members.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-start gap-3">
              <Mic2 className="h-8 w-8 text-primary mt-1" />
              <div>
                <CardTitle className="text-xl">
                  Facilitator - Advanced Micro-controller Programming Workshop
                </CardTitle>
                <CardDescription>
                  Center for Cognitive Skill Enhancement (CCSE), IUB
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Facilitated a workshop focusing on advanced concepts and
                practical applications of micro-controller programming.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-start gap-3">
              <Mic2 className="h-8 w-8 text-primary mt-1" />
              <div>
                <CardTitle className="text-xl">
                  Facilitator - Yes We Can! Workshop
                </CardTitle>
                <CardDescription>
                  Center for Cognitive Skill Enhancement (CCSE), IUB
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Contributed to a workshop aimed at skill enhancement and
                motivation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
