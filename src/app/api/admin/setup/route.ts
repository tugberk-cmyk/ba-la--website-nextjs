import { NextRequest, NextResponse } from "next/server";
import { supabaseBlog } from "@/lib/supabase";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // Check if any admin already exists
    const { data: existingAdmins, error: checkError } = await supabaseBlog
      .from("admin_users")
      .select("id")
      .limit(1);

    if (checkError) {
      return NextResponse.json(
        { error: "Database error: " + checkError.message },
        { status: 500 }
      );
    }

    if (existingAdmins && existingAdmins.length > 0) {
      return NextResponse.json(
        { error: "Admin already exists. Setup can only be run once." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required." },
        { status: 400 }
      );
    }

    const password_hash = await hashPassword(password);

    const { data, error } = await supabaseBlog
      .from("admin_users")
      .insert({ email, password_hash, name })
      .select("id, email, name")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to create admin: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Admin account created successfully.",
      admin: data,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
