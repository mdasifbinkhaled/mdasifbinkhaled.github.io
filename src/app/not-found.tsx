import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { GraduationCap, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="mb-8 text-primary">
        <GraduationCap className="h-24 w-24 mx-auto" />
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary mb-4">
        404 - Page Not Found
      </h1>

      <p className="text-xl text-muted-foreground max-w-md mb-8">
        Oops! The academic resource you're looking for couldn't be located in
        our repository.
      </p>

      <Button size="lg" asChild>
        <Link href="/">
          <Home className="mr-2 h-5 w-5" /> Return to Homepage
        </Link>
      </Button>
    </div>
  );
}
