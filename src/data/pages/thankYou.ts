import { siteConfig } from "@/data/site";

export const thankYouRequestTypes = [
  "cooling-plan",
  "service-request",
  "site-visit",
  "commercial-enquiry",
] as const;

export type ThankYouRequestType = (typeof thankYouRequestTypes)[number];

export const isThankYouRequestType = (
  value: string | null | undefined,
): value is ThankYouRequestType =>
  Boolean(value && thankYouRequestTypes.includes(value as ThankYouRequestType));

/** Map Contact enquiry requirement values → thank-you type (no PII). */
export const requirementToThankYouType: Record<string, ThankYouRequestType> = {
  "new-ac": "cooling-plan",
  replacement: "cooling-plan",
  "service-amc": "service-request",
  commercial: "commercial-enquiry",
  other: "cooling-plan",
};

export const thankYouPageData = {
  seo: {
    title: "Request Received | V R Corporation",
    description:
      "Your request has been received by V R Corporation. The team will review the details and confirm the next step.",
  },
  title: "Your Request Is In.",
  body: "Thank you. The V R Corporation team will review the details and contact you to confirm the right next step.",
  statusLabel: "Status",
  statusValue: "Awaiting team review",
  typeLabel: "Request type",
  referenceLabel: "Reference",
  notice:
    "A site visit or service slot is not confirmed until the team contacts you.",
  privacyLine:
    "Your submitted details are used only to respond to this request and provide the related follow-up.",
  privacyHref: "/privacy-policy",
  privacyLinkLabel: "Privacy Policy",
  nextSteps: {
    eyebrow: "WHAT HAPPENS NEXT",
    title: "Next Steps.",
    items: [
      {
        id: "review",
        number: "01",
        title: "We review the details",
      },
      {
        id: "confirm",
        number: "02",
        title: "The team confirms by call or WhatsApp",
      },
      {
        id: "plan",
        number: "03",
        title: "Together, we plan the next step",
      },
    ],
  },
  actions: [
    {
      id: "home",
      label: "Return to Home",
      href: "/",
      variant: "primary" as const,
    },
    {
      id: "solutions",
      label: "Explore Cooling Solutions",
      href: "/cooling-solutions",
      variant: "secondary" as const,
    },
    {
      id: "maps",
      label: "Open Showroom Location",
      href: siteConfig.hasMap,
      variant: "secondary" as const,
      external: true,
    },
  ],
  types: {
    "cooling-plan": {
      label: "Cooling Plan",
      summary:
        "We’ll match the right cooling direction for your space once the details are reviewed.",
    },
    "service-request": {
      label: "Service Request",
      summary: "We’ll review the issue and confirm the service next step.",
    },
    "site-visit": {
      label: "Site Visit",
      summary: "We’ll contact you to confirm the requested date and time.",
    },
    "commercial-enquiry": {
      label: "Commercial Enquiry",
      summary:
        "We’ll review the project requirement and arrange the right conversation.",
    },
  },
  fallback: {
    label: "Request received",
    summary: "We’ll review the details and confirm the right next step.",
  },
} as const;

export type ThankYouPageData = typeof thankYouPageData;
