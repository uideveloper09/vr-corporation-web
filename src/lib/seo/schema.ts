import { faqData } from "@/data/home/faq";
import { homeSeo, siteConfig } from "@/data/site";

type JsonLd = Record<string, unknown>;

const absoluteUrl = (path: string) => {
  if (path.startsWith("http")) return path;
  return new URL(path, siteConfig.url).toString();
};

/** HVACBusiness / LocalBusiness — only verified fields (blueprint §7.3). */
export function buildLocalBusinessJsonLd(): JsonLd {
  const { address, geo, hasMap, areaServed, logos, name, partnerLine, positioning } =
    siteConfig;

  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name,
    alternateName: `${name} — ${partnerLine}`,
    description: positioning,
    image: absoluteUrl(logos.full),
    logo: absoluteUrl(logos.symbol),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    hasMap,
    areaServed: areaServed.map((place) => ({
      "@type": "Place",
      name: place,
    })),
  };

  if (siteConfig.urlReady) {
    data.url = siteConfig.url;
  }

  if (siteConfig.phone.ready && siteConfig.phone.e164) {
    data.telephone = siteConfig.phone.e164;
  }

  if (siteConfig.email.ready && siteConfig.email.value) {
    data.email = siteConfig.email.value;
  }

  // Operating days are pending — omit openingHoursSpecification until confirmed
  return data;
}

/** FAQPage — mirrors visible FAQ copy exactly (blueprint §7 / helper §8). */
export function buildFaqPageJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildHomeWebPageJsonLd(): JsonLd {
  const page: JsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: homeSeo.title,
    description: homeSeo.description,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      ...(siteConfig.urlReady ? { url: siteConfig.url } : {}),
    },
    about: {
      "@type": "HVACBusiness",
      name: siteConfig.name,
    },
  };

  if (siteConfig.urlReady) {
    page.url = siteConfig.url;
  }

  return page;
}

export function buildHomeJsonLdGraph(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildLocalBusinessJsonLd(),
      buildFaqPageJsonLd(),
      buildHomeWebPageJsonLd(),
    ],
  };
}
