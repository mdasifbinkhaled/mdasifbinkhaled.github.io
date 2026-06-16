---
paths:
  - 'src/shared/lib/data/**'
  - 'content/**'
---

# Content data rules

- All domain data is typed TS in `src/shared/lib/data/` using `satisfies` against `@/shared/types`.
- Publications: append to `publications.ts` (`PublicationItem`). Homepage shows the first 3 that are not `In Progress`/`Thesis`.
- Courses: tiered. summary=inline, standard=one file, detailed=directory (see `iub-cse211/`). Register new courses in `courses/index.ts` and the right institution array. Only `tier:'detailed'` generates a course page.
- A detailed course opts into the full-width "Command Center" page with `template:'command-center'`; that page reads the optional fields `units`, `assessmentSchemes`, `sectionsRoster`, `quickLinks`, `staff`, `nextMilestone`, `announcements`, `termStartDate`, `pastOfferings` (all on `CourseData`). Populate them in a `command-center.ts` module — model on `iub-cse211/command-center.ts`.
- Blog: MDX file in `content/` with frontmatter (title, date, …).
