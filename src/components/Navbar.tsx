// src/components/Navbar.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
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
    <header className="fixed inset-x-0 top-4 z-50 px-3 md:px-0">
      <div
        className={[
          "mx-auto w-full max-w-[1400px] px-2 md:px-4 transition-all duration-200",
          isScrolling
            ? "bg-white/12 border border-white/25 rounded-2xl backdrop-blur-xl"
            : "bg-card/95 border border-border shadow-lg ring-1 ring-black/5 rounded-2xl",
        ].join(" ")}
      >
        <nav
          className={[
            "flex items-center justify-between transition-colors duration-200",
            "py-2 md:py-3 mt-3 md:mt-0 pr-3 md:pr-0",
            isScrolling ? "text-white" : "text-foreground",
          ].join(" ")}
        >
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0"
            aria-label="Mysha Tours Home"
          >
            <div className="relative h-10 w-[140px] flex items-center">
              <Image
                src="/MYSHA-LOGO.png"
                alt="Mysha Tours & Travels"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 120px, 140px"
              />
            </div>
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
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium text-white bg-brand hover:brightness-95 transition"
              >
                Enquire
              </a>
            </li>
          </ul>

          {/* ✅ Mobile burger button */}
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
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
              <a
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-medium text-white bg-brand hover:brightness-95 transition"
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
