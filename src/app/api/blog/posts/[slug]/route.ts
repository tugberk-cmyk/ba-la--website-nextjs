import { NextRequest, NextResponse } from "next/server";
import { supabaseBlog } from "@/lib/supabase";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const { data: post, error } = await supabaseBlog
      .from("blog_posts")
      .select("*, blog_categories(id, name, slug, color)")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
