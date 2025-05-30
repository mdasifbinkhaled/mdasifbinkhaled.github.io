import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { ArrowRight, Download, Newspaper, UserCircle, Rocket, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-28 xl:py-32 bg-gradient-to-br from-background to-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px] items-center">
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

      {/* Research Interests */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">Research Interests</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Explainable AI (XAI)</CardTitle>
                <CardDescription>
                  Ensuring transparency and trustworthiness in disease detection, diagnosis, and healthcare analytics
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>Developing transparent AI systems that can explain their reasoning, critical for healthcare applications where understanding the "why" behind a diagnosis is essential for clinician trust and patient safety.</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Multimodal AI & Computer Vision</CardTitle>
                <CardDescription>
                  Combining imaging, clinical records, and lab results for holistic diagnostics
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>Integrating multiple data modalities to create comprehensive diagnostic tools that leverage both visual and non-visual medical data for more accurate healthcare insights.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Publications */}
      <section className="w-full py-12 md:py-16 bg-secondary/20">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">Latest Publications</h2>
          <div className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg leading-tight">
                  Advancements in Bangla Speech Emotion Recognition: A Deep Learning Approach with Cross-Lingual Validation
                </CardTitle>
                <CardDescription className="text-sm">
                  Alam, K., Bhuiyan, M.H., Hossain, M.J., Monir, M.F., Khaled, M.A.B. (2024)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">2024 IEEE 99th Vehicular Technology Conference (VTC2024-Spring), Singapore, pp. 1–5</p>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/publications">View All Publications <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Grants and Highlight */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">Recent Grants</h2>
          <Card className="shadow-lg hover:shadow-xl transition-shadow mb-8">
            <CardHeader>
              <CardTitle className="text-xl">
                Unveiling the Linguistic Diversity of Bangla
              </CardTitle>
              <CardDescription className="text-sm">
                Principal Investigator, VC's Research Fund 2024-2025
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>Enhanced Dialect Detection through AI and Machine Learning Techniques - Project Identification No. VCRF-SETS:24-013</p>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">Looking for PhD Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              With a foundation in Explainable AI and Multimodal AI research, I'm seeking doctoral programs to further contribute to transparent and trustworthy healthcare AI systems.
            </p>
            <Button asChild>
              <Link href="/contact">
                Get in Touch <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}