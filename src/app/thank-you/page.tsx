import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThankYouPage from "@/components/pages/ThankYou";
import BackToTop from "@/components/ui/BackToTop";
import Reveal from "@/components/ui/Reveal";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import { thankYouPageData } from "@/data/pages/thankYou";

export const metadata: Metadata = {
  title: {
    absolute: thankYouPageData.seo.title,
  },
  description: thankYouPageData.seo.description,
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

type ThankYouRouteProps = {
  searchParams: Promise<{
    type?: string | string[];
    ref?: string | string[];
  }>;
};

const pickParam = (value?: string | string[]) =>
  Array.isArray(value) ? value[0] : value;

/** Client-safe fallback reference — no PII. Real refs come from server later. */
const buildFallbackReference = () => {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  return `VR-${stamp}`;
};

export default async function ThankYouRoute({ searchParams }: ThankYouRouteProps) {
  const params = await searchParams;
  const requestType = pickParam(params.type) ?? null;
  const reference = pickParam(params.ref) || buildFallbackReference();

  return (
    <>
      <Header />
      <main>
        <ThankYouPage requestType={requestType} reference={reference} />
      </main>
      <Reveal variant="up" delay={40}>
        <Footer />
      </Reveal>
      <WhatsAppFab />
      <BackToTop />
    </>
  );
}
