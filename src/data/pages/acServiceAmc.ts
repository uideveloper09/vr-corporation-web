export const acServiceAmcPageData = {
  seo: {
    title: "AC Service, Installation & AMC in Kharkhoda | V R Corporation",
    description:
      "Request AC installation, repair inspection, preventive maintenance or AMC support from V R Corporation in Kharkhoda and nearby Sonipat areas.",
  },
  route: "/ac-service-amc",
  hero: {
    eyebrow: "CARE THAT CONTINUES",
    title: "Care That Keeps Your Comfort Going.",
    intro:
      "From careful installation to preventive maintenance and repair support, choose the next step your AC needs.",
    primaryCta: { label: "Tell Us What’s Not Cooling", scrollTo: "service-request" },
    secondaryCta: {
      label: "Explore an AMC Plan",
      href: "/ac-service-amc?service=amc",
      scrollTo: "service-request",
    },
  },
  cards: [
    {
      id: "installation",
      title: "Install It Right",
      copy: "Professional installation planned around the room, access and equipment.",
      cta: { label: "Plan My Installation", service: "installation" },
    },
    {
      id: "repair",
      title: "Bring Cooling Back",
      copy: "Share the symptoms and request an inspection for an AC that is not cooling properly.",
      cta: { label: "Describe the Problem", service: "repair" },
    },
    {
      id: "maintenance",
      title: "Keep It Running",
      copy: "Preventive cleaning and maintenance to reduce avoidable breakdowns.",
      cta: { label: "Schedule a Care Visit", service: "maintenance" },
    },
    {
      id: "amc",
      title: "Stay Covered",
      copy: "AMC options for homes, offices and commercial systems.",
      cta: { label: "Build My Care Plan", service: "amc" },
    },
  ],
  form: {
    id: "service-request",
    title: "What’s Your AC Telling You?",
    symptoms: [
      { value: "not-cooling", label: "Not Cooling" },
      { value: "water-leakage", label: "Water Leakage" },
      { value: "unusual-noise", label: "Unusual Noise" },
      { value: "weak-airflow", label: "Weak Airflow" },
      { value: "high-power-use", label: "High Power Use" },
      { value: "routine-service", label: "Routine Service" },
    ],
    services: [
      { value: "installation", label: "Installation" },
      { value: "repair", label: "Repair inspection" },
      { value: "maintenance", label: "Preventive maintenance" },
      { value: "amc", label: "AMC plan" },
    ],
    consent:
      "I agree to be contacted about this service request by call or WhatsApp.",
    submitLabel: "Request a Service Call",
    note: "The team will review the request and confirm the visit by call or WhatsApp.",
  },
  process: {
    title: "How Care Moves Forward",
    steps: [
      "Share the issue",
      "We assess the requirement",
      "Visit is confirmed",
      "Service and care guidance",
    ],
  },
  formAside: {
    eyebrow: "How care moves forward",
    title: "From request to resolved.",
    copy: "Share what’s happening and the team will confirm the right next visit.",
    steps: [
      "Share the issue",
      "We assess the requirement",
      "Visit is confirmed",
      "Service and care guidance",
    ],
    cta: { label: "Plan a Site Visit", href: "/site-visit" },
  },
  coverage: "Serving Kharkhoda, Sonipat and nearby areas.",
  notice:
    "Inspection scope and charges, if applicable, must be confirmed before service.",
  related: [
    { label: "Cooling Solutions", href: "/cooling-solutions" },
    { label: "Plan a Site Visit", href: "/site-visit" },
    { label: "Visit & Contact", href: "/contact-us" },
  ],
} as const;
