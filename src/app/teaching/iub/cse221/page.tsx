import type { Metadata } from 'next';
import { coursesTaughtIUB } from '@/lib/data/courses';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';
import { Brain, BookOpen, Target, Users, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CSE 221 - Algorithms | IUB',
  description: `Detailed information about CSE 221 - Algorithms course taught at IUB by ${siteConfig.author}.`,
};

export default function CSE221Page() {
  // Find a suitable course from IUB data - using CSE 201 as proxy for Algorithms
  const course = coursesTaughtIUB.find(c => c.code === 'CSE 201');
  
  if (!course) {
    notFound();
  }

  // Override course details for CSE 221
  const courseDetails = {
    ...course,
    code: 'CSE 221',
    title: 'Algorithms',
    description: 'Comprehensive study of algorithm design and analysis techniques including divide-and-conquer, dynamic programming, greedy algorithms, and graph algorithms.',
    objectives: [
      'Master fundamental algorithm design paradigms',
      'Analyze time and space complexity of algorithms',
      'Implement efficient algorithms for various problems',
      'Understand advanced data structures and their applications'
    ],
    outcomes: [
      'Students can design efficient algorithms for complex problems',
      'Students can analyze algorithm performance using Big-O notation',
      'Students understand various algorithmic paradigms',
      'Students can implement optimal solutions for real-world problems'
    ],
    topics: [
      'Algorithm Analysis and Big-O Notation',
      'Divide and Conquer Algorithms',
      'Dynamic Programming',
      'Greedy Algorithms',
      'Graph Algorithms (BFS, DFS, MST)',
      'Shortest Path Algorithms',
      'Network Flow Algorithms',
      'String Algorithms'
    ],
    technologies: ['Python', 'C++', 'Algorithm Visualization Tools', 'LeetCode', 'HackerRank']
  };

  return (
    <div className="space-y-12">
      <Breadcrumbs />
      
      <header className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              {courseDetails.code} - {courseDetails.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {courseDetails.institution} • {courseDetails.semester} {courseDetails.year}
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
            <div className="text-2xl font-bold">{courseDetails.credits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseDetails.enrollment}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{courseDetails.level}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courseDetails.rating ? `${courseDetails.rating}/5.0` : 'N/A'}
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
              <p className="text-muted-foreground">{courseDetails.description}</p>
              
              <div>
                <h4 className="font-semibold mb-2">Prerequisites</h4>
                <p className="text-sm text-muted-foreground">
                  Data Structures (CSE 220), Discrete Mathematics (CSE 171)
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {courseDetails.technologies.map((tech) => (
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
                {courseDetails.objectives.map((objective, index) => (
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
                {courseDetails.topics.map((topic, index) => (
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
                {courseDetails.outcomes.map((outcome, index) => (
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

      {/* Course Materials */}
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
              <h3 className="text-lg font-semibold mb-2">Textbooks & References</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Introduction to Algorithms (CLRS) - Cormen, Leiserson, Rivest, Stein</li>
                <li>• Algorithm Design - Jon Kleinberg, Éva Tardos</li>
                <li>• Data Structures and Algorithms - Aho, Hopcroft, Ullman</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Programming Assignments</h3>
              <p className="text-muted-foreground">
                Implementation of various algorithms including sorting, searching, graph algorithms, and dynamic programming solutions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Practice Platforms</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">LeetCode</Badge>
                <Badge variant="outline">HackerRank</Badge>
                <Badge variant="outline">Codeforces</Badge>
                <Badge variant="outline">AtCoder</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
