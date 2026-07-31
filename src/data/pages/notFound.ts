export const notFoundPageData = {
  seo: {
    title: "Page Not Found | V R Corporation",
    description:
      "This page could not be found. Return to V R Corporation for Daikin cooling solutions, care plans and showroom visit options in Kharkhoda.",
  },
  eyebrow: "PAGE NOT FOUND",
  code: "404",
  title: "This Path Doesn’t Lead Anywhere Useful.",
  body: "The page you’re looking for may have moved, or the link might be incomplete. Let’s get you back to a clearer next step.",
  primaryCta: {
    label: "Back to Home",
    href: "/",
  },
  secondaryCta: {
    label: "Visit & Contact",
    href: "/contact-us",
  },
  linksTitle: "Helpful places to continue",
  links: [
    {
      label: "Cooling Solutions",
      description: "Explore Daikin directions for home and larger spaces.",
      href: "/cooling-solutions",
    },
    {
      label: "Care Plans",
      description: "Installation, repair, maintenance and AMC support.",
      href: "/ac-service-amc",
    },
    {
      label: "Commercial Cooling",
      description: "Plan VRV/VRF, ducted and facility-scale systems.",
      href: "/commercial-cooling-solutions",
    },
    {
      label: "Our Story",
      description: "Meet the local Daikin partner in Kharkhoda.",
      href: "/about-us",
    },
  ],
} as const;

export type NotFoundPageData = typeof notFoundPageData;
