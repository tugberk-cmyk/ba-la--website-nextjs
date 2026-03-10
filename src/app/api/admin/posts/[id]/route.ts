import { NextRequest, NextResponse } from "next/server";
import { supabaseBlog } from "@/lib/supabase";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = getAdminFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const { data: post, error } = await supabaseBlog
      .from("blog_posts")
      .select("*, blog_categories(id, name, slug, color)")
      .eq("id", id)
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = getAdminFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
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
      slug,
    } = body;

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) updateData.content = content;
    if (cover_image !== undefined) updateData.cover_image = cover_image;
    if (category_id !== undefined) updateData.category_id = category_id;
    if (author_name !== undefined) updateData.author_name = author_name;
    if (author_title !== undefined) updateData.author_title = author_title;
    if (author_avatar !== undefined) updateData.author_avatar = author_avatar;
    if (published !== undefined) updateData.published = published;
    if (meta_title !== undefined) updateData.meta_title = meta_title;
    if (meta_description !== undefined) updateData.meta_description = meta_description;

    // If changing to published and published_at is not already set, set it now
    if (published === true) {
      const { data: existing } = await supabaseBlog
        .from("blog_posts")
        .select("published_at")
        .eq("id", id)
        .single();

      if (existing && !existing.published_at) {
        updateData.published_at = new Date().toISOString();
      }
    }

    const { data: post, error } = await supabaseBlog
      .from("blog_posts")
      .update(updateData)
      .eq("id", id)
      .select("*, blog_categories(id, name, slug, color)")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to update post: " + error.message },
        { status: 500 }
      );
    }

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = getAdminFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const { error } = await supabaseBlog
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: "Failed to delete post: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Post deleted." });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
