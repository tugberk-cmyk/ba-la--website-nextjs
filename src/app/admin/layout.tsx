"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/me");
        if (res.ok) {
          setAuthenticated(true);
          if (isLoginPage) {
            router.replace("/admin");
          }
        } else {
          setAuthenticated(false);
          if (!isLoginPage) {
            router.replace("/admin/login");
          }
        }
      } catch {
        setAuthenticated(false);
        if (!isLoginPage) {
          router.replace("/admin/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [isLoginPage, router]);

  // Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    );
  }

  // Login page - render without sidebar, full overlay to hide navbar/footer
  if (isLoginPage) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-50">
        {children}
      </div>
    );
  }

  // Not authenticated and not login page - show nothing (redirect in progress)
  if (!authenticated) {
    return null;
  }

  // Authenticated admin layout with sidebar
  return (
    <div className="fixed inset-0 z-50 flex bg-white">
      <AdminSidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6 pt-16 lg:p-8 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}
