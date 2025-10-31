// src/components/Footer.tsx
"use client";

import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-gradient-to-br from-brand via-brand/95 to-accent-3 text-white">
      {/* Main Content */}
      <div className="container py-12 sm:py-16">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12">
          {/* Brand + Description */}
          <div className="lg:col-span-4">
            <div className="inline-block bg-white rounded-2xl p-4 shadow-lg">
              <img
                src="/MYSHA-LOGO.png"
                alt="Mysha Tours & Travels"
                className="h-12 sm:h-14 w-auto"
                loading="lazy"
              />
            </div>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-white/90">
              Seamless, curated journeys—crafted for relaxation, exploration,
              and rich cultural immersion. From visa help to stays, activities
              and on-trip support, travel the Mysha way.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20 hover:bg-accent hover:ring-accent transition-all duration-200"
              >
                <MessageCircle className="h-4.5 w-4.5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20 hover:bg-accent hover:ring-accent transition-all duration-200"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20 hover:bg-accent hover:ring-accent transition-all duration-200"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20 hover:bg-accent hover:ring-accent transition-all duration-200"
              >
                <Youtube className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Contact Locations */}
          <div className="lg:col-span-8">
            <h4 className="text-lg sm:text-xl font-semibold text-accent mb-6">
              Our Locations
            </h4>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Dubai Office */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 ring-1 ring-white/20 hover:bg-white/15 transition-all duration-200">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-base mb-2">Dubai, UAE</p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Mysha Business Management Consultants LLC, Mezzanine
                      Floor, Unique World Business Center, P.O. Box 87556, Ansar
                      Gallery Complex, Al Karama
                    </p>
                    <div className="mt-3 space-y-1.5">
                      <a
                        href="tel:+971523080289"
                        className="flex items-center gap-2 text-sm text-white/90 hover:text-accent transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        +971 52 308 0289
                      </a>
                      <a
                        href="tel:+971527386939"
                        className="flex items-center gap-2 text-sm text-white/90 hover:text-accent transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        +971 52 738 6939
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Muttichur &  Valapad Office */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 ring-1 ring-white/20 hover:bg-white/15 transition-all duration-200">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-base mb-2">
                      Muttichur & Valapad, India - Kerala
                    </p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Kerala
                    </p>
                    <div className="mt-3 space-y-1.5">
                      <a
                        href="tel:+919744433255"
                        className="flex items-center gap-2 text-sm text-white/90 hover:text-accent transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        +91 97444 33255
                      </a>
                      <a
                        href="tel:+919744433699"
                        className="flex items-center gap-2 text-sm text-white/90 hover:text-accent transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        +91 97444 33699
                      </a>
                      <a
                        href="mailto:myshatravels777@gmail.com"
                        className="flex items-center gap-2 text-sm text-white/90 hover:text-accent transition-colors"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        myshatravels777@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coimbatore Office */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 ring-1 ring-white/20 hover:bg-white/15 transition-all duration-200">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-base mb-2">
                      Coimbatore, India
                    </p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      100 Feet Road, Gandhipuram, Tamil Nadu
                    </p>
                    <div className="mt-3 space-y-1.5">
                      <a
                        href="tel:+919744433599"
                        className="flex items-center gap-2 text-sm text-white/90 hover:text-accent transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        +91 97444 33599
                      </a>
                      <a
                        href="tel:+919744433699"
                        className="flex items-center gap-2 text-sm text-white/90 hover:text-accent transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        +91 97444 33699
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bengaluru Office */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 ring-1 ring-white/20 hover:bg-white/15 transition-all duration-200">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-base mb-2">
                      Bengaluru, India
                    </p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      11th Layout Road, Electronic City, Karnataka
                    </p>
                    <div className="mt-3 space-y-1.5">
                      <a
                        href="tel:+919744433255"
                        className="flex items-center gap-2 text-sm text-white/90 hover:text-accent transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        +91 97444 33255
                      </a>
                      <a
                        href="tel:+919744433699"
                        className="flex items-center gap-2 text-sm text-white/90 hover:text-accent transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        +91 97444 33699
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container flex h-14 flex-col items-center justify-center gap-2 text-xs sm:text-sm text-white/70 sm:h-16 sm:flex-row sm:justify-between">
          <span>© {year} Mysha Tours &amp; Travels. All rights reserved.</span>
          <span className="hidden sm:block">
            Crafted with care for your journey
          </span>
        </div>
      </div>
    </footer>
  );
}
