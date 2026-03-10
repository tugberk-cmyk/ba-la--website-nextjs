import { NextRequest, NextResponse } from "next/server";
import { supabaseBlog } from "@/lib/supabase";
import { getAdminFromRequest, generateSlug } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const published = searchParams.get("published");

    let query = supabaseBlog
      .from("blog_posts")
      .select("*, blog_categories(id, name, slug, color)")
      .order("created_at", { ascending: false });

    if (published === "true") {
      query = query.eq("published", true);
    } else if (published === "false") {
      query = query.eq("published", false);
    }

    const { data: posts, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch posts: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      excerpt,
      content,
      cover_image,
      category_id,
      author_name,
      author_title,
      author_avatar,
      published,
      meta_title,
      meta_description,
    } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 }
      );
    }

    const slug = generateSlug(title);

    const postData: Record<string, unknown> = {
      title,
      slug,
      excerpt: excerpt || null,
      content: content || null,
      cover_image: cover_image || null,
      category_id: category_id || null,
      author_name: author_name || null,
      author_title: author_title || null,
      author_avatar: author_avatar || null,
      published: published || false,
      meta_title: meta_title || null,
      meta_description: meta_description || null,
    };

    if (published) {
      postData.published_at = new Date().toISOString();
    }

    const { data: post, error } = await supabaseBlog
      .from("blog_posts")
      .insert(postData)
      .select("*, blog_categories(id, name, slug, color)")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to create post: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
