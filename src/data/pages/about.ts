export const aboutPageData = {
  seo: {
    title: "About V R Corporation | Daikin Authorized Partner in Kharkhoda",
    description:
      "Learn about V R Corporation, a Daikin Authorized Partner helping homes and businesses with planned cooling solutions in Kharkhoda and Sonipat.",
  },
  hero: {
    eyebrow: "LOCAL KNOW-HOW. DAIKIN EXPERTISE.",
    title: "Local Presence. Thoughtful Cooling. Dependable Care.",
    intro:
      "V R Corporation is a Daikin Authorized Partner in Kharkhoda, helping homes and businesses move from cooling questions to a clearer, well-planned solution.",
    image: {
      src: "/images/brand/05/daikin-showroom.png",
      alt: "V R Corporation Daikin showroom in Kharkhoda, Sonipat",
    },
    primaryCta: {
      label: "Meet Us at the Showroom",
      href: "/contact-us",
    },
    secondaryCta: {
      label: "Start My Cooling Plan",
      href: "/",
    },
  },
  story: {
    number: "01",
    eyebrow: "OUR STORY",
    title: "Built Around the Way People Actually Use Their Space.",
    steps: [
      {
        id: "listen",
        number: "01",
        title: "We Listen",
        text: "We start by listening. Every space is different, and so are the people who use it. We ask the right questions to understand your needs, the way your space is used and what comfort should feel like in your everyday.",
      },
      {
        id: "recommend",
        number: "02",
        title: "We Recommend",
        text: "Then, we recommend the Daikin cooling direction that fits—nothing extra, nothing missing. Our focus is on a solution that works well for your space today and remains practical tomorrow.",
      },
      {
        id: "install",
        number: "03",
        title: "We Install",
        text: "Installation is planned with care and executed with finesse. We respect your time and your space, keeping the work neat, efficient and built for long-term performance.",
      },
      {
        id: "support",
        number: "04",
        title: "We Stay",
        text: "Even after switch-on, we stay with you. Whether it is a quick check, seasonal care or advice on better use, the aim is to keep your comfort running smoothly.",
      },
    ],
  },
  pillars: [
    {
      id: "advice",
      title: "Advice Before a Sale",
      description:
        "Honest guidance so you choose what’s right, not what’s extra.",
      iconImage: "/images/brand/06/advice-before-a-sale.png",
    },
    {
      id: "install",
      title: "Installation With Finesse",
      description:
        "No-dust, no-hassle for a clean finish and reliable performance.",
      iconImage: "/images/brand/06/installation-with-finesse.png",
    },
    {
      id: "support",
      title: "Support After Switch-On",
      description:
        "We’re here for maintenance, repairs and every season in between.",
      iconImage: "/images/brand/06/support-after-switch-on.png",
    },
    {
      id: "expertise",
      title: "Daikin Expertise, Nearby",
      description:
        "World-class technology with a local presence that knows the ropes.",
      iconImage: "/images/brand/06/daikin-expertise-nearby.png",
    },
  ],
  capabilities: {
    number: "02",
    eyebrow: "CAPABILITIES",
    title: "What We Help With.",
    items: [
      {
        id: "home-cooling",
        title: "Home Cooling",
        description: "Quiet, efficient comfort for bedrooms and living spaces.",
        href: "/cooling-solutions?type=split-ac",
      },
      {
        id: "multi-room",
        title: "Multi-Room & Commercial Systems",
        description:
          "Uniform comfort across rooms, offices and larger commercial spaces.",
        href: "/commercial-cooling-solutions",
      },
      {
        id: "installation",
        title: "Installation & Replacement",
        description:
          "Planned installs and upgrades executed with care for your space.",
        href: "/ac-service-amc",
      },
      {
        id: "amc",
        title: "Repair / Maintenance / AMC",
        description:
          "Seasonal care and support to keep systems running smoothly.",
        href: "/ac-service-amc?service=amc",
      },
      {
        id: "consultation",
        title: "HVAC Consultation",
        description:
          "Clear guidance before you choose the right cooling direction.",
        href: "/contact-us",
      },
    ],
  },
  local: {
    number: "03",
    eyebrow: "LOCAL PRESENCE",
    title: "Based in Kharkhoda.",
    description:
      "Serving Sonipat and nearby areas where service can be responsibly supported.",
    places: [
      {
        id: "kharkhoda",
        label: "Kharkhoda",
        role: "Home base",
        detail:
          "Showroom access and local support from Ward No. 9, Near Shri Ram Real Estate.",
        primary: true,
      },
      {
        id: "sonipat",
        label: "Sonipat",
        role: "Service coverage",
        detail:
          "Installation and after-sales support across nearby Sonipat areas we can serve reliably.",
        primary: false,
      },
    ],
    mapsCta: {
      label: "Open in Google Maps",
      href: "https://www.google.com/maps?q=28.867469787597656,76.90611267089844&z=17&hl=en",
    },
  },
  clients: {
    number: "04",
    eyebrow: "TRUSTED BY BUSINESSES",
    title: "Trusted Where Precision Matters.",
    names: [
      "Suzuki Motorcycles Kharkhoda",
      "Bellsonica",
      "KML Seat",
      "Polyplastic India",
      "Takenaka India Pvt Ltd",
      "Meneta",
    ],
    notice:
      "Client logos and relationship descriptions require approval before publication.",
  },
  cta: {
    number: "05",
    titleLines: ["Let’s Make Your", "Space Feel Better."],
    primaryCta: {
      label: "Visit the Showroom",
      href: "/contact-us",
    },
    secondaryCta: {
      label: "Shape My Cooling Plan",
      href: "/",
    },
  },
} as const;

export type AboutPageData = typeof aboutPageData;
