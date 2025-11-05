# Project Analysis & Cleanup Documentation

## Md Asif Bin Khaled Portfolio Website

**Date**: October 18, 2025  
**Project Version**: 1.0.0  
**Analysis Type**: Comprehensive Code Review & Cleanup

---

## 📊 Project Statistics

- **Total TypeScript Files**: 99
- **Pages**: 13
- **Components**: 38
- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS 3.4
- **UI Library**: Shadcn/ui + Radix UI
- **Theme Management**: next-themes 0.4.6
- **Testing**: Vitest 3.2.4
- **Build Status**: ✅ Passing
- **Type Safety**: ✅ No TypeScript errors

---

## 🏗️ Architecture Overview

### **Directory Structure**

```
mdasifbinkhaled.github.io/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Homepage
│   │   ├── about/              # About page
│   │   ├── contact/            # Contact page
│   │   ├── cv/                 # CV download page
│   │   ├── experience/         # Professional experience
│   │   ├── publications/       # Research publications
│   │   ├── research/           # Research interests
│   │   ├── service/            # Academic service
│   │   ├── service-awards/     # Awards and recognition
│   │   └── teaching/           # Teaching portfolio
│   │       ├── bracu/          # BRAC University courses
│   │       └── iub/            # IUB courses
│   │
│   ├── features/               # Feature-specific components
│   │   ├── academic/           # Academic search & filters
│   │   ├── publications/       # Publication cards
│   │   └── teaching/           # Course cards
│   │
│   ├── shared/                 # Shared resources
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/         # Common components
│   │   │   ├── layout/         # Layout components
│   │   │   ├── navigation/     # Nav/breadcrumbs
│   │   │   └── ui/             # Shadcn UI components
│   │   ├── config/             # Configuration files
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utilities and data
│   │   ├── providers/          # Context providers
│   │   └── types/              # TypeScript types
│   │
│   └── styles/                 # Global styles
│       └── tokens.css          # CSS custom properties
│
├── tests/                      # Test files
├── public/                     # Static assets
├── docs/                       # Documentation
└── .github/                    # GitHub config & workflows
```

---

## 🎨 Theme System

### **Architecture**

- **Provider**: `next-themes` with custom ThemeProvider
- **Storage**: Data attribute (`data-theme`) on HTML element
- **Total Themes**: 13 themes across 4 categories

### **Theme Categories**

1. **Classic** (3 themes)
   - Light: Default light theme with blue accents
   - Dark: Professional dark theme
   - **Vintage**: Golden/amber warm tones (NEW)

2. **Natural** (3 themes)
   - Ocean: Blue/cyan sea tones
   - Warm: Orange/amber sunset
   - Forest: Green nature tones

3. **Vibrant** (3 themes)
   - Midnight: Deep blue night sky
   - Sunset: Purple/pink twilight
   - Lavender: Soft purple/violet

4. **Professional** (4 themes)
   - Slate: Gray corporate
   - Crimson: Red academic
   - Emerald: Green professional
   - Indigo: Deep blue formal

### **Theme Implementation**

- CSS Custom Properties in `src/styles/tokens.css`
- Each theme defines 25+ color variables
- Smooth 300ms transitions on theme switch
- Sidebar colors inherit from card/primary colors
- Academic highlight colors for research content

---

## 📄 Page Breakdown

### **1. Homepage (`/`)**

**File**: `src/app/page.tsx`  
**Purpose**: Landing page with overview of research, experience, and quick stats

**Sections**:

- Hero section with name, title, brief bio
- Quick stats (4 cards):
  - 7+ Years Teaching Experience
  - 4.0+ Teaching Score (out of 5.0)
  - 4 Research Grants
  - 5+ Research Areas
- Research interests (6 cards):
  - AI in Healthcare
  - AI in Environment
  - Explainable AI (XAI)
  - Multimodal AI
  - Remote Sensing
  - Algorithms & Data Structures
- Recent publications (5 most recent)
- Work experience preview (3 most recent)

**Data Sources**:

- `samplePublications` from `@/shared/lib/data/publications`
- `professionalExperiences` from `@/shared/lib/data/experience`
- `siteConfig` from `@/shared/config/site`

### **2. About Page (`/about`)**

**File**: `src/app/about/page.tsx`  
**Purpose**: Detailed biography and background

**Content**:

- Full biography
- Education history
- Research philosophy
- Career goals

