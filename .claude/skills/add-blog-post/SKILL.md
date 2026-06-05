---
name: add-blog-post
description: Use when adding a new blog/writing post to the portfolio. Scaffolds an MDX file in content/ with the correct frontmatter.
---

# Add a blog post

1. Create `content/blog/<slug>.mdx` (kebab-case slug becomes the URL `/blog/<slug>`).
2. Start with frontmatter (see `content/blog/welcome.mdx` for the canonical shape):

   ```mdx
   ---
   title: '<Post title>'
   date: '<YYYY-MM-DD>'
   excerpt: '<one-sentence summary shown in the blog list>'
   tags: ['<tag>', '<tag>']
   ---

   <Body in MDX/Markdown>
   ```

3. Keep frontmatter keys consistent with existing posts — the blog list and post page read them via `gray-matter`. Don't invent new keys without updating the reader.
4. Run `npm run build` and confirm `out/blog/<slug>.html` is generated, then `npm run test:run`.
5. CSP is strict (no inline scripts/eval) — don't add raw `<script>` in MDX.
