'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/shared/components/ui/card';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  student: string;
  course: string;
  semester: string;
  rating?: number;
}

const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    quote:
      'Clear explanations and practical examples made complex algorithms easy to understand. The hands-on approach really helped solidify the concepts.',
    student: 'Anonymous',
    course: 'CSE 303 - Algorithms',
    semester: 'Fall 2023',
    rating: 5,
  },
  {
    id: 'test-2',
    quote:
      'Good balance of theory and hands-on practice. The assignments were challenging but fair, and office hours were incredibly helpful.',
    student: 'Anonymous',
    course: 'CSE 101 - Introduction to Programming',
    semester: 'Fall 2023',
    rating: 5,
  },
  {
    id: 'test-3',
    quote:
      "The instructor's passion for teaching is evident in every lecture. The structured approach to problem-solving has improved my coding skills significantly.",
    student: 'Anonymous',
    course: 'CSE 201 - Data Structures',
    semester: 'Spring 2024',
    rating: 5,
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="transition-all duration-200 hover:shadow-lg h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-[var(--space-md)]">
          <div className="bg-primary/10 p-2 rounded-full mt-1">
            <Quote className="w-5 h-5 text-primary" />
          </div>
          {testimonial.rating && (
            <div className="flex items-center gap-1 ml-auto">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <blockquote className="text-sm text-muted-foreground italic mb-[var(--space-md)] flex-1">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <CardDescription className="text-xs border-t pt-[var(--space-md)]">
          <div className="font-semibold text-foreground">
            {testimonial.student}
          </div>
          <div>{testimonial.course}</div>
          <div className="text-muted-foreground">{testimonial.semester}</div>
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export function StudentTestimonials() {
  return (
    <section
      className="w-full py-[var(--space-card-lg)]"
      aria-labelledby="testimonials-heading"
    >
      <h2
        id="testimonials-heading"
        className="text-2xl font-bold text-center mb-[var(--space-card-lg)] text-primary"
      >
        Student Feedback
      </h2>
      <div className="grid gap-[var(--space-lg)] md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}
