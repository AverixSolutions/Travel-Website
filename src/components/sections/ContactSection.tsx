// components/sections/ContactSection.tsx
"use client";

import { useMemo } from "react";
import { Mail, Phone, MapPin, Clock, Shield, Navigation } from "lucide-react";

type Location = {
  title: string;
  address: string;
  phones: string[];
  email?: string;
};

const locations: Location[] = [
  {
    title: "Valapad Office",
    address: "Near PNB Bank, Valapad",
    phones: ["9744433266", "9744433699"],
    email: "myshatourstravels@gmail.com",
  },
  {
    title: "Muttichur Office",
    address: "Muttichur",
    phones: ["9744433255", "9744433699"],
    email: "myshatravels777@gmail.com",
  },
  {
    title: "Dubai Office",
    address:
      "Mysha Business Management Consultants LLC, Mezzanine Floor, Unique world business center, P.O. Box 87556, Ansar Gallery Complex, Al Karama, Dubai",
    phones: ["0523080289", "0527386939"],
  },
  {
    title: "Gandhipuram Office",
    address: "100 feet road, Gandhipuram, Coimbatore, Tamilnadu",
    phones: ["9744433599", "9744433699"],
  },
  {
    title: "Bangalore Office",
    address: "11th Layout Road, Electronic City, Bangalore, Karnataka",
    phones: ["9744433255", "9744433699"],
  },
];

function dialCodeFor(title: string) {
  return /dubai/i.test(title) ? "+971" : "+91";
}
function mapsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
}

export default function ContactSection() {
  const hasPrimaryEmail = useMemo(() => locations.some((l) => !!l.email), []);

  return (
    <section
      id="contact"
      className="relative overflow-x-clip bg-background pt-10 md:pt-14 pb-14 md:pb-20 scroll-mt-[96px]"
    >
      {/* Soft gradient grid background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-accent-3/10" />
        <div
          className="absolute left-1/2 top-[65%] h-[520px] w-[min(1200px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, color-mix(in lab, var(--accent-2) 35%, white) 0%, transparent 60%)",
            opacity: 0.35,
          }}
        />
      </div>

      <div className="container relative z-10 mt-20 md:mt-14">
        {/* Kicker + Heading */}
        <div className="text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent sm:text-xs">
            GET IN TOUCH
          </p>
          <h2 className="mt-2 text-3xl font-black text-brand md:text-4xl">
            Let’s Connect
          </h2>
          <p className="mt-3 text-base text-foreground/70 md:text-lg">
            Reach us any time our travel experts are available{" "}
            <span className="font-semibold text-accent">24×7</span> for queries,
            planning, or emergencies.
          </p>
        </div>

        {/* Offices */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc, idx) => {
            const code = dialCodeFor(loc.title);
            return (
              <article
                key={idx}
                className="group relative rounded-2xl border border-border/60 bg-card p-[1px] shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-brand/30"
              >
                {/* animated gradient hairline */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, color-mix(in lab, var(--brand) 55%, transparent), color-mix(in lab, var(--accent-3) 55%, transparent))",
                    mask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
                    WebkitMask:
                      "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
                  }}
                />
                <div className="relative rounded-[calc(theme(borderRadius.2xl)-1px)] bg-card/95 p-6 backdrop-blur-sm">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-xl bg-accent/10 px-3 py-1">
                      <MapPin className="h-4 w-4 text-accent" />
                      <span className="text-xs font-bold uppercase tracking-wide text-accent">
                        {loc.title}
                      </span>
                    </span>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-foreground/80">
                    {loc.address}
                  </p>

                  <div className="mb-3 grid gap-2">
                    {loc.phones.map((ph, i) => (
                      <a
                        key={i}
                        href={`tel:${code}${ph.replace(/\D/g, "")}`}
                        aria-label={`Call ${loc.title} ${ph}`}
                        className="inline-flex items-center justify-start gap-2 rounded-lg border border-border/70 px-3 py-2 text-sm font-semibold text-foreground/90 transition-all hover:border-brand/40 hover:bg-brand/5 hover:text-brand"
                      >
                        <Phone className="h-4 w-4 text-accent" />
                        <span className="tabular-nums">{ph}</span>
                        <span className="ml-auto text-xs text-foreground/50">
                          {code}
                        </span>
                      </a>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {loc.email && (
                      <a
                        href={`mailto:${loc.email}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-brand to-accent-3 px-3 py-2 text-xs font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
                      >
                        <Mail className="h-4 w-4" />
                        {loc.email}
                      </a>
                    )}
                    <a
                      href={mapsUrl(loc.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-border/70 px-3 py-2 text-xs font-semibold text-foreground/80 transition-all hover:border-brand/40 hover:bg-brand/5 hover:text-brand"
                      aria-label={`Open ${loc.title} in Google Maps`}
                    >
                      <Navigation className="h-4 w-4" />
                      Open in Maps
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mx-auto mt-12 max-w-3xl md:mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-accent-3 to-brand p-8 text-center shadow-2xl md:p-12">
            <div className="absolute inset-0 opacity-30 [background:radial-gradient(1200px_300px_at_50%_120%,color-mix(in_lab,var(--accent-2)_35%,white),transparent)]" />
            <div className="relative z-10">
              <h3 className="mb-1 flex items-center justify-center gap-2 text-xl font-bold text-white md:text-2xl">
                <Clock className="h-5 w-5 text-accent-2" />
                Available 24×7
              </h3>
              <p className="mb-6 text-white/85">
                Fast response, free consultation—reach out now and we’ll make
                your journey perfect.
              </p>

              <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row">
                {hasPrimaryEmail && (
                  <a
                    href="mailto:myshatourstravels@gmail.com"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-bold text-brand shadow-xl transition-all hover:scale-105 hover:shadow-2xl sm:text-base"
                    aria-label="Email us"
                  >
                    <Mail className="h-5 w-5" />
                    Email Us
                  </a>
                )}
                <a
                  href="tel:+919744433266"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white bg-transparent px-7 py-3 text-sm font-bold text-white transition-all hover:bg-white hover:text-brand sm:text-base"
                  aria-label="Call our hotline"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
              </div>

              <p className="mt-5 text-sm text-white/75">
                <Shield className="mr-1 inline h-4 w-4 text-accent-2" />
                Your data is safe & confidential
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
