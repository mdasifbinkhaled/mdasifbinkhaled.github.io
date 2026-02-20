import { useState } from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';
import { assetPaths, assetConfig } from '@/shared/config/assets';
import { siteConfig } from '@/shared/config/site';
import { cn } from '@/shared/lib/utils';

interface ProfileSectionProps {
  isCollapsed: boolean;
}

export function ProfileSection({ isCollapsed }: ProfileSectionProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={cn(
        'flex flex-col items-center text-center transition-all duration-200 bg-gradient-to-b from-sidebar-accent/20 to-transparent',
        isCollapsed ? 'p-2 pb-4' : 'p-6 pb-6'
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-full border-4 border-sidebar-primary/20 shadow-xl mb-5 ring-4 ring-sidebar-background',
          isCollapsed ? 'w-10 h-10' : 'w-32 h-32'
        )}
      >
        {!imageError ? (
          <Image
            src={assetPaths.profile}
            alt={assetConfig.profileImage.alt}
            width={assetConfig.profileImage.width}
            height={assetConfig.profileImage.height}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-sidebar-accent/30 flex items-center justify-center">
            <User
              className={cn(
                'text-sidebar-foreground/50',
                isCollapsed ? 'w-6 h-6' : 'w-16 h-16'
              )}
            />
          </div>
        )}
      </div>

      {!isCollapsed && (
        <>
          <h3 className="font-bold text-2xl text-sidebar-foreground leading-tight tracking-tight">
            {siteConfig.author}
          </h3>
          <p className="text-sm text-sidebar-foreground/80 mt-2 font-medium leading-relaxed">
            {siteConfig.jobTitle}
          </p>
          <p className="text-xs text-sidebar-foreground/60 mt-0.5 px-2">
            {siteConfig.address.split(',')[0]}
          </p>
        </>
      )}
    </div>
  );
}
