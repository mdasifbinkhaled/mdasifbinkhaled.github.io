"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { ExternalLink, FileText, Mail, Github, Linkedin, BookUser, Smartphone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ProfileSidebarProps {
  onLinkClick?: () => void;
}

export function ProfileSidebar({ onLinkClick }: ProfileSidebarProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Profile Section */}
      <div className="flex flex-col items-center p-4 text-center">
        <div className="relative w-32 h-32 mb-3 overflow-hidden rounded-full border-2 border-sidebar-primary">
          <Image
            src="/photo/Photo_Md Asif Bin Khaled.png"
            alt={`${siteConfig.author} - Profile photo`}
            fill
            className="object-cover"
            sizes="128px"
            priority
            quality={85}
          />
        </div>
        <h3 className="font-bold text-lg text-sidebar-foreground">{siteConfig.author}</h3>
        <p className="text-sm text-sidebar-foreground/80 mt-1">Senior Lecturer & Researcher</p>
        <p className="text-xs text-sidebar-foreground/70 mt-1">
          {siteConfig.address.split(',')[0]} {/* Show only first part of address e.g. Bashundhara R/A */}
        </p>
        <p className="text-xs text-sidebar-foreground/70 mt-2 italic font-medium">
          Open to PhD Opportunities
        </p>
      </div>

      <Separator className="bg-sidebar-border mx-3" />

      {/* Quick Info */}
      <div className="p-4 flex-grow">
        <h4 className="text-xs uppercase font-semibold text-sidebar-foreground/70 mb-3 tracking-wide">Contact & Links</h4>
        
        <div className="space-y-2">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 hover:translate-x-1"
          >
            <a href={`mailto:${siteConfig.email}`} onClick={onLinkClick}>
              <Mail className="mr-2 h-4 w-4 flex-shrink-0" /> 
              <span className="truncate">{siteConfig.email}</span>
            </a>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 hover:translate-x-1"
          >
            <a href={`tel:${siteConfig.phone.replace(/\s|\(|\)/g, '')}`} onClick={onLinkClick}>
              <Smartphone className="mr-2 h-4 w-4 flex-shrink-0" /> 
              <span className="truncate">{siteConfig.phone}</span>
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className="w-full justify-start bg-sidebar-accent/20 hover:bg-sidebar-accent border-sidebar-border text-sidebar-foreground transition-all duration-200 hover:translate-x-1 hover:shadow-md"
          >
            <a href={siteConfig.links.cv} target="_blank" rel="noopener noreferrer" onClick={onLinkClick}>
              <FileText className="mr-2 h-4 w-4 flex-shrink-0" /> Download CV
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className="w-full justify-start bg-sidebar-accent/20 hover:bg-sidebar-accent border-sidebar-border text-sidebar-foreground transition-all duration-200 hover:translate-x-1 hover:shadow-md"
          >
            <Link href="/research" {...(onLinkClick && { onClick: onLinkClick })}>
              <ExternalLink className="mr-2 h-4 w-4 flex-shrink-0" /> Research Focus
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className="w-full justify-start bg-sidebar-accent/20 hover:bg-sidebar-accent border-sidebar-border text-sidebar-foreground transition-all duration-200 hover:translate-x-1 hover:shadow-md"
          >
            <Link href="/publications" {...(onLinkClick && { onClick: onLinkClick })}>
              <FileText className="mr-2 h-4 w-4 flex-shrink-0" /> Publications
            </Link>
          </Button>
        </div>
      </div>

      <Separator className="bg-sidebar-border mx-3" />

      {/* Social Icons */}
      <div className="p-4">
        <h4 className="text-xs uppercase font-semibold text-sidebar-foreground/70 mb-3 tracking-wide text-center">Follow Me</h4>
        <div className="flex justify-around items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200 hover:scale-110">
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" onClick={onLinkClick}>
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200 hover:scale-110">
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" onClick={onLinkClick}>
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200 hover:scale-110">
            <a href={siteConfig.links.googleScholar} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar">
              <BookUser className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
