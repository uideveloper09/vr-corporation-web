import type { Metadata } from "next";
import { Suspense } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CommercialCoolingPage } from "@/components/pages/Solutions";
import BackToTop from "@/components/ui/BackToTop";
import Reveal from "@/components/ui/Reveal";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import { commercialCoolingPageData } from "@/data/pages/commercialCooling";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: commercialCoolingPageData.seo.title,
  },
  description: commercialCoolingPageData.seo.description,
  openGraph: {
    title: commercialCoolingPageData.seo.title,
    description: commercialCoolingPageData.seo.description,
    url: siteConfig.urlReady
      ? `${siteConfig.url}/commercial-cooling-solutions`
      : undefined,
  },
  twitter: {
    title: commercialCoolingPageData.seo.title,
    description: commercialCoolingPageData.seo.description,
  },
  alternates: siteConfig.urlReady
    ? { canonical: `${siteConfig.url}/commercial-cooling-solutions` }
    : undefined,
};

export default function CommercialCoolingRoute() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={null}>
          <CommercialCoolingPage />
        </Suspense>
      </main>
      <Reveal variant="up" delay={40}>
        <Footer />
      </Reveal>
      <WhatsAppFab />
      <BackToTop />
    </>
  );
}
