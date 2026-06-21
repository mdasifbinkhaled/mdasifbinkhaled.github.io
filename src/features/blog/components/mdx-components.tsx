import type {
  HTMLAttributes,
  AnchorHTMLAttributes,
  OlHTMLAttributes,
} from 'react';

/**
 * Pre-configured element map for rendered blog posts (next-mdx-remote/rsc).
 * Reusable across any MDX surface. The `pre` block is intentionally dark in
 * every theme (sanctioned raw-color exception — see DESIGN.md §2).
 */
export const mdxComponents = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-3xl font-extrabold tracking-tight mt-10 mb-4"
      {...props}
    />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl font-bold tracking-tight mt-10 mb-4 pb-2 border-b"
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl font-semibold tracking-tight mt-8 mb-4 flex items-center gap-2"
      {...props}
    />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground"
      {...props}
    />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
  ),
  ol: (props: OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li className="text-muted-foreground" {...props} />
  ),
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
      {...props}
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    />
  ),
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 border-l-4 border-primary/40 pl-6 italic text-muted-foreground bg-muted/30 py-4 pr-4 rounded-r-md"
      {...props}
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
      {...props}
    />
  ),
  // For full markdown parsing, hook rehype/remark plugins to MDXRemote.
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <div className="my-6 overflow-hidden rounded-xl bg-zinc-950 dark:bg-zinc-900 border border-border shadow-xs">
      <pre
        className="overflow-x-auto p-4 text-sm leading-snug no-scrollbar text-zinc-50"
        {...props}
      />
    </div>
  ),
};
