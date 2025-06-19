import type { Metadata } from 'next';
import { coursesTaughtIUB } from '@/lib/data/courses';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';
import { Code2, BookOpen, Target, Users, Calendar, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CSE 101 - Introduction to Programming | IUB',
  description: `Detailed information about CSE 101 - Introduction to Programming course taught at IUB by ${siteConfig.author}.`,
};

export default function CSE101Page() {
  const course = coursesTaughtIUB.find(c => c.code === 'CSE 101');
  
  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-12">
      <Breadcrumbs />
      
      <header className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Code2 className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              {course.code} - {course.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {course.institution} • {course.semester} {course.year}
            </p>
          </div>
        </div>
      </header>

      {/* Course Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{course.credits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{course.enrollment}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{course.level}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {course.rating ? `${course.rating}/5.0` : 'N/A'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Details */}
      <section>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Course Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-primary">Course Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{course.description}</p>
              
              <div>
                <h4 className="font-semibold mb-2">Prerequisites</h4>
                <p className="text-sm text-muted-foreground">
                  Basic computer literacy and problem-solving skills
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {course.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-primary">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {course.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Course Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-primary">Course Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {course.topics.map((topic, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">{topic}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-primary">Learning Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {course.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">{outcome}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Course Materials Section */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Course Materials & Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Lecture Materials</h3>
              <p className="text-muted-foreground">
                Lecture slides, notes, and supplementary materials will be uploaded here as the course progresses.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Assignment Guidelines</h3>
              <p className="text-muted-foreground">
                Detailed assignment instructions, submission guidelines, and grading rubrics.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Practice Problems</h3>
              <p className="text-muted-foreground">
                Additional programming exercises and practice problems to reinforce learning.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">External Resources</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Python.org Documentation</Badge>
                <Badge variant="outline">Codecademy Python Course</Badge>
                <Badge variant="outline">GitHub Classroom</Badge>
                <Badge variant="outline">PyCharm IDE</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Student Announcements */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Recent Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-l-primary pl-4">
                <h4 className="font-semibold">Welcome to CSE 101!</h4>
                <p className="text-sm text-muted-foreground">
                  Welcome to Introduction to Programming. Please check the course syllabus and join our online classroom.
                </p>
                <p className="text-xs text-muted-foreground mt-1">Posted: Start of Semester</p>
              </div>
              
              <div className="border-l-4 border-l-blue-500 pl-4">
                <h4 className="font-semibold">Assignment 1 Released</h4>
                <p className="text-sm text-muted-foreground">
                  First programming assignment focusing on basic Python syntax and variables. Due next week.
                </p>
                <p className="text-xs text-muted-foreground mt-1">Posted: Week 2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