### **3. Publications Page (`/publications`)**

**File**: `src/app/publications/page.tsx`  
**Purpose**: Comprehensive list of research publications

**Features**:

- Academic search with filters
- Filter by type (journal, conference, preprint)
- Filter by year
- Publication cards with:
  - Title, authors, venue
  - DOI/URL links
  - Citations
  - Tags

**Data**: `samplePublications` (JSON data)

### **4. Teaching Portfolio (`/teaching`)**

**File**: `src/app/teaching/page.tsx`  
**Purpose**: Overview of teaching experience

**Sub-routes**:

- `/teaching/iub` - IUB courses
- `/teaching/bracu` - BRAC University courses
- `/teaching/[institution]/[courseCode]` - Individual course details

**Course Data**:

- Course metadata (code, title, credits)
- Learning outcomes
- Topics covered
- Grading scheme
- Prerequisites
- Resources

**Data Location**: `src/shared/lib/data/courses/`

### **5. Experience Page (`/experience`)**

**File**: `src/app/experience/page.tsx`  
**Purpose**: Professional work history

**Content**:

- Timeline of positions
- Responsibilities
- Achievements
- Duration

**Data**: `professionalExperiences` JSON

### **6. Research Page (`/research`)**

**File**: `src/app/research/page.tsx`  
**Purpose**: Research interests and projects

### **7. Service & Awards (`/service`, `/service-awards`)**

**Purpose**: Academic service and recognition

---

## 🧩 Component Architecture

### **Layout Components**

#### **1. AppSidebarLayout**

**File**: `src/shared/components/layout/app-sidebar-layout.tsx`  
**Purpose**: Main layout wrapper with responsive sidebar

**Features**:

- Responsive sidebar (desktop) / sheet (mobile)
- Collapsible sidebar functionality
- Profile sidebar integration
- Navbar integration
- Back-to-top button

**Props**:

```typescript
interface AppSidebarLayoutProps {
  children: React.ReactNode;
}
```

#### **2. ProfileSidebar**

**File**: `src/shared/components/layout/profile-sidebar.tsx`  
**Purpose**: User profile and navigation sidebar

**Features**:

- Profile image with fallback
- Name and title
- Location display
- "Open to PhD" badge
- Contact links (email, GitHub, LinkedIn, ORCID)
- Social media buttons
- Collapsible mode support
- Hover animations preserved

**Key Characteristics**:

- Uses `memo` for performance
- Smooth transitions (not affected by global theme transitions)
- Active link highlighting
- Icon scaling on hover

#### **3. Navbar**

**File**: `src/shared/components/layout/navbar.tsx`  
**Purpose**: Top navigation bar

**Features**:

- Logo/name
- Main navigation links
- Theme selector
- Mobile menu toggle
- Active route highlighting

### **Feature Components**

#### **1. Academic Search**

**File**: `src/features/academic/academic-search.tsx`  
**Purpose**: Search and filter academic content

**Components**:

- `FilterBar`: Type and year filters
- `SearchInput`: Text search
- `ResultsList`: Filtered results display

**Features**:

- Real-time filtering
- Multi-select type filters
- Year filter
- Search query highlighting
- Accessible filter buttons

#### **2. Publication Card**

**File**: `src/features/publications/publication-card.tsx`  
**Purpose**: Display individual publication

**Features**:

- Title and authors
- Venue and year
- DOI/URL links
- Citation count
- Tags
- Hover effects

#### **3. Course Card**

**File**: `src/features/teaching/simple-course-card.tsx`  
**Purpose**: Display course summary

**Features**:

- Course code and title
- Credits
- Institution
- Link to details
- Hover effects

### **Shared UI Components**

Built on Shadcn/ui + Radix UI:

1. **Button** - Multiple variants, sizes, with loading states
2. **Card** - Content containers with header/footer
3. **Badge** - Labels and tags
4. **Separator** - Visual dividers
5. **Sheet** - Mobile drawer/modal
6. **Select** - Dropdown selector
7. **Tabs** - Tabbed navigation
8. **Toast** - Notifications
9. **Dialog** - Modal dialogs
10. **Progress** - Loading indicators
11. **ThemeSelector** - Theme switcher dropdown with previews

---

## 📦 Data Management

### **Data Structure**

#### **Publications**

**Location**: `src/shared/lib/data/publications.ts`  
**Type**: `Publication[]`

