"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Trash2, Loader2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);

  // New category form
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newColor, setNewColor] = useState("#374151");
  const [slugEdited, setSlugEdited] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || data || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Auto-generate slug
  useEffect(() => {
    if (!slugEdited && newName) {
      setNewSlug(slugify(newName));
    }
  }, [newName, slugEdited]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          slug: newSlug || slugify(newName),
          color: newColor,
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setCategories((prev) => [...prev, created]);
        setNewName("");
        setNewSlug("");
        setNewColor("#374151");
        setSlugEdited(false);
      }
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/categories/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCategories((prev) =>
          prev.filter((c) => c.id !== deleteTarget.id)
        );
      }
    } catch {
      // silently fail
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kategoriler</h1>
        <p className="text-sm text-gray-500">
          Blog kategorilerini yonetin.
        </p>
      </div>

      {/* Add Category Form */}
      <div className="rounded-md border bg-white p-6">
        <h2 className="mb-4 text-sm font-semibold text-gray-900">
          Yeni Kategori Ekle
        </h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="catName">Kategori Adi</Label>
              <Input
                id="catName"
                placeholder="ornegin: Teknoloji"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="catSlug">Slug</Label>
              <Input
                id="catSlug"
                placeholder="teknoloji"
                value={newSlug}
                onChange={(e) => {
                  setNewSlug(e.target.value);
                  setSlugEdited(true);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="catColor">Renk</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="catColorPicker"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="h-10 w-10 cursor-pointer rounded border border-gray-300 p-0.5"
                />
                <Input
                  id="catColor"
                  placeholder="#374151"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          <Button type="submit" disabled={saving} size="sm">
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Ekle
          </Button>
        </form>
      </div>

      <Separator />

      {/* Categories List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-md border py-16 text-center">
          <p className="text-sm text-gray-500">Henuz kategori bulunmuyor.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between rounded-md border bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: cat.color || "#374151" }}
                />
                <div>
                  <Badge
                    style={{
                      backgroundColor: cat.color
                        ? `${cat.color}20`
                        : "#37415120",
                      color: cat.color || "#374151",
                      borderColor: cat.color
                        ? `${cat.color}40`
                        : "#37415140",
                    }}
                    className="border"
                  >
                    {cat.name}
                  </Badge>
                  <p className="mt-1 text-xs text-gray-400">/{cat.slug}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDeleteTarget(cat)}
                className="text-red-500 hover:text-red-700"
                title="Sil"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kategoriyi Sil</DialogTitle>
            <DialogDescription>
              &quot;{deleteTarget?.name}&quot; kategorisini silmek istediginize
              emin misiniz? Bu kategoriye ait yazilar kategorisiz kalacaktir.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
            >
              Iptal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Siliniyor...
                </>
              ) : (
                "Sil"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
