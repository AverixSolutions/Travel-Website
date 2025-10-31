// src/components/sections/PackagesListing.tsx
"use client";

import React, { useState } from "react";
import { Search, MapPin, Calendar, ArrowRight, Filter, X } from "lucide-react";

type PackageCard = {
  id: string;
  title: string;
  location: string;
  days: number;
  nights: number;
  price: string;
  image: string;
  category: "international" | "domestic" | "honeymoon" | "adventure";
  highlights: string[];
};

const PACKAGES: PackageCard[] = [
  // International Packages
  {
    id: "bali-escape",
    title: "Bali Paradise Retreat",
    location: "Bali, Indonesia",
    days: 6,
    nights: 5,
    price: "₹49,999",
    image: "/placeholders/swiz-image.jpg",
    category: "international",
    highlights: ["Beach Resort", "Temple Tour", "Water Sports"],
  },
  {
    id: "maldives-luxury",
    title: "Maldives Overwater Villa",
    location: "Maldives",
    days: 5,
    nights: 4,
    price: "₹89,999",
    image: "/placeholders/swiz-image.jpg",
    category: "international",
    highlights: ["Overwater Villa", "Scuba Diving", "Spa Access"],
  },
  {
    id: "dubai-explorer",
    title: "Dubai City & Desert Safari",
    location: "Dubai, UAE",
    days: 6,
    nights: 5,
    price: "₹54,999",
    image: "/placeholders/swiz-image.jpg",
    category: "international",
    highlights: ["Burj Khalifa", "Desert Safari", "Marina Cruise"],
  },
  {
    id: "thailand-trio",
    title: "Thailand Grand Tour",
    location: "Bangkok • Phuket • Krabi",
    days: 7,
    nights: 6,
    price: "₹39,999",
    image: "/placeholders/swiz-image.jpg",
    category: "international",
    highlights: ["Island Hopping", "Street Food Tour", "Phi Phi Islands"],
  },
  {
    id: "singapore-malaysia",
    title: "Singapore & Malaysia Combo",
    location: "Singapore • Kuala Lumpur",
    days: 6,
    nights: 5,
    price: "₹45,999",
    image: "/placeholders/swiz-image.jpg",
    category: "international",
    highlights: ["Universal Studios", "Genting Highlands", "City Tours"],
  },
  {
    id: "sri-lanka",
    title: "Sri Lanka Cultural Journey",
    location: "Colombo • Kandy • Nuwara Eliya",
    days: 6,
    nights: 5,
    price: "₹34,999",
    image: "/placeholders/swiz-image.jpg",
    category: "international",
    highlights: ["Tea Plantations", "Wildlife Safari", "Temple of Tooth"],
  },

  // Domestic Packages
  {
    id: "kashmir-valley",
    title: "Kashmir Valley Escape",
    location: "Srinagar • Gulmarg • Pahalgam",
    days: 7,
    nights: 6,
    price: "₹34,999",
    image: "/placeholders/swiz-image.jpg",
    category: "domestic",
    highlights: ["Dal Lake", "Gondola Ride", "Apple Orchards"],
  },
  {
    id: "kerala-backwaters",
    title: "Kerala Backwater Retreat",
    location: "Cochin • Munnar • Alleppey",
    days: 6,
    nights: 5,
    price: "₹29,999",
    image: "/placeholders/swiz-image.jpg",
    category: "domestic",
    highlights: ["Houseboat Stay", "Tea Gardens", "Ayurvedic Spa"],
  },
  {
    id: "rajasthan-royal",
    title: "Royal Rajasthan Tour",
    location: "Jaipur • Udaipur • Jodhpur",
    days: 8,
    nights: 7,
    price: "₹42,999",
    image: "/placeholders/swiz-image.jpg",
    category: "domestic",
    highlights: ["Palace Hotels", "Desert Camp", "Heritage Sites"],
  },
  {
    id: "goa-beaches",
    title: "Goa Beach Paradise",
    location: "North Goa • South Goa",
    days: 5,
    nights: 4,
    price: "₹24,999",
    image: "/placeholders/swiz-image.jpg",
    category: "domestic",
    highlights: ["Beach Shacks", "Water Sports", "Nightlife"],
  },
  {
    id: "himachal-mountains",
    title: "Himachal Mountain Trail",
    location: "Shimla • Manali • Dharamshala",
    days: 7,
    nights: 6,
    price: "₹32,999",
    image: "/placeholders/swiz-image.jpg",
    category: "domestic",
    highlights: ["Snow Activities", "Mountain Views", "Adventure Sports"],
  },

  // Honeymoon Packages
  {
    id: "maldives-honeymoon",
    title: "Maldives Romantic Escape",
    location: "Maldives",
    days: 5,
    nights: 4,
    price: "₹99,999",
    image: "/placeholders/swiz-image.jpg",
    category: "honeymoon",
    highlights: ["Private Pool Villa", "Candlelight Dinner", "Couple Spa"],
  },
  {
    id: "bali-honeymoon",
    title: "Bali Romantic Getaway",
    location: "Ubud • Seminyak, Bali",
    days: 6,
    nights: 5,
    price: "₹64,999",
    image: "/placeholders/swiz-image.jpg",
    category: "honeymoon",
    highlights: ["Luxury Resort", "Sunset Dinner", "Couple Activities"],
  },
  {
    id: "kerala-honeymoon",
    title: "Kerala Honeymoon Special",
    location: "Munnar • Alleppey • Kovalam",
    days: 6,
    nights: 5,
    price: "₹44,999",
    image: "/placeholders/swiz-image.jpg",
    category: "honeymoon",
    highlights: ["Houseboat Romance", "Hill Station", "Beach Resort"],
  },

  // Adventure Packages
  {
    id: "ladakh-adventure",
    title: "Ladakh Bike Expedition",
    location: "Leh • Nubra • Pangong",
    days: 9,
    nights: 8,
    price: "₹54,999",
    image: "/placeholders/swiz-image.jpg",
    category: "adventure",
    highlights: ["Bike Trip", "High Passes", "Camping"],
  },
  {
    id: "rishikesh-adventure",
    title: "Rishikesh Adventure Week",
    location: "Rishikesh, Uttarakhand",
    days: 5,
    nights: 4,
    price: "₹19,999",
    image: "/placeholders/swiz-image.jpg",
    category: "adventure",
    highlights: ["River Rafting", "Bungee Jump", "Trekking"],
  },
  {
    id: "spiti-adventure",
    title: "Spiti Valley Expedition",
    location: "Spiti Valley, Himachal",
    days: 8,
    nights: 7,
    price: "₹39,999",
    image: "/placeholders/swiz-image.jpg",
    category: "adventure",
    highlights: ["Offroad Journey", "Monasteries", "High Altitude Lakes"],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Packages", count: PACKAGES.length },
  {
    id: "international",
    label: "International",
    count: PACKAGES.filter((p) => p.category === "international").length,
  },
  {
    id: "domestic",
    label: "Domestic",
    count: PACKAGES.filter((p) => p.category === "domestic").length,
  },
  {
    id: "honeymoon",
    label: "Honeymoon",
    count: PACKAGES.filter((p) => p.category === "honeymoon").length,
  },
  {
    id: "adventure",
    label: "Adventure",
    count: PACKAGES.filter((p) => p.category === "adventure").length,
  },
];

export default function PackagesListing() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const filteredPackages = PACKAGES.filter((pkg) => {
    const matchesCategory =
      activeCategory === "all" || pkg.category === activeCategory;
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-brand via-[color-mix(in_lab,var(--brand)_90%,var(--accent-3))] to-accent-3 py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl mt-14 md:mt-10">
              Explore Our <span className="text-accent-2">Packages</span>
            </h1>
            <p className="mt-4 text-lg text-white/90 sm:text-xl">
              Handcrafted journeys designed to create memories that last a
              lifetime
            </p>

            {/* Search Bar */}
            <div className="mt-8 mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" />
                <input
                  type="text"
                  placeholder="Search by destination or package name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border-2 border-white/20 bg-white/95 py-4 pl-12 pr-4 text-foreground shadow-xl backdrop-blur-sm transition-all placeholder:text-foreground/50 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        {/* Category Filter - Desktop */}
        <div className="mb-8 hidden md:block">
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative overflow-hidden rounded-full px-6 py-3 text-sm font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-brand text-white shadow-lg shadow-brand/30 scale-105"
                    : "bg-white text-foreground border-2 border-border/60 hover:border-brand/50 hover:shadow-md"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {cat.label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      activeCategory === cat.id
                        ? "bg-white/20 text-white"
                        : "bg-muted text-foreground/70"
                    }`}
                  >
                    {cat.count}
                  </span>
                </span>
                {activeCategory === cat.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-brand to-accent-3 opacity-100"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="mb-6 md:hidden">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="flex w-full items-center justify-between rounded-xl border-2 border-border/60 bg-white px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-brand" />
              <span className="font-bold text-foreground">
                {CATEGORIES.find((c) => c.id === activeCategory)?.label ||
                  "Filter"}
              </span>
            </div>
            <span className="text-sm text-foreground/60">
              {filteredPackages.length} packages
            </span>
          </button>
        </div>

        {/* Mobile Filter Drawer */}
        {showMobileFilter && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowMobileFilter(false)}
            ></div>
            <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">
                  Filter by Category
                </h3>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="rounded-full p-2 hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setShowMobileFilter(false);
                    }}
                    className={`w-full rounded-xl px-4 py-3 text-left font-semibold transition-all ${
                      activeCategory === cat.id
                        ? "bg-brand text-white shadow-md"
                        : "bg-muted/50 text-foreground hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{cat.label}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          activeCategory === cat.id
                            ? "bg-white/20 text-white"
                            : "bg-white text-foreground/70"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-foreground/70">
            Showing{" "}
            <span className="font-bold text-brand">
              {filteredPackages.length}
            </span>{" "}
            packages
          </p>
        </div>

        {/* Package Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPackages.map((pkg, index) => (
              <article
                key={pkg.id}
                className="group h-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-brand/30"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Category Badge */}
                  <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow-lg capitalize">
                    {pkg.category}
                  </span>

                  {/* Days Badge */}
                  <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-foreground shadow-lg backdrop-blur-sm">
                    <Calendar className="inline h-3 w-3 mr-1 -mt-0.5" />
                    {pkg.days}D / {pkg.nights}N
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-brand transition-colors">
                    {pkg.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-sm text-foreground/65">
                    <MapPin className="h-4 w-4 text-brand" />
                    <span>{pkg.location}</span>
                  </div>

                  {/* Highlights */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pkg.highlights.slice(0, 3).map((highlight, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground/70"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-5">
                    <div className="flex flex-col">
                      <span className="text-xs text-foreground/60">
                        Starting from
                      </span>
                      <span className="text-2xl font-black text-brand">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-foreground/50">
                        per person
                      </span>
                    </div>
                    <a
                      href={`/packages`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-all hover:scale-105 hover:bg-[color-mix(in_lab,var(--brand)_90%,black)] hover:shadow-xl"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-foreground/40" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              No packages found
            </h3>
            <p className="text-foreground/60 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-[color-mix(in_lab,var(--brand)_90%,black)] transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-brand via-accent-3 to-brand p-8 text-center shadow-2xl md:p-12">
          <h2 className="text-3xl font-black text-white md:text-4xl">
            Can&apos;t find the perfect package?
          </h2>
          <p className="mt-3 text-lg text-white/90">
            Let us create a custom itinerary just for you
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-brand shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white bg-transparent px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white hover:text-brand"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
