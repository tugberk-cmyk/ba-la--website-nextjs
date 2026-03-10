"use client";

import type { BlogPost } from "@/types/blog";
import BlogCard from "@/components/blog/BlogCard";
import { Separator } from "@/components/ui/separator";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-20 mb-8">
      <Separator className="mb-12" />
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        Okumaya Devam Et
      </p>
      <h2 className="text-2xl font-bold text-foreground mb-8">
        Ilgili Yazilar
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
