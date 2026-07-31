export const navigation = [
  {
    label: "Cooling Solutions",
    targetId: "product-solutions",
    href: "/cooling-solutions",
    icon: "snowflake" as const,
  },
  {
    label: "Care Plans",
    targetId: "services",
    href: "/ac-service-amc",
    icon: "shield" as const,
  },
  {
    label: "Our Story",
    targetId: "why-vr",
    href: "/about-us",
    icon: "people" as const,
  },
  {
    label: "Visit Us",
    targetId: "visit-showroom",
    href: "/contact-us",
    icon: "pin" as const,
  },
];

export type NavItem = (typeof navigation)[number];
export type NavIcon = NavItem["icon"];
