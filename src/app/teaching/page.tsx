
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Group, Mic2, BookOpen } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { SimpleCourseCard } from '@/components/teaching/simple-course-card';
import { coursesTaughtIUB, coursesTaughtBRACU } from '@/lib/data/courses';

export const metadata: Metadata = {
  title: 'Teaching Portfolio',
  description: `${siteConfig.author}'s teaching philosophy, experience with Outcome-Based Education (OBE), and list of courses taught. ${siteConfig.description}`,
};


export default function TeachingPage() {
  return (
    <div className="space-y-16">
      <Breadcrumbs />
      
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          My Teaching Approach
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Fostering a dynamic and engaging learning environment through Outcome-Based Education and practical application.
        </p>
      </header>

      <section id="teaching-philosophy">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Teaching Philosophy & Outcome-Based Education (OBE)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            <Image 
              src="https://placehold.co/800x400.png" 
              alt="Engaging teaching environment with students" 
              width={800} 
              height={400} 
              className="rounded-md mb-6 object-cover"
            />
            <p>
              My teaching philosophy is centered on creating an inclusive, interactive, and stimulating learning experience. I strive to empower students to ask critical questions, explore complex concepts deeply, and bridge the gap between theoretical knowledge and practical application. A cornerstone of my approach is Outcome-Based Education (OBE), which emphasizes clearly defined learning objectives and measures student success by their ability to achieve these outcomes.
            </p>
            <p>
              In my courses, I integrate a variety of OBE strategies, such as active learning techniques, project-based assignments that mirror real-world challenges, and continuous, constructive feedback mechanisms. My ultimate goal extends beyond merely imparting knowledge; I aim to cultivate critical thinking, robust problem-solving capabilities, and a lifelong passion for learning in every student. I am committed to preparing them not only for successful careers but also to be adaptable, innovative, and responsible contributors to society.
            </p>
            <p>
              I have received comprehensive training in implementing OBE frameworks, evidenced by certifications from the Board of Accreditation for Engineering and Technical Education (BAETE). This training has equipped me to design courses with clear, measurable outcomes and develop effective assessment strategies that genuinely reflect student comprehension and achievement.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="courses-taught">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Courses Taught
        </h2>
        
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">
            Independent University, Bangladesh (IUB)
          </h3>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            As a Senior Lecturer, I have taught a diverse range of undergraduate courses covering 
            programming fundamentals, algorithms, system design, and mathematical foundations.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {coursesTaughtIUB.map((course) => (
              <SimpleCourseCard 
                key={course.id} 
                course={course}
                showFullDetails={true}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">
            BRAC University (BRACU) - Teaching Assistant
          </h3>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            Laboratory courses where I provided hands-on guidance and practical experience 
            in computer graphics, numerical methods, compiler design, and mobile development.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {coursesTaughtBRACU.map((course) => (
              <SimpleCourseCard 
                key={course.id} 
                course={course}
                showFullDetails={true}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="teaching-assistant-experience" className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">Teaching Assistant Experience</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-md">
              <CardHeader className="flex flex-row items-start gap-3">
                <Users className="h-8 w-8 text-primary mt-1" />
                <div>
                    <CardTitle className="text-xl">Undergraduate Teaching Assistant</CardTitle>
                    <CardDescription>BRAC University • May 2015 - Apr 2017</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Appointed 6 times to assist students in learning object-oriented programming (OOP) in Java.</li>
                  <li>Provided academic feedback and helped students with complex concepts and problem-solving.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader className="flex flex-row items-start gap-3">
                <Group className="h-8 w-8 text-primary mt-1" />
                <div>
                    <CardTitle className="text-xl">Graduate Teaching Assistant</CardTitle>
                    <CardDescription>Independent University, Bangladesh • May 2017 - Jun 2017</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Provided academic support to student groups to enhance their understanding of course material.</li>
                  <li>Offered guidelines for related activities and decision-making processes.</li>
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
                    <CardTitle className="text-xl">Instructor - Automate Your Day with Python Workshops</CardTitle>
                    <CardDescription>Independent University, Bangladesh • Autumn 2023 & Spring 2024</CardDescription>
                  </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Conducted hands-on workshops to teach Python automation techniques to students and faculty members, focusing on practical applications that can improve productivity and streamline routine tasks.
                </p>
              </CardContent>
            </Card>
             <Card className="shadow-md">
              <CardHeader className="flex flex-row items-start gap-3">
                  <BookOpen className="h-8 w-8 text-primary mt-1" />
                  <div>
                    <CardTitle className="text-xl">Participant - Preparation of Self-Assessment Report (SAR) for BAC Accreditation Workshop</CardTitle>
                    <CardDescription>Institutional Quality Assurance Cell (IQAC), IUB • Oct 2024</CardDescription>
                  </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Participated in a workshop on SAR preparation, course file management, and accreditation requirements for PSAC members.
                </p>
              </CardContent>
            </Card>
             <Card className="shadow-md">
              <CardHeader className="flex flex-row items-start gap-3">
                  <Mic2 className="h-8 w-8 text-primary mt-1" />
                  <div>
                    <CardTitle className="text-xl">Facilitator - Advanced Micro-controller Programming Workshop</CardTitle>
                    <CardDescription>Center for Cognitive Skill Enhancement (CCSE), IUB</CardDescription>
                  </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Facilitated a workshop focusing on advanced concepts and practical applications of micro-controller programming.
                </p>
              </CardContent>
            </Card>
             <Card className="shadow-md">
              <CardHeader className="flex flex-row items-start gap-3">
                  <Mic2 className="h-8 w-8 text-primary mt-1" />
                  <div>
                    <CardTitle className="text-xl">Facilitator - Yes We Can! Workshop</CardTitle>
                    <CardDescription>Center for Cognitive Skill Enhancement (CCSE), IUB</CardDescription>
                  </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Contributed to a workshop aimed at skill enhancement and motivation.
                </p>
              </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}
