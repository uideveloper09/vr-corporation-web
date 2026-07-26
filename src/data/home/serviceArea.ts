export const serviceAreaData = {
  number: "09",
  title: "Close Enough to Show Up. Skilled Enough to Solve It.",
  description:
    "We serve Kharkhoda, Sonipat and nearby areas with quick site visits, proper planning and responsive support when you need it.",
  locations: ["Kharkhoda", "Sonipat", "Nearby Areas"],
  map: {
    alt: "Google Map of V R Corporation showroom in Kharkhoda",
  },
} as const;

export type ServiceAreaData = typeof serviceAreaData;
