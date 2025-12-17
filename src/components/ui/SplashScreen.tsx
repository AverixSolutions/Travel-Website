// src/components/ui/SplashScreen.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  durationMs?: number;
  oncePerSession?: boolean;
  onDone?: () => void;
};

export default function SplashScreen({
  durationMs = 2200,
  oncePerSession = true,
  onDone,
}: Props) {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const key = "mysha_splash_seen";

    if (oncePerSession && sessionStorage.getItem(key) === "1") {
      onDone?.();
      return;
    }
    if (oncePerSession) sessionStorage.setItem(key, "1");

    setShow(true);
    requestAnimationFrame(() => setAnimate(true));

    // start fade out near end
    const fadeLead = 800;
    const t1 = window.setTimeout(
      () => setAnimate(false),
      Math.max(0, durationMs - fadeLead)
    );

    const t2 = window.setTimeout(() => {
      setShow(false);
      onDone?.();
    }, durationMs);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [durationMs, oncePerSession, onDone]);

  if (!show) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[9999] flex items-center justify-center",
        "transition-opacity duration-500",
        animate ? "opacity-100" : "opacity-0",
      ].join(" ")}
    >
      {/* PURE GRADIENT BG (no patterns) */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand via-accent-3 to-brand" />

      {/* subtle vignette for premium depth */}
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* LOGO CARD */}
        <div
          className={[
            "relative grid place-items-center",
            "h-44 w-44 sm:h-48 sm:w-48",
            "rounded-[2.25rem]",
            "bg-white/95 backdrop-blur-xl",
            "border border-white/50",
            "shadow-[0_30px_90px_rgba(0,0,0,0.35)]",
            "ring-1 ring-black/5",
            "overflow-hidden",
            "transition-all duration-700 ease-out",
            animate ? "scale-100 opacity-100" : "scale-90 opacity-0",
          ].join(" ")}
        >
          {/* Shine sweep (inline style, no CSS file) */}
          <div
            className={[
              "pointer-events-none absolute -inset-x-16 -inset-y-10",
              "rotate-12",
              "bg-gradient-to-r from-transparent via-white/60 to-transparent",
              "opacity-0",
              animate ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{
              transform: animate
                ? "translateX(220%) rotate(12deg)"
                : "translateX(-220%) rotate(12deg)",
              transition: "transform 1100ms ease-in-out",
            }}
          />

          <Image
            src="/MYSHA-LOGO.png"
            alt="Mysha Travels"
            width={170}
            height={170}
            priority
            className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
          />
        </div>

        {/* TEXT */}
        <div
          className={[
            "mt-6 text-center text-white",
            "transition-all duration-700",
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          ].join(" ")}
        >
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Mysha Travels
          </h1>
          <p className="mt-1 text-sm text-white/80">
            Curated trips. Seamless travel.
          </p>
        </div>

        {/* PROGRESS */}
        <div className="mt-8 w-[320px] max-w-[85vw] overflow-hidden rounded-full bg-white/20 ring-1 ring-white/25">
          <div
            className={[
              "h-2 rounded-full",
              "bg-white",
              "transition-[width] duration-[1400ms] ease-out",
              animate ? "w-full" : "w-0",
            ].join(" ")}
          />
        </div>
      </div>
    </div>
  );
}
