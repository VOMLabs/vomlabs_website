import { Metadata } from "next";
import { BlogList } from "@/components/sections/blog";
import { getAllPosts } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Blog",
  description: "News and updates from the VOMLabs team. Learn about new projects, features, announcements, and insights.",
  keywords: ["VOMLabs Blog", "VOMLabs News", "Development Updates", "Announcements"],
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col selection:bg-brand-accent/30 selection:text-brand-accent">
      <div className="fixed inset-0 z-[-2] bg-background" />
      <div
        className="fixed inset-0 z-[-1] opacity-20 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0a0a0' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
        }}
      />

      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <main className="flex-1 w-full pt-32 pb-24">
        <BlogList posts={posts} />
      </main>
    </div>
  );
}
