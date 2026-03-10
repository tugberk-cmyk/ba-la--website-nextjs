"use client";

import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils/formatDate";

interface BlogFeaturedCardProps {
  post: BlogPost;
}

export default function BlogFeaturedCard({ post }: BlogFeaturedCardProps) {
  const categoryColor = post.blog_categories?.color || "#6b7280";
  const categoryName = post.blog_categories?.name || "";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border border-border rounded-xl overflow-hidden bg-background hover:-translate-y-1 transition-transform duration-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Cover Image */}
        <div className="aspect-video md:aspect-auto md:h-full overflow-hidden">
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full min-h-[240px] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Gorsel yok</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          {/* Category Badge */}
          {categoryName && (
            <span
              className="inline-block self-start px-3 py-1 text-xs font-medium rounded-full mb-4"
              style={{
                backgroundColor: `${categoryColor}15`,
                color: categoryColor,
              }}
            >
              {categoryName}
            </span>
          )}

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-foreground/80 transition-colors">
            {post.title}
          </h2>

          {/* Excerpt (no clamp) */}
          <p className="text-base text-muted-foreground mb-6">
            {post.excerpt}
          </p>

          {/* Author & Date */}
          <div className="flex items-center gap-3">
            {post.author_avatar ? (
              <img
                src={post.author_avatar}
                alt={post.author_name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <span className="text-sm font-medium text-muted-foreground">
                  {post.author_name?.charAt(0) || "?"}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {post.author_name}
              </span>
              <span className="text-muted-foreground/50">·</span>
              <span>
                {formatDate(post.published_at || post.created_at)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
