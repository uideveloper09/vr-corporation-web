import Image from "next/image";

import Container from "@/components/ui/Container";
import { footerData } from "@/data/home/footer";

import "./Footer.css";

const SnowflakeIcon = () => (
  <svg viewBox="0 0 28 28" aria-hidden="true" focusable="false">
    <path
      d="M14 3v22M5.5 8.5l17 11M5.5 19.5l17-11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M14 7.2 11.5 5M14 7.2 16.5 5M14 20.8 11.5 23M14 20.8 16.5 23M8.2 10.2 5.4 10.8M8.2 10.2 8.8 7.4M19.8 17.8 22.6 17.2M19.8 17.8 19.2 20.6M8.2 17.8 5.4 17.2M8.2 17.8 8.8 20.6M19.8 10.2 22.6 10.8M19.8 10.2 19.2 7.4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 28 28" aria-hidden="true" focusable="false">
    <path
      d="M14 3.8 22.5 7v6.2c0 5.2-3.4 8.9-8.5 11.1C9 22.1 5.5 18.4 5.5 13.2V7L14 3.8Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="m10.2 13.8 2.6 2.6 5-5.1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PeopleIcon = () => (
  <svg viewBox="0 0 28 28" aria-hidden="true" focusable="false">
    <circle cx="14" cy="9" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="7.2" cy="11" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="20.8" cy="11" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8.8 22.5c.8-3.4 2.7-5.1 5.2-5.1s4.4 1.7 5.2 5.1M4.5 21.8c.5-2.4 1.7-3.6 3.4-3.6M23.5 21.8c-.5-2.4-1.7-3.6-3.4-3.6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 28 28" aria-hidden="true" focusable="false">
    <path
      d="M14 24s7-5.8 7-11.2a7 7 0 1 0-14 0C7 18.2 14 24 14 24Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="14" cy="12.8" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
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

const GlobeIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M3.2 10h13.6M10 3.2c2.2 2.2 3.3 4.5 3.3 6.8S12.2 14.6 10 16.8C7.8 14.6 6.7 12.3 6.7 10S7.8 5.4 10 3.2Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path
      d="M11.6 17V10.7h2.1l.3-2.4h-2.4V6.8c0-.7.2-1.2 1.2-1.2h1.3V3.4c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3v1.8H6.8v2.4h2.2V17h2.6Z"
      fill="currentColor"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <rect
      x="3.5"
      y="3.5"
      width="13"
      height="13"
      rx="3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="10" cy="10" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="13.8" cy="6.2" r="0.9" fill="currentColor" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path
      d="M16.8 6.2c.3 1 .4 2.1.4 3.8s-.1 2.8-.4 3.8c-.2.8-.8 1.4-1.6 1.6-1.1.3-5.2.3-5.2.3s-4.1 0-5.2-.3c-.8-.2-1.4-.8-1.6-1.6C3.1 12.8 3 11.7 3 10s.1-2.8.4-3.8c.2-.8.8-1.4 1.6-1.6C7.1 4.3 11.2 4.3 11.2 4.3s4.1 0 5.2.3c.8.2 1.4.8 1.6 1.6Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <path d="m8.8 7.8 4 2.2-4 2.2V7.8Z" fill="currentColor" />
  </svg>
);

const columnIcons = {
  snowflake: SnowflakeIcon,
  shield: ShieldIcon,
  people: PeopleIcon,
  pin: PinIcon,
} as const;

const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
} as const;

const Footer = () => {
  const { brand, columns, contact, socials, taglines, legal, legalLinks } = footerData;

  return (
    <footer className="footer">
      <Container>
        <div className="footer__inner">
          <div className="footer__top">
            <div className="footer__brand">
              <Image
                className="footer__mark"
                src="/images/logos/logo-symbol.png"
                alt=""
                width={96}
                height={62}
                unoptimized
                aria-hidden="true"
              />

              <div className="footer__brand-copy">
                <p className="footer__brand-name">{brand.name}</p>
                <p className="footer__brand-partner">{brand.partner}</p>

                <div className="footer__partner-logo">
                  <span className="footer__partner-divider" aria-hidden="true" />
                  <Image
                    className="footer__daikin-image"
                    src="/images/logos/logo-daikin.png"
                    alt="Daikin"
                    width={120}
                    height={32}
                    unoptimized
                  />
                </div>
              </div>
            </div>

            <div className="footer__columns">
              {columns.map((column, index) => {
                const Icon = columnIcons[column.icon as keyof typeof columnIcons];

                return (
                  <div key={column.id} className="footer__column">
                    {index > 0 ? (
                      <span className="footer__column-divider" aria-hidden="true" />
                    ) : null}

                    <a className="footer__column-link" href={column.href}>
                      <span className="footer__column-icon" aria-hidden="true">
                        <Icon />
                      </span>
                      <span className="footer__column-title">{column.title}</span>
                      <span className="footer__column-text">
                        {column.description.split("\n").map((line) => (
                          <span key={line} className="footer__column-line">
                            {line}
                          </span>
                        ))}
                      </span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="footer__middle">
            <div className="footer__contact">
              <a className="footer__contact-item" href={contact.phone.href}>
                <span className="footer__contact-icon" aria-hidden="true">
                  <PhoneIcon />
                </span>
                <span>{contact.phone.label}</span>
              </a>

              <span className="footer__middle-divider" aria-hidden="true" />

              <a className="footer__contact-item" href={contact.website.href}>
                <span className="footer__contact-icon" aria-hidden="true">
                  <GlobeIcon />
                </span>
                <span>{contact.website.label}</span>
              </a>
            </div>

            <span className="footer__middle-divider footer__middle-divider--social" aria-hidden="true" />

            <div className="footer__socials">
              {socials.map((social) => {
                const Icon = socialIcons[social.id as keyof typeof socialIcons];

                return (
                  <a
                    key={social.id}
                    className="footer__social"
                    href={social.href}
                    aria-label={social.label}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer__bottom">
            <div className="footer__taglines">
              <span className="footer__taglines-icon" aria-hidden="true">
                <Image
                  className="footer__taglines-image"
                  src="/images/icons/symb1.png"
                  alt=""
                  width={44}
                  height={28}
                  unoptimized
                />
              </span>

              <p className="footer__taglines-text">
                {taglines.map((line, index) => (
                  <span key={line}>
                    {index > 0 ? (
                      <span className="footer__taglines-sep" aria-hidden="true">
                        |
                      </span>
                    ) : null}
                    <span>{line}</span>
                  </span>
                ))}
              </p>
            </div>

            <div className="footer__legal">
              {legalLinks.map((link, index) => (
                <span key={link.href}>
                  {index > 0 ? (
                    <span className="footer__legal-sep" aria-hidden="true">
                      |
                    </span>
                  ) : null}
                  <a className="footer__legal-link" href={link.href}>
                    {link.label}
                  </a>
                </span>
              ))}
              {legal.map((item) => (
                <span key={item}>
                  <span className="footer__legal-sep" aria-hidden="true">
                    |
                  </span>
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
