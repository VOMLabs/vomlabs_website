"use client";

import { IconArrowRight, IconCalendar } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AuthorAvatars } from "@/components/ui/author-avatars";
import type { BlogPostData } from "@/lib/blogs";

export function BlogList({ posts }: { posts: BlogPostData[] }) {
  const items = Array.isArray(posts) ? posts : [];
  return (
    <div className="mx-auto max-w-2xl px-6">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mb-4 font-bold text-4xl text-foreground tracking-tight md:text-5xl">
          Blog
        </h1>
        <p className="text-lg text-muted-foreground">
          News and updates from the VOMLabs team.
        </p>
      </motion.div>

      <div className="space-y-12">
        {items.map((post, index) => (
          <motion.article
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            key={post.slug}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              className="group block rounded-xl border border-transparent transition-all duration-200 hover:border-brand-accent/30 hover:bg-card/30"
              href={`/blog/${post.slug}`}
            >
              <div className="-m-px rounded-xl p-6 transition-all duration-200 group-hover:bg-card/30">
                <div className="mb-3 flex items-center gap-2 text-muted-foreground text-sm">
                  <span className="flex items-center gap-1.5">
                    <IconCalendar className="size-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-muted-foreground/30">·</span>
                  <AuthorAvatars authors={post.authors} />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <h2 className="font-semibold text-foreground text-xl transition-colors group-hover:text-brand-accent md:text-2xl">
                    {post.title}
                  </h2>
                </div>
                <p className="mb-3 text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 font-medium text-brand-accent text-sm transition-all group-hover:gap-2">
                  Read more
                  <IconArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
