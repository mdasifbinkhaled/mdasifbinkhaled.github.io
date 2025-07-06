'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { 
  Palette, 
  Sun, 
  Moon, 
  Monitor, 
  Sparkles,
  GraduationCap,
  Waves,
  Flame,
  Zap,
  TreePine,
  Check,
  Star,
  Sunset,
  Circle,
  Globe,
  Gem
} from 'lucide-react'

const themes = [
  {
    name: 'light',
    label: 'Light',
    description: 'Clean and bright',
    icon: Sun,
    preview: 'bg-gradient-to-br from-slate-50 to-blue-50',
    category: 'Classic'
  },
  {
    name: 'dark',
    label: 'Dark',
    description: 'Easy on the eyes',
    icon: Moon,
    preview: 'bg-gradient-to-br from-slate-900 to-slate-800',
    category: 'Classic'
  },
  {
    name: 'system',
    label: 'System',
    description: 'Follows your device',
    icon: Monitor,
    preview: 'bg-gradient-to-br from-slate-400 to-slate-600',
    category: 'Classic'
  },
  {
    name: 'academic',
    label: 'Academic',
    description: 'Professional blue-gray',
    icon: GraduationCap,
    preview: 'bg-gradient-to-br from-blue-100 to-indigo-200',
    category: 'Professional'
  },
  {
    name: 'minimal',
    label: 'Minimal',
    description: 'Clean grays',
    icon: Circle,
    preview: 'bg-gradient-to-br from-gray-100 to-gray-200',
    category: 'Professional'
  },
  {
    name: 'emerald',
    label: 'Emerald',
    description: 'Professional greens',
    icon: Gem,
    preview: 'bg-gradient-to-br from-emerald-100 to-green-200',
    category: 'Professional'
  },
  {
    name: 'ocean',
    label: 'Ocean',
    description: 'Deep blue-teal vibes',
    icon: Waves,
    preview: 'bg-gradient-to-br from-cyan-100 to-teal-200',
    category: 'Nature'
  },
  {
    name: 'warm',
    label: 'Warm',
    description: 'Cozy oranges & browns',
    icon: Flame,
    preview: 'bg-gradient-to-br from-orange-100 to-amber-200',
    category: 'Nature'
  },
  {
    name: 'forest',
    label: 'Forest',
    description: 'Natural green tones',
    icon: TreePine,
    preview: 'bg-gradient-to-br from-green-100 to-emerald-200',
    category: 'Nature'
  },
  {
    name: 'sunset',
    label: 'Sunset',
    description: 'Warm pinks & oranges',
    icon: Sunset,
    preview: 'bg-gradient-to-br from-pink-200 to-orange-200',
    category: 'Nature'
  },
  {
    name: 'retro',
    label: 'Retro',
    description: 'Vintage yellow-brown',
    icon: Sparkles,
    preview: 'bg-gradient-to-br from-yellow-100 to-orange-200',
    category: 'Creative'
  },
  {
    name: 'cyberpunk',
    label: 'Cyberpunk',
    description: 'Neon purple & pink',
    icon: Zap,
    preview: 'bg-gradient-to-br from-purple-500 to-pink-500',
    category: 'Creative'
  },
  {
    name: 'midnight',
    label: 'Midnight',
    description: 'Rich blues & blacks',
    icon: Star,
    preview: 'bg-gradient-to-br from-blue-900 to-slate-900',
    category: 'Creative'
  },
  {
    name: 'cosmic',
    label: 'Cosmic',
    description: 'Deep space vibes',
    icon: Globe,
    preview: 'bg-gradient-to-br from-purple-900 to-blue-900',
    category: 'Creative'
  },
  {
    name: 'neon',
    label: 'Neon',
    description: 'Electric blues & greens',
    icon: Zap,
    preview: 'bg-gradient-to-br from-black via-cyan-500 to-green-500',
    category: 'Creative'
  },
  {
    name: 'cherry',
    label: 'Cherry',
    description: 'Soft pink blossoms',
    icon: Sparkles,
    preview: 'bg-gradient-to-br from-pink-100 to-rose-200',
    category: 'Nature'
  },
  {
    name: 'arctic',
    label: 'Arctic',
    description: 'Cool blues & whites',
    icon: Star,
    preview: 'bg-gradient-to-br from-blue-50 to-cyan-100',
    category: 'Nature'
  },
  {
    name: 'golden',
    label: 'Golden',
    description: 'Warm golds & ambers',
    icon: Sun,
    preview: 'bg-gradient-to-br from-yellow-200 to-amber-300',
    category: 'Professional'
  },
  {
    name: 'lavender',
    label: 'Lavender',
    description: 'Soft purples & whites',
    icon: Sparkles,
    preview: 'bg-gradient-to-br from-purple-100 to-violet-200',
    category: 'Professional'
  }
]

const categories = ['Classic', 'Professional', 'Nature', 'Creative']

interface ThemeSelectorProps {
  variant?: 'default' | 'compact' | 'floating'
  align?: 'start' | 'center' | 'end'
  showLabel?: boolean
}

export function ThemeSelector({ 
  variant = 'default', 
  align = 'end', 
  showLabel = true 
}: ThemeSelectorProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <Palette className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const currentTheme = themes.find(t => t.name === theme) || themes[0]
  const CurrentIcon = currentTheme?.icon || Palette

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
              {theme === themeOption.name && <Check className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
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
            const categoryThemes = themes.filter(t => t.category === category)
            if (categoryThemes.length === 0) return null
            
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
                      <div className={`
                        w-6 h-6 rounded-md ${themeOption.preview} 
                        flex items-center justify-center border border-border/50 theme-preview-animation
                      `}>
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
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 min-w-[140px] justify-start"
        >
          <CurrentIcon className="h-4 w-4" />
          <span className="hidden sm:inline">{showLabel ? currentTheme?.label || 'Theme' : ''}</span>
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
          const categoryThemes = themes.filter(t => t.category === category)
          if (categoryThemes.length === 0) return null
          
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
                      <div className={`
                        w-8 h-8 rounded-md ${themeOption.preview} 
                        flex items-center justify-center border border-border/50 theme-preview-animation
                      `}>
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
          )
        })}
        
        <DropdownMenuSeparator />
        <div className="p-2 text-xs text-muted-foreground">
          Current: <span className="font-medium">{currentTheme?.label || 'Unknown'}</span>
          {resolvedTheme && resolvedTheme !== theme && (
            <span className="text-primary"> (System: {resolvedTheme})</span>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
