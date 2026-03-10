import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabaseBlog } from "@/lib/supabase";
import type { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils/formatDate";
import BlogContent from "@/components/blog/BlogContent";
import AuthorCard from "@/components/blog/AuthorCard";
import RelatedPosts from "@/components/blog/RelatedPosts";
import CtaSection from "@/components/CtaSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

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

  const categoryColor = post.blog_categories?.color || "#6b7280";
  const categoryName = post.blog_categories?.name || "";
  const categorySlug = post.blog_categories?.slug || "";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <article className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link
                href="/blog"
                className="hover:text-foreground transition-colors"
              >
                Blog
              </Link>
              {categoryName && (
                <>
                  <span className="text-muted-foreground/50">/</span>
                  <span>{categoryName}</span>
                </>
              )}
              <span className="text-muted-foreground/50">/</span>
              <span className="text-foreground truncate max-w-[200px]">
                {post.title}
              </span>
            </nav>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              {post.title}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {/* Category Badge */}
              {categoryName && (
                <span
                  className="inline-block px-3 py-1 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: `${categoryColor}15`,
                    color: categoryColor,
                  }}
                >
                  {categoryName}
                </span>
              )}

              {/* Date */}
              <span className="text-sm text-muted-foreground">
                {formatDate(post.published_at || post.created_at)}
              </span>

              {/* Author */}
              <div className="flex items-center gap-2">
                {post.author_avatar ? (
                  <img
                    src={post.author_avatar}
                    alt={post.author_name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium text-muted-foreground">
                      {post.author_name?.charAt(0) || "?"}
                    </span>
                  </div>
                )}
                <div className="text-sm">
                  <span className="font-medium text-foreground">
                    {post.author_name}
                  </span>
                  {post.author_title && (
                    <span className="text-muted-foreground">
                      {" "}
                      · {post.author_title}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Cover Image */}
            {post.cover_image && (
              <div className="mb-10">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full rounded-xl aspect-video object-cover"
                />
              </div>
            )}

            {/* Content */}
            <BlogContent content={post.content} />

            {/* Author Card */}
            <div className="mt-16">
              <AuthorCard
                name={post.author_name}
                title={post.author_title}
                avatar={post.author_avatar}
              />
            </div>

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} />
          </div>
        </article>

        {/* CTA */}
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
