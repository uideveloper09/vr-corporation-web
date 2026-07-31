import { siteConfig } from "@/data/site";

import {
  LEGAL_EFFECTIVE_DATE_LABEL,
  LEGAL_REVIEW_BADGE,
} from "./legalMeta";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export const privacyPageData = {
  seo: {
    title: "Privacy Policy | V R Corporation",
    description:
      "How V R Corporation may collect, use and protect information shared through the website and enquiry forms.",
  },
  route: "/privacy-policy",
  eyebrow: "PRIVACY, EXPLAINED CLEARLY",
  title: "Your Details Deserve Clear Care.",
  intro:
    "This policy explains what information the website may collect, why it is used and the choices available to you.",
  badges: [LEGAL_EFFECTIVE_DATE_LABEL, LEGAL_REVIEW_BADGE],
  tocLabel: "On this page",
  sections: [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      paragraphs: [
        "When you use the enquiry form or related request flows, we may collect details such as your name, mobile number, email address, preferred contact method, locality or address notes, requirement type and any message you choose to share.",
        "We may also receive limited technical information needed to operate the website, such as basic device or browser signals used for security and performance.",
      ],
    },
    {
      id: "how-we-use-it",
      title: "How We Use It",
      paragraphs: [
        "We use submitted information to respond to your enquiry, understand your cooling requirement, assess whether a showroom discussion or site visit is appropriate, and arrange the related follow-up.",
        "We may also use aggregated or non-identifying information to improve the website experience and local service pathways.",
      ],
    },
    {
      id: "cookies-analytics",
      title: "Cookies & Analytics",
      paragraphs: [
        "The website may use cookies or similar technologies for essential operation and, where enabled, analytics that help us understand how pages are used.",
        "Analytics must not receive personal form-field values such as your name, mobile number, email, address or message content.",
      ],
    },
    {
      id: "sharing-service-providers",
      title: "Sharing & Service Providers",
      paragraphs: [
        "We do not sell personal information.",
        "Service providers may receive information only where needed to deliver a requested function — for example, delivering an enquiry notification or hosting the website — and subject to arrangements finalized for that purpose.",
      ],
    },
    {
      id: "retention",
      title: "Retention",
      paragraphs: [
        "We keep enquiry and related records only for as long as needed to respond, complete the requested follow-up and meet operational or legal requirements.",
        "The exact retention duration will be finalized before launch and may be updated in a revised version of this policy.",
      ],
    },
    {
      id: "security",
      title: "Security",
      paragraphs: [
        "We use reasonable safeguards intended to protect information submitted through the website.",
        "No method of transmission or storage is completely secure, so we do not promise absolute security.",
      ],
    },
    {
      id: "your-choices-requests",
      title: "Your Choices & Requests",
      paragraphs: [
        "You may ask us about the personal information we hold in connection with a website enquiry, or request correction or deletion where applicable.",
        "The exact wording and process for these requests will be aligned with applicable requirements after legal review. Until then, contact us through the channels listed below or the Contact page.",
      ],
    },
    {
      id: "childrens-privacy",
      title: "Children’s Privacy",
      paragraphs: [
        "This website is not directed to children. We do not knowingly collect personal information from children through the enquiry flows described here.",
      ],
    },
    {
      id: "policy-updates",
      title: "Policy Updates",
      paragraphs: [
        "We may update this policy as the website, services or legal requirements change.",
        "When we publish an update, the effective date shown on this page will be revised.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        `For privacy questions related to this website, contact V R Corporation at ${siteConfig.address.formatted}.`,
        "Final privacy contact details (including a dedicated email or phone channel) will be added before launch. You may also use the Contact page to reach the team.",
      ],
    },
  ] satisfies LegalSection[],
  contactCta: {
    label: "Visit Contact Page",
    href: "/contact-us",
  },
} as const;
