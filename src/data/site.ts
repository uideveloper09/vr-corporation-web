/**
 * Single source of truth for NAP + SEO (Local Growth Blueprint §7.2).
 * Update NEXT_PUBLIC_SITE_URL and phone fields before launch.
 */

const siteUrlEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const siteConfig = {
  name: "V R Corporation",
  legalName: "V R Corporation",
  partnerLine: "Daikin Authorized Partner",
  positioning:
    "V R Corporation helps homes, offices and commercial spaces in Kharkhoda and nearby Sonipat areas select, install and maintain the right Daikin cooling solution — with local showroom access and dependable support after switch-on.",

  /** Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.example.com) */
  url: siteUrlEnv || "http://localhost:3000",
  urlReady: Boolean(siteUrlEnv),

  address: {
    streetAddress: "Ward No. 9, Near Shri Ram Real Estate",
    addressLocality: "Kharkhoda",
    addressRegion: "Haryana",
    postalCode: "131402",
    addressCountry: "IN",
    formatted:
      "Ward No. 9, Near Shri Ram Real Estate, Kharkhoda, Sonipat, Haryana – 131402",
  },

  geo: {
    latitude: 28.8674698,
    longitude: 76.9061127,
  },

  hasMap:
    "https://www.google.com/maps?q=28.867469787597656,76.90611267089844&z=17&hl=en",

  /** Hours confirmed; operating days still pending — do not invent days in schema */
  hours: {
    opens: "10:00",
    closes: "19:00",
    display: "10:00 AM–7:00 PM",
    daysConfirmed: false as boolean,
  },

  phone: {
    /** Replace before launch; placeholder stays out of schema + live tel links */
    e164: "+910000000000",
    display: "",
    ready: false as boolean,
  },

  email: {
    value: "",
    ready: false as boolean,
  },

  areaServed: ["Kharkhoda", "Sonipat", "Nearby Areas"] as const,

  logos: {
    symbol: "/images/logos/logo-symbol.png",
    full: "/images/logos/logo-vrcorporation.png",
    icon: "/icon.png",
  },

  ogImage: "/images/hero/heroDoor-new2.png",
} as const;

export type SiteConfig = typeof siteConfig;

/** Homepage SEO from blueprint §5 */
export const homeSeo = {
  title: "Daikin AC Dealer in Kharkhoda | V R Corporation",
  description:
    "Visit V R Corporation for Daikin AC solutions, installation, AMC and commercial cooling support in Kharkhoda, Sonipat. Plan your cooling solution.",
  keywords: [
    "Daikin AC dealer in Kharkhoda",
    "Daikin showroom in Kharkhoda",
    "AC dealer in Kharkhoda",
    "Daikin AC near me",
    "AC showroom Kharkhoda",
    "AC installation Kharkhoda",
    "AC AMC Kharkhoda",
    "Daikin authorized partner Kharkhoda",
  ],
} as const;

/**
 * Planned page SEO map (blueprint §2 / §5).
 * Only publish a route when that page has real, useful content.
 */
export const plannedPageSeo = {
  "/": homeSeo,
  "/daikin-ac/": {
    title: "Daikin AC Solutions in Kharkhoda | V R Corporation",
    description:
      "Compare Daikin cooling solutions for homes, offices and commercial spaces with local guidance from V R Corporation in Kharkhoda.",
  },
  "/split-inverter-ac/": {
    title: "Split & Inverter AC Dealer in Kharkhoda | V R",
    description:
      "Find the right Daikin split or inverter AC for your room, usage and comfort goals. Visit V R Corporation in Kharkhoda.",
  },
  "/commercial-ac/": {
    title: "Commercial AC & VRV/VRF Solutions in Sonipat | V R",
    description:
      "Plan VRV/VRF, ductable AC, chiller and AHU solutions for commercial spaces with V R Corporation's local HVAC guidance.",
  },
  "/ac-installation/": {
    title: "AC Installation in Kharkhoda | V R Corporation",
    description:
      "Plan a professional AC site visit and installation in Kharkhoda with clear guidance on placement, capacity and readiness.",
  },
  "/ac-repair-amc/": {
    title: "AC Repair, Maintenance & AMC in Kharkhoda | V R",
    description:
      "Keep your cooling system running with AC repair, preventive maintenance and AMC support from V R Corporation in Kharkhoda.",
  },
  "/about-us/": {
    title: "About V R Corporation | Daikin Partner in Kharkhoda",
    description:
      "Meet V R Corporation, a local Daikin-authorized air-conditioning partner serving homes and businesses around Kharkhoda and Sonipat.",
  },
  "/contact-us/": {
    title: "Visit V R Corporation AC Showroom in Kharkhoda",
    description:
      "Find V R Corporation in Ward No. 9, Kharkhoda. View directions, showroom hours and ways to discuss your cooling requirement.",
  },
  "/areas-we-serve/": {
    title: "AC Services in Kharkhoda & Nearby Areas | V R Corporation",
    description:
      "V R Corporation serves Kharkhoda, Sonipat and nearby areas with site visits, installation support and responsive cooling care.",
  },
} as const;
