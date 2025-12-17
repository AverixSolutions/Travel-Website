// src/components/sections/PackagesPreview.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

type PackageCategory = "international" | "domestic" | "honeymoon" | "adventure";

type ApiPackage = {
  id: string;
  title: string;
  slug: string;
  location: string;
  days: number;
  nights: number;
  price: number;
  currency: string;
  category: PackageCategory;
  coverImageUrl: string | null;
  createdAt: string;
};

const formatPrice = (amount: number, currency: string) => {
  if ((currency || "").toUpperCase() === "INR") {
    return `₹${amount.toLocaleString("en-IN")}`;
  }
  return `${currency} ${amount.toLocaleString()}`;
};

export default function PackagesPreview() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const [items, setItems] = useState<ApiPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/packages", { cache: "no-store" });
        const json = await res.json();
        const all = Array.isArray(json?.items) ? json.items : [];
        if (!alive) return;
        setItems(all.slice(0, 8)); // ✅ recent ones only
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const tick = () => {
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
    };

    if (isHovering) return;
    const id = setInterval(tick, 4000);
    return () => clearInterval(id);
  }, [isHovering, items.length]);

  const scrollByPage = (dir: 1 | -1) => {
    const el = listRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  if (!loading && items.length === 0) return null;

  return (
    <section id="packages" className="relative isolate py-10 md:py-14">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[color-mix(in_lab,var(--accent-2)_8%,transparent)] to-transparent" />

      <div className="container">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-3)] sm:text-sm">
              POPULAR PACKAGES
            </p>
            <h2 className="mt-2 text-[32px]/[1.1] font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Handpicked for your next{" "}
              <span className="bg-gradient-to-r from-brand to-[color-mix(in_lab,var(--brand)_80%,var(--accent))] bg-clip-text text-transparent">
                escape
              </span>
            </h2>
            <p className="mt-3 text-sm text-foreground/70 sm:text-base">
              Freshly added packages from your admin panel.
            </p>
          </div>
          <Link
            href="/packages"
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-brand to-[color-mix(in_lab,var(--brand)_90%,black)] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30 sm:w-auto md:px-7 md:py-4"
          >
            View all packages
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative">
          <button
            aria-label="Previous"
            onClick={() => scrollByPage(-1)}
            className="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-white shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-brand hover:text-white hover:border-brand md:flex"
            type="button"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>

          <button
            aria-label="Next"
            onClick={() => scrollByPage(1)}
            className="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-white shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-brand hover:text-white hover:border-brand md:flex"
            type="button"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={listRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onFocus={() => setIsHovering(true)}
            onBlur={() => setIsHovering(false)}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none] md:gap-6"
          >
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="min-w-[85%] shrink-0 snap-start sm:min-w-[60%] md:min-w-[calc(33.333%-16px)]"
                  >
                    <div className="h-[320px] rounded-2xl border border-[var(--border)]/60 bg-card animate-pulse" />
                  </div>
                ))
              : items.map((pkg, i) => (
                  <article
                    key={pkg.id}
                    className="group min-w-[85%] shrink-0 snap-start sm:min-w-[60%] md:min-w-[calc(33.333%-16px)]"
                  >
                    <div className="h-full overflow-visible rounded-2xl">
                      <div className="h-full overflow-hidden rounded-2xl border border-[var(--border)]/60 bg-card shadow-lg ring-1 ring-black/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:ring-brand/20">
                        <div className="relative aspect-[16/11] overflow-hidden rounded-t-2xl">
                          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-105">
                            <Image
                              src={
                                pkg.coverImageUrl ||
                                "/placeholders/swiz-image.jpg"
                              }
                              alt={pkg.title}
                              fill
                              priority={i < 3}
                              className="object-cover"
                              sizes="(min-width: 768px) 33vw, (min-width: 640px) 60vw, 85vw"
                            />
                          </div>
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-black/70 to-black/50 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                            {pkg.days}D / {pkg.nights}N
                          </span>
                        </div>

                        <div className="p-5">
                          <h3 className="text-lg font-bold leading-tight text-foreground">
                            {pkg.title}
                          </h3>
                          <p className="mt-1.5 text-sm text-foreground/65">
                            {pkg.location}
                          </p>

                          <div className="mt-5 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-xs text-foreground/60">
                                from
                              </span>
                              <span className="text-xl font-black text-brand">
                                {formatPrice(pkg.price, pkg.currency)}
                              </span>
                            </div>
                            <a
                              href={`/packages/${pkg.slug}`}
                              className="inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-brand bg-white px-5 py-2.5 text-xs font-bold text-brand transition-all hover:bg-brand hover:text-white hover:scale-105"
                            >
                              Details
                              <ArrowRight className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {[
            { icon: Check, text: "EMI options available" },
            { icon: Check, text: "Fully customizable" },
            { icon: Check, text: "Free visa assistance" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 rounded-full border border-[var(--border)]/60 bg-gradient-to-r from-white to-[color-mix(in_lab,var(--card)_98%,var(--brand))] px-4 py-2.5 shadow-sm transition-all hover:shadow-md hover:scale-105"
            >
              <Icon className="h-3.5 w-3.5 text-brand" />
              <span className="text-xs font-semibold text-foreground/80">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
