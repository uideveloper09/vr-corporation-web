import { siteConfig } from "@/data/site";

import type { LegalSection } from "./privacy";
import {
  LEGAL_EFFECTIVE_DATE_LABEL,
  LEGAL_REVIEW_BADGE,
} from "./legalMeta";

export const termsPageData = {
  seo: {
    title: "Terms & Website Disclaimer | V R Corporation",
    description:
      "How website information, enquiries and service requests from V R Corporation should be understood before confirmation.",
  },
  route: "/terms-and-disclaimer",
  eyebrow: "CLEAR TERMS. CLEAR EXPECTATIONS.",
  title: "Clear Terms for a Clearer Experience.",
  intro:
    "These terms explain how website information, enquiries and service requests should be understood.",
  badges: [LEGAL_EFFECTIVE_DATE_LABEL, LEGAL_REVIEW_BADGE],
  tocLabel: "On this page",
  disclaimer:
    "Website guidance is general. Final capacity, model, system design, price, availability and installation scope must be confirmed after the requirement and site conditions are reviewed.",
  sections: [
    {
      id: "website-information",
      title: "Website Information",
      paragraphs: [
        "Content on this website is provided as general information about V R Corporation, Daikin-authorized offerings and local service pathways.",
        "Information may change as products, processes or showroom details are updated. Always confirm current details with the team when making a decision.",
      ],
    },
    {
      id: "cooling-guidance",
      title: "Cooling Guidance",
      paragraphs: [
        "Any tonnage, model, layout or system suggestions shown or discussed through the website are indicative until verified against your actual space, usage and site conditions.",
        "Technical details require a requirement and site review before they can be treated as final recommendations.",
      ],
    },
    {
      id: "quotes-prices-availability",
      title: "Quotes, Prices & Availability",
      paragraphs: [
        "Quotes, prices and product availability require final confirmation from the V R Corporation team.",
        "Website content does not create a binding offer. Confirmed commercial terms are those agreed after review of your requirement.",
      ],
    },
    {
      id: "site-visit-requests",
      title: "Site Visit Requests",
      paragraphs: [
        "Submitting a site-visit, service or commercial enquiry through the website is a request, not a confirmed appointment or booking.",
        "The team will review feasibility and contact you to confirm the next step before any visit or service slot is treated as scheduled.",
      ],
    },
    {
      id: "service-scope",
      title: "Service Scope",
      paragraphs: [
        "Installation, maintenance, AMC and related service scope — including any applicable charges — are agreed before work begins.",
        "Website descriptions of services are summaries and may not cover every condition that applies to a specific project.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property & Trademarks",
      paragraphs: [
        "Website text, layout, photography and other materials belonging to V R Corporation remain protected as applicable.",
        "Daikin and other third-party marks are the property of their respective owners and appear only in authorized contexts. Unauthorized use is not permitted.",
      ],
    },
    {
      id: "external-links",
      title: "External Links",
      paragraphs: [
        "Links to Google Maps, WhatsApp or other third-party services open outside this website and follow those providers’ own practices and terms.",
        "V R Corporation is not responsible for the content, availability or privacy practices of external platforms.",
      ],
    },
    {
      id: "liability-technical-verification",
      title: "Liability & Technical Verification",
      paragraphs: [
        "Decisions based solely on website guidance are made at your own judgment. Final system design, capacity and installation scope depend on verified requirements and site conditions.",
        "To the extent permitted by applicable law, website content is provided without warranties beyond those required for a local business website of this kind. Specific project commitments arise only from confirmed discussions with the team.",
      ],
    },
    {
      id: "governing-terms",
      title: "Governing Terms",
      paragraphs: [
        "These terms are intended to set clear expectations for use of the website and related enquiry flows.",
        "Governing law and jurisdiction wording requires legal review before publication and will be added in a revised version of this page.",
      ],
    },
    {
      id: "updates",
      title: "Updates",
      paragraphs: [
        "We may update these terms as website content, services or legal requirements change.",
        "Published changes will show an updated effective date on this page.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        `For questions about these terms, contact V R Corporation at ${siteConfig.address.formatted}.`,
        "Final business contact details will be added before launch. You may also reach the team through the Contact page.",
      ],
    },
  ] satisfies LegalSection[],
  contactCta: {
    label: "Visit Contact Page",
    href: "/contact-us",
  },
} as const;
