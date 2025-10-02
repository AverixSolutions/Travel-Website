// src/app/page.tsx (or your Mainpage)
import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/sections/HeroVideo";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import PackagesPreview from "@/components/sections/PackagesPreview";
import ServicesOverview from "@/components/sections/ServicesOverview";

export default function Mainpage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroVideo />
        <PackagesPreview />
        <ServicesOverview />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
