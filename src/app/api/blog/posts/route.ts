import { NextRequest, NextResponse } from "next/server";
import { supabaseBlog } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);
    const offset = (page - 1) * limit;

    let query = supabaseBlog
      .from("blog_posts")
      .select("*, blog_categories(id, name, slug, color)", { count: "exact" })
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (category) {
      // Filter by category slug via a subquery
      const { data: cat } = await supabaseBlog
        .from("blog_categories")
        .select("id")
        .eq("slug", category)
        .single();

      if (cat) {
        query = query.eq("category_id", cat.id);
      } else {
        // Category not found, return empty results
        return NextResponse.json({
          posts: [],
          total: 0,
          page,
          totalPages: 0,
        });
      }
    }

    query = query.range(offset, offset + limit - 1);

    const { data: posts, error, count } = await query;

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch posts: " + error.message },
        { status: 500 }
      );
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      posts: posts || [],
      total,
      page,
      totalPages,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
