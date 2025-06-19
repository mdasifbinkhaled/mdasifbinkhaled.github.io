
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { samplePublications } from '@/lib/data/publications';
import { professionalExperiences } from '@/lib/data/experience';
import { 
  LazyExperienceTimelineWithSuspense,
  LazyPublicationListWithSuspense 
} from '@/components/lazy-components';

export default function HomePage() {
  const filteredPublications = samplePublications.filter(p => p.type !== 'In Progress' && p.type !== 'Thesis');

  // Get recent experiences (current and latest)
  const recentExperiences = professionalExperiences.slice(0, 3);

  // News items (recent achievements and announcements)
  const newsItems = [
    {
      date: '[2025/04]',
      text: 'Excited to announce the launch of ',
      highlight: 'Llama 4',
      description: ', a major leap in open-source AI! As part of the team supporting Llama 4 at FAIR, I\'m proud to have contributed to these cutting-edge models! 🚀'
    },
    {
      date: '[2025/02]',
      text: '3D-MVP, MM-Graph and 3D-GRAND are accepted at CVPR 2025!'
    },
    {
      date: '[2024/10]',
      text: 'We\'re looking for research interns starting next year working on embodied agents and multimodal LLMs.',
      strikethrough: 'If you are interested, please drop me an email and apply here.'
    }
  ];


  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-28 xl:py-32 bg-gradient-to-br from-background to-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px] items-center">
            <Image
              alt={siteConfig.author}
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last border-4 border-primary shadow-lg"
              height="550"
              src="/photo/Photo_Md Asif Bin Khaled.png"
              width="550"
              priority // Added priority for LCP
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                  {siteConfig.author}
                </h1>
                <p className="text-xl text-foreground md:text-2xl">
                  Senior Lecturer & Researcher
                </p>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Specializing in Explainable AI (XAI) and Multimodal AI (MMAI) for healthcare diagnostics and analytics.
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
                  <Link href={siteConfig.links.cv} target='_blank' rel='noopener noreferrer'>
                    View CV <ExternalLink className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="w-full py-8 md:py-12 bg-secondary/10">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6 text-primary">News</h2>
          <div className="space-y-3">
            {newsItems.map((item, index) => (
              <div key={index} className="flex gap-2 text-sm">
                <span className="font-medium text-muted-foreground whitespace-nowrap">
                  {item.date}
                </span>
                <div className="flex-1">
                  <span>{item.text}</span>
                  {item.highlight && (
                    <a href="#" className="text-blue-600 hover:underline font-medium">
                      {item.highlight}
                    </a>
                  )}
                  {item.description && <span>{item.description}</span>}
                  {item.strikethrough && (
                    <span className="line-through text-muted-foreground ml-1">
                      {item.strikethrough}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section className="w-full py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6 text-primary">Work Experience</h2>
          <LazyExperienceTimelineWithSuspense experiences={recentExperiences} />
          <div className="text-center mt-6">
            <Button variant="outline" asChild>
              <Link href="/experience">
                View Full Experience <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
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
                  Ensuring transparency and trustworthiness in disease detection, diagnosis, and healthcare analytics utilizing Artificial Intelligence (AI).
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>Developing AI systems that can explain their reasoning, crucial for healthcare applications where understanding the "why" behind a diagnosis is essential for clinician trust and patient safety.</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Multimodal AI (MMAI) & Computer Vision (CV)</CardTitle>
                <CardDescription>
                  Using Multimodal AI (MMAI) and Computer Vision (CV) to combine imaging, clinical records, and lab results for holistic diagnostics.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>Integrating diverse data modalities to create comprehensive diagnostic tools that leverage both visual and non-visual medical data for more accurate and personalized healthcare insights.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="w-full py-8 md:py-12 bg-secondary/10">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6 text-primary">Recent Publications</h2>
          <LazyPublicationListWithSuspense initialPublications={filteredPublications.slice(0, 3)} />
          <div className="text-center mt-6">
            <Button variant="outline" asChild>
              <Link href="/publications">
                View All Publications <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Grants and Highlight */}
       <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">Recent Grants</h2>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">
                  Development and Analysis of a Comprehensive Sorting Algorithm Library
                </CardTitle>
                <CardDescription className="text-sm">
                  Principal Investigator, Sponsored Research Projects 2024-2025 (No. 2024-SETS-06)
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>Focused on enhancing computational efficiency through optimized sorting algorithms.</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">
                  Unveiling the Linguistic Diversity of Bangla
                </CardTitle>
                <CardDescription className="text-sm">
                  Principal Investigator, VC's Research Fund 2024-2025 (No. VCRF-SETS:24-013)
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>Enhancing dialect detection through AI and Machine Learning techniques.</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Seeking PhD Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              With a strong foundation in XAI and MMAI research, I am actively seeking doctoral programs to further contribute to innovative and trustworthy AI systems, particularly in healthcare.
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

    