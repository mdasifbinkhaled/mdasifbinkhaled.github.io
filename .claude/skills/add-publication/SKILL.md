---
name: add-publication
description: Use when adding a new publication entry to the portfolio. Appends a typed PublicationItem to the data file in the correct shape.
---

# Add a publication

1. Open `src/shared/lib/data/publications.ts`.
2. Append a new object to `rawPublications` matching the `PublicationItem` type:
   - Required: `id` (kebab, e.g. `pub-venue-year`), `title`, `authors` (string[]), `venue`, `year` (number), `type` (`'Conference' | 'Journal' | 'Workshop' | 'Preprint' | 'In Progress' | 'Book Chapter' | 'Thesis'`).
   - Optional: `abstract`, `keywords` (string[]), links.
3. Keep newest first if the file is ordered by recency.
4. Run `npm run typecheck && npm run test:run` to confirm the shape is valid.
5. Note: `type: 'In Progress'` and `'Thesis'` are excluded from the homepage "Recent Publications" preview.
