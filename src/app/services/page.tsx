// src/app/services/page.tsx
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ServicesDetailed from "@/components/sections/ServicesDetailed";
import React from "react";

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <ServicesDetailed />
      <Footer />
    </main>
  );
}
