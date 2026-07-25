import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import ChatWidget from "@/components/chat";
import JsonLd from "@/components/seo/JsonLd";
import {
  Hero,
  ProductSolutions,
  IndustrySolutions,
  WhyVr,
  CoolingPlan,
  Showroom,
  StayCool,
  Testimonials,
  TrustedClients,
  ServiceArea,
  Faq,
  FinalCta,
  ContactVisit,
} from "@/components/sections";
import { homeSeo, siteConfig } from "@/data/site";
import { buildHomeJsonLdGraph } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: {
    absolute: homeSeo.title,
  },
  description: homeSeo.description,
  keywords: [...homeSeo.keywords],
  openGraph: {
    title: homeSeo.title,
    description: homeSeo.description,
    url: siteConfig.urlReady ? siteConfig.url : undefined,
    images: [
      {
        url: siteConfig.ogImage,
        alt: `${siteConfig.name} showroom cooling solutions in Kharkhoda`,
      },
    ],
  },
  twitter: {
    title: homeSeo.title,
    description: homeSeo.description,
    images: [siteConfig.ogImage],
  },
  alternates: siteConfig.urlReady
    ? { canonical: siteConfig.url }
    : undefined,
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildHomeJsonLdGraph()} />

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
