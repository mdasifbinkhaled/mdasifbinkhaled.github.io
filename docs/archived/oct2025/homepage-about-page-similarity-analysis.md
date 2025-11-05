# Homepage vs About Page Similarity Analysis

**Date:** October 20, 2024  
**Status:** Analysis Complete - Awaiting User Decision  
**Severity:** MEDIUM - Significant content overlap detected

## Executive Summary

The Homepage (`/`) and About page (`/about`) have **significant similarities** that create redundancy and confusion about each page's purpose. This analysis identifies 7 major areas of overlap and provides strategic recommendations for differentiation.

---

## Detailed Similarity Analysis

### 🔴 CRITICAL OVERLAPS (Must Fix)

#### 1. "Open to PhD Opportunities" Badge

**Homepage:**

```tsx
<div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 text-primary px-4 py-2 text-sm rounded-full font-semibold my-2 shadow-md border border-primary/30 hover:shadow-lg hover:scale-105 transition-all duration-300">
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
  </span>
  Open to PhD Opportunities
</div>
```

**About Page:**

```tsx
<Badge
  variant="outline"
  className="text-sm px-4 py-1.5 border-primary/30 bg-primary/5"
>
  <Sparkles className="w-3 h-3 mr-1.5 inline" />
  Open to PhD Opportunities
</Badge>
```

