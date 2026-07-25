import Image from "next/image";

import Container from "@/components/ui/Container";
import { contactVisitData } from "@/data/home/contactVisit";

import "./ContactVisit.css";

const DotGrid = ({
  className = "",
  count = 21,
}: {
  className?: string;
  count?: number;
}) => (
  <span className={`contact-visit__dots ${className}`.trim()} aria-hidden="true">
    {Array.from({ length: count }).map((_, index) => (
      <span key={index} />
    ))}
  </span>
);

const PinIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path
      d="M10 17.5S15 13.2 15 9a5 5 0 1 0-10 0c0 4.2 5 8.5 5 8.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="9" r="1.6" fill="currentColor" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <circle
      cx="10"
      cy="10"
      r="7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M10 6.5V10l2.8 2.2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path
      d="M6.2 3.8c.5-.5 1.3-.5 1.7.1l1.2 1.8c.3.5.2 1.2-.2 1.6L7.7 8.5c.8 1.6 2.1 2.9 3.7 3.7l1.2-1.2c.4-.4 1.1-.5 1.6-.2l1.8 1.2c.6.4.6 1.2.1 1.7l-1.1 1.1c-.5.5-1.2.7-1.9.5-3.4-1-6.1-3.7-7.1-7.1-.2-.7 0-1.4.5-1.9l1.1-1.1Z"
      fill="currentColor"
    />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path
      d="M4.5 4.5h11a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5H9.2L6 16.2V13.5H4.5A1.5 1.5 0 0 1 3 12V6a1.5 1.5 0 0 1 1.5-1.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="7.5" cy="9" r="0.95" fill="#5eb4ff" />
    <circle cx="10" cy="9" r="0.95" fill="#5eb4ff" />
    <circle cx="12.5" cy="9" r="0.95" fill="#5eb4ff" />
  </svg>
);

const CoordsPinIcon = () => (
  <svg viewBox="0 0 44 44" aria-hidden="true" focusable="false">
    <circle cx="22" cy="22" r="19" fill="none" stroke="#2f8bff" strokeWidth="1.2" opacity="0.35" />
    <circle cx="22" cy="22" r="13.5" fill="none" stroke="#2f8bff" strokeWidth="1.35" opacity="0.55" />
    <ellipse cx="22" cy="33.5" rx="5" ry="1.6" fill="#2f8bff" opacity="0.35" />
    <path
      d="M22 28.5S26.5 24.8 26.5 20.8a4.5 4.5 0 1 0-9 0c0 4 4.5 7.7 4.5 7.7Z"
      fill="#ffffff"
    />
    <circle cx="22" cy="20.5" r="1.6" fill="#01142d" />
  </svg>
);

const CrosshairIcon = () => (
  <svg viewBox="0 0 36 36" aria-hidden="true" focusable="false">
    <circle cx="18" cy="18" r="14" fill="none" stroke="#2f8bff" strokeWidth="1.3" opacity="0.55" />
    <circle cx="18" cy="18" r="7" fill="none" stroke="#2f8bff" strokeWidth="1.4" />
    <circle cx="18" cy="18" r="2.2" fill="#2f8bff" />
    <path d="M18 2v6M18 28v6M2 18h6M28 18h6" stroke="#2f8bff" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const ContactVisit = () => {
  const {
    number,
    title,
    brand,
    address,
    hours,
    primaryCta,
    secondaryCta,
    coordinates,
  } = contactVisitData;

  return (
    <section
      className="contact-visit"
      id="contact"
      aria-labelledby="contact-visit-title"
    >
      <Container>
        <div className="contact-visit__inner">
          <div className="contact-visit__intro">
            <span className="contact-visit__number" aria-hidden="true">
              {number}
            </span>

            <div className="contact-visit__ornament" aria-hidden="true">
              <span className="contact-visit__rule" />
              <DotGrid />
            </div>

            <h2 id="contact-visit-title" className="contact-visit__title">
              {title.map((part) => (
                <span
                  key={part.text}
                  className={
                    part.accent
                      ? "contact-visit__title-part contact-visit__title-part--accent"
                      : "contact-visit__title-part"
                  }
                >
                  {part.text}
                </span>
              ))}
            </h2>
          </div>

          <aside className="contact-visit__card">
            <div className="contact-visit__card-glow" aria-hidden="true" />

            <div className="contact-visit__card-header">
              <span className="contact-visit__brand-mark" aria-hidden="true">
                <Image
                  className="contact-visit__brand-mark-image"
                  src="/images/logos/logo-symbol.png"
                  alt=""
                  width={40}
                  height={40}
                  unoptimized
                />
              </span>

              <div className="contact-visit__brand-copy">
                <p className="contact-visit__brand-name">{brand.name}</p>
                <p className="contact-visit__brand-partner">{brand.partner}</p>
              </div>
            </div>

            <div className="contact-visit__row">
              <span className="contact-visit__row-icon" aria-hidden="true">
                <PinIcon />
              </span>
              <p className="contact-visit__row-text">{address}</p>
            </div>

            <div className="contact-visit__row">
              <span className="contact-visit__row-icon" aria-hidden="true">
                <ClockIcon />
              </span>
              <p className="contact-visit__row-text">{hours}</p>
            </div>

            <div className="contact-visit__actions">
              <a
                className="contact-visit__button contact-visit__button--primary"
                href={primaryCta.href}
              >
                <span className="contact-visit__button-badge" aria-hidden="true">
                  <PhoneIcon />
                </span>
                <span className="contact-visit__button-divider" aria-hidden="true" />
                <span className="contact-visit__button-label">{primaryCta.label}</span>
              </a>

              <a
                className="contact-visit__button contact-visit__button--secondary"
                href={secondaryCta.href}
              >
                <span className="contact-visit__button-badge" aria-hidden="true">
                  <ChatIcon />
                </span>
                <span className="contact-visit__button-divider" aria-hidden="true" />
                <span className="contact-visit__button-label">{secondaryCta.label}</span>
              </a>
            </div>

            <div className="contact-visit__coords">
              <div className="contact-visit__coords-copy">
                <span className="contact-visit__coords-pin" aria-hidden="true">
                  <CoordsPinIcon />
                </span>
                <div>
                  <p className="contact-visit__coords-label">{coordinates.label}</p>
                  <a
                    className="contact-visit__coords-value"
                    href={coordinates.mapsHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {coordinates.value}
                  </a>
                </div>
              </div>

              <div className="contact-visit__coords-art" aria-hidden="true">
                <span className="contact-visit__coords-dash" />
                <span className="contact-visit__coords-crosshair">
                  <CrosshairIcon />
                </span>
                <DotGrid className="contact-visit__dots--coords" count={12} />
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
};

export default ContactVisit;
