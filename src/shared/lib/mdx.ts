import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Note: Ensure this path aligns with your project root location.
const contentDirectory = path.join(process.cwd(), 'content', 'blog');

export interface BlogPostMeta {
  title: string;
  date: string;
  description: string;
  slug: string;
  tags?: string[];
}

export interface BlogPost {
  meta: BlogPostMeta;
  content: string;
}

/**
 * Ensures the content directory exists.
 */
function ensureDirectoryExists() {
  if (!fs.existsSync(contentDirectory)) {
    fs.mkdirSync(contentDirectory, { recursive: true });
  }
}

/**
 * Retrieves the raw MDX content and metadata for a given slug.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  ensureDirectoryExists();
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      meta: {
        slug: realSlug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        description: data.description || '',
        tags: data.tags || [],
        ...data,
      },
      content,
    };
  } catch (error) {
    console.error(`Error reading MDX file for slug: ${slug}`, error);
    return null;
  }
}

/**
 * Retrieves all blog posts sorted by date (newest first).
 */
export async function getAllPosts(): Promise<BlogPostMeta[]> {
  ensureDirectoryExists();

  try {
    const files = fs.readdirSync(contentDirectory);

    const posts = files
      .filter((filename) => filename.endsWith('.mdx'))
      .map((filename) => {
        const slug = filename.replace(/\.mdx$/, '');
        const fullPath = path.join(contentDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          description: data.description || '',
          tags: data.tags || [],
          ...data,
        } as BlogPostMeta;
      });

    // Sort by date descending
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error fetching all MDX posts', error);
    return [];
  }
}
