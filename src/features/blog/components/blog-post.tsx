import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { CalendarDays, ArrowLeft, Tag } from 'lucide-react';
import type { BlogPost as BlogPostData } from '@/shared/lib/mdx';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { mdxComponents } from './mdx-components';

/** Full blog-post article (header + MDX body). Server component. */
export function BlogPost({ post }: { post: BlogPostData }) {
  return (
    <article className="container-responsive py-10 max-w-3xl">
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="-ml-4 text-muted-foreground hover:text-foreground"
        >
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
      </div>

      <header className="mb-12 space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground text-balance">
          {post.meta.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium">
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            <time dateTime={post.meta.date}>
              {new Date(post.meta.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>

          <div className="flex items-center gap-2">
            {post.meta.tags?.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-primary/5 text-primary border-transparent hover:bg-primary/15"
              >
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-m-20 prose-a:text-primary">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}
