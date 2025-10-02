// src/components/sections/PackagesPreview.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type PackageCard = {
  id: string;
  title: string;
  location: string;
  days: number;
  price: string;
  image: string;
};

const MOCK_PACKAGES: PackageCard[] = [
  {
    id: "bali",
    title: "Bali Escape",
    location: "Bali, Indonesia",
    days: 5,
    price: "₹49,999",
    image: "/placeholders/swiz-image.jpg",
  },
  {
    id: "maldives",
    title: "Maldives Overwater",
    location: "Maldives",
    days: 4,
    price: "₹89,999",
    image: "/placeholders/swiz-image.jpg",
  },
  {
    id: "dubai",
    title: "Dubai City & Desert",
    location: "UAE",
    days: 5,
    price: "₹54,999",
    image: "/placeholders/swiz-image.jpg",
  },
  {
    id: "kashmir-1",
    title: "Kashmir Meadows",
    location: "Srinagar, Gulmarg",
    days: 6,
    price: "₹34,999",
    image: "/placeholders/swiz-image.jpg",
  },
  {
    id: "thailand",
    title: "Thailand Trio",
    location: "Bangkok • Phuket • Krabi",
    days: 6,
    price: "₹39,999",
    image: "/placeholders/swiz-image.jpg",
  },
  {
    id: "kashmir-2",
    title: "Kashmir Meadows",
    location: "Srinagar, Gulmarg",
    days: 6,
    price: "₹34,999",
    image: "/placeholders/swiz-image.jpg",
  },
  {
    id: "kashmir-3",
    title: "Kashmir Meadows",
    location: "Srinagar, Gulmarg",
    days: 6,
    price: "₹34,999",
    image: "/placeholders/swiz-image.jpg",
  },
];

export default function PackagesPreview() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

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
  }, [isHovering]);

  const scrollByPage = (dir: 1 | -1) => {
    const el = listRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section id="packages" className="py-12 md:py-24">
      <div className="container">
        {/* Heading */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:mb-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold tracking-widest text-[var(--accent-3)] uppercase">
              Popular Packages
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
              Handpicked for your next{" "}
              <span className="text-brand">escape</span>
            </h2>
            <p className="mt-2 text-foreground/70">
              Curated stays, smooth transfers, and honest pricing.
            </p>
          </div>
          <a
            href="/packages"
            className="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95 whitespace-nowrap"
          >
            View all packages
          </a>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Arrows (desktop) */}
          <button
            aria-label="Previous"
            onClick={() => scrollByPage(-1)}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-card/90 border border-border shadow hover:brightness-95"
            type="button"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>

          <button
            aria-label="Next"
            onClick={() => scrollByPage(1)}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-card/90 border border-border shadow hover:brightness-95"
            type="button"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>

          {/* Track */}
          <div
            ref={listRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onFocus={() => setIsHovering(true)}
            onBlur={() => setIsHovering(false)}
            className={[
              "flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2",
              // hide scrollbars (webkit + firefox + old ms)
              "[&::-webkit-scrollbar]:hidden",
              "[scrollbar-width:none]",
              "[-ms-overflow-style:none]",
            ].join(" ")}
          >
            {MOCK_PACKAGES.map((pkg, i) => (
              <article
                key={pkg.id}
                className="group snap-start shrink-0 min-w-[80%] sm:min-w-[55%] md:min-w-[calc(33.333%-16px)]"
              >
                {/* Card with overflow visible */}
                <div className="h-full overflow-visible rounded-2xl">
                  <div className="h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-card shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
                    {/* Image container with smooth upward movement */}
                    <div className="relative aspect-[16/11] overflow-hidden rounded-t-2xl">
                      <div className="h-full w-full transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-105">
                        <Image
                          src={pkg.image}
                          alt={pkg.title}
                          fill
                          priority={i < 3}
                          className="object-cover"
                          sizes="(min-width: 768px) 33vw, (min-width: 640px) 55vw, 80vw"
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {pkg.days} Days
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold leading-tight">
                        {pkg.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-foreground/70">
                        {pkg.location}
                      </p>

                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-sm">
                          from{" "}
                          <span className="font-semibold text-brand text-base">
                            {pkg.price}
                          </span>
                        </span>
                        <a
                          href={`/packages/${pkg.id}`}
                          className="inline-flex items-center justify-center rounded-lg border border-brand px-4 py-2 text-xs font-semibold text-brand transition hover:bg-[color-mix(in_lab,var(--brand)_10%,white)]"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Helper chips */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-foreground/70">
          <span className="rounded-full bg-[var(--muted)] px-4 py-2">
            EMI options
          </span>
          <span className="rounded-full bg-[var(--muted)] px-4 py-2">
            Customizable
          </span>
          <span className="rounded-full bg-[var(--muted)] px-4 py-2">
            Visa assistance
          </span>
        </div>
      </div>
    </section>
  );
}
