import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutPage from "@/components/pages/About";
import BackToTop from "@/components/ui/BackToTop";
import Reveal from "@/components/ui/Reveal";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import { aboutPageData } from "@/data/pages/about";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: aboutPageData.seo.title,
  },
  description: aboutPageData.seo.description,
  openGraph: {
    title: aboutPageData.seo.title,
    description: aboutPageData.seo.description,
    url: siteConfig.urlReady ? `${siteConfig.url}/about-us` : undefined,
    images: [
      {
        url: aboutPageData.hero.image.src,
        alt: aboutPageData.hero.image.alt,
      },
    ],
  },
  twitter: {
    title: aboutPageData.seo.title,
    description: aboutPageData.seo.description,
    images: [aboutPageData.hero.image.src],
  },
  alternates: siteConfig.urlReady
    ? { canonical: `${siteConfig.url}/about-us` }
    : undefined,
};

export default function AboutUsRoute() {
  return (
    <>
      <Header />
      <main>
        <AboutPage />
      </main>
      <Reveal variant="up" delay={40}>
        <Footer />
      </Reveal>
      <WhatsAppFab />
      <BackToTop />
    </>
  );
}
