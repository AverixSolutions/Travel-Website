// src/app/admin/login/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { setAdminToken } from "@/lib/adminClientAuth";
import Image from "next/image";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/admin/packages";

  const [token, setToken] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [showToken, setShowToken] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (token.trim().length < 8) {
      setErr("Token looks too short.");
      return;
    }

    setAdminToken(token.trim());

    window.location.href = next;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand via-accent-3 to-brand p-4 flex items-center justify-center">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-4xl">
        <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-xl">
          <div className="grid md:grid-cols-2">
            {/* Left: Brand */}
            <div className="relative p-8 md:p-10 text-white">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-white ring-1 ring-white/20 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/mysha-logo.png"
                      alt="Mysha Travels"
                      width={56}
                      height={56}
                      className="object-contain"
                      priority
                    />
                  </div>

                  <div>
                    <h1 className="text-2xl font-black tracking-tight">
                      Mysha Travels
                    </h1>
                    <p className="text-sm text-white/80">Admin Portal</p>
                  </div>
                </div>

                <p className="mt-8 text-base text-white/90 leading-relaxed">
                  Manage packages, pricing, galleries, and visibility in one
                  place.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Secure Access", "Fast Updates", "Cloud Images"].map(
                    (t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white ring-1 ring-white/15"
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>

                <div className="mt-10 flex items-center gap-2 text-white/80">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  <span className="text-sm">
                    Access protected by admin token
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white p-8 md:p-10">
              <div className="mb-7">
                <h2 className="text-3xl font-black text-foreground">
                  Welcome back
                </h2>
                <p className="mt-2 text-sm text-foreground/60">
                  Enter your admin token to continue.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Admin Token
                  </label>

                  <div className="relative">
                    <input
                      type={showToken ? "text" : "password"}
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="Enter your admin token"
                      className="w-full rounded-xl border border-border bg-muted px-4 py-3.5 pr-12 outline-none transition-all focus:border-brand focus:ring-4 focus:ring-brand/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowToken(!showToken)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors p-1"
                      aria-label={showToken ? "Hide token" : "Show token"}
                    >
                      {showToken ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {err && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {err}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-brand to-accent-3 px-6 py-3.5 font-bold text-white shadow-lg shadow-brand/30 hover:shadow-xl hover:shadow-brand/40 transition-all duration-200 hover:scale-[1.01]"
                >
                  Sign In
                </button>

                <p className="text-center text-xs text-foreground/50">
                  © {new Date().getFullYear()} Mysha Travels. All rights
                  reserved.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
