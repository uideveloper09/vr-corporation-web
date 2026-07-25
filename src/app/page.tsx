import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import Reveal from "@/components/ui/Reveal";
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
        <Reveal variant="fade" eager delay={160} className="reveal--hero">
          <Hero />
        </Reveal>

        <Reveal variant="up" delay={40} className="reveal--after-hero">
          <ProductSolutions />
        </Reveal>

        <Reveal variant="up" delay={60}>
          <IndustrySolutions />
        </Reveal>

        <Reveal variant="up" delay={40}>
          <WhyVr />
        </Reveal>

        <Reveal variant="scale" delay={50}>
          <CoolingPlan />
        </Reveal>

        <Reveal variant="left" delay={40}>
          <Showroom />
        </Reveal>

        <Reveal variant="up" delay={40}>
          <StayCool />
        </Reveal>

        <Reveal variant="up" delay={50}>
          <Testimonials />
        </Reveal>

        <Reveal variant="fade" delay={40}>
          <TrustedClients />
        </Reveal>

        <Reveal variant="right" delay={40}>
          <ServiceArea />
        </Reveal>

        <Reveal variant="up" delay={50}>
          <Faq />
        </Reveal>

        <Reveal variant="scale" delay={40}>
          <FinalCta />
        </Reveal>

        <Reveal variant="up" delay={60}>
          <ContactVisit />
        </Reveal>
      </main>

      <Reveal variant="up" delay={40}>
        <Footer />
      </Reveal>

      <WhatsAppFab />
      <BackToTop />
      <ChatWidget />
    </>
  );
}
