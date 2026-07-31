import type { Metadata } from "next";
import { Suspense } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CoolingSolutionsPage } from "@/components/pages/Solutions";
import BackToTop from "@/components/ui/BackToTop";
import Reveal from "@/components/ui/Reveal";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import { coolingSolutionsPageData } from "@/data/pages/coolingSolutions";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: coolingSolutionsPageData.seo.title,
  },
  description: coolingSolutionsPageData.seo.description,
  openGraph: {
    title: coolingSolutionsPageData.seo.title,
    description: coolingSolutionsPageData.seo.description,
    url: siteConfig.urlReady ? `${siteConfig.url}/cooling-solutions` : undefined,
  },
  twitter: {
    title: coolingSolutionsPageData.seo.title,
    description: coolingSolutionsPageData.seo.description,
  },
  alternates: siteConfig.urlReady
    ? { canonical: `${siteConfig.url}/cooling-solutions` }
    : undefined,
};

export default function CoolingSolutionsRoute() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={null}>
          <CoolingSolutionsPage />
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
