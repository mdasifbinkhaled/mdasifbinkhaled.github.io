import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookCopy, Brain, Code2, Calculator, BookOpen, Database, Server } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Teaching Portfolio',
  description: `Md Asif Bin Khaled's teaching philosophy, experience with Outcome-Based Education (OBE), and list of courses taught. ${siteConfig.description}`,
};

const coursesTaught = [
  { id: 'cse101', title: 'Introduction to Programming', icon: Code2, description: 'Fundamentals of programming concepts and problem-solving.', mdxPath: '/content/teaching/intro-to-programming.mdx' },
  { id: 'cse201', title: 'Algorithms', icon: Brain, description: 'Design and analysis of algorithms and data structures.', mdxPath: '/content/teaching/algorithms.mdx' },
  { id: 'cse203', title: 'Data Structures', icon: Database, description: 'Implementation and application of common data structures.', mdxPath: '/content/teaching/data-structures.mdx' },
  { id: 'cse205', title: 'Discrete Mathematics', icon: Calculator, description: 'Mathematical foundations for computer science.', mdxPath: '/content/teaching/discrete-mathematics.mdx' },
  { id: 'cse303', title: 'Numerical Methods', icon: Calculator, description: 'Computational techniques for solving mathematical problems.', mdxPath: '/content/teaching/numerical-methods.mdx' },
  { id: 'cse401', title: 'Fundamentals of Computer System', icon: Server, description: 'Core concepts of computer architecture and systems.', mdxPath: '/content/teaching/computer-systems.mdx' },
  { id: 'cse403', title: 'Finite Automata and Computability', icon: BookOpen, description: 'Theory of computation and formal languages.', mdxPath: '/content/teaching/automata.mdx' },
];

export default function TeachingPage() {
  return (
    <div className="space-y-16">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          My Teaching Approach
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Fostering a dynamic and engaging learning environment through Outcome-Based Education.
        </p>
      </header>

      <section id="teaching-philosophy">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Teaching Philosophy & OBE</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            <Image 
              src="https://placehold.co/800x400.png" 
              alt="Teaching environment" 
              width={800} 
              height={400} 
              className="rounded-md mb-6 object-cover"
              data-ai-hint="classroom lecture"
            />
            <p>
              My teaching philosophy centers on creating an inclusive and interactive learning experience where students feel empowered to ask questions, explore concepts deeply, and connect theory with practice. I am a strong proponent of Outcome-Based Education (OBE), which emphasizes clear learning objectives and measures student success based on the attainment of these outcomes.
            </p>
            <p>
              In my courses, I integrate various OBE strategies, including active learning techniques, project-based assignments, and continuous feedback mechanisms. My goal is not just to impart knowledge, but to cultivate critical thinking, problem-solving abilities, and a lifelong passion for learning in my students. I believe in preparing them not only for their careers but also to be adaptable and innovative contributors to society.
            </p>
            <p>
              I have received extensive training in implementing OBE frameworks through certifications from the Board of Accreditation for Engineering and Technical Education (BAETE). This training has enabled me to design courses with clear, measurable outcomes and effective assessment strategies that genuinely reflect student achievement and understanding.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="courses-taught">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Courses Taught
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coursesTaught.map((course) => {
            const IconComponent = course.icon;
            return (
              <Card key={course.id} className="shadow-md hover:shadow-lg transition-shadow flex flex-col">
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
                  {/* For now, links are disabled as MDX pages are not implemented yet */}
                  <Button variant="outline" className="w-full mt-auto" disabled>
                    View Course Details (Coming Soon)
                  </Button>
                  {/* <Link href={`/teaching/${course.id}`} passHref>
                    <Button variant="outline" className="w-full mt-auto">View Course Details</Button>
                  </Link> */}
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-6 text-primary">Teaching Assistant Experience</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Undergraduate Teaching Assistant</CardTitle>
                <CardDescription>BRAC University, May 2015 - April 2017</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Appointed 6 times to assist students in learning object-oriented programming (OOP) in Java</li>
                  <li>Provided academic feedback and helped students with complex concepts</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Graduate Teaching Assistant</CardTitle>
                <CardDescription>Independent University, Bangladesh, May 2017 - June 2017</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Provided academic support to student groups to enhance their understanding of course material</li>
                  <li>Helped with guidelines for related activities and decision making</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="pedagogical-approach">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Pedagogical Approach
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Active Learning Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                I implement various active learning techniques including problem-based learning, flipped classroom approaches, and collaborative coding exercises. These strategies help students engage more deeply with the material and develop practical skills they can apply beyond the classroom.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Assessment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                My assessment approach goes beyond traditional exams to include project portfolios, peer evaluations, and real-world problem-solving tasks. I believe diverse assessment methods provide a more comprehensive view of student capabilities and help develop the varied skills needed in the technology industry.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="workshops-seminars">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Workshops & Seminars
        </h2>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Automate Your Day with Python Workshops</CardTitle>
            <CardDescription>Independent University, Bangladesh, Autumn 2023 & Spring 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Conducted hands-on workshops to teach Python automation techniques to students and faculty members, focusing on practical applications that can improve productivity and streamline routine tasks.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}