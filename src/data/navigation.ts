export const navigation = [
  {
    label: "Cooling Solutions",
    targetId: "product-solutions",
    icon: "snowflake" as const,
  },
  {
    label: "Care Plans",
    targetId: "services",
    icon: "shield" as const,
  },
  {
    label: "Our Story",
    targetId: "why-vr",
    icon: "people" as const,
  },
  {
    label: "Visit Us",
    targetId: "contact",
    icon: "pin" as const,
  },
];

export type NavIcon = (typeof navigation)[number]["icon"];
