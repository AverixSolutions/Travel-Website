// src/components/sections/AboutTeaser.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CalendarCheck2 } from "lucide-react";

type Props = {
  years?: number;
  scenicSrc?: string;
  groupSrc?: string;
};

export default function AboutTeaser({
  years = 1,
  scenicSrc = "/images/about/AboutTeaser-Image1.jpg",
  groupSrc = "/images/about/AboutTeaser-Image2.jpg",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: "0px 0px -20% 0px",
      threshold: 0.2,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="about-teaser"
      className="relative isolate w-full pt-8 md:pt-14 pb-6 md:pb-8 overflow-hidden"
      aria-label="About Mysha Tours & Travels"
    >
      {/* Soft gradient backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_0%,color-mix(in_lab,var(--accent-2)_45%,transparent),transparent_70%)]" />
      </div>

      <div
        ref={ref}
        className="container grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-12"
      >
        {/* Left: image stack */}
        <div
          className={[
            "relative mx-auto w-full max-w-[520px] lg:col-span-6",
            "transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          {/* big scenic card */}
          <div className="relative mx-auto h-[240px] w-[85%] rotate-3 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 sm:h-[320px] md:h-[380px] md:rounded-3xl">
            <Image
              src={scenicSrc}
              alt="Signature destination"
              fill
              sizes="(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 520px"
              className="rounded-2xl object-cover md:rounded-3xl"
              priority={false}
            />
            <div className="pointer-events-none absolute inset-2 rounded-xl ring-1 ring-white/40 md:inset-3 md:rounded-2xl" />
          </div>

          {/* small group card */}
          <div className="pointer-events-none absolute -left-3 top-8 sm:-left-8 sm:top-14 md:top-20">
            <div className="relative h-[180px] w-[180px] -rotate-6 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 sm:h-[220px] sm:w-[220px] md:h-[240px] md:w-[240px] md:rounded-3xl">
              <Image
                src={groupSrc}
                alt="Happy travellers"
                fill
                sizes="(max-width: 640px) 180px, 240px"
                className="rounded-2xl object-cover md:rounded-3xl"
              />
              <div className="pointer-events-none absolute inset-2 rounded-xl ring-1 ring-white/40 md:inset-3 md:rounded-2xl" />
            </div>
          </div>

          {/* years badge */}
          <div className="pointer-events-none absolute -right-4 top-4 sm:-right-6 sm:top-8">
            <div className="grid place-items-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[color-mix(in_lab,var(--accent)_85%,black)] px-5 py-5 text-[var(--accent-foreground)] shadow-xl ring-1 ring-white/20 sm:px-6 sm:py-6">
              <span className="block text-3xl font-black leading-none sm:text-4xl">
                {years}+
              </span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider opacity-90">
                Years
              </span>
            </div>
          </div>
        </div>

        {/* Right: copy */}
        <div
          className={[
            "lg:col-span-6",
            "transition-all duration-700 delay-100",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <p className="text-xs font-bold tracking-[0.2em] text-[var(--accent-3)] sm:text-sm">
            EMBRACE THE JOURNEY
          </p>

          <h2 className="mt-3 text-[32px]/[1.1] font-black text-foreground sm:text-4xl md:text-5xl">
            We Make Your Travel{" "}
            <span className="bg-gradient-to-r from-brand to-[color-mix(in_lab,var(--brand)_80%,var(--accent))] bg-clip-text text-transparent">
              Unforgettable
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base">
            Trips aren't just about places—they're about stories you'll keep. We
            plan with care, support you on the go, and craft moments that last.
          </p>

          {/* highlight badges */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-[var(--border)]/50 bg-gradient-to-br from-card to-[color-mix(in_lab,var(--card)_95%,var(--brand))] p-3.5 shadow-sm">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand to-[color-mix(in_lab,var(--brand)_85%,black)] text-white shadow-md">
                <CalendarCheck2 className="h-4 w-4" />
              </div>
              <p className="text-xs font-bold text-foreground sm:text-sm">
                Best tour & travel arranger
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[var(--border)]/50 bg-gradient-to-br from-card to-[color-mix(in_lab,var(--card)_95%,var(--accent-3))] p-3.5 shadow-sm">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[var(--accent-3)] to-[color-mix(in_lab,var(--accent-3)_80%,black)] text-white shadow-md">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <p className="text-xs font-bold text-foreground sm:text-sm">
                Expert guides for safety
              </p>
            </div>
          </div>

          {/* quick bullets */}
          <ul className="mt-6 space-y-2.5">
            {[
              "Hassle-free travel experience",
              "Expert guides with insider knowledge",
              "Tailored itineraries to your preferences",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span className="text-sm text-foreground/75">{t}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
            <Link
              href="/about"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-[color-mix(in_lab,var(--brand)_90%,black)] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-all hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 sm:w-auto"
            >
              About Us
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#contact"
              className="flex w-full items-center justify-center rounded-xl border-2 border-brand bg-white px-6 py-3.5 text-sm font-bold text-brand transition-all hover:bg-brand hover:text-white hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 sm:w-auto"
            >
              Talk to an expert
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
