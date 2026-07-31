import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LegalPage from "@/components/pages/Legal";
import BackToTop from "@/components/ui/BackToTop";
import Reveal from "@/components/ui/Reveal";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import { privacyPageData } from "@/data/pages/privacy";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: privacyPageData.seo.title,
  },
  description: privacyPageData.seo.description,
  openGraph: {
    title: privacyPageData.seo.title,
    description: privacyPageData.seo.description,
    url: siteConfig.urlReady ? `${siteConfig.url}${privacyPageData.route}` : undefined,
  },
  twitter: {
    title: privacyPageData.seo.title,
    description: privacyPageData.seo.description,
  },
  alternates: siteConfig.urlReady
    ? { canonical: `${siteConfig.url}${privacyPageData.route}` }
    : undefined,
};

export default function PrivacyPolicyRoute() {
  return (
    <>
      <Header />
      <main>
        <LegalPage data={privacyPageData} />
      </main>
      <Reveal variant="up" delay={40}>
        <Footer />
      </Reveal>
      <WhatsAppFab />
      <BackToTop />
    </>
  );
}
