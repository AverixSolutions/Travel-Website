// src/components/sections/ServicesOverview.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Route, Stamp, Users, Headset, ArrowRight } from "lucide-react";

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
      className="relative isolate w-full py-8 md:py-14"
      aria-label="Services overview"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/paper-texture.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover opacity-40 md:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/85" />
      </div>

      <div className="container px-4">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-3)] sm:text-sm">
            WHAT WE DO
          </p>
          <h2 className="mt-2 text-[32px]/[1.15] font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Travel made{" "}
            <span className="bg-gradient-to-r from-brand to-[color-mix(in_lab,var(--brand)_80%,var(--accent))] bg-clip-text text-transparent">
              effortless
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/70 sm:text-base">
            From planning and visas to on-ground support—everything designed to
            keep your trip smooth and memorable.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {items.map(({ icon: Icon, title, points, description }, idx) => (
            <article
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)]/60 bg-gradient-to-br from-white to-[color-mix(in_lab,var(--card)_98%,var(--brand))] shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:ring-brand/20"
            >
              {/* Gradient overlay */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-brand/10 to-[var(--accent-3)]/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />

              {/* Body */}
              <div className="relative p-5 md:p-6">
                <div className="relative">
                  {/* Icon */}
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-[var(--accent-3)] text-white shadow-md shadow-brand/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand/30">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-foreground md:text-xl">
                    {title}
                  </h3>

                  {/* Bullet points */}
                  <ul className="mt-3 space-y-2 text-sm text-foreground/75">
                    {points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand to-[var(--accent-3)]" />
                        <span className="leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Always visible description */}
                  <p className="mt-4 text-sm leading-relaxed text-foreground/70 border-t border-[var(--border)]/50 pt-4">
                    {description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-center md:mt-12">
          <Link
            href="/services"
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand bg-white px-6 py-3.5 text-sm font-bold text-brand shadow-sm transition-all hover:bg-brand hover:text-white hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 sm:w-auto"
          >
            Explore all services
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-brand to-[color-mix(in_lab,var(--brand)_90%,black)] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-all hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 sm:w-auto"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
