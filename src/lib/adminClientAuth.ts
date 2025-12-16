// src/lib/adminClientAuth.ts
"use client";

const LS_KEY = "admin_token";
const CK_KEY = "admin_token";

export function getAdminToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LS_KEY);
}

export function setAdminToken(token: string) {
  localStorage.setItem(LS_KEY, token);

  document.cookie = `${CK_KEY}=${encodeURIComponent(token)}; path=/; max-age=${
    60 * 60 * 24 * 7
  }; samesite=lax`;
}

export function clearAdminToken() {
  localStorage.removeItem(LS_KEY);
  document.cookie = `${CK_KEY}=; path=/; max-age=0`;
}
