"use client";

import { contactVisitData } from "@/data/home/contactVisit";

import "./WhatsAppFab.css";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12.04 3.1A8.9 8.9 0 0 0 3.16 12c0 1.57.41 3.1 1.2 4.45L3 21l4.7-1.23A8.9 8.9 0 0 0 12.04 20.9 8.9 8.9 0 0 0 21 12a8.9 8.9 0 0 0-8.96-8.9Zm0 16.2c-1.37 0-2.71-.36-3.88-1.05l-.28-.16-2.79.73.75-2.72-.18-.29a7.3 7.3 0 0 1-1.12-3.91 7.35 7.35 0 0 1 7.5-7.34 7.35 7.35 0 0 1 7.34 7.5 7.35 7.35 0 0 1-7.34 7.24Zm4.03-5.48c-.22-.11-1.3-.64-1.5-.71-.2-.08-.35-.11-.5.11-.15.22-.57.71-.7.86-.13.15-.26.16-.48.05-.22-.11-.93-.34-1.77-1.1-.65-.58-1.1-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.08-.15.04-.28-.02-.39-.05-.11-.5-1.2-.68-1.64-.18-.44-.36-.37-.5-.38h-.42c-.15 0-.39.05-.59.28-.2.22-.78.76-.78 1.86s.8 2.16.91 2.31c.11.15 1.57 2.4 3.8 3.36.53.23.95.37 1.27.47.54.17 1.03.15 1.42.09.43-.06 1.3-.53 1.48-1.05.18-.51.18-.95.13-1.05-.05-.09-.2-.15-.42-.26Z"
      fill="currentColor"
    />
  </svg>
);

const WhatsAppFab = () => {
  const { whatsapp } = contactVisitData;

  return (
    <a
      className="whatsapp-fab"
      href={whatsapp.href}
      target={whatsapp.ready ? "_blank" : undefined}
      rel={whatsapp.ready ? "noopener noreferrer" : undefined}
      aria-label={
        whatsapp.ready
          ? whatsapp.label
          : "Contact V R Corporation — WhatsApp number pending"
      }
      title={
        whatsapp.ready
          ? whatsapp.label
          : "WhatsApp number pending — open Contact instead"
      }
    >
      <span className="whatsapp-fab__glow" aria-hidden="true" />
      <WhatsAppIcon />
    </a>
  );
};

export default WhatsAppFab;
