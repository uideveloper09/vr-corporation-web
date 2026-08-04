import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ProductsPage } from "@/components/pages/Solutions";
import BackToTop from "@/components/ui/BackToTop";
import Reveal from "@/components/ui/Reveal";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import { productsPageData } from "@/data/pages/products";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: productsPageData.seo.title,
  },
  description: productsPageData.seo.description,
  openGraph: {
    title: productsPageData.seo.title,
    description: productsPageData.seo.description,
    url: siteConfig.urlReady ? `${siteConfig.url}/products` : undefined,
  },
  twitter: {
    title: productsPageData.seo.title,
    description: productsPageData.seo.description,
  },
  alternates: siteConfig.urlReady
    ? { canonical: `${siteConfig.url}/products` }
    : undefined,
};

export default function ProductsRoute() {
  return (
    <>
      <Header />
      <main>
        <ProductsPage />
      </main>
      <Reveal variant="up" delay={40}>
        <Footer />
      </Reveal>
      <WhatsAppFab />
      <BackToTop />
    </>
  );
}
