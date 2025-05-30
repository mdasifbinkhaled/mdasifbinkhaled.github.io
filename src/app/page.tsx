import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { ArrowRight, Download, Newspaper, UserCircle, Rocket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-br from-background to-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
            <Image
              alt="Md Asif Bin Khaled"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last border-4 border-primary shadow-lg"
              height="550"
              src="https://placehold.co/550x550.png"
              data-ai-hint="professional headshot"
              width="550"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                  Md Asif Bin Khaled
                </h1>
                <p className="text-xl text-foreground md:text-2xl">
                  Senior Lecturer & Researcher
                </p>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Enhancing healthcare diagnostics through transparent and trustworthy AI.
                </p>
                <div className="inline-block bg-accent text-accent-foreground px-3 py-1 text-sm rounded-full font-medium my-2 shadow">
                  Open to PhD Opportunities
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/research">
                    Explore Research <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={siteConfig.links.cv} target="_blank" rel="noopener noreferrer">
                    Download CV <Download className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight Cards Section */}
      <section className="w-full py-12 md:py-24 lg:py-28">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-semibold">Latest News</CardTitle>
                <Newspaper className="w-6 h-6 text-primary" />
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Stay updated with my recent activities, publications, and achievements.
                </CardDescription>
                <Button variant="link" asChild className="px-0 mt-2">
                  <Link href="/#news">View Updates <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-semibold">Brief Bio</CardTitle>
                <UserCircle className="w-6 h-6 text-primary" />
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Learn more about my academic journey, background, and mission.
                </CardDescription>
                <Button variant="link" asChild className="px-0 mt-2">
                  <Link href="/about">Read About Me <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-semibold">Core Research</CardTitle>
                <Rocket className="w-6 h-6 text-primary" />
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Discover my primary research interests in XAI and Multimodal AI for healthcare.
                </CardDescription>
                <Button variant="link" asChild className="px-0 mt-2">
                  <Link href="/research">Explore Interests <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Placeholder for News/Updates section if needed later, corresponding to the "Latest News" card */}
      <section id="news" className="w-full py-12 md:py-24 lg:py-28 bg-secondary/20 hidden">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-primary">
            News & Updates
          </h2>
          {/* Content for news items would go here */}
          <p className="text-center text-muted-foreground">Coming soon...</p>
        </div>
      </section>
    </div>
  );
}
