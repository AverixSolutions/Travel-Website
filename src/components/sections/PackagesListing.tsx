// src/components/sections/PackagesListing.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Search, MapPin, Calendar, ArrowRight, Filter, X } from "lucide-react";

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
  highlights: string[];
  coverImageUrl: string | null;
  createdAt: string;
};

const formatPrice = (amount: number, currency: string) => {
  if ((currency || "").toUpperCase() === "INR") {
    return `₹${amount.toLocaleString("en-IN")}`;
  }
  return `${currency} ${amount.toLocaleString()}`;
};

export default function PackagesListing() {
  const [items, setItems] = useState<ApiPackage[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState<PackageCategory | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/packages", { cache: "no-store" });
        const json = await res.json();
        if (!alive) return;
        setItems(Array.isArray(json?.items) ? json.items : []);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const filteredPackages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return items.filter((pkg) => {
      const matchesCategory =
        activeCategory === "all" || pkg.category === activeCategory;
      const matchesSearch =
        !q ||
        pkg.title.toLowerCase().includes(q) ||
        pkg.location.toLowerCase().includes(q) ||
        pkg.slug.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  const CATEGORIES = useMemo(() => {
    const counts = {
      international: items.filter((p) => p.category === "international").length,
      domestic: items.filter((p) => p.category === "domestic").length,
      honeymoon: items.filter((p) => p.category === "honeymoon").length,
      adventure: items.filter((p) => p.category === "adventure").length,
    };
    return [
      { id: "all" as const, label: "All Packages", count: items.length },
      {
        id: "international" as const,
        label: "International",
        count: counts.international,
      },
      { id: "domestic" as const, label: "Domestic", count: counts.domestic },
      { id: "honeymoon" as const, label: "Honeymoon", count: counts.honeymoon },
      { id: "adventure" as const, label: "Adventure", count: counts.adventure },
    ];
  }, [items]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-brand via-[color-mix(in_lab,var(--brand)_90%,var(--accent-3))] to-accent-3 py-16 md:py-24">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl mt-14 md:mt-10">
              Explore Our <span className="text-accent-2">Packages</span>
            </h1>
            <p className="mt-4 text-lg text-white/90 sm:text-xl">
              Handcrafted journeys designed to create memories that last a
              lifetime
            </p>

            <div className="mt-8 mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" />
                <input
                  type="text"
                  placeholder="Search by destination or package name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border-2 border-white/20 bg-white/95 py-4 pl-12 pr-4 text-foreground shadow-xl backdrop-blur-sm transition-all placeholder:text-foreground/50 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        {/* Desktop category filter */}
        <div className="mb-8 hidden md:block">
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative overflow-hidden rounded-full px-6 py-3 text-sm font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-brand text-white shadow-lg shadow-brand/30 scale-105"
                    : "bg-white text-foreground border-2 border-border/60 hover:border-brand/50 hover:shadow-md"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {cat.label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      activeCategory === cat.id
                        ? "bg-white/20 text-white"
                        : "bg-muted text-foreground/70"
                    }`}
                  >
                    {cat.count}
                  </span>
                </span>
                {activeCategory === cat.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-brand to-accent-3 opacity-100"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile filter */}
        <div className="mb-6 md:hidden">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="flex w-full items-center justify-between rounded-xl border-2 border-border/60 bg-white px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-brand" />
              <span className="font-bold text-foreground">
                {CATEGORIES.find((c) => c.id === activeCategory)?.label ||
                  "Filter"}
              </span>
            </div>
            <span className="text-sm text-foreground/60">
              {filteredPackages.length} packages
            </span>
          </button>
        </div>

        {showMobileFilter && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowMobileFilter(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">
                  Filter by Category
                </h3>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="rounded-full p-2 hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setShowMobileFilter(false);
                    }}
                    className={`w-full rounded-xl px-4 py-3 text-left font-semibold transition-all ${
                      activeCategory === cat.id
                        ? "bg-brand text-white shadow-md"
                        : "bg-muted/50 text-foreground hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{cat.label}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          activeCategory === cat.id
                            ? "bg-white/20 text-white"
                            : "bg-white text-foreground/70"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-foreground/70">
            Showing{" "}
            <span className="font-bold text-brand">
              {loading ? "..." : filteredPackages.length}
            </span>{" "}
            packages
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-[360px] rounded-2xl border border-border/60 bg-card animate-pulse"
              />
            ))}
          </div>
        ) : filteredPackages.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPackages.map((pkg, index) => (
              <article
                key={pkg.id}
                className="group h-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-brand/30"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={pkg.coverImageUrl || "/placeholders/swiz-image.jpg"}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow-lg capitalize">
                    {pkg.category}
                  </span>

                  <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-foreground shadow-lg backdrop-blur-sm">
                    <Calendar className="inline h-3 w-3 mr-1 -mt-0.5" />
                    {pkg.days}D / {pkg.nights}N
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-brand transition-colors">
                    {pkg.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-sm text-foreground/65">
                    <MapPin className="h-4 w-4 text-brand" />
                    <span>{pkg.location}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(pkg.highlights || []).slice(0, 3).map((h, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground/70"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-5">
                    <div className="flex flex-col">
                      <span className="text-xs text-foreground/60">
                        Starting from
                      </span>
                      <span className="text-2xl font-black text-brand">
                        {formatPrice(pkg.price, pkg.currency)}
                      </span>
                      <span className="text-xs text-foreground/50">
                        per person
                      </span>
                    </div>

                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-all hover:scale-105 hover:bg-[color-mix(in_lab,var(--brand)_90%,black)] hover:shadow-xl"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-foreground/40" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              No packages found
            </h3>
            <p className="text-foreground/60 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-[color-mix(in_lab,var(--brand)_90%,black)] transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
