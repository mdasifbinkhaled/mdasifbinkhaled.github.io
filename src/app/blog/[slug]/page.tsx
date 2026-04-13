import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { CalendarDays, ArrowLeft, Tag } from 'lucide-react';
import { getPostBySlug, getAllPosts } from '@/shared/lib/mdx';
import { siteConfig } from '@/shared/config/site';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.meta.title} | ${siteConfig.author}`,
    description: post.meta.description,
    alternates: {
      canonical: `/blog/${post.meta.slug}`,
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: 'article',
      publishedTime: post.meta.date,
      authors: [siteConfig.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Pre-configured MDX components
  const mdxComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1
        className="text-3xl font-extrabold tracking-tight mt-10 mb-4"
        {...props}
      />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        className="text-2xl font-bold tracking-tight mt-10 mb-4 pb-2 border-b"
        {...props}
      />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        className="text-xl font-semibold tracking-tight mt-8 mb-4 flex items-center gap-2"
        {...props}
      />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p
        className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground"
        {...props}
      />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
      <li className="text-muted-foreground" {...props} />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a
        className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        {...props}
        target={props.href?.startsWith('http') ? '_blank' : undefined}
        rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      />
    ),
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote
        className="mt-6 border-l-4 border-primary/40 pl-6 italic text-muted-foreground bg-muted/30 py-4 pr-4 rounded-r-md"
        {...props}
      />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
      <code
        className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
        {...props}
      />
    ),
    pre: (
      props: React.HTMLAttributes<HTMLPreElement> // Note: For complete markdown parsing, hook rehype/remark plugins to MDXRemote
    ) => (
      <div className="my-6 overflow-hidden rounded-xl bg-zinc-950 dark:bg-zinc-900 border border-border shadow-xs">
        <pre
          className="overflow-x-auto p-4 text-sm leading-snug no-scrollbar text-zinc-50"
          {...props}
        />
      </div>
    ),
  };

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
