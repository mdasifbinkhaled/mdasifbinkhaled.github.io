'use client';

import { useEffect } from 'react';
import { siteConfig } from '@/shared/config/site';
import { researchIdentity } from '@/shared/lib/data/researcher-profile';
import { educationData } from '@/shared/lib/data/education';
import { professionalExperiences } from '@/shared/lib/data/experience';
import { samplePublications } from '@/shared/lib/data/publications';
import Link from 'next/link';
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
import { PDFViewerWrapper } from '@/shared/components/common/pdf-viewer-wrapper';
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
              {educationData.map((edu) => (
                <div key={edu.id} className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p>{edu.institution}</p>
                  {edu.distinction && (
                    <p className="text-sm text-muted-foreground">
                      {edu.distinction}
                    </p>
                  )}
                  {edu.thesis && (
                    <p className="text-sm text-muted-foreground">
                      Thesis: {edu.thesis.title}
                    </p>
                  )}
                  {edu.achievements?.map((achievement, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      {achievement}
                    </p>
                  ))}
                </div>
              ))}
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
                <Link href="/research">
                  Learn more about my research{' '}
                  <ExternalLinkIcon className="ml-1 h-4 w-4" />
                </Link>
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
              {professionalExperiences.slice(0, 3).map((exp) => (
                <div key={exp.id} className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold">
                    {exp.title.split('–')[0]?.trim() || exp.title}
                  </h3>
                  <p className="text-sm">
                    {exp.institution} • {exp.duration}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {exp.description[0]}
                  </p>
                </div>
              ))}
              <Button
                variant="link"
                asChild
                className="p-0 h-auto mt-2 text-primary"
              >
                <Link href="/experience">
                  View all experiences{' '}
                  <ExternalLinkIcon className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selected Publications</CardTitle>
              <CardDescription>Recent scholarly contributions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {samplePublications.slice(0, 2).map((pub) => (
                <p key={pub.id} className="text-sm text-muted-foreground">
                  <strong>{pub.title}...</strong> ({pub.year})
                </p>
              ))}
              <Button
                variant="link"
                asChild
                className="p-0 h-auto mt-2 text-primary"
              >
                <Link href="/publications">
                  Explore all publications{' '}
                  <ExternalLinkIcon className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
