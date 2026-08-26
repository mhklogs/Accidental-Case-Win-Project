"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
} from "lucide-react";
import LoginGate from "@/components/admin/LoginGate";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { apiFetch } from "@/components/admin/api";

export default function AdminPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "logged-out" | "ready">("loading");
  const [username, setUsername] = useState<string | null>(null);

  // Restore an existing session from localStorage on mount.
  useEffect(() => {
    const token = localStorage.getItem("acw.admin.token");
    if (!token) {
      setStatus("logged-out");
      return;
    }
    apiFetch<{ username: string }>("/api/settings/trustedform", {}, token)
      .then(() => {
        setUsername(localStorage.getItem("acw.admin.username"));
        setStatus("ready");
      })
      .catch(() => {
        clearSession();
        setStatus("logged-out");
      });
  }, []);

  function handleLogin(user: string) {
    setUsername(user);
    setStatus("ready");
  }

  function clearSession() {
    localStorage.removeItem("acw.admin.token");
    localStorage.removeItem("acw.admin.username");
  }

  function handleLogout() {
    clearSession();
    setUsername(null);
    setStatus("logged-out");
    router.refresh();
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-navy-700" />
      </div>
    );
  }

  return (
    <>
      {status === "logged-out" ? (
        <LoginGate onSuccess={handleLogin} />
      ) : (
        <AdminDashboard username={username} onLogout={handleLogout} />
      )}
    </>
  );
}
