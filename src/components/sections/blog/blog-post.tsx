"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconCalendar, IconUser, IconArrowLeft } from "@tabler/icons-react";
import type { BlogPostData } from "@/lib/blogs";

interface BlogPostProps {
  post: BlogPostData;
}

const pageTransition = {
  initial: { opacity: 0, y: 40, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
};

export function BlogPost({ post }: BlogPostProps) {
  return (
    <motion.div
      className="max-w-2xl mx-auto px-6"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      transition={pageTransition.transition}
    >
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-accent transition-colors mb-12"
      >
        <IconArrowLeft className="size-4" />
        Back to Blog
      </Link>

      <article>
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <IconCalendar className="size-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-muted-foreground/30">·</span>
            <span className="flex items-center gap-1.5">
              {post.authors?.length ? (
                <>
                  <span className="flex -space-x-1.5">
                    {post.authors.map((a, i) =>
                      a.avatar ? (
                        <img key={i} src={a.avatar} alt="" className="size-5 rounded-full object-cover ring-1 ring-background" />
                      ) : (
                        <span key={i} className="size-5 rounded-full bg-muted flex items-center justify-center ring-1 ring-background">
                          <IconUser className="size-3" />
                        </span>
                      )
                    )}
                  </span>
                  {post.authors.map((a) => a.name).join(", ")}
                </>
              ) : (
                <IconUser className="size-4" />
              )}
            </span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight">
              {post.title}
            </h1>
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none prose-headings:text-foreground prose-headings:font-bold prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:tracking-tight prose-h3:text-xl prose-h3:md:text-2xl prose-h3:font-semibold prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-strong:font-semibold prose-code:text-brand-accent prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-blockquote:border-l-brand-accent/50 prose-blockquote:text-muted-foreground/90 prose-blockquote:italic prose-li:text-muted-foreground prose-li:leading-relaxed prose-hr:border-border"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </motion.div>
  );
}
