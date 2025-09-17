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
import { Palette, Sun, Moon, Sparkles, Waves, Zap, Check } from 'lucide-react';

const themes = [
  {
    name: 'light',
    label: 'Light',
    description: 'Clean and bright',
    icon: Sun,
    preview: 'bg-gradient-to-br from-slate-50 to-blue-50',
    category: 'Classic',
  },
  {
    name: 'dark',
    label: 'Dark',
    description: 'Easy on the eyes',
    icon: Moon,
    preview: 'bg-gradient-to-br from-slate-900 to-slate-800',
    category: 'Classic',
  },
  {
    name: 'retro',
    label: 'Retro',
    description: 'Vintage film with warm glow',
    icon: Sparkles,
    preview: 'bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-200',
    category: 'Dramatic',
  },
  {
    name: 'cyberpunk',
    label: 'Cyberpunk',
    description: 'Neon matrix with glitch effects',
    icon: Zap,
    preview: 'bg-gradient-to-br from-purple-900 via-pink-500 to-cyan-400',
    category: 'Dramatic',
  },
  {
    name: 'ocean',
    label: 'Ocean',
    description: 'Deep waves with floating bubbles',
    icon: Waves,
    preview: 'bg-gradient-to-br from-cyan-100 via-blue-200 to-teal-300',
    category: 'Dramatic',
  },
];

const categories = ['Classic', 'Dramatic'];

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
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <Palette className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const currentTheme = themes.find((t) => t.name === theme) || themes[0];
  const CurrentIcon = currentTheme?.icon || Palette;

  if (variant === 'compact') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <CurrentIcon className="h-4 w-4" />
            <span className="sr-only">Change theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align} className="w-48">
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {themes.slice(0, 3).map((themeOption) => (
            <DropdownMenuItem
              key={themeOption.name}
              onClick={() => setTheme(themeOption.name)}
              className="flex items-center gap-2"
            >
              <themeOption.icon className="h-4 w-4" />
              <span>{themeOption.label}</span>
              {theme === themeOption.name && (
                <Check className="h-4 w-4 ml-auto" />
              )}
            </DropdownMenuItem>
          ))}
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

          {categories.map((category) => {
            const categoryThemes = themes.filter(
              (t) => t.category === category
            );
            if (categoryThemes.length === 0) return null;

            return (
              <div key={category} className="py-2">
                <div className="px-2 py-1">
                  <Badge variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {categoryThemes.map((themeOption) => (
                    <button
                      key={themeOption.name}
                      onClick={() => setTheme(themeOption.name)}
                      className={`
                        flex items-center gap-2 p-2 rounded-lg text-left hover:bg-accent transition-colors theme-selector-grid-item
                        ${theme === themeOption.name ? 'bg-accent border border-primary/20' : ''}
                      `}
                    >
                      <div
                        className={`
                        w-6 h-6 rounded-md ${themeOption.preview} 
                        flex items-center justify-center border border-border/50 theme-preview-animation
                      `}
                      >
                        <themeOption.icon className="h-3 w-3 text-foreground/70" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-xs">
                            {themeOption.label}
                          </span>
                          {theme === themeOption.name && (
                            <Check className="h-2 w-2 text-primary" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 min-w-[140px] justify-start"
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

        {categories.map((category) => {
          const categoryThemes = themes.filter((t) => t.category === category);
          if (categoryThemes.length === 0) return null;

          return (
            <div key={category} className="py-2">
              <div className="px-2 py-1">
                <Badge variant="secondary" className="text-xs">
                  {category}
                </Badge>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {categoryThemes.map((themeOption) => (
                  <button
                    key={themeOption.name}
                    onClick={() => setTheme(themeOption.name)}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg text-left hover:bg-accent transition-colors theme-selector-grid-item
                      ${theme === themeOption.name ? 'bg-accent border border-primary/20' : ''}
                    `}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`
                        w-8 h-8 rounded-md ${themeOption.preview} 
                        flex items-center justify-center border border-border/50 theme-preview-animation
                      `}
                      >
                        <themeOption.icon className="h-4 w-4 text-foreground/70" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {themeOption.label}
                          </span>
                          {theme === themeOption.name && (
                            <Check className="h-3 w-3 text-primary" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {themeOption.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}

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
