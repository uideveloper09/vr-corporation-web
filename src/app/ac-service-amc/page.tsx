import type { Metadata } from "next";
import { Suspense } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AcServiceAmcPage } from "@/components/pages/Solutions";
import BackToTop from "@/components/ui/BackToTop";
import Reveal from "@/components/ui/Reveal";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import { acServiceAmcPageData } from "@/data/pages/acServiceAmc";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: acServiceAmcPageData.seo.title,
  },
  description: acServiceAmcPageData.seo.description,
  openGraph: {
    title: acServiceAmcPageData.seo.title,
    description: acServiceAmcPageData.seo.description,
    url: siteConfig.urlReady ? `${siteConfig.url}/ac-service-amc` : undefined,
  },
  twitter: {
    title: acServiceAmcPageData.seo.title,
    description: acServiceAmcPageData.seo.description,
  },
  alternates: siteConfig.urlReady
    ? { canonical: `${siteConfig.url}/ac-service-amc` }
    : undefined,
};

export default function AcServiceAmcRoute() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={null}>
          <AcServiceAmcPage />
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
