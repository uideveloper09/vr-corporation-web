import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/data/site";
import { cx } from "@/lib/cx";

export type EnquiryFormAsideStep =
  | string
  | {
      title: string;
      body?: string;
    };

export type EnquiryFormAsideProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  steps: readonly EnquiryFormAsideStep[];
  notice?: string;
  coverage?: string;
  cta?: {
    label: string;
    href: string;
  };
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

const EnquiryFormAside = ({
  eyebrow,
  title,
  copy,
  steps,
  notice,
  coverage,
  cta,
  className,
}: EnquiryFormAsideProps) => {
  return (
    <aside className={cx("solutions-page__form-aside", className)}>
      <div className="solutions-page__aside-hero">
        <div className="solutions-page__aside-glow" aria-hidden="true" />
        <div className="solutions-page__aside-brand">
          <Image
            className="solutions-page__aside-logo"
            src={siteConfig.logos.symbol}
            alt=""
            width={44}
            height={44}
          />
          <div>
            <p className="solutions-page__aside-brand-name">{siteConfig.name}</p>
            <p className="solutions-page__aside-brand-partner">
              {siteConfig.partnerLine}
            </p>
          </div>
        </div>

        <p className="solutions-page__aside-eyebrow">{eyebrow}</p>
        <h3 className="solutions-page__aside-title">{title}</h3>
        {copy ? <p className="solutions-page__aside-copy">{copy}</p> : null}

        <ol className="solutions-page__aside-steps">
          {steps.map((step) => {
            const stepTitle = typeof step === "string" ? step : step.title;
            const stepBody = typeof step === "string" ? undefined : step.body;

            return (
              <li key={stepTitle} className="solutions-page__aside-step">
                <p className="solutions-page__aside-step-title">{stepTitle}</p>
                {stepBody ? (
                  <p className="solutions-page__aside-step-body">{stepBody}</p>
                ) : null}
              </li>
            );
          })}
        </ol>

        {coverage ? (
          <p className="solutions-page__aside-coverage">{coverage}</p>
        ) : null}
        {notice ? <p className="solutions-page__aside-notice">{notice}</p> : null}

        {cta ? (
          <Link className="solutions-page__aside-cta" href={cta.href}>
            {cta.label}
          </Link>
        ) : null}
      </div>

      <div className="solutions-page__aside-visit">
        <div className="solutions-page__aside-visit-row">
          <span className="solutions-page__aside-visit-icon" aria-hidden="true">
            <PinIcon />
          </span>
          <p>{siteConfig.address.formatted}</p>
        </div>
        <div className="solutions-page__aside-visit-row">
          <span className="solutions-page__aside-visit-icon" aria-hidden="true">
            <ClockIcon />
          </span>
          <p>Open {siteConfig.hours.display}</p>
        </div>
        <a
          className="solutions-page__button solutions-page__button--primary solutions-page__button--on-light"
          href={siteConfig.hasMap}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Google Maps
        </a>
      </div>
    </aside>
  );
};

export default EnquiryFormAside;
