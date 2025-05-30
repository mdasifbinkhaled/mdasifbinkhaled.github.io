"use client"

import { useState, useEffect } from "react";
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { PDFViewer } from '@/components/ui/pdf-viewer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper';

export default function CVPage() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex flex-col items-center space-y-8">
        <SkeletonWrapper isLoading className="w-full h-12" />
        <SkeletonWrapper isLoading className="w-full max-w-4xl h-[800px]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      <header className="text-center w-full">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Curriculum Vitae
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          My academic and professional journey
        </p>
      </header>

      <div className="w-full max-w-4xl">
        <Tabs defaultValue="viewer">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="viewer">PDF Viewer</TabsTrigger>
              <TabsTrigger value="highlights">CV Highlights</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" asChild>
              <a href={siteConfig.links.cv} target="_blank" rel="noopener noreferrer" download>
                <Download className="mr-2 h-4 w-4" /> Download Full CV
              </a>
            </Button>
          </div>
          
          <TabsContent value="viewer" className="mt-0">
            <PDFViewer 
              file={siteConfig.links.cv} 
              downloadLink={siteConfig.links.cv} 
              className="w-full" 
            />
          </TabsContent>
          
          <TabsContent value="highlights" className="mt-0 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>Academic credentials and achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold">M.Sc in Computer Science</h3>
                  <p>Independent University, Bangladesh (IUB)</p>
                  <p className="text-sm text-muted-foreground">CGPA: 3.76/4.0 • Graduated with Distinction (Cum Laude)</p>
                  <p className="text-sm text-muted-foreground">Thesis: Word Sense Disambiguation of Bengali Words using FP-Growth Algorithm</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold">B.Sc in Computer Science and Engineering</h3>
                  <p>BRAC University (BRACU)</p>
                  <p className="text-sm text-muted-foreground">CGPA: 3.80/4.0 • Graduated with Highest Distinction (Summa Cum Laude)</p>
                  <p className="text-sm text-muted-foreground">Thesis: Exploring Deep Features: Deeper Fully Convolutional Neural Network for Image Segmentation</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Research Interests</CardTitle>
                <CardDescription>Focus areas of academic investigation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="bg-primary/10 rounded-full p-1.5 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <span className="font-medium">Explainable AI (XAI):</span> Ensuring transparency and trustworthiness in disease detection, diagnosis, and healthcare analytics utilizing Artificial Intelligence
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-primary/10 rounded-full p-1.5 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <span className="font-medium">Multimodal AI (MMAI) & Computer Vision (CV):</span> Using Multimodal AI and Computer Vision to combine imaging, clinical records, and lab results for holistic diagnostics
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Experience</CardTitle>
                <CardDescription>Professional roles and responsibilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold">Senior Lecturer</h3>
                  <p className="text-sm">Independent University, Bangladesh • Feb 2023 - Present</p>
                  <p className="text-sm text-muted-foreground mt-1">Teaching advanced computer science courses and supervising student research</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold">Lecturer</h3>
                  <p className="text-sm">Independent University, Bangladesh • Jan 2019 - Feb 2023</p>
                  <p className="text-sm text-muted-foreground mt-1">Implemented OBE strategies across multiple courses</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold">Researcher</h3>
                  <p className="text-sm">Center for Cognitive Skill Enhancement (CCSE), IUB • May 2017 - Dec 2023</p>
                  <p className="text-sm text-muted-foreground mt-1">Conducted research on flood monitoring using remote sensing data</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}