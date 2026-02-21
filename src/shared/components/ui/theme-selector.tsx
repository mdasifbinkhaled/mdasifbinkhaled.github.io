'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/shared/components/ui/dropdown-menu';
import { Badge } from '@/shared/components/ui/badge';
import {
  Palette,
  Sun,
  Moon,
  Check,
  Waves,
  Trees,
  Flower,
  Briefcase,
} from 'lucide-react';
import { themeConfigs } from '@/shared/config/themes';
import { useIsClient } from '@/shared/hooks/use-is-client';

const themeUIMap: Record<string, { icon: React.ElementType; previewClass: string }> = {
  light: { icon: Sun, previewClass: 'bg-gradient-to-br from-slate-50 to-blue-50' },
  dark: { icon: Moon, previewClass: 'bg-gradient-to-br from-slate-900 to-slate-800' },
  ocean: { icon: Waves, previewClass: 'bg-gradient-to-br from-cyan-50 to-blue-100' },
  forest: { icon: Trees, previewClass: 'bg-gradient-to-br from-emerald-50 to-green-100' },
  lavender: { icon: Flower, previewClass: 'bg-gradient-to-br from-purple-100 to-pink-50' },
  slate: { icon: Briefcase, previewClass: 'bg-gradient-to-br from-gray-100 to-slate-200' },
};

const categories = ['classic', 'natural', 'vibrant', 'professional'] as const;

function ThemeCategoryList({
  variant,
  currentThemeName,
  setTheme,
}: {
  variant: 'default' | 'compact' | 'floating';
  currentThemeName: string | undefined;
  setTheme: (name: string) => void;
}) {
  return (
    <>
      {categories.map((category) => {
        const categoryThemes = Object.values(themeConfigs).filter(
          (t) => t.category === category
        );
        if (categoryThemes.length === 0) return null;

        return (
          <div
            key={category}
            className={
              variant === 'floating' || variant === 'default' ? 'py-2' : 'py-1'
            }
          >
            <div className="px-2 py-1">
              <Badge variant="secondary" className="text-xs capitalize">
                {category}
              </Badge>
            </div>
            <div
              className={
                variant === 'floating'
                  ? 'grid grid-cols-2 gap-1'
                  : variant === 'default'
                    ? 'grid grid-cols-1 gap-1'
                    : 'space-y-0.5'
              }
            >
              {categoryThemes.map((themeOption) => {
                const isActive = currentThemeName === themeOption.name;
                const uiConfig = themeUIMap[themeOption.name] || { icon: Palette, previewClass: 'bg-muted' };
                const Icon = uiConfig.icon;

                if (variant === 'compact') {
                  return (
                    <DropdownMenuItem
                      key={themeOption.name}
                      onClick={() => setTheme(themeOption.name)}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded ${uiConfig.previewClass} flex items-center justify-center border border-border/50`}
                      >
                        <Icon className="h-3 w-3 text-foreground/70" />
                      </div>
                      <span className="text-sm flex-1">
                        {themeOption.label}
                      </span>
                      {isActive && <Check className="h-3 w-3 text-primary" />}
                    </DropdownMenuItem>
                  );
                }

                if (variant === 'floating') {
                  return (
                    <DropdownMenuItem
                      key={themeOption.name}
                      onClick={() => setTheme(themeOption.name)}
                      className="flex items-center gap-2 p-2 rounded-lg cursor-pointer theme-selector-grid-item"
                      aria-label={`Switch to ${themeOption.label} theme`}
                    >
                      <div
                        className={`w-6 h-6 rounded-md ${uiConfig.previewClass} flex items-center justify-center border border-border/50 theme-preview-animation`}
                      >
                        <Icon className="h-3 w-3 text-foreground/70" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-xs">
                            {themeOption.label}
                          </span>
                          {isActive && (
                            <Check className="h-2 w-2 text-primary" />
                          )}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  );
                }

                return (
                  <DropdownMenuItem
                    key={themeOption.name}
                    onClick={() => setTheme(themeOption.name)}
                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer theme-selector-grid-item"
                    aria-label={`Switch to ${themeOption.label} theme: ${themeOption.description}`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`w-8 h-8 rounded-md ${uiConfig.previewClass} flex items-center justify-center border border-border/50 theme-preview-animation`}
                      >
                        <Icon className="h-4 w-4 text-foreground/70" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {themeOption.label}
                          </span>
                          {isActive && (
                            <Check
                              className="h-3 w-3 text-primary"
                              aria-label="Currently selected"
                            />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {themeOption.description}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

interface ThemeSelectorProps {
  variant?: 'default' | 'compact' | 'floating';
  align?: 'start' | 'center' | 'end';
  showLabel?: boolean;
}

export function ThemeSelector({
  variant = 'default',
  align = 'end',
  showLabel = true,
}: ThemeSelectorProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <Button variant="ghost" size="icon">
        <Palette className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const currentTheme = themeConfigs[theme as keyof typeof themeConfigs] || themeConfigs.light;
  const CurrentIcon = themeUIMap[currentTheme.name]?.icon || Palette;

  if (variant === 'compact') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <CurrentIcon className="h-4 w-4" />
            <span className="sr-only">Change theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align} className="w-64 p-2">
          <DropdownMenuLabel className="flex items-center gap-2 py-2">
            <Palette className="h-4 w-4" />
            Choose Theme
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <ThemeCategoryList
            variant="compact"
            currentThemeName={theme}
            setTheme={setTheme}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === 'floating') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 bg-primary/90 backdrop-blur-sm border-2 border-primary/20 floating-theme-button"
          >
            <CurrentIcon className="h-6 w-6" />
            <span className="sr-only">Change theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={align}
          side="left"
          className="w-80 p-2 mb-4 mr-4"
        >
          <DropdownMenuLabel className="flex items-center gap-2 py-2">
            <Palette className="h-4 w-4" />
            Choose Your Theme
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <ThemeCategoryList
            variant="floating"
            currentThemeName={theme}
            setTheme={setTheme}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 min-w-36 justify-start"
        >
          <CurrentIcon className="h-4 w-4" />
          <span className="hidden sm:inline">
            {showLabel ? currentTheme?.label || 'Theme' : ''}
          </span>
          <Palette className="h-3 w-3 ml-auto opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-80 p-2">
        <DropdownMenuLabel className="flex items-center gap-2 py-2">
          <Palette className="h-4 w-4" />
          Choose Your Theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <ThemeCategoryList
          variant="default"
          currentThemeName={theme}
          setTheme={setTheme}
        />

        <DropdownMenuSeparator />
        <div className="p-2 text-xs text-muted-foreground">
          Current:{' '}
          <span className="font-medium">
            {currentTheme?.label || 'Unknown'}
          </span>
          {resolvedTheme && resolvedTheme !== theme && (
            <span className="text-primary"> (System: {resolvedTheme})</span>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
