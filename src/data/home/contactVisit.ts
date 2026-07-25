const DEFAULT_WHATSAPP_MESSAGE =
  "Hi V R Corporation, I’m interested in Daikin AC / cooling solutions. Please assist me with the right plan.";

const phoneHref = "tel:+910000000000";
const phoneDigits = phoneHref.replace(/^tel:\+?/, "").replace(/\D/g, "");
/** Placeholder numbers like +910000000000 stay inactive until a real line is set */
const phoneReady =
  phoneDigits.length >= 10 &&
  !phoneDigits.includes("0000000000") &&
  !/^0+$/.test(phoneDigits);

const buildWhatsAppHref = (digits: string, message: string) => {
  const text = encodeURIComponent(message);
  // Always pass phone + text so WhatsApp opens with a prefilled message
  return `https://api.whatsapp.com/send?phone=${digits}&text=${text}`;
};

export const contactVisitData = {
  number: "12",
  title: [
    { text: "Come In With", accent: false },
    { text: "Questions.", accent: true },
    { text: "Leave With", accent: false },
    { text: "Clarity.", accent: true },
  ],
  brand: {
    name: "V R CORPORATION",
    partner: "DAIKIN AUTHORIZED PARTNER",
  },
  address: "Ward No. 9, Near Shri Ram Real Estate, Kharkhoda, Sonipat, Haryana – 131402",
  hours: "Open 10:00 AM – 7:00 PM",
  primaryCta: {
    label: "Call the Cooling Desk",
    href: phoneHref,
  },
  secondaryCta: {
    label: "Chat About My Space",
    href: "#final-cta",
  },
  whatsapp: {
    label: "WhatsApp the Cooling Desk",
    phoneDigits,
    ready: phoneReady,
    prefill: DEFAULT_WHATSAPP_MESSAGE,
    href: buildWhatsAppHref(phoneDigits, DEFAULT_WHATSAPP_MESSAGE),
  },
  coordinates: {
    label: "Kharkhoda Coordinates",
    value: "28.8674698, 76.9061127",
    mapsHref: "https://maps.google.com/?q=28.8674698,76.9061127",
  },
};
