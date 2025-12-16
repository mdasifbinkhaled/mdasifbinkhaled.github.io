import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card';
import { siteConfig } from '@/shared/config/site';
import { assetPaths } from '@/shared/config/assets';

export function BiographySection() {
  return (
    <section id="narrative">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">My Journey & Vision</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
          <div className="md:float-right md:ml-6 mb-4 md:mb-0 md:w-1/3">
            <Image
              src={assetPaths.profile}
              alt={`${siteConfig.author} - professional`}
              width={400}
              height={500}
              className="rounded-lg shadow-xl object-cover w-full"
              loading="lazy"
            />
          </div>
          <p>
            I am {siteConfig.author}, a Senior Lecturer in Computer Science and
            Engineering with a profound passion for both education and research.
            My academic and professional pursuits are driven by a commitment to
            developing intelligent systems that can make a significant positive
            impact, particularly within the healthcare domain.
          </p>
          <p>
            My core research focuses on Explainable AI (XAI) and Multimodal AI
            (MMAI), with a specialized interest in their applications to
            healthcare. I firmly believe that the future of medical diagnostics
            and treatment can be revolutionized by AI systems that are not only
            highly accurate but also transparent, interpretable, and capable of
            processing diverse data sources such as medical images, clinical
            notes, and lab results.
          </p>
          <p>
            As an educator, I am dedicated to inspiring students to explore the
            vast and exciting potential of computer science. I am a strong
            advocate for Outcome-Based Education (OBE) and employ diverse
            pedagogical strategies to cultivate critical thinking, robust
            problem-solving skills, and a genuine enthusiasm for lifelong
            learning. My aim is to empower the next generation of engineers and
            researchers with the essential knowledge and tools to innovate,
            excel, and lead.
          </p>
          <p>
            Beyond my teaching and research activities, I am actively engaged in
            the academic community by mentoring students, contributing to
            professional service, and continuously seeking opportunities for
            growth. I am currently pursuing PhD opportunities to further deepen
            my research expertise and contribute to pioneering advancements in
            AI for healthcare and beyond.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
