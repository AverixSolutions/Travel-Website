// src/components/sections/ServicesDetailed.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Route,
  Stamp,
  Users,
  Headset,
  MapPin,
  Shield,
  Plane,
  Hotel,
  Car,
  Camera,
  CheckCircle2,
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react";

export default function ServicesDetailed() {
  const mainServices = [
    {
      icon: Route,
      title: "Custom Itinerary Planning",
      description:
        "Your journey, crafted exactly how you envision it. We design personalized day-by-day travel plans that align with your interests, pace, and style—whether you're seeking adventure, relaxation, or cultural immersion.",
      features: [
        "Tailored itineraries based on your preferences",
        "Flexible scheduling and activity selection",
        "Handpicked accommodations and local experiences",
        "Budget optimization without compromising quality",
      ],
      image: "/images/services/service-section1.jpg",
    },
    {
      icon: Stamp,
      title: "Visa & Documentation Support",
      description:
        "Navigate the complexities of international travel paperwork with ease. Our visa assistance service ensures you have everything you need, properly prepared and submitted on time.",
      features: [
        "Complete visa application guidance",
        "Document checklist and verification",
        "Fast-track appointment scheduling",
        "Follow-up support until approval",
      ],
      image: "/images/services/service-section2.jpg",
    },
    {
      icon: Users,
      title: "Group & Corporate Travel",
      description:
        "Seamless coordination for groups of any size. From family reunions to corporate retreats, team-building trips, and incentive tours—we handle every logistical detail so you can focus on the experience.",
      features: [
        "Customized group packages",
        "MICE (Meetings, Incentives, Conferences, Exhibitions)",
        "Team-building activities and excursions",
        "Dedicated group travel coordinator",
      ],
      image: "/images/services/service-section3.jpg",
    },
    {
      icon: Headset,
      title: "24×7 Travel Support",
      description:
        "Travel with complete peace of mind. Our round-the-clock support team is always available to assist with any questions, changes, or emergencies—before, during, and after your trip.",
      features: [
        "Real-time assistance via phone, email, and chat",
        "Emergency support and problem resolution",
        "Booking modifications and last-minute changes",
        "Transparent communication throughout your journey",
      ],
      image: "/images/services/service-section4.webp",
    },
  ];

  const additionalServices = [
    {
      icon: Plane,
      title: "Flight Bookings",
      description: "Best fares across all major airlines with flexible options",
    },
    {
      icon: Hotel,
      title: "Accommodation",
      description: "Handpicked hotels, resorts, and unique stays worldwide",
    },
    {
      icon: Car,
      title: "Transportation",
      description: "Airport transfers, car rentals, and private chauffeurs",
    },
    {
      icon: Camera,
      title: "Tour Packages",
      description: "Curated domestic and international travel packages",
    },
    {
      icon: MapPin,
      title: "Local Guides",
      description: "Experienced guides for authentic local experiences",
    },
    {
      icon: Shield,
      title: "Travel Insurance",
      description: "Comprehensive coverage for worry-free travel",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand via-[color-mix(in_lab,var(--brand)_90%,var(--accent-3))] to-accent-3 py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center mt-14 md:mt-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-2 sm:text-sm">
              OUR SERVICES
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
              Everything You Need for{" "}
              <span className="text-accent-2">Perfect Travel</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
              From planning to execution, we handle every detail to make your
              journey seamless and memorable
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-16 lg:py-20">
        {/* Main Services */}
        <div className="space-y-16 md:space-y-24">
          {mainServices.map((service, index) => (
            <article
              key={index}
              className={`grid gap-8 lg:grid-cols-2 lg:gap-12 ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative ${
                  index % 2 === 1 ? "lg:col-start-2" : ""
                }`}
              >
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand/40 via-transparent to-transparent"></div>

                  {/* Floating Icon */}
                  <div className="absolute left-6 top-6 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-sm">
                    <service.icon className="h-8 w-8 text-brand" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div
                className={`flex flex-col justify-center ${
                  index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                }`}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 w-fit">
                  <service.icon className="h-4 w-4 text-accent" />
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">
                    Core Service
                  </span>
                </div>

                <h2 className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
                  {service.title}
                </h2>

                <p className="mt-4 text-base leading-relaxed text-foreground/70 sm:text-lg">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                      <span className="text-sm text-foreground/80 sm:text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#contact"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-all hover:scale-105 hover:bg-[color-mix(in_lab,var(--brand)_90%,black)] hover:shadow-xl"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mt-20 md:mt-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-3 sm:text-sm">
              MORE SERVICES
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Complete Travel Solutions
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/70 sm:text-base">
              Beyond our core services, we offer comprehensive travel support to
              ensure every aspect of your journey is covered
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-brand/30"
              >
                {/* Gradient overlay */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-brand/10 to-accent-3/10 blur-2xl transition-transform duration-500 group-hover:scale-150"></div>

                <div className="relative">
                  {/* Icon */}
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-accent-3 text-white shadow-md shadow-brand/20 transition-all duration-300 group-hover:scale-110">
                    <service.icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-foreground sm:text-xl">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 md:mt-28">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-accent-3 to-brand p-8 shadow-2xl md:p-12 lg:p-16">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-black text-white sm:text-4xl md:text-5xl">
                Ready to Start Planning?
              </h2>
              <p className="mt-4 text-base text-white/90 sm:text-lg md:text-xl">
                Get in touch with our travel experts to discuss your dream
                journey
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-brand shadow-xl transition-all hover:scale-105 hover:shadow-2xl sm:text-base"
                >
                  <Mail className="h-5 w-5" />
                  Contact Us
                </Link>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white bg-transparent px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white hover:text-brand sm:text-base"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
              </div>

              <p className="mt-6 text-sm text-white/75">
                Available 24×7 • Quick Response • Free Consultation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
