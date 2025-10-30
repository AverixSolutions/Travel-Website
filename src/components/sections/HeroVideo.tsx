// src/components/sections/HeroVideo.tsx
"use client";

import { Plane, MapPinned } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const whatsappPhone = "917736468222";
  const prefill = encodeURIComponent(
    "Hello! I'd like to know about your travel packages."
  );
  const waHref = `https://wa.me/${whatsappPhone}?text=${prefill}`;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced && videoRef.current) videoRef.current.pause();
  }, []);

  return (
    <section id="home" className="relative isolate pt-[60px] md:pt-[96px]">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-poster.jpg"
      >
        <source src="/travelling-bg-video.mp4" type="video/mp4" />
      </video>

      {/* Readability overlays */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black/40 md:bg-black/30" />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(100%_60%_at_50%_0%,rgba(0,0,0,.25)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      </div>

      {/* Centered content area */}
      <div className="container grid min-h-[calc(100vh-88px)] place-items-center md:min-h-[calc(100vh-96px)]">
        {/* Glass card */}
        <div
          className="w-full max-w-2xl rounded-3xl border border-white/30 bg-white/20 p-6 shadow-xl
                     ring-1 ring-white/20 backdrop-blur-2xl md:p-8
                     [background:linear-gradient(180deg,rgba(255,255,255,.20),rgba(255,255,255,.08))]"
        >
          {/* Kicker */}
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--accent-3)] md:text-sm">
            <MapPinned className="h-4 w-4" />
            Crafted Getaways
          </p>

          {/* Headline */}
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
            Find your next{" "}
            <span className="text-[var(--accent-2)]">adventure</span>
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-sm text-white/85 md:text-base">
            Handpicked packages, custom itineraries, and visa help with honest
            pricing and 24×7 support.
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="#packages"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white
                         transition hover:brightness-95 active:translate-y-[1px]
                         bg-[linear-gradient(135deg,var(--brand)_0%,var(--accent-3)_70%)]"
            >
              <Plane className="h-4 w-4" />
              View Packages
            </a>

            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border px-6 py-3 text-sm font-semibold
                         transition active:translate-y-[1px]
                         border-[var(--brand)] text-[var(--brand)]
                         hover:bg-[color-mix(in_lab,var(--brand)_12%,white)]"
            >
              <FaWhatsapp className="h-5 w-5" />
              WhatsApp
            </a>
          </div>

          {/* Trust chips */}
          <div className="mt-5 flex flex-wrap items-center gap-2 md:gap-3">
            <span className="rounded-full bg-white/25 px-3 py-1 text-xs font-medium text-white/90">
              Tailor-made trips
            </span>
            <span className="rounded-full bg-white/25 px-3 py-1 text-xs font-medium text-white/90">
              Transparent pricing
            </span>
            <span className="rounded-full bg-white/25 px-3 py-1 text-xs font-medium text-white/90">
              24×7 support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
