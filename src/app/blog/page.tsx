import type { Metadata } from 'next';
import Link from 'next/link';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/shared/lib/mdx';
import { siteConfig } from '@/shared/config/site';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.author}`,
  description: 'Articles, research notes, and tutorials on Computer Science.',
  alternates: {
    canonical: '/blog',
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container-responsive py-8 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Writing & Notes</h1>
        <p className="text-xl text-muted-foreground max-w-2xl text-balance">
          Thoughts on human-computer interaction, academic research, and
          software engineering.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <Card className="h-full hover:shadow-md transition-all duration-300 border-border/50 hover:border-primary/50 overflow-hidden flex flex-col group-hover:-translate-y-1">
              <CardHeader className="space-y-3 flex-none">
                <div className="flex items-center justify-between">
                  {post.tags?.[0] && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {post.tags[0]}
                    </Badge>
                  )}
                  <div className="flex items-center text-xs text-muted-foreground font-medium">
                    <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-sm line-clamp-3 leading-relaxed">
                  {post.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border/50 flex items-center text-sm font-medium text-primary">
                Read Article{' '}
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </CardFooter>
            </Card>
          </Link>
        ))}

        {posts.length === 0 && (
          <div className="col-span-full py-24 text-center border-2 border-dashed rounded-xl border-muted">
            <h3 className="text-xl font-medium text-foreground">
              No posts yet
            </h3>
            <p className="text-muted-foreground mt-2">
              Check back soon for new articles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
