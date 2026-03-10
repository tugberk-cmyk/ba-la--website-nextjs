"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Upload,
  X,
  ChevronDown,
  Loader2,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface Category {
  _id: string;
  name: string;
  slug: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function AdminNewPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [seoOpen, setSeoOpen] = useState(false);
  const [slugEdited, setSlugEdited] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("");
  const [authorName, setAuthorName] = useState("Baglac Ekibi");
  const [authorTitle, setAuthorTitle] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/admin/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data.categories || data || []);
        }
      } catch {
        // silently fail
      }
    };
    fetchCategories();
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugEdited && title) {
      setSlug(slugify(title));
    }
  }, [title, slugEdited]);

  const handleImageUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setCoverImage(data.url);
      }
    } catch {
      // silently fail
    } finally {
      setUploading(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleImageUpload(file);
    },
    [handleImageUpload]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleSave = async (status: "draft" | "published") => {
    if (!title.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          coverImage,
          category: category || undefined,
          authorName,
          authorTitle,
          content,
          metaTitle,
          metaDescription,
          status,
        }),
      });
      if (res.ok) {
        router.push("/admin/posts");
      }
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon">
            <Link href="/admin/posts">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Yeni Yazi</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handleSave("draft")}
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            Taslak Kaydet
          </Button>
          <Button onClick={() => handleSave("published")} disabled={saving}>
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            Yayinla
          </Button>
        </div>
      </div>

      <Separator />

      {/* Form */}
      <div className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Baslik</Label>
          <Input
            id="title"
            placeholder="Yazi basligi"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            placeholder="yazi-slug"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugEdited(true);
            }}
          />
          <p className="text-xs text-gray-500">
            URL adresi: /blog/{slug || "..."}
          </p>
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <Label htmlFor="excerpt">Ozet</Label>
          <Textarea
            id="excerpt"
            placeholder="Yazi ozeti (2-3 cumle)"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
          />
        </div>

        {/* Cover Image */}
        <div className="space-y-2">
          <Label>Kapak Gorseli</Label>
          {coverImage ? (
            <div className="relative overflow-hidden rounded-md border">
              <img
                src={coverImage}
                alt="Kapak gorseli"
                className="h-48 w-full object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8"
                onClick={() => setCoverImage("")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`flex flex-col items-center justify-center rounded-md border-2 border-dashed p-8 transition-colors ${
                dragActive
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {uploading ? (
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              ) : (
                <>
                  <ImageIcon className="mb-2 h-8 w-8 text-gray-400" />
                  <p className="mb-1 text-sm text-gray-600">
                    Gorseli surukleyip birakin
                  </p>
                  <p className="mb-3 text-xs text-gray-400">
                    veya dosya secin
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) handleImageUpload(file);
                      };
                      input.click();
                    }}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Dosya Sec
                  </Button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Category & Author */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Kategori</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Kategori secin" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="authorName">Yazar Adi</Label>
            <Input
              id="authorName"
              placeholder="Yazar adi"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="authorTitle">Yazar Unvani</Label>
          <Input
            id="authorTitle"
            placeholder="Yazar unvani (ornegin: Icerik Uzmani)"
            value={authorTitle}
            onChange={(e) => setAuthorTitle(e.target.value)}
          />
        </div>

        {/* Markdown Editor */}
        <div className="space-y-2">
          <Label>Icerik</Label>
          <div data-color-mode="light">
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || "")}
              height={400}
              preview="edit"
            />
          </div>
        </div>

        {/* SEO Section */}
        <Collapsible open={seoOpen} onOpenChange={setSeoOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between text-gray-700"
            >
              SEO Ayarlari
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  seoOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Baslik</Label>
              <Input
                id="metaTitle"
                placeholder="SEO baslik (bos birakilirsa yazi basligi kullanilir)"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Aciklama</Label>
              <Textarea
                id="metaDescription"
                placeholder="SEO aciklamasi (155 karakter onerilen)"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={2}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
