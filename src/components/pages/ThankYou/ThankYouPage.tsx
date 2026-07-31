import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import {
  isThankYouRequestType,
  thankYouPageData,
  type ThankYouPageData,
  type ThankYouRequestType,
} from "@/data/pages/thankYou";
import { cx } from "@/lib/cx";

import "./ThankYouPage.css";

export type ThankYouPageProps = {
  requestType?: string | null;
  reference?: string;
  data?: ThankYouPageData;
  className?: string;
};

const resolveType = (requestType?: string | null): ThankYouRequestType | null =>
  isThankYouRequestType(requestType) ? requestType : null;

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="m8.2 12.2 2.6 2.6 5-5.2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ThankYouPage = ({
  requestType,
  reference = "VR-PENDING",
  data = thankYouPageData,
  className,
}: ThankYouPageProps) => {
  const resolved = resolveType(requestType);
  const typeCopy = resolved ? data.types[resolved] : data.fallback;

  return (
    <div className={cx("thank-you-page", className)}>
      <Reveal variant="fade" eager delay={120} className="reveal--hero">
        <section className="thank-you-page__hero" aria-labelledby="thank-you-title">
          <div className="thank-you-page__hero-glow" aria-hidden="true" />
          <Container>
            <div className="thank-you-page__hero-grid">
              <div className="thank-you-page__hero-copy">
                <span className="thank-you-page__badge" aria-hidden="true">
                  <CheckIcon />
                </span>
                <p className="thank-you-page__eyebrow">REQUEST RECEIVED</p>
                <h1 id="thank-you-title" className="thank-you-page__title">
                  {data.title}
                </h1>
                <p className="thank-you-page__body">{data.body}</p>
                <p className="thank-you-page__summary">{typeCopy.summary}</p>
              </div>

              <dl className="thank-you-page__meta">
                <div className="thank-you-page__meta-item">
                  <dt>{data.typeLabel}</dt>
                  <dd>{typeCopy.label}</dd>
                </div>
                <div className="thank-you-page__meta-item">
                  <dt>{data.statusLabel}</dt>
                  <dd>
                    <span className="thank-you-page__status-dot" aria-hidden="true" />
                    {data.statusValue}
                  </dd>
                </div>
                <div className="thank-you-page__meta-item">
                  <dt>{data.referenceLabel}</dt>
                  <dd className="thank-you-page__reference">{reference}</dd>
                </div>
              </dl>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={40} className="reveal--after-hero">
        <section
          className="thank-you-page__next"
          aria-labelledby="thank-you-next-title"
        >
          <Container>
            <header className="thank-you-page__header">
              <span className="thank-you-page__number" aria-hidden="true">
                01
              </span>
              <div className="thank-you-page__intro">
                <p className="thank-you-page__eyebrow thank-you-page__eyebrow--on-light">
                  {data.nextSteps.eyebrow}
                </p>
                <h2 id="thank-you-next-title" className="thank-you-page__next-title">
                  {data.nextSteps.title}
                </h2>
              </div>
            </header>

            <Reveal
              variant="up"
              delay={80}
              className="reveal--stagger thank-you-page__steps"
            >
              {data.nextSteps.items.map((step) => (
                <li key={step.id} className="thank-you-page__step">
                  <span className="thank-you-page__step-number" aria-hidden="true">
                    {step.number}
                  </span>
                  <p className="thank-you-page__step-title">{step.title}</p>
                </li>
              ))}
            </Reveal>

            <p className="thank-you-page__notice">{data.notice}</p>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="scale" delay={40}>
        <section className="thank-you-page__cta" aria-label="Continue browsing">
          <Container>
            <div className="thank-you-page__cta-card">
              <div className="thank-you-page__cta-copy">
                <h2 className="thank-you-page__cta-title">While You Wait</h2>
                <p className="thank-you-page__cta-text">
                  Explore solutions or open the showroom location — we’ll be in touch soon.
                </p>
              </div>

              <div className="thank-you-page__actions">
                {data.actions.map((action) => {
                  const buttonClass = cx(
                    "thank-you-page__button",
                    action.variant === "primary"
                      ? "thank-you-page__button--primary"
                      : "thank-you-page__button--secondary",
                  );

                  if ("external" in action && action.external) {
                    return (
                      <a
                        key={action.id}
                        className={buttonClass}
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {action.label}
                      </a>
                    );
                  }

                  return (
                    <Link key={action.id} className={buttonClass} href={action.href}>
                      {action.label}
                    </Link>
                  );
                })}
              </div>

              <p className="thank-you-page__privacy">
                {data.privacyLine}{" "}
                <Link className="thank-you-page__privacy-link" href={data.privacyHref}>
                  {data.privacyLinkLabel}
                </Link>
              </p>
            </div>
          </Container>
        </section>
      </Reveal>
    </div>
  );
};

export default ThankYouPage;
