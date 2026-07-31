export const findMyIdealAcPageData = {
  seo: {
    title: "Find My Ideal AC in Kharkhoda | V R Corporation",
    description:
      "Share how you use your space and we’ll help narrow the right Daikin cooling direction with V R Corporation in Kharkhoda, Sonipat.",
  },
  route: "/find-my-ideal-ac",
  hero: {
    eyebrow: "MATCHED TO YOUR SPACE",
    title: "Find the Cooling Direction That Fits.",
    intro:
      "Start with how your space is used. We’ll narrow the right Daikin direction — then confirm the final fit after a proper site review.",
    formCta: { label: "Not Sure Yet? Ask Us", scrollTo: "ideal-ac-help" },
  },
  pathwaysHeading: "Start with how you use the space",
  pathwaysIntro:
    "Pick the closest match. Each path leads to the cooling direction that usually fits that kind of space.",
  pathways: [
    {
      id: "home",
      step: "01",
      title: "One or two rooms",
      copy: "Quiet, efficient comfort for bedrooms and living spaces.",
      href: "/cooling-solutions?type=split-ac",
      cta: "Explore Home Cooling",
      image: "/images/brand/01/everyday-home-comfort.png",
      imageAlt: "Wall-mounted AC in a living room",
    },
    {
      id: "multi",
      step: "02",
      title: "Multiple rooms or zones",
      copy: "Independent comfort across rooms with smarter energy use.",
      href: "/cooling-solutions?type=vrv-vrf",
      cta: "Plan Multiple Zones",
      image: "/images/brand/01/multi-room-intelligence.png",
      imageAlt: "Multi-split AC system diagram",
    },
    {
      id: "ducted",
      step: "03",
      title: "Concealed, even cooling",
      copy: "Clean interiors with ducted comfort for premium spaces.",
      href: "/cooling-solutions?type=ducted",
      cta: "See Ducted Options",
      image: "/images/brand/01/invisible-ducted-cooling.png",
      imageAlt: "Ducted ceiling HVAC unit",
    },
    {
      id: "commercial",
      step: "04",
      title: "Business or larger facility",
      copy: "Offices, showrooms, plants and institutions need a planned system.",
      href: "/commercial-cooling-solutions",
      cta: "View Commercial Cooling",
      image: "/images/brand/01/heavy-duty-climate-control.png",
      imageAlt: "Commercial rooftop HVAC unit",
    },
  ],
  form: {
    id: "ideal-ac-help",
    title: "Still unsure? Tell us about the space.",
    intro:
      "Share a few details and the team will help narrow the right cooling direction.",
    consent:
      "I agree to be contacted about this cooling guidance request by call, WhatsApp or email.",
    submitLabel: "Help Me Choose",
  },
  formAside: {
    eyebrow: "How we help choose",
    title: "Narrow first. Confirm on site.",
    copy: "Use this form when the pathways above still leave you unsure.",
    steps: [
      "Tell us how the space is used",
      "We suggest a cooling direction",
      "Final fit confirmed after site review",
    ],
    cta: { label: "Plan a Site Visit", href: "/site-visit" },
  },
  notice:
    "Final capacity, system design and model selection require site-condition verification.",
  related: [
    { label: "Cooling Solutions", href: "/cooling-solutions" },
    { label: "Plan a Site Visit", href: "/site-visit" },
    { label: "Visit & Contact", href: "/contact-us" },
  ],
} as const;

export type FindMyIdealAcPageData = typeof findMyIdealAcPageData;
