// src/lib/adminAuth.ts
import { NextRequest } from "next/server";

export function requireAdmin(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return { ok: false as const, error: "Unauthorized" };
  }
  return { ok: true as const };
}
