import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LegalPage from "@/components/pages/Legal";
import BackToTop from "@/components/ui/BackToTop";
import Reveal from "@/components/ui/Reveal";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import { termsPageData } from "@/data/pages/terms";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: termsPageData.seo.title,
  },
  description: termsPageData.seo.description,
  openGraph: {
    title: termsPageData.seo.title,
    description: termsPageData.seo.description,
    url: siteConfig.urlReady ? `${siteConfig.url}${termsPageData.route}` : undefined,
  },
  twitter: {
    title: termsPageData.seo.title,
    description: termsPageData.seo.description,
  },
  alternates: siteConfig.urlReady
    ? { canonical: `${siteConfig.url}${termsPageData.route}` }
    : undefined,
};

export default function TermsAndDisclaimerRoute() {
  return (
    <>
      <Header />
      <main>
        <LegalPage data={termsPageData} />
      </main>
      <Reveal variant="up" delay={40}>
        <Footer />
      </Reveal>
      <WhatsAppFab />
      <BackToTop />
    </>
  );
}
