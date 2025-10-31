// src/components/section/ServiceArea.tsx
"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ServiceGlobe = dynamic(
  () => import("./ServiceGlobe").then((m) => m.ServiceGlobe),
  { ssr: false, loading: () => null }
);

const AREAS = [
  { name: "Dubai (Al Karama)" },
  { name: "Coimbatore" },
  { name: "Bengaluru – Electronic City" },
  { name: "Thrissur" },
];

const listVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0.05, ease: EASE },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: EASE },
  },
};

export default function ServiceAreas() {
  return (
    <section id="service-areas" className="relative py-14 sm:py-20">
      {/* Single unified gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[rgba(62,42,121,0.04)] via-transparent to-[rgba(232,177,34,0.03)]" />

      <div className="container">
        <div className="mx-auto max-w-[1600px]">
          <div
            className="
              grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr]
              md:gap-3 items-start
            "
          >
            {/* LEFT: Heading, chips, CTA block */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="
                md:flex md:flex-col md:justify-between
                md:min-h-[480px] lg:min-h-[520px]
              "
            >
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight animated-gradient-text">
                  Service Areas
                </h2>
                <div className="mt-2 h-[3px] w-16 rounded-full bg-gradient-to-r from-[color:var(--brand)]/70 via-[color:var(--accent)]/50 to-transparent" />
                <p className="mt-3 text-sm sm:text-base opacity-80">
                  We serve travelers across these locations:
                </p>

                {/* Chips grid */}
                <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 [grid-auto-rows:minmax(72px,auto)]"
                >
                  {AREAS.map((a) => (
                    <motion.li
                      key={a.name}
                      variants={itemVariants}
                      className="h-full"
                    >
                      <AreaChip>{a.name}</AreaChip>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* CTA block with travel theme */}
              <div className="mt-6">
                <div
                  className="
      relative w-full overflow-hidden rounded-2xl
      bg-gradient-to-br from-white/95 via-white/90 to-[color:var(--accent-2)]/30 backdrop-blur
      ring-1 ring-[color:var(--brand)]/15
      shadow-[0_20px_50px_-20px_rgba(62,42,121,0.35)]
      px-5 py-6 sm:px-6 sm:py-7
    "
                >
                  {/* Decorative purple-gold glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full
                 bg-[radial-gradient(closest-side,rgba(232,177,34,0.20),transparent_70%)]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full
                 bg-[radial-gradient(closest-side,rgba(62,42,121,0.12),transparent_70%)]"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                    {/* Text */}
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold">
                        Plan your journey with us
                      </h3>
                      <p className="mt-1 text-sm sm:text-[15px] opacity-80">
                        Get in touch to create unforgettable travel experiences.
                      </p>
                    </div>

                    {/* Contact action */}
                    <a
                      href="/contact"
                      className="btn btn--shine rounded-xl inline-flex items-center gap-2 group w-full sm:w-auto justify-center"
                    >
                      <Mail className="size-4" />
                      <span>Contact us</span>
                    </a>
                  </div>

                  {/* Sub note with enhanced styling */}
                  <div
                    className="mt-4 sm:mt-5 inline-flex items-center gap-2 rounded-xl px-3 py-2
                    bg-gradient-to-r from-[color:var(--brand)]/8 to-[color:var(--accent)]/8 
                    ring-1 ring-[color:var(--brand)]/20
                    transition"
                  >
                    <span
                      className="relative grid place-items-center size-6 rounded-md
                       bg-gradient-to-br from-[color:var(--brand)]/15 to-[color:var(--accent)]/10 
                       ring-1 ring-[color:var(--brand)]/25 overflow-visible"
                    >
                      {/* Pulse animation */}
                      <span
                        aria-hidden
                        className="service-pin-pulse absolute -inset-1 rounded-md z-0"
                      />
                      <MapPin className="size-3.5 text-[color:var(--brand)] relative z-[1]" />
                    </span>
                    <span className="text-[15px] sm:text-base">
                      <span className="opacity-80">
                        Looking for other destinations?{" "}
                      </span>
                      <a
                        href="/contact"
                        className="font-semibold underline underline-offset-4 decoration-transparent hover:decoration-[color:var(--accent)]/60 transition"
                      >
                        Let us know
                      </a>
                      <span className="opacity-80"> your travel plans.</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* MOBILE: centered globe */}
              <div className="mt-8 md:hidden">
                <div className="relative mx-auto w-full max-w-[440px]">
                  {/* Enhanced shadow with purple-gold gradient */}
                  <div
                    aria-hidden
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-24 w-[86%] rounded-[50%]
                               blur-3xl opacity-60
                               bg-[radial-gradient(60%_60%_at_50%_50%,rgba(62,42,121,0.20),rgba(232,177,34,0.12)_70%,transparent)]"
                  />
                  {/* Globe container */}
                  <div className="relative aspect-square rounded-[22px]">
                    <div className="absolute inset-0 p-3 sm:p-4">
                      <ServiceGlobe />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Floating globe */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ rotateX: 2, rotateY: -2 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative hidden md:block w-full md:max-w-[680px] lg:max-w-[760px] mx-auto [perspective:1200px] md:justify-self-center"
            >
              {/* Enhanced platform shadow */}
              <div
                aria-hidden
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 h-28 w-[88%] rounded-[50%] blur-3xl opacity-60 
                bg-[radial-gradient(60%_60%_at_50%_50%,rgba(62,42,121,0.22),rgba(232,177,34,0.14)_70%,transparent)]"
              />
              {/* Globe container */}
              <div className="relative aspect-square md:rounded-[28px]">
                <div className="absolute inset-0 p-4 sm:p-5 md:p-6">
                  <ServiceGlobe />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AreaChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="
        group inline-flex items-center gap-2 w-full h-full
        rounded-xl border border-transparent
        bg-white/90 backdrop-blur px-3 md:px-4 py-4 md:py-5
        shadow-[0_10px_30px_-18px_rgba(62,42,121,0.30)]
        ring-1 ring-[color:var(--brand)]/18 hover:ring-[color:var(--accent)]/35
        transition will-change-transform
        hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-18px_rgba(62,42,121,0.35)]
        active:translate-y-0 active:shadow-[0_10px_30px_-18px_rgba(62,42,121,0.30)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/50
      "
      tabIndex={0}
      aria-label={`Service area: ${String(children)}`}
    >
      <span
        className="relative grid place-items-center size-7 rounded-md 
        bg-gradient-to-br from-[color:var(--brand)]/12 to-[color:var(--accent)]/8 
        ring-1 ring-[color:var(--brand)]/22"
      >
        {/* Spinning gradient glow */}
        <span className="pointer-events-none absolute inset-[-2px] rounded-[10px] [mask:linear-gradient(#000,transparent_65%)]">
          <span
            className="absolute inset-0 rounded-[10px] 
            bg-[conic-gradient(from_var(--angle),rgba(62,42,121,0.35),transparent_30%,transparent_70%,rgba(232,177,34,0.30))] 
            animate-glow-spin"
          />
        </span>

        {/* Pulse animation */}
        <span
          aria-hidden
          className="service-pin-pulse absolute -inset-1 rounded-md z-0"
        />

        {/* Icon */}
        <MapPin className="size-3.5 text-[color:var(--brand)] relative z-[1]" />
      </span>

      <span className="font-medium leading-tight">{children}</span>
    </span>
  );
}
