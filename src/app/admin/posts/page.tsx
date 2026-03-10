"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
  blog_categories?: { id: string; name: string };
}

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter === "published") params.set("published", "true");
      else if (filter === "draft") params.set("published", "false");
      const res = await fetch(`/api/admin/posts?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || data || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/posts/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Yazilar</h1>
          <p className="text-sm text-gray-500">
            Blog yazilarini yonetin.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new" className="gap-2">
            <Plus className="h-4 w-4" />
            Yeni Yazi
          </Link>
        </Button>
      </div>

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">Tumu</TabsTrigger>
          <TabsTrigger value="published">Yayinda</TabsTrigger>
          <TabsTrigger value="draft">Taslak</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-md border py-16 text-center">
          <p className="text-sm text-gray-500">Yazi bulunamadi.</p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/admin/posts/new">Ilk yaziyi olustur</Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Baslik</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead className="text-right">Islemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="hover:underline"
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {post.blog_categories?.name || "Kategorisiz"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        post.published ? "default" : "secondary"
                      }
                      className={
                        post.published
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                      }
                    >
                      {post.published ? "Yayinda" : "Taslak"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {new Date(post.created_at).toLocaleDateString("tr-TR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          router.push(`/admin/posts/${post.id}/edit`)
                        }
                        title="Duzenle"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteTarget(post)}
                        title="Sil"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
            <DialogTitle>Yaziyi Sil</DialogTitle>
            <DialogDescription>
              &quot;{deleteTarget?.title}&quot; baslikli yaziyi silmek
              istediginize emin misiniz? Bu islem geri alinamaz.
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
