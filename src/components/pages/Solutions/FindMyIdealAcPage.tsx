"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";

import { EnquiryFormAside, SolutionsEnquiryForm } from "@/components/enquiry";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { findMyIdealAcPageData } from "@/data/pages/findMyIdealAc";
import { cx } from "@/lib/cx";
import { scrollToSection } from "@/lib/scrollToSection";

import "./SolutionsShared.css";
import "./FindMyIdealAcPage.css";

type FindMyIdealAcPageProps = {
  className?: string;
};

const LinkArrow = () => (
  <svg
    className="ideal-ac-page__card-arrow"
    viewBox="0 0 20 12"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M1 6h16M13 1.5 18.5 6 13 10.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5.2v-5.2H10.2V21H5a1 1 0 0 1-1-1v-9.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

const MultiRoomIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <rect x="3.5" y="4.5" width="7.5" height="7.5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
    <rect x="13" y="4.5" width="7.5" height="7.5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
    <rect x="3.5" y="14" width="7.5" height="7.5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
    <rect x="13" y="14" width="7.5" height="7.5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

const DuctedIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <rect x="3.5" y="7" width="17" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M7 10.5v3M12 10.5v3M17 10.5v3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const CommercialIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <rect x="3.5" y="6" width="17" height="12" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M3.5 10h17M8 6V4.5M16 6V4.5M7 14h4M14 14h3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const pathwayIcons: Record<string, () => ReactElement> = {
  home: HomeIcon,
  multi: MultiRoomIcon,
  ducted: DuctedIcon,
  commercial: CommercialIcon,
};

const FindMyIdealAcPage = ({ className }: FindMyIdealAcPageProps) => {
  const data = findMyIdealAcPageData;

  return (
    <div className={cx("solutions-page ideal-ac-page", className)}>
      <Reveal variant="fade" eager delay={160} className="reveal--hero">
        <section className="solutions-page__hero" aria-labelledby="ideal-ac-hero-title">
          <div className="solutions-page__hero-glow" aria-hidden="true" />
          <Container>
            <div className="solutions-page__hero-content">
              <p className="solutions-page__eyebrow solutions-page__eyebrow--on-dark">
                {data.hero.eyebrow}
              </p>
              <h1 id="ideal-ac-hero-title" className="solutions-page__hero-title">
                {data.hero.title}
              </h1>
              <p className="solutions-page__hero-intro">{data.hero.intro}</p>
              <div className="ideal-ac-page__hero-actions">
                <button
                  type="button"
                  className="solutions-page__button solutions-page__button--secondary"
                  onClick={() => scrollToSection(data.hero.formCta.scrollTo)}
                >
                  {data.hero.formCta.label}
                </button>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      <section
        className="solutions-page__section ideal-ac-page__pathways"
        aria-labelledby="ideal-ac-pathways-title"
      >
        <Container>
          <Reveal variant="up" delay={40} className="reveal--after-hero">
            <div className="ideal-ac-page__pathways-head">
              <h2 id="ideal-ac-pathways-title" className="solutions-page__section-title">
                {data.pathwaysHeading}
              </h2>
              <p className="solutions-page__section-intro">{data.pathwaysIntro}</p>
            </div>
          </Reveal>

          <Reveal
            variant="up"
            delay={80}
            className="reveal--stagger ideal-ac-page__grid"
          >
            {data.pathways.map((card) => {
              const Icon = pathwayIcons[card.id] ?? HomeIcon;

              return (
                <article key={card.id} className="ideal-ac-page__card">
                  <Link className="ideal-ac-page__card-link" href={card.href}>
                    <div className="ideal-ac-page__card-media">
                      <div className="ideal-ac-page__card-media-frame">
                        <Image
                          className="ideal-ac-page__card-image"
                          src={card.image}
                          alt={card.imageAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
                          unoptimized
                        />
                      </div>
                      <span className="ideal-ac-page__card-step" aria-hidden="true">
                        {card.step}
                      </span>
                      <span className="ideal-ac-page__card-icon" aria-hidden="true">
                        <Icon />
                      </span>
                    </div>

                    <div className="ideal-ac-page__card-body">
                      <h3 className="ideal-ac-page__card-title">{card.title}</h3>
                      <span className="ideal-ac-page__card-rule" aria-hidden="true" />
                      <p className="ideal-ac-page__card-copy">{card.copy}</p>
                      <span className="ideal-ac-page__card-cta">
                        <span className="ideal-ac-page__card-cta-text">{card.cta}</span>
                        <LinkArrow />
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </Reveal>
        </Container>
      </section>

      <Reveal variant="up" delay={50}>
        <section
          className="solutions-page__section solutions-page__section--white"
          aria-labelledby="ideal-ac-form-title"
        >
          <Container>
            <div className="solutions-page__form-layout">
              <div className="solutions-page__panel">
                <h2 id="ideal-ac-form-title" className="solutions-page__section-title">
                  {data.form.title}
                </h2>
                <p className="solutions-page__section-intro">{data.form.intro}</p>

              <SolutionsEnquiryForm
                id={data.form.id}
                source="find-my-ideal-ac"
                consentLabel={data.form.consent}
                  submitLabel={data.form.submitLabel}
                  messageLabel="About the space"
                  messagePlaceholder="Rooms, usage, preferences — anything that helps narrow the direction."
                  requirement="new-ac"
                  thankYouType="cooling-plan"
                  buildMessage={({ message }) =>
                    ["Request: Find My Ideal AC", message.trim() ? message.trim() : null]
                      .filter(Boolean)
                      .join("\n")
                  }
                />
              </div>

              <EnquiryFormAside
                eyebrow={data.formAside.eyebrow}
                title={data.formAside.title}
                copy={data.formAside.copy}
                steps={data.formAside.steps}
                notice={data.notice}
                cta={data.formAside.cta}
              />
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={40}>
        <section
          className="solutions-page__section solutions-page__section--alt"
          aria-labelledby="ideal-ac-related-title"
        >
          <Container>
            <h2 id="ideal-ac-related-title" className="solutions-page__section-title">
              Related
            </h2>
            <ul className="solutions-page__related">
              {data.related.map((item) => (
                <li key={item.href}>
                  <Link className="solutions-page__related-link" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </Reveal>
    </div>
  );
};

export default FindMyIdealAcPage;
