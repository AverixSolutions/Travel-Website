// src/app/page.tsx (or your Mainpage)
import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/sections/HeroVideo";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import PackagesPreview from "@/components/sections/PackagesPreview";
import ServicesOverview from "@/components/sections/ServicesOverview";
import AboutTeaser from "@/components/sections/AboutTeaser";

export default function Mainpage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroVideo />
        <PackagesPreview />
        <ServicesOverview />
        <AboutTeaser />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
