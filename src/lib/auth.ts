import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "baglac-dev-secret-key-change-in-production";

export interface AdminPayload {
  id: string;
  email: string;
  name: string;
}

export function signToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function getAdminFromRequest(req: NextRequest): AdminPayload | null {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function generateSlug(title: string): string {
  const turkishMap: Record<string, string> = {
    "ğ": "g",
    "Ğ": "G",
    "ü": "u",
    "Ü": "U",
    "ş": "s",
    "Ş": "S",
    "ı": "i",
    "İ": "I",
    "ö": "o",
    "Ö": "O",
    "ç": "c",
    "Ç": "C",
  };

  let slug = title;
  for (const [from, to] of Object.entries(turkishMap)) {
    slug = slug.replaceAll(from, to);
  }

  return slug
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
