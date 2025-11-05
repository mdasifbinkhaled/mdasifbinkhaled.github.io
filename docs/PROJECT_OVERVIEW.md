# Project Overview - Portfolio Website

**Project Name:** mdasifbinkhaled.github.io  
**Owner:** M Dasif Bin Khaled  
**Type:** Academic Portfolio Website  
**Status:** ✅ **Production Ready**  
**Last Updated:** January 16, 2025

---

## 📋 Executive Summary

This is a modern, performance-optimized academic portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. The site showcases academic achievements, publications, teaching experience, and research work with a focus on accessibility, maintainability, and user experience.

### Key Highlights

- ✅ **89/89 tests passing** - Comprehensive test coverage
- ✅ **TypeScript strict mode** - Type-safe codebase
- ✅ **WCAG 2.1 AA compliant** - Accessible to all users
- ✅ **Static export** - Fast, secure, SEO-friendly
- ✅ **Centralized data** - Single source of truth
- ✅ **Modular architecture** - Feature-based organization

---

## 🏗️ Architecture

### Technology Stack

**Core Framework:**

- **Next.js 15.5.4** - App Router, React 19
- **TypeScript 5.9.2** - Strict mode enabled
- **Tailwind CSS 4.0.1** - Utility-first styling

**Development:**

- **Vitest 3.2.4** - Unit and integration testing
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Commitlint** - Conventional commits

**Deployment:**

- **GitHub Pages** - Static hosting
- **GitHub Actions** - CI/CD pipeline

### Project Structure

```
mdasifbinkhaled.github.io/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── about/             # About page
│   │   ├── teaching/          # Teaching portfolio
│   │   ├── publications/      # Publications list
│   │   ├── research/          # Research work
│   │   ├── experience/        # Professional experience
│   │   ├── cv/                # CV page
│   │   └── contact/           # Contact form
│   │
│   ├── features/              # Feature-based modules
│   │   ├── academic/          # Academic components
│   │   ├── publications/      # Publication components
│   │   └── teaching/          # Teaching components
│   │
│   └── shared/                # Shared code
│       ├── components/        # Reusable UI components
│       ├── config/            # Configuration & constants
│       ├── hooks/             # Custom React hooks
│       ├── lib/              # Utilities & data
│       ├── providers/        # Context providers
│       └── types/            # TypeScript types
│
├── tests/                     # Test suite (89 tests)
├── public/                    # Static assets
└── docs/                      # Documentation
```

### Design Principles

1. **Feature-Based Architecture**
   - Each major feature in its own folder
   - Self-contained with components, types, and logic

2. **Centralized Data Management**
   - All data in `src/shared/lib/data/`
   - Single source of truth
   - Type-safe data access

3. **Component Composition**
   - Small, focused components
   - Reusable UI components in `shared/components/`
   - Feature-specific components in `features/`

4. **Type Safety**
   - TypeScript strict mode
   - Centralized type definitions
   - Runtime validation where needed

5. **Accessibility First**
   - WCAG 2.1 AA compliance
   - Semantic HTML
   - Keyboard navigation
   - Screen reader support

---

## 📊 Current Status

### Build & Test Status

| Metric          | Status       | Details                              |
| --------------- | ------------ | ------------------------------------ |
| **Build**       | ✅ Passing   | Next.js production build successful  |
| **Tests**       | ✅ 89/89     | All unit & integration tests passing |
| **TypeScript**  | ✅ Strict    | No type errors                       |
| **Lint**        | ✅ Clean     | ESLint passing                       |
| **Bundle Size** | 📊 Optimized | Homepage: 151 kB, Teaching: 155 kB   |

### Performance Metrics

- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **Static Generation:** All pages pre-rendered at build time

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🎯 Features

### 1. Homepage

- Hero section with dynamic greeting
- Quick stats (publications, students, experience)
- Featured publications
- Latest news and updates
- Call-to-action buttons

### 2. About Page

- Professional bio
- Education history
- Professional affiliations
- Research interests
- Skills and expertise
- Timeline of key milestones

### 3. Teaching Portfolio

- **Hero Stats:** Dynamic metrics with gradients
- **Course Catalog:** IUB and BRACU courses
- **Timeline:** Horizontal infographic (5 teaching positions)
- **Testimonials:** Student feedback
- **Support Roles:** TA, Student Tutor, School of Development

### 4. Publications

- Searchable publication list
- Filter by type (Conference, Journal, Workshop)
- Sort by date
- Abstract expansion
- External links (DOI, PDF, Code)
- Structured data for SEO

### 5. Research

- Current research projects
- Research areas and interests
- Collaborations
- Funding sources

### 6. Professional Experience

- Industry experience
- Academic positions
- Leadership roles
- Timeline visualization

### 7. CV Page

- Downloadable PDF
- Interactive web version
- Print-optimized styling

### 8. Contact

- Contact form
- Email and social links
- Office location

---

## 🔧 Configuration

### Constants (`src/shared/config/constants.ts`)

