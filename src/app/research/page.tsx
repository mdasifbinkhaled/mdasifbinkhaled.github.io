import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Telescope, Zap, Banknote } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Research Focus',
  description: `Delve into Md Asif Bin Khaled's research interests in Explainable AI (XAI) and Multimodal AI for healthcare, and discover funded projects. ${siteConfig.description}`,
};

export default function ResearchPage() {
  return (
    <div className="space-y-16">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          My Research Landscape
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Pioneering transparent and holistic AI solutions for healthcare challenges.
        </p>
      </header>

      <section id="research-interests">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Core Research Interests
        </h2>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Explainable AI (XAI)</CardTitle>
                <CardDescription className="mt-1">Ensuring transparency and trustworthiness in AI-driven healthcare.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                My work in XAI aims to demystify the "black box" of complex AI models. This is crucial in healthcare, where understanding how a model arrives at a diagnosis or prediction can be as important as the prediction itself.
              </p>
              <p>
                Key areas include developing novel techniques for model interpretability, visualizing decision-making processes, and creating AI systems that can articulate their reasoning in a human-understandable manner, fostering clinician trust and patient safety.
              </p>
              <Image src="https://placehold.co/600x300.png" alt="Explainable AI concept" width={600} height={300} className="rounded-md mt-4 object-cover" data-ai-hint="abstract network" />
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-start gap-4">
               <div className="bg-primary/10 p-3 rounded-full">
                <Telescope className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Multimodal AI (MMAI) & Computer Vision (CV)</CardTitle>
                <CardDescription className="mt-1">Holistic diagnostics by integrating diverse medical data.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                MMAI and CV are at the forefront of my efforts to build more comprehensive diagnostic tools. By combining various data modalities such as medical imaging (X-rays, CT scans), electronic health records, and laboratory results, we can achieve a more holistic understanding of a patient&apos;s condition.
              </p>
              <p>
                My research explores advanced fusion techniques, attention mechanisms for cross-modal understanding, and robust CV models for accurate feature extraction from medical images. The goal is to improve diagnostic accuracy and enable personalized medicine.
              </p>
               <Image src="https://placehold.co/600x300.png" alt="Multimodal AI concept" width={600} height={300} className="rounded-md mt-4 object-cover" data-ai-hint="medical data" />
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="grants-funds">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Grants & Funded Projects
        </h2>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {/* Placeholder for Grant Cards - To be populated with actual grant data */}
          <Card className="shadow-md opacity-70">
            <CardHeader className="flex flex-row items-center gap-4">
              <Banknote className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-xl">Funded Project Title 1</CardTitle>
                <CardDescription>Funding Body & Duration</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">A brief description of the project and its objectives. Details coming soon.</p>
            </CardContent>
          </Card>
          <Card className="shadow-md opacity-70">
            <CardHeader className="flex flex-row items-center gap-4">
              <Banknote className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-xl">Funded Project Title 2</CardTitle>
                <CardDescription>Funding Body & Duration</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">A brief description of the project and its objectives. Details coming soon.</p>
            </CardContent>
          </Card>
        </div>
        <p className="text-center mt-8 text-muted-foreground">
          Details of grants and funded projects will be updated here.
        </p>
      </section>
    </div>
  );
}
