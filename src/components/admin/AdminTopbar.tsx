// src/components/admin/AdminTopbar.tsx
"use client";

import { useRouter } from "next/navigation";
import { clearAdminToken } from "@/lib/adminClientAuth";
import Image from "next/image";
import { LogOut, Package } from "lucide-react";

export default function AdminTopbar() {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-20 border-b border-border bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-brand/10 flex items-center justify-center">
              <Image
                src="/mysha-logo.png"
                alt="Mysha Travels"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand">
                Mysha Travels
              </p>
              <h2 className="text-base font-black text-foreground flex items-center gap-2">
                <Package className="w-4 h-4" />
                Admin Dashboard
              </h2>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            clearAdminToken();
            router.replace("/admin/login");
          }}
          className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2 text-sm font-bold hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
}
