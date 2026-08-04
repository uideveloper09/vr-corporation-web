import { daikinProductCategories } from "@/data/products/catalog";

export const productsPageData = {
  seo: {
    title: "Daikin AC Products in Kharkhoda, Sonipat | V R Corporation",
    description:
      "Browse Daikin Split, Cassette, Floor Standing, Ducted, VRV, Chillers, Refrigeration, Roof Top, FCU, Ceiling Suspended, Control Systems and Air Purifier products from V R Corporation in Kharkhoda, Sonipat.",
  },
  route: "/products",
  hero: {
    eyebrow: "DAIKIN PRODUCT RANGE",
    title: "Daikin Products for Every Kind of Space.",
    intro:
      "Explore Daikin product categories the same way they are organised officially — from Split and Cassette to VRV, Chillers, Controls and Air Purifiers.",
    primaryCta: { label: "Help Me Choose", href: "/find-my-ideal-ac" },
    secondaryCta: { label: "Plan a Site Visit", href: "/site-visit" },
  },
  catalog: {
    title: "Browse Daikin products",
    intro: "Choose a category to view its product lineup.",
  },
  tabs: daikinProductCategories.map((category) => ({
    id: category.id,
    label: category.name,
    types: [category.id],
  })),
  decision: {
    title: "Not sure which product fits?",
    steps: [
      {
        id: "need",
        title: "Share your cooling need",
        body: "Tell us the rooms, usage pattern, budget band and any must-have features.",
      },
      {
        id: "match",
        title: "We match the product family",
        body: "We shortlist the Daikin product direction that fits capacity, comfort and efficiency.",
      },
      {
        id: "confirm",
        title: "Confirm on site before you buy",
        body: "Our team verifies load, piping and installation conditions before final selection.",
      },
    ],
    cta: { label: "Find My Best-Fit AC", href: "/find-my-ideal-ac" },
    notice:
      "Final model, capacity and installation method require site-condition verification.",
  },
  related: [
    { label: "Cooling Solutions", href: "/cooling-solutions" },
    { label: "Find My Ideal AC", href: "/find-my-ideal-ac" },
    { label: "Plan a Site Visit", href: "/site-visit" },
    { label: "Commercial Cooling", href: "/commercial-cooling-solutions" },
    { label: "AC Service & AMC", href: "/ac-service-amc" },
  ],
} as const;

export type ProductsPageData = typeof productsPageData;
