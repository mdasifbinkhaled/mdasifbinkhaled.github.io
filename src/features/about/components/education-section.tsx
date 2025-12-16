import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card';
import { GraduationCap } from 'lucide-react';

export function EducationSection() {
  return (
    <section id="education">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">
        Education
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-md hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-start gap-4">
            <GraduationCap className="h-10 w-10 text-primary mt-1 flex-shrink-0" />
            <div>
              <CardTitle className="text-xl">
                M.Sc in Computer Science
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Independent University, Bangladesh (IUB) - Dhaka, Bangladesh
              </p>
              <p className="text-sm text-muted-foreground">
                May 2017 - Dec 2018
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Graduated with Distinction (Cum Laude)
            </p>
            <p className="mt-2 text-muted-foreground">
              <strong>Thesis:</strong> Word Sense Disambiguation of Bengali
              Words using FP-Growth Algorithm
            </p>
            <p className="text-muted-foreground">
              <strong>Advisor:</strong> Dr. Mahady Hasan
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-start gap-4">
            <GraduationCap className="h-10 w-10 text-primary mt-1 flex-shrink-0" />
            <div>
              <CardTitle className="text-xl">
                B.Sc in Computer Science and Engineering
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                BRAC University (BRACU) - Dhaka, Bangladesh
              </p>
              <p className="text-sm text-muted-foreground">
                Jan 2013 - Apr 2017
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Graduated with Highest Distinction (Summa Cum Laude)
            </p>
            <p className="mt-2 text-muted-foreground">
              <strong>Thesis:</strong> Exploring Deep Features: Deeper Fully
              Convolutional Neural Network for Image Segmentation
            </p>
            <p className="text-muted-foreground">
              <strong>Advisor:</strong> Mr. Moin Mostakim
            </p>
            <p className="mt-2 text-muted-foreground font-medium">
              Achieved Vice Chancellor&apos;s Award for Academic Excellence 6
              times.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
