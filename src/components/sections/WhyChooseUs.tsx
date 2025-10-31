// src/components/sections/WhyChooseUs.tsx
"use client";

import {
  BadgeCheck,
  Headphones,
  ShieldCheck,
  Clock3,
  MapPinned,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      aria-label="Why choose Mysha Tours & Travels"
      className="relative isolate w-full py-10 md:py-20 overflow-x-hidden"
    >
      {/* loose decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-10 -top-8 h-28 w-28 rounded-full bg-[color-mix(in_lab,var(--brand)_16%,white)] blur-xl" />
        <div className="absolute -right-8 bottom-10 h-24 w-24 rounded-full bg-[color-mix(in_lab,var(--accent-3)_22%,white)] blur-lg" />
      </div>

      <div className="container">
        {/* main panel */}
        <div className="relative overflow-hidden rounded-3xl bg-brand text-white shadow-2xl ring-1 ring-black/5 [contain:paint]">
          {/* subtle inner gradient + noise tint */}
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,_rgba(255,255,255,0.12),_transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.06),_transparent_40%,_rgba(0,0,0,0.08)_100%)]" />

          <div className="relative grid grid-cols-1 gap-10 p-4 sm:p-8 md:p-10 lg:grid-cols-12 lg:gap-12">
            {/* LEFT: pitch */}
            <div className="lg:col-span-6">
              {/* mini illustration */}
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[color-mix(in_lab,var(--accent)_85%,black)] text-[var(--accent-foreground)] shadow-md">
                  <MapPinned className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold tracking-[0.22em] text-white/80">
                  TRAVEL MADE PERSONAL
                </span>
              </div>

              <h2 className="text-[28px]/[1.1] font-black sm:text-4xl md:text-5xl">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-[var(--accent)] to-[color-mix(in_lab,var(--accent)_75%,white)] bg-clip-text text-transparent">
                  Mysha
                </span>
                ?
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                We don&apos;t sell trips—we craft stories you&apos;ll keep. From
                visa help to curated stays and 24×7 assistance, every detail is
                handled so you can simply show up and enjoy the journey.
              </p>

              {/* feature badges */}
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <li className="flex items-center gap-3 rounded-xl bg-white/10 p-3.5 ring-1 ring-white/15 backdrop-blur-sm">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/15">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold">
                    Curated, pre-vetted stays
                  </p>
                </li>
                <li className="flex items-center gap-3 rounded-xl bg-white/10 p-3.5 ring-1 ring-white/15 backdrop-blur-sm">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/15">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold">
                    Transparent pricing, no surprises
                  </p>
                </li>
                <li className="flex items-center gap-3 rounded-xl bg-white/10 p-3.5 ring-1 ring-white/15 backdrop-blur-sm">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/15">
                    <Clock3 className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold">
                    Lightning-fast itinerary updates
                  </p>
                </li>
                <li className="flex items-center gap-3 rounded-xl bg-white/10 p-3.5 ring-1 ring-white/15 backdrop-blur-sm">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/15">
                    <Headphones className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold">24×7 on-trip support</p>
                </li>
              </ul>

              {/* CTA */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/packages"
                  className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-bold text-[var(--accent-foreground)] shadow-lg shadow-black/20 transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  Explore Packages <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-white/70 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  Talk to an Expert
                </Link>
              </div>
            </div>

            {/* RIGHT: process card - now centered */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full max-w-[560px] rounded-2xl bg-[color-mix(in_lab,var(--brand)_86%,black)] p-5 shadow-2xl sm:p-6 md:p-8">
                {/* inner card */}
                <div className="relative rounded-2xl bg-card p-5 shadow-xl ring-1 ring-black/5 sm:p-6">
                  {/* decorative quarter circles */}
                  <div className="pointer-events-none absolute -left-5 -bottom-5 h-16 w-16 rounded-full bg-[var(--accent-3)]/35" />
                  <div className="pointer-events-none absolute -right-5 -bottom-5 h-16 w-16 rounded-full bg-[var(--accent-3)]/35" />

                  <p className="text-xs font-bold tracking-[0.2em] text-[var(--accent-3)]">
                    HOW IT WORKS
                  </p>

                  <ul className="mt-3 space-y-4">
                    {[
                      "Brief us your travel requirements",
                      "Get a perfect match from our pre-vetted options",
                      "Interview & fine-tune your itinerary",
                      "Start your 3-week risk-free trial trip plan",
                    ].map((t, i) => (
                      <li key={t} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-grid h-6 w-6 place-items-center rounded-full bg-[var(--muted)] text-[var(--brand)] text-xs font-extrabold">
                          {i + 1}
                        </span>
                        <span className="text-[15px] font-semibold text-foreground">
                          {t}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* tiny reassurance row */}
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 rounded-lg bg-[var(--muted)] px-3 py-2 text-xs font-semibold text-foreground/80">
                      <ShieldCheck className="h-4 w-4" />
                      Best Price Guarantee
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-lg bg-[var(--muted)] px-3 py-2 text-xs font-semibold text-foreground/80">
                      <BadgeCheck className="h-4 w-4" />
                      Trusted by 2k+ travellers
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* corner accents inside the panel */}
          <div className="pointer-events-none absolute -right-10 top-10 h-28 w-28 rounded-full bg-[color-mix(in_lab,var(--accent)_28%,white)] blur-xl" />
          <div className="pointer-events-none absolute -bottom-6 left-10 h-24 w-24 rounded-full bg-[color-mix(in_lab,var(--accent-2)_36%,white)] blur-xl" />
        </div>
      </div>
    </section>
  );
}
