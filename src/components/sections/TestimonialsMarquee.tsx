// src/components/sections/TestimonialsMarquee.tsx
"use client";

import { Star } from "lucide-react";

type T = {
  name: string;
  place: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  quote: string;
  avatar?: string;
};

// demo data — swap with real ones
const ROW1: T[] = [
  {
    name: "Aisha K.",
    place: "Bali",
    rating: 5,
    quote: "Perfectly planned—zero stress!",
    avatar: "/testimonial-avatar.jpg",
  },
  {
    name: "Vikram S.",
    place: "Swiss Alps",
    rating: 5,
    quote: "Insane views. Smooth logistics.",
    avatar: "/testimonial-avatar.jpg",
  },
  {
    name: "Maya R.",
    place: "Cappadocia",
    rating: 5,
    quote: "Balloons at sunrise—wow!",
    avatar: "/testimonial-avatar.jpg",
  },
  {
    name: "Sanjay M.",
    place: "Dubai",
    rating: 4,
    quote: "Great price, luxury stay.",
    avatar: "/testimonial-avatar.jpg",
  },
  {
    name: "Elena P.",
    place: "Amalfi Coast",
    rating: 5,
    quote: "Dreamy coastal drives.",
    avatar: "/testimonial-avatar.jpg",
  },
];

const ROW2: T[] = [
  {
    name: "Rahul D.",
    place: "Iceland",
    rating: 5,
    quote: "Northern lights checked!",
    avatar: "/testimonial-avatar.jpg",
  },
  {
    name: "Hiba N.",
    place: "Kyoto",
    rating: 5,
    quote: "Temples & tea—pure calm.",
    avatar: "/testimonial-avatar.jpg",
  },
  {
    name: "Neha J.",
    place: "Maldives",
    rating: 5,
    quote: "Seamless & stunning.",
    avatar: "/testimonial-avatar.jpg",
  },
  {
    name: "Arun P.",
    place: "Norway",
    rating: 4,
    quote: "Fjords are surreal.",
    avatar: "/testimonial-avatar.jpg",
  },
  {
    name: "Tanya G.",
    place: "Paris",
    rating: 5,
    quote: "Magical nights by Seine.",
    avatar: "/testimonial-avatar.jpg",
  },
];

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={[
            "h-3.5 w-3.5 shrink-0",
            i < n
              ? "fill-[var(--accent)] text-[var(--accent)]"
              : "text-gray-300",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

function Card({ t }: { t: T }) {
  return (
    <div className="group/card relative mx-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md md:mx-3 md:p-5">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-gray-300">
          {/* avatar fallback gradient if missing */}
          {t.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={t.avatar}
              alt={t.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,var(--accent),transparent_60%),radial-gradient(circle_at_70%_80%,var(--accent-3),transparent_50%)]" />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">
            {t.name}
          </p>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-bold text-gray-700">
              {t.place}
            </span>
            <Stars n={t.rating ?? 5} />
          </div>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-gray-700 md:line-clamp-3">
        "{t.quote}"
      </p>
    </div>
  );
}

function Track({
  items,
  reverse = false,
  duration = 35,
}: {
  items: T[];
  reverse?: boolean;
  duration?: number;
}) {
  return (
    <div className="relative overflow-hidden">
      {/* the moving rail (duplicated for seamless loop) */}
      <div
        className={[
          "marquee flex w-max min-w-full select-none gap-2 py-2 [animation-iteration-count:infinite] [animation-timing-function:linear]",
          reverse ? "marquee-rtl" : "marquee-ltr",
          // pause on hover (desktop)
          "group/rail hover:[animation-play-state:paused]",
          // speed
          `[${reverse ? "--dur-rtl" : "--dur-ltr"}:${duration}s]`, // custom property just to document duration per row
        ].join(" ")}
        style={
          {
            animationDuration: `${duration}s`,
          } as React.CSSProperties
        }
      >
        {[...items, ...items].map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </div>

      {/* foggy edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--background)] to-transparent md:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--background)] to-transparent md:w-16" />
    </div>
  );
}

export default function TestimonialsMarquee() {
  return (
    <section
      id="testimonials"
      aria-label="Traveller testimonials"
      className="relative isolate w-full overflow-hidden py-12 md:py-20"
    >
      {/* background tint */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_400px_at_10%_-10%,color-mix(in_lab,var(--accent-2)_40%,transparent),transparent_70%)]" />

      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold tracking-[0.22em] text-[var(--accent)]">
            REAL TRIPS · REAL PEOPLE
          </p>
          <h2 className="mt-2 text-[28px]/[1.1] font-black text-gray-900 sm:text-4xl md:text-5xl">
            Loved by{" "}
            <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">
              Travellers
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-700 sm:text-base">
            A stream of happy stories from around the world—rolling in like a
            scenic train.
          </p>
        </div>

        {/* rail wrapper (gives pause-on-hover to both) */}
        <div className="group/rail mt-8 space-y-3 md:mt-10">
          <Track items={ROW1} reverse={false} duration={38} />
          <Track items={ROW2} reverse duration={34} />
        </div>

        {/* brand panel for contrast */}
        <div className="mt-10 rounded-3xl bg-brand/5 p-4 ring-1 ring-border/60 md:p-6">
          <p className="text-center text-sm text-gray-700">
            2,000+ travellers rated us{" "}
            <span className="font-semibold text-gray-900">4.9/5</span> for
            planning, pricing and on-trip support.
          </p>
        </div>
      </div>

      {/* keyframes + directions */}
      <style jsx global>{`
        @keyframes marquee-ltr {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        @keyframes marquee-rtl {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-ltr {
          animation-name: marquee-ltr;
        }
        .marquee-rtl {
          animation-name: marquee-rtl;
        }
        /* ensure cards don't cause horizontal scroll on tiny screens */
        #testimonials {
          overflow-x: hidden;
        }
      `}</style>
    </section>
  );
}