```typescript
// Timing & Animation
ANIMATION: {
  DURATION_FAST: 200,
  DURATION_NORMAL: 300,
  DURATION_SLOW: 500,
  OBSERVER_THRESHOLD: 0.1
}

// Career Information
CAREER: {
  TEACHING_START_YEAR: 2015,
  FIRST_TEACHING_POSITION: 'May 2015',
  YEARS_TEACHING: (dynamic calculation)
}

// Teaching Metrics
TEACHING_METRICS: {
  AVERAGE_CLASS_SIZE: 30,
  TOTAL_STUDENTS: 300,
  AVERAGE_RATING: 4.7,
  MAX_RATING: 5.0
}

// Display Limits
DISPLAY_LIMITS: {
  PUBLICATIONS_ON_HOMEPAGE: 3,
  MAX_ABSTRACT_LENGTH: 200
}
```

### Data Files

All data is centralized in `src/shared/lib/data/`:

- `courses.ts` - Course information (IUB, BRACU)
- `publications.ts` - Publication records
- `experience.ts` - Professional experience
- `teaching-stats.ts` - Teaching statistics
- `testimonials.ts` - Student testimonials
- `teaching-timeline.ts` - Teaching career timeline

### Type Definitions

Centralized types in `src/shared/types/`:

- `index.ts` - Common types
- `teaching.ts` - Teaching-related types
- `publication.ts` - Publication types
- `course.ts` - Course types

---

## 🚀 Development

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Setup

```bash
# Clone repository
git clone https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io.git
cd mdasifbinkhaled.github.io

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Start production server (local)

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run type-check       # TypeScript type checking

# Deployment
npm run export           # Build and export static site
# Manual: Push to main branch (auto-deploys via GitHub Actions)
```

---

## 📈 Recent Changes

### January 16, 2025 - Teaching Module Refactoring

**Commit:** `10f93b6`

**Changes:**

- ✅ Centralized all teaching data (eliminated hardcoded values)
- ✅ Redesigned hero section with gradients and animations
- ✅ Created horizontal timeline infographic
- ✅ Removed workshops tab (kept 5 teaching positions only)
- ✅ Extended constants with ANIMATION, CAREER, TEACHING_METRICS
- ✅ Created 4 new data files, 1 type file
- ✅ Bundle size reduced: 9.45 kB → 8.69 kB (-8%)

**Files Modified:** 7  
**Files Created:** 7 (4 data, 3 docs)  
**Tests:** 89/89 passing ✅

### October-November 2025 - Previous Improvements

- Navigation optimization
- Homepage/About differentiation
- Theme improvements
- Beautification updates
- Critical security fixes

See [IMPLEMENTATION_HISTORY.md](./IMPLEMENTATION_HISTORY.md) for complete history.

---

## 🔐 Security

- **Content Security Policy** configured
- **CodeQL scanning** enabled
- **Dependabot** active for dependency updates
- **No exposed secrets** (all data is public academic info)
- **Static site** (no server-side vulnerabilities)

---

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Screen reader tested
- Color contrast ratios meet standards
- Focus indicators visible
- Skip-to-content links

---

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized images for mobile
- Responsive typography

---

## 🎨 Theming

- Dark and Light themes
- System preference detection
- Persistent theme selection
- Smooth transitions
- CSS custom properties for easy customization

---

## 📊 Analytics & SEO

- Structured data (Schema.org)
- Open Graph tags
- Twitter Cards
- Sitemap auto-generated
- Robots.txt configured
- Meta descriptions
- Semantic HTML for better SEO

---

## 🔄 Maintenance

### Regular Tasks

**Weekly:**

- Monitor GitHub Actions
- Check for security alerts
- Review dependabot PRs

**Monthly:**

- Update dependencies (`npm update`)
- Review and update content
- Check analytics

**Quarterly:**

- Full content review (publications, teaching)
- Performance audit
- Accessibility review
- Documentation update

### Known Issues & Limitations

None currently. All tests passing, build successful.

### Future Enhancements (Optional)

1. **CSS Pattern Consolidation** (P2)
   - Add Tailwind utilities for repeated patterns
   - Found 10+ instances of repeated `transition-all duration-200 hover:shadow-lg`
   - Low priority, ~2-3 hours effort

2. **Advanced Analytics** (P3)
   - Page view tracking
   - User interaction analytics
   - Performance monitoring

3. **Blog Section** (P4)
   - Technical writing
   - Research updates
   - Teaching insights

---

## 📞 Support & Contact

- **Repository:** https://github.com/mdasifbinkhaled/mdasifbinkhaled.github.io
- **Live Site:** https://mdasifbinkhaled.github.io
- **Issues:** GitHub Issues
- **Documentation:** `/docs` folder

---

## 📄 License

All rights reserved. Academic portfolio content © M Dasif Bin Khaled.

---

**Last Review:** January 16, 2025  
**Next Review:** February 16, 2025  
**Version:** 2.1.0  
**Status:** ✅ Production
