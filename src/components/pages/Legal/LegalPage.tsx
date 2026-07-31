"use client";

import { useEffect } from "react";

import Container from "@/components/ui/Container";
import { cx } from "@/lib/cx";
import { scrollToSection } from "@/lib/scrollToSection";

import type { LegalSection } from "@/data/pages/privacy";

import "./LegalPage.css";

export type LegalPageData = {
  eyebrow: string;
  title: string;
  intro: string;
  badges: readonly string[];
  tocLabel: string;
  disclaimer?: string;
  sections: readonly LegalSection[];
  contactCta: {
    label: string;
    href: string;
  };
};

type LegalPageProps = {
  data: LegalPageData;
  className?: string;
};

const TocLink = ({
  section,
  index,
  onNavigate,
}: {
  section: LegalSection;
  index: number;
  onNavigate: (id: string) => void;
}) => (
  <button
    type="button"
    className="legal-page__toc-link"
    onClick={() => onNavigate(section.id)}
  >
    <span className="legal-page__toc-index" aria-hidden="true">
      {String(index + 1).padStart(2, "0")}
    </span>
    <span>{section.title}</span>
  </button>
);

const LegalPage = ({ data, className }: LegalPageProps) => {
  useEffect(() => {
    // If someone lands with an old #hash link, scroll then strip the hash.
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
    window.requestAnimationFrame(() => scrollToSection(hash));
  }, []);

  const goToSection = (id: string) => {
    scrollToSection(id);
  };

  return (
    <div className={cx("legal-page", className)}>
      <section className="legal-page__hero" aria-labelledby="legal-page-title">
        <div className="legal-page__hero-glow" aria-hidden="true" />
        <Container>
          <p className="legal-page__eyebrow">{data.eyebrow}</p>
          <h1 id="legal-page-title" className="legal-page__title">
            {data.title}
          </h1>
          <p className="legal-page__intro">{data.intro}</p>
          <ul className="legal-page__badges">
            {data.badges.map((badge) => (
              <li key={badge} className="legal-page__badge">
                {badge}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="legal-page__body" aria-label="Legal content">
        <Container>
          <div className="legal-page__layout">
            <aside className="legal-page__sidebar" aria-label="Page sections">
              <p className="legal-page__toc-heading">{data.tocLabel}</p>
              <nav className="legal-page__toc" aria-label="Table of contents">
                <ol className="legal-page__toc-list">
                  {data.sections.map((section, index) => (
                    <li key={section.id}>
                      <TocLink
                        section={section}
                        index={index}
                        onNavigate={goToSection}
                      />
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <details className="legal-page__toc-mobile">
              <summary className="legal-page__toc-mobile-summary">
                {data.tocLabel}
              </summary>
              <nav aria-label="Table of contents">
                <ol className="legal-page__toc-list">
                  {data.sections.map((section, index) => (
                    <li key={section.id}>
                      <TocLink
                        section={section}
                        index={index}
                        onNavigate={goToSection}
                      />
                    </li>
                  ))}
                </ol>
              </nav>
            </details>

            <div className="legal-page__content">
              {data.disclaimer ? (
                <aside className="legal-page__disclaimer" role="note">
                  <p className="legal-page__disclaimer-label">Important notice</p>
                  <p className="legal-page__disclaimer-text">{data.disclaimer}</p>
                </aside>
              ) : null}

              {data.sections.map((section, index) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="legal-page__section"
                  aria-labelledby={`${section.id}-title`}
                >
                  <header className="legal-page__section-header">
                    <span className="legal-page__section-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 id={`${section.id}-title`} className="legal-page__section-title">
                      {section.title}
                    </h2>
                  </header>
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={`${section.id}-${paragraphIndex}`}
                      className="legal-page__paragraph"
                    >
                      {paragraph}
                    </p>
                  ))}
                </article>
              ))}

              <div className="legal-page__footer-cta">
                <a className="legal-page__button" href={data.contactCta.href}>
                  {data.contactCta.label}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LegalPage;
