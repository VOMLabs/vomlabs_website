import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPost } from "@/components/sections/blog/blog-post";
import { getAllPosts, getPostBySlug } from "@/lib/blogs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: ["VOMLabs Blog", post.title],
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return Array.isArray(posts) ? posts.map((post) => ({
    slug: post.slug,
  })) : [];
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

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
        <BlogPost post={post} />
      </main>
    </div>
  );
}
