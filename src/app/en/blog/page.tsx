import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            English blog posts are coming soon. Stay tuned!
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-md border border-border text-foreground hover:bg-secondary transition-colors"
          >
            Read our Turkish blog
          </Link>
        </div>
      </section>
    </div>
  );
}
