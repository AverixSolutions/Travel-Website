// src/app/packages/[slug]/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";

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

async function getPackage(slug: string): Promise<ApiPackage | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/packages/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  const json = await res.json();
  return json?.item ?? null;
}

export default async function PackageDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getPackage(slug);

  if (!pkg) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-16">
          <p className="text-xl font-bold">Package not found.</p>
          <Link
            href="/packages"
            className="mt-4 inline-flex items-center gap-2 text-brand font-bold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Packages
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-10 mt-20">
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 text-sm font-bold text-foreground/70 hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Packages
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-stretch">
          {/* Image */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg h-full min-h-[320px]">
            <div className="relative h-full w-full">
              <Image
                src={pkg.coverImageUrl || "/placeholders/swiz-image.jpg"}
                alt={pkg.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand capitalize">
                {pkg.category}
              </span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-foreground/70">
                {pkg.days}D / {pkg.nights}N
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
              {pkg.title}
            </h1>

            <div className="mt-4 flex flex-col gap-2 text-foreground/70">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand" />
                <span className="font-semibold">{pkg.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand" />
                <span className="font-semibold">
                  {pkg.days} days, {pkg.nights} nights
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-foreground/60">
                Starting from
              </p>
              <p className="mt-1 text-3xl font-black text-brand">
                {formatPrice(pkg.price, pkg.currency)}
              </p>
              <p className="text-xs text-foreground/50">per person</p>
            </div>

            {/* Highlights */}
            <div className="mt-6">
              <h2 className="text-lg font-black text-foreground">Highlights</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {(pkg.highlights || []).length ? (
                  pkg.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-muted px-3 py-1.5 text-sm font-semibold text-foreground/75"
                    >
                      {h}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-foreground/60">
                    No highlights added yet.
                  </p>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-all hover:scale-[1.02]"
              >
                Enquire Now
              </a>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center rounded-xl border-2 border-border bg-white px-6 py-3 text-sm font-bold text-foreground transition-all hover:bg-muted"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
