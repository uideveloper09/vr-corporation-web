import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactPage from "@/components/pages/Contact";
import BackToTop from "@/components/ui/BackToTop";
import Reveal from "@/components/ui/Reveal";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import { contactPageData } from "@/data/pages/contact";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: contactPageData.seo.title,
  },
  description: contactPageData.seo.description,
  openGraph: {
    title: contactPageData.seo.title,
    description: contactPageData.seo.description,
    url: siteConfig.urlReady ? `${siteConfig.url}/contact-us` : undefined,
  },
  twitter: {
    title: contactPageData.seo.title,
    description: contactPageData.seo.description,
  },
  alternates: siteConfig.urlReady
    ? { canonical: `${siteConfig.url}/contact-us` }
    : undefined,
};

export default function ContactUsRoute() {
  return (
    <>
      <Header />
      <main>
        <ContactPage />
      </main>
      <Reveal variant="up" delay={40}>
        <Footer />
      </Reveal>
      <WhatsAppFab />
      <BackToTop />
    </>
  );
}
