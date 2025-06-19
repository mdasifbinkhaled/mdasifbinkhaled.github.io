'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Users, 
  Clock, 
  BookOpen, 
  Star, 
  Download,
  Calendar,
  MapPin,
  FileText,
  Video,
  TrendingUp
} from 'lucide-react'

interface CourseRating {
  overall: number
  teaching: number
  content: number
  organization: number
  responses: number
}

interface CourseMaterial {
  syllabus?: string
  slides?: string[]
  assignments?: string[]
  recordings?: string[]
  textbook?: string
  resources?: Array<{ name: string; url: string; type: string }>
}

interface ComprehensiveCourse {
  id: string
  code: string
  title: string
  semester: string
  year: number
  level: 'undergraduate' | 'graduate' | 'phd'
  credits: number
  enrollment: {
    current: number
    capacity: number
  }
  schedule: {
    days: string[]
    time: string
    location: string
  }
  description: string
  learningOutcomes: string[]
  topics: string[]
  prerequisites?: string[]
  materials: CourseMaterial
  ratings?: CourseRating
  achievements?: string[]
  featured?: boolean
}

export function ComprehensiveCourseCard({ course }: { course: ComprehensiveCourse }) {
  const getLevelStyle = (level: string) => {
    const styles = {
      undergraduate: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      graduate: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      phd: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    }
    return styles[level as keyof typeof styles] || styles.undergraduate
  }

  const enrollmentPercentage = (course.enrollment.current / course.enrollment.capacity) * 100

  return (
    <Card className={`
      transition-all duration-200 hover:shadow-lg group
      ${course.featured ? 'ring-2 ring-primary/20 bg-primary/5' : ''}
    `}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Course Metadata */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className={getLevelStyle(course.level)}>
                {course.level.toUpperCase()}
              </Badge>
              <Badge variant="outline" className="font-mono">
                {course.code}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {course.semester} {course.year}
              </Badge>
              {course.featured && (
                <Badge variant="default" className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Featured
                </Badge>
              )}
            </div>

            <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
              {course.title}
            </CardTitle>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm mb-3">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{course.enrollment.current}/{course.enrollment.capacity}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>{course.credits} credits</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{course.schedule.time}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{course.schedule.location}</span>
              </div>
            </div>
          </div>
          
          {/* Rating Display */}
          {course.ratings && (
            <div className="text-center">
              <div className="flex items-center gap-1 text-yellow-500 mb-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold">{course.ratings.overall.toFixed(1)}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {course.ratings.responses} reviews
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {course.description}
        </p>

        {/* Enrollment Progress */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Enrollment</span>
            <span className="text-sm text-muted-foreground">
              {enrollmentPercentage.toFixed(0)}% full
            </span>
          </div>
          <Progress value={enrollmentPercentage} className="h-2" />
        </div>

        {/* Learning Outcomes */}
        {course.learningOutcomes.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Learning Outcomes</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {course.learningOutcomes.slice(0, 3).map((outcome, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{outcome}</span>
                </li>
              ))}
              {course.learningOutcomes.length > 3 && (
                <li className="text-xs text-muted-foreground">
                  +{course.learningOutcomes.length - 3} more outcomes...
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Course Topics */}
        <div>
          <h4 className="text-sm font-medium mb-2">Topics Covered</h4>
          <div className="flex flex-wrap gap-1">
            {course.topics.slice(0, 6).map(topic => (
              <Badge key={topic} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
            {course.topics.length > 6 && (
              <Badge variant="outline" className="text-xs">
                +{course.topics.length - 6} more
              </Badge>
            )}
          </div>
        </div>

        {/* Prerequisites */}
        {course.prerequisites && course.prerequisites.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-1">Prerequisites</h4>
            <div className="flex flex-wrap gap-1">
              {course.prerequisites.map(prereq => (
                <Badge key={prereq} variant="secondary" className="text-xs">
                  {prereq}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {course.achievements && course.achievements.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Achievements
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {course.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Detailed Ratings */}
        {course.ratings && (
          <div>
            <h4 className="text-sm font-medium mb-2">Student Feedback</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span>Teaching Quality:</span>
                <span className="font-medium">{course.ratings.teaching.toFixed(1)}/5</span>
              </div>
              <div className="flex justify-between">
                <span>Content Quality:</span>
                <span className="font-medium">{course.ratings.content.toFixed(1)}/5</span>
              </div>
              <div className="flex justify-between">
                <span>Organization:</span>
                <span className="font-medium">{course.ratings.organization.toFixed(1)}/5</span>
              </div>
              <div className="flex justify-between">
                <span>Overall:</span>
                <span className="font-medium">{course.ratings.overall.toFixed(1)}/5</span>
              </div>
            </div>
          </div>
        )}

        {/* Course Materials */}
        <div className="flex flex-wrap gap-2">
          {course.materials.syllabus && (
            <Button variant="outline" size="sm" asChild>
              <a href={course.materials.syllabus} target="_blank" rel="noopener noreferrer">
                <FileText className="w-4 h-4 mr-1" />
                Syllabus
              </a>
            </Button>
          )}
          {course.materials.slides && course.materials.slides.length > 0 && (
            <Button variant="outline" size="sm" asChild>
              <a href={course.materials.slides[0]} target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-1" />
                Slides
              </a>
            </Button>
          )}
          {course.materials.assignments && course.materials.assignments.length > 0 && (
            <Button variant="outline" size="sm" asChild>
              <a href={course.materials.assignments[0]} target="_blank" rel="noopener noreferrer">
                <FileText className="w-4 h-4 mr-1" />
                Assignments
              </a>
            </Button>
          )}
          {course.materials.recordings && course.materials.recordings.length > 0 && (
            <Button variant="outline" size="sm" asChild>
              <a href={course.materials.recordings[0]} target="_blank" rel="noopener noreferrer">
                <Video className="w-4 h-4 mr-1" />
                Recordings
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
