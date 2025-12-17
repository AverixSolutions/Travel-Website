// src/components/ui/SplashGate.tsx
"use client";

import { useState } from "react";
import SplashScreen from "@/components/ui/SplashScreen";

export default function SplashGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  return (
    <>
      <SplashScreen
        durationMs={2500}
        oncePerSession
        onDone={() => setReady(true)}
      />

      <div className={ready ? "opacity-100" : "opacity-0"}>{children}</div>
    </>
  );
}
