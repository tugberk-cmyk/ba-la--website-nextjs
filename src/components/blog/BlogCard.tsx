"use client";

import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils/formatDate";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const categoryColor = post.blog_categories?.color || "#6b7280";
  const categoryName = post.blog_categories?.name || "";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border border-border rounded-xl overflow-hidden bg-background hover:-translate-y-1 transition-transform duration-200"
    >
      {/* Cover Image */}
      <div className="aspect-[16/9] overflow-hidden">
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Gorsel yok</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        {categoryName && (
          <span
            className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full mb-3"
            style={{
              backgroundColor: `${categoryColor}15`,
              color: categoryColor,
            }}
          >
            {categoryName}
          </span>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground line-clamp-2 mb-2 group-hover:text-foreground/80 transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        {/* Author & Date */}
        <div className="flex items-center gap-2">
          {post.author_avatar ? (
            <img
              src={post.author_avatar}
              alt={post.author_name}
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground">
                {post.author_name?.charAt(0) || "?"}
              </span>
            </div>
          )}
          <span className="text-xs text-muted-foreground">
            {post.author_name}
          </span>
          <span className="text-xs text-muted-foreground/50">·</span>
          <span className="text-xs text-muted-foreground">
            {formatDate(post.published_at || post.created_at)}
          </span>
        </div>
      </div>
    </Link>
  );
}
