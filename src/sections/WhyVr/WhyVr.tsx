import Image from "next/image";

import Container from "@/components/ui/Container";
import { whyVrData } from "@/data/home/whyVr";

import "./WhyVr.css";

const WhyVr = () => {
  const { number, eyebrow, title, description, items } = whyVrData;

  return (
    <section className="why-vr" id="why-vr" aria-labelledby="why-vr-title">
      <Container>
        <div className="why-vr__inner">
          <header className="why-vr__header">
            <span className="why-vr__number" aria-hidden="true">
              {number}
            </span>

            <div className="why-vr__intro">
              <p className="why-vr__eyebrow">{eyebrow}</p>

              <h2 id="why-vr-title" className="why-vr__title">
                {title}
              </h2>

              <p className="why-vr__description">{description}</p>
            </div>
          </header>

          <div className="why-vr__grid">
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
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyVr;
