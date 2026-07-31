import { siteConfig } from "@/data/site";

export const contactPageData = {
  seo: {
    title: "Contact V R Corporation | Daikin Showroom in Kharkhoda",
    description:
      "Visit the V R Corporation showroom in Kharkhoda or send your cooling requirement for review. Find address, hours and directions.",
  },
  hero: {
    eyebrow: "YOUR LOCAL COOLING DESK",
    title: "Come In With Questions. Leave With Clarity.",
    intro:
      "Visit the V R Corporation showroom in Kharkhoda or send your requirement for the team to review.",
    primaryCta: {
      label: "Open in Google Maps",
      href: siteConfig.hasMap,
    },
    secondaryCta: {
      label: "Send My Enquiry",
      href: "/contact-us",
      scrollTo: "contact-form",
    },
  },
  form: {
    id: "contact-form",
    number: "01",
    eyebrow: "ENQUIRY",
    title: "Tell Us About Your Space",
    intro: "Share a few details so our team can understand and guide you better.",
    fields: {
      name: {
        id: "full-name",
        label: "Full name",
        placeholder: "Your full name",
        required: true,
      },
      mobile: {
        id: "mobile",
        label: "Mobile number",
        placeholder: "10-digit mobile number",
        required: true,
      },
      email: {
        id: "email",
        label: "Email",
        placeholder: "you@example.com",
        required: true,
      },
      contactPreference: {
        id: "contact-preference",
        label: "Preferred contact",
        required: true,
        options: [
          { value: "call", label: "Call" },
          { value: "whatsapp", label: "WhatsApp" },
        ],
      },
      requirement: {
        id: "requirement",
        label: "Requirement",
        required: true,
        options: [
          { value: "new-ac", label: "New AC" },
          { value: "replacement", label: "Replacement" },
          { value: "service-amc", label: "Service or AMC" },
          { value: "commercial", label: "Commercial System" },
          { value: "other", label: "Other" },
        ],
      },
      locality: {
        id: "locality",
        label: "Locality",
        placeholder: "Area / locality",
        required: true,
      },
      message: {
        id: "message",
        label: "Message",
        placeholder: "Tell us a little about your space or requirement",
        required: false,
      },
    },
    consent:
      "I agree to be contacted about this enquiry by call, WhatsApp or email.",
    submitLabel: "Send My Enquiry",
    successMessage:
      "Thank you. Your enquiry has been received and will be reviewed before the team confirms the next step.",
  },
  location: {
    id: "visit-showroom",
    number: "02",
    eyebrow: "SHOWROOM",
    title: "Visit V R Corporation",
    brand: {
      name: "V R CORPORATION",
      partner: "DAIKIN AUTHORIZED PARTNER",
    },
    hoursNote: "Operating days to be confirmed before launch.",
    pendingNotice:
      "Final call and WhatsApp numbers will be added after client confirmation.",
    mapsCta: {
      label: "Open in Google Maps",
      href: siteConfig.hasMap,
    },
  },
  faqs: {
    number: "03",
    title: "Common Questions.",
    image: {
      src: "/images/brand/10/FAQ-right-img-new1.png",
      alt: "Daikin AC above a modern living corner with blue chair and floor lamp",
    },
    items: [
      {
        id: "appointment",
        icon: "ac" as const,
        question: "Can I visit without an appointment?",
        answer:
          "You may visit during confirmed operating hours. Calling or messaging in advance is recommended for larger project discussions.",
      },
      {
        id: "site-visit",
        icon: "pin" as const,
        question: "Can you visit my site?",
        answer:
          "Share the location and requirement. The team will review feasibility and confirm the next step.",
      },
      {
        id: "commercial",
        icon: "shield" as const,
        question: "Do you handle commercial requirements?",
        answer:
          "Yes. The website includes a dedicated commercial cooling enquiry and site-study request flow.",
      },
    ],
  },
} as const;

export type ContactPageData = typeof contactPageData;
