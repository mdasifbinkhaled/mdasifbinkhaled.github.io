import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Lightbulb, Telescope, Zap, Banknote, Sigma } from 'lucide-react'; // Added Sigma for new grant
import { siteConfig } from '@/config/site';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Research Focus',
  description: `Delve into ${siteConfig.author}'s research interests in Explainable AI (XAI) and Multimodal AI (MMAI) for healthcare, and discover funded projects. ${siteConfig.description}`,
};

export default function ResearchPage() {
  return (
    <div className="space-y-16">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          My Research Landscape
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Pioneering transparent, trustworthy, and holistic AI solutions for
          complex challenges, particularly in healthcare.
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
                <CardDescription className="mt-1">
                  Ensuring transparency and trustworthiness in disease
                  detection, diagnosis, and healthcare analytics utilizing
                  Artificial Intelligence (AI).
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                My work in XAI focuses on demystifying complex AI models, which
                is paramount in healthcare where understanding the rationale
                behind a diagnosis or prediction is as crucial as the outcome
                itself.
              </p>
              <p>
                Key areas include developing novel techniques for model
                interpretability, visualizing decision-making processes, and
                creating AI systems that can articulate their reasoning in
                human-understandable ways, thereby fostering clinician trust and
                enhancing patient safety.
              </p>
              <Image
                src="https://placehold.co/600x300.png"
                alt="Explainable AI concept with interconnected nodes"
                width={600}
                height={300}
                className="rounded-md mt-4 object-cover"
                data-ai-hint="abstract network"
              />
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Telescope className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">
                  Multimodal AI (MMAI) & Computer Vision (CV)
                </CardTitle>
                <CardDescription className="mt-1">
                  Using MMAI and CV to combine imaging, clinical records, and
                  lab results for holistic diagnostics.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                MMAI and CV are central to my efforts to build comprehensive
                diagnostic tools. By integrating diverse data modalities—such as
                medical imaging (X-rays, CT scans), electronic health records,
                and laboratory results—we can achieve a more holistic and
                nuanced understanding of a patient's condition.
              </p>
              <p>
                My research explores advanced data fusion techniques, attention
                mechanisms for cross-modal understanding, and robust CV models
                for accurate feature extraction from medical images. The
                ultimate goal is to significantly improve diagnostic accuracy
                and pave the way for more personalized medicine.
              </p>
              <Image
                src="https://placehold.co/600x300.png"
                alt="Multimodal AI concept with diverse data types"
                width={600}
                height={300}
                className="rounded-md mt-4 object-cover"
                data-ai-hint="medical data types"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="grants-funds">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Grants & Funded Projects
        </h2>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Sigma className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">
                  Development and Analysis of a Comprehensive Sorting Algorithm
                  Library for Enhanced Computational Efficiency
                </CardTitle>
                <CardDescription>
                  Principal Investigator, Sponsored Research Projects 2024-2025
                  (Project ID: 2024-SETS-06)
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This project focuses on creating and evaluating an extensive
                library of sorting algorithms to improve computational
                performance in various applications.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Banknote className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">
                  Unveiling the Linguistic Diversity of Bangla: Enhanced Dialect
                  Detection through AI and Machine Learning Techniques
                </CardTitle>
                <CardDescription>
                  Principal Investigator, VC's Research Fund 2024-2025 (Project
                  ID: VCRF-SETS:24-013)
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This research aims to develop advanced AI and machine learning
                models for accurately detecting and analyzing various dialects
                of the Bangla language.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">
                  Application of Biomedical Signal Processing, Analysis, and
                  Classification to Identify the Biomarkers of Stroke for Early
                  Prediction and Post-Stroke Recovery
                </CardTitle>
                <CardDescription>
                  Co-Principal Investigator, Sponsored Research Projects
                  2022-2023 (Project ID: 2022-SETS-07)
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This project involved the application of biomedical signal
                processing techniques for the early prediction of stroke and to
                aid in post-stroke recovery monitoring.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="current-projects">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Ongoing Research & Development
        </h2>
        <div className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">
                  Mobile Relational Agent for Dengue Management in Bangladesh
                </CardTitle>
                <CardDescription className="mt-1">
                  Research in Progress (DESRIST 2024, IEEE EMBC 2024)
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Developing an mHealth platform featuring a relational agent to
                combat the dengue crisis in Bangladesh. This initiative focuses
                on creating interactive conversational agents to disseminate
                timely information, promote preventive measures, and guide early
                intervention within affected communities.
              </p>
              <p>
                The research encompasses conceptual design, prototype
                development, and rigorous evaluation strategies to assess the
                efficacy of this mobile health solution in real-world public
                health scenarios. Initial findings and concepts have been
                presented at international conferences.
              </p>
              <Image
                src="https://placehold.co/700x350.png"
                alt="Mobile health app for dengue management"
                width={700}
                height={350}
                className="rounded-md mt-4 object-cover"
                data-ai-hint="mobile health app"
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
