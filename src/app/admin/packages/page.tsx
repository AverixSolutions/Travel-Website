// src/app/admin/packages/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { adminApi } from "@/lib/adminApi";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import type { Package, PackageCategory } from "@/types/package";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Upload,
  MapPin,
  Calendar,
  DollarSign,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const emptyForm = {
  title: "",
  slug: "",
  location: "",
  days: 1,
  nights: 0,
  price: 0,
  currency: "INR",
  category: "domestic" as PackageCategory,
  highlightsText: "",
  isActive: true,
  coverImageUrl: null as string | null,
  gallery: [] as {
    url: string;
    publicId?: string | null;
    sortOrder?: number;
  }[],
};

export default function AdminPackagesPage() {
  const [items, setItems] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Package | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [uploading, setUploading] = useState(false);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return items;
    return items.filter(
      (p) =>
        p.title.toLowerCase().includes(t) ||
        p.location.toLowerCase().includes(t) ||
        p.slug.toLowerCase().includes(t)
    );
  }, [items, q]);

  async function refresh() {
    setLoading(true);
    try {
      const res = await adminApi<{ items: Package[] }>("/api/admin/packages");
      setItems(res.items);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setOpen(true);
  };

  const openEdit = (pkg: Package) => {
    setEditing(pkg);
    setForm({
      title: pkg.title,
      slug: pkg.slug,
      location: pkg.location,
      days: pkg.days,
      nights: pkg.nights,
      price: pkg.price,
      currency: pkg.currency,
      category: pkg.category,
      highlightsText: (pkg.highlights || []).join(", "),
      isActive: pkg.isActive,
      coverImageUrl: pkg.coverImageUrl ?? null,
      gallery: (pkg.gallery || []).map((g) => ({
        url: g.url,
        publicId: g.publicId ?? null,
        sortOrder: g.sortOrder,
      })),
    });
    setOpen(true);
  };

  const save = async () => {
    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      location: form.location.trim(),
      days: Number(form.days),
      nights: Number(form.nights),
      price: Number(form.price),
      currency: form.currency?.trim() || "INR",
      category: form.category,
      isActive: !!form.isActive,
      coverImageUrl: form.coverImageUrl,
      highlights: form.highlightsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      gallery: form.gallery.map((g, i) => ({
        url: g.url,
        publicId: g.publicId ?? null,
        sortOrder: g.sortOrder ?? i,
      })),
    };

    if (!payload.title || !payload.slug || !payload.location) {
      alert("Title, slug, and location are required.");
      return;
    }

    if (editing) {
      await adminApi(`/api/admin/packages/${editing.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    } else {
      await adminApi(`/api/admin/packages`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    setOpen(false);
    await refresh();
  };

  const remove = async (id: string) => {
    const ok = confirm("Delete this package? This action cannot be undone.");
    if (!ok) return;

    await adminApi(`/api/admin/packages/${id}`, { method: "DELETE" });
    await refresh();
  };

  const onUploadCover = async (file: File) => {
    setUploading(true);
    try {
      const token = localStorage.getItem("admin_token") || "";
      const up = await uploadToCloudinary(file, token);
      setForm((s) => ({ ...s, coverImageUrl: up.url }));
    } finally {
      setUploading(false);
    }
  };

  const onAddGallery = async (file: File) => {
    setUploading(true);
    try {
      const token = localStorage.getItem("admin_token") || "";
      const up = await uploadToCloudinary(file, token);
      setForm((s) => ({
        ...s,
        gallery: [
          ...s.gallery,
          { url: up.url, publicId: up.publicId, sortOrder: s.gallery.length },
        ],
      }));
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <AdminTopbar />

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container py-8">
          {/* Header Section */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-foreground flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-accent" />
                Travel Packages
              </h1>
              <p className="text-sm text-foreground/60 mt-1">
                Create, edit, and manage your travel offerings
              </p>
            </div>

            <button
              onClick={openCreate}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-accent-3 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/30 hover:shadow-xl hover:shadow-brand/40 transition-all hover:scale-[1.02]"
            >
              <Plus className="w-5 h-5" />
              New Package
            </button>
          </div>

          {/* Search and Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <div className="sm:col-span-2 lg:col-span-3 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by title, location, or slug..."
                className="w-full rounded-xl border border-border bg-white pl-12 pr-4 py-3.5 outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all"
              />
            </div>
            <div className="rounded-xl border border-border bg-gradient-to-br from-brand/5 to-accent/5 p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-foreground/60">
                  Total
                </p>
                <p className="text-2xl font-black text-brand">
                  {filtered.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-brand" />
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <PackageSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-border bg-white p-16 text-center">
              <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Search className="w-10 h-10 text-foreground/30" />
              </div>
              <p className="text-xl font-bold text-foreground mb-2">
                No packages found
              </p>
              <p className="text-sm text-foreground/60">
                {q
                  ? "Try a different search term"
                  : "Create your first package to get started"}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] bg-muted relative overflow-hidden">
                    <Image
                      src={
                        p.coverImageUrl ||
                        p.gallery?.[0]?.url ||
                        "/placeholders/swiz-image.jpg"
                      }
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur-sm ${
                          p.isActive
                            ? "bg-green-500/90 text-white"
                            : "bg-yellow-500/90 text-white"
                        }`}
                      >
                        {p.isActive ? "LIVE" : "DRAFT"}
                      </span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-brand/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                        {p.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-black text-foreground line-clamp-1 mb-2">
                      {p.title}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{p.location}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span className="font-semibold">
                          {p.days}D/{p.nights}N
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4 text-accent" />
                        <span className="text-xl font-black text-brand">
                          ₹{p.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-border">
                      <button
                        onClick={() => openEdit(p)}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand/5 hover:bg-brand/10 px-4 py-2.5 text-sm font-bold text-brand transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => remove(p.id)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-red-50 hover:bg-red-100 px-4 py-2.5 text-sm font-bold text-red-600 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="sticky top-0 z-10 bg-gradient-to-r from-brand to-accent-3 p-6 rounded-t-3xl">
              <div className="flex items-start justify-between gap-4">
                <div className="text-white">
                  <h2 className="text-2xl font-black">
                    {editing ? "Edit Package" : "Create New Package"}
                  </h2>
                  <p className="text-white/80 text-sm mt-1">
                    {editing
                      ? "Update package details and images"
                      : "Add a new travel package to your catalog"}
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-white/20 hover:bg-white/30 p-2 text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label="Package Title"
                  icon={<Sparkles className="w-4 h-4" />}
                >
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, title: e.target.value }))
                    }
                    placeholder="e.g., Magical Switzerland Tour"
                    className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all"
                  />
                </Field>

                <Field label="URL Slug" icon={<Sparkles className="w-4 h-4" />}>
                  <input
                    value={form.slug}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, slug: e.target.value }))
                    }
                    placeholder="magical-switzerland-tour"
                    className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all"
                  />
                </Field>

                <Field label="Location" icon={<MapPin className="w-4 h-4" />}>
                  <input
                    value={form.location}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, location: e.target.value }))
                    }
                    placeholder="Switzerland"
                    className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all"
                  />
                </Field>

                <Field label="Category" icon={<Sparkles className="w-4 h-4" />}>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((s) => ({
                        ...s,
                        category: e.target.value as any,
                      }))
                    }
                    className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all"
                  >
                    <option value="international">International</option>
                    <option value="domestic">Domestic</option>
                    <option value="honeymoon">Honeymoon</option>
                    <option value="adventure">Adventure</option>
                  </select>
                </Field>

                <Field label="Days">
                  <input
                    type="number"
                    value={form.days}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, days: Number(e.target.value) }))
                    }
                    className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all"
                  />
                </Field>

                <Field label="Nights">
                  <input
                    type="number"
                    value={form.nights}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, nights: Number(e.target.value) }))
                    }
                    className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all"
                  />
                </Field>

                <Field
                  label="Price (₹)"
                  icon={<DollarSign className="w-4 h-4" />}
                >
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, price: Number(e.target.value) }))
                    }
                    placeholder="50000"
                    className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all"
                  />
                </Field>

                <Field label="Currency">
                  <input
                    value={form.currency}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, currency: e.target.value }))
                    }
                    placeholder="INR"
                    className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all"
                  />
                </Field>

                <Field label="Highlights (comma separated)" full>
                  <input
                    value={form.highlightsText}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, highlightsText: e.target.value }))
                    }
                    placeholder="Eiffel Tower, Swiss Alps, Lake Geneva"
                    className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all"
                  />
                </Field>

                <Field label="Visibility" full>
                  <label className="flex items-center gap-3 p-4 rounded-xl border border-border bg-muted/50 cursor-pointer hover:bg-muted transition-all">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, isActive: e.target.checked }))
                      }
                      className="w-5 h-5 rounded accent-brand"
                    />
                    <div className="flex items-center gap-2">
                      {form.isActive ? (
                        <>
                          <Eye className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-foreground">
                            Visible on website
                          </span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-5 h-5 text-yellow-600" />
                          <span className="font-semibold text-foreground">
                            Hidden (Draft)
                          </span>
                        </>
                      )}
                    </div>
                  </label>
                </Field>

                <Field label="Cover Image" full>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="relative w-32 h-24 rounded-xl overflow-hidden border-2 border-border">
                      <Image
                        src={
                          form.coverImageUrl || "/placeholders/swiz-image.jpg"
                        }
                        alt="Cover"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <label className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand/30 bg-brand/5 hover:bg-brand/10 px-6 py-4 transition-all">
                        <Upload className="w-5 h-5 text-brand" />
                        <span className="text-sm font-bold text-brand">
                          {uploading ? "Uploading..." : "Upload Cover Image"}
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploading}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) onUploadCover(f);
                        }}
                      />
                    </label>
                  </div>
                </Field>

                <Field label="Gallery Images" full>
                  <div className="flex flex-wrap gap-3">
                    {form.gallery.map((g, idx) => (
                      <div key={idx} className="relative group">
                        <div className="relative w-28 h-20 rounded-xl overflow-hidden border-2 border-border">
                          <Image
                            src={g.url}
                            alt={`Gallery ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setForm((s) => ({
                              ...s,
                              gallery: s.gallery.filter((_, i) => i !== idx),
                            }))
                          }
                          className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1.5 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}

                    <label className="cursor-pointer">
                      <div className="flex items-center justify-center w-28 h-20 rounded-xl border-2 border-dashed border-brand/30 bg-brand/5 hover:bg-brand/10 transition-all">
                        <Plus className="w-6 h-6 text-brand" />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploading}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) onAddGallery(f);
                        }}
                      />
                    </label>
                  </div>
                </Field>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-xl border-2 border-border bg-white px-6 py-3 text-sm font-bold hover:bg-muted transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={save}
                  disabled={uploading}
                  className="rounded-xl bg-gradient-to-r from-brand to-accent-3 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-brand/30 hover:shadow-xl hover:shadow-brand/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading
                    ? "Uploading..."
                    : editing
                    ? "Update Package"
                    : "Create Package"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({
  label,
  children,
  full,
  icon,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="flex items-center gap-2 mb-2 text-sm font-bold text-foreground">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}

function PackageSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm animate-pulse">
      <div className="aspect-[16/10] bg-muted"></div>
      <div className="p-5 space-y-4">
        <div className="h-6 bg-muted rounded-lg w-3/4"></div>
        <div className="h-4 bg-muted rounded-lg w-1/2"></div>
        <div className="flex gap-4">
          <div className="h-4 bg-muted rounded-lg w-20"></div>
          <div className="h-4 bg-muted rounded-lg w-24"></div>
        </div>
        <div className="flex gap-2 pt-4 border-t border-border">
          <div className="flex-1 h-10 bg-muted rounded-xl"></div>
          <div className="h-10 w-16 bg-muted rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
