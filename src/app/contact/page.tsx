// src/app/contact/page.tsx
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/sections/ContactSection";
import React from "react";

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactSection />
      <Footer />
    </main>
  );
}
