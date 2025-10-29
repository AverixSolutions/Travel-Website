// src/components/sections/AboutTeaser.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CalendarCheck2 } from "lucide-react";

type Props = {
  years?: number;
  scenicSrc?: string; // large scenic/landmark image
  groupSrc?: string; // group/people image
};

export default function AboutTeaser({
  years = 7,
  scenicSrc = "/images/about/scenic.jpg",
  groupSrc = "/images/about/group.jpg",
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
      className="relative isolate w-full py-16 md:py-24"
      aria-label="About Mysha Tours & Travels"
    >
      {/* Soft gradient backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_90%_-10%,color-mix(in_lab,var(--accent-2)_55%,transparent),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,white_0%,rgba(255,255,255,0.6)_30%,transparent_80%)]" />
      </div>

      <div
        ref={ref}
        className="container grid grid-cols-1 items-center gap-10 lg:grid-cols-12"
      >
        {/* Left: image stack */}
        <div
          className={[
            "relative mx-auto w-full max-w-[640px] lg:col-span-6",
            "transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          {/* big scenic card */}
          <div className="relative mx-auto h-[260px] w-[88%] rotate-6 rounded-3xl border border-white/60 bg-white shadow-xl shadow-black/10 ring-1 ring-black/5 sm:h-[300px] md:h-[360px]">
            <Image
              src={scenicSrc}
              alt="Signature destination"
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 600px"
              className="rounded-3xl object-cover"
              priority={false}
            />
            {/* white inner frame */}
            <div className="pointer-events-none absolute inset-3 rounded-2xl ring-1 ring-white/60" />
          </div>

          {/* small group card (overlapping) */}
          <div className="pointer-events-none absolute -left-2 top-10 sm:-left-6 sm:top-12 md:-left-10 md:top-16">
            <div className="relative h-[210px] w-[210px] -rotate-6 rounded-3xl border border-white/60 bg-white shadow-xl shadow-black/10 ring-1 ring-black/5 sm:h-[240px] sm:w-[240px] md:h-[260px] md:w-[260px]">
              <Image
                src={groupSrc}
                alt="Happy travellers"
                fill
                sizes="(max-width: 768px) 55vw, 280px"
                className="rounded-3xl object-cover"
              />
              <div className="pointer-events-none absolute inset-3 rounded-2xl ring-1 ring-white/60" />
            </div>
          </div>

          {/* years badge */}
          <div className="pointer-events-none absolute -left-2 -top-6 sm:-left-8 sm:-top-8">
            <div className="grid place-items-center rounded-full bg-[var(--accent)] px-6 py-6 text-center text-[var(--accent-foreground)] shadow-lg shadow-black/10 ring-1 ring-black/5 sm:px-7 sm:py-7">
              <span className="block text-3xl font-extrabold leading-none sm:text-4xl">
                {years}
              </span>
              <span className="mt-1 block text-xs font-semibold uppercase tracking-wider">
                Successful
              </span>
              <span className="-mt-0.5 block text-xs font-semibold uppercase tracking-wider">
                Years
              </span>
            </div>
          </div>

          {/* hover micro-interaction */}
          <div className="absolute inset-0 -z-10 transition-transform duration-300 will-change-transform hover:translate-y-[-2px]" />
        </div>

        {/* Right: copy */}
        <div
          className={[
            "lg:col-span-6",
            "transition-all duration-700 delay-100",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          {/* kicker */}
          <p className="text-sm font-semibold tracking-[0.18em] text-[var(--accent-3)]">
            Embrace the Journey
          </p>

          {/* headline */}
          <h2 className="mt-2 text-[34px]/[1.15] font-extrabold text-foreground sm:text-5xl">
            We Make Your Travel{" "}
            <span className="text-brand">Unforgettable</span>
          </h2>

          {/* subhead */}
          <p className="mt-4 max-w-xl text-base text-foreground/75">
            Trips aren’t just about places—they’re about stories you’ll keep. We
            plan with care, support you on the go, and craft moments that last.
          </p>

          {/* highlight badges */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-card p-3 shadow-sm">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-[color-mix(in_lab,var(--brand)_88%,white)] text-white">
                <CalendarCheck2 className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                Best tour & travel arranger
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-card p-3 shadow-sm">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-[color-mix(in_lab,var(--accent-3)_85%,white)] text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                Experienced guides for safety & assistance
              </p>
            </div>
          </div>

          {/* quick bullets */}
          <ul className="mt-6 space-y-3">
            {[
              "Hassle-free travel experience",
              "Expert guides with insider knowledge",
              "Tailored itineraries to your preferences",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <ArrowRight className="mt-0.5 h-4 w-4 text-brand" />
                <span className="text-foreground/80">{t}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            >
              About Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-brand px-6 py-3 text-sm font-semibold text-brand transition hover:bg-[color-mix(in_lab,var(--brand)_10%,white)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/20"
            >
              Talk to an expert
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
