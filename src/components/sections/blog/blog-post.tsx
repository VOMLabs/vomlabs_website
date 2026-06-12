"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconCalendar, IconUser, IconArrowLeft, IconBrandDiscord } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
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
        <IconArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      <article>
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <IconCalendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-muted-foreground/30">·</span>
            <span className="flex items-center gap-1.5">
              <IconUser className="w-4 h-4" />
              {post.author}
            </span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center rounded-xl bg-[#5865F2]/10 dark:bg-[#5865F2]/20 p-3 shrink-0">
              <IconBrandDiscord className="w-7 h-7 md:w-8 md:h-8 text-[#5865F2]" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight">
              {post.title}
            </h1>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4 tracking-tight">{children}</h2>
                </motion.div>
              ),
              h3: ({ children }) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-3">{children}</h3>
                </motion.div>
              ),
              p: ({ children }) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <p className="text-muted-foreground leading-relaxed mb-6">{children}</p>
                </motion.div>
              ),
              strong: ({ children }) => (
                <strong className="text-foreground font-semibold">{children}</strong>
              ),
              ul: ({ children }) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">{children}</ul>
                </motion.div>
              ),
              ol: ({ children }) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <ol className="list-decimal list-inside text-muted-foreground mb-6 space-y-2">{children}</ol>
                </motion.div>
              ),
              li: ({ children }) => (
                <li className="text-muted-foreground leading-relaxed">{children}</li>
              ),
              a: ({ href, children }) => {
                const isSocialsModal = href === "#github";
                if (isSocialsModal) {
                  return (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        window.dispatchEvent(new CustomEvent("vomlabs:open-socials"));
                      }}
                      className="text-brand-accent hover:underline cursor-pointer font-medium"
                    >
                      {children}
                    </button>
                  );
                }
                return (
                  <a
                    href={href || "#"}
                    target={href?.startsWith("http") ? "_blank" : undefined}
                    rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-brand-accent hover:underline font-medium"
                  >
                    {children}
                  </a>
                );
              },
              code: ({ children }) => (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-brand-accent">
                  {children}
                </code>
              ),
              blockquote: ({ children }) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <blockquote className="border-l-4 border-brand-accent/50 pl-6 my-8 italic text-muted-foreground/90">
                    {children}
                  </blockquote>
                </motion.div>
              ),
              hr: () => <hr className="border-border my-12" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </motion.div>
  );
}
