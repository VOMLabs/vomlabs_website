"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IconCalendar, IconUser, IconArrowRight } from "@tabler/icons-react";
import type { BlogPostData } from "@/lib/blogs";

export function BlogList({ posts }: { posts: BlogPostData[] }) {
  const items = Array.isArray(posts) ? posts : [];
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
        {items.map((post, index) => (
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
                    <IconCalendar className="size-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-muted-foreground/30">·</span>
                  <span className="flex items-center gap-1.5">
                    {post.authors?.length ? (
                      <>
                        <span className="flex -space-x-1">
                          {post.authors.slice(0, 3).map((a, i) =>
                            a.avatar ? (
                              <img key={i} src={a.avatar} alt="" className="size-4 rounded-full object-cover ring-1 ring-background" />
                            ) : (
                              <span key={i} className="size-4 rounded-full bg-muted flex items-center justify-center ring-1 ring-background">
                                <IconUser className="size-2.5" />
                              </span>
                            )
                          )}
                        </span>
                        {post.authors.map((a) => a.name).join(", ")}
                      </>
                    ) : (
                      <IconUser className="size-3.5" />
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-brand-accent transition-colors">
                    {post.title}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-accent group-hover:gap-2 transition-all">
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
