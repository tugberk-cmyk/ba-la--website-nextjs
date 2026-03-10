import { NextRequest, NextResponse } from "next/server";
import { supabaseBlog } from "@/lib/supabase";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: categories, error } = await supabaseBlog
      .from("blog_categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch categories: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ categories });
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
    const { name, slug, color } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug are required." },
        { status: 400 }
      );
    }

    const { data: category, error } = await supabaseBlog
      .from("blog_categories")
      .insert({ name, slug, color: color || null })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to create category: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
