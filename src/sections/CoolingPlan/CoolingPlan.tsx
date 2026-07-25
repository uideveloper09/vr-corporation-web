import Image from "next/image";

import Container from "@/components/ui/Container";
import { coolingPlanData } from "@/data/home/coolingPlan";

import "./CoolingPlan.css";

const FLOW_ARROW_SRC = "/images/brand/04/flow-arrow.png";

const CoolingPlan = () => {
  const { number, eyebrow, title, description, steps, cta } = coolingPlanData;

  const flowItems = steps.flatMap((step, index) => {
    const card = (
      <article key={step.id} className="cooling-plan__card">
        <span className="cooling-plan__badge" aria-hidden="true">
          {step.step}
        </span>

        <div className="cooling-plan__card-media">
          <Image
            className="cooling-plan__card-image"
            src={step.image}
            alt={step.imageAlt}
            width={240}
            height={160}
            unoptimized
          />
        </div>

        <h3 className="cooling-plan__card-title">{step.title}</h3>
        <p className="cooling-plan__card-description">{step.description}</p>
      </article>
    );

    if (index >= steps.length - 1) {
      return [card];
    }

    const arrow = (
      <div
        key={`arrow-${step.id}`}
        className="cooling-plan__arrow"
        aria-hidden="true"
      >
        {/* Native img so public/flow-arrow.png always loads */}
        <img
          className="cooling-plan__arrow-image"
          src={FLOW_ARROW_SRC}
          alt=""
          width={40}
          height={24}
        />
      </div>
    );

    return [card, arrow];
  });

  return (
    <section
      className="cooling-plan"
      id="services"
      aria-labelledby="cooling-plan-title"
    >
      <Container>
        <div className="cooling-plan__inner">
          <header className="cooling-plan__header">
            <span className="cooling-plan__number" aria-hidden="true">
              {number}
            </span>

            <div className="cooling-plan__intro">
              <p className="cooling-plan__eyebrow">{eyebrow}</p>

              <h2 id="cooling-plan-title" className="cooling-plan__title">
                {title}
              </h2>

              <p className="cooling-plan__description">{description}</p>
            </div>
          </header>

          <div className="cooling-plan__panel">
            {flowItems}

            <a className="cooling-plan__cta-card" href={cta.href}>
              <span className="cooling-plan__cta-media">
                <Image
                  className="cooling-plan__cta-image"
                  src={cta.image}
                  alt=""
                  width={120}
                  height={72}
                  unoptimized
                />
              </span>

              <span className="cooling-plan__cta-button">
                {cta.labelLines.map((line) => (
                  <span key={line} className="cooling-plan__cta-line">
                    {line}
                  </span>
                ))}
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CoolingPlan;
