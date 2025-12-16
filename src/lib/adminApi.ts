// src/lib/adminApi.ts
"use client";

import { getAdminToken } from "./adminClientAuth";

export async function adminApi<T>(
  path: string,
  opts: RequestInit = {}
): Promise<T> {
  const token = getAdminToken();
  if (!token) throw new Error("Missing admin token. Please login again.");

  const res = await fetch(path, {
    ...opts,
    headers: {
      ...(opts.headers || {}),
      "x-admin-token": token,
      "content-type":
        opts.body instanceof FormData ? undefined : "application/json",
    } as any,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }

  return res.json();
}
