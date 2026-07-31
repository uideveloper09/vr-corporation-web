"use client";

import { useEffect } from "react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Faq from "@/components/sections/Faq";
import ServiceAreaMap from "@/components/sections/ServiceArea/ServiceAreaMap";
import { contactPageData, type ContactPageData } from "@/data/pages/contact";
import { siteConfig } from "@/data/site";
import { cx } from "@/lib/cx";
import { consumePendingScroll, scrollToSection } from "@/lib/scrollToSection";

import ContactEnquiryForm from "./ContactEnquiryForm";
import "./ContactPage.css";

export type ContactPageProps = {
  data?: ContactPageData;
  className?: string;
};

const PinIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path
      d="M10 17.5S15 13.2 15 9a5 5 0 1 0-10 0c0 4.2 5 8.5 5 8.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="9" r="1.7" fill="currentColor" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.7" />
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

const ContactPage = ({ data = contactPageData, className }: ContactPageProps) => {
  const { hero, form, location, faqs } = data;

  useEffect(() => {
    consumePendingScroll();
  }, []);

  return (
    <div className={cx("contact-page", className)}>
      <Reveal variant="fade" eager delay={160} className="reveal--hero">
        <section className="contact-page__hero" aria-labelledby="contact-hero-title">
          <div className="contact-page__hero-glow" aria-hidden="true" />
          <Container>
            <div className="contact-page__hero-content">
              <p className="contact-page__eyebrow contact-page__eyebrow--on-dark">
                {hero.eyebrow}
              </p>
              <h1 id="contact-hero-title" className="contact-page__hero-title">
                {hero.title.split(". ").map((line, index, lines) => {
                  const text = index < lines.length - 1 ? `${line}.` : line;
                  return (
                    <span key={text} className="contact-page__hero-title-line">
                      {text}
                    </span>
                  );
                })}
              </h1>
              <p className="contact-page__hero-intro">{hero.intro}</p>
              <div className="contact-page__hero-actions">
                <a
                  className="contact-page__button contact-page__button--primary"
                  href={hero.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-page__button-icon" aria-hidden="true">
                    <PinIcon />
                  </span>
                  <span>{hero.primaryCta.label}</span>
                </a>
                <button
                  type="button"
                  className="contact-page__button contact-page__button--secondary"
                  onClick={() => scrollToSection(form.id)}
                >
                  <span>{hero.secondaryCta.label}</span>
                </button>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={40} className="reveal--after-hero">
        <section className="contact-page__main" aria-label="Enquiry and showroom visit">
          <Container>
            <div className="contact-page__main-grid">
              <div className="contact-page__form-panel">
                <SectionHeading
                  prefix="contact-page"
                  titleId="contact-form-title"
                  number={form.number}
                  eyebrow={form.eyebrow}
                  title={form.title}
                  description={form.intro}
                />
                <ContactEnquiryForm data={form} />
              </div>

              <aside
                id={location.id}
                className="contact-page__location"
                aria-labelledby="contact-location-title"
              >
                <SectionHeading
                  prefix="contact-page"
                  titleId="contact-location-title"
                  className="contact-page__header--compact"
                  number={location.number}
                  eyebrow={location.eyebrow}
                  title={location.title}
                />

                <div className="contact-page__location-card">
                  <div className="contact-page__location-brand">
                    <p className="contact-page__location-name">{location.brand.name}</p>
                    <p className="contact-page__location-partner">
                      {location.brand.partner}
                    </p>
                  </div>

                  <div className="contact-page__location-row">
                    <span className="contact-page__location-icon" aria-hidden="true">
                      <PinIcon />
                    </span>
                    <p>{siteConfig.address.formatted}</p>
                  </div>

                  <div className="contact-page__location-row">
                    <span className="contact-page__location-icon" aria-hidden="true">
                      <ClockIcon />
                    </span>
                    <div>
                      <p>Open {siteConfig.hours.display}</p>
                      <p className="contact-page__location-note">{location.hoursNote}</p>
                    </div>
                  </div>

                  <p className="contact-page__location-pending">{location.pendingNotice}</p>

                  <a
                    className="contact-page__button contact-page__button--primary contact-page__button--on-light"
                    href={location.mapsCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="contact-page__button-icon" aria-hidden="true">
                      <PinIcon />
                    </span>
                    <span>{location.mapsCta.label}</span>
                  </a>
                </div>

                <div className="contact-page__map">
                  <ServiceAreaMap title="V R Corporation showroom map in Kharkhoda" />
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={50}>
        <Faq
          id="contact-faqs"
          titleId="contact-faqs-title"
          data={faqs}
          className="contact-page__faq-section"
        />
      </Reveal>
    </div>
  );
};

export default ContactPage;
