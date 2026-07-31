import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutPageData, type AboutPageData } from "@/data/pages/about";
import { siteConfig } from "@/data/site";
import { cx } from "@/lib/cx";

import "./AboutPage.css";

export type AboutPageProps = {
  data?: AboutPageData;
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

const PlanIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <rect
      x="3.5"
      y="4.5"
      width="13"
      height="12"
      rx="1.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M7 3.5v2.5M13 3.5v2.5M3.5 8.5h13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 20 12" aria-hidden="true" focusable="false">
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
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M4 20V7.5L12 4l8 3.5V20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M9 20v-5h6v5M9 10h.01M12 10h.01M15 10h.01M9 13h.01M12 13h.01M15 13h.01"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const InstallIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M8 14.5 4.5 18l2 2L10 16.5M14 8.5 18 4.5l2 2-4 4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m10 16.5 5.5-5.5M14 8.5l-1.5 1.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const GearIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6.1 6.1l1.6 1.6M16.3 16.3l1.6 1.6M17.9 6.1l-1.6 1.6M7.7 16.3l-1.6 1.6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const ClipboardIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <rect
      x="6"
      y="5"
      width="12"
      height="15"
      rx="1.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M9 5.5V4.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M9 11h6M9 15h4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const capabilityIcons: Record<string, () => ReactElement> = {
  "home-cooling": HomeIcon,
  "multi-room": BuildingIcon,
  installation: InstallIcon,
  amc: GearIcon,
  consultation: ClipboardIcon,
};

