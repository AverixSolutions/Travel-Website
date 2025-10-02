// src/components/Navbar.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const links = [
  { href: "#home", label: "Home" },
  { href: "#packages", label: "Packages" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About us" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!isScrolling) setIsScrolling(true);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => setIsScrolling(false), 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, [isScrolling]);

  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <div
        className={[
          "mx-auto w-full max-w-[1400px] px-4 md:px-4 transition-all duration-200",
          isScrolling
            ? "bg-white/12 border border-white/25 rounded-2xl backdrop-blur-xl"
            : "bg-card/95 border border-border shadow-lg ring-1 ring-black/5 rounded-2xl",
        ].join(" ")}
      >
        {/* Nav container with proper padding */}
        <nav
          className={[
            "flex items-center justify-between transition-colors duration-200",
            "py-3 md:py-3",
            isScrolling ? "text-white" : "text-foreground",
          ].join(" ")}
        >
          {/* Brand (always solid brand chip) */}
          <Link
            href="#home"
            className="flex items-center gap-2 font-semibold tracking-tight"
            aria-label="TravelCo Home"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white">
              <svg
                viewBox="0 0 24 24"
                className="h-4.5 w-4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10.5 7.5l-7 7 2 2 7-7 7.5 2.5-3-8-6.5 3.5z" />
                <path d="M3.5 14.5l6 1" />
              </svg>
            </span>
            <span>
              <span className="text-brand">Travel</span>Co
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={[
                    "relative text-sm transition",
                    isScrolling
                      ? "text-white/90 hover:text-white"
                      : "text-foreground/80 hover:text-brand",
                    "after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition",
                    isScrolling ? "after:bg-white/90" : "after:bg-brand",
                  ].join(" ")}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              {/* Enquire  */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium
                           text-white bg-brand hover:brightness-95 transition"
              >
                Enquire
              </a>
            </li>
          </ul>

          {/* Mobile burger button */}
          <button
            className={[
              "inline-flex h-10 w-10 items-center justify-center rounded-lg border md:hidden transition",
              isScrolling
                ? "border-white/25 text-white"
                : "border-border text-foreground",
            ].join(" ")}
            onClick={() => {
              setIsScrolling(false);
              setOpen((s: boolean) => !s);
            }}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile dropdown */}
        <div
          id="mobile-nav"
          className={[
            "md:hidden grid overflow-hidden transition-[grid-template-rows] duration-300",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            open ? "pt-3" : "pt-0",
            open
              ? isScrolling
                ? "border-t border-white/20"
                : "border-t border-border"
              : "border-t-0",
          ].join(" ")}
        >
          <ul className="min-h-0 overflow-hidden pb-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={[
                    "block rounded-lg px-4 py-3 transition",
                    isScrolling
                      ? "text-white/90 hover:bg-white/10"
                      : "text-foreground/90 hover:bg-muted",
                  ].join(" ")}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="px-2 pt-2">
              {/* Enquire button */}
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-medium
                           text-white bg-brand hover:brightness-95 transition"
                onClick={() => setOpen(false)}
              >
                Enquire
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
