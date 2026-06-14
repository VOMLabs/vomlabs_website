"use client";

import { IconArrowLeft, IconCalendar } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AuthorAvatars } from "@/components/ui/author-avatars";
import type { BlogPostData } from "@/lib/blogs";

interface BlogPostProps {
  post: BlogPostData;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function BlogPost({ post }: BlogPostProps) {
  return (
    <motion.div
      className="mx-auto max-w-2xl px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Link
          className="mb-12 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-brand-accent"
          href="/blog"
        >
          <IconArrowLeft className="size-4" />
          Back to Blog
        </Link>
      </motion.div>

      <article>
        <header className="mb-12">
          <motion.div
            className="mb-4 flex items-center gap-2 text-muted-foreground text-sm"
            variants={itemVariants}
          >
            <span className="flex items-center gap-1.5">
              <IconCalendar className="size-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-muted-foreground/30">·</span>
            <AuthorAvatars authors={post.authors} size="md" />
          </motion.div>
          <motion.div className="mb-6 flex items-center gap-4" variants={itemVariants}>
            <h1 className="font-bold text-3xl text-foreground leading-tight tracking-tight md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
          </motion.div>
        </header>

        <motion.div
          className="prose prose-lg max-w-none prose-code:rounded prose-pre:border prose-hr:border-border prose-pre:border-border prose-blockquote:border-l-brand-accent/50 prose-code:bg-muted prose-pre:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-h3:font-semibold prose-headings:font-bold prose-strong:font-semibold prose-a:text-brand-accent prose-blockquote:text-muted-foreground/90 prose-code:text-brand-accent prose-code:text-sm prose-h2:text-2xl prose-h3:text-xl prose-headings:text-foreground prose-li:text-muted-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-blockquote:italic prose-li:leading-relaxed prose-p:leading-relaxed prose-h2:tracking-tight prose-a:no-underline hover:prose-a:underline prose-h2:md:text-3xl prose-h3:md:text-2xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
          variants={itemVariants}
        />
      </article>
    </motion.div>
  );
}
