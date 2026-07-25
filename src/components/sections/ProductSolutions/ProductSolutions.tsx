import Image from "next/image";
import type { ReactElement } from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { productSolutionsData } from "@/data/home/productSolutions";
import { cx } from "@/lib/cx";

import "./ProductSolutions.css";

export type ProductSolutionsData = typeof productSolutionsData;

export type ProductSolutionsProps = {
  data?: ProductSolutionsData;
  id?: string;
  className?: string;
};

const LinkArrow = () => (
  <svg
    className="product-solutions__card-arrow"
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

const HeavyDutyIcon = () => (
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

const cardIcons: Record<string, () => ReactElement> = {
  "home-comfort": HomeIcon,
  "multi-room": MultiRoomIcon,
  ducted: DuctedIcon,
  "heavy-duty": HeavyDutyIcon,
};

const ProductSolutions = ({
  data = productSolutionsData,
  id = "product-solutions",
  className,
}: ProductSolutionsProps) => {
  const { number, eyebrow, title, description, cards } = data;

  return (
    <section
      className={cx("product-solutions", className)}
      id={id}
      aria-labelledby="product-solutions-title"
    >
      <Container>
        <div className="product-solutions__inner">
          <SectionHeading
            prefix="product-solutions"
            titleId="product-solutions-title"
            number={number}
            eyebrow={eyebrow}
            title={title}
            description={description}
          />

          <div className="product-solutions__grid">
            {cards.map((card) => {
              const Icon = cardIcons[card.id] ?? HomeIcon;

              return (
                <article key={card.id} className="product-solutions__card">
                  <div className="product-solutions__card-media">
                    <div className="product-solutions__card-media-frame">
                      <Image
                        className="product-solutions__card-image"
                        src={card.image}
                        alt={card.imageAlt}
                        fill
                        sizes="(max-width: 1200px) 25vw, 280px"
                        unoptimized
                      />
                    </div>

                    <span className="product-solutions__card-icon" aria-hidden="true">
                      <Icon />
                    </span>
                  </div>

                  <div className="product-solutions__card-body">
                    <h3 className="product-solutions__card-title">{card.title}</h3>
                    <span className="product-solutions__card-rule" aria-hidden="true" />
                    <p className="product-solutions__card-description">
                      {card.description}
                    </p>
                    <a className="product-solutions__card-link" href={card.href}>
                      <span className="product-solutions__card-link-text">
                        See Where It Fits
                      </span>
                      <LinkArrow />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductSolutions;
