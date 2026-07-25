import Container from "@/components/ui/Container";
import { finalCtaData } from "@/data/home/finalCta";
import { cx } from "@/lib/cx";

import "./FinalCta.css";

export type FinalCtaData = typeof finalCtaData;

export type FinalCtaProps = {
  data?: FinalCtaData;
  id?: string;
  className?: string;
};

const AirflowIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path
      d="M3 6.5c2.2-1.4 4.4-1.4 6.5 0s4.3 1.4 6.5 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      d="M3 10c2.2-1.4 4.4-1.4 6.5 0s4.3 1.4 6.5 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      d="M3 13.5c2.2-1.4 4.4-1.4 6.5 0s4.3 1.4 6.5 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
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
    <circle cx="10" cy="9" r="1.7" fill="currentColor" />
  </svg>
);

const FinalCta = ({
  data = finalCtaData,
  id = "final-cta",
  className,
}: FinalCtaProps) => {
  const { number, titleLines, primaryCta, secondaryCta } = data;

  return (
    <section
      className={cx("final-cta", className)}
      id={id}
      aria-labelledby="final-cta-title"
    >
      <Container>
        <div className="final-cta__card">
          <span className="final-cta__number" aria-hidden="true">
            {number}
          </span>

          <div className="final-cta__divider" aria-hidden="true" />

          <div className="final-cta__content">
            <h2 id="final-cta-title" className="final-cta__title">
              {titleLines.map((line) => (
                <span key={line} className="final-cta__title-line">
                  {line}
                </span>
              ))}
            </h2>

            <div className="final-cta__actions">
              <a
                className="final-cta__button final-cta__button--primary"
                href={primaryCta.href}
              >
                <span className="final-cta__button-icon" aria-hidden="true">
                  <AirflowIcon />
                </span>
                <span>{primaryCta.label}</span>
              </a>

              <a
                className="final-cta__button final-cta__button--secondary"
                href={secondaryCta.href}
              >
                <span className="final-cta__button-icon" aria-hidden="true">
                  <PinIcon />
                </span>
                <span>{secondaryCta.label}</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FinalCta;
