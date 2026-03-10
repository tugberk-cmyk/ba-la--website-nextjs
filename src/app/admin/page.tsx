"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileText,
  Eye,
  FilePenLine,
  Tag,
  Plus,
  ArrowRight,
} from "lucide-react";

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalCategories: number;
}

interface RecentPost {
  id: string;
  title: string;
  published: boolean;
  created_at: string;
  blog_categories?: { name: string };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, postsRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/posts?limit=5&sort=-createdAt"),
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        if (postsRes.ok) {
          const postsData = await postsRes.json();
          setRecentPosts(postsData.posts || postsData || []);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      label: "Toplam Yazi",
      value: stats?.totalPosts ?? 0,
      icon: FileText,
      color: "text-gray-900",
    },
    {
      label: "Yayinda",
      value: stats?.publishedPosts ?? 0,
      icon: Eye,
      color: "text-green-600",
    },
    {
      label: "Taslak",
      value: stats?.draftPosts ?? 0,
      icon: FilePenLine,
      color: "text-amber-600",
    },
    {
      label: "Kategoriler",
      value: stats?.totalCategories ?? 0,
      icon: Tag,
      color: "text-blue-600",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Baglac Blog yonetim paneline hos geldiniz.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.label}
                    </p>
                    <p className={`mt-1 text-3xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className="rounded-md bg-gray-100 p-3">
                    <Icon className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions + Recent Posts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Hizli Islemler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start gap-2" variant="outline">
              <Link href="/admin/posts/new">
                <Plus className="h-4 w-4" />
                Yeni Yazi
              </Link>
            </Button>
            <Button asChild className="w-full justify-start gap-2" variant="outline">
              <Link href="/admin/categories">
                <Tag className="h-4 w-4" />
                Kategoriler
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Son Yazilar</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/posts" className="gap-1">
                Tumunu Gor
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentPosts.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-500">
                Henuz yazi bulunmuyor.
              </p>
            ) : (
              <div className="space-y-3">
                {recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/admin/posts/${post.id}/edit`}
                    className="flex items-center justify-between rounded-md border p-3 transition-colors hover:bg-gray-50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {post.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {post.blog_categories?.name || "Kategorisiz"} &middot;{" "}
                        {new Date(post.created_at).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
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
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
