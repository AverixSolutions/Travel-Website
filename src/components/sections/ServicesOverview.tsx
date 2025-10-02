// src/components/sections/ServicesOverview.tsx
import Image from "next/image";
import { Route, Stamp, Users, Headset } from "lucide-react";
import Link from "next/link";

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
    <section id="services" className="relative isolate w-full py-14 md:py-20">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/paper-texture.jpg"
          alt="Soft travel themed backdrop"
          fill
          className="object-cover"
          priority={false}
        />
        {/* gentle white wash to match paper texture */}
        <div className="absolute inset-0 bg-white/70 md:bg-white/60" />
        {/* whisper-light vignette for depth */}
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_400px_at_80%_-10%,rgba(0,0,0,0.04)_0%,transparent_60%)]" />
      </div>

      <div className="container">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent-3)]">
            What we do
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Travel made <span className="text-brand">effortless</span>
          </h2>
          <p className="mt-3 text-foreground/70">
            From planning and visas to on-ground support—everything designed to
            keep your trip smooth and memorable.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, points, description }, idx) => (
            <article
              key={idx}
              className="
                group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-card
                shadow-sm transition-shadow duration-300 hover:shadow-md
              "
            >
              {/* Card body */}
              <div className="relative p-6">
                {/* corner glow */}
                <div
                  className="
                    pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full
                    bg-[radial-gradient(circle_at_30%_30%,color-mix(in_lab,var(--brand)_55%,white),transparent_60%)]
                    opacity-25
                  "
                />
                <div className="relative">
                  <div
                    className="
                      inline-flex h-12 w-12 items-center justify-center rounded-xl
                      bg-[linear-gradient(135deg,var(--brand),var(--accent-3))]
                      text-white shadow-sm transition-transform duration-300 group-hover:scale-110
                    "
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>

                  <ul className="mt-3 space-y-2 text-sm text-foreground/75">
                    {points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Hover description (elegant fade/raise; no top gap) */}
              <div
                className="
                  pointer-events-none absolute inset-0 flex items-end
                  opacity-0 transition-all duration-400
                  group-hover:opacity-100
                "
              >
                <div
                  className="
                    m-4 w-[calc(100%-2rem)] rounded-xl border border-[var(--border)]
                    bg-white/90 p-4 text-sm text-foreground/80 shadow-sm backdrop-blur-sm
                    translate-y-2 transition-transform duration-300 group-hover:translate-y-0
                  "
                >
                  {description}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/services"
            className="
              inline-flex items-center justify-center rounded-xl border border-brand
              px-6 py-3 text-sm font-semibold text-brand
              transition hover:bg-[color-mix(in_lab,var(--brand)_10%,white)]
            "
          >
            Explore all services
          </Link>
          <Link
            href="#contact"
            className="
              inline-flex items-center justify-center rounded-xl bg-brand
              px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95
            "
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
