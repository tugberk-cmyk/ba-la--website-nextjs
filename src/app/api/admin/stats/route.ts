import { NextRequest, NextResponse } from "next/server";
import { supabaseBlog } from "@/lib/supabase";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [postsRes, categoriesRes] = await Promise.all([
      supabaseBlog.from("blog_posts").select("id, published"),
      supabaseBlog.from("blog_categories").select("id"),
    ]);

    const posts = postsRes.data || [];
    const categories = categoriesRes.data || [];

    const totalPosts = posts.length;
    const publishedPosts = posts.filter((p) => p.published).length;
    const draftPosts = posts.filter((p) => !p.published).length;
    const totalCategories = categories.length;

    return NextResponse.json({
      totalPosts,
      publishedPosts,
      draftPosts,
      totalCategories,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
