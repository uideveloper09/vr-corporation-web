export const coolingSolutionsPageData = {
  seo: {
    title: "Daikin Cooling Solutions in Kharkhoda, Sonipat | V R Corporation",
    description:
      "Explore Daikin split, inverter, VRV/VRF, ducted, chiller and AHU cooling directions from V R Corporation in Kharkhoda, Sonipat.",
  },
  route: "/cooling-solutions",
  hero: {
    eyebrow: "COOLING, SHAPED AROUND YOU",
    title: "Cooling Solutions, Shaped Around Your Space.",
    intro:
      "From one room to an entire facility, explore the Daikin cooling direction that fits how your space is used.",
    primaryCta: { label: "Help Me Choose", href: "/find-my-ideal-ac" },
    secondaryCta: { label: "Plan a Site Visit", href: "/site-visit" },
  },
  tabs: [
    { id: "home", label: "Home", types: ["split-ac"] },
    { id: "multi-room", label: "Multi-Room", types: ["vrv-vrf"] },
    { id: "commercial", label: "Commercial", types: ["ducted", "vrv-vrf"] },
    { id: "industrial", label: "Industrial", types: ["chiller-ahu"] },
  ],
  cards: [
    {
      id: "split-ac",
      type: "split-ac",
      category: "home",
      title: "Everyday Home Comfort",
      system: "Split & Inverter AC",
      copy: "Quiet, efficient cooling for bedrooms and living spaces.",
      bestFor: "1–2 rooms",
      cta: { label: "Explore Home Cooling", href: "/cooling-solutions?type=split-ac" },
      image: "/images/brand/01/everyday-home-comfort.png",
      imageAlt: "Wall-mounted AC in a living room",
    },
    {
      id: "vrv-vrf",
      type: "vrv-vrf",
      category: "multi-room",
      title: "Multi-Room Intelligence",
      system: "VRV / VRF Systems",
      copy: "Independent comfort across multiple rooms with smarter energy use.",
      bestFor: "Villas, offices and multi-zone spaces",
      cta: { label: "Plan Multiple Zones", href: "/cooling-solutions?type=vrv-vrf" },
      image: "/images/brand/01/multi-room-intelligence.png",
      imageAlt: "Multi-split AC system diagram",
    },
    {
      id: "ducted",
      type: "ducted",
      category: "commercial",
      title: "Invisible Ducted Cooling",
      system: "Ducted Air Conditioning",
      copy: "Clean interiors with concealed, evenly distributed cooling.",
      bestFor: "Premium homes, showrooms and offices",
      cta: { label: "See Where Ducted Fits", href: "/cooling-solutions?type=ducted" },
      image: "/images/brand/01/invisible-ducted-cooling.png",
      imageAlt: "Ducted ceiling HVAC unit",
    },
    {
      id: "chiller-ahu",
      type: "chiller-ahu",
      category: "industrial",
      title: "Heavy-Duty Climate Control",
      system: "Chillers & AHU",
      copy: "Engineered cooling direction for larger commercial and industrial requirements.",
      bestFor: "Plants, institutions and large facilities",
      cta: {
        label: "Discuss an Engineered System",
        href: "/commercial-cooling-solutions?system=chiller-ahu",
      },
      image: "/images/brand/01/heavy-duty-climate-control.png",
      imageAlt: "Commercial rooftop HVAC unit",
    },
  ],
  decision: {
    title: "Not sure which system fits?",
    steps: [
      {
        id: "space",
        title: "Tell us about the space",
        body: "Share usage, size, location and your comfort needs.",
      },
      {
        id: "direction",
        title: "We narrow the direction",
        body: "We recommend the right system direction for your space.",
      },
      {
        id: "verify",
        title: "An expert verifies the final design",
        body: "Our team reviews site conditions to confirm the best fit.",
      },
    ],
    cta: { label: "Find My Best-Fit AC", href: "/find-my-ideal-ac" },
    notice:
      "Final capacity, system design and model selection require site-condition verification.",
  },
  related: [
    { label: "Find My Ideal AC", href: "/find-my-ideal-ac" },
    { label: "Plan a Site Visit", href: "/site-visit" },
    { label: "Commercial Cooling", href: "/commercial-cooling-solutions" },
    { label: "AC Service & AMC", href: "/ac-service-amc" },
  ],
} as const;
