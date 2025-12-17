// src/app/admin/login/page.tsx
import { Suspense } from "react";
import AdminLoginClient from "./AdminLoginClient";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh grid place-items-center">Loading…</div>
      }
    >
      <AdminLoginClient />
    </Suspense>
  );
}
