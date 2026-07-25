import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import ChatWidget from "@/components/chat";
import Hero from "@/sections/Hero";
import ProductSolutions from "@/sections/ProductSolutions";
import IndustrySolutions from "@/sections/IndustrySolutions";
import WhyVr from "@/sections/WhyVr";
import CoolingPlan from "@/sections/CoolingPlan";
import Showroom from "@/sections/Showroom";
import StayCool from "@/sections/StayCool";
import Testimonials from "@/sections/Testimonials";
import TrustedClients from "@/sections/TrustedClients";
import ServiceArea from "@/sections/ServiceArea";
import Faq from "@/sections/Faq";
import FinalCta from "@/sections/FinalCta";
import ContactVisit from "@/sections/ContactVisit";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <ProductSolutions />

        <IndustrySolutions />

        <WhyVr />

        <CoolingPlan />

        <Showroom />

        <StayCool />

        <Testimonials />

        <TrustedClients />

        <ServiceArea />

        <Faq />

        <FinalCta />

        <ContactVisit />
      </main>

      <Footer />

      <WhatsAppFab />
      <BackToTop />
      <ChatWidget />
    </>
  );
}
