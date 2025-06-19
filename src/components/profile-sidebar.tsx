"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { ExternalLink, FileText, Mail, Github, Linkedin, BookUser, Smartphone, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

interface ProfileSidebarProps {
  onLinkClick?: () => void;
}

export function ProfileSidebar({ onLinkClick }: ProfileSidebarProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-col h-full bg-sidebar-background">
      {/* Profile Section */}
      <div className="flex flex-col items-center p-6 text-center">
        <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-full border-3 border-sidebar-primary/30 shadow-lg">
          {!imageError ? (
            <Image
              src="/photo/Photo_Md Asif Bin Khaled.png"
              alt={`${siteConfig.author} - Profile photo`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="128px"
              priority
              quality={90}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-sidebar-accent/30 flex items-center justify-center">
              <User className="w-16 h-16 text-sidebar-foreground/50" />
            </div>
          )}
        </div>
        <h3 className="font-bold text-xl text-sidebar-foreground leading-tight">{siteConfig.author}</h3>
        <p className="text-sm text-sidebar-foreground/90 mt-2 font-medium">Senior Lecturer & Researcher</p>
        <p className="text-xs text-sidebar-foreground/75 mt-1 px-2">
          {siteConfig.address.split(',')[0]} {/* Show only first part of address e.g. Bashundhara R/A */}
        </p>
        <div className="mt-3 px-3 py-1.5 bg-sidebar-accent/20 rounded-full border border-sidebar-border/50">
          <p className="text-xs text-sidebar-foreground/90 font-medium">
            Open to PhD Opportunities
          </p>
        </div>
      </div>

      <Separator className="bg-sidebar-border/60 mx-4" />

      {/* Quick Info */}
      <div className="p-6 flex-grow">
        <h4 className="text-xs uppercase font-semibold text-sidebar-foreground/80 mb-4 tracking-wider">Contact & Links</h4>
        
        <div className="space-y-3">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-300 hover:translate-x-1 focus-visible:translate-x-1 focus-visible:bg-sidebar-accent group"
          >
            <a href={`mailto:${siteConfig.email}`} onClick={onLinkClick}>
              <Mail className="mr-3 h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" /> 
              <span className="truncate text-sm">{siteConfig.email}</span>
            </a>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-300 hover:translate-x-1 focus-visible:translate-x-1 focus-visible:bg-sidebar-accent group"
          >
            <a href={`tel:${siteConfig.phone.replace(/\s|\(|\)/g, '')}`} onClick={onLinkClick}>
              <Smartphone className="mr-3 h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" /> 
              <span className="truncate text-sm">{siteConfig.phone}</span>
            </a>
          </Button>
          
          <div className="pt-2 space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="w-full justify-start bg-sidebar-accent/10 hover:bg-sidebar-accent/30 border-sidebar-border/60 hover:border-sidebar-border text-sidebar-foreground transition-all duration-300 hover:translate-x-1 hover:shadow-lg focus-visible:translate-x-1 focus-visible:shadow-lg group"
            >
              <a href={siteConfig.links.cv} target="_blank" rel="noopener noreferrer" onClick={onLinkClick}>
                <FileText className="mr-3 h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" /> 
                <span className="font-medium">Download CV</span>
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="w-full justify-start bg-sidebar-accent/10 hover:bg-sidebar-accent/30 border-sidebar-border/60 hover:border-sidebar-border text-sidebar-foreground transition-all duration-300 hover:translate-x-1 hover:shadow-lg focus-visible:translate-x-1 focus-visible:shadow-lg group"
            >
              <Link href="/research" {...(onLinkClick && { onClick: onLinkClick })}>
                <ExternalLink className="mr-3 h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" /> 
                <span className="font-medium">Research Focus</span>
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="w-full justify-start bg-sidebar-accent/10 hover:bg-sidebar-accent/30 border-sidebar-border/60 hover:border-sidebar-border text-sidebar-foreground transition-all duration-300 hover:translate-x-1 hover:shadow-lg focus-visible:translate-x-1 focus-visible:shadow-lg group"
            >
              <Link href="/publications" {...(onLinkClick && { onClick: onLinkClick })}>
                <FileText className="mr-3 h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" /> 
                <span className="font-medium">Publications</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Separator className="bg-sidebar-border/60 mx-4" />

      {/* Social Icons */}
      <div className="p-6">
        <h4 className="text-xs uppercase font-semibold text-sidebar-foreground/80 mb-4 tracking-wider text-center">Follow Me</h4>
        <div className="flex justify-center items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group">
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" onClick={onLinkClick}>
              <Github className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group">
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" onClick={onLinkClick}>
              <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group">
            <a href={siteConfig.links.googleScholar} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar Profile" onClick={onLinkClick}>
              <BookUser className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
