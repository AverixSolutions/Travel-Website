// src/components/WhatsAppFab.tsx
"use client";
import Image from "next/image";

type FabPosition = "br" | "bl" | "tr" | "tl";
type WhatsAppFabProps = {
  phone?: string;
  message?: string;
  position?: FabPosition;
  offsetClassName?: string;
  size?: number;
  className?: string;
};

function positionToClasses(pos: FabPosition) {
  switch (pos) {
    case "bl":
      return "left-4 md:left-6 bottom-[calc(1rem+env(safe-area-inset-bottom))] md:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]";
    case "tr":
      return "right-4 md:right-6 top-[calc(1rem+env(safe-area-inset-top))] md:top-[calc(1.5rem+env(safe-area-inset-top))]";
    case "tl":
      return "left-4 md:left-6 top-[calc(1rem+env(safe-area-inset-top))] md:top-[calc(1.5rem+env(safe-area-inset-top))]";
    case "br":
    default:
      return "right-4 md:right-6 bottom-[calc(1rem+env(safe-area-inset-bottom))] md:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]";
  }
}

export default function WhatsAppFab({
  phone = "919744433266",
  message = "Hi! I'm interested in your travel packages.",
  position = "br",
  offsetClassName = "",
  size = 56,
  className = "",
}: WhatsAppFabProps) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const pos = positionToClasses(position);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={[
        "fixed z-50 inline-block transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
        pos,
        offsetClassName,
        className,
      ].join(" ")}
      style={{ width: size, height: size }}
    >
      <Image
        src="/whatsapp.png"
        alt="WhatsApp"
        width={size}
        height={size}
        draggable={false}
        className="pointer-events-none select-none drop-shadow-lg"
        priority={false}
      />
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
