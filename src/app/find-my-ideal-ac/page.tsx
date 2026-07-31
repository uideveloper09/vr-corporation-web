import type { Metadata } from "next";
import { Suspense } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FindMyIdealAcPage } from "@/components/pages/Solutions";
import BackToTop from "@/components/ui/BackToTop";
import Reveal from "@/components/ui/Reveal";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import { findMyIdealAcPageData } from "@/data/pages/findMyIdealAc";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: findMyIdealAcPageData.seo.title,
  },
  description: findMyIdealAcPageData.seo.description,
  openGraph: {
    title: findMyIdealAcPageData.seo.title,
    description: findMyIdealAcPageData.seo.description,
    url: siteConfig.urlReady ? `${siteConfig.url}/find-my-ideal-ac` : undefined,
  },
  twitter: {
    title: findMyIdealAcPageData.seo.title,
    description: findMyIdealAcPageData.seo.description,
  },
  alternates: siteConfig.urlReady
    ? { canonical: `${siteConfig.url}/find-my-ideal-ac` }
    : undefined,
};

export default function FindMyIdealAcRoute() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={null}>
          <FindMyIdealAcPage />
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
