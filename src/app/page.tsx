// src/app/page.tsx
import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/sections/HeroVideo";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import PackagesPreview from "@/components/sections/PackagesPreview";
import ServicesOverview from "@/components/sections/ServicesOverview";
import AboutTeaser from "@/components/sections/AboutTeaser";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TestimonialsMarquee from "@/components/sections/TestimonialsMarquee";
import ServiceAreas from "@/components/sections/ServiceArea";

export default function Mainpage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroVideo />
        <PackagesPreview />
        <ServicesOverview />
        <AboutTeaser />
        <ServiceAreas />
        <WhyChooseUs />
        <TestimonialsMarquee />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
