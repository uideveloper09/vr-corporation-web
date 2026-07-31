export const siteVisitPageData = {
  seo: {
    title: "Plan a Site Visit in Kharkhoda | V R Corporation",
    description:
      "Request a site visit with V R Corporation in Kharkhoda for Daikin cooling assessment, placement guidance and installation readiness.",
  },
  route: "/site-visit",
  hero: {
    eyebrow: "SEE THE SPACE. PLAN IT RIGHT.",
    title: "Plan a Site Visit.",
    intro:
      "A site visit helps confirm placement, capacity direction and installation readiness before you decide.",
    commercialIntro:
      "A commercial site study helps shape the right cooling direction around your operations, layout and priorities.",
  },
  form: {
    id: "site-visit-request",
    title: "Request a Site Visit",
    commercialTitle: "Request a Commercial Site Study",
    intro:
      "Share the location and a little about the space. The team will review feasibility and confirm the next step.",
    consent:
      "I agree to be contacted about this site visit request by call, WhatsApp or email.",
    submitLabel: "Request Site Visit",
    commercialSubmitLabel: "Request Site Study",
  },
  formAside: {
    eyebrow: "What happens next",
    title: "We’ll review, then confirm.",
    copy: "A short request helps the team prepare before anyone arrives on site.",
    steps: [
      "Share location and space details",
      "Team reviews feasibility",
      "Visit slot confirmed by call or WhatsApp",
    ],
    cta: { label: "Visit & Contact", href: "/contact-us" },
  },
  notice:
    "A site visit is not confirmed until the team contacts you with a suitable slot.",
  related: [
    { label: "Find My Ideal AC", href: "/find-my-ideal-ac" },
    { label: "Cooling Solutions", href: "/cooling-solutions" },
    { label: "Commercial Cooling", href: "/commercial-cooling-solutions" },
    { label: "Visit & Contact", href: "/contact-us" },
  ],
} as const;

export type SiteVisitPageData = typeof siteVisitPageData;
