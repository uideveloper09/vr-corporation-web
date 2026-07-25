import Image from "next/image";

import Container from "@/components/ui/Container";
import { industrySolutionsData } from "@/data/home/industrySolutions";

import "./IndustrySolutions.css";

const LinkArrow = () => (
  <svg
    className="industry-solutions__card-arrow"
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

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <circle cx="8" cy="8" r="7" fill="currentColor" />
    <path
      d="m5 8 2 2 4-4"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IndustrySolutions = () => {
  const { number, eyebrow, title, description, cards, footer } =
    industrySolutionsData;

  return (
    <section
      className="industry-solutions"
      id="industry-solutions"
      aria-labelledby="industry-solutions-title"
    >
      <Container>
        <div className="industry-solutions__inner">
          <header className="industry-solutions__header">
            <span className="industry-solutions__number" aria-hidden="true">
              {number}
            </span>

            <div className="industry-solutions__intro">
              <p className="industry-solutions__eyebrow">{eyebrow}</p>

              <h2
                id="industry-solutions-title"
                className="industry-solutions__title"
              >
                {title}
              </h2>

              <p className="industry-solutions__description">{description}</p>
            </div>
          </header>

          <div className="industry-solutions__grid">
            {cards.map((card) => (
              <article key={card.id} className="industry-solutions__card">
                <div className="industry-solutions__card-media">
                  <div className="industry-solutions__card-media-frame">
                    <Image
                      className="industry-solutions__card-image"
                      src={card.image}
                      alt={card.imageAlt}
                      width={640}
                      height={420}
                      unoptimized
                    />
                  </div>

                  <span className="industry-solutions__card-icon" aria-hidden="true">
                    <Image
                      className="industry-solutions__card-icon-image"
                      src={card.iconImage}
                      alt=""
                      width={64}
                      height={64}
                      unoptimized
                    />
                  </span>
                </div>

                <div className="industry-solutions__card-body">
                  <h3 className="industry-solutions__card-title">{card.title}</h3>
                  <span className="industry-solutions__card-rule" aria-hidden="true" />
                  <p className="industry-solutions__card-description">
                    {card.description}
                  </p>
                  <a className="industry-solutions__card-link" href={card.href}>
                    <span className="industry-solutions__card-link-text">
                      {card.cta}
                    </span>
                    <LinkArrow />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="industry-solutions__footer">
            <div className="industry-solutions__footer-lead">
              <span
                className="industry-solutions__footer-shield"
                aria-hidden="true"
              >
                <ShieldIcon />
              </span>
              <p className="industry-solutions__footer-text">{footer.text}</p>
            </div>

            <ul className="industry-solutions__footer-list">
              {footer.items.map((item) => (
                <li key={item} className="industry-solutions__footer-item">
                  <span
                    className="industry-solutions__footer-check"
                    aria-hidden="true"
                  >
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default IndustrySolutions;
