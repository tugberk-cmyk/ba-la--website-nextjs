import { redirect } from "next/navigation";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // English blog posts not available yet - redirect to Turkish version
  return redirect("/blog");
}
