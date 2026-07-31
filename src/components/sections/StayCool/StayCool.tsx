import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { stayCoolData } from "@/data/home/stayCool";
import { cx } from "@/lib/cx";

import "./StayCool.css";

export type StayCoolData = typeof stayCoolData;

export type StayCoolProps = {
  data?: StayCoolData;
  id?: string;
  className?: string;
};

type ItemIcon = StayCoolData["items"][number]["icon"];

const IconDefs = () => (
  <svg width="0" height="0" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient
        id="stay-cool-icon-grad"
        x1="20%"
        y1="0%"
        x2="80%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#5b9cf5" />
        <stop offset="45%" stopColor="#1d67cd" />
        <stop offset="100%" stopColor="#0b4fad" />
      </linearGradient>
      <filter
        id="stay-cool-icon-shadow"
        x="-30%"
        y="-20%"
        width="160%"
        height="160%"
      >
        <feDropShadow
          dx="0"
          dy="4"
          stdDeviation="3"
          floodColor="#1d67cd"
          floodOpacity="0.28"
        />
      </filter>
    </defs>
  </svg>
);

const ItemIconMark = ({ type }: { type: ItemIcon }) => {
  switch (type) {
    case "chat":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <g filter="url(#stay-cool-icon-shadow)">
            <path
              d="M10 12.5A6.5 6.5 0 0 1 16.5 6h15A6.5 6.5 0 0 1 38 12.5v13A6.5 6.5 0 0 1 31.5 32H22l-8 8v-8h-1.5A6.5 6.5 0 0 1 10 25.5v-13Z"
              fill="url(#stay-cool-icon-grad)"
            />
            <circle cx="18" cy="19" r="2.2" fill="#ffffff" />
            <circle cx="24" cy="19" r="2.2" fill="#ffffff" />
            <circle cx="30" cy="19" r="2.2" fill="#ffffff" />
          </g>
        </svg>
      );
    case "tools":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <g filter="url(#stay-cool-icon-shadow)">
            <path
              d="M30.5 8.5 39 17l-4.2 4.2-3.3-3.3-9.8 9.8 3.3 3.3L20.8 35 12.3 26.5l4.2-4.2 3.3 3.3 9.8-9.8-3.3-3.3L30.5 8.5Z"
              fill="url(#stay-cool-icon-grad)"
            />
            <path
              d="M33.8 11.2a4.2 4.2 0 0 1 5.9 5.9l-2.1 2.1-5.9-5.9 2.1-2.1ZM14.2 30.8l2.1 2.1a4.2 4.2 0 1 1-5.9-5.9l2.1-2.1 1.7 5.9Z"
              fill="url(#stay-cool-icon-grad)"
            />
          </g>
        </svg>
      );
    case "headset":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <g filter="url(#stay-cool-icon-shadow)">
            <path
              d="M10 24a14 14 0 0 1 28 0"
              fill="none"
              stroke="url(#stay-cool-icon-grad)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <rect
              x="8"
              y="22"
              width="8"
              height="14"
              rx="3.5"
              fill="url(#stay-cool-icon-grad)"
            />
            <rect
              x="32"
              y="22"
              width="8"
              height="16"
              rx="3.5"
              fill="url(#stay-cool-icon-grad)"
            />
            <path
              d="M36 38v2.5A3.5 3.5 0 0 1 32.5 44H28"
              fill="none"
              stroke="url(#stay-cool-icon-grad)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <g filter="url(#stay-cool-icon-shadow)">
            <path
              d="M24 6 10 12v10.5c0 9.2 5.8 16.4 14 19.5 8.2-3.1 14-10.3 14-19.5V12L24 6Z"
              fill="url(#stay-cool-icon-grad)"
            />
            <path
              d="m17.5 23.5 4.2 4.2 8.8-8.8"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      );
  }
};

const StayCool = ({
  data = stayCoolData,
  id = "stay-cool",
  className,
}: StayCoolProps) => {
  const { number, eyebrow, title, description, items } = data;

  return (
    <section
      className={cx("stay-cool", className)}
      id={id}
      aria-labelledby="stay-cool-title"
    >
      <IconDefs />

      <Container>
        <div className="stay-cool__inner">
          <SectionHeading
            prefix="stay-cool"
            titleId="stay-cool-title"
            number={number}
            eyebrow={eyebrow}
            title={title}
            description={description}
          />

          <Reveal
            variant="up"
            delay={80}
            className="reveal--stagger stay-cool__grid"
          >
            {items.map((item) => (
              <li key={item.id} className="stay-cool__item">
                <span className="stay-cool__icon" aria-hidden="true">
                  {item.iconImage ? (
                    <Image
                      className="stay-cool__icon-image"
                      src={item.iconImage}
                      alt=""
                      width={96}
                      height={96}
                      unoptimized
                    />
                  ) : (
                    <ItemIconMark type={item.icon} />
                  )}
                </span>

                <h3 className="stay-cool__item-title">{item.title}</h3>
                <p className="stay-cool__item-description">{item.description}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default StayCool;
