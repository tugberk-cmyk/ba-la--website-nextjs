"use client";

import { useState } from "react";
import type { BlogPost, BlogCategory } from "@/types/blog";
import CategoryFilter from "@/components/blog/CategoryFilter";
import BlogFeaturedCard from "@/components/blog/BlogFeaturedCard";
import BlogCard from "@/components/blog/BlogCard";

interface BlogPageClientProps {
  posts: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogPageClient({
  posts,
  categories,
}: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category_id === selectedCategory)
    : posts;

  const featuredPost = filteredPosts[0] || null;
  const remainingPosts = filteredPosts.slice(1);

  return (
    <>
      {/* Category Filter */}
      <div className="mb-10">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {/* Posts */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground">
            Henuz bu kategoride yayin bulunmuyor.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Featured Post */}
          {featuredPost && <BlogFeaturedCard post={featuredPost} />}

          {/* Remaining Posts Grid */}
          {remainingPosts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
