import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabaseBlog } from "@/lib/supabase";
import type { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils/formatDate";
import { estimateReadingTime } from "@/lib/utils/readingTime";
import BlogContent from "@/components/blog/BlogContent";
import AuthorCard from "@/components/blog/AuthorCard";
import RelatedPosts from "@/components/blog/RelatedPosts";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import CtaSection from "@/components/CtaSection";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock } from "lucide-react";

export const revalidate = 60;

async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabaseBlog
    .from("blog_posts")
    .select("*, blog_categories(*)")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return null;
  return data as BlogPost;
}

async function getRelatedPosts(
  categoryId: string,
  currentPostId: string
): Promise<BlogPost[]> {
  const { data, error } = await supabaseBlog
    .from("blog_posts")
    .select("*, blog_categories(*)")
    .eq("published", true)
    .eq("category_id", categoryId)
    .neq("id", currentPostId)
    .order("published_at", { ascending: false })
    .limit(3);

  if (error) return [];
  return (data as BlogPost[]) || [];
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Yazi bulunamadi — Baglac Blog" };
  }

  return {
    title: post.meta_title || `${post.title} — Baglac Blog`,
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: post.cover_image ? [post.cover_image] : [],
      type: "article",
      locale: "tr_TR",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category_id, post.id);
  const readingTime = estimateReadingTime(post.content);

  const categoryColor = post.blog_categories?.color || "#6b7280";
  const categoryName = post.blog_categories?.name || "";

  return (
    <>
      <ReadingProgressBar />

      <article className="pt-32 pb-16 bg-background">
        {/* ---- HEADER ---- */}
        <header className="max-w-[680px] mx-auto px-6">
          {/* Back link */}
          <Link
            href="/en/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Blog
          </Link>

          {/* Category Badge */}
          {categoryName && (
            <span
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4"
              style={{
                backgroundColor: `${categoryColor}15`,
                color: categoryColor,
              }}
            >
              {categoryName}
            </span>
          )}

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-[2.75rem] font-bold leading-[1.2] tracking-tight text-foreground mb-6">
            {post.title}
          </h1>

          {/* Excerpt as subtitle */}
          {post.excerpt && (
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {post.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex items-center gap-4 pb-8">
            {post.author_avatar ? (
              <img
                src={post.author_avatar}
                alt={post.author_name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <span className="text-sm font-semibold text-muted-foreground">
                  {post.author_name?.charAt(0) || "?"}
                </span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                {post.author_name}
              </span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>
                  {formatDate(post.published_at || post.created_at)}
                </span>
                <span className="text-muted-foreground/40">&middot;</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {readingTime} dk okuma
                </span>
              </div>
            </div>
          </div>

          <Separator />
        </header>

        {/* ---- COVER IMAGE ---- */}
        {post.cover_image && (
          <div className="max-w-4xl mx-auto px-6 mt-10">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full rounded-2xl aspect-[2/1] object-cover"
            />
          </div>
        )}

        {/* ---- ARTICLE CONTENT ---- */}
        <div className="max-w-[680px] mx-auto px-6 mt-12">
          <BlogContent content={post.content} />
        </div>

        {/* ---- AUTHOR CARD ---- */}
        <div className="max-w-[680px] mx-auto px-6 mt-16">
          <Separator className="mb-12" />
          <AuthorCard
            name={post.author_name}
            title={post.author_title}
            avatar={post.author_avatar}
          />
        </div>

        {/* ---- RELATED POSTS ---- */}
        <div className="max-w-5xl mx-auto px-6">
          <RelatedPosts posts={relatedPosts} />
        </div>
      </article>

      {/* CTA */}
      <CtaSection />
    </>
  );
}
