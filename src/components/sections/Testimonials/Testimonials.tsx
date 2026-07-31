import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonialsData } from "@/data/home/testimonials";
import { cx } from "@/lib/cx";

import "./Testimonials.css";

export type TestimonialsData = typeof testimonialsData;

export type TestimonialsProps = {
  data?: TestimonialsData;
  id?: string;
  className?: string;
};

const QuoteIcon = () => (
  <svg viewBox="0 0 24 18" aria-hidden="true" focusable="false">
    <path
      d="M0 18V9.4C0 4.2 2.8 1 8.5 0L9.6 3.2C6.9 3.9 5.2 5.6 5.2 8.4H9V18H0Zm13.5 0V9.4C13.5 4.2 16.3 1 22 0L23.1 3.2C20.4 3.9 18.7 5.6 18.7 8.4H22.5V18H13.5Z"
      fill="currentColor"
    />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path
      d="M10 2.5 12.2 7l4.9.7-3.5 3.4.8 4.9L10 13.8 5.6 16l.8-4.9L2.9 7.7 7.8 7 10 2.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 3.5 5.5 6.2v5.3c0 4.2 2.8 7.6 6.5 8.9 3.7-1.3 6.5-4.7 6.5-8.9V6.2L12 3.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="m9 12 2 2 4-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path
      d="M3 8h9M8.5 4.5 12 8 8.5 11.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Testimonials = ({
  data = testimonialsData,
  id = "testimonials",
  className,
}: TestimonialsProps) => {
  const { number, eyebrow, title, description, cards, trust, cta } = data;

  return (
    <section
      className={cx("testimonials", className)}
      id={id}
      aria-labelledby="testimonials-title"
    >
      <Container>
        <div className="testimonials__inner">
          <SectionHeading
            prefix="testimonials"
            titleId="testimonials-title"
            number={number}
            eyebrow={eyebrow}
            title={title}
            description={description}
          />

          <Reveal
            variant="up"
            delay={80}
            className="reveal--stagger testimonials__grid"
          >
            {cards.map((card) => (
              <li key={card.id} className="testimonials__card">
                <span className="testimonials__quote-badge" aria-hidden="true">
                  <QuoteIcon />
                </span>

                <span className="testimonials__rule" aria-hidden="true" />

                <div className="testimonials__stars" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className="testimonials__star">
                      <StarIcon />
                    </span>
                  ))}
                </div>

                <p className="testimonials__quote">{card.quote}</p>
              </li>
            ))}
          </Reveal>

          <div className="testimonials__footer">
            <p className="testimonials__trust">
              <span className="testimonials__trust-icon" aria-hidden="true">
                <ShieldIcon />
              </span>
              {trust.text}
            </p>

            <a className="testimonials__cta" href={cta.href}>
              <span className="testimonials__cta-arrow" aria-hidden="true">
                <ArrowIcon />
              </span>
              {cta.label}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
