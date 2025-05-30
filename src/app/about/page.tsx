import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Award } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About Me',
  description: `Learn more about Md Asif Bin Khaled's academic journey, research interests, and teaching philosophy. ${siteConfig.description}`,
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          About Md Asif Bin Khaled
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          A passionate educator and researcher committed to advancing AI in healthcare.
        </p>
      </header>

      <section id="narrative">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">My Journey</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            <p>
              Hello! I&apos;m Md Asif Bin Khaled, a Senior Lecturer in Computer Science and Engineering with a deep-seated passion for both teaching and research. My academic and professional journey has been driven by a curiosity to understand and build intelligent systems, particularly those that can make a tangible difference in people&apos;s lives.
            </p>
            <p>
              My research primarily focuses on Explainable AI (XAI) and Multimodal AI, with a special emphasis on applications in healthcare. I believe that the future of medical diagnostics and treatment can be significantly enhanced by AI systems that are not only accurate but also transparent, trustworthy, and capable of interpreting diverse data sources like images, clinical records, and lab results.
            </p>
            <p>
              As an educator, I strive to inspire students to explore the vast potential of computer science. I am an advocate for Outcome-Based Education (OBE) and employ various strategies to foster critical thinking, problem-solving skills, and a genuine love for learning. My goal is to equip the next generation of engineers and researchers with the knowledge and tools they need to innovate and excel.
            </p>
             <p>
              Beyond the classroom and lab, I am actively involved in the academic community through mentoring students and contributing to professional service. I am currently seeking PhD opportunities to further deepen my research expertise and contribute to groundbreaking advancements in AI for healthcare.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="education">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">Education</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <GraduationCap className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="text-xl">M.Sc in Computer Science</CardTitle>
                <p className="text-sm text-muted-foreground">Independent University, Bangladesh (IUB)</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Graduated with Distinction (Cum Laude), CGPA: 3.76/4.0</p>
              <p className="mt-2 text-muted-foreground">Thesis: Word Sense Disambiguation of Bengali Words using FP-Growth Algorithm</p>
              <p className="text-muted-foreground">Advisor: Dr. Mahady Hasan</p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <GraduationCap className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="text-xl">B.Sc in Computer Science and Engineering</CardTitle>
                <p className="text-sm text-muted-foreground">BRAC University (BRACU)</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Graduated with Highest Distinction (Summa Cum Laude), CGPA: 3.80/4.0</p>
              <p className="mt-2 text-muted-foreground">Thesis: Exploring Deep Features: Deeper Fully Convolutional Neural Network for Image Segmentation</p>
              <p className="text-muted-foreground">Advisor: Mr. Moin Mostakim</p>
              <p className="mt-2 text-muted-foreground font-medium">Achieved Vice Chancellor&apos;s Award for Academic Excellence 6 times.</p>
            </CardContent>
          </Card>
        </div>
      </section>
       <section id="certifications" className="mt-12">
         <h2 className="text-3xl font-bold text-center mb-8 text-primary">Certifications & Training</h2>
         <div className="grid gap-6 md:grid-cols-2">
           <Card className="shadow-md">
             <CardHeader className="flex flex-row items-start gap-3">
               <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
               <div>
                 <CardTitle className="text-lg">Outcomes-Based Education (OBE)</CardTitle>
                 <p className="text-sm text-muted-foreground">Board of Accreditation for Engineering and Technical Education (BAETE)</p>
               </div>
             </CardHeader>
             <CardContent>
               <p className="text-muted-foreground text-sm">Received detailed training on implementing and managing OBE in higher education.</p>
             </CardContent>
           </Card>
           
           <Card className="shadow-md">
             <CardHeader className="flex flex-row items-start gap-3">
               <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
               <div>
                 <CardTitle className="text-lg">BAETE Accreditation for CSE Programs</CardTitle>
                 <p className="text-sm text-muted-foreground">United International University, BAETE & IEEE Computer Society Bangladesh Chapter</p>
               </div>
             </CardHeader>
             <CardContent>
               <p className="text-muted-foreground text-sm">Acquired knowledge of BAETE accreditation criteria and its application in academic programs.</p>
             </CardContent>
           </Card>
           
           <Card className="shadow-md">
             <CardHeader className="flex flex-row items-start gap-3">
               <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
               <div>
                 <CardTitle className="text-lg">Systematic Literature Review Workshop</CardTitle>
                 <p className="text-sm text-muted-foreground">Center for Computational and Data Sciences (CCSD)</p>
               </div>
             </CardHeader>
             <CardContent>
               <p className="text-muted-foreground text-sm">Learned advanced techniques in conducting systematic literature reviews and academic writing.</p>
             </CardContent>
           </Card>
           
           <Card className="shadow-md">
             <CardHeader className="flex flex-row items-start gap-3">
               <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
               <div>
                 <CardTitle className="text-lg">Amateur Radio Service Certification</CardTitle>
                 <p className="text-sm text-muted-foreground">Bangladesh Telecommunication Regulatory Commission (BTRC)</p>
               </div>
             </CardHeader>
             <CardContent>
               <p className="text-muted-foreground text-sm">Certified for operating amateur radio services in Bangladesh. Serial No. 083/17097</p>
             </CardContent>
           </Card>
         </div>
       </section>

       <section id="personal-image" className="mt-12 flex justify-center">
          <Image
            src="https://placehold.co/800x500.png"
            alt="Md Asif Bin Khaled in a professional or academic setting"
            width={800}
            height={500}
            className="rounded-lg shadow-xl object-cover"
            data-ai-hint="academic professional"
          />
        </section>
    </div>
  );
}