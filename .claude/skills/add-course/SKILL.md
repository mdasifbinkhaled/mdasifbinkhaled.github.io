---
name: add-course
description: Use when adding a new taught course to the teaching portfolio. Scaffolds a course in the tiered course data system and registers it.
---

# Add a course

1. Decide the tier:
   - **summary** — minimal info; add inline where summaries live.
   - **standard** — one file: `src/shared/lib/data/courses/<institution>-<code>.ts` exporting a `CourseData` (use an existing file like `iub-cse201.ts` as a template).
   - **detailed** — a directory `courses/<institution>-<code>/` (model on `iub-cse211/`: `index.ts`, `term.ts`, `resources.ts`, `schedule.ts` (exams/contest), and `command-center.ts`). Only `tier:'detailed'` generates a `/teaching/[institution]/[courseCode]` page, and every detailed course must use the Command Center template (step 4).
2. Register it in `src/shared/lib/data/courses/index.ts`: add the import, the re-export, and push it into `coursesTaughtIUB` or `coursesTaughtBRACU`.
3. For detailed courses, the route slug comes from the term `slug` (e.g. `cse211sum26`). Make sure any link to the course uses that exact slug.
4. **Every detailed course uses the full-width "Command Center" page** — it's the only course-page template. Set `template:'command-center'` on the course object and populate a `command-center.ts` module (`units`, `quickLinks`, `assessmentSchemes`, `sectionsRoster`, `staff`, `nextMilestone`, `announcements`, `termStartDate`, `pastOfferings`) — model on `iub-cse211/command-center.ts`. Without the flag the dynamic route `notFound()`s. The shell auto-hides the profile sidebar for command-center paths (derived in `app/layout.tsx`).
5. Run `npm run build` and confirm `out/teaching/<institution>/<slug>/` is generated, then `npm run test:run`.
