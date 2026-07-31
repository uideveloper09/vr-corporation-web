export const commercialCoolingPageData = {
  seo: {
    title: "Commercial AC & HVAC Solutions in Kharkhoda, Sonipat | V R Corporation",
    description:
      "Plan Daikin VRV/VRF, ducted, chiller and AHU cooling directions for offices, showrooms, plants and institutions with V R Corporation.",
  },
  route: "/commercial-cooling-solutions",
  hero: {
    eyebrow: "BUILT FOR BUSINESS",
    title: "Cooling Engineered Around the Way Your Business Works.",
    intro:
      "From focused workspaces to demanding production environments, we help plan the right Daikin cooling direction around your operations.",
    primaryCta: {
      label: "Request a Commercial Site Study",
      href: "/site-visit?purpose=commercial",
    },
    secondaryCta: { label: "Discuss My Project", scrollTo: "project-enquiry" },
  },
  industries: [
    {
      id: "office",
      title: "Corporate & Offices",
      copy: "Quiet, zoned comfort for teams, meeting rooms and cabins.",
      cta: { label: "Engineer My Workspace", industry: "office" },
    },
    {
      id: "retail",
      title: "Retail & Showrooms",
      copy: "Consistent comfort that supports the customer journey.",
      cta: { label: "Cool the Customer Journey", industry: "retail" },
    },
    {
      id: "factory",
      title: "Factories & Plants",
      copy: "Robust cooling direction shaped around equipment, process and people.",
      cta: { label: "Plan for Production", industry: "factory" },
    },
    {
      id: "institution",
      title: "Hotels & Institutions",
      copy: "Dependable comfort planning across rooms and shared spaces.",
      cta: { label: "Design for Every Guest", industry: "institution" },
    },
  ],
  systems: [
    {
      id: "vrv-vrf",
      title: "VRV / VRF",
      copy: "Flexible systems for multi-zone comfort across buildings.",
    },
    {
      id: "ducted",
      title: "Ducted Systems",
      copy: "Discreet, uniform cooling direction for larger spaces and diverse layouts.",
    },
    {
      id: "chiller-ahu",
      title: "Chillers & AHU",
      copy: "Centralized cooling direction for large facilities and process environments.",
    },
  ],
  journey: {
    title: "Project Journey",
    steps: [
      {
        id: "site-study",
        title: "Site Study",
        body: "We understand your space, operations and priorities.",
      },
      {
        id: "direction",
        title: "Cooling Direction",
        body: "We define the right comfort strategy for your goals.",
      },
      {
        id: "planning",
        title: "System Planning",
        body: "We plan systems that fit your space and usage.",
      },
      {
        id: "install",
        title: "Installation & Commissioning",
        body: "We install with precision and commission with care.",
      },
      {
        id: "care",
        title: "Ongoing Care",
        body: "We help keep your systems running at their best.",
      },
    ],
  },
  clients: {
    title: "Organizations We’ve Supported",
    names: [
      "Suzuki Motorcycles Kharkhoda",
      "Bellsonica",
      "KML Seat",
      "Polyplastic India",
      "Takenaka India Pvt Ltd",
      "Meneta",
    ],
    notice: "Client logos require approved production assets.",
  },
  finalCta: {
    title: "Let’s Turn the Requirement Into a Clear Cooling Plan.",
    primaryCta: {
      label: "Request a Commercial Site Study",
      href: "/site-visit?purpose=commercial",
    },
    secondaryCta: { label: "Start a Project Conversation", scrollTo: "project-enquiry" },
  },
  form: {
    id: "project-enquiry",
    title: "Start a Project Conversation",
    industries: [
      { value: "office", label: "Corporate & Offices" },
      { value: "retail", label: "Retail & Showrooms" },
      { value: "factory", label: "Factories & Plants" },
      { value: "institution", label: "Hotels & Institutions" },
      { value: "other", label: "Other" },
    ],
    stages: [
      { value: "exploring", label: "Exploring options" },
      { value: "planning", label: "Planning / design" },
      { value: "ready", label: "Ready for site study" },
      { value: "upgrade", label: "Upgrade / replacement" },
    ],
    consent:
      "I agree to be contacted about this commercial enquiry by call or WhatsApp.",
    submitLabel: "Send Project Enquiry",
  },
  formAside: {
    eyebrow: "Project journey",
    title: "From requirement to a clear plan.",
    copy: "Share the project basics and we’ll help shape the right commercial cooling direction.",
    steps: [
      { title: "Site Study", body: "Understand space, operations and priorities." },
      { title: "Cooling Direction", body: "Define the comfort strategy for your goals." },
      { title: "System Planning", body: "Plan systems that fit usage and layout." },
      { title: "Install & Care", body: "Commission carefully, then support ongoing." },
    ],
    cta: {
      label: "Request a Commercial Site Study",
      href: "/site-visit?purpose=commercial",
    },
  },
  related: [
    { label: "Request a Commercial Site Study", href: "/site-visit?purpose=commercial" },
    { label: "AC Service & AMC", href: "/ac-service-amc" },
    { label: "Cooling Solutions", href: "/cooling-solutions" },
  ],
} as const;
