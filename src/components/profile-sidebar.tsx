"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { Download, ExternalLink, FileText, Mail, Github, Linkedin, BookUser } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function ProfileSidebar() {
  return (
    <div className="flex flex-col h-full">
      {/* Profile Section */}
      <div className="flex flex-col items-center p-4 text-center">
        <div className="relative w-32 h-32 mb-3 overflow-hidden rounded-full border-2 border-sidebar-primary">
          <Image
            src="https://placehold.co/200x200.png"
            alt={siteConfig.author}
            fill
            className="object-cover"
            data-ai-hint="professional headshot"
          />
        </div>
        <h3 className="font-bold text-lg text-sidebar-foreground">{siteConfig.author}</h3>
        <p className="text-sm text-sidebar-foreground/80 mt-1">Senior Lecturer & Researcher</p>
        <p className="text-xs text-sidebar-foreground/70 mt-1 italic font-medium">
          Open to PhD Opportunities
        </p>
      </div>

      <Separator className="bg-sidebar-border mx-3" />

      {/* Quick Links */}
      <div className="p-4 flex-grow">
        <h4 className="text-xs uppercase font-semibold text-sidebar-foreground/70 mb-3 tracking-wide">Quick Links</h4>
        
        <div className="flex flex-col gap-2">
          <Button variant="outline" size="sm" asChild className="justify-start bg-sidebar-accent/20 hover:bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
            <a href={siteConfig.links.cv} target="_blank" rel="noopener noreferrer">
              <FileText className="mr-2 h-4 w-4" /> Download CV
            </a>
          </Button>
          
          <Button variant="outline" size="sm" asChild className="justify-start bg-sidebar-accent/20 hover:bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
            <Link href="/research">
              <ExternalLink className="mr-2 h-4 w-4" /> Research Interests
            </Link>
          </Button>
          
          <Button variant="outline" size="sm" asChild className="justify-start bg-sidebar-accent/20 hover:bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
            <Link href="/publications">
              <FileText className="mr-2 h-4 w-4" /> Latest Publications
            </Link>
          </Button>
        </div>
      </div>

      <Separator className="bg-sidebar-border mx-3" />

      {/* Contact Icons */}
      <div className="p-4">
        <h4 className="text-xs uppercase font-semibold text-sidebar-foreground/70 mb-3 tracking-wide">Connect</h4>
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="icon" asChild className="text-sidebar-foreground hover:bg-sidebar-accent">
            <a href={`mailto:${siteConfig.email}`} aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-sidebar-foreground hover:bg-sidebar-accent">
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-sidebar-foreground hover:bg-sidebar-accent">
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-sidebar-foreground hover:bg-sidebar-accent">
            <a href={siteConfig.links.googleScholar} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar">
              <BookUser className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}