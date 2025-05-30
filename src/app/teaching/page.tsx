import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookCopy, Brain, Code2, Calculator } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Teaching Portfolio',
  description: `Md Asif Bin Khaled's teaching philosophy, experience with Outcome-Based Education (OBE), and list of courses taught. ${siteConfig.description}`,
};

const coursesTaught = [
  { id: 'cse101', title: 'Introduction to Programming', icon: Code2, description: 'Fundamentals of programming concepts and problem-solving.', mdxPath: '/content/teaching/intro-to-programming.mdx' },
  { id: 'cse201', title: 'Algorithms', icon: Brain, description: 'Design and analysis of algorithms and data structures.', mdxPath: '/content/teaching/algorithms.mdx' },
  { id: 'cse203', title: 'Data Structures', icon: BookCopy, description: 'Implementation and application of common data structures.', mdxPath: '/content/teaching/data-structures.mdx' },
  { id: 'cse205', title: 'Discrete Mathematics', icon: Calculator, description: 'Mathematical foundations for computer science.', mdxPath: '/content/teaching/discrete-mathematics.mdx' },
  { id: 'cse303', title: 'Numerical Methods', icon: Calculator, description: 'Computational techniques for solving mathematical problems.', mdxPath: '/content/teaching/numerical-methods.mdx' },
];

export default function TeachingPage() {
  return (
    <div className="space-y-16">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          My Teaching Approach
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Fostering a dynamic and engaging learning environment.
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
          </CardContent>
        </Card>
      </section>

      <section id="courses-taught">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Courses Taught
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
         <p className="text-center mt-8 text-muted-foreground">
          Detailed course pages with MDX content are under development.
        </p>
      </section>
    </div>
  );
}
