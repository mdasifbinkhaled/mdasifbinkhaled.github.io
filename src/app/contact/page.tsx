import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, BookUser } from 'lucide-react'; // Assuming BookUser for Google Scholar
import { siteConfig } from '@/config/site';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Contact Me',
  description: `Get in touch with Md Asif Bin Khaled for collaborations, PhD opportunities, or inquiries. ${siteConfig.description}`,
};

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Let&apos;s Connect
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          I&apos;m open to collaborations, PhD opportunities, and interesting conversations.
        </p>
      </header>

      <section id="contact-info">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <Mail className="h-7 w-7 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Email</p>
                <a href={`mailto:${siteConfig.email}`} className="text-muted-foreground hover:text-primary underline">
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <Button variant="outline" asChild className="py-6 text-base">
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" /> GitHub
                </a>
              </Button>
              <Button variant="outline" asChild className="py-6 text-base">
                <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
                </a>
              </Button>
              <Button variant="outline" asChild className="py-6 text-base">
                <a href={siteConfig.links.googleScholar} target="_blank" rel="noopener noreferrer">
                  <BookUser className="mr-2 h-5 w-5" /> Google Scholar
                </a>
              </Button>
            </div>
            <div className="mt-8 text-center">
               <Image 
                src="https://placehold.co/600x350.png" 
                alt="Contact or collaboration concept" 
                width={600} 
                height={350} 
                className="rounded-lg shadow-md object-cover mx-auto"
                data-ai-hint="network connection"
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
