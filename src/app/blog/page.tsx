import { supabaseBlog } from "@/lib/supabase";
import type { BlogPost, BlogCategory } from "@/types/blog";
import BlogPageClient from "@/components/blog/BlogPageClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const revalidate = 60;

async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabaseBlog
    .from("blog_posts")
    .select("*, blog_categories(*)")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return (data as BlogPost[]) || [];
}

async function getCategories(): Promise<BlogCategory[]> {
  const { data, error } = await supabaseBlog
    .from("blog_categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return (data as BlogCategory[]) || [];
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getCategories(),
  ]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-32 pb-12 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              E-ticaret, SEO ve yapay zeka destekli icerik uretimi hakkinda en
              guncel yazilar ve rehberler.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <BlogPageClient posts={posts} categories={categories} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
