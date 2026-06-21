import type { Metadata } from 'next';
import { getAllPosts } from '@/shared/lib/mdx';
import { siteConfig } from '@/shared/config/site';
import { BlogList } from '@/features/blog';

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.author}`,
  description: 'Articles, research notes, and tutorials on Computer Science.',
  alternates: {
    canonical: '/blog',
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogList posts={posts} />;
}
