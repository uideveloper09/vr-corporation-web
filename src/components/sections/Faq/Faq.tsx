"use client";

import { useState } from "react";
import Image from "next/image";

import Container from "@/components/ui/Container";
import { faqData, type FaqIcon } from "@/data/home/faq";
import { cx } from "@/lib/cx";

import "./Faq.css";

export type FaqData = {
  number: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  items: readonly {
    id: string;
    icon: FaqIcon;
    question: string;
    answer: string;
  }[];
};

export type FaqProps = {
  data?: FaqData;
  id?: string;
  className?: string;
  titleId?: string;
};

const AcIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <rect
      x="3"
      y="6.5"
      width="18"
      height="11"
      rx="2.2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
    />
    <path
      d="M6.5 12h11M8.5 14.5h7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
    />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 20.5S17.5 15.6 17.5 11a5.5 5.5 0 1 0-11 0c0 4.6 5.5 9.5 5.5 9.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="11"
      r="1.9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 3.8 18.5 6.4v4.8c0 4.1-2.7 7-6.5 8.7-3.8-1.7-6.5-4.6-6.5-8.7V6.4L12 3.8Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinejoin="round"
    />
    <path
      d="m9.3 12 1.9 1.9 3.7-3.8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const iconMap = {
  ac: AcIcon,
  pin: PinIcon,
  shield: ShieldIcon,
} as const;

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={open ? "faq__chevron faq__chevron--open" : "faq__chevron"}
    viewBox="0 0 16 16"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M3.5 6 8 10.5 12.5 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Faq = ({
  data = faqData,
  id = "faq",
  className,
  titleId = "faq-title",
}: FaqProps) => {
  const { number, title, image, items } = data;
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (itemId: string) => {
    setOpenId((current) => (current === itemId ? null : itemId));
  };

  return (
    <section
      className={cx("faq", className)}
      id={id}
      aria-labelledby={titleId}
    >
      <Container>
        <div className="faq__inner">
          <div className="faq__content">
            <header className="faq__header">
              <span className="faq__number" aria-hidden="true">
                {number}
              </span>

              <h2 id={titleId} className="faq__title">
                {title}
              </h2>
            </header>

            <div className="faq__accordion">
              {items.map((item) => {
                const isOpen = openId === item.id;
                const panelId = `${id}-panel-${item.id}`;
                const buttonId = `${id}-button-${item.id}`;
                const Icon = iconMap[item.icon];

                return (
                  <div
                    key={item.id}
                    className={isOpen ? "faq__item faq__item--open" : "faq__item"}
                  >
                    <h3 className="faq__item-heading">
                      <button
                        id={buttonId}
                        type="button"
                        className="faq__question"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleItem(item.id)}
                      >
                        <span className="faq__question-main">
                          <span className="faq__icon" aria-hidden="true">
                            <Icon />
                          </span>
                          <span className="faq__question-text">{item.question}</span>
                        </span>

                        <ChevronIcon open={isOpen} />
                      </button>
                    </h3>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={
                        isOpen ? "faq__answer faq__answer--open" : "faq__answer"
                      }
                      hidden={!isOpen}
                    >
                      <p>{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="faq__media">
            <Image
              className="faq__image"
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 900px) 100vw, 420px"
              priority={false}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Faq;
