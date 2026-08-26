"use client";

/** Authenticated fetch helper — attaches the session token and normalizes errors. */
export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  token?: string | null
): Promise<T> {
  const t = token ?? (typeof window !== "undefined" ? localStorage.getItem("acw.admin.token") : null);
  const res = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(t ? { "x-admin-token": t } : {}),
      ...(init.headers ?? {}),
    },
  });

  if (res.status === 401 && typeof window !== "undefined") {
    localStorage.removeItem("acw.admin.token");
    localStorage.removeItem("acw.admin.username");
    if (!window.location.pathname.endsWith("/admin")) {
      window.location.href = "/admin";
    }
  }

  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error((body as { error?: string })?.error ?? `Request failed (${res.status}).`);
  }
  return body as T;
}
