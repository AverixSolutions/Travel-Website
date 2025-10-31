// src/app/packages/page.tsx
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PackagesListing from "@/components/sections/PackagesListing";
import React from "react";

export default function PackagesPage() {
  return (
    <main>
      <Navbar />
      <PackagesListing />
      <Footer />
    </main>
  );
}
