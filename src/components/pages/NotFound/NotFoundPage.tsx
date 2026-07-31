import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import {
  notFoundPageData,
  type NotFoundPageData,
} from "@/data/pages/notFound";
import { cx } from "@/lib/cx";

import "./NotFoundPage.css";

export type NotFoundPageProps = {
  data?: NotFoundPageData;
  className?: string;
};

const CompassIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="m14.8 9.2-1.6 4.8-4.8 1.6 1.6-4.8 4.8-1.6Z"
      fill="currentColor"
      opacity="0.9"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path
      d="M4.5 10h10.2M11.2 6.5 14.7 10l-3.5 3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NotFoundPage = ({
  data = notFoundPageData,
  className,
}: NotFoundPageProps) => (
  <div className={cx("not-found-page", className)}>
    <Reveal variant="fade" eager delay={120} className="reveal--hero">
      <section className="not-found-page__hero" aria-labelledby="not-found-title">
        <div className="not-found-page__hero-glow" aria-hidden="true" />
        <Container>
          <div className="not-found-page__hero-grid">
            <div className="not-found-page__hero-copy">
              <span className="not-found-page__badge" aria-hidden="true">
                <CompassIcon />
              </span>
              <p className="not-found-page__eyebrow">{data.eyebrow}</p>
              <p className="not-found-page__code" aria-hidden="true">
                {data.code}
              </p>
              <h1 id="not-found-title" className="not-found-page__title">
                {data.title}
              </h1>
              <p className="not-found-page__body">{data.body}</p>

              <div className="not-found-page__actions">
                <Link
                  className="not-found-page__button not-found-page__button--primary"
                  href={data.primaryCta.href}
                >
                  {data.primaryCta.label}
                </Link>
                <Link
                  className="not-found-page__button not-found-page__button--secondary"
                  href={data.secondaryCta.href}
                >
                  {data.secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Reveal>

    <Reveal variant="up" delay={40} className="reveal--after-hero">
      <section
        className="not-found-page__links-section"
        aria-labelledby="not-found-links-title"
      >
        <Container>
          <h2 id="not-found-links-title" className="not-found-page__links-title">
            {data.linksTitle}
          </h2>
          <Reveal
            variant="up"
            delay={80}
            className="reveal--stagger not-found-page__links"
          >
            {data.links.map((item) => (
              <li key={item.href}>
                <Link className="not-found-page__link-card" href={item.href}>
                  <span className="not-found-page__link-copy">
                    <span className="not-found-page__link-label">{item.label}</span>
                    <span className="not-found-page__link-description">
                      {item.description}
                    </span>
                  </span>
                  <span className="not-found-page__link-arrow" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </Link>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>
    </Reveal>
  </div>
);

export default NotFoundPage;
