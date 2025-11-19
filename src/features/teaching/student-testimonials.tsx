'use client';

import { studentTestimonials } from '@/shared/lib/data/testimonials';
import type { Testimonial } from '@/shared/types/teaching';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/shared/components/ui/card';
import { Quote, Star } from 'lucide-react';

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="transition-all duration-200 hover:shadow-lg h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
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
        <blockquote className="text-sm text-muted-foreground italic mb-4 flex-1">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <CardDescription className="text-xs border-t pt-4">
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
      className="w-full py-8"
      aria-labelledby="testimonials-heading"
    >
      <h2
        id="testimonials-heading"
        className="text-2xl font-bold text-center mb-8 text-primary"
      >
        Student Feedback
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {studentTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}
