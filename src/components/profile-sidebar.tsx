"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { ExternalLink, FileText, Mail, Github, Linkedin, BookUser, Smartphone, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProfileSidebarProps {
  onLinkClick?: () => void;
  isCollapsed?: boolean;
}

export function ProfileSidebar({ onLinkClick, isCollapsed = false }: ProfileSidebarProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-col h-full bg-sidebar-background">
      {/* Profile Section */}
      <div className={cn(
        "flex flex-col items-center text-center transition-all duration-200",
        isCollapsed ? "p-2" : "p-6"
      )}>
        <div className={cn(
          "relative overflow-hidden rounded-full border-3 border-sidebar-primary/30 shadow-lg mb-4",
          isCollapsed ? "w-10 h-10" : "w-32 h-32"
        )}>
          {!imageError ? (
            <Image
              src="/photo/Photo_Md Asif Bin Khaled.png"
              alt={`${siteConfig.author} - Profile photo`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes={isCollapsed ? "40px" : "128px"}
              priority
              quality={90}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-sidebar-accent/30 flex items-center justify-center">
              <User className={cn(
                "text-sidebar-foreground/50",
                isCollapsed ? "w-6 h-6" : "w-16 h-16"
              )} />
            </div>
          )}
        </div>
        
        {!isCollapsed && (
          <>
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
          </>
        )}
      </div>

      {!isCollapsed && <Separator className="bg-sidebar-border/60 mx-4" />}

      {/* Quick Info */}
      <div className={cn(
        "flex-grow",
        isCollapsed ? "p-2" : "p-6"
      )}>
        {!isCollapsed && (
          <h4 className="text-xs uppercase font-semibold text-sidebar-foreground/80 mb-4 tracking-wider">Contact & Links</h4>
        )}
        
        <div className={cn(
          "space-y-3",
          isCollapsed && "space-y-2"
        )}>
          <Button 
            variant="ghost" 
            size={isCollapsed ? "icon" : "sm"}
            asChild 
            className={cn(
              "transition-all duration-300 hover:translate-x-1 focus-visible:translate-x-1 focus-visible:bg-sidebar-accent group",
              isCollapsed 
                ? "w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" 
                : "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
            title={isCollapsed ? siteConfig.email : undefined}
          >
            <a href={`mailto:${siteConfig.email}`} onClick={onLinkClick}>
              <Mail className={cn(
                "flex-shrink-0 group-hover:scale-110 transition-transform duration-200",
                isCollapsed ? "h-4 w-4" : "mr-3 h-4 w-4"
              )} /> 
              {!isCollapsed && <span className="truncate text-sm">{siteConfig.email}</span>}
            </a>
          </Button>
          <Button 
            variant="ghost" 
            size={isCollapsed ? "icon" : "sm"}
            asChild 
            className={cn(
              "transition-all duration-300 hover:translate-x-1 focus-visible:translate-x-1 focus-visible:bg-sidebar-accent group",
              isCollapsed 
                ? "w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" 
                : "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
            title={isCollapsed ? siteConfig.phone : undefined}
          >
            <a href={`tel:${siteConfig.phone.replace(/\s|\(|\)/g, '')}`} onClick={onLinkClick}>
              <Smartphone className={cn(
                "flex-shrink-0 group-hover:scale-110 transition-transform duration-200",
                isCollapsed ? "h-4 w-4" : "mr-3 h-4 w-4"
              )} /> 
              {!isCollapsed && <span className="truncate text-sm">{siteConfig.phone}</span>}
            </a>
          </Button>
          
          <div className={cn("pt-2", isCollapsed ? "space-y-1" : "space-y-2")}>
            <Button 
              variant="outline" 
              size={isCollapsed ? "icon" : "sm"}
              asChild 
              className={cn(
                "bg-sidebar-accent/10 hover:bg-sidebar-accent/30 border-sidebar-border/60 hover:border-sidebar-border text-sidebar-foreground transition-all duration-300 hover:translate-x-1 hover:shadow-lg focus-visible:translate-x-1 focus-visible:shadow-lg group",
                isCollapsed ? "w-full justify-center" : "w-full justify-start"
              )}
              title={isCollapsed ? "Download CV" : undefined}
            >
              <a href={siteConfig.links.cv} target="_blank" rel="noopener noreferrer" onClick={onLinkClick}>
                <FileText className={cn(
                  "flex-shrink-0 group-hover:scale-110 transition-transform duration-200",
                  isCollapsed ? "h-4 w-4" : "mr-3 h-4 w-4"
                )} /> 
                {!isCollapsed && <span className="font-medium">Download CV</span>}
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size={isCollapsed ? "icon" : "sm"}
              asChild 
              className={cn(
                "bg-sidebar-accent/10 hover:bg-sidebar-accent/30 border-sidebar-border/60 hover:border-sidebar-border text-sidebar-foreground transition-all duration-300 hover:translate-x-1 hover:shadow-lg focus-visible:translate-x-1 focus-visible:shadow-lg group",
                isCollapsed ? "w-full justify-center" : "w-full justify-start"
              )}
              title={isCollapsed ? "Research Focus" : undefined}
            >
              <Link href="/research" {...(onLinkClick && { onClick: onLinkClick })}>
                <ExternalLink className={cn(
                  "flex-shrink-0 group-hover:scale-110 transition-transform duration-200",
                  isCollapsed ? "h-4 w-4" : "mr-3 h-4 w-4"
                )} /> 
                {!isCollapsed && <span className="font-medium">Research Focus</span>}
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size={isCollapsed ? "icon" : "sm"}
              asChild 
              className={cn(
                "bg-sidebar-accent/10 hover:bg-sidebar-accent/30 border-sidebar-border/60 hover:border-sidebar-border text-sidebar-foreground transition-all duration-300 hover:translate-x-1 hover:shadow-lg focus-visible:translate-x-1 focus-visible:shadow-lg group",
                isCollapsed ? "w-full justify-center" : "w-full justify-start"
              )}
              title={isCollapsed ? "Publications" : undefined}
            >
              <Link href="/publications" {...(onLinkClick && { onClick: onLinkClick })}>
                <FileText className={cn(
                  "flex-shrink-0 group-hover:scale-110 transition-transform duration-200",
                  isCollapsed ? "h-4 w-4" : "mr-3 h-4 w-4"
                )} /> 
                {!isCollapsed && <span className="font-medium">Publications</span>}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {!isCollapsed && <Separator className="bg-sidebar-border/60 mx-4" />}

      {/* Social Icons */}
      <div className={cn(isCollapsed ? "p-2" : "p-6")}>
        {!isCollapsed && (
          <h4 className="text-xs uppercase font-semibold text-sidebar-foreground/80 mb-4 tracking-wider text-center">Follow Me</h4>
        )}
        <div className={cn(
          "flex items-center",
          isCollapsed ? "flex-col gap-2 justify-center" : "justify-center gap-3"
        )}>
          <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group"
            title={isCollapsed ? "GitHub Profile" : undefined}
          >
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" onClick={onLinkClick}>
              <Github className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            </a>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group"
            title={isCollapsed ? "LinkedIn Profile" : undefined}
          >
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" onClick={onLinkClick}>
              <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            </a>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:bg-sidebar-accent/50 group"
            title={isCollapsed ? "Google Scholar Profile" : undefined}
          >
            <a href={siteConfig.links.googleScholar} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar Profile" onClick={onLinkClick}>
              <BookUser className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
