'use client';

import { useEffect } from 'react';
import { siteConfig } from '@/shared/config/site';
import { researchIdentity } from '@/shared/config/researcher-profile';
import { Button } from '@/shared/components/ui/button';
import { Download, ExternalLinkIcon } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { academicEvents } from '@/shared/lib/analytics';
import { PDFViewerWrapper } from '@/shared/components/ui/pdf-viewer-wrapper';
import { useIsClient } from '@/shared/hooks/use-is-client';

export default function CVContent() {
  const isClient = useIsClient();

  useEffect(() => {
    academicEvents.viewCV();
  }, []);

  if (!isClient) {
    return (
      <div className="flex flex-col items-center space-y-8">
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full max-w-4xl h-[800px]" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl">
      <Tabs defaultValue="viewer">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="viewer">PDF Viewer</TabsTrigger>
            <TabsTrigger value="highlights">CV Highlights</TabsTrigger>
          </TabsList>

          <Button variant="outline" size="sm" asChild>
            <a
              href={siteConfig.links.cv}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => academicEvents.downloadCV()}
            >
              <Download className="mr-2 h-4 w-4" /> Download Full CV
            </a>
          </Button>
        </div>

        <TabsContent value="viewer" className="mt-0">
          <PDFViewerWrapper
            file={siteConfig.links.cv}
            downloadLink={siteConfig.links.cv}
            className="w-full"
          />
        </TabsContent>

        <TabsContent value="highlights" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>
                Academic credentials and key achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold">M.Sc in Computer Science</h3>
                <p>Independent University, Bangladesh (IUB)</p>
                <p className="text-sm text-muted-foreground">
                  Graduated with Distinction (Cum Laude)
                </p>
                <p className="text-sm text-muted-foreground">
                  Thesis: Word Sense Disambiguation of Bengali Words using
                  FP-Growth Algorithm
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold">
                  B.Sc in Computer Science and Engineering
                </h3>
                <p>BRAC University (BRACU)</p>
                <p className="text-sm text-muted-foreground">
                  Graduated with Highest Distinction (Summa Cum Laude)
                </p>
                <p className="text-sm text-muted-foreground">
                  Achieved Vice Chancellor&apos;s Award 6 times
                </p>
                <p className="text-sm text-muted-foreground">
                  Thesis: Exploring Deep Features: Deeper Fully Convolutional
                  Neural Network for Image Segmentation
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Research Interests</CardTitle>
              <CardDescription>
                {researchIdentity.philosophy.vision}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {researchIdentity.primaryAreas.map((area) => (
                <div key={area.id} className="flex items-start gap-2">
                  <div className="bg-primary/10 rounded-full p-1.5 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <span className="font-medium">{area.name}:</span>{' '}
                    {area.description}
                  </div>
                </div>
              ))}
              <Button
                variant="link"
                asChild
                className="p-0 h-auto mt-2 text-primary"
              >
                <a href="/research">
                  Learn more about my research{' '}
                  <ExternalLinkIcon className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Professional Experience</CardTitle>
              <CardDescription>
                Selected roles and responsibilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold">{siteConfig.role}</h3>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  {siteConfig.institution} • Feb 2023 - Present
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Teaching advanced CSE courses and supervising student
                  research.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold">Lecturer</h3>
                <p className="text-sm">
                  Independent University, Bangladesh • Jan 2019 - Feb 2023
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Taught core CSE courses and implemented OBE strategies.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold">Researcher</h3>
                <p className="text-sm">
                  Center for Cognitive Skill Enhancement (CCSE), IUB • May 2017
                  - Dec 2023
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Conducted research on flood monitoring (Sentinel-1) and
                  facilitated workshops.
                </p>
              </div>
              <Button
                variant="link"
                asChild
                className="p-0 h-auto mt-2 text-primary"
              >
                <a href="/experience">
                  View all experiences{' '}
                  <ExternalLinkIcon className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selected Publications</CardTitle>
              <CardDescription>Recent scholarly contributions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                <strong>
                  Conceptual Design and Evaluation Plan of a Mobile Relational
                  Agent...
                </strong>{' '}
                (DESRIST 2024)
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>
                  Advancements in Bangla Speech Emotion Recognition...
                </strong>{' '}
                (IEEE VTC 2024)
              </p>
              <Button
                variant="link"
                asChild
                className="p-0 h-auto mt-2 text-primary"
              >
                <a href="/publications">
                  Explore all publications{' '}
                  <ExternalLinkIcon className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