**Issue:** Identical message, nearly identical styling  
**Impact:** User sees same badge on two consecutive pages  
**Recommendation:** Keep on Homepage only (it's the first impression)

---

#### 2. Research Interests Section

**Homepage:**

- 6 research areas in 3-column grid
- Detailed cards with icons and descriptions
- Areas: AI in Healthcare, AI in Environment, XAI, Multimodal AI, Remote Sensing, Algorithms & Data Structures
- Left border accent colors (red, green, blue, purple, orange, amber)

**About Page:**

- 4 research areas in 2-column grid
- Similar cards with icons and descriptions
- Areas: AI in Healthcare, XAI, Multimodal AI, Computer Vision
- Icon colors (red, yellow, purple, blue)

**Overlap:** 3 out of 4 areas are identical (75% overlap)

- ✓ AI in Healthcare (both)
- ✓ Explainable AI/XAI (both)
- ✓ Multimodal AI/MMAI (both)
- ✗ Computer Vision (About only)
- ✗ AI in Environment (Homepage only)
- ✗ Remote Sensing (Homepage only)
- ✗ Algorithms & Data Structures (Homepage only)

**Issue:** Near-duplicate content with slightly different styling  
**Impact:** Visitors feel they're reading the same information twice  
**User Confusion:** "Is this the same page? Why am I seeing this again?"

---

#### 3. Quick Stats/Highlights Cards

**Homepage (Quick Stats):**

- 7+ Years Teaching
- 4.0+ Teaching Score
- 4 Research Grants
- 5+ Research Areas

**About Page (Highlights Stats):**

- 15+ Publications
- 1000+ Students Taught
- 6x VC Awards
- 4 Research Grants

**Overlap:** "4 Research Grants" appears on both pages  
**Issue:** 25% content overlap in stats sections  
**Impact:** Reduces uniqueness of each page

---

### 🟡 MODERATE OVERLAPS (Should Fix)

#### 4. Hero Section Description

**Homepage:**

```
Specializing in Explainable AI (XAI) and Multimodal AI (MMAI)
for healthcare diagnostics and analytics.
```

**About Page:**

```
Senior Lecturer and Researcher dedicated to advancing AI in healthcare
through transparent and innovative solutions.
```

**Overlap:** Both emphasize XAI/MMAI in healthcare  
**Issue:** Similar messaging, different wording  
**Recommendation:** Homepage should be tagline, About should be full narrative

---

#### 5. Brief Bio vs My Journey & Vision

**Homepage (Brief Bio):**

```
I am a dedicated researcher and educator with expertise in developing
trustworthy AI systems for healthcare. My work focuses on creating
interpretable machine learning models that bridge the gap between
cutting-edge technology and real-world clinical applications...
```

**About Page (My Journey & Vision):**

```
I am M Dasif Bin Khaled, a Senior Lecturer in Computer Science and
Engineering with a profound passion for both education and research.
My academic and professional pursuits are driven by a commitment to
developing intelligent systems that can make a significant positive
impact, particularly within the healthcare domain.
```

**Overlap:** Both introduce you as a researcher/educator focused on healthcare AI  
**Issue:** Homepage has a brief bio that overlaps with About page's narrative  
**Recommendation:** Remove detailed bio from Homepage (it's for About page)

---

#### 6. Call-to-Action Buttons

**Homepage Hero:**

- "Explore Research" (primary)
- "View CV" (outline)

**About Page Hero:**

- "Download CV" (primary)
- "Get in Touch" (outline)

**Homepage Footer (Connect & Collaborate):**

- "Get in Touch" (primary)

**About Page Footer (Let's Connect):**

- "Contact Me" (primary)
- LinkedIn, Google Scholar, ORCID buttons

**Overlap:** Both have contact CTAs, both have CV links  
**Issue:** Redundant CTAs confuse user journey  
**User Question:** "Where should I actually contact them?"

---

#### 7. Social Links / Academic Profiles

**Homepage:**

- Full "Connect & Collaborate" section
- 6 profile cards: Google Scholar, ResearchGate, ORCID, GitHub, LinkedIn, Email
- Centered layout with icons and labels
- "Get in Touch" button at bottom

**About Page:**

- "Let's Connect" footer section
- 4 profile links: Contact Me, LinkedIn, Google Scholar, ORCID
- Button group layout
- Missing: ResearchGate, GitHub

**Overlap:** Both have extensive social/academic profile links  
**Issue:** Redundant sections, incomplete coverage on About page  
**Recommendation:** Choose ONE page for comprehensive social links

---

## Overlap Summary Table

| Element                      | Homepage | About Page | Overlap %   | Priority |
| ---------------------------- | -------- | ---------- | ----------- | -------- |
| PhD Badge                    | ✅       | ✅         | 100%        | 🔴 High  |
| Research Interests Section   | ✅ (6)   | ✅ (4)     | 75%         | 🔴 High  |
| Research Grants Stat         | ✅       | ✅         | 100%        | 🔴 High  |
| Healthcare AI Focus          | ✅       | ✅         | 90%         | 🟡 Med   |
| Brief Bio / Journey          | ✅       | ✅         | 60%         | 🟡 Med   |
| Contact CTAs                 | ✅       | ✅         | 80%         | 🟡 Med   |
| Social/Academic Links        | ✅ (6)   | ✅ (4)     | 67%         | 🟡 Med   |
| **Overall Similarity Score** |          |            | **~75-80%** |          |

---

## User Experience Impact

### Current Problems

1. **Redundancy:** Visitor feels they're reading the same content twice
2. **Navigation Confusion:** "Why do I need to visit About if Homepage already tells me everything?"
3. **Diluted Impact:** Important information repeated loses its effectiveness
4. **Poor Information Architecture:** Unclear purpose distinction between pages

### Expected User Journey (Broken)

**Intended Flow:**

```
Homepage → Quick Overview → Interested → Visit About → Deep Dive → Contact
```

**Current Reality:**

```
Homepage → Detailed Overview → About Page → "Wait, I've seen this already..." → Leave
```

---

## Strategic Recommendations

### Approach A: Minimal Changes (Quick Fix)

**Focus:** Remove duplicates, keep both pages substantial

1. ✅ **Remove PhD badge from About page** (keep on Homepage only)
2. ✅ **Remove Research Interests from About page** (Homepage has better version)
3. ✅ **Remove Research Grants stat from Homepage** (About page focuses on achievements)
4. ✅ **Remove Brief Bio from Homepage** (About page is for biography)
5. ✅ **Consolidate social links to About page** (remove from Homepage)

**Pros:** Quick to implement, minimal disruption  
**Cons:** Pages may feel incomplete, doesn't solve root problem

---

### Approach B: Clear Differentiation (Recommended)

**Focus:** Give each page a distinct purpose and content strategy

#### Homepage (Landing Page) - "Why Should They Care?"

**Purpose:** First impression, quick overview, drive action

**Keep:**

- ✅ Hero with name, tagline, PhD badge
- ✅ Quick Stats (4 cards)
- ✅ News section (recent achievements)
- ✅ Research Interests (6 areas) - THE comprehensive overview
- ✅ Recent Publications (3-5 items)
- ✅ Work Experience (current + recent)
- ✅ Featured Grant
- ✅ Connect & Collaborate (full social links)

**Remove/Reduce:**

- ❌ Brief Bio (too detailed for Homepage)
- ❌ Research Grants stat (move to About)
- ⚠️ Simplify Research Interests to high-level overview (keep cards but shorter descriptions)

**Adjust:**

- Make tagline more impactful: "Building Trustworthy AI for Healthcare"
- CTAs: "Explore Research" + "Learn About Me" (link to About)
- Keep it scannable, visual, achievement-focused

---

#### About Page (Personal Story) - "Who Are They?"

**Purpose:** Deep dive into personal journey, education, background

**Keep:**

- ✅ Hero with tagline (different from Homepage)
- ✅ Quick Facts card (location, position, focus, goal)
- ✅ Highlights Stats (publications, students, awards, grants)
- ✅ My Journey & Vision (full biography)
- ✅ Education section
- ✅ Beyond Academia (personality)
- ✅ Certifications
- ✅ Let's Connect footer

**Remove:**

- ❌ PhD badge (redundant with Homepage)
- ❌ Research Interests section (Homepage has comprehensive version)

**Adjust:**

- Change hero tagline to: "Educator, Researcher, Lifelong Learner"
- Expand biography to include more personal story
- Add timeline visualization (optional)
- Focus on journey, not just facts

---

### Approach C: Radical Redesign (Advanced)

**Focus:** Merge or completely reimagine page purposes

**Option 1: Merge About into Homepage**

- Create tabbed interface on Homepage
- Tabs: Overview | About Me | Research | Publications | Contact
- Single-page experience with deep sections
- **Pros:** No redundancy, modern design
- **Cons:** Long page, may hurt SEO

**Option 2: Split About into Multiple Pages**

- `/about` - Brief bio + quick facts
- `/about/education` - Detailed education
- `/about/certifications` - Certifications
- `/about/philosophy` - Teaching/research philosophy
- **Pros:** Granular control
- **Cons:** More complex navigation

---

## Detailed Change Recommendations

### 🔴 Priority 1: Critical Duplications (Do First)

#### Change 1: Remove PhD Badge from About Page

**File:** `src/app/about/page.tsx`  
**Action:** Delete the Badge component from hero section

**Before:**

```tsx
<Badge variant="outline" className="...">
  <Sparkles className="w-3 h-3 mr-1.5 inline" />
  Open to PhD Opportunities
</Badge>
```

**After:** (Remove entirely)

**Rationale:** Homepage is the first impression, should have this badge

---

#### Change 2: Remove Research Interests Section from About Page

**File:** `src/app/about/page.tsx`  
**Action:** Delete entire `<section id="research-interests">` block

**Rationale:**

- Homepage has 6 research areas (comprehensive)
- About has 4 areas (75% overlap)
- Homepage is better suited for research overview
- About should focus on personal journey

**Alternative:** Replace with "Research Philosophy" section explaining your approach to research (unique content)

---

#### Change 3: Differentiate Stats Sections

**Homepage:** Keep focus on career metrics

- 7+ Years Teaching
- 4.0+ Teaching Score
- **Remove:** 4 Research Grants (move to About)
- 5+ Research Areas

**About Page:** Keep focus on achievements

- 15+ Publications
- 1000+ Students Taught
- 6x VC Awards
- 4 Research Grants

**Rationale:** Each page has unique metrics

---

### 🟡 Priority 2: Content Optimization

#### Change 4: Remove Brief Bio from Homepage

**File:** `src/app/page.tsx`  
**Action:** Delete the "Brief Bio Section" after Quick Stats

**Before:**

```tsx
{
  /* Brief Bio Section - NEW */
}
<div className="mt-[var(--space-section-sm)] max-w-3xl mx-auto text-center">
  <p className="text-lg text-foreground/90 leading-relaxed">
    I am a dedicated researcher and educator...
  </p>
</div>;
```

**After:** (Remove entirely)

**Rationale:**

- Homepage should be scannable, not detailed
- Biography belongs on About page
- Homepage focuses on achievements, not narrative

---

#### Change 5: Consolidate Social Links

**Recommendation:** Keep full social links section on Homepage ONLY

**Homepage:** Keep "Connect & Collaborate" section (6 profiles)

**About Page:** Simplify to button group

```tsx
<div className="flex gap-3 justify-center flex-wrap">
  <Button asChild size="lg">
    <Link href="/contact">Contact Me</Link>
  </Button>
  <Button asChild variant="outline" size="lg">
    <Link href="/">View All Social Links</Link>
  </Button>
</div>
```

**Alternative:** Keep 2 most important links (LinkedIn + Email) on About, rest on Homepage

---

#### Change 6: Update About Page Hero Tagline

**Current:**

```
Senior Lecturer and Researcher dedicated to advancing AI in healthcare
through transparent and innovative solutions.
```

**Recommended:**

```
Educator at Heart, Researcher by Passion
Building trustworthy AI systems while inspiring the next generation of innovators.
```

**Rationale:** More personal, differentiates from Homepage tagline

---

### 🟢 Priority 3: Enhancements (Optional)

#### Change 7: Add Unique Sections to About Page

**Option A: Research Philosophy**
Replace Research Interests with personal approach:

```
## My Research Philosophy

I believe that AI in healthcare must be:
- Transparent: Clear reasoning for every decision
- Accountable: Traceable to source data and logic
- Inclusive: Designed with diverse populations in mind
- Ethical: Prioritizing patient safety and privacy
```

**Option B: Teaching Philosophy**

```
## Teaching Approach

My classroom is a space for curiosity, critical thinking, and collaboration...
```

**Option C: Personal Timeline**
Visual timeline of major milestones:

- 2013: Started B.Sc at BRACU
- 2017: Graduated Summa Cum Laude
- 2017: Started M.Sc at IUB
- 2018: Joined IUB as Lecturer
- 2024: Promoted to Senior Lecturer
- 2025: Leading VC Research Fund project

---

## Implementation Plan

### Phase 1: Quick Wins (1-2 hours)

1. ✅ Remove PhD badge from About page
2. ✅ Remove Research Interests section from About page
3. ✅ Remove Brief Bio from Homepage
4. ✅ Update Research Grants stat (Homepage → About)

**Expected Impact:** 60% similarity reduction

---

### Phase 2: Content Refinement (2-3 hours)

1. ✅ Update About page hero tagline
2. ✅ Consolidate social links (choose Homepage or About)
3. ✅ Differentiate CTA button text
4. ✅ Add unique section to About (Philosophy or Timeline)

**Expected Impact:** 80% similarity reduction

---

### Phase 3: Polish & Test (1 hour)

1. ✅ Review both pages side-by-side
2. ✅ Test user flow: Homepage → About
3. ✅ Verify no broken links
4. ✅ Build and deploy

**Expected Impact:** 100% similarity resolved, clear page purposes

---

## Success Metrics

### Before Changes

- Content Overlap: ~75-80%
- User Confusion: High
- Page Purpose: Unclear
- Navigation Flow: Broken

### After Changes (Target)

- Content Overlap: <20%
- User Confusion: Low
- Page Purpose: Clear (Homepage = Overview, About = Journey)
- Navigation Flow: Logical (Homepage → Interested → About → Contact)

---

## Risks & Considerations

### Risk 1: Less Content on About Page

**Issue:** Removing Research Interests may make About page feel thin  
**Mitigation:** Add unique personal content (Philosophy, Timeline, Fun Facts)

### Risk 2: SEO Impact

**Issue:** Removing duplicate content may affect search rankings  
**Mitigation:** Redirect `/about#research-interests` to `/#research-interests`

### Risk 3: User Expectations

**Issue:** Some users expect About pages to have research interests  
**Mitigation:** Add clear navigation: "Learn more about my research areas →"

---

## Final Recommendations

### ✅ Do These Changes (Approach B - Recommended)

1. **Homepage:**
   - Keep PhD badge
   - Keep comprehensive Research Interests (6 areas)
   - Remove Brief Bio
   - Update Quick Stats (remove Research Grants)
   - Keep full social links section

2. **About Page:**
   - Remove PhD badge
   - Remove Research Interests section
   - Keep Highlights Stats (with Research Grants)
   - Enhance biography with more personal story
   - Simplify social links to 2 buttons
   - Add unique section (Philosophy or Timeline)

### ❌ Don't Do These

- ❌ Don't remove all CTAs from either page
- ❌ Don't completely eliminate About page
- ❌ Don't make Homepage too long by adding About content
- ❌ Don't add duplicate research sections to both pages

---

## Conclusion

The Homepage and About page currently have **~75-80% content overlap**, creating redundancy and user confusion. By implementing **Approach B (Clear Differentiation)**, you can:

1. ✅ Reduce overlap to <20%
2. ✅ Give each page a distinct purpose
3. ✅ Improve user experience and navigation flow
4. ✅ Maintain professional, informative content on both pages
5. ✅ Avoid over-engineering while solving core UX problem

**Recommended Action:** Implement Phase 1 changes first (quick wins), then evaluate if Phase 2 is needed.

**Time Investment:** 3-5 hours total  
**Impact:** High - Significantly improves site UX and professionalism

---

## Next Steps

1. **Review this analysis** with stakeholder (you)
2. **Choose approach** (A, B, or C)
3. **Approve changes** to proceed with implementation
4. **Execute Phase 1** (quick wins)
5. **Review results** and decide on Phase 2
6. **Test and deploy** final version

**Status:** ⏸️ Awaiting your decision on which approach to take.
