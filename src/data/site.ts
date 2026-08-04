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
 * Page SEO map.
 * Published routes use handoff-approved titles/descriptions.
 * Remaining blueprint URLs stay here until those pages ship with real content.
 */
export const plannedPageSeo = {
  "/": homeSeo,
  "/cooling-solutions/": {
    title: "Daikin Cooling Solutions in Kharkhoda, Sonipat | V R Corporation",
    description:
      "Explore Daikin split, inverter, VRV/VRF, ducted, chiller and AHU cooling directions from V R Corporation in Kharkhoda, Sonipat.",
  },
  "/products/": {
    title: "Daikin AC Products in Kharkhoda, Sonipat | V R Corporation",
    description:
      "Explore Daikin Split, Cassette, Floor Standing, Ducted, VRV, Chillers, Refrigeration, Roof Top, FCU, Ceiling Suspended, Control Systems and Air Purifier products from V R Corporation in Kharkhoda, Sonipat.",
  },
  "/ac-service-amc/": {
    title: "AC Service, Installation & AMC in Kharkhoda | V R Corporation",
    description:
      "Request AC installation, repair inspection, preventive maintenance or AMC support from V R Corporation in Kharkhoda and nearby Sonipat areas.",
  },
  "/commercial-cooling-solutions/": {
    title: "Commercial AC & HVAC Solutions in Kharkhoda, Sonipat | V R Corporation",
    description:
      "Plan Daikin VRV/VRF, ducted, chiller and AHU cooling directions for offices, showrooms, plants and institutions with V R Corporation.",
  },
  "/about-us/": {
    title: "About V R Corporation | Daikin Authorized Partner in Kharkhoda",
    description:
      "Learn about V R Corporation, a Daikin Authorized Partner helping homes and businesses with planned cooling solutions in Kharkhoda and Sonipat.",
  },
  "/contact-us/": {
    title: "Contact V R Corporation | Daikin Showroom in Kharkhoda",
    description:
      "Visit V R Corporation in Kharkhoda, Sonipat or send an enquiry for Daikin cooling solutions, installation, service, AMC and commercial requirements.",
  },
  "/privacy-policy/": {
    title: "Privacy Policy | V R Corporation",
    description:
      "How V R Corporation may collect, use and protect information shared through the website and enquiry forms.",
  },
  "/terms-and-disclaimer/": {
    title: "Terms & Website Disclaimer | V R Corporation",
    description:
      "How website information, enquiries and service requests from V R Corporation should be understood before confirmation.",
  },
  /** Not published yet — keep drafts until content is ready. */
  "/split-inverter-ac/": {
    title: "Split & Inverter AC Dealer in Kharkhoda | V R",
    description:
      "Find the right Daikin split or inverter AC for your room, usage and comfort goals. Visit V R Corporation in Kharkhoda.",
  },
  "/areas-we-serve/": {
    title: "AC Services in Kharkhoda & Nearby Areas | V R Corporation",
    description:
      "V R Corporation serves Kharkhoda, Sonipat and nearby areas with site visits, installation support and responsive cooling care.",
  },
} as const;
