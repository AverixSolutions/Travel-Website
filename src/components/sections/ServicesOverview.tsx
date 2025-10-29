// src/components/sections/ServicesOverview.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Route, Stamp, Users, Headset } from "lucide-react";

export default function ServicesOverview() {
  const items = [
    {
      icon: Route,
      title: "Custom Itineraries",
      points: ["Tailored day-by-day plans", "Handpicked stays & locals"],
      description:
        "We craft day-by-day plans that match your style, pace, and interests—for trips that feel truly yours.",
    },
    {
      icon: Stamp,
      title: "Visa Assistance",
      points: ["Guidance & documentation", "Fast-tracked appointments"],
      description:
        "Clear checklists, documentation support, and appointment help to keep your visa process smooth.",
    },
    {
      icon: Users,
      title: "Group & Corporate",
      points: ["Private group travel", "Retreats & MICE planning"],
      description:
        "From family groups to corporate retreats and incentives, we coordinate every detail end-to-end.",
    },
    {
      icon: Headset,
      title: "24×7 Support",
      points: ["Real-time help on trip", "Transparent updates"],
      description:
        "Travel confidently with round-the-clock assistance—before, during, and after your journey.",
    },
  ];

  return (
    <section
      id="services"
      className="relative isolate w-full py-14 md:py-20 lg:py-24"
      aria-label="Services overview"
    >
      {/* Full-bleed background with gentle wash & vignette */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/paper-texture.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/70 md:bg-white/60" />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_420px_at_85%_-10%,rgba(0,0,0,0.05)_0%,transparent_60%)]" />
      </div>

      <div className="container">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-3)]">
            What we do
          </p>
          <h2 className="mt-2 text-[28px]/[1.2] md:text-4xl font-extrabold tracking-tight text-foreground">
            Travel made <span className="text-brand">effortless</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-foreground/70">
            From planning and visas to on-ground support—everything designed to
            keep your trip smooth and memorable.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, points, description }, idx) => (
            <article
              key={idx}
              className="
                group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-card
                shadow-sm ring-1 ring-black/0 transition
                motion-safe:duration-300 hover:shadow-md hover:ring-black/5
                focus-within:shadow-md focus-within:ring-black/5
              "
            >
              {/* Body */}
              <div className="relative p-5 md:p-6">
                {/* corner glow */}
                <div
                  className="
                    pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-25
                    bg-[radial-gradient(circle_at_30%_30%,color-mix(in_lab,var(--brand)_55%,white),transparent_60%)]
                  "
                />
                <div className="relative">
                  {/* Icon pill */}
                  <div
                    className="
                      inline-flex h-12 w-12 items-center justify-center rounded-xl text-white
                      shadow-sm motion-safe:transition-transform motion-safe:duration-300
                      bg-[linear-gradient(135deg,var(--brand),var(--accent-3))]
                      group-hover:scale-110
                    "
                    aria-hidden
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 text-base md:text-lg font-semibold text-foreground">
                    {title}
                  </h3>

                  {/* Bullet points */}
                  <ul className="mt-3 space-y-2 text-sm text-foreground/75">
                    {points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Mobile-first: inline description (visible on <md) */}
                  <p className="mt-3 text-sm text-foreground/75 md:hidden">
                    {description}
                  </p>
                </div>
              </div>

              {/* md+ hover reveal panel */}
              <div
                className="
                  pointer-events-none absolute inset-0 hidden items-end md:flex
                  opacity-0 motion-safe:transition-all motion-safe:duration-300
                  group-hover:opacity-100
                "
                aria-hidden
              >
                <div
                  className="
                    m-4 w-[calc(100%-2rem)] translate-y-2 rounded-xl border border-[var(--border)]
                    bg-white/90 p-4 text-sm text-foreground/80 shadow-sm backdrop-blur-sm
                    motion-safe:transition-transform motion-safe:duration-300 group-hover:translate-y-0
                  "
                >
                  {description}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 md:mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/services"
            className="
              inline-flex items-center justify-center rounded-xl border border-brand
              px-5 py-2.5 md:px-6 md:py-3 text-sm font-semibold text-brand
              transition hover:bg-[color-mix(in_lab,var(--brand)_10%,white)]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40
            "
          >
            Explore all services
          </Link>
          <Link
            href="#contact"
            className="
              inline-flex items-center justify-center rounded-xl bg-brand
              px-5 py-2.5 md:px-6 md:py-3 text-sm font-semibold text-white
              transition hover:brightness-95
              focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40
            "
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
