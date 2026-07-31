import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { whyVrData } from "@/data/home/whyVr";
import { cx } from "@/lib/cx";

import "./WhyVr.css";

export type WhyVrData = typeof whyVrData;

export type WhyVrProps = {
  data?: WhyVrData;
  id?: string;
  className?: string;
};

const WhyVr = ({
  data = whyVrData,
  id = "why-vr",
  className,
}: WhyVrProps) => {
  const { number, eyebrow, title, description, items } = data;

  return (
    <section
      className={cx("why-vr", className)}
      id={id}
      aria-labelledby="why-vr-title"
    >
      <Container>
        <div className="why-vr__inner">
          <SectionHeading
            prefix="why-vr"
            titleId="why-vr-title"
            number={number}
            eyebrow={eyebrow}
            title={title}
            description={description}
          />

          <Reveal
            variant="up"
            delay={80}
            className="reveal--stagger why-vr__grid"
          >
            {items.map((item) => (
              <article key={item.id} className="why-vr__item">
                <span className="why-vr__icon" aria-hidden="true">
                  <Image
                    className="why-vr__icon-image"
                    src={item.image}
                    alt=""
                    width={64}
                    height={64}
                    unoptimized
                  />
                </span>

                <h3 className="why-vr__item-title">{item.title}</h3>
                <span className="why-vr__item-rule" aria-hidden="true" />
                <p className="why-vr__item-description">{item.description}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default WhyVr;
