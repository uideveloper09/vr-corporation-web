import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NotFoundPage from "@/components/pages/NotFound";
import BackToTop from "@/components/ui/BackToTop";
import Reveal from "@/components/ui/Reveal";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import { notFoundPageData } from "@/data/pages/notFound";

export const metadata: Metadata = {
  title: {
    absolute: notFoundPageData.seo.title,
  },
  description: notFoundPageData.seo.description,
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <NotFoundPage />
      </main>
      <Reveal variant="up" delay={40}>
        <Footer />
      </Reveal>
      <WhatsAppFab />
      <BackToTop />
    </>
  );
}
