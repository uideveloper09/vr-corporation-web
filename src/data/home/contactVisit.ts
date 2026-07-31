import { siteConfig } from "@/data/site";

const DEFAULT_WHATSAPP_MESSAGE =
  "Hi V R Corporation, I’m interested in Daikin AC / cooling solutions. Please assist me with the right plan.";

const phoneHref = `tel:${siteConfig.phone.e164}`;
const phoneDigits = phoneHref.replace(/^tel:\+?/, "").replace(/\D/g, "");
/** Placeholder numbers like +910000000000 stay inactive until a real line is set */
const phoneReady =
  siteConfig.phone.ready &&
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
  address: siteConfig.address.formatted,
  hours: `Open ${siteConfig.hours.display}`,
  primaryCta: {
    label: phoneReady ? "Call the Cooling Desk" : "Send an Enquiry",
    href: phoneReady ? phoneHref : "/contact-us",
  },
  secondaryCta: {
    label: phoneReady ? "Chat About My Space" : "Visit & Contact",
    href: phoneReady
      ? buildWhatsAppHref(phoneDigits, DEFAULT_WHATSAPP_MESSAGE)
      : "/contact-us",
  },
  whatsapp: {
    label: "WhatsApp the Cooling Desk",
    phoneDigits,
    ready: phoneReady,
    prefill: DEFAULT_WHATSAPP_MESSAGE,
    href: phoneReady
      ? buildWhatsAppHref(phoneDigits, DEFAULT_WHATSAPP_MESSAGE)
      : "/contact-us",
  },
  coordinates: {
    label: "Kharkhoda Coordinates",
    value: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
    mapsHref: siteConfig.hasMap,
  },
};