const AboutPage = ({ data = aboutPageData, className }: AboutPageProps) => {
  const { hero, story, pillars, capabilities, local, clients, cta } = data;

  return (
    <div className={cx("about-page", className)}>
      <Reveal variant="fade" eager delay={160} className="reveal--hero">
        <section className="about-page__hero" aria-labelledby="about-hero-title">
          <div className="about-page__hero-glow" aria-hidden="true" />

          <Container>
            <div className="about-page__hero-grid">
              <div className="about-page__hero-content">
                <p className="about-page__eyebrow about-page__eyebrow--on-dark">
                  {hero.eyebrow}
                </p>
                <h1 id="about-hero-title" className="about-page__hero-title">
                  {hero.title.split(". ").map((line, index, lines) => {
                    const text = index < lines.length - 1 ? `${line}.` : line;
                    return (
                      <span key={text} className="about-page__hero-title-line">
                        {text}
                      </span>
                    );
                  })}
                </h1>
                <p className="about-page__hero-intro">{hero.intro}</p>

                <div className="about-page__hero-actions">
                  <Link
                    className="about-page__button about-page__button--primary"
                    href={hero.primaryCta.href}
                  >
                    <span className="about-page__button-icon" aria-hidden="true">
                      <PinIcon />
                    </span>
                    <span>{hero.primaryCta.label}</span>
                  </Link>
                  <Link
                    className="about-page__button about-page__button--secondary"
                    href={hero.secondaryCta.href}
                  >
                    <span className="about-page__button-icon" aria-hidden="true">
                      <PlanIcon />
                    </span>
                    <span>{hero.secondaryCta.label}</span>
                  </Link>
                </div>
              </div>

              <div className="about-page__hero-visual">
                <div className="about-page__hero-frame">
                  <Image
                    className="about-page__hero-image"
                    src={hero.image.src}
                    alt={hero.image.alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 52vw"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={40} className="reveal--after-hero">
        <section className="about-page__story" aria-labelledby="about-story-title">
          <Container>
            <SectionHeading
              prefix="about-page"
              titleId="about-story-title"
              number={story.number}
              eyebrow={story.eyebrow}
              title={story.title}
            />

            <ol className="about-page__story-steps">
              {story.steps.map((step) => (
                <li key={step.id} className="about-page__story-step">
                  <span className="about-page__story-number" aria-hidden="true">
                    {step.number}
                  </span>
                  <h3 className="about-page__story-step-title">{step.title}</h3>
                  <p className="about-page__story-step-text">{step.text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={60}>
        <section className="about-page__pillars" aria-label="Why customers stay with V R">
          <Container>
            <ul className="about-page__pillars-grid">
              {pillars.map((pillar) => (
                <li key={pillar.id} className="about-page__pillar">
                  <span className="about-page__pillar-icon" aria-hidden="true">
                    <Image
                      src={pillar.iconImage}
                      alt=""
                      width={56}
                      height={56}
                      unoptimized
                    />
                  </span>
                  <h3 className="about-page__pillar-title">{pillar.title}</h3>
                  <p className="about-page__pillar-text">{pillar.description}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={40}>
        <section
          className="about-page__capabilities"
          aria-labelledby="about-capabilities-title"
        >
          <Container>
            <SectionHeading
              prefix="about-page"
              titleId="about-capabilities-title"
              className="about-page__header--capabilities"
              number={capabilities.number}
              eyebrow={capabilities.eyebrow}
              title={capabilities.title}
            />

            <ul className="about-page__capabilities-list">
              {capabilities.items.map((item) => {
                const Icon = capabilityIcons[item.id] ?? HomeIcon;

                return (
                  <li key={item.id} className="about-page__capability">
                    <span className="about-page__capability-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <div className="about-page__capability-copy">
                      <h3 className="about-page__capability-title">{item.title}</h3>
                      <p className="about-page__capability-text">{item.description}</p>
                    </div>
                    <Link className="about-page__capability-link" href={item.href}>
                      <span>Explore</span>
                      <ArrowIcon />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="right" delay={40}>
        <section className="about-page__local" aria-labelledby="about-local-title">
          <Container>
            <SectionHeading
              prefix="about-page"
              titleId="about-local-title"
              className="about-page__header--local"
              number={local.number}
              eyebrow={local.eyebrow}
              title={local.title}
              description={local.description}
            />

            <div className="about-page__local-places">
              {local.places.map((place, index) => (
                <article
                  key={place.id}
                  className={cx(
                    "about-page__local-place",
                    place.primary && "about-page__local-place--primary",
                  )}
                >
                  {index > 0 ? (
                    <span className="about-page__local-connector" aria-hidden="true" />
                  ) : null}
                  <span className="about-page__local-place-role">{place.role}</span>
                  <h3 className="about-page__local-place-name">{place.label}</h3>
                  <p className="about-page__local-place-detail">{place.detail}</p>
                </article>
              ))}
            </div>

            <div className="about-page__local-bar">
              <div className="about-page__local-details">
                <div className="about-page__local-detail">
                  <span className="about-page__local-detail-label">Address</span>
                  <p className="about-page__local-detail-value">
                    {siteConfig.address.formatted}
                  </p>
                </div>
                <div className="about-page__local-detail">
                  <span className="about-page__local-detail-label">Hours</span>
                  <p className="about-page__local-detail-value">
                    Open {siteConfig.hours.display}
                  </p>
                </div>
              </div>

              <Link
                className="about-page__button about-page__button--primary about-page__local-maps"
                href={local.mapsCta.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="about-page__button-icon" aria-hidden="true">
                  <PinIcon />
                </span>
                <span>{local.mapsCta.label}</span>
              </Link>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="fade" delay={40}>
        <section className="about-page__clients" aria-labelledby="about-clients-title">
          <Container>
            <SectionHeading
              prefix="about-page"
              titleId="about-clients-title"
              number={clients.number}
              eyebrow={clients.eyebrow}
              title={clients.title}
            />

            <ul className="about-page__clients-list">
              {clients.names.map((name) => (
                <li key={name} className="about-page__client-name">
                  <span className="about-page__client-mark" aria-hidden="true">
                    {name
                      .split(" ")
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                  <span className="about-page__client-label">{name}</span>
                </li>
              ))}
            </ul>

            <p className="about-page__clients-notice">{clients.notice}</p>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="scale" delay={40}>
        <section className="about-page__cta" aria-labelledby="about-cta-title">
          <Container>
            <div className="about-page__cta-card">
              <span className="about-page__cta-number" aria-hidden="true">
                {cta.number}
              </span>

              <div className="about-page__cta-divider" aria-hidden="true" />

              <div className="about-page__cta-content">
                <h2 id="about-cta-title" className="about-page__cta-title">
                  {cta.titleLines.map((line) => (
                    <span key={line} className="about-page__cta-title-line">
                      {line}
                    </span>
                  ))}
                </h2>

                <div className="about-page__cta-actions">
                  <Link
                    className="about-page__button about-page__button--primary"
                    href={cta.primaryCta.href}
                  >
                    <span className="about-page__button-icon" aria-hidden="true">
                      <PinIcon />
                    </span>
                    <span>{cta.primaryCta.label}</span>
                  </Link>
                  <Link
                    className="about-page__button about-page__button--secondary"
                    href={cta.secondaryCta.href}
                  >
                    <span className="about-page__button-icon" aria-hidden="true">
                      <PlanIcon />
                    </span>
                    <span>{cta.secondaryCta.label}</span>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>
    </div>
  );
};

export default AboutPage;