```typescript
interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: 'journal' | 'conference' | 'preprint';
  doi?: string;
  url?: string;
  citations?: number;
  tags?: string[];
}
```

**Validation**: Zod schema with runtime validation

#### **Professional Experience**

**Location**: `src/shared/lib/data/experience.ts`  
**Type**: `Experience[]`

```typescript
interface Experience {
  id: string;
  position: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
  type: 'academic' | 'industry';
}
```

#### **Course Data**

**Location**: `src/shared/lib/data/courses/[institution]/[code].json`  
**Type**: `CourseData`

```typescript
interface CourseData {
  code: string;
  title: string;
  credits: number;
  institution: 'iub' | 'bracu';
  level: 'undergraduate' | 'graduate';
  description: string;
  outcomes: string[];
  topics: string[];
  prerequisites?: string[];
  grading: GradingScheme;
  resources?: Resource[];
}
```

### **Data Validation**

All data is validated using Zod schemas:

- Publications validated on load
- Course data validated per route
- Experiences validated per route
- Type-safe runtime checks

---

## 🎯 Configuration

### **Site Config**

**File**: `src/shared/config/site.ts`

```typescript
export const siteConfig = {
  name: "Md Asif Bin Khaled",
  title: "Academic Portfolio | Research & Teaching",
  description: "Academic portfolio...",
  url: "https://mdasifbinkhaled.github.io",
  author: "Md Asif Bin Khaled",
  email: "...",
  github: "...",
  linkedin: "...",
  orcid: "...",
  address: "...",
  bio: "...",
  keywords: [...],
};
```

### **Navigation Config**

**File**: `src/shared/config/navigation.ts`

Defines all navigation links, icons, and structure.

### **Display Limits**

**File**: `src/shared/config/site.ts`

```typescript
export const DISPLAY_LIMITS = {
  HOMEPAGE_RECENT: 5,
  HOMEPAGE_EXPERIENCE: 3,
  ACADEMIC_SEARCH_YEARS: 10,
  PUBLICATIONS_PER_PAGE: 20,
};
```

### **Theme Config**

**File**: `src/shared/config/themes.ts`

Currently implicit in theme-selector.tsx - could be extracted.

---

## 🔧 Utilities & Helpers

### **Core Utilities**

#### **cn() - Class Name Merger**

**File**: `src/shared/lib/utils.ts`

