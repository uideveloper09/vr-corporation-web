import type { Metadata } from "next";
import { Suspense } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SiteVisitPage } from "@/components/pages/Solutions";
import BackToTop from "@/components/ui/BackToTop";
import Reveal from "@/components/ui/Reveal";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import { siteVisitPageData } from "@/data/pages/siteVisit";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: siteVisitPageData.seo.title,
  },
  description: siteVisitPageData.seo.description,
  openGraph: {
    title: siteVisitPageData.seo.title,
    description: siteVisitPageData.seo.description,
    url: siteConfig.urlReady ? `${siteConfig.url}/site-visit` : undefined,
  },
  twitter: {
    title: siteVisitPageData.seo.title,
    description: siteVisitPageData.seo.description,
  },
  alternates: siteConfig.urlReady
    ? { canonical: `${siteConfig.url}/site-visit` }
    : undefined,
};

export default function SiteVisitRoute() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={null}>
          <SiteVisitPage />
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
