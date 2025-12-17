// src/lib/adminApi.ts
"use client";

import { getAdminToken } from "./adminClientAuth";

export async function adminApi<T = unknown>(
  path: string,
  opts: RequestInit = {}
): Promise<T> {
  const token = getAdminToken();
  if (!token) throw new Error("Missing admin token. Please login again.");

  const isForm = opts.body instanceof FormData;

  const baseHeaders: Record<string, string> = {
    "x-admin-token": token,
  };

  if (!isForm) {
    baseHeaders["content-type"] = "application/json";
  }

  const mergedHeaders: HeadersInit = {
    ...baseHeaders,
    ...(opts.headers instanceof Headers
      ? Object.fromEntries(opts.headers.entries())
      : (opts.headers as Record<string, string> | undefined)),
  };

  const res = await fetch(path, {
    ...opts,
    headers: mergedHeaders,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }

  return (await res.json()) as T;
}