```typescript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Usage**: Merge Tailwind classes with conflict resolution

#### **Analytics**

**File**: `src/shared/lib/analytics.ts`

Google Analytics integration (production only).

#### **Structured Data**

**File**: `src/shared/lib/structured-data.ts`

Generates JSON-LD for SEO:

- Person schema
- Organization schema
- WebSite schema

### **Custom Hooks**

#### **useMobile**

**File**: `src/shared/hooks/use-mobile.ts`

Detects mobile viewport (< 768px).

#### **useMotion**

**File**: `src/shared/hooks/use-motion.ts`

Detects `prefers-reduced-motion` setting.

#### **useToast**

**File**: `src/shared/hooks/use-toast.ts`

Toast notification management.

---

## ✅ Recent Improvements (October 18, 2025)

### **1. Fixed Theme Selector (Critical Bug)**

- **Issue**: Theme selector visible but non-functional
- **Root Cause**: `attribute="class"` vs `[data-theme]` mismatch
- **Fix**: Changed ThemeProvider to `attribute="data-theme"`
- **Impact**: All 13 themes now work correctly

### **2. Added Vintage Theme**

- Golden/yellowish warm aesthetic
- HSL color palette (38-45 hue range)
- Scroll icon in selector
- Full CSS definition with 25+ variables

### **3. Updated Statistics**

- Accurate teaching experience: 7+ years
- Teaching score: 4.0+ / 5.0
- Research grants: 4 (was 2+)
- Research areas: 5+ (was 3+)
- Added description tooltips

### **4. Expanded Research Interests**

- From 2 cards to 6 comprehensive areas
- Color-coded borders
- Relevant icons for each area
- Better grid layout (responsive)

### **5. Preserved Sidebar Behavior**

- Fixed global transitions conflict
- Sidebar keeps original smooth animations
- No visual or functional changes
- Selective transitions for layout elements only

### **6. Removed Dead Code**

- Deleted `src/app/page.old.tsx`
- Cleaned up unused imports

---

## 🔍 Code Quality Analysis

### **Strengths** ✅

1. **Type Safety**
   - Full TypeScript coverage
   - Zod validation for data
   - No type errors

2. **Component Architecture**
   - Proper separation of concerns
   - Feature-based organization
   - Reusable shared components

3. **Performance**
   - Memo usage on ProfileSidebar
   - Static generation (SSG)
   - Image optimization

4. **Developer Experience**
   - ESLint + Prettier configured
   - Husky pre-commit hooks
   - Commitlint for conventional commits
   - Comprehensive test setup

5. **Accessibility**
   - ARIA labels on icons
   - Semantic HTML
   - Keyboard navigation
   - Focus management

6. **Build & Deploy**
   - GitHub Actions CI/CD
   - Automatic deployment to GitHub Pages
   - Build optimization

### **Areas for Improvement** 🔧

1. **Documentation**
   - Need JSDoc comments on complex functions
   - Component props documentation
   - Data schema documentation

2. **Testing**
   - Some components lack tests
   - Need integration tests
   - E2E testing missing

3. **Error Handling**
   - Add error boundaries
   - Better loading states
   - User-friendly error messages

4. **Performance**
   - Could add more lazy loading
   - Consider code splitting
   - Image optimization opportunities

5. **Accessibility**
   - Some minor ARIA improvements needed
   - Better screen reader support
   - Focus trap in modals

---

## 📋 Cleanup Checklist

### **Completed** ✅

- [x] Removed old/backup files (page.old.tsx)
- [x] Fixed theme selector functionality
- [x] Added vintage theme
- [x] Updated statistics with accurate data
- [x] Expanded research interests
- [x] Fixed transition conflicts with sidebar
- [x] Type checking passes
- [x] Build succeeds

### **In Progress** 🔄

- [ ] Add JSDoc comments
- [ ] Improve error handling
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Testing coverage

### **Future Improvements** 📝

- [ ] Add loading skeletons
- [ ] Implement error boundaries
- [ ] Add more unit tests
- [ ] Add E2E tests
- [ ] Optimize images
- [ ] Add analytics tracking
- [ ] Improve SEO metadata
- [ ] Add sitemap generation
- [ ] Add RSS feed
- [ ] Implement search functionality

---

## 🚀 Performance Metrics

### **Build Stats**

- Compiled successfully in ~3.3s
- 28 static pages generated
- First Load JS: 102 kB (shared)
- Largest page: 150 kB (homepage)
- Smallest page: 102 kB (simple pages)

### **Lighthouse Scores** (Target)

- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 📚 Dependencies Analysis

### **Production Dependencies** (18 packages)

All necessary and actively used:

- ✅ React 18.3.1 - Core framework
- ✅ Next.js 15.5.3 - Framework
- ✅ Radix UI - UI primitives (9 packages)
- ✅ lucide-react - Icons
- ✅ next-themes - Theme management
- ✅ Zod - Validation
- ✅ Tailwind utilities (clsx, tailwind-merge, cva)

### **Dev Dependencies** (27 packages)

All necessary for development workflow:

- ✅ TypeScript, ESLint, Prettier
- ✅ Testing (Vitest, Testing Library)
- ✅ Git hooks (Husky, lint-staged, commitlint)
- ✅ Build tools (PostCSS, Autoprefixer, Tailwind)

**No unused dependencies detected** ✅

---

## 🎓 Learnings & Best Practices

### **Theme System Architecture**

1. Always match provider attribute with CSS selectors
2. Use data attributes over classes for themes
3. Selective transitions avoid conflicts
4. CSS custom properties provide flexibility

### **Component Organization**

1. Features folder for domain-specific components
2. Shared folder for reusable components
3. Collocate related files
4. Clear naming conventions

### **Data Management**

1. JSON for static data
2. Zod for runtime validation
3. Type-safe imports
4. Centralized configuration

### **Performance**

1. Use memo for expensive components
2. Static generation where possible
3. Proper image optimization
4. Lazy load when beneficial

---

## 🔐 Security

- No sensitive data in code
- Environment variables for secrets
- CSP headers configured
- Dependabot enabled
- Security workflow in GitHub Actions

---

## 📖 References

### **Documentation**

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

### **Project Documentation**

- `README.md` - Project overview
- `CONTRIBUTING.md` - Contribution guide
- `docs/` - Additional documentation

---

**Last Updated**: October 18, 2025  
**Maintainer**: Md Asif Bin Khaled  
**Status**: ✅ Production Ready
