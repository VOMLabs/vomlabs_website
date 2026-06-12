"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IconCalendar, IconUser, IconArrowRight, IconBrandDiscord } from "@tabler/icons-react";
import type { BlogPostData } from "@/lib/blogs";

export function BlogList({ posts }: { posts: BlogPostData[] }) {
  return (
    <div className="max-w-2xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
          Blog
        </h1>
        <p className="text-lg text-muted-foreground">
          News and updates from the VOMLabs team.
        </p>
      </motion.div>

      <div className="space-y-12">
        {posts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-xl border border-transparent hover:border-brand-accent/30 hover:bg-card/30 transition-all duration-200"
            >
              <div className="p-6 -m-px rounded-xl group-hover:bg-card/30 transition-all duration-200">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1.5">
                  <IconCalendar className="w-3.5 h-3.5" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="text-muted-foreground/30">·</span>
                <span className="flex items-center gap-1.5">
                  <IconUser className="w-3.5 h-3.5" />
                  {post.author}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                {post.slug === "join-our-discord" && (
                  <div className="flex items-center justify-center rounded-lg bg-[#5865F2]/10 dark:bg-[#5865F2]/20 p-1.5 shrink-0">
                    <IconBrandDiscord className="w-4 h-4 text-[#5865F2]" />
                  </div>
                )}
                <h2 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-brand-accent transition-colors">
                  {post.title}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-accent group-hover:gap-2 transition-all">
                Read more
                <IconArrowRight className="w-4 h-4" />
              </span>
            </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
